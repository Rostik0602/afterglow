import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChatScript } from "@/hooks/useChatScript";
import { useMessageLimit } from "@/hooks/useMessageLimit";
import type { Blogger, ChatMessage } from "@/types/blogger";

export const MAX_INPUT_LENGTH = 500;

export type ChatMode = "ai" | "script";
export type ChatPanel = "idle" | "composer" | "limit" | "script-replies" | "script-cta";

function toChatMessage(message: UIMessage): ChatMessage | null {
  const text = message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim();

  if (!text) return null;
  return { id: message.id, author: message.role === "user" ? "user" : "blogger", text };
}

export function useHybridChat(blogger: Blogger) {
  const script = useChatScript(blogger.chat);
  const limit = useMessageLimit();
  const [mode, setMode] = useState<ChatMode>("ai");

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { bloggerId: blogger.id } }),
    [blogger.id],
  );

  const { messages, sendMessage, setMessages, status, stop } = useChat({
    transport,
    onError: () => setMode("script"),
  });

  const greetingCount = blogger.chat.greeting.length;
  const greeting = script.messages.slice(0, greetingCount);
  const continuation = script.messages.slice(greetingCount);
  const aiMessages = messages.flatMap((message) => {
    const chatMessage = toChatMessage(message);
    return chatMessage ? [chatMessage] : [];
  });

  const isAiBusy = status === "submitted" || status === "streaming";
  const introDone = script.replies.length > 0;
  const isTyping = script.isTyping || (mode === "ai" && status === "submitted");

  let panel: ChatPanel;
  if (mode === "script") {
    panel = script.isComplete ? "script-cta" : script.replies.length > 0 ? "script-replies" : "idle";
  } else if (!introDone) {
    panel = "idle";
  } else {
    panel = limit.isLimitReached && !isAiBusy ? "limit" : "composer";
  }

  function send(text: string): boolean {
    const value = text.trim().slice(0, MAX_INPUT_LENGTH);
    if (!value || isAiBusy || !introDone) return false;
    if (!limit.consume()) return false;

    void sendMessage({ text: value });
    return true;
  }

  function restart() {
    stop();
    setMessages([]);
    setMode("ai");
    script.restart();
  }

  return {
    mode,
    panel,
    greeting,
    aiMessages,
    continuation,
    isTyping,
    isAiBusy,
    remaining: limit.remaining,
    showSuggestions: !messages.some((message) => message.role === "user"),
    scriptReplies: script.replies,
    chooseScriptReply: script.choose,
    send,
    restart,
  };
}
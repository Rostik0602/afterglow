import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatAuthor, ChatMessage, ChatScript, QuickReply } from "@/types/blogger";

const MAX_TURNS = 2;
const START_DELAY = 500;
const PAUSE_BETWEEN = 350;
const REPLY_DELAY = 450;

type Phase = "intro" | "choosing" | "answering" | "outro" | "done";

function typingDuration(text: string): number {
  return Math.min(1800, Math.max(700, 350 + text.length * 16));
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useChatScript(script: ChatScript) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [usedIds, setUsedIds] = useState<string[]>([]);
  const sessionRef = useRef(0);
  const idRef = useRef(0);

  const createMessage = useCallback((author: ChatAuthor, text: string): ChatMessage => {
    idRef.current += 1;
    return { id: `${author}-${idRef.current}`, author, text };
  }, []);

  const play = useCallback(
    async (texts: string[], session: number): Promise<boolean> => {
      for (const text of texts) {
        if (sessionRef.current !== session) return false;
        setIsTyping(true);
        await wait(typingDuration(text));
        if (sessionRef.current !== session) return false;
        setIsTyping(false);
        setMessages((prev) => [...prev, createMessage("blogger", text)]);
        await wait(PAUSE_BETWEEN);
      }
      return sessionRef.current === session;
    },
    [createMessage],
  );

  const runIntro = useCallback(
    async (session: number) => {
      await wait(START_DELAY);
      if (sessionRef.current !== session) return;
      const finished = await play(script.greeting, session);
      if (finished) setPhase("choosing");
    },
    [play, script.greeting],
  );

  useEffect(() => {
    sessionRef.current += 1;
    void runIntro(sessionRef.current);

    return () => {
      sessionRef.current += 1;
    };
  }, [runIntro]);

  const choose = useCallback(
    async (reply: QuickReply) => {
      if (phase !== "choosing") return;

      const session = sessionRef.current;
      const nextUsed = [...usedIds, reply.id];

      setUsedIds(nextUsed);
      setPhase("answering");
      setMessages((prev) => [...prev, createMessage("user", reply.label)]);

      await wait(REPLY_DELAY);
      if (sessionRef.current !== session) return;

      const answered = await play(reply.answer, session);
      if (!answered) return;

      const remaining = script.replies.filter((item) => !nextUsed.includes(item.id));

      if (nextUsed.length >= MAX_TURNS || remaining.length === 0) {
        setPhase("outro");
        const finished = await play(script.outro, session);
        if (finished) setPhase("done");
        return;
      }

      setPhase("choosing");
    },
    [phase, usedIds, createMessage, play, script.replies, script.outro],
  );

  const restart = useCallback(() => {
    sessionRef.current += 1;
    setMessages([]);
    setIsTyping(false);
    setUsedIds([]);
    setPhase("intro");
    void runIntro(sessionRef.current);
  }, [runIntro]);

  const replies =
    phase === "choosing" ? script.replies.filter((reply) => !usedIds.includes(reply.id)) : [];

  return {
    messages,
    isTyping,
    replies,
    isComplete: phase === "done",
    choose,
    restart,
  };
}
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChatBubble } from "@/components/blogger/ChatBubble";
import { ChatComposer, replyChipClass } from "@/components/blogger/ChatComposer";
import { ChatHeader } from "@/components/blogger/ChatHeader";
import { ChatLimitCard } from "@/components/blogger/ChatLimitCard";
import { TypingIndicator } from "@/components/blogger/TypingIndicator";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { content } from "@/data/site";
import { useHybridChat, type ChatPanel } from "@/hooks/useHybridChat";
import { useTrafficSource } from "@/hooks/useTrafficSource";
import { cn } from "@/lib/cn";
import { buildTelegramLink } from "@/lib/telegram";
import type { Blogger } from "@/types/blogger";

const panelMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
};

interface DemoChatProps {
  blogger: Blogger;
  className?: string;
}

export function DemoChat({ blogger, className }: DemoChatProps) {
  const chat = useHybridChat(blogger);
  const source = useTrafficSource();
  const endRef = useRef<HTMLDivElement>(null);
  const telegramLink = buildTelegramLink({ bloggerId: blogger.id, source });

  const allMessages = [...chat.greeting, ...chat.aiMessages, ...chat.continuation];
  const hasInteracted = allMessages.some((message) => message.author === "user");
  const lastLength = allMessages.at(-1)?.text.length ?? 0;

  useEffect(() => {
    if (!hasInteracted) return;
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [hasInteracted, allMessages.length, lastLength, chat.isTyping, chat.panel]);

  const panels: Record<ChatPanel, ReactNode> = {
    composer: (
      <ChatComposer
        suggestions={blogger.chat.replies}
        showSuggestions={chat.showSuggestions}
        disabled={chat.isAiBusy}
        remaining={chat.remaining}
        onSend={chat.send}
      />
    ),
    limit: <ChatLimitCard telegramLink={telegramLink} />,
    "script-replies": (
      <div className="flex flex-col gap-2">
        {chat.scriptReplies.map((reply) => (
          <Chip
            key={reply.id}
            tone="accent"
            onClick={() => void chat.chooseScriptReply(reply)}
            className={replyChipClass}
          >
            {reply.label}
          </Chip>
        ))}
      </div>
    ),
    "script-cta": (
      <Button
        href={telegramLink}
        target="_blank"
        rel="noopener noreferrer"
        variant="telegram"
        className="w-full"
      >
        <TelegramIcon />
        {content.chat.cta}
      </Button>
    ),
    idle: (
      <div className="flex h-11 items-center rounded-full border border-line bg-white/3 px-4 text-sm text-subtle">
        {content.chat.placeholder}
      </div>
    ),
  };

  return (
    <div
      style={{ "--accent": blogger.accent } as CSSProperties}
      className={cn("overflow-hidden rounded-3xl border border-line bg-surface", className)}
    >
      <ChatHeader blogger={blogger} isTyping={chat.isTyping} onRestart={chat.restart} />

      <div aria-live="polite" className="flex min-h-64 flex-col justify-end gap-2.5 px-4 py-5">
        {[...chat.greeting, ...chat.aiMessages].map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {chat.mode === "script" && (
          <p className="py-1 text-center text-xs text-subtle">{content.chat.fallbackNote}</p>
        )}
        {chat.continuation.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <AnimatePresence>
          {chat.isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-line p-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={chat.panel} {...panelMotion}>
            {panels[chat.panel]}
          </motion.div>
        </AnimatePresence>

        {chat.mode === "script" && (
          <p className="mt-3 text-center text-xs text-subtle">{content.chat.note}</p>
        )}
      </div>

      <div ref={endRef} />
    </div>
  );
}
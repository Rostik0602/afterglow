import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { ChatBubble } from "@/components/blogger/ChatBubble";
import { TypingIndicator } from "@/components/blogger/TypingIndicator";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { content } from "@/data/site";
import { useChatScript } from "@/hooks/useChatScript";
import { useTrafficSource } from "@/hooks/useTrafficSource";
import { cn } from "@/lib/cn";
import { buildTelegramLink } from "@/lib/telegram";
import type { Blogger } from "@/types/blogger";

const footerMotion = {
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
  const { messages, isTyping, replies, isComplete, choose, restart } = useChatScript(blogger.chat);
  const source = useTrafficSource();
  const endRef = useRef<HTMLDivElement>(null);
  const hasInteracted = messages.some((message) => message.author === "user");

  useEffect(() => {
    if (!hasInteracted) return;
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [hasInteracted, messages.length, isTyping, replies.length, isComplete]);

  return (
    <div
      style={{ "--accent": blogger.accent } as CSSProperties}
      className={cn("overflow-hidden rounded-3xl border border-line bg-surface", className)}
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="relative size-9 shrink-0">
          <div className="relative size-9 overflow-hidden rounded-full">
            <Image
              src={blogger.portrait.src}
              alt=""
              fill
              sizes="36px"
              className="object-cover"
              style={{ objectPosition: blogger.portrait.position }}
            />
          </div>
          <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-surface bg-online" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{blogger.name}</p>
          <p className={cn("text-xs transition-colors", isTyping ? "text-accent" : "text-muted")}>
            {isTyping ? content.chat.typing : content.profile.online}
          </p>
        </div>

        <button
          type="button"
          onClick={restart}
          aria-label={content.chat.restart}
          title={content.chat.restart}
          className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>

      <div aria-live="polite" className="flex min-h-64 flex-col justify-end gap-2.5 px-4 py-5">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <AnimatePresence>
          {isTyping && (
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
          {isComplete ? (
            <motion.div key="cta" {...footerMotion}>
              <Button
                href={buildTelegramLink({ bloggerId: blogger.id, source })}
                target="_blank"
                rel="noopener noreferrer"
                variant="telegram"
                className="w-full"
              >
                <TelegramIcon />
                {content.chat.cta}
              </Button>
            </motion.div>
          ) : replies.length > 0 ? (
            <motion.div key="replies" {...footerMotion} className="flex flex-col gap-2">
              <p className="text-xs text-subtle">{content.chat.hint}</p>
              {replies.map((reply) => (
                <Chip
                  key={reply.id}
                  tone="accent"
                  onClick={() => void choose(reply)}
                  className="h-auto min-h-11 justify-start py-2.5 text-left whitespace-normal"
                >
                  {reply.label}
                </Chip>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              {...footerMotion}
              className="flex h-11 items-center rounded-full border border-line bg-white/3 px-4 text-sm text-subtle"
            >
              {content.chat.hint}…
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-3 text-center text-xs text-subtle">{content.chat.note}</p>
      </div>

      <div ref={endRef} />
    </div>
  );
}
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import type { ChatMessage } from "@/types/blogger";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.author === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: isUser ? 1 : 0, originY: 1 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <p
        className={cn(
          "max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed",
          isUser
            ? "rounded-2xl rounded-br-md bg-accent font-medium text-ink"
            : "rounded-2xl rounded-bl-md border border-line bg-elevated text-fg",
        )}
      >
        {message.text}
      </p>
    </motion.div>
  );
}
import { content } from "@/data/site";
import { cn } from "@/lib/cn";

const DOT_DELAYS = [0, 150, 300];

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div
      role="status"
      className={cn(
        "inline-flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-elevated px-4 py-3.5",
        className,
      )}
    >
      <span className="sr-only">{content.chat.typing}</span>
      {DOT_DELAYS.map((delay) => (
        <span
          key={delay}
          aria-hidden="true"
          className="size-1.5 animate-typing rounded-full bg-accent"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
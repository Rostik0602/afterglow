import { useState, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { content } from "@/data/site";
import { MAX_INPUT_LENGTH } from "@/hooks/useHybridChat";
import { FREE_MESSAGES_PER_DAY } from "@/hooks/useMessageLimit";
import type { QuickReply } from "@/types/blogger";

export const replyChipClass = "h-auto min-h-11 justify-start py-2.5 text-left whitespace-normal";

interface ChatComposerProps {
  suggestions: QuickReply[];
  showSuggestions: boolean;
  disabled: boolean;
  remaining: number;
  onSend: (text: string) => boolean;
}

export function ChatComposer({
  suggestions,
  showSuggestions,
  disabled,
  remaining,
  onSend,
}: ChatComposerProps) {
  const [input, setInput] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onSend(input)) setInput("");
  }

  return (
    <div className="flex flex-col gap-3">
      {showSuggestions && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-subtle">{content.chat.hint}</p>
          {suggestions.map((reply) => (
            <Chip
              key={reply.id}
              tone="accent"
              disabled={disabled}
              onClick={() => onSend(reply.label)}
              className={replyChipClass}
            >
              {reply.label}
            </Chip>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={MAX_INPUT_LENGTH}
          placeholder={content.chat.placeholder}
          aria-label={content.chat.placeholder}
          autoComplete="off"
          enterKeyHint="send"
          className="h-11 min-w-0 flex-1 rounded-full border border-line bg-white/3 px-4 text-base text-fg transition-colors placeholder:text-subtle focus:border-accent/50 focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          aria-label={content.chat.send}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-ink transition-[opacity,scale] duration-200 active:scale-95 disabled:opacity-40"
        >
          <ArrowUp className="size-5" />
        </button>
      </form>

      <p className="text-center text-xs text-subtle">
        {content.chat.remaining}: {remaining} з {FREE_MESSAGES_PER_DAY}
      </p>
    </div>
  );
}
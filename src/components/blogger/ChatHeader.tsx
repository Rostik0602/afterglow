import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { content } from "@/data/site";
import { cn } from "@/lib/cn";
import type { Blogger } from "@/types/blogger";

interface ChatHeaderProps {
  blogger: Blogger;
  isTyping: boolean;
  onRestart: () => void;
}

export function ChatHeader({ blogger, isTyping, onRestart }: ChatHeaderProps) {
  return (
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
        onClick={onRestart}
        aria-label={content.chat.restart}
        title={content.chat.restart}
        className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
      >
        <RotateCcw className="size-4" />
      </button>
    </div>
  );
}
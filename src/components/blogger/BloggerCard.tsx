import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { content, nicheLabels } from "@/data/site";
import { openBlogger } from "@/hooks/useActiveBlogger";
import { cn } from "@/lib/cn";
import { formatCompact } from "@/lib/format";
import type { Blogger } from "@/types/blogger";

interface BloggerCardProps {
  blogger: Blogger;
  className?: string;
}

export function BloggerCard({ blogger, className }: BloggerCardProps) {
  return (
    <article
      style={{ "--accent": blogger.accent } as CSSProperties}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 hover:glow-accent",
        className,
      )}
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <Image
          src={blogger.portrait.src}
          alt={blogger.portrait.alt}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 80vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ objectPosition: blogger.portrait.position }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/10 to-transparent" />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span className="glass inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-fg">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
            {nicheLabels[blogger.niche]}
          </span>
          <span className="glass inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs font-medium text-fg">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-online opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-online" />
            </span>
            {content.card.online}
          </span>
        </div>
      </div>

      <div className="relative -mt-20 flex flex-1 flex-col gap-4 p-5 pt-0">
        <div>
          <h3 className="font-display text-lg font-semibold">{blogger.name}</h3>
          <p className="relative z-10 mt-1 w-fit cursor-text text-sm text-muted select-text">
            @{blogger.handle} · {blogger.location}
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-fg/80">{blogger.tagline}</p>

        <p className="mt-auto border-t border-line pt-4 text-sm text-muted">
          <span className="font-semibold text-fg">{formatCompact(blogger.stats.followers)}</span>{" "}
          {content.profile.stats.followers}
        </p>

        <Button
          onClick={() => openBlogger(blogger.id)}
          aria-label={`${content.card.cta}: ${blogger.name}`}
          variant="secondary"
          className="static w-full border-accent/30 bg-accent/10 text-accent after:absolute after:inset-0 hover:border-accent hover:bg-accent hover:text-ink"
        >
          {content.card.cta}
          <ArrowUpRight />
        </Button>
      </div>
    </article>
  );
}
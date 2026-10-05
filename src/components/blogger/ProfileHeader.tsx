import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { BadgeCheck, MapPin } from "lucide-react";
import { Tag } from "@/components/ui/Chip";
import { content, nicheLabels } from "@/data/site";
import { formatCompact } from "@/lib/format";
import type { Blogger } from "@/types/blogger";

interface ProfileHeaderProps {
  blogger: Blogger;
}

export function ProfileHeader({ blogger }: ProfileHeaderProps) {
  const stats = [
    { label: content.profile.stats.followers, value: blogger.stats.followers },
    { label: content.profile.stats.posts, value: blogger.stats.posts },
    { label: content.profile.stats.chats, value: blogger.stats.chats },
  ];

  return (
    <header>
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={blogger.portrait.src}
          alt={blogger.portrait.alt}
          fill
          sizes="(min-width: 640px) 520px, 100vw"
          className="object-cover"
          style={{ objectPosition: blogger.portrait.position }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)]" />
      </div>

      <div className="relative -mt-20 px-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="glass inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-fg">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
            {nicheLabels[blogger.niche]}
          </span>
          <span className="glass inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs font-medium text-fg">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-online opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-online" />
            </span>
            {content.profile.online}
          </span>
        </div>

        <Dialog.Title className="mt-3 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
          {blogger.name}
          <BadgeCheck aria-hidden="true" className="size-5 shrink-0 text-accent" />
        </Dialog.Title>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="select-text">@{blogger.handle}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin aria-hidden="true" className="size-3.5" />
            {blogger.location}
          </span>
        </p>

        <Dialog.Description className="mt-4 text-[15px] leading-relaxed text-fg/85">
          {blogger.bio}
        </Dialog.Description>

        <ul className="mt-4 flex flex-wrap gap-2">
          {blogger.tags.map((tag) => (
            <li key={tag}>
              <Tag tone="accent">{tag}</Tag>
            </li>
          ))}
        </ul>

        <dl className="mt-5 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line bg-white/3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse items-center gap-0.5 px-2 py-3 text-center"
            >
              <dt className="text-xs text-muted">{stat.label}</dt>
              <dd className="text-lg font-semibold">{formatCompact(stat.value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
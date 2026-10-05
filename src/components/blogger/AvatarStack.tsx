"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { bloggers } from "@/data/bloggers";
import { content } from "@/data/site";
import { openBlogger } from "@/hooks/useActiveBlogger";
import { cn } from "@/lib/cn";

interface AvatarStackProps {
  className?: string;
}

export function AvatarStack({ className }: AvatarStackProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <ul className="flex items-center">
        {bloggers.map((blogger, index) => (
          <li
            key={blogger.id}
            className={cn("relative hover:z-10 focus-within:z-10", index > 0 && "-ml-3")}
          >
            <button
              type="button"
              onClick={() => openBlogger(blogger.id)}
              aria-label={`${blogger.name} — відкрити профіль`}
              style={{ "--accent": blogger.accent } as CSSProperties}
              className="relative block size-11 overflow-hidden rounded-full ring-2 ring-ink transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:ring-accent focus-visible:-translate-y-1 focus-visible:ring-accent"
            >
              <Image
                src={blogger.portrait.src}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
                style={{ objectPosition: blogger.portrait.position }}
              />
            </button>
          </li>
        ))}
      </ul>

      <span className="inline-flex items-center gap-2 text-sm text-muted">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-online opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-online" />
        </span>
        {content.profile.online}
      </span>
    </div>
  );
}
"use client";

import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { content, siteConfig } from "@/data/site";
import { useTrafficSource } from "@/hooks/useTrafficSource";
import { buildTelegramLink } from "@/lib/telegram";

export function Header() {
  const source = useTrafficSource();

  return (
    <header id="top" className="sticky top-[max(0.75rem,env(safe-area-inset-top))] z-40 mt-3">
      <Container>
        <nav className="glass flex h-14 items-center justify-between gap-3 rounded-full border border-line pr-2 pl-4 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.6)]">
          <a href="#top" aria-label={siteConfig.name} className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              className="size-7 drop-shadow-[0_0_8px_rgb(167_139_250/0.6)]"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="7"
                  y1="7"
                  x2="25"
                  y2="25"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
                <mask id="logo-mask">
                  <rect width="32" height="32" fill="#fff" />
                  <circle cx="19" cy="13" r="9.2" fill="#000" />
                </mask>
              </defs>
              <circle cx="16" cy="16" r="11" fill="url(#logo-gradient)" mask="url(#logo-mask)" />
            </svg>
            <span className="font-display text-[15px] font-semibold tracking-tight lowercase">
              {siteConfig.name}
            </span>
          </a>

          <div className="flex items-center gap-1">
            <Button
              href={`#${content.catalog.id}`}
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {content.catalog.eyebrow}
            </Button>
            <Button
              href={buildTelegramLink({ source })}
              target="_blank"
              rel="noopener noreferrer"
              variant="telegram"
              size="sm"
            >
              <TelegramIcon />
              {content.header.cta}
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { AvatarStack } from "@/components/blogger/AvatarStack";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { bloggers } from "@/data/bloggers";
import { content, nicheLabels } from "@/data/site";
import { openBlogger } from "@/hooks/useActiveBlogger";
import { useTrafficSource } from "@/hooks/useTrafficSource";
import { buildTelegramLink } from "@/lib/telegram";
import type { Blogger } from "@/types/blogger";

function HeroTile({ blogger }: { blogger: Blogger }) {
  return (
    <button
      type="button"
      onClick={() => openBlogger(blogger.id)}
      aria-label={`${blogger.name} — відкрити профіль`}
      style={{ "--accent": blogger.accent } as CSSProperties}
      className="group relative block aspect-4/5 w-full overflow-hidden rounded-3xl border border-line bg-surface text-left transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:glow-accent"
    >
      <Image
        src={blogger.portrait.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 280px, 1px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition: blogger.portrait.position }}
      />
      <span className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="block font-display text-sm font-semibold text-fg">{blogger.name}</span>
        <span className="mt-1 block text-xs font-medium text-accent">
          {nicheLabels[blogger.niche]}
        </span>
      </span>
    </button>
  );
}

export function Hero() {
  const source = useTrafficSource();
  const { hero } = content;
  const leftColumn = bloggers.filter((_, index) => index % 2 === 0);
  const rightColumn = bloggers.filter((_, index) => index % 2 === 1);

  return (
    <section className="relative isolate pt-10 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-24 bottom-0 -z-10 [background-image:linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/3 px-3 py-1.5 text-xs font-medium text-muted">
            <span className="size-1.5 animate-glow rounded-full bg-brand shadow-[0_0_10px_var(--color-brand)]" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-6 font-display text-[2.25rem] leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]">
            <span className="block">{hero.title}</span>
            <span className="text-gradient block">{hero.titleAccent}</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} size="lg" className="w-full sm:w-auto">
              {hero.primaryCta.label}
              <ArrowDown />
            </Button>
            <Button
              href={buildTelegramLink({ source })}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <TelegramIcon className="text-telegram" />
              {hero.secondaryCta}
            </Button>
          </div>

          <AvatarStack className="mt-8" />

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs text-muted">{stat.label}</dt>
                <dd className="font-display text-xl font-semibold sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <div
            aria-hidden="true"
            className="absolute inset-[8%] -z-10 animate-glow bg-[radial-gradient(closest-side,rgb(167_139_250/0.3),transparent)]"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              {leftColumn.map((blogger) => (
                <HeroTile key={blogger.id} blogger={blogger} />
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-4">
              {rightColumn.map((blogger) => (
                <HeroTile key={blogger.id} blogger={blogger} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
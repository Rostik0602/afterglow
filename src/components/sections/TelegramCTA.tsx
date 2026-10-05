"use client";

import { AvatarStack } from "@/components/blogger/AvatarStack";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { content, siteConfig } from "@/data/site";
import { useTrafficSource } from "@/hooks/useTrafficSource";
import { buildTelegramLink } from "@/lib/telegram";

export function TelegramCTA() {
  const source = useTrafficSource();
  const { telegramCta } = content;

  return (
    <section id="telegram-cta" className="relative py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute -top-[60%] left-1/2 -z-10 aspect-square w-[130%] -translate-x-1/2 animate-glow bg-[radial-gradient(closest-side,rgb(42_171_238/0.28),transparent)]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-[45%] left-1/2 -z-10 aspect-square w-[90%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(167_139_250/0.18),transparent)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]"
            />

            <AvatarStack className="justify-center" />

            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              {telegramCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted sm:text-lg">{telegramCta.subtitle}</p>

            <Button
              href={buildTelegramLink({ source })}
              target="_blank"
              rel="noopener noreferrer"
              variant="telegram"
              size="lg"
              className="mt-8 w-full sm:w-auto"
            >
              <TelegramIcon />
              {telegramCta.cta}
            </Button>

            <p className="mt-4 text-sm text-subtle select-text">@{siteConfig.telegramBot}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
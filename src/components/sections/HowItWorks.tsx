import type { CSSProperties } from "react";
import { MessageCircle, UsersRound } from "lucide-react";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { content } from "@/data/site";

const STEP_VISUALS = [
  { icon: UsersRound, accent: "#22d3ee" },
  { icon: MessageCircle, accent: "#a78bfa" },
  { icon: TelegramIcon, accent: "#2aabee" },
];

export function HowItWorks() {
  const { howItWorks } = content;

  return (
    <section className="relative py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            {howItWorks.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {howItWorks.title}
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {howItWorks.steps.map((step, index) => {
            const { icon: Icon, accent } = STEP_VISUALS[index % STEP_VISUALS.length];

            return (
              <li key={step.title}>
                <Reveal delay={index * 0.1} className="h-full">
                  <article
                    style={{ "--accent": accent } as CSSProperties}
                    className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface/60 p-6 transition-[border-color,translate] duration-500 ease-out hover:-translate-y-1 hover:border-accent/40"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-16 -right-16 size-40 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_25%,transparent),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div className="relative flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent shadow-[0_0_24px_-6px_var(--accent)]">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-display text-3xl font-semibold text-white/10">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="relative mt-6 font-display text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
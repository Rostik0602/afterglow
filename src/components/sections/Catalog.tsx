"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { BloggerCard } from "@/components/blogger/BloggerCard";
import { NicheFilter } from "@/components/blogger/NicheFilter";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { bloggers } from "@/data/bloggers";
import { content } from "@/data/site";
import type { NicheFilterValue } from "@/types/blogger";

export function Catalog() {
  const [filter, setFilter] = useState<NicheFilterValue>("all");
  const { catalog } = content;
  const visible =
    filter === "all" ? bloggers : bloggers.filter((blogger) => blogger.niche === filter);

  return (
    <section id={catalog.id} className="relative py-16 sm:py-24">
      <Container>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              {catalog.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {catalog.title}
            </h2>
            <p className="mt-3 text-muted">{catalog.subtitle}</p>
          </div>
          <NicheFilter value={filter} onChange={setFilter} />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <MotionConfig reducedMotion="user">
            <ul className="no-scrollbar relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[10vw] pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((blogger) => (
                  <motion.li
                    key={blogger.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="w-[80vw] shrink-0 snap-center sm:w-auto"
                  >
                    <BloggerCard blogger={blogger} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </MotionConfig>

          {visible.length === 0 && (
            <p className="py-12 text-center text-muted">{catalog.empty}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
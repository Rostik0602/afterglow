"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { Button } from "@/components/ui/Button";
import { content } from "@/data/site";
import { useScrolledPast } from "@/hooks/useScrolledPast";
import { useTrafficSource } from "@/hooks/useTrafficSource";
import { buildTelegramLink } from "@/lib/telegram";

const CTA_SECTION_ID = "telegram-cta";

export function StickyTelegramBar() {
  const scrolledPast = useScrolledPast();
  const source = useTrafficSource();
  const [ctaInView, setCtaInView] = useState(false);

  useEffect(() => {
    const target = document.getElementById(CTA_SECTION_ID);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCtaInView(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPast && !ctaInView;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {visible && (
          <motion.div
            key="sticky-telegram"
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            exit={{ y: "120%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="pointer-events-none fixed inset-x-0 bottom-0 z-30 bg-linear-to-t from-ink via-ink/80 to-transparent px-4 pt-10 pb-safe sm:hidden"
          >
            <Button
              href={buildTelegramLink({ source })}
              target="_blank"
              rel="noopener noreferrer"
              variant="telegram"
              size="lg"
              className="pointer-events-auto w-full"
            >
              <TelegramIcon />
              {content.stickyBar.cta}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
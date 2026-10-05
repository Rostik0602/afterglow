"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
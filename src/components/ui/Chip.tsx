import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ChipTone = "neutral" | "accent";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  tone?: ChipTone;
}

const chipBase =
  "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const chipTones: Record<ChipTone, { idle: string; active: string }> = {
  neutral: {
    idle: "border-line bg-white/3 text-muted hover:border-line-strong hover:text-fg",
    active: "border-transparent bg-fg text-ink",
  },
  accent: {
    idle: "border-accent/35 bg-accent/10 text-accent hover:bg-accent/20",
    active: "border-transparent bg-accent text-ink",
  },
};

export function Chip({
  active,
  tone = "neutral",
  className,
  type = "button",
  ...props
}: ChipProps) {
  const styles = chipTones[tone];

  return (
    <button
      type={type}
      aria-pressed={active}
      className={cn(chipBase, active ? styles.active : styles.idle, className)}
      {...props}
    />
  );
}

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: ChipTone;
}

const tagTones: Record<ChipTone, string> = {
  neutral: "border-line bg-white/5 text-muted",
  accent: "border-accent/25 bg-accent/10 text-accent",
};

export function Tag({ tone = "neutral", className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tagTones[tone],
        className,
      )}
      {...props}
    />
  );
}
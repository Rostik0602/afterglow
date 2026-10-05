import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "telegram" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface BaseProps extends ButtonStyleProps {
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,box-shadow,filter,transform] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-fg text-ink shadow-[0_8px_30px_-10px_rgb(255_255_255/0.45)] hover:bg-white hover:shadow-[0_10px_40px_-8px_rgb(255_255_255/0.6)]",
  secondary: "border border-line-strong bg-white/5 text-fg hover:border-white/25 hover:bg-white/10",
  ghost: "text-muted hover:bg-white/5 hover:text-fg",
  telegram:
    "bg-telegram text-white shadow-[0_8px_32px_-8px_rgb(42_171_238/0.75)] hover:brightness-110 hover:shadow-[0_10px_44px_-6px_rgb(42_171_238/0.9)]",
  accent: "bg-accent text-ink glow-accent hover:brightness-110",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm [&_svg]:size-4",
  md: "h-12 px-6 text-[15px] [&_svg]:size-5",
  lg: "h-14 px-8 text-base [&_svg]:size-5",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

function isLink(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  if (isLink(props)) {
    const { variant, size, className, children, ...rest } = props;
    return (
      <a className={buttonClasses({ variant, size, className })} {...rest}>
        {children}
      </a>
    );
  }

  const { variant, size, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
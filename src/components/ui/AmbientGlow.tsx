import { cn } from "@/lib/cn";

interface AmbientGlowProps {
  className?: string;
}

export function AmbientGlow({ className }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="animate-drift absolute -top-[20%] -left-[25%] size-[70vmax] bg-[radial-gradient(closest-side,rgb(167_139_250/0.22),transparent)]" />
      <div className="animate-drift absolute top-[15%] -right-[30%] size-[60vmax] bg-[radial-gradient(closest-side,rgb(34_211_238/0.15),transparent)] [animation-delay:-6s]" />
      <div className="animate-drift absolute -bottom-[35%] left-[5%] size-[65vmax] bg-[radial-gradient(closest-side,rgb(244_114_182/0.12),transparent)] [animation-delay:-12s]" />
    </div>
  );
}
const UNITS = [
  { size: 1_000_000, suffix: "млн" },
  { size: 1_000, suffix: "тис." },
] as const;

export function formatCompact(value: number): string {
  for (const { size, suffix } of UNITS) {
    if (Math.abs(value) >= size) {
      const short = Math.round((value / size) * 10) / 10;
      return `${String(short).replace(".", ",")}\u00A0${suffix}`;
    }
  }

  return String(value);
}
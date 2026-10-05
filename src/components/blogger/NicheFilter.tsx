import { Chip } from "@/components/ui/Chip";
import { bloggers } from "@/data/bloggers";
import { nicheLabels } from "@/data/site";
import { cn } from "@/lib/cn";
import type { Niche, NicheFilterValue } from "@/types/blogger";

const options: NicheFilterValue[] = [
  "all",
  ...new Set<Niche>(bloggers.map((blogger) => blogger.niche)),
];

interface NicheFilterProps {
  value: NicheFilterValue;
  onChange: (value: NicheFilterValue) => void;
  className?: string;
}

export function NicheFilter({ value, onChange, className }: NicheFilterProps) {
  return (
    <div className={cn("-mx-5 sm:mx-0", className)}>
      <div
        role="group"
        aria-label="Фільтр за тематикою"
        className="no-scrollbar flex gap-2 overflow-x-auto px-5 [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] sm:flex-wrap sm:px-0 sm:[mask-image:none]"
      >
        {options.map((option) => (
          <Chip
            key={option}
            active={value === option}
            onClick={() => onChange(option)}
            className="shrink-0"
          >
            {nicheLabels[option]}
          </Chip>
        ))}
      </div>
    </div>
  );
}
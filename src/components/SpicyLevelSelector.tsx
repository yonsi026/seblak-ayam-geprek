import { spicyLevels } from "@/data/menu";
import { cn } from "@/lib/utils";

export function SpicyLevelSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (level: number) => void;
}) {
  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Level pedas"
        className="grid grid-cols-3 gap-2 sm:grid-cols-6"
      >
        {spicyLevels.map((s) => {
          const active = s.level === value;
          return (
            <button
              key={s.level}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(s.level)}
              className={cn(
                "flex min-h-[76px] flex-col justify-between border p-2 text-left transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-ink hover:border-ink",
              )}
            >
              <span className="text-2xl font-extrabold leading-none">{s.level}</span>
              <span className="mt-2 text-[11px] font-semibold uppercase leading-tight tracking-wide">
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

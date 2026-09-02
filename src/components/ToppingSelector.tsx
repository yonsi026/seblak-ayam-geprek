import { Check, Minus, Plus } from "lucide-react";
import { formatIDR, type Topping } from "@/data/menu";
import { cn } from "@/lib/utils";

export function ToppingSelector({
  options,
  quantities,
  onChange,
  ariaLabel,
  withQuantity = true,
}: {
  options: Topping[];
  quantities: Record<string, number>;
  onChange: (id: string, qty: number) => void;
  ariaLabel: string;
  withQuantity?: boolean;
}) {
  return (
    <ul aria-label={ariaLabel} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((t) => {
        const qty = quantities[t.id] ?? 0;
        const active = qty > 0;
        return (
          <li key={t.id}>
            <div
              className={cn(
                "flex items-center justify-between gap-3 border p-3",
                active ? "border-primary" : "border-border",
                !t.isAvailable && "opacity-50",
              )}
            >
              <button
                type="button"
                disabled={!t.isAvailable}
                aria-pressed={active}
                onClick={() => onChange(t.id, active ? 0 : 1)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left disabled:cursor-not-allowed"
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center border",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background",
                  )}
                  aria-hidden="true"
                >
                  {active ? <Check className="h-4 w-4" /> : null}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-semibold">{t.name}</span>
                  <span className="block text-[13px] text-muted-foreground">
                    {t.isAvailable ? `+${formatIDR(t.price)}` : "Stok habis"}
                  </span>
                </span>
              </button>

              {withQuantity && active ? (
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Kurangi ${t.name}`}
                    onClick={() => onChange(t.id, qty - 1)}
                    className="flex h-9 w-9 items-center justify-center border border-border hover:bg-surface"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="w-6 text-center text-[15px] font-bold" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Tambah ${t.name}`}
                    onClick={() => onChange(t.id, qty + 1)}
                    className="flex h-9 w-9 items-center justify-center border border-border hover:bg-surface"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

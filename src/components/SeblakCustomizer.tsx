import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SpicyLevelSelector } from "@/components/SpicyLevelSelector";
import { ToppingSelector } from "@/components/ToppingSelector";
import { Button } from "@/components/ui/Button";
import { bases, extras, formatIDR, spicyLevels, toppings } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const step = (n: string, title: string) => ({ n, title });

const steps = [
  step("01", "Pilih Base"),
  step("02", "Pilih Level Pedas"),
  step("03", "Pilih Topping"),
  step("04", "Extra"),
  step("05", "Catatan"),
];

export function SeblakCustomizer() {
  const { addItem } = useCart();
  const [baseId, setBaseId] = useState(bases[0]!.id);
  const [spicy, setSpicy] = useState(2);
  const [toppingQty, setToppingQty] = useState<Record<string, number>>({});
  const [extraQty, setExtraQty] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [started, setStarted] = useState(false);

  const base = bases.find((b) => b.id === baseId)!;

  const unitPrice = useMemo(() => {
    const t = toppings.reduce((sum, x) => sum + (toppingQty[x.id] ?? 0) * x.price, 0);
    const e = extras.reduce((sum, x) => sum + (extraQty[x.id] ?? 0) * x.price, 0);
    return base.price + t + e;
  }, [base, toppingQty, extraQty]);

  const begin = () => {
    if (!started) {
      setStarted(true);
      track("customizer_start");
    }
  };

  const selectedNames = (map: Record<string, number>, list: typeof toppings) =>
    list
      .filter((x) => (map[x.id] ?? 0) > 0)
      .map((x) => `${x.name}${(map[x.id] ?? 0) > 1 ? ` x${map[x.id]}` : ""}`);

  const handleAdd = () => {
    const t = selectedNames(toppingQty, toppings);
    const e = selectedNames(extraQty, extras);
    addItem({
      id: `racikan-${Date.now()}`,
      name: `Seblak Racikan — ${base.name}`,
      price: unitPrice,
      quantity,
      spicyLevel: spicy,
      toppings: t,
      extras: e,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <section id="racik" className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
      <SectionHeading
        index="03"
        label="Racik"
        title="Racik Seblakmu Sendiri."
        description="Pilih base, tentukan level pedas, tambahkan topping favoritmu, lalu nikmati seblak sesuai selera."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          {/* 01 BASE */}
          <fieldset className="border-t border-border pt-6" onChange={begin}>
            <legend className="sr-only">Pilih base</legend>
            <StepLabel {...steps[0]!} />
            <div role="radiogroup" aria-label="Base" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {bases.map((b) => {
                const active = b.id === baseId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      begin();
                      setBaseId(b.id);
                    }}
                    className={cn(
                      "border p-3 text-left transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-ink",
                    )}
                  >
                    <span className="block text-[15px] font-bold">{b.name}</span>
                    <span className="mt-1 block text-[13px] opacity-80">{formatIDR(b.price)}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 02 SPICY */}
          <div className="mt-10 border-t border-border pt-6">
            <StepLabel {...steps[1]!} />
            <div className="mt-4">
              <SpicyLevelSelector
                value={spicy}
                onChange={(l) => {
                  begin();
                  setSpicy(l);
                }}
              />
              <p className="mt-3 text-[14px] text-muted-foreground">
                Terpilih: Level {spicy} — {spicyLevels[spicy]!.label}
              </p>
            </div>
          </div>

          {/* 03 TOPPING */}
          <div className="mt-10 border-t border-border pt-6">
            <StepLabel {...steps[2]!} />
            <div className="mt-4">
              <ToppingSelector
                ariaLabel="Topping"
                options={toppings}
                quantities={toppingQty}
                onChange={(id, qty) => {
                  begin();
                  track("topping_selected", { topping_id: id, quantity: qty });
                  setToppingQty((p) => ({ ...p, [id]: Math.max(0, qty) }));
                }}
              />
            </div>
          </div>

          {/* 04 EXTRA */}
          <div className="mt-10 border-t border-border pt-6">
            <StepLabel {...steps[3]!} />
            <div className="mt-4">
              <ToppingSelector
                ariaLabel="Extra"
                options={extras}
                quantities={extraQty}
                onChange={(id, qty) => {
                  begin();
                  setExtraQty((p) => ({ ...p, [id]: Math.max(0, qty) }));
                }}
              />
            </div>
          </div>

          {/* 05 NOTES */}
          <div className="mt-10 border-t border-border pt-6">
            <StepLabel {...steps[4]!} />
            <label htmlFor="catatan" className="mt-4 block text-[15px] font-semibold">
              Catatan untuk dapur
            </label>
            <textarea
              id="catatan"
              value={notes}
              onChange={(e) => {
                begin();
                setNotes(e.target.value);
              }}
              rows={3}
              placeholder="Contoh: jangan terlalu banyak kuah."
              className="mt-2 w-full border border-input bg-surface p-3 text-[16px] outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* SUMMARY */}
        <aside className="lg:col-span-4">
          <div className="border border-ink bg-background p-5 lg:sticky lg:top-28">
            <p className="label-mono text-muted-foreground">Racikanmu</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Seblak {base.name}</h3>
            <dl className="mt-5 space-y-3 border-t border-border pt-4 text-[15px]">
              <Row label="Level pedas" value={`${spicy} · ${spicyLevels[spicy]!.label}`} />
              <Row
                label="Topping"
                value={selectedNames(toppingQty, toppings).join(", ") || "Belum dipilih"}
              />
              <Row
                label="Extra"
                value={selectedNames(extraQty, extras).join(", ") || "Belum dipilih"}
              />
              {notes.trim() ? <Row label="Catatan" value={notes.trim()} /> : null}
            </dl>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="text-[15px] font-semibold">Jumlah</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Kurangi jumlah"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center border border-border hover:bg-surface"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="w-8 text-center font-bold" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Tambah jumlah"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center border border-border hover:bg-surface"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between border-t border-ink pt-4">
              <span className="label-mono text-muted-foreground">Total</span>
              <span className="text-3xl font-extrabold tracking-tight text-primary">
                {formatIDR(unitPrice * quantity)}
              </span>
            </div>

            <Button size="lg" className="mt-4 w-full" onClick={handleAdd}>
              <ShoppingCart className="h-4 w-4" aria-hidden="true" /> Racik Sekarang
            </Button>
            <p className="mt-3 text-[13px] text-muted-foreground">
              Harga terlihat jelas sebelum pesan. Tidak ada biaya tersembunyi.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function StepLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-2xl font-extrabold tracking-tight text-primary">{n}</span>
      <h3 className="text-lg font-bold uppercase tracking-tight">{title}</h3>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

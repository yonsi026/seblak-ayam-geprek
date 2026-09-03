import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatIDR, promo } from "@/data/menu";
import { Button } from "@/components/ui/action-button";
import { track } from "@/lib/analytics";

export function CartSheet() {
  const { items, isOpen, closeCart, setQuantity, removeItem, subtotal, discount, total, whatsappUrl } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Keranjang">
      <button
        aria-label="Tutup keranjang"
        onClick={closeCart}
        className="absolute inset-0 bg-ink/50"
      />
      <div className="relative flex h-full w-full max-w-[440px] flex-col bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-extrabold uppercase tracking-tight">Keranjang</h2>
          <button
            onClick={closeCart}
            aria-label="Tutup"
            className="flex h-10 w-10 items-center justify-center border border-border hover:bg-surface"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <p className="py-10 text-[16px] text-muted-foreground">
              Keranjang masih kosong. Mulai dari “Racik Seblakmu Sendiri”.
            </p>
          ) : (
            <ul>
              {items.map((i) => (
                <li key={i.id} className="border-b border-border py-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-bold">{i.name}</h3>
                      {typeof i.spicyLevel === "number" ? (
                        <p className="mt-1 text-[13px] text-muted-foreground">
                          Level pedas {i.spicyLevel}
                        </p>
                      ) : null}
                      {i.toppings?.length ? (
                        <p className="text-[13px] text-muted-foreground">
                          Topping: {i.toppings.join(", ")}
                        </p>
                      ) : null}
                      {i.extras?.length ? (
                        <p className="text-[13px] text-muted-foreground">
                          Extra: {i.extras.join(", ")}
                        </p>
                      ) : null}
                      {i.notes ? (
                        <p className="text-[13px] text-muted-foreground">Catatan: {i.notes}</p>
                      ) : null}
                    </div>
                    <p className="text-[16px] font-extrabold">{formatIDR(i.price * i.quantity)}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      aria-label={`Kurangi ${i.name}`}
                      onClick={() => setQuantity(i.id, i.quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center border border-border hover:bg-surface"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center font-bold">{i.quantity}</span>
                    <button
                      aria-label={`Tambah ${i.name}`}
                      onClick={() => setQuantity(i.id, i.quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center border border-border hover:bg-surface"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      aria-label={`Hapus ${i.name}`}
                      onClick={() => removeItem(i.id)}
                      className="ml-auto flex h-9 items-center gap-1 px-2 text-[13px] font-semibold text-destructive hover:bg-surface"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" /> Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-ink px-5 py-4">
          <dl className="space-y-2 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">{formatIDR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Promo {promo.code}
                {discount ? "" : ` (min. ${formatIDR(promo.minPurchase)})`}
              </dt>
              <dd className={discount ? "font-semibold text-success" : "text-muted-foreground"}>
                {discount ? `-${formatIDR(discount)}` : "—"}
              </dd>
            </div>
            <div className="flex items-end justify-between border-t border-border pt-2">
              <dt className="label-mono text-muted-foreground">Total</dt>
              <dd className="text-2xl font-extrabold text-primary">{formatIDR(total)}</dd>
            </div>
          </dl>
          <a
            href={items.length ? whatsappUrl() : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (!items.length) return;
              track("checkout_start", { item_count: items.length, total });
              track("whatsapp_click", { source: "cart" });
            }}
            className="mt-4 block"
            aria-disabled={items.length === 0}
          >
            <Button size="lg" className="w-full" disabled={items.length === 0}>
              Lanjut Checkout via WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

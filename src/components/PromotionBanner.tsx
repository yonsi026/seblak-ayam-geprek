import { formatIDR, promo } from "@/data/menu";
import { Button } from "@/components/ui/action-button";
import { track } from "@/lib/analytics";
import { useCart } from "@/lib/cart";

export function PromotionBanner() {
  const { openCart } = useCart();

  return (
    <section id="promo" className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="border border-ink">
        <div className="grid md:grid-cols-12">
          <div className="border-b border-ink p-6 md:col-span-7 md:border-b-0 md:border-r md:p-10">
            <p className="label-mono text-primary">05 / Promo</p>
            <h2 className="display-tight mt-4 text-[clamp(2rem,6vw,3.5rem)]">Lagi Ada Promo.</h2>
            <p className="mt-4 max-w-[42ch] text-[17px] text-muted-foreground">
              Potongan {formatIDR(promo.discount)} untuk pembelian minimal{" "}
              {formatIDR(promo.minPurchase)}. Berlaku untuk delivery maupun pickup.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-6 bg-surface p-6 md:col-span-5 md:p-10">
            <div>
              <p className="label-mono text-muted-foreground">Kode voucher</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                {promo.code}
              </p>
              <dl className="mt-6 space-y-2 border-t border-border pt-4 text-[15px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Minimum belanja</dt>
                  <dd className="font-semibold">{formatIDR(promo.minPurchase)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Potongan</dt>
                  <dd className="font-semibold text-primary">-{formatIDR(promo.discount)}</dd>
                </div>
              </dl>
            </div>
            <Button
              size="lg"
              onClick={() => {
                track("promo_clicked", { code: promo.code });
                openCart();
              }}
            >
              Ambil Promo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

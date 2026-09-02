import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatIDR } from "@/data/menu";

export function StickyOrderBar() {
  const { count, total, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!scrolled) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink bg-background p-3 md:hidden">
      {count > 0 ? (
        <button
          onClick={openCart}
          className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-primary px-4 py-3 text-primary-foreground"
        >
          <ShoppingCart className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="text-left text-[15px] font-bold">{count} Item</span>
          <span className="text-[15px] font-extrabold">{formatIDR(total)}</span>
        </button>
      ) : (
        <a
          href="#racik"
          className="block bg-primary px-4 py-3 text-center text-[16px] font-bold text-primary-foreground"
        >
          Pesan Sekarang
        </a>
      )}
    </div>
  );
}

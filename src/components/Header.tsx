import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart";
import { track } from "@/lib/analytics";

const nav = [
  { href: "#menu", label: "Menu" },
  { href: "#racik", label: "Seblak" },
  { href: "#ayam-geprek", label: "Ayam Geprek" },
  { href: "#promo", label: "Promo" },
  { href: "#tentang", label: "Tentang Kami" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-8 lg:px-12">
        <a href="#top" className="min-w-0">
          <span className="block text-[13px] font-extrabold leading-[1.15] tracking-tight uppercase md:text-sm">
            Seblak Prasmanan
            <span className="block text-primary">&amp; Ayam Geprek Sereh</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi utama">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => track("menu_view", { section: n.label })}
              className="text-[15px] font-medium text-ink hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={openCart}
            aria-label={`Keranjang, ${count} item`}
            className="relative flex h-11 w-11 items-center justify-center border border-border hover:bg-surface"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center bg-primary px-1 text-[11px] font-bold text-primary-foreground">
              {count}
            </span>
          </button>
          <a href="#racik" className="hidden md:block">
            <Button size="sm">Pesan Sekarang</Button>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center border border-border hover:bg-surface lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border lg:hidden" aria-label="Navigasi mobile">
          <ul className="mx-auto max-w-[1280px] px-5 py-2 md:px-8">
            {nav.map((n) => (
              <li key={n.href} className="border-b border-border last:border-0">
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-lg font-semibold"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

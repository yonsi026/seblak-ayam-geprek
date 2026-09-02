import { store } from "@/data/menu";

const nav = [
  { href: "#menu", label: "Menu" },
  { href: "#racik", label: "Seblak" },
  { href: "#ayam-geprek", label: "Ayam Geprek" },
  { href: "#promo", label: "Promo" },
  { href: "#kontak", label: "Kontak" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm font-extrabold uppercase leading-tight tracking-tight">
              Seblak Prasmanan
              <span className="block text-primary">&amp; Ayam Geprek Sereh</span>
            </p>
            <p className="mt-3 text-[15px] text-muted-foreground">{store.city}, Indonesia</p>
          </div>
          <nav className="md:col-span-3" aria-label="Navigasi footer">
            <p className="label-mono text-muted-foreground">Menu</p>
            <ul className="mt-3 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-[15px] font-medium hover:text-primary">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="label-mono text-muted-foreground">Kontak</p>
            <ul className="mt-3 space-y-2 text-[15px]">
              <li>
                <a
                  href={`https://wa.me/${store.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary"
                >
                  WhatsApp +{store.whatsapp}
                </a>
              </li>
              <li className="text-muted-foreground">{store.address}</li>
              <li className="text-muted-foreground">{store.hours}</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-[13px] text-muted-foreground">
          © 2026 Seblak Prasmanan dan Ayam Geprek Sereh
        </p>
      </div>
    </footer>
  );
}

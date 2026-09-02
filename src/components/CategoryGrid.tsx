import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ayamGeprek, heroSeblak, minuman, toppingsImg } from "@/lib/images";
import { track } from "@/lib/analytics";

const categories = [
  {
    id: "seblak",
    name: "Seblak",
    desc: "Racik sendiri sesuai selera.",
    href: "#racik",
    image: heroSeblak,
    alt: "Mangkuk seblak pedas dengan topping lengkap",
    span: "md:col-span-7",
    ratio: "aspect-[4/3]",
  },
  {
    id: "geprek",
    name: "Ayam Geprek",
    desc: "Ayam crispy dengan racikan bumbu khas.",
    href: "#ayam-geprek",
    image: ayamGeprek,
    alt: "Ayam geprek crispy dengan sambal rica-rica dan sereh",
    span: "md:col-span-5",
    ratio: "aspect-[4/5]",
  },
  {
    id: "minuman",
    name: "Minuman",
    desc: "Teman makan yang menyegarkan.",
    href: "#menu",
    image: minuman,
    alt: "Dua gelas es teh dingin dengan es batu",
    span: "md:col-span-4",
    ratio: "aspect-square",
  },
  {
    id: "topping",
    name: "Extra Topping",
    desc: "Tambah topping favoritmu.",
    href: "#racik",
    image: toppingsImg,
    alt: "Nampan prasmanan berisi berbagai topping seblak",
    span: "md:col-span-8",
    ratio: "aspect-[16/9]",
  },
];

export function CategoryGrid() {
  return (
    <section id="kategori" className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
      <SectionHeading index="01" label="Menu" title="Mau Makan Apa Hari Ini?" />
      <div className="mt-10 grid gap-8 md:grid-cols-12">
        {categories.map((c) => (
          <a
            key={c.id}
            href={c.href}
            onClick={() => track("menu_view", { category: c.id })}
            className={`group block ${c.span}`}
          >
            <img
              src={c.image}
              alt={c.alt}
              loading="lazy"
              className={`w-full ${c.ratio} object-cover`}
            />
            <div className="mt-4 flex items-start justify-between gap-4 border-t border-ink pt-3">
              <div className="min-w-0">
                <h3 className="text-xl font-bold uppercase tracking-tight md:text-2xl">{c.name}</h3>
                <p className="mt-1 text-[15px] text-muted-foreground">{c.desc}</p>
              </div>
              <span className="mt-1 flex shrink-0 items-center gap-1 text-[13px] font-semibold text-primary">
                Lihat
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

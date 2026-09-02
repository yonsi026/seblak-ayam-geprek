import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/menu";

export function BestSeller() {
  return (
    <section id="menu" className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <SectionHeading
          index="02"
          label="Favorit"
          title="Favorit Pelanggan"
          description="Menu yang paling sering dipesan. Harga sudah termasuk porsi standar, topping bisa ditambah saat meracik."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ayamGeprek } from "@/lib/images";
import { formatIDR, geprekMenu } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/Button";

export function AyamGeprekSection() {
  const { addItem } = useCart();

  return (
    <section id="ayam-geprek" className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <SectionHeading
          index="04"
          label="Ayam Geprek"
          title="Ayam Geprek Penuh Rasa."
          description="Ayam crispy dengan racikan bumbu sereh dan sambal rica-rica yang bikin makan jadi lebih nikmat."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <img
              src={ayamGeprek}
              alt="Ayam geprek crispy dengan sambal rica-rica, batang sereh, dan nasi putih"
              loading="lazy"
              width={1408}
              height={1008}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="lg:col-span-5">
            <ul className="border-t border-ink">
              {geprekMenu.map((p) => (
                <li
                  key={p.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-4"
                >
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-bold tracking-tight">{p.name}</h3>
                    <p className="mt-1 text-[14px] text-muted-foreground">{p.description}</p>
                    <p className="mt-2 text-[17px] font-extrabold">{formatIDR(p.price)}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addItem({ id: p.id, name: p.name, price: p.price })}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" /> Tambah
                  </Button>
                </li>
              ))}
            </ul>
            <a href="#menu" className="mt-6 inline-block">
              <Button variant="ink">Lihat Ayam Geprek</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

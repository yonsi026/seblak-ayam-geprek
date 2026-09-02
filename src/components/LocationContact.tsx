import { Bike, Clock, MapPin, MessageCircle, ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { store } from "@/data/menu";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/cart";
import { track } from "@/lib/analytics";

export function LocationContact() {
  return (
    <section id="kontak" className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
      <SectionHeading index="08" label="Lokasi" title="Datang atau Kami Antar." />
      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <dl className="grid gap-6 md:col-span-7">
          <Item icon={MapPin} label="Lokasi">
            {store.address}
          </Item>
          <Item icon={Clock} label="Jam buka">
            {store.hours}
          </Item>
          <Item icon={Bike} label="Delivery">
            Radius 5 km dari toko, ongkir mulai Rp5.000. Konfirmasi via WhatsApp.
          </Item>
          <Item icon={ShoppingBag} label="Pickup">
            Pesan dulu lewat WhatsApp, ambil 15 menit kemudian tanpa antre.
          </Item>
        </dl>

        <div className="md:col-span-5">
          <div className="border border-ink p-6">
            <p className="label-mono text-muted-foreground">Kanal pesanan utama</p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight">
              Pesan langsung via WhatsApp
            </h3>
            <p className="mt-3 text-[15px] text-muted-foreground">
              Kirim racikanmu, kami balas dengan konfirmasi harga dan estimasi waktu.
            </p>
            <a
              href={waLink("Hallo, saya mau tanya menu dan pesan seblak.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "location" })}
              className="mt-5 block"
            >
              <Button size="lg" className="w-full">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Pesan via WhatsApp
              </Button>
            </a>
            <a
              href={store.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center text-[14px] font-semibold underline"
            >
              Buka lokasi di Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-t border-border pt-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <div className="min-w-0">
        <dt className="label-mono text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-[17px] leading-relaxed">{children}</dd>
      </div>
    </div>
  );
}

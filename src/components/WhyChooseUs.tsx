import { SectionHeading } from "@/components/SectionHeading";

const items = [
  {
    n: "01",
    title: "Bisa Racik Sendiri",
    desc: "Pilih topping dan level pedas sesuai selera.",
  },
  { n: "02", title: "Harga Transparan", desc: "Harga makanan dan topping terlihat jelas." },
  { n: "03", title: "Pesan Cepat", desc: "Proses pemesanan dibuat sederhana." },
  {
    n: "04",
    title: "Bisa Delivery atau Pickup",
    desc: "Pilih cara menerima pesanan sesuai kebutuhan.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="tentang" className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
      <SectionHeading index="06" label="Alasan" title="Kenapa Pilih Kami?" />
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <li key={i.n} className="border-t border-ink pt-4">
            <p className="text-3xl font-extrabold tracking-tight text-primary">{i.n}</p>
            <h3 className="mt-3 text-[17px] font-bold tracking-tight">{i.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{i.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

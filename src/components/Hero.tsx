import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/action-button";
import { heroSeblak } from "@/lib/images";
import { MicroConversion } from "@/components/MicroConversion";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1280px] px-5 pb-12 pt-8 md:px-8 md:pt-12 lg:px-12">
      <div className="grid gap-8 md:grid-cols-12 md:gap-8 lg:gap-12">
        <div className="md:col-span-7 lg:col-span-6">
          <p className="label-mono text-primary">Seblak Prasmanan · Ayam Geprek Sereh</p>
          <h1 className="display-tight mt-5 text-[clamp(2.25rem,9vw,6rem)]">
            Seblak Sesuai Selera,
            <br />
            Ayam Geprek
            <br />
            <span className="text-primary">Penuh Rasa.</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground md:text-[18px]">
            Racik sendiri seblak favoritmu atau nikmati ayam geprek dengan bumbu sereh dan sambal
            rica-rica.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#racik" className="sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Pesan Sekarang <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            <a href="#menu" className="sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Lihat Menu
              </Button>
            </a>
          </div>
          <MicroConversion />
        </div>

        <div className="md:col-span-5 lg:col-span-6">
          <div className="relative">
            <img
              src={heroSeblak}
              alt="Semangkuk seblak prasmanan dengan kerupuk, mie, telur, bakso, sosis, ceker, dan cabai merah dalam kuah pedas"
              width={1280}
              height={1600}
              className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
            />
            <ul className="mt-3 grid grid-cols-3 border-t border-ink">
              <li className="label-mono border-r border-border py-3 pr-2">Level pedas 0—5</li>
              <li className="label-mono border-r border-border px-2 py-3">Topping sesuai selera</li>
              <li className="label-mono py-3 pl-2 text-primary">Order online</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

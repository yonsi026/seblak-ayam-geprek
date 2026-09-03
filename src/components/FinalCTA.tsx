import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/action-button";
import { waLink } from "@/lib/cart";
import { track } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <section className="bg-ink text-background">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="label-mono text-primary">09 / Pesan</p>
            <h2 className="display-tight mt-4 text-[clamp(2.25rem,7vw,4.5rem)]">
              Sudah Tahu Mau Makan Apa?
            </h2>
            <p className="mt-5 max-w-[44ch] text-[17px] text-background/70">
              Racik seblak favoritmu atau pilih ayam geprek andalan kami.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-5 sm:flex-row md:justify-end">
            <a href="#racik">
              <Button size="lg" className="w-full sm:w-auto">
                Pesan Sekarang <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            <a
              href={waLink("Hallo, saya mau pesan seblak.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "final_cta" })}
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full border-background bg-transparent text-background hover:bg-background/10 sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

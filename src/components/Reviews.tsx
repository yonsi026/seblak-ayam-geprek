import { Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { reviews } from "@/data/menu";

export function Reviews() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <SectionHeading index="07" label="Ulasan" title="Kata Mereka" />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <li key={r.id} className="flex flex-col border-t border-ink bg-background p-5">
              <p className="flex items-center gap-0.5" aria-label={`${r.rating} dari 5 bintang`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < r.rating ? "h-4 w-4 fill-primary text-primary" : "h-4 w-4 text-input"
                    }
                    aria-hidden="true"
                  />
                ))}
              </p>
              <blockquote className="mt-4 text-[16px] leading-relaxed">“{r.text}”</blockquote>
              <footer className="mt-auto pt-4">
                <p className="text-[15px] font-bold">— {r.name}</p>
                <p className="label-mono mt-1 text-muted-foreground">{r.meta}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

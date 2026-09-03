import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CartProvider } from "@/lib/cart";
import { track } from "@/lib/analytics";
import { store } from "@/data/menu";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BestSeller } from "@/components/BestSeller";
import { SeblakCustomizer } from "@/components/SeblakCustomizer";
import { AyamGeprekSection } from "@/components/AyamGeprekSection";
import { PromotionBanner } from "@/components/PromotionBanner";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Reviews } from "@/components/Reviews";
import { LocationContact } from "@/components/LocationContact";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";
import { StickyOrderBar } from "@/components/StickyOrderBar";

const title = `Seblak Prasmanan & Ayam Geprek Sereh | ${store.city}`;
const description =
  "Nikmati seblak prasmanan dengan topping pilihan dan ayam geprek bumbu sereh rica-rica. Pesan online dengan mudah.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "seblak prasmanan, seblak enak, seblak topping, ayam geprek, ayam geprek sereh, ayam geprek rica-rica, seblak terdekat, makanan pedas",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: LandingPage,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: store.name,
  servesCuisine: "Indonesian",
  address: { "@type": "PostalAddress", streetAddress: store.address, addressLocality: store.city },
  openingHours: "Mo-Su 10:00-21:30",
  telephone: `+${store.whatsapp}`,
  priceRange: "Rp",
};

function LandingPage() {
  useEffect(() => {
    track("page_view", { page: "landing" });
  }, []);

  return (
    <CartProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="pb-20 md:pb-0">
        <Hero />
        <CategoryGrid />
        <BestSeller />
        <SeblakCustomizer />
        <AyamGeprekSection />
        <PromotionBanner />
        <WhyChooseUs />
        <Reviews />
        <LocationContact />
        <FinalCTA />
      </main>
      <Footer />
      <CartSheet />
      <StickyOrderBar />
    </CartProvider>
  );
}

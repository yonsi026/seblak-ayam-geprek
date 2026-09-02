# Seblak Prasmanan & Ayam Geprek Sereh — Swiss-Style Landing Page

A single high-converting landing page in Swiss / International Typographic Style: white canvas, black typography, orange (#F97316) reserved for interaction and conversion, food photography as the visual hero. Mobile-first at 360px, redesigned per breakpoint rather than scaled down.

## Page structure (top to bottom)

1. Header — wordmark left, nav (Menu, Seblak, Ayam Geprek, Promo, Tentang Kami), cart + "Pesan Sekarang" right; hamburger + cart on mobile.
2. Hero — asymmetric split: heavy headline "Seblak Sesuai Selera, Ayam Geprek Penuh Rasa.", subheadline, primary + secondary CTA, editorial food crop with functional micro-labels (LEVEL PEDAS 0—5, TOPPING SESUAI SELERA, ORDER ONLINE).
3. Micro-conversion strip — Racik sendiri / Topping pilihan / Level pedas 0–5 / Delivery & Pickup / WhatsApp, small Lucide icons only.
4. Kategori — "Mau Makan Apa Hari Ini?" — Seblak, Ayam Geprek, Minuman, Extra Topping in a varied editorial grid (unequal image proportions on the same grid).
5. Favorit Pelanggan — product cards with image, badge, name, description, visible price, rating, "+ Tambah".
6. Racik Seblakmu Sendiri — the strongest visual moment. Working interactive customizer laid out as a digital food counter: 01 base, 02 level pedas 0–5, 03 topping, 04 extra, 05 catatan, with live running total and quantity controls. Orange active states, minimal radius, no heavy shadows.
7. Spicy level selector — 0→5 progression with labels Tidak Pedas … Brutal; selected = orange fill, white text.
8. Ayam Geprek — one dominant photograph plus compact grid of Original, Sereh, Rica-Rica, Paket Hemat; CTA "Lihat Ayam Geprek".
9. Promo — voucher SEBLAKHEMAT, min. Rp30.000, potongan Rp5.000, CTA "Ambil Promo".
10. Kenapa Pilih Kami — 4 numbered benefits, minimal.
11. Kata Mereka — reviews in a clean editorial layout, driven by a data array so real reviews drop in later.
12. Lokasi & Kontak — address, jam buka, delivery/pickup info, "Pesan via WhatsApp".
13. Final CTA — "Sudah Tahu Mau Makan Apa?" with dominant primary CTA + WhatsApp secondary.
14. Footer — brand, nav, contact, hours, copyright 2026. Nothing more.
15. Mobile sticky order bar — item count + "Lihat Keranjang" / "Pesan Sekarang", hidden when the cart is empty and while the hero is on screen.

## Ordering behaviour on this page

Cart lives in client state on the landing page (no backend). Adding a product or a racikan opens a cart sheet listing items, quantities, and total. Checkout hands off to WhatsApp with a pre-formatted message: items, level pedas, topping, extra, catatan, qty, total, plus name/address/method fields the customer fills in the chat. Analytics events (page_view, add_to_cart, whatsapp_click, etc.) are fired through a single thin tracker function so a real provider can be wired in later.

## Design system

- Tokens in `src/styles.css`: orange #F97316, white, #1F1F1F, #F5F5F5, success #22C55E, error #EF4444 — converted to oklch, mapped as semantic tokens. No extra colours.
- Inter loaded via `<link>` in the root route; weights 400/500/600/700/800.
- Type scale: hero 36–44px mobile → 72–96px desktop; body 16–18px; nav 14–16px.
- Spacing on a 4/8 scale only; max content width 1280px; padding 20–24px mobile, 32–48px desktop.
- Small radius, thin rules, no gradients, no glassmorphism, minimal shadow.
- Animation limited to fade/slide-in on scroll, hover, and selection transitions.

## Technical notes

- Built on this project's stack: TanStack Start + React + TypeScript + Tailwind v4 + Lucide (Next.js is not available here; the component breakdown from the brief is kept as-is).
- Components under `src/components/`: Header, Hero, MicroConversion, CategoryGrid, ProductCard, BestSeller, SeblakCustomizer, SpicyLevelSelector, ToppingSelector, AyamGeprekSection, PromotionBanner, WhyChooseUs, Reviews, LocationContact, FinalCTA, Footer, CartButton, CartSheet, StickyOrderBar.
- Product/topping/review data in `src/data/menu.ts` typed with the fields from the brief (id, name, category, price, rating, isBestSeller, isAvailable, …) so an API can replace it without UI changes.
- Page rendered at `/` by rewriting `src/routes/index.tsx`, with semantic sections, one H1, route `head()` metadata for the given title/description, alt text on every image, and JSON-LD Restaurant schema.
- Food imagery generated as commercial-style close-ups (seblak with ceker/bakso/telur/seafood, ayam geprek with sambal rica-rica and sereh), aggressively cropped, lazy-loaded below the fold.

## Placeholders to confirm later

City name, exact address, opening hours, WhatsApp number, and real prices use clearly marked placeholders; tell me the real values and I will swap them in.

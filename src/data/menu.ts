// Static menu data. Shaped so it can be replaced by an API/database response
// later without touching the UI components.

export type Category = "seblak" | "ayam-geprek" | "minuman" | "topping";

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  isBestSeller: boolean;
  isPromotion: boolean;
  isAvailable: boolean;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
}

export interface SeblakBase {
  id: string;
  name: string;
  price: number;
}

export interface SpicyLevel {
  level: number;
  label: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  meta: string;
}

/** Store profile — replace with real business data. */
export const store = {
  name: "Seblak Prasmanan & Ayam Geprek Sereh",
  shortName: "Sereh",
  city: "Malang",
  address: "Jl. Contoh Raya No. 12, Kec. Lowokwaru, Malang",
  hours: "Setiap hari · 10.00 – 21.30 WIB",
  whatsapp: "6281234567890",
  maps: "https://maps.google.com/?q=Seblak+Prasmanan+Ayam+Geprek+Sereh",
};

export const products: Product[] = [
  {
    id: "seblak-komplit",
    name: "Seblak Komplit",
    category: "seblak",
    description: "Kerupuk, mie, telur, bakso, sosis, dan topping pilihan.",
    image: "hero-seblak",
    price: 20000,
    rating: 4.9,
    reviewCount: 312,
    isBestSeller: true,
    isPromotion: false,
    isAvailable: true,
  },
  {
    id: "seblak-ceker",
    name: "Seblak Ceker Komplit",
    category: "seblak",
    description: "Pedas, gurih, ceker empuk, topping melimpah.",
    image: "hero-seblak",
    price: 18000,
    rating: 4.8,
    reviewCount: 204,
    isBestSeller: true,
    isPromotion: true,
    isAvailable: true,
  },
  {
    id: "seblak-seafood",
    name: "Seblak Seafood",
    category: "seblak",
    description: "Cumi, udang, dumpling, dan kuah kaldu pedas.",
    image: "toppings",
    price: 23000,
    rating: 4.7,
    reviewCount: 128,
    isBestSeller: false,
    isPromotion: false,
    isAvailable: true,
  },
  {
    id: "geprek-sereh",
    name: "Ayam Geprek Sereh",
    category: "ayam-geprek",
    description: "Ayam crispy digeprek bumbu sereh, nasi hangat.",
    image: "ayam-geprek",
    price: 17000,
    rating: 4.9,
    reviewCount: 276,
    isBestSeller: true,
    isPromotion: false,
    isAvailable: true,
  },
  {
    id: "geprek-rica",
    name: "Ayam Geprek Rica-Rica",
    category: "ayam-geprek",
    description: "Sambal rica-rica pedas segar, ayam tetap kriuk.",
    image: "ayam-geprek",
    price: 18000,
    rating: 4.8,
    reviewCount: 189,
    isBestSeller: false,
    isPromotion: false,
    isAvailable: true,
  },
  {
    id: "es-teh",
    name: "Es Teh Jumbo",
    category: "minuman",
    description: "Teh dingin ukuran jumbo, penawar pedas.",
    image: "minuman",
    price: 5000,
    rating: 4.8,
    reviewCount: 141,
    isBestSeller: false,
    isPromotion: false,
    isAvailable: true,
  },
];

export const geprekMenu: Product[] = [
  {
    id: "geprek-original",
    name: "Ayam Geprek Original",
    category: "ayam-geprek",
    description: "Sambal bawang klasik, level bisa dipilih.",
    image: "ayam-geprek",
    price: 15000,
    rating: 4.8,
    reviewCount: 233,
    isBestSeller: false,
    isPromotion: false,
    isAvailable: true,
  },
  products[3]!,
  products[4]!,
  {
    id: "geprek-paket",
    name: "Paket Hemat Geprek",
    category: "ayam-geprek",
    description: "Ayam geprek + nasi + es teh jumbo.",
    image: "ayam-geprek",
    price: 21000,
    rating: 4.9,
    reviewCount: 97,
    isBestSeller: true,
    isPromotion: true,
    isAvailable: true,
  },
];

export const bases: SeblakBase[] = [
  { id: "kerupuk", name: "Kerupuk", price: 8000 },
  { id: "mie", name: "Mie", price: 9000 },
  { id: "kwetiau", name: "Kwetiau", price: 10000 },
  { id: "macaroni", name: "Macaroni", price: 9000 },
];

export const spicyLevels: SpicyLevel[] = [
  { level: 0, label: "Tidak Pedas" },
  { level: 1, label: "Sedikit Pedas" },
  { level: 2, label: "Pedas" },
  { level: 3, label: "Pedas Banget" },
  { level: 4, label: "Extra Pedas" },
  { level: 5, label: "Brutal" },
];

export const toppings: Topping[] = [
  { id: "bakso", name: "Bakso", price: 3000, isAvailable: true },
  { id: "sosis", name: "Sosis", price: 3000, isAvailable: true },
  { id: "ceker", name: "Ceker", price: 4000, isAvailable: true },
  { id: "telur", name: "Telur", price: 3500, isAvailable: true },
  { id: "seafood", name: "Seafood", price: 6000, isAvailable: true },
  { id: "dumpling", name: "Dumpling", price: 4000, isAvailable: true },
  { id: "cheese", name: "Cheese", price: 4500, isAvailable: true },
  { id: "sayuran", name: "Sayuran", price: 2000, isAvailable: true },
  { id: "kikil", name: "Kikil", price: 5000, isAvailable: true },
  { id: "tulang", name: "Tulang", price: 5000, isAvailable: false },
];

export const extras: Topping[] = [
  { id: "extra-telur", name: "Extra telur", price: 3500, isAvailable: true },
  { id: "extra-kerupuk", name: "Extra kerupuk", price: 2500, isAvailable: true },
  { id: "extra-topping", name: "Extra topping", price: 4000, isAvailable: true },
  { id: "extra-sambal", name: "Extra sambal", price: 2000, isAvailable: true },
  { id: "extra-kuah", name: "Extra kuah", price: 2000, isAvailable: true },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Dina",
    rating: 5,
    text: "Seblaknya bisa pilih topping sendiri, jadi puas banget. Level 4 pas pedasnya.",
    meta: "Seblak Komplit · Delivery",
  },
  {
    id: "r2",
    name: "Rizky",
    rating: 5,
    text: "Ayam geprek serehnya beda, wangi dan tetap kriuk walau dibungkus.",
    meta: "Ayam Geprek Sereh · Pickup",
  },
  {
    id: "r3",
    name: "Ayu",
    rating: 5,
    text: "Harga topping kelihatan semua jadi enak ngaturnya. Pesan lewat WhatsApp cepat dibalas.",
    meta: "Seblak Ceker · Delivery",
  },
  {
    id: "r4",
    name: "Bagas",
    rating: 4,
    text: "Porsinya banyak, kuahnya gurih. Request kuah sedikit dituruti.",
    meta: "Seblak Seafood · Pickup",
  },
];

export const promo = {
  code: "SEBLAKHEMAT",
  minPurchase: 30000,
  discount: 5000,
};

export const formatIDR = (value: number) =>
  "Rp" + value.toLocaleString("id-ID", { maximumFractionDigits: 0 });

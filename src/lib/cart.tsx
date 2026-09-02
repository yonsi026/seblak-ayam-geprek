import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { formatIDR, promo, store } from "@/data/menu";
import { track } from "@/lib/analytics";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  spicyLevel?: number;
  toppings?: string[];
  extras?: string[];
  notes?: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  discount: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  whatsappUrl: () => string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback<CartContextValue["addItem"]>((item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i,
        );
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }];
    });
    track("add_to_cart", { item_id: item.id, item_name: item.name, price: item.price });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
    const discount = subtotal >= promo.minPurchase ? promo.discount : 0;
    const total = Math.max(0, subtotal - discount);

    const whatsappUrl = () => {
      const lines: string[] = ["Hallo, saya mau pesan:", ""];
      items.forEach((i) => {
        lines.push(`• ${i.name} x${i.quantity} — ${formatIDR(i.price * i.quantity)}`);
        if (typeof i.spicyLevel === "number") lines.push(`  Level pedas: ${i.spicyLevel}`);
        if (i.toppings?.length) lines.push(`  Topping: ${i.toppings.join(", ")}`);
        if (i.extras?.length) lines.push(`  Extra: ${i.extras.join(", ")}`);
        if (i.notes) lines.push(`  Catatan: ${i.notes}`);
      });
      lines.push("");
      if (discount) lines.push(`Promo ${promo.code}: -${formatIDR(discount)}`);
      lines.push(`Total: ${formatIDR(total)}`);
      lines.push("", "Nama:", "Alamat:", "Metode (Delivery/Pickup):", "Pembayaran (Transfer/COD):");
      return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    };

    return {
      items,
      count,
      subtotal,
      discount,
      total,
      isOpen,
      openCart: () => {
        track("view_cart", { item_count: count });
        setIsOpen(true);
      },
      closeCart: () => setIsOpen(false),
      addItem,
      setQuantity,
      removeItem,
      clear: () => setItems([]),
      whatsappUrl,
    };
  }, [items, isOpen, addItem, setQuantity, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/** Direct WhatsApp link with no cart contents (generic enquiry). */
export function waLink(message: string) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

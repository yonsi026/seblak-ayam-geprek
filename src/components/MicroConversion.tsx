import { Bike, Flame, MessageCircle, ShoppingBag, UtensilsCrossed } from "lucide-react";

const items = [
  { icon: UtensilsCrossed, label: "Racik sendiri" },
  { icon: ShoppingBag, label: "Topping pilihan" },
  { icon: Flame, label: "Level pedas 0–5" },
  { icon: Bike, label: "Delivery / Pickup" },
  { icon: MessageCircle, label: "Pesan via WhatsApp" },
];

export function MicroConversion() {
  return (
    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5">
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2 text-[14px] font-medium text-ink">
          <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

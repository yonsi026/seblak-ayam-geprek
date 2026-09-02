// Thin analytics shim. Swap the body for a real provider later; every
// component calls only `track`.
export type AnalyticsEvent =
  | "page_view"
  | "menu_view"
  | "product_view"
  | "customizer_start"
  | "topping_selected"
  | "add_to_cart"
  | "view_cart"
  | "checkout_start"
  | "payment_selected"
  | "order_completed"
  | "whatsapp_click"
  | "promo_clicked";

export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...payload });
}

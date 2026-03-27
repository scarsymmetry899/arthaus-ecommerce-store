/**
 * Analytics stubs — ready to wire to GA4, Plausible, or Hotjar.
 * Replace the console.log bodies with your real tracking calls.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

/** Track a page view (called automatically by GA4 on SPA navigation when using gtag). */
export function trackPageView(page: string) {
  if (typeof window === "undefined") return;
  // Example: window.gtag?.("event", "page_view", { page_path: page });
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics] page_view:", page);
  }
}

/** Track a generic named event with optional parameters. */
export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  // Example: window.gtag?.("event", eventName, params);
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics] event:", eventName, params);
  }
}

/** Track enhanced e-commerce actions (add_to_cart, purchase, etc.). */
export function trackEcommerce(
  action: "view_item" | "add_to_cart" | "remove_from_cart" | "begin_checkout" | "purchase",
  items: Array<{
    id: string;
    name: string;
    category?: string;
    price: number;
    quantity?: number;
  }>,
  extra?: EventParams
) {
  if (typeof window === "undefined") return;
  // Example: window.gtag?.("event", action, { items, ...extra });
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics] ecommerce:", action, { items, ...extra });
  }
}

/** Track a wishlist add/remove. */
export function trackWishlist(action: "add" | "remove", productId: string, productName: string) {
  trackEvent(`wishlist_${action}`, { product_id: productId, product_name: productName });
}

/** Track search queries. */
export function trackSearch(query: string, resultCount: number) {
  trackEvent("search", { search_term: query, result_count: resultCount });
}

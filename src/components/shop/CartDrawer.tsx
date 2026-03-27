"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const FREE_SHIPPING_THRESHOLD = 150;

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, itemCount } =
    useCart();

  const subtotal = getSubtotal();
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(10,10,10,0.5)" }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex flex-col"
            style={{
              width: "440px",
              maxWidth: "100vw",
              backgroundColor: "var(--bg)",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} style={{ color: "var(--text)" }} />
                <h2
                  className="text-[15px] uppercase tracking-[0.15em]"
                  style={{ color: "var(--text)" }}
                >
                  Your Collection
                </h2>
                {itemCount > 0 && (
                  <span
                    className="w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-medium"
                    style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 rounded-full transition-colors hover:bg-[#E8E4DF]"
              >
                <X size={18} style={{ color: "var(--text)" }} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: "var(--cream)" }}
                  >
                    <ShoppingBag size={32} style={{ color: "var(--muted)" }} />
                  </div>
                  <h3
                    className="text-[22px] mb-3"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                  >
                    Your collection awaits
                  </h3>
                  <p className="text-[14px] mb-8" style={{ color: "var(--muted)" }}>
                    Discover works that speak to you and build your personal gallery.
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-8 py-3 text-[12px] uppercase tracking-[0.15em] border transition-all hover:bg-[#C5A572] hover:border-[#C5A572] hover:text-[#0A0A0A]"
                    style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
                  >
                    <Link href="/shop">Explore the Gallery</Link>
                  </button>
                </div>
              ) : (
                <div className="px-6 py-4">
                  {/* Shipping progress */}
                  {remainingForFreeShip > 0 ? (
                    <div className="mb-5 p-3 rounded-[3px]" style={{ backgroundColor: "var(--cream)" }}>
                      <p className="text-[12px] mb-2" style={{ color: "var(--text)" }}>
                        Add{" "}
                        <span style={{ color: "#C5A572" }}>${remainingForFreeShip}</span>{" "}
                        more for free shipping
                      </p>
                      <div className="h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border-color)" }}>
                        <div
                          className="h-full transition-all duration-500"
                          style={{ width: `${shippingProgress}%`, backgroundColor: "#C5A572" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mb-5 p-3 rounded-[3px] text-[12px]" style={{ backgroundColor: "rgba(197,165,114,0.1)", color: "#C5A572" }}>
                      ✓ You have free shipping!
                    </div>
                  )}

                  {/* Item list */}
                  <AnimatePresence>
                    {items.map((item, i) => (
                      <motion.div
                        key={`${item.product.id}-${item.selected_size.sku}-${i}`}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b py-4"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        <div className="flex gap-4">
                          {/* Thumbnail */}
                          <Link href={`/shop/${item.product.slug}`} onClick={closeCart}>
                            <div className="w-[80px] h-[96px] rounded-[3px] overflow-hidden shrink-0" style={{ backgroundColor: "var(--cream)" }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.product.images.primary}
                                alt={item.product.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
                              {item.product.artist.name}
                            </p>
                            <p
                              className="text-[15px] leading-snug mt-0.5"
                              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                            >
                              {item.product.title}
                            </p>
                            <p className="text-[12px] mt-0.5" style={{ color: "var(--muted)" }}>
                              {item.selected_size.dimensions}
                              {item.selected_frame && ` · ${item.selected_frame.name}`}
                              {item.selected_mat && item.selected_mat !== "none" && ` · ${item.selected_mat} mat`}
                            </p>

                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity stepper */}
                              <div className="flex items-center border rounded-[3px]" style={{ borderColor: "var(--border-color)" }}>
                                <button
                                  onClick={() => updateQuantity(i, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-7 h-7 flex items-center justify-center disabled:opacity-30 hover:text-[#C5A572] transition-colors"
                                  style={{ color: "var(--text)" }}
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="w-7 text-center text-[13px]" style={{ color: "var(--text)" }}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(i, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center hover:text-[#C5A572] transition-colors"
                                  style={{ color: "var(--text)" }}
                                >
                                  <Plus size={11} />
                                </button>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-[14px] font-medium" style={{ color: "var(--text)" }}>
                                  ${item.total_price}
                                </span>
                                <button
                                  onClick={() => removeItem(i)}
                                  className="p-1 transition-colors hover:text-red-500"
                                  style={{ color: "var(--muted)" }}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Upsell — items without frames */}
                  {items.some((item) => !item.selected_frame) && (
                    <div
                      className="mt-4 p-4 rounded-[3px] border"
                      style={{ borderColor: "#C5A572", backgroundColor: "rgba(197,165,114,0.05)" }}
                    >
                      <p className="text-[12px] font-medium mb-1" style={{ color: "#C5A572" }}>
                        Add a frame?
                      </p>
                      <p className="text-[12px]" style={{ color: "var(--muted)" }}>
                        Some items in your cart don't have frames. Complete the look.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer — order summary */}
            {items.length > 0 && (
              <div
                className="border-t px-6 py-5"
                style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg)" }}
              >
                {/* Subtotal */}
                <div className="flex justify-between mb-2 text-[14px]">
                  <span style={{ color: "var(--muted)" }}>Subtotal</span>
                  <span style={{ color: "var(--text)" }}>${subtotal}</span>
                </div>
                <div className="flex justify-between mb-4 text-[14px]">
                  <span style={{ color: "var(--muted)" }}>Shipping</span>
                  <span style={{ color: subtotal >= FREE_SHIPPING_THRESHOLD ? "#C5A572" : "var(--text)" }}>
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : "Calculated at checkout"}
                  </span>
                </div>

                {/* Checkout button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-4 text-center text-[13px] uppercase tracking-[0.2em] font-medium transition-all hover:brightness-110"
                  style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full mt-3 text-center text-[12px] uppercase tracking-[0.1em] transition-colors hover:text-[#C5A572]"
                  style={{ color: "var(--muted)" }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

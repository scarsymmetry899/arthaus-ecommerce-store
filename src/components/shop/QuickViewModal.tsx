"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      product,
      selected_size: product.sizes[1] || product.sizes[0],
      quantity: 1,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(10,10,10,0.6)", backdropFilter: "blur(4px)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              className="relative pointer-events-auto flex flex-col md:flex-row gap-0 overflow-hidden rounded-[4px]"
              style={{
                width: "min(800px, 95vw)",
                maxHeight: "85vh",
                backgroundColor: "var(--bg)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#E8E4DF]"
              >
                <X size={16} style={{ color: "var(--text)" }} />
              </button>

              {/* Image */}
              <div
                className="w-full md:w-[45%] shrink-0"
                style={{ backgroundColor: "var(--cream)", aspectRatio: "4/5" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images.primary}
                  alt={`${product.title} by ${product.artist.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col p-6 overflow-y-auto flex-1">
                <p className="text-[11px] uppercase tracking-[0.15em] mb-1" style={{ color: "var(--muted)" }}>
                  {product.artist.name}
                </p>
                <h3
                  className="text-[24px] font-normal leading-tight mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                >
                  {product.title}
                </h3>
                <p className="text-[18px] mb-4" style={{ color: "#C5A572" }}>
                  From ${product.price_from}
                </p>

                <p className="text-[14px] leading-relaxed mb-5 flex-1" style={{ color: "var(--muted)" }}>
                  {product.description.slice(0, 200)}…
                </p>

                {/* Size selector */}
                <div className="mb-4">
                  <p className="text-[11px] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--muted)" }}>Sizes from</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.slice(0, 4).map((size) => (
                      <span
                        key={size.sku}
                        className="px-2 py-1 text-[11px] border rounded-[2px]"
                        style={{ borderColor: "var(--border-color)", color: "var(--muted)" }}
                      >
                        {size.label}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3 text-[12px] uppercase tracking-[0.15em] w-full mb-3 transition-all hover:brightness-110"
                  style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                >
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>

                <Link
                  href={`/shop/${product.slug}`}
                  onClick={onClose}
                  className="text-center text-[12px] uppercase tracking-[0.1em] transition-colors hover:text-[#C5A572]"
                  style={{ color: "var(--muted)" }}
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

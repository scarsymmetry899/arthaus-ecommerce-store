"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
}

export function ProductCard({
  product,
  index = 0,
  onQuickView,
  onAddToCart,
  onWishlist,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden rounded-[4px]"
        style={{ aspectRatio: "4/5", backgroundColor: "var(--cream)" }}
      >
        <Link href={`/shop/${product.slug}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images.primary}
            alt={`${product.title} by ${product.artist.name}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span
              className="px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] font-medium"
              style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
            >
              New
            </span>
          )}
          {product.is_bestseller && (
            <span
              className="px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] font-medium"
              style={{ backgroundColor: "#0A0A0A", color: "#FAF8F5" }}
            >
              Best Seller
            </span>
          )}
          {product.is_limited_edition && (
            <span
              className="px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] font-medium border"
              style={{ borderColor: "#C5A572", color: "#C5A572" }}
            >
              Limited
            </span>
          )}
        </div>

        {/* Quick action bar */}
        <motion.div
          className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-2 py-3"
          style={{ backgroundColor: "rgba(10,10,10,0.85)" }}
          initial={{ y: "100%" }}
          animate={hovered ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              aria-label="Quick view"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white hover:border-[#C5A572] hover:text-[#C5A572] transition-colors"
            >
              <Eye size={13} />
            </button>
          )}
          {onWishlist && (
            <button
              onClick={() => onWishlist(product)}
              aria-label="Add to wishlist"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white hover:border-[#C5A572] hover:text-[#C5A572] transition-colors"
            >
              <Heart size={13} />
            </button>
          )}
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              aria-label="Add to cart"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white hover:border-[#C5A572] hover:text-[#C5A572] transition-colors"
            >
              <ShoppingBag size={13} />
            </button>
          )}
          {/* Always show quick view link */}
          {!onQuickView && !onAddToCart && !onWishlist && (
            <Link
              href={`/shop/${product.slug}`}
              className="text-[11px] uppercase tracking-[0.15em] text-white hover:text-[#C5A572] transition-colors"
            >
              View →
            </Link>
          )}
        </motion.div>
      </div>

      {/* Meta */}
      <div className="mt-3 space-y-0.5">
        <p
          className="text-[11px] uppercase tracking-[0.1em]"
          style={{ color: "var(--muted)" }}
        >
          {product.artist.name}
        </p>
        <Link href={`/shop/${product.slug}`}>
          <p
            className="text-[16px] leading-snug transition-colors hover:text-[#C5A572]"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            {product.title}
          </p>
        </Link>
        <p className="text-[13px] font-medium" style={{ color: "#C5A572" }}>
          From ${product.price_from}
        </p>
      </div>
    </motion.div>
  );
}

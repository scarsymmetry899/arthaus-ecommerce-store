"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getNewArrivals } from "@/lib/data-utils";
import type { Product } from "@/types";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="group relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div
          className="relative overflow-hidden rounded-[4px] bg-[#E8E4DF]"
          style={{ aspectRatio: "4/5" }}
        >
          <Link href={`/shop/${product.slug}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images.primary}
              alt={`${product.title} by ${product.artist.name}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* NEW badge */}
          {product.is_new && (
            <div
              className="absolute top-3 left-3 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] font-medium"
              style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
            >
              New
            </div>
          )}

          {/* Limited badge */}
          {product.is_limited_edition && (
            <div
              className="absolute top-3 right-3 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] font-medium"
              style={{ backgroundColor: "#0A0A0A", color: "#FAF8F5" }}
            >
              Limited
            </div>
          )}

          {/* Quick-action bar */}
          <motion.div
            className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-3 py-3"
            style={{ backgroundColor: "rgba(10,10,10,0.85)" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              aria-label="Quick view"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white hover:border-[#C5A572] hover:text-[#C5A572] transition-colors"
            >
              <Eye size={14} />
            </button>
            <button
              aria-label="Add to wishlist"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white hover:border-[#C5A572] hover:text-[#C5A572] transition-colors"
            >
              <Heart size={14} />
            </button>
            <button
              aria-label="Add to cart"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white hover:border-[#C5A572] hover:text-[#C5A572] transition-colors"
            >
              <ShoppingBag size={14} />
            </button>
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
              className="text-[16px] leading-snug hover:text-[#C5A572] transition-colors"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              {product.title}
            </p>
          </Link>
          <p className="text-[13px] font-medium" style={{ color: "#C5A572" }}>
            From ${product.price_from}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function NewArrivals() {
  const newProducts = getNewArrivals().slice(0, 8);

  return (
    <section
      className="py-[80px] lg:py-[120px]"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <ScrollReveal direction="up" threshold={0.2}>
          <div className="flex items-center justify-between mb-12">
            <h2
              className="text-[36px] md:text-[48px] font-normal"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              New to the Gallery
            </h2>
          </div>
        </ScrollReveal>

        {/* 4-col grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {newProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/shop?filter=new"
            className="inline-flex items-center gap-2 px-8 py-3 text-[13px] uppercase tracking-[0.15em] border transition-all duration-300 hover:bg-[#C5A572] hover:border-[#C5A572] hover:text-[#0A0A0A]"
            style={{
              borderColor: "var(--text)",
              color: "var(--text)",
            }}
          >
            View All New Art →
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getProductsByCollection } from "@/lib/data-utils";
import { collections } from "@/data/collections";
import type { Product } from "@/types";

// ─── Individual strip card ────────────────────────────────────────────────────

function StripCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal
      direction="up"
      delay={index * 0.08}
      threshold={0.1}
      // each card is a fixed-width item, don't override block display
      className="shrink-0"
    >
      <Link
        href={`/shop/${product.slug}`}
        className="group block w-[280px] md:w-[320px]"
        style={{ scrollSnapAlign: "start" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Image ──────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-[4px] bg-[#E8E4DF]" style={{ aspectRatio: "4/5" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images.primary}
            alt={`${product.title} by ${product.artist.name}`}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />

          {/* Quick View overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center bg-[rgba(10,10,10,0.25)]"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(250,248,245,0.9)" }}
                >
                  <Eye size={16} color="#0A0A0A" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Meta ───────────────────────────────────────────── */}
        <div className="mt-3 space-y-0.5">
          <p
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "var(--muted)" }}
          >
            {product.artist.name}
          </p>
          <p
            className="text-[17px] leading-snug"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            {product.title}
          </p>
          <p className="text-[13px] font-medium" style={{ color: "#C5A572" }}>
            From ${product.price_from}
          </p>
        </div>
      </Link>
    </ScrollReveal>
  );
}

// ─── Arrow button ─────────────────────────────────────────────────────────────

function ArrowBtn({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Scroll ${direction}`}
      className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 disabled:opacity-30 hover:enabled:border-[#C5A572] hover:enabled:text-[#C5A572]"
      style={{ borderColor: "var(--border-color)", color: "var(--muted)" }}
    >
      {direction === "left" ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );
}

// ─── Featured Collection Strip ────────────────────────────────────────────────

export function FeaturedCollectionStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  // Pick a visually rich collection — fall back to index 0
  const collection = collections.find((c) => c.slug === "mediterranean-summer") ?? collections[0];
  const products   = getProductsByCollection(collection.id).slice(0, 8);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section
      className="py-[80px] lg:py-[120px] overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-[1400px] mx-auto">

        {/* ── Section header ────────────────────────────────── */}
        <div className="flex items-end justify-between px-6 lg:px-10 mb-10">

          {/* Left: vertical label + title */}
          <div className="flex items-end gap-5">
            {/* Vertical "THE COLLECTION" tag */}
            <span
              className="hidden lg:block text-[11px] uppercase tracking-[0.4em] pb-1"
              style={{
                color:       "#C5A572",
                writingMode: "vertical-rl",
                transform:   "rotate(180deg)",
                fontFamily:  "var(--font-body)",
                letterSpacing: "0.3em",
              }}
            >
              The Collection
            </span>

            <div>
              <p
                className="text-[11px] uppercase tracking-[0.15em] mb-1 lg:hidden"
                style={{ color: "#C5A572" }}
              >
                The Collection
              </p>
              <h2
                className="text-3xl lg:text-4xl leading-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                {collection.title}
              </h2>
              <p
                className="mt-1 text-sm max-w-[380px] line-clamp-1"
                style={{ color: "var(--muted)" }}
              >
                {collection.description}
              </p>
            </div>
          </div>

          {/* Right: arrow controls (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <ArrowBtn direction="left"  onClick={() => scrollBy(-344)} disabled={!canLeft}  />
            <ArrowBtn direction="right" onClick={() => scrollBy( 344)} disabled={!canRight} />
          </div>
        </div>

        {/* ── Scrollable strip ──────────────────────────────── */}
        <div className="relative">

          {/* Left fade */}
          {canLeft && (
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, var(--bg) 0%, transparent 100%)",
              }}
            />
          )}

          {/* Right fade — always show initially */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--bg) 0%, transparent 100%)",
            }}
          />

          {/* Cards container */}
          <div
            ref={scrollRef}
            onScroll={updateArrows}
            className="flex gap-6 overflow-x-auto px-6 lg:px-10 pb-6"
            style={{
              scrollSnapType:  "x mandatory",
              scrollbarWidth:  "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product, i) => (
              <StripCard key={product.id} product={product} index={i} />
            ))}

            {/* "View All" card at end */}
            <div
              className="shrink-0 w-[200px] flex items-center justify-center"
              style={{ scrollSnapAlign: "start" }}
            >
              <Link
                href={`/gallery/${collection.slug}`}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 group-hover:border-[#C5A572]"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <ChevronRight size={18} style={{ color: "var(--muted)" }} />
                </div>
                <span
                  className="text-[13px] uppercase tracking-[0.1em] group-hover:text-[#C5A572] transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  View All
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Mobile scroll hint ────────────────────────────── */}
        <p
          className="md:hidden text-center text-[11px] mt-2 uppercase tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          Swipe to explore
        </p>

      </div>
    </section>
  );
}

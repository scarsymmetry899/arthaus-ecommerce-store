"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getFeaturedProducts } from "@/lib/data-utils";
import type { Product } from "@/types";

function ParallaxItem({
  product,
  speed,
  className,
}: {
  product: Product;
  speed: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed * 40, speed * 40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative overflow-hidden rounded-[4px] group cursor-pointer ${className ?? ""}`}
    >
      <Link href={`/shop/${product.slug}`} className="block w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images.primary}
          alt={`${product.title} by ${product.artist.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 60%)",
            opacity: 0,
            transform: "translateY(8px)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.opacity = "0";
            el.style.transform = "translateY(8px)";
          }}
        >
          {/* We use CSS group-hover instead for reliability */}
        </div>
        {/* Always-present overlay using CSS group-hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0) 100%)",
            }}
          />
          <div className="relative z-10">
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/60">
              {product.artist.name}
            </p>
            <p
              className="text-xl text-white leading-snug mt-0.5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {product.title}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium" style={{ color: "var(--gold)" }}>
                From ${product.price_from}
              </span>
              <span className="text-xs text-white/70 uppercase tracking-widest">
                View →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CurationGrid() {
  const featured = getFeaturedProducts().slice(0, 6);

  // Pad to 6 if needed
  while (featured.length < 6) {
    featured.push(featured[featured.length - 1]);
  }

  return (
    <section
      className="py-[80px] lg:py-[120px]"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* ── Section heading ──────────────────────────── */}
        <ScrollReveal direction="up" threshold={0.2}>
          <div className="flex items-center gap-6 mb-12">
            <h2
              className="text-[36px] md:text-[48px] font-normal leading-none shrink-0"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              The Curation
            </h2>
            <div
              className="flex-1 h-px hidden md:block"
              style={{ backgroundColor: "var(--border-color)" }}
            />
          </div>
        </ScrollReveal>

        {/* ── Asymmetric grid ───────────────────────────── */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "280px 280px",
            gridTemplateAreas: `
              "big   big   med1 med1"
              "sm1   sm2   med2 big2"
            `,
          }}
        >
          {/* Large 2×2 top-left */}
          <ParallaxItem
            product={featured[0]}
            speed={0.8}
            className="[grid-area:big]"
          />
          {/* Medium top-right stacked — occupies 2 rows via separate cells */}
          <ParallaxItem
            product={featured[1]}
            speed={1.2}
            className="[grid-area:med1]"
          />
          {/* Small bottom-left */}
          <ParallaxItem
            product={featured[2]}
            speed={1.5}
            className="[grid-area:sm1]"
          />
          {/* Small bottom-center */}
          <ParallaxItem
            product={featured[3]}
            speed={0.6}
            className="[grid-area:sm2]"
          />
          {/* Medium bottom-right */}
          <ParallaxItem
            product={featured[4]}
            speed={1.0}
            className="[grid-area:med2]"
          />
          {/* Medium far-right bottom */}
          <ParallaxItem
            product={featured[5]}
            speed={1.3}
            className="[grid-area:big2]"
          />
        </div>

        {/* ── View All link ─────────────────────────────── */}
        <div className="flex justify-end mt-8">
          <Link
            href="/shop"
            className="text-[13px] uppercase tracking-[0.15em] transition-colors duration-200 hover:text-[#C5A572]"
            style={{ color: "var(--muted)" }}
          >
            View All Art →
          </Link>
        </div>
      </div>
    </section>
  );
}

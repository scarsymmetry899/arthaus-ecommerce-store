"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getRandomProducts } from "@/lib/data-utils";
import { ProductCard } from "@/components/ui/ProductCard";

function FloatingFrame() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="mx-auto mb-10"
      style={{ width: "120px", height: "150px" }}
    >
      <svg
        width="120"
        height="150"
        viewBox="0 0 120 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer frame */}
        <rect x="4" y="4" width="112" height="142" rx="2" stroke="#C5A572" strokeWidth="3" fill="none" />
        {/* Inner mat */}
        <rect x="16" y="16" width="88" height="118" rx="1" stroke="#E8E4DF" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        {/* Center question mark */}
        <text
          x="60"
          y="82"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#C5A572"
          fontSize="32"
          fontFamily="Georgia, serif"
          opacity="0.5"
        >
          ?
        </text>
      </svg>
    </motion.div>
  );
}

export default function NotFound() {
  const products = getRandomProducts(3);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-20 px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <FloatingFrame />

      <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: "#C5A572" }}>
        404
      </p>

      <h1
        className="text-[32px] md:text-[40px] font-normal text-center mb-4"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        This room appears to be empty.
      </h1>

      <p className="text-[15px] text-center mb-10 max-w-[400px]" style={{ color: "var(--muted)" }}>
        The artwork you&apos;re looking for may have moved or never existed.
      </p>

      <Link
        href="/"
        className="px-8 py-3 text-[13px] uppercase tracking-[0.2em] font-medium transition-all hover:brightness-110 mb-16"
        style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
      >
        Return to the Gallery
      </Link>

      {/* Random product suggestions */}
      <div className="w-full max-w-[900px]">
        <p className="text-[12px] uppercase tracking-[0.15em] text-center mb-6" style={{ color: "var(--muted)" }}>
          You might enjoy these
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

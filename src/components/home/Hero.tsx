"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data-utils";

// Split headline into individually animated characters
const HEADLINE = "Where Art Lives";
const CHARS = HEADLINE.split("");

// ─── Magnetic CTA button ─────────────────────────────────────────────────────

function MagneticButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x  = useSpring(mx, { stiffness: 150, damping: 15 });
  const y  = useSpring(my, { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width  / 2)) * 0.3);
    my.set((e.clientY - (rect.top  + rect.height / 2)) * 0.3);
  };

  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.a
      ref={ref}
      href="/shop"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className="
        group inline-flex items-center gap-2
        mt-8 px-9 py-3
        border border-white/80 text-white text-[13px]
        uppercase tracking-[0.15em] font-medium
        transition-colors duration-300
        hover:bg-white hover:text-[#0A0A0A]
      "
    >
      Enter the Gallery
    </motion.a>
  );
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 pointer-events-none">
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
        Scroll
      </span>
      {/* Track line */}
      <div className="relative w-px h-[30px] overflow-hidden bg-white/15">
        <motion.div
          className="absolute top-0 left-0 w-px bg-white/70"
          style={{ height: 8 }}
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const featured = getFeaturedProducts();
  const heroProduct = featured[0];
  const heroImage   = heroProduct?.images?.primary
    ?? "https://picsum.photos/seed/arthaus-hero/1600/900";

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">

      {/* ── Ken Burns background ───────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: "ken-burns 20s ease-in-out infinite alternate", transformOrigin: "center" }}
      />

      {/* ── Grain overlay ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Dark gradient — more at bottom for text readability ─ */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.65) 100%)",
        }}
      />

      {/* ── Content — pinned to bottom third ──────────────────── */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center pb-[12vh] px-6">

        {/* Headline — letter-by-letter */}
        <h1
          className="text-[40px] md:text-[56px] lg:text-[72px] text-white font-normal leading-none tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {CHARS.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay:    0.4 + i * 0.032,
                duration: 0.55,
                ease:     [0.16, 1, 0.3, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-5 text-base text-white/70 max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          Curated prints, custom framing, and gallery-grade art for every space
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <MagneticButton />
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <ScrollIndicator />
      </motion.div>

    </section>
  );
}

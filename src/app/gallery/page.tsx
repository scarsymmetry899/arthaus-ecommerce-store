"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getActiveCollections, getProductsByCollection } from "@/lib/data-utils";

export default function GalleryPage() {
  const collections = getActiveCollections();
  const featured = collections[0];
  const rest = collections.slice(1);

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* ── Dark hero ───────────────────────────────── */}
      <section
        className="relative flex items-end justify-start min-h-[70vh] overflow-hidden"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={featured.hero_image}
          alt={featured.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 100%)",
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[12px] uppercase tracking-[0.3em] mb-4" style={{ color: "#C5A572" }}>
              ARTHAUS Gallery
            </p>
            <h1
              className="text-[48px] md:text-[72px] font-normal leading-none text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Gallery
            </h1>
            <p className="text-white/60 text-[16px] max-w-[480px] mb-8">
              Curated collections exploring the full breadth of contemporary art.
            </p>
            <Link
              href={`/gallery/${featured.slug}`}
              className="inline-flex items-center gap-2 px-8 py-3 text-[13px] uppercase tracking-[0.15em] border border-white/40 text-white transition-all hover:bg-white hover:text-[#0A0A0A]"
            >
              Enter {featured.title} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Alternating sections ─────────────────────── */}
      <div>
        {rest.map((collection, i) => {
          const products = getProductsByCollection(collection.id).slice(0, 3);
          const isEven = i % 2 === 0;

          return (
            <section
              key={collection.id}
              className="py-[80px] lg:py-[120px] border-b"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: i % 2 === 0 ? "var(--bg)" : "var(--cream)",
              }}
            >
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div
                  className={`flex flex-col lg:flex-row gap-12 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <ScrollReveal
                    direction={isEven ? "left" : "right"}
                    threshold={0.2}
                    className="w-full lg:w-1/2"
                  >
                    <Link href={`/gallery/${collection.slug}`} className="block overflow-hidden rounded-[4px]" style={{ aspectRatio: "4/3" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={collection.hero_image}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </Link>
                  </ScrollReveal>

                  {/* Content */}
                  <ScrollReveal
                    direction={isEven ? "right" : "left"}
                    threshold={0.2}
                    className="w-full lg:w-1/2"
                  >
                    <p className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: "#C5A572" }}>
                      Collection
                    </p>
                    <h2
                      className="text-[32px] md:text-[40px] font-normal leading-tight mb-4"
                      style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                    >
                      {collection.title}
                    </h2>
                    <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                      {collection.description}
                    </p>

                    {/* Artwork previews */}
                    <div className="flex gap-2 mb-6">
                      {products.map((p) => (
                        <div key={p.id} className="w-16 h-16 rounded-[3px] overflow-hidden" style={{ backgroundColor: "var(--border-color)" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.images.primary} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/gallery/${collection.slug}`}
                      className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] transition-colors hover:text-[#C5A572]"
                      style={{ color: "var(--text)" }}
                    >
                      Explore Collection →
                    </Link>
                  </ScrollReveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

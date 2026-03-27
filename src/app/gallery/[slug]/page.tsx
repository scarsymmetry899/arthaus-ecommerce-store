"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCollectionBySlug, getProductsByCollection, getActiveCollections } from "@/lib/data-utils";
import { ProductCard } from "@/components/ui/ProductCard";

export default function CollectionPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <p style={{ color: "var(--text)" }}>Collection not found</p>
      </div>
    );
  }

  const products = getProductsByCollection(collection.id);
  const allCollections = getActiveCollections();
  const nextCollection =
    allCollections[(allCollections.findIndex((c) => c.id === collection.id) + 1) % allCollections.length];

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* ── 50vh Banner ─────────────────────────────── */}
      <div className="relative h-[50vh] overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={collection.hero_image}
          alt={collection.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.6) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: "#C5A572" }}>
              Collection
            </p>
            <h1
              className="text-[40px] md:text-[64px] font-normal text-white leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {collection.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* ── Curator intro ────────────────────────────── */}
      <div className="py-16 px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-[700px] mx-auto text-center">
          <p
            className="text-[18px] leading-relaxed"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)", fontStyle: "italic" }}
          >
            {collection.description}
          </p>
        </div>
      </div>

      {/* ── Masonry product grid ─────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        {/* Group products in chunks with curator notes between */}
        {Array.from({ length: Math.ceil(products.length / 4) }).map((_, chunkIndex) => {
          const chunk = products.slice(chunkIndex * 4, (chunkIndex + 1) * 4);
          return (
            <div key={chunkIndex}>
              {/* Curator note before chunk 2+ */}
              {chunkIndex > 0 && (
                <div className="my-12 max-w-[600px] mx-auto text-center">
                  <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: "#C5A572" }} />
                  <p
                    className="text-[16px] leading-relaxed"
                    style={{ fontFamily: "var(--font-display)", color: "var(--muted)", fontStyle: "italic" }}
                  >
                    {collection.curator_note.slice(0, 200)}…
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
                {chunk.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Fixed bottom CTA ─────────────────────────── */}
      <div
        className="fixed bottom-0 inset-x-0 py-3 px-6 flex justify-center z-30 border-t"
        style={{
          backgroundColor: "rgba(250,248,245,0.95)",
          backdropFilter: "blur(8px)",
          borderColor: "var(--border-color)",
        }}
      >
        <Link
          href="/shop"
          className="px-8 py-2.5 text-[12px] uppercase tracking-[0.2em] font-medium transition-all hover:brightness-110"
          style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
        >
          Shop Entire Collection
        </Link>
      </div>

      {/* ── Next Exhibition ──────────────────────────── */}
      <div
        className="border-t py-12 px-6 text-center mb-16"
        style={{ borderColor: "var(--border-color)" }}
      >
        <p className="text-[11px] uppercase tracking-[0.25em] mb-2" style={{ color: "var(--muted)" }}>
          Next Exhibition
        </p>
        <Link
          href={`/gallery/${nextCollection.slug}`}
          className="text-[24px] transition-colors hover:text-[#C5A572]"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          {nextCollection.title} →
        </Link>
      </div>
    </div>
  );
}

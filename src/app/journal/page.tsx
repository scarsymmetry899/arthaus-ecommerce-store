"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { journalPosts } from "@/data/journal";
import type { JournalCategory } from "@/types";

const CATEGORY_LABELS: Record<JournalCategory, string> = {
  "art-guide": "Art Guide",
  "artist-interview": "Artist Interview",
  "trend-report": "Trend Report",
  "feature": "Feature",
};

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = journalPosts.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="py-16 px-6 lg:px-10 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-[40px] md:text-[56px] font-normal mb-8 text-center"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            The Journal
          </h1>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {["all", ...Object.keys(CATEGORY_LABELS)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-[12px] border transition-all capitalize"
                style={{
                  borderColor: activeCategory === cat ? "#C5A572" : "var(--border-color)",
                  color: activeCategory === cat ? "#C5A572" : "var(--muted)",
                  backgroundColor: activeCategory === cat ? "rgba(197,165,114,0.1)" : "transparent",
                }}
              >
                {cat === "all" ? "All" : CATEGORY_LABELS[cat as JournalCategory]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        {/* Featured article */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link href={`/journal/${featured.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-[4px] mb-6" style={{ height: "50vh", minHeight: "320px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.hero_image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.7) 100%)" }}
                />
                <div className="absolute bottom-0 inset-x-0 p-8">
                  <span
                    className="text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "#C5A572" }}
                  >
                    {CATEGORY_LABELS[featured.category]}
                  </span>
                  <h2
                    className="text-[28px] md:text-[36px] font-normal text-white mt-1 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-white/70 text-[14px] mt-2">{featured.reading_time} min read</p>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-[4px] mb-4" style={{ aspectRatio: "16/9" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.hero_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-[11px] uppercase tracking-[0.15em]" style={{ color: "#C5A572" }}>
                  {CATEGORY_LABELS[post.category]}
                </span>
                <h3
                  className="text-[22px] font-normal mt-1 leading-tight group-hover:text-[#C5A572] transition-colors"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                >
                  {post.title}
                </h3>
                <p className="text-[14px] mt-2 line-clamp-2" style={{ color: "var(--muted)" }}>
                  {post.excerpt}
                </p>
                <p className="text-[12px] mt-2" style={{ color: "var(--muted)" }}>
                  {post.author} · {post.reading_time} min read
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

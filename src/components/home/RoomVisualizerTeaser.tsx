"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getFeaturedProducts } from "@/lib/data-utils";

const ROOM_STYLES = [
  { label: "Modern Loft", image: "https://picsum.photos/seed/room-loft/300/200" },
  { label: "Scandinavian", image: "https://picsum.photos/seed/room-scandi/300/200" },
  { label: "Classic Study", image: "https://picsum.photos/seed/room-study/300/200" },
];

export function RoomVisualizerTeaser() {
  const artworks = getFeaturedProducts().slice(0, 3);
  const [currentArt, setCurrentArt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArt((prev) => (prev + 1) % artworks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [artworks.length]);

  return (
    <section
      className="py-[80px] lg:py-[120px] overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-center">
          {/* Left — Room mockup */}
          <div className="w-full lg:w-[55%] relative">
            <ScrollReveal direction="left" threshold={0.2}>
              <div
                className="relative overflow-hidden rounded-[4px] bg-[#E8E4DF]"
                style={{ aspectRatio: "4/3" }}
              >
                {/* Room background */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/visualizer-room/900/675"
                  alt="Living room mockup"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Art on wall — crossfade */}
                <div
                  className="absolute"
                  style={{
                    top: "18%",
                    left: "28%",
                    width: "38%",
                    height: "42%",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentArt}
                      className="absolute inset-0 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={artworks[currentArt]?.images.primary}
                        alt={artworks[currentArt]?.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Content */}
          <div className="w-full lg:w-[45%] lg:pl-16">
            <ScrollReveal direction="right" threshold={0.2}>
              {/* NEW TOOL label */}
              <div className="mb-4">
                <span
                  className="text-[11px] uppercase tracking-[0.25em] font-medium px-3 py-1 rounded-full"
                  style={{
                    color: "#C5A572",
                    border: "1px solid #C5A572",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  New Tool
                </span>
              </div>

              <h2
                className="text-[30px] md:text-[36px] font-normal leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                See It In Your Space
              </h2>

              <p className="text-[15px] leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                Our new Room Visualizer lets you place any artwork in a curated room setting —
                or upload a photo of your own space. Experience art before you commit.
              </p>

              {/* Room style thumbnails */}
              <div className="flex gap-3 mb-8">
                {ROOM_STYLES.map((style) => (
                  <div key={style.label} className="flex flex-col items-center gap-1.5">
                    <div className="w-[72px] h-[50px] rounded-[3px] overflow-hidden border-2 border-transparent hover:border-[#C5A572] transition-colors cursor-pointer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={style.image}
                        alt={style.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                      {style.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/visualizer"
                className="inline-flex items-center gap-2 px-8 py-3 text-[13px] uppercase tracking-[0.15em] transition-all duration-300 hover:gap-4"
                style={{
                  backgroundColor: "#C5A572",
                  color: "#0A0A0A",
                  fontFamily: "var(--font-body)",
                }}
              >
                Try the Visualizer →
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

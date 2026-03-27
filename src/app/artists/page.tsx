"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { artists } from "@/data/artists";
import { getProductsByArtist } from "@/lib/data-utils";

const ALL_SPECIALTIES = Array.from(
  new Set(artists.flatMap((a) => a.specialties))
).sort();

function ArtistCard({ artist }: { artist: typeof artists[number] }) {
  const [hovered, setHovered] = useState(false);
  const works = getProductsByArtist(artist.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/artists/${artist.slug}`}>
        <div
          className="group relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Portrait */}
          <div className="relative overflow-hidden rounded-[8px]" style={{ aspectRatio: "1/1", backgroundColor: "var(--cream)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artist.portrait_image}
              alt={`Portrait of ${artist.name}`}
              className="w-full h-full object-cover transition-all duration-500"
              style={{
                filter: hovered ? "brightness(0.7)" : "brightness(1)",
                transform: hovered ? "scale(1.03)" : "scale(1)",
              }}
            />

            {/* Warm tint overlay */}
            {hovered && (
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(197,165,114,0.15)", mixBlendMode: "multiply" }}
              />
            )}

            {/* 3 artwork thumbnails slide up */}
            <motion.div
              className="absolute bottom-0 inset-x-0 flex gap-1 p-2"
              initial={{ y: "100%" }}
              animate={hovered ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {works.slice(0, 3).map((w) => (
                <div key={w.id} className="flex-1 h-12 rounded-[2px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.images.primary} alt={w.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Info */}
          <div className="mt-3">
            <h3
              className="text-[18px] font-normal transition-transform duration-300"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text)",
                transform: hovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {artist.name}
            </h3>
            <p className="text-[12px]" style={{ color: "var(--muted)" }}>{artist.location}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {artist.specialties.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[10px] rounded-full border"
                  style={{ borderColor: "var(--border-color)", color: "var(--muted)" }}
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="text-[11px] mt-1.5" style={{ color: "var(--muted)" }}>
              {works.length} work{works.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ArtistsPage() {
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");

  const filtered = artists.filter((a) => {
    const matchSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty =
      activeSpecialty === "All" || a.specialties.includes(activeSpecialty);
    return matchSearch && matchSpecialty;
  });

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="py-16 px-6 lg:px-10 text-center border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-[40px] md:text-[56px] font-normal mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Our Artists
          </h1>

          {/* Search */}
          <div
            className="flex items-center gap-3 max-w-[400px] mx-auto border rounded-[4px] px-4 py-2.5 mb-8"
            style={{ borderColor: "var(--border-color)" }}
          >
            <Search size={15} style={{ color: "var(--muted)" }} />
            <input
              type="text"
              placeholder="Search artists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-[14px] outline-none"
              style={{ backgroundColor: "transparent", color: "var(--text)" }}
            />
          </div>

          {/* Specialty filter tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {["All", ...ALL_SPECIALTIES].map((spec) => (
              <button
                key={spec}
                onClick={() => setActiveSpecialty(spec)}
                className="px-4 py-1.5 rounded-full text-[12px] border transition-all"
                style={{
                  borderColor: activeSpecialty === spec ? "#C5A572" : "var(--border-color)",
                  color: activeSpecialty === spec ? "#C5A572" : "var(--muted)",
                  backgroundColor: activeSpecialty === spec ? "rgba(197,165,114,0.1)" : "transparent",
                }}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        {filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: "var(--muted)" }}>No artists found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

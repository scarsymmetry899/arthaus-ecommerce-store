"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Globe } from "lucide-react";
import { getArtistBySlug, getProductsByArtist } from "@/lib/data-utils";
import { artists } from "@/data/artists";
import { ProductCard } from "@/components/ui/ProductCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export default function ArtistProfilePage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const artist = getArtistBySlug(slug);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <p style={{ color: "var(--text)" }}>Artist not found</p>
      </div>
    );
  }

  const works = getProductsByArtist(artist.id);
  const otherArtists = artists.filter((a) => a.id !== artist.id);

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* ── Split hero ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-[70vh]">
        {/* Portrait */}
        <ScrollReveal direction="left" threshold={0.1} className="w-full lg:w-[45%]">
          <div className="h-[50vh] lg:h-full relative overflow-hidden" style={{ backgroundColor: "var(--cream)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artist.portrait_image}
              alt={`Portrait of ${artist.name}`}
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(15%) contrast(1.05)" }}
            />
            {/* Grain */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
          </div>
        </ScrollReveal>

        {/* Info */}
        <ScrollReveal
          direction="right"
          threshold={0.1}
          className="w-full lg:w-[55%] flex items-center"
        >
          <div className="px-8 lg:px-16 py-12">
            <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: "#C5A572" }}>
              Artist
            </p>
            <h1
              className="text-[40px] md:text-[56px] font-normal leading-none mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              {artist.name}
            </h1>
            <p className="text-[13px] uppercase tracking-[0.15em] mb-6" style={{ color: "var(--muted)" }}>
              {artist.location}
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-6">
              {artist.specialties.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-[11px] border"
                  style={{ borderColor: "#C5A572", color: "#C5A572" }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              <div>
                <p className="text-[24px] font-light" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                  {works.length}
                </p>
                <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>Works</p>
              </div>
              <div>
                <p className="text-[24px] font-light" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                  2019
                </p>
                <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>Since</p>
              </div>
              <div>
                <p className="text-[24px] font-light" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                  3
                </p>
                <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>Collections</p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {artist.social_links.instagram && (
                <a
                  href={artist.social_links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] transition-colors hover:text-[#C5A572]"
                  style={{ color: "var(--muted)" }}
                >
                  <Instagram size={15} />
                  Instagram
                </a>
              )}
              {artist.social_links.website && (
                <a
                  href={artist.social_links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] transition-colors hover:text-[#C5A572]"
                  style={{ color: "var(--muted)" }}
                >
                  <Globe size={15} />
                  Website
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Artist quote ─────────────────────────────── */}
      <div className="py-16 px-6 text-center" style={{ backgroundColor: "var(--cream)" }}>
        <blockquote
          className="text-[20px] md:text-[26px] font-normal max-w-[700px] mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)", fontStyle: "italic" }}
        >
          &ldquo;{artist.bio.slice(0, 200)}…&rdquo;
        </blockquote>
      </div>

      {/* ── The Collection ───────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <h2
          className="text-[32px] md:text-[40px] font-normal mb-10"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          The Collection
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {works.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>

      {/* ── More Artists ─────────────────────────────── */}
      <div className="border-t py-12 px-6 lg:px-10" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-[1400px] mx-auto">
          <h3
            className="text-[20px] mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            More Artists
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {otherArtists.slice(0, 5).map((a) => (
              <Link
                key={a.id}
                href={`/artists/${a.slug}`}
                className="shrink-0 flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#C5A572] transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.portrait_image} alt={a.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[12px] text-center group-hover:text-[#C5A572] transition-colors" style={{ color: "var(--text)" }}>
                  {a.name.split(" ")[0]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bio section (full) ──────────────────────── */}
      <div className="max-w-[700px] mx-auto px-6 py-12">
        <h3 className="text-[20px] mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
          About {artist.name}
        </h3>
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {artist.bio}
        </p>
      </div>
    </div>
  );
}

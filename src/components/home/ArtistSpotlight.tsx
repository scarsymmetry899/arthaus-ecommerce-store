"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getProductsByArtist } from "@/lib/data-utils";
import { artists } from "@/data/artists";

export function ArtistSpotlight() {
  const artist = artists[0]; // Elena Vasquez
  const artworks = getProductsByArtist(artist.id).slice(0, 3);

  return (
    <section
      className="py-[80px] lg:py-[120px]"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left — Artist portrait */}
          <div className="w-full lg:w-[40%]">
            <ScrollReveal direction="left" threshold={0.2}>
              <div
                className="relative overflow-hidden rounded-[8px]"
                style={{ aspectRatio: "3/4" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artist.portrait_image}
                  alt={`Portrait of ${artist.name}`}
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(20%) contrast(1.05)" }}
                />
                {/* Grain overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Content */}
          <div className="w-full lg:w-[60%] lg:pl-8">
            <ScrollReveal direction="right" threshold={0.2}>
              {/* Label */}
              <p
                className="text-[11px] uppercase tracking-[0.3em] mb-4"
                style={{ color: "#C5A572", fontFamily: "var(--font-body)" }}
              >
                Artist Spotlight
              </p>

              {/* Artist name */}
              <h2
                className="text-[36px] md:text-[48px] font-normal leading-tight mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                {artist.name}
              </h2>

              {/* Location */}
              <p
                className="text-[13px] uppercase tracking-[0.15em] mb-6"
                style={{ color: "var(--muted)" }}
              >
                {artist.location}
              </p>

              {/* Bio excerpt */}
              <p
                className="text-[15px] leading-relaxed mb-8"
                style={{ color: "var(--muted)", maxWidth: "520px" }}
              >
                {artist.bio.slice(0, 280)}…
              </p>

              {/* Artwork thumbnails */}
              <div className="flex gap-3 mb-8">
                {artworks.map((art) => (
                  <Link
                    key={art.id}
                    href={`/shop/${art.slug}`}
                    className="block overflow-hidden rounded-[4px] border-2 border-transparent hover:border-[#C5A572] transition-colors duration-200"
                    style={{ width: "88px", height: "88px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={art.images.primary}
                      alt={`${art.title} by ${artist.name}`}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                ))}
              </div>

              {/* Explore link */}
              <Link
                href={`/artists/${artist.slug}`}
                className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] transition-all duration-200 hover:gap-4"
                style={{ color: "#C5A572", fontFamily: "var(--font-body)" }}
              >
                Explore {artist.name.split(" ")[0]} →
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

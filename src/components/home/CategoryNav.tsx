"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const CATEGORIES = [
  {
    label: "Abstract",
    slug: "abstract",
    image: "https://picsum.photos/seed/cat-abstract/600/500",
  },
  {
    label: "Photography",
    slug: "photography",
    image: "https://picsum.photos/seed/cat-photography/600/500",
  },
  {
    label: "Minimalist",
    slug: "minimalist",
    image: "https://picsum.photos/seed/cat-minimalist/600/500",
  },
  {
    label: "Contemporary",
    slug: "contemporary",
    image: "https://picsum.photos/seed/cat-contemporary/600/500",
  },
  {
    label: "Nature & Botanical",
    slug: "nature-botanical",
    image: "https://picsum.photos/seed/cat-nature/600/500",
  },
  {
    label: "Black & White",
    slug: "black-white",
    image: "https://picsum.photos/seed/cat-bw/600/500",
  },
];

function CategoryTile({
  category,
  index,
}: {
  category: (typeof CATEGORIES)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal direction="up" delay={index * 0.08} threshold={0.1}>
      <Link
        href={`/shop?category=${category.slug}`}
        className="block relative overflow-hidden rounded-[4px]"
        style={{ height: "280px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.image}
          alt={category.label}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{
            filter: hovered ? "saturate(1.3) brightness(1.1)" : "saturate(0.9) brightness(0.85)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.55) 100%)",
          }}
        />

        {/* Gold corner borders */}
        {hovered && (
          <>
            <div
              className="absolute top-3 left-3 w-6 h-6 pointer-events-none"
              style={{
                borderTop: "4px solid #C5A572",
                borderLeft: "4px solid #C5A572",
                transition: "all 0.3s ease",
              }}
            />
            <div
              className="absolute top-3 right-3 w-6 h-6 pointer-events-none"
              style={{
                borderTop: "4px solid #C5A572",
                borderRight: "4px solid #C5A572",
              }}
            />
            <div
              className="absolute bottom-3 left-3 w-6 h-6 pointer-events-none"
              style={{
                borderBottom: "4px solid #C5A572",
                borderLeft: "4px solid #C5A572",
              }}
            />
            <div
              className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none"
              style={{
                borderBottom: "4px solid #C5A572",
                borderRight: "4px solid #C5A572",
              }}
            />
          </>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h3
            className="text-white leading-tight transition-transform duration-300"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              transform: hovered ? "translateY(-10px)" : "translateY(0)",
            }}
          >
            {category.label}
          </h3>
          <div
            className="transition-all duration-300 overflow-hidden"
            style={{
              maxHeight: hovered ? "24px" : "0",
              opacity: hovered ? 1 : 0,
              marginTop: hovered ? "8px" : "0",
            }}
          >
            <span
              className="text-[12px] uppercase tracking-[0.2em]"
              style={{ color: "#C5A572" }}
            >
              Explore →
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function CategoryNav() {
  return (
    <section
      className="py-[80px] lg:py-[120px]"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <ScrollReveal direction="up" threshold={0.2}>
          <div className="text-center mb-12">
            <h2
              className="text-[32px] md:text-[40px] font-normal"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              Explore by Style
            </h2>
          </div>
        </ScrollReveal>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, i) => (
            <CategoryTile key={cat.slug} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

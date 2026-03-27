"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Heart, Award, Leaf } from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Curation Above All",
    body: "We work with fewer artists than most galleries, because deep partnerships produce better art. Every artist on ARTHAUS has been chosen because we believe in their work unconditionally.",
  },
  {
    icon: Award,
    title: "Gallery-Grade Quality",
    body: "Every print is produced on archival fine-art paper using museum-grade pigment inks. We test every new paper and ink combination before offering it to customers.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practice",
    body: "We print on demand to eliminate waste, use FSC-certified papers, and offset 100% of shipping emissions. Art shouldn't cost the earth — literally.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Full-width hero */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/about-hero/1600/800"
          alt="ARTHAUS gallery space"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.65)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-[12px] uppercase tracking-[0.35em] mb-4" style={{ color: "#C5A572" }}>
              Est. 2021
            </p>
            <h1
              className="text-[48px] md:text-[72px] font-normal text-white leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              About ARTHAUS
            </h1>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-[80px] lg:py-[120px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <ScrollReveal direction="left" className="w-full lg:w-1/2">
              <div className="relative overflow-hidden rounded-[4px]" style={{ aspectRatio: "4/3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/about-story/900/675"
                  alt="Our story"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="w-full lg:w-1/2">
              <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: "#C5A572" }}>
                Our Story
              </p>
              <h2
                className="text-[32px] md:text-[40px] font-normal leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                Art Should Live Where Life Happens
              </h2>
              <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                <p>
                  ARTHAUS was founded in 2021 with a single conviction: the gallery model was broken.
                  Great art existed, but it was locked behind prices that only institutions and collectors
                  could afford, or lost in the noise of online marketplaces with no curation whatsoever.
                </p>
                <p>
                  We set out to build something in between: a platform that takes curation as seriously
                  as any museum, but makes the resulting works accessible to anyone who wants to live with
                  art — not just look at it through glass.
                </p>
                <p>
                  Today we work with artists across six countries, offering museum-quality giclée prints
                  and custom framing, each piece chosen because we believe it deserves a place on someone's wall.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-[80px] lg:py-[100px]" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal direction="up">
            <h2
              className="text-[32px] md:text-[40px] font-normal text-center mb-16"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              Our Values
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {VALUES.map((value, i) => (
              <ScrollReveal key={value.title} direction="up" delay={i * 0.1}>
                <div className="flex flex-col items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: "rgba(197,165,114,0.15)" }}
                  >
                    <value.icon size={20} style={{ color: "#C5A572" }} />
                  </div>
                  <h3
                    className="text-[20px] mb-3"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {value.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Art Consulting Teaser */}
      <section
        className="py-[80px] lg:py-[100px] text-center"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="max-w-[700px] mx-auto px-6">
          <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: "#C5A572" }}>
            For Businesses
          </p>
          <h2
            className="text-[32px] md:text-[40px] font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Art Consulting for Offices & Hospitality
          </h2>
          <p className="text-white/60 text-[15px] mb-8">
            We work with interior designers, architects, and hospitality brands to source and
            install curated art programmes. From boutique hotels to co-working spaces, we handle
            everything from selection to installation.
          </p>
          <a
            href="mailto:business@arthaus.com"
            className="inline-flex items-center gap-2 px-8 py-3 text-[13px] uppercase tracking-[0.15em] border border-white/30 text-white transition-all hover:bg-white hover:text-[#0A0A0A]"
          >
            Get in Touch →
          </a>
        </div>
      </section>
    </div>
  );
}

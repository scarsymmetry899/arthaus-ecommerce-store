"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const PRESS_LOGOS = [
  "Architectural Digest",
  "Elle Decor",
  "Dwell",
  "Kinfolk",
  "Cereal",
  "Dezeen",
];

const TESTIMONIALS = [
  {
    quote:
      "ARTHAUS has transformed the way we think about affordable fine art. The quality of their giclée prints is indistinguishable from gallery originals.",
    author: "Sarah M.",
    location: "London, UK",
    stars: 5,
  },
  {
    quote:
      "I&apos;ve purchased three pieces and framed them through ARTHAUS. The custom framing service is exceptional — museum quality at a fraction of the price.",
    author: "James R.",
    location: "New York, USA",
    stars: 5,
  },
  {
    quote:
      "The Room Visualizer helped me choose the perfect piece for my living room. Exceptional service and the artwork arrived beautifully packaged.",
    author: "Nina K.",
    location: "Berlin, Germany",
    stars: 5,
  },
];

export function SocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section
      className="py-[80px] lg:py-[120px] overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* ── Press marquee ──────────────────────────────── */}
      <div
        className="border-y py-5 mb-16 overflow-hidden"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {[...PRESS_LOGOS, ...PRESS_LOGOS].map((name, i) => (
            <span
              key={i}
              className="text-[13px] uppercase tracking-[0.3em] shrink-0 font-medium"
              style={{ color: "var(--muted)" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Testimonial ────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-[760px] mx-auto text-center">
          {/* Decorative quotation mark */}
          <div
            className="text-[120px] leading-none mb-[-40px] select-none"
            style={{
              fontFamily: "var(--font-display)",
              color: "#C5A572",
              opacity: 0.3,
            }}
          >
            &ldquo;
          </div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote
                className="text-[20px] md:text-[24px] font-normal leading-relaxed mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                  fontStyle: "italic",
                }}
              >
                {TESTIMONIALS[activeTestimonial].quote}
              </blockquote>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-3">
                {Array.from({ length: TESTIMONIALS[activeTestimonial].stars }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="#C5A572"
                      style={{ color: "#C5A572" }}
                    />
                  )
                )}
              </div>

              <p className="text-[13px] font-medium" style={{ color: "var(--text)" }}>
                {TESTIMONIALS[activeTestimonial].author}
              </p>
              <p className="text-[12px]" style={{ color: "var(--muted)" }}>
                {TESTIMONIALS[activeTestimonial].location}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeTestimonial ? "24px" : "8px",
                  height: "8px",
                  backgroundColor:
                    i === activeTestimonial ? "#C5A572" : "var(--border-color)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

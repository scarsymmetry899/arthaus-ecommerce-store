"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      className="relative py-[100px] lg:py-[140px] overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Subtle background artwork */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://picsum.photos/seed/newsletter-bg/1600/600"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.1 }}
      />

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.9) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Label */}
              <p
                className="text-[11px] uppercase tracking-[0.3em] mb-4"
                style={{ color: "#C5A572" }}
              >
                The Gallery List
              </p>

              <h2
                className="text-[36px] md:text-[48px] font-normal leading-tight text-white mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Join the Gallery
              </h2>

              <p className="text-[15px] text-white/60 max-w-[480px] mx-auto mb-10 leading-relaxed">
                Be the first to discover new artists, exclusive collections, and
                limited-edition releases. Plus, 10% off your first order.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-0 max-w-[480px] mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-5 py-3.5 text-[14px] outline-none transition-all duration-200 placeholder:text-white/30"
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRight: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C5A572";
                    e.currentTarget.style.borderBottomWidth = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.borderBottomWidth = "1px";
                  }}
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 text-[13px] uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:brightness-110"
                  style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                >
                  Subscribe
                </button>
              </form>

              <p className="mt-4 text-[12px] text-white/30">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "#C5A572" }}
              >
                <Check size={28} color="#0A0A0A" />
              </div>
              <h3
                className="text-[32px] text-white mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Welcome to the Gallery
              </h3>
              <p className="text-white/60 text-[15px]">
                Check your inbox — your 10% discount code is on its way.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

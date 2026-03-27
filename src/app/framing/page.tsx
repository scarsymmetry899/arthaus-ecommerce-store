"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { products as allProducts } from "@/data/products";
import { frames } from "@/data/frames";
import { useCart } from "@/lib/cart-context";
import type { Product, Frame, MatOption, GlassOption, ProductSize } from "@/types";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STEPS = [
  { num: 1, label: "Artwork" },
  { num: 2, label: "Size" },
  { num: 3, label: "Frame" },
  { num: 4, label: "Mat" },
  { num: 5, label: "Glass" },
  { num: 6, label: "Review" },
];

const MAT_OPTIONS: { value: MatOption; label: string; color: string; price: number }[] = [
  { value: "none", label: "No Mat", color: "transparent", price: 0 },
  { value: "white", label: "White", color: "#FFFFFF", price: 15 },
  { value: "off-white", label: "Off-White", color: "#F5F0EB", price: 15 },
  { value: "black", label: "Black", color: "#1A1A1A", price: 15 },
];

const GLASS_OPTIONS: { value: GlassOption; label: string; desc: string; price: number }[] = [
  { value: "standard", label: "Standard Glass", desc: "Clear glass, ideal for most artworks.", price: 0 },
  { value: "non-glare", label: "Non-Glare", desc: "Reduces reflections without compromising clarity.", price: 20 },
  { value: "museum", label: "Museum Glass", desc: "99% UV protection, virtually invisible.", price: 55 },
];

const MAT_WIDTHS = [0, 1, 1.5, 2, 3]; // inches

function FramePreview({
  artwork,
  frame,
  mat,
  matWidth,
}: {
  artwork: Product | null;
  frame: Frame | null;
  mat: MatOption;
  matWidth: number;
}) {
  const frameColor = frame?.color_hex ?? "transparent";
  const matColor = MAT_OPTIONS.find((m) => m.value === mat)?.color ?? "transparent";
  const framePx = frame ? 16 : 0;
  const matPx = mat !== "none" ? matWidth * 10 : 0;

  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="relative transition-all duration-300"
        style={{
          padding: `${framePx}px`,
          backgroundColor: frameColor,
          boxShadow: frame ? "0 20px 60px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div
          style={{
            padding: `${matPx}px`,
            backgroundColor: matColor === "transparent" ? undefined : matColor,
          }}
        >
          {artwork ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={artwork.images.primary}
              alt={artwork.title}
              style={{ width: "280px", height: "350px", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div
              style={{
                width: "280px",
                height: "350px",
                backgroundColor: "var(--cream)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "var(--muted)", fontSize: "14px" }}>Select Artwork</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FramingPage() {
  const { addItem } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [artwork, setArtwork] = useState<Product | null>(null);
  const [size, setSize] = useState<ProductSize | null>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [mat, setMat] = useState<MatOption>("none");
  const [matWidth, setMatWidth] = useState(1.5);
  const [glass, setGlass] = useState<GlassOption>("standard");

  const artworkPrice = size?.price ?? 0;
  const framePrice = frame && size ? (frame.price_adder_by_size[size.label] ?? 0) : 0;
  const matPrice = mat !== "none" ? 15 : 0;
  const glassPrice = GLASS_OPTIONS.find((g) => g.value === glass)?.price ?? 0;
  const total = artworkPrice + framePrice + matPrice + glassPrice;

  const handleAddToCart = () => {
    if (!artwork || !size) return;
    addItem({ product: artwork, selected_size: size, selected_frame: frame ?? undefined, selected_mat: mat, selected_glass: glass });
  };

  const goNext = () => setStep((s) => Math.min(s + 1, 6) as Step);
  const goPrev = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const slideDir = { enter: { x: 40, opacity: 0 }, center: { x: 0, opacity: 1 }, exit: { x: -40, opacity: 0 } };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="px-6 lg:px-10 py-8 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-[32px] md:text-[40px] font-normal" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Framing Configurator
          </h1>
          {/* Step breadcrumbs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 shrink-0">
                {i > 0 && <div className="w-6 h-px" style={{ backgroundColor: "var(--border-color)" }} />}
                <button
                  onClick={() => setStep(s.num as Step)}
                  className="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.1em]"
                  style={{ color: step === s.num ? "#C5A572" : step > s.num ? "var(--text)" : "var(--muted)" }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium"
                    style={{
                      backgroundColor: step === s.num ? "#C5A572" : step > s.num ? "var(--text)" : "transparent",
                      color: step === s.num || step > s.num ? (step > s.num ? "var(--bg)" : "#0A0A0A") : "var(--muted)",
                      border: step <= s.num && step !== s.num ? "1px solid var(--border-color)" : "none",
                    }}
                  >
                    {s.num}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left — live preview */}
          <div
            className="w-full lg:w-[55%] rounded-[4px] flex items-center justify-center"
            style={{ minHeight: "500px", backgroundColor: "var(--cream)" }}
          >
            <FramePreview artwork={artwork} frame={frame} mat={mat} matWidth={matWidth} />
          </div>

          {/* Right — step wizard */}
          <div className="w-full lg:w-[45%]">
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {/* Step 1: Artwork */}
                {step === 1 && (
                  <motion.div key="s1" variants={slideDir} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      Select Artwork
                    </h2>
                    <div className="grid grid-cols-3 gap-3 max-h-[360px] overflow-y-auto">
                      {allProducts.slice(0, 12).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => { setArtwork(p); setSize(p.sizes[2] || p.sizes[0]); }}
                          className="border-2 rounded-[3px] overflow-hidden transition-all"
                          style={{ borderColor: artwork?.id === p.id ? "#C5A572" : "transparent", aspectRatio: "4/5" }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.images.primary} alt={p.title} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Size */}
                {step === 2 && artwork && (
                  <motion.div key="s2" variants={slideDir} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      Choose Size
                    </h2>
                    <div className="space-y-3">
                      {artwork.sizes.map((s) => (
                        <label
                          key={s.sku}
                          className="flex items-center justify-between p-4 border rounded-[3px] cursor-pointer transition-colors"
                          style={{ borderColor: size?.sku === s.sku ? "#C5A572" : "var(--border-color)" }}
                        >
                          <input type="radio" name="size" checked={size?.sku === s.sku} onChange={() => setSize(s)} className="hidden" />
                          <div>
                            <p className="text-[14px] font-medium" style={{ color: "var(--text)" }}>{s.dimensions}</p>
                            <p className="text-[12px]" style={{ color: "var(--muted)" }}>{s.label}</p>
                          </div>
                          <p className="text-[14px]" style={{ color: "var(--text)" }}>${s.price}</p>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Frame */}
                {step === 3 && (
                  <motion.div key="s3" variants={slideDir} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      Choose Frame
                    </h2>
                    <button
                      onClick={() => setFrame(null)}
                      className="w-full text-left p-3 border rounded-[3px] mb-3 transition-colors text-[13px]"
                      style={{ borderColor: frame === null ? "#C5A572" : "var(--border-color)", color: frame === null ? "#C5A572" : "var(--muted)" }}
                    >
                      No Frame (Print Only)
                    </button>
                    <div className="space-y-2">
                      {frames.map((f) => (
                        <label
                          key={f.id}
                          className="flex items-center gap-3 p-3 border rounded-[3px] cursor-pointer transition-colors"
                          style={{ borderColor: frame?.id === f.id ? "#C5A572" : "var(--border-color)" }}
                        >
                          <input type="radio" name="frame" checked={frame?.id === f.id} onChange={() => setFrame(f)} className="hidden" />
                          <div className="w-8 h-8 rounded-full border-2 shrink-0" style={{ backgroundColor: f.color_hex, borderColor: "var(--border-color)" }} />
                          <div className="flex-1">
                            <p className="text-[13px] font-medium" style={{ color: "var(--text)" }}>{f.name}</p>
                          </div>
                          <p className="text-[12px]" style={{ color: "var(--muted)" }}>
                            {size ? `+$${f.price_adder_by_size[size.label] ?? 0}` : "—"}
                          </p>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Mat */}
                {step === 4 && (
                  <motion.div key="s4" variants={slideDir} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      Mat Options
                    </h2>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {MAT_OPTIONS.map((m) => (
                        <button
                          key={m.value}
                          onClick={() => setMat(m.value)}
                          className="p-3 border rounded-[3px] flex items-center gap-3 transition-all"
                          style={{ borderColor: mat === m.value ? "#C5A572" : "var(--border-color)" }}
                        >
                          <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: m.color, borderColor: "var(--border-color)" }} />
                          <div className="text-left">
                            <p className="text-[12px] font-medium" style={{ color: "var(--text)" }}>{m.label}</p>
                            <p className="text-[11px]" style={{ color: "var(--muted)" }}>{m.price > 0 ? `+$${m.price}` : "Free"}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    {mat !== "none" && (
                      <div>
                        <p className="text-[12px] uppercase tracking-[0.1em] mb-2 font-medium" style={{ color: "var(--text)" }}>
                          Mat Width: {matWidth}&quot;
                        </p>
                        <div className="flex gap-2">
                          {MAT_WIDTHS.filter((w) => w > 0).map((w) => (
                            <button
                              key={w}
                              onClick={() => setMatWidth(w)}
                              className="px-3 py-1.5 border rounded-full text-[11px] transition-all"
                              style={{ borderColor: matWidth === w ? "#C5A572" : "var(--border-color)", color: matWidth === w ? "#C5A572" : "var(--muted)" }}
                            >
                              {w}&quot;
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 5: Glass */}
                {step === 5 && (
                  <motion.div key="s5" variants={slideDir} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      Glass Options
                    </h2>
                    <div className="space-y-3">
                      {GLASS_OPTIONS.map((g) => (
                        <label
                          key={g.value}
                          className="flex items-start gap-3 p-4 border rounded-[3px] cursor-pointer transition-colors"
                          style={{ borderColor: glass === g.value ? "#C5A572" : "var(--border-color)" }}
                        >
                          <input type="radio" name="glass" checked={glass === g.value} onChange={() => setGlass(g.value)} className="hidden" />
                          <div
                            className="w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center"
                            style={{ borderColor: glass === g.value ? "#C5A572" : "var(--border-color)" }}
                          >
                            {glass === g.value && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#C5A572" }} />}
                          </div>
                          <div className="flex-1">
                            <p className="text-[14px] font-medium" style={{ color: "var(--text)" }}>{g.label}</p>
                            <p className="text-[12px] mt-0.5" style={{ color: "var(--muted)" }}>{g.desc}</p>
                          </div>
                          <p className="text-[13px] shrink-0" style={{ color: "var(--text)" }}>
                            {g.price === 0 ? "Included" : `+$${g.price}`}
                          </p>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Review */}
                {step === 6 && (
                  <motion.div key="s6" variants={slideDir} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="text-[22px] mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      Review & Add to Cart
                    </h2>
                    <div className="space-y-3 mb-6">
                      {[
                        { label: "Artwork", value: artwork?.title ?? "—" },
                        { label: "Size", value: size?.dimensions ?? "—" },
                        { label: "Frame", value: frame?.name ?? "No Frame" },
                        { label: "Mat", value: mat === "none" ? "None" : mat },
                        { label: "Glass", value: GLASS_OPTIONS.find((g) => g.value === glass)?.label ?? "—" },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
                          <span className="text-[13px]" style={{ color: "var(--muted)" }}>{row.label}</span>
                          <span className="text-[13px] font-medium" style={{ color: "var(--text)" }}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                    {/* Pricing breakdown */}
                    <div className="space-y-1.5 mb-6">
                      <div className="flex justify-between text-[13px]">
                        <span style={{ color: "var(--muted)" }}>Artwork</span>
                        <span style={{ color: "var(--text)" }}>${artworkPrice}</span>
                      </div>
                      {framePrice > 0 && <div className="flex justify-between text-[13px]">
                        <span style={{ color: "var(--muted)" }}>Frame</span><span style={{ color: "var(--text)" }}>+${framePrice}</span>
                      </div>}
                      {matPrice > 0 && <div className="flex justify-between text-[13px]">
                        <span style={{ color: "var(--muted)" }}>Mat</span><span style={{ color: "var(--text)" }}>+${matPrice}</span>
                      </div>}
                      {glassPrice > 0 && <div className="flex justify-between text-[13px]">
                        <span style={{ color: "var(--muted)" }}>Glass</span><span style={{ color: "var(--text)" }}>+${glassPrice}</span>
                      </div>}
                      <div className="flex justify-between text-[16px] font-medium pt-2 border-t" style={{ borderColor: "var(--border-color)", color: "var(--text)" }}>
                        <span>Total</span>
                        <span style={{ color: "#C5A572" }}>${total}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      disabled={!artwork || !size}
                      className="w-full py-4 text-[13px] uppercase tracking-[0.2em] font-medium transition-all disabled:opacity-40 hover:brightness-110"
                      style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                    >
                      Add to Cart — ${total}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: "var(--border-color)" }}>
              <button
                onClick={goPrev}
                disabled={step === 1}
                className="flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] disabled:opacity-30 transition-colors hover:text-[#C5A572]"
                style={{ color: "var(--muted)" }}
              >
                <ChevronLeft size={14} /> Back
              </button>

              {/* Running total */}
              {total > 0 && (
                <p className="text-[14px] font-medium" style={{ color: "#C5A572" }}>
                  ${total} total
                </p>
              )}

              {step < 6 && (
                <button
                  onClick={goNext}
                  className="flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] transition-colors hover:text-[#C5A572]"
                  style={{ color: "var(--text)" }}
                >
                  Next <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

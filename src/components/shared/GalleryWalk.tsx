"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ShoppingBag, Play, Pause } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/lib/cart-context";

interface GalleryWalkProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function GalleryWalk({ products, isOpen, onClose, initialIndex = 0 }: GalleryWalkProps) {
  const [index, setIndex] = useState(initialIndex);
  const [autoPlay, setAutoPlay] = useState(false);
  const { addItem } = useCart();

  const current = products[index];

  const prev = useCallback(() => setIndex(i => (i - 1 + products.length) % products.length), [products.length]);
  const next = useCallback(() => setIndex(i => (i + 1) % products.length), [products.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, prev, next, onClose]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || !isOpen) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [autoPlay, isOpen, next]);

  // Reset index on open
  useEffect(() => { if (isOpen) setIndex(initialIndex); }, [isOpen, initialIndex]);

  if (!isOpen || !current) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="gallery-walk"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
        style={{ backgroundColor: "#000" }}
      >
        {/* Close */}
        <button onClick={onClose} aria-label="Close gallery walk"
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10">
          <X size={20} />
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
          {index + 1} / {products.length}
        </div>

        {/* Auto-play toggle */}
        <button onClick={() => setAutoPlay(v => !v)}
          aria-label={autoPlay ? "Pause" : "Play"}
          className="absolute top-5 left-5 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
          {autoPlay ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Artwork */}
        <AnimatePresence mode="wait">
          <motion.div key={current.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center w-full h-full p-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.images.primary}
              alt={`${current.title} by ${current.artist.name}`}
              className="max-w-full max-h-full object-contain"
              style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.8))" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Info bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <p className="text-white text-xl font-light" style={{ fontFamily: "var(--font-display)" }}>
            {current.title}
          </p>
          <p className="text-white/50 text-xs uppercase tracking-widest">{current.artist.name}</p>
          <p className="text-sm" style={{ color: "#C5A572" }}>From ${current.price_from}</p>
        </div>

        {/* Add to cart */}
        <button
          onClick={() => { addItem({ product: current, selected_size: current.sizes[0], quantity: 1 }); }}
          className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors rounded-full"
        >
          <ShoppingBag size={13} />
          Add to Cart
        </button>

        {/* Navigation arrows */}
        <button onClick={prev} aria-label="Previous"
          className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-colors">
          <ChevronLeft size={28} />
        </button>
        <button onClick={next} aria-label="Next"
          className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-colors">
          <ChevronRight size={28} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5">
          {products.slice(0, Math.min(products.length, 12)).map((_, i) => (
            <button key={i} onClick={() => setIndex(i)}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{ backgroundColor: i === index ? "#C5A572" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

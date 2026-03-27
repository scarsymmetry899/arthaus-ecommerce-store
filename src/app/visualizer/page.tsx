"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, X, ShoppingBag, ZoomIn, ZoomOut } from "lucide-react";
import { products as allProducts } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types";

const ROOMS = [
  {
    id: "modern-loft",
    label: "Modern Loft",
    image: "https://picsum.photos/seed/room-viz-loft/1200/800",
    wallArea: { x: 20, y: 10, w: 60, h: 55 }, // percentage-based
  },
  {
    id: "scandinavian",
    label: "Scandinavian",
    image: "https://picsum.photos/seed/room-viz-scandi/1200/800",
    wallArea: { x: 22, y: 8, w: 56, h: 50 },
  },
  {
    id: "classic-study",
    label: "Classic Study",
    image: "https://picsum.photos/seed/room-viz-study/1200/800",
    wallArea: { x: 18, y: 12, w: 64, h: 52 },
  },
  {
    id: "mid-century",
    label: "Mid-Century",
    image: "https://picsum.photos/seed/room-viz-mid/1200/800",
    wallArea: { x: 25, y: 10, w: 50, h: 48 },
  },
  {
    id: "minimal-white",
    label: "Minimal White",
    image: "https://picsum.photos/seed/room-viz-white/1200/800",
    wallArea: { x: 15, y: 5, w: 70, h: 60 },
  },
];

const SIZES = ["Small", "Medium", "Large", "XL"];
const SIZE_SCALE = { Small: 0.25, Medium: 0.35, Large: 0.45, XL: 0.55 };

export default function VisualizerPage() {
  const { addItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeRoom, setActiveRoom] = useState(ROOMS[0]);
  const [selectedArtwork, setSelectedArtwork] = useState<Product | null>(allProducts[0]);
  const [artworkSize, setArtworkSize] = useState("Medium");
  const [withFrame, setWithFrame] = useState(false);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const filteredProducts = search
    ? allProducts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : allProducts.slice(0, 12);

  const scale = SIZE_SCALE[artworkSize as keyof typeof SIZE_SCALE] ?? 0.35;

  const handleAddToCart = () => {
    if (!selectedArtwork) return;
    addItem({
      product: selectedArtwork,
      selected_size: selectedArtwork.sizes[2] || selectedArtwork.sizes[0],
      quantity: 1,
    });
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="px-6 lg:px-10 pt-10 pb-6 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-[32px] md:text-[40px] font-normal mb-2"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Room Visualizer
          </h1>
          <p className="text-[14px]" style={{ color: "var(--muted)" }}>
            See how artwork looks in a curated space before you buy.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        {/* Room selector */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          {ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room)}
              className="shrink-0 flex flex-col items-center gap-2"
            >
              <div
                className="overflow-hidden rounded-[4px] border-2 transition-all"
                style={{
                  width: "100px",
                  height: "70px",
                  borderColor: activeRoom.id === room.id ? "#C5A572" : "transparent",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={room.image} alt={room.label} className="w-full h-full object-cover" />
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.1em]"
                style={{ color: activeRoom.id === room.id ? "#C5A572" : "var(--muted)" }}
              >
                {room.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main visualizer */}
          <div className="flex-1">
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-[4px]"
              style={{ aspectRatio: "16/10", backgroundColor: "#F0EDE8" }}
            >
              {/* Room background */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeRoom.id}
                  src={activeRoom.image}
                  alt={activeRoom.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Draggable artwork */}
              {selectedArtwork && (
                <motion.div
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.05}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "30%",
                    x: position.x,
                    y: position.y,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: `${scale * 100}%`,
                    cursor: "grab",
                    zIndex: 10,
                  }}
                  onDragEnd={(_, info) => {
                    setPosition((prev) => ({
                      x: prev.x + info.offset.x,
                      y: prev.y + info.offset.y,
                    }));
                  }}
                  whileDrag={{ cursor: "grabbing" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedArtwork.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                        border: withFrame ? "12px solid #1A1A1A" : "none",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedArtwork.images.primary}
                        alt={selectedArtwork.title}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: "4/5", display: "block" }}
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Instructions overlay */}
              <div className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(10,10,10,0.6)", color: "rgba(255,255,255,0.7)" }}>
                Drag to reposition
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-[300px] shrink-0">
            {/* Search */}
            <div
              className="flex items-center gap-2 border rounded-[3px] px-3 py-2 mb-4"
              style={{ borderColor: "var(--border-color)" }}
            >
              <Search size={14} style={{ color: "var(--muted)" }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search artworks…"
                className="flex-1 text-[13px] outline-none"
                style={{ backgroundColor: "transparent", color: "var(--text)" }}
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={13} style={{ color: "var(--muted)" }} />
                </button>
              )}
            </div>

            {/* Artwork grid */}
            <div className="grid grid-cols-3 gap-2 mb-5 max-h-[260px] overflow-y-auto">
              {filteredProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedArtwork(p);
                    setPosition({ x: 0, y: 0 });
                  }}
                  className="overflow-hidden rounded-[3px] border-2 transition-all"
                  style={{
                    aspectRatio: "4/5",
                    borderColor: selectedArtwork?.id === p.id ? "#C5A572" : "transparent",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images.primary} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Size */}
            <div className="mb-4">
              <p className="text-[11px] uppercase tracking-[0.15em] mb-2 font-medium" style={{ color: "var(--text)" }}>Size</p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setArtworkSize(s)}
                    className="flex-1 py-1.5 text-[11px] border rounded-[2px] transition-all"
                    style={{
                      borderColor: artworkSize === s ? "#C5A572" : "var(--border-color)",
                      color: artworkSize === s ? "#C5A572" : "var(--muted)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame toggle */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setWithFrame((v) => !v)}
                className="relative w-10 h-5 rounded-full transition-colors"
                style={{ backgroundColor: withFrame ? "#C5A572" : "var(--border-color)" }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                  style={{ left: withFrame ? "22px" : "2px" }}
                />
              </button>
              <span className="text-[13px]" style={{ color: "var(--text)" }}>Add Frame</span>
            </div>

            {/* Selected artwork info */}
            {selectedArtwork && (
              <div className="border-t pt-4" style={{ borderColor: "var(--border-color)" }}>
                <p className="text-[11px] uppercase tracking-[0.1em] mb-0.5" style={{ color: "var(--muted)" }}>
                  {selectedArtwork.artist.name}
                </p>
                <p
                  className="text-[16px] mb-1"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                >
                  {selectedArtwork.title}
                </p>
                <p className="text-[14px] mb-4" style={{ color: "#C5A572" }}>
                  From ${selectedArtwork.price_from}
                </p>
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 text-[12px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all hover:brightness-110 mb-2"
                  style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                >
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>
                <Link
                  href={`/shop/${selectedArtwork.slug}`}
                  className="block text-center text-[12px] uppercase tracking-[0.1em] transition-colors hover:text-[#C5A572]"
                  style={{ color: "var(--muted)" }}
                >
                  View Full Details →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Upload teaser */}
        <div
          className="mt-10 p-8 rounded-[4px] border text-center"
          style={{ borderColor: "var(--border-color)", backgroundColor: "var(--cream)" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[11px] uppercase tracking-[0.2em] font-medium" style={{ backgroundColor: "rgba(197,165,114,0.2)", color: "#C5A572" }}>
            Coming Soon
          </div>
          <h3
            className="text-[22px] mb-2"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Upload Your Room
          </h3>
          <p className="text-[14px]" style={{ color: "var(--muted)" }}>
            Visualize any artwork in your own space. Upload a photo and see art on your walls.
          </p>
        </div>
      </div>
    </div>
  );
}

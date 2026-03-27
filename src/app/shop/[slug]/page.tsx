"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Star, Heart, Share2, ChevronDown, ZoomIn, ShoppingBag } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/data-utils";
import { frames } from "@/data/frames";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Frame, MatOption, ProductSize } from "@/types";

const MAT_OPTIONS: { value: MatOption; label: string; color: string }[] = [
  { value: "none", label: "No Mat", color: "transparent" },
  { value: "white", label: "White", color: "#FFFFFF" },
  { value: "off-white", label: "Off-White", color: "#F5F0EB" },
  { value: "black", label: "Black", color: "#1A1A1A" },
];

const MAT_PRICE_ADDER = 15;

function AccordionItem({ title, children, defaultOpen = false }: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b" style={{ borderColor: "var(--border-color)" }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[13px] uppercase tracking-[0.15em] font-medium" style={{ color: "var(--text)" }}>
          {title}
        </span>
        <ChevronDown
          size={14}
          style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
        />
      </button>
      {open && (
        <div className="pb-5 text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [selectedMat, setSelectedMat] = useState<MatOption>("none");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[2] || product.sizes[0]);
      setActiveImage(product.images.primary);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <p className="text-[24px] mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Artwork not found
          </p>
          <Link href="/shop" className="text-[13px] uppercase tracking-[0.1em]" style={{ color: "#C5A572" }}>
            Back to Shop →
          </Link>
        </div>
      </div>
    );
  }

  const framePrice = selectedFrame && selectedSize
    ? selectedFrame.price_adder_by_size[selectedSize.label] ?? 0
    : 0;
  const matPrice = selectedMat !== "none" ? MAT_PRICE_ADDER : 0;
  const totalPrice = (selectedSize?.price ?? product.price_from) + framePrice + matPrice;

  const images = [
    product.images.primary,
    product.images.room,
    product.images.detail,
    product.images.framed,
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const related = getRelatedProducts(product.id, 6);

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* ── Breadcrumbs ─────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-8">
        <nav className="flex items-center gap-2 text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
          <Link href="/" className="hover:text-[#C5A572] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#C5A572] transition-colors">Shop</Link>
          <span>/</span>
          <span style={{ color: "var(--text)" }}>{product.title}</span>
        </nav>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* ── Left: Images ────────────────────────── */}
          <div className="w-full lg:w-[60%]">
            {/* Hero image */}
            <div
              className="relative overflow-hidden rounded-[4px] bg-[#F5F0EB] cursor-zoom-in"
              style={{ aspectRatio: "4/5" }}
              onClick={() => setZoomed(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={`${product.title} by ${product.artist.name}`}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              <div className="absolute top-4 right-4">
                <ZoomIn size={18} style={{ color: "var(--muted)" }} />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className="shrink-0 overflow-hidden rounded-[3px] border-2 transition-all"
                  style={{
                    width: "72px",
                    height: "72px",
                    borderColor: activeImage === img ? "#C5A572" : "transparent",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Info ─────────────────────────── */}
          <div className="w-full lg:w-[40%]">
            {/* Artist */}
            <Link
              href={`/artists/${product.artist.slug}`}
              className="text-[11px] uppercase tracking-[0.2em] hover:text-[#C5A572] transition-colors"
              style={{ color: "var(--muted)" }}
            >
              {product.artist.name}
            </Link>

            {/* Title */}
            <h1
              className="text-[28px] md:text-[32px] font-normal leading-tight mt-1 mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={i < Math.round(product.rating) ? "#C5A572" : "none"}
                    style={{ color: "#C5A572" }}
                  />
                ))}
              </div>
              <span className="text-[12px]" style={{ color: "var(--muted)" }}>
                {product.rating} ({product.review_count} reviews)
              </span>
            </div>

            {/* Price */}
            <p
              className="text-[28px] font-normal mb-1"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              ${totalPrice}
            </p>
            <p className="text-[12px] mb-6" style={{ color: "var(--muted)" }}>
              or 4 interest-free payments of ${Math.ceil(totalPrice / 4)} with Klarna
            </p>

            {/* ── Size selector ───────────────────── */}
            <div className="mb-6">
              <p className="text-[12px] uppercase tracking-[0.15em] mb-3 font-medium" style={{ color: "var(--text)" }}>
                Size
              </p>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.sku}
                    onClick={() => setSelectedSize(size)}
                    className="py-2.5 px-3 text-[12px] border rounded-[3px] transition-all text-center"
                    style={{
                      borderColor: selectedSize?.sku === size.sku ? "#C5A572" : "var(--border-color)",
                      color: selectedSize?.sku === size.sku ? "#C5A572" : "var(--muted)",
                      backgroundColor: selectedSize?.sku === size.sku ? "rgba(197,165,114,0.08)" : "transparent",
                    }}
                  >
                    <span className="block font-medium">{size.label}</span>
                    <span className="text-[11px]">${size.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Frame selector ──────────────────── */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] uppercase tracking-[0.15em] font-medium" style={{ color: "var(--text)" }}>
                  Frame
                </p>
                <button
                  onClick={() => setSelectedFrame(null)}
                  className="text-[11px] uppercase tracking-[0.1em] transition-colors hover:text-[#C5A572]"
                  style={{ color: "var(--muted)" }}
                >
                  {selectedFrame ? "Remove" : "Print Only"}
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {frames.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(selectedFrame?.id === frame.id ? null : frame)}
                    title={frame.name}
                    aria-label={frame.name}
                    className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                    style={{
                      backgroundColor: frame.color_hex,
                      borderColor: selectedFrame?.id === frame.id ? "#C5A572" : "transparent",
                      outline: selectedFrame?.id === frame.id ? "1px solid #C5A572" : "1px solid rgba(0,0,0,0.1)",
                      outlineOffset: selectedFrame?.id === frame.id ? "2px" : "0",
                    }}
                  />
                ))}
              </div>
              {selectedFrame && (
                <p className="mt-2 text-[12px]" style={{ color: "var(--muted)" }}>
                  {selectedFrame.name} +${framePrice}
                </p>
              )}
            </div>

            {/* ── Mat selector ────────────────────── */}
            {selectedFrame && (
              <div className="mb-6">
                <p className="text-[12px] uppercase tracking-[0.15em] mb-3 font-medium" style={{ color: "var(--text)" }}>
                  Mat
                </p>
                <div className="flex gap-2">
                  {MAT_OPTIONS.map((mat) => (
                    <button
                      key={mat.value}
                      onClick={() => setSelectedMat(mat.value)}
                      aria-label={mat.label}
                      title={mat.label}
                      className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                      style={{
                        backgroundColor: mat.color,
                        borderColor: selectedMat === mat.value ? "#C5A572" : "var(--border-color)",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Quantity ────────────────────────── */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-[12px] uppercase tracking-[0.15em] font-medium" style={{ color: "var(--text)" }}>
                Qty
              </p>
              <div className="flex items-center border rounded-[3px]" style={{ borderColor: "var(--border-color)" }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-lg transition-colors hover:text-[#C5A572]"
                  style={{ color: "var(--text)" }}
                >
                  −
                </button>
                <span className="w-10 text-center text-[14px]" style={{ color: "var(--text)" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-lg transition-colors hover:text-[#C5A572]"
                  style={{ color: "var(--text)" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* ── Add to Cart ─────────────────────── */}
            <motion.button
              onClick={handleAddToCart}
              className="w-full py-4 text-[13px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-3 mb-3 transition-all"
              style={{
                backgroundColor: addedToCart ? "#2D5A27" : "#C5A572",
                color: "#0A0A0A",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {addedToCart ? (
                <>✓ Added to Cart</>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Add to Cart — ${totalPrice}
                </>
              )}
            </motion.button>

            {/* Wishlist + Share */}
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 border text-[12px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
                style={{ borderColor: "var(--border-color)", color: "var(--muted)" }}
              >
                <Heart size={14} />
                Wishlist
              </button>
              <button
                className="flex-1 py-3 border text-[12px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
                style={{ borderColor: "var(--border-color)", color: "var(--muted)" }}
              >
                <Share2 size={14} />
                Share
              </button>
            </div>

            {/* ── Accordion ───────────────────────── */}
            <div className="mt-8">
              <AccordionItem title="About this Work" defaultOpen>
                <p>{product.description}</p>
                {product.artist_statement && (
                  <blockquote
                    className="mt-4 pl-3 border-l-2 italic"
                    style={{ borderColor: "#C5A572", color: "var(--muted)" }}
                  >
                    &ldquo;{product.artist_statement}&rdquo;
                    <footer className="mt-1 text-[12px] not-italic">— {product.artist.name}</footer>
                  </blockquote>
                )}
              </AccordionItem>

              <AccordionItem title="Specifications">
                <dl className="space-y-1.5">
                  <div className="flex justify-between">
                    <dt style={{ color: "var(--muted)" }}>Medium</dt>
                    <dd>{product.medium}</dd>
                  </div>
                  {product.paper_type && (
                    <div className="flex justify-between">
                      <dt style={{ color: "var(--muted)" }}>Paper</dt>
                      <dd>{product.paper_type}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt style={{ color: "var(--muted)" }}>Selected Size</dt>
                    <dd>{selectedSize?.dimensions ?? "—"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt style={{ color: "var(--muted)" }}>Orientation</dt>
                    <dd className="capitalize">{product.orientation}</dd>
                  </div>
                </dl>
              </AccordionItem>

              <AccordionItem title="Shipping & Returns">
                <p>Free standard shipping on orders over $150. Prints are carefully rolled or flat-packed in archival tubes or rigid boards. Delivery typically 5–10 business days.</p>
                <p className="mt-2">Free returns within 30 days if artwork arrives damaged.</p>
              </AccordionItem>

              {product.is_limited_edition && (
                <AccordionItem title="Certificate of Authenticity">
                  <p>This is a limited edition print. Each piece comes with a hand-signed certificate of authenticity from the artist, including edition number and total print run.</p>
                  {product.edition_size && (
                    <p className="mt-2">
                      Edition of {product.edition_size}.{" "}
                      {product.edition_remaining && (
                        <span style={{ color: "#C5A572" }}>{product.edition_remaining} remaining.</span>
                      )}
                    </p>
                  )}
                </AccordionItem>
              )}
            </div>
          </div>
        </div>

        {/* ── Complete the Wall ───────────────────── */}
        <div className="mt-20">
          <h2
            className="text-[28px] md:text-[36px] font-normal mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Complete the Wall
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Zoom modal ──────────────────────────────── */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-8 cursor-zoom-out"
            style={{ backgroundColor: "rgba(10,10,10,0.92)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

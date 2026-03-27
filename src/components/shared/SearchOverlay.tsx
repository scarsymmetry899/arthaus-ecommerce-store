"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { searchProducts, searchArtists } from "@/lib/data-utils";
import { collections } from "@/data/collections";
import type { Product, Artist } from "@/types";

const TRENDING = [
  { label: "Abstract", href: "/shop?category=abstract" },
  { label: "Photography", href: "/shop?category=photography" },
  { label: "Minimalist", href: "/shop?category=minimalist" },
  { label: "Limited Editions", href: "/shop?category=limited-editions" },
];

interface SearchResults {
  artworks: Product[];
  artists: Artist[];
  collections: typeof collections;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({ artworks: [], artists: [], collections: [] });
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults({ artworks: [], artists: [], collections: [] });
    }
  }, [isOpen]);

  // Debounced search
  const doSearch = useCallback((q: string) => {
    if (!q.trim()) {
      setResults({ artworks: [], artists: [], collections: [] });
      return;
    }
    const artworks = searchProducts(q).slice(0, 4);
    const arts = searchArtists(q).slice(0, 2);
    const cols = collections.filter((c) => c.title.toLowerCase().includes(q.toLowerCase())).slice(0, 2);
    setResults({ artworks, artists: arts, collections: cols });
  }, []);

  const handleChange = (val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 200);
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const hasResults = results.artworks.length > 0 || results.artists.length > 0 || results.collections.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ backgroundColor: "rgba(10,10,10,0.97)" }}
        >
          {/* Close button */}
          <div className="flex justify-end px-6 pt-6">
            <button
              onClick={onClose}
              aria-label="Close search"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search input */}
          <div className="flex items-center gap-4 px-8 md:px-16 mt-12 mb-8">
            <Search size={24} style={{ color: "rgba(250,248,245,0.4)" }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search artworks, artists, collections…"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30"
              style={{ fontSize: "clamp(24px, 4vw, 36px)", fontFamily: "var(--font-display)" }}
              aria-label="Search"
            />
            {query && (
              <button onClick={() => handleChange("")} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="h-px mx-8 md:mx-16" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

          {/* Results / Trending */}
          <div className="flex-1 overflow-y-auto px-8 md:px-16 py-8">
            {!query && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] mb-4 text-white/40">
                  Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((t) => (
                    <Link
                      key={t.label}
                      href={t.href}
                      onClick={onClose}
                      className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-[13px] hover:border-[#C5A572] hover:text-[#C5A572] transition-colors"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {query && !hasResults && (
              <div className="text-center py-12">
                <p className="text-white/40 text-[16px]" style={{ fontFamily: "var(--font-display)" }}>
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-white/30 text-[13px] mt-2">
                  Try a different search term
                </p>
              </div>
            )}

            {hasResults && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Artworks */}
                {results.artworks.length > 0 && (
                  <div className="lg:col-span-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] mb-4 text-white/40">
                      Artworks
                    </p>
                    <div className="space-y-4">
                      {results.artworks.map((artwork, i) => (
                        <Link
                          key={artwork.id}
                          href={`/shop/${artwork.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-12 h-14 rounded-[3px] overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={artwork.images.primary} alt={artwork.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p
                              className="text-[15px] text-white group-hover:text-[#C5A572] transition-colors"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {highlightQuery(artwork.title, query)}
                            </p>
                            <p className="text-[12px] text-white/40">{artwork.artist.name}</p>
                          </div>
                          <p className="ml-auto text-[13px]" style={{ color: "#C5A572" }}>
                            ${artwork.price_from}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Artists & Collections */}
                <div>
                  {results.artists.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[11px] uppercase tracking-[0.2em] mb-4 text-white/40">
                        Artists
                      </p>
                      {results.artists.map((artist) => (
                        <Link
                          key={artist.id}
                          href={`/artists/${artist.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 mb-3 group"
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={artist.portrait_image} alt={artist.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[14px] text-white group-hover:text-[#C5A572] transition-colors">
                              {artist.name}
                            </p>
                            <p className="text-[11px] text-white/40">{artist.location}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {results.collections.length > 0 && (
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] mb-4 text-white/40">
                        Collections
                      </p>
                      {results.collections.map((col) => (
                        <Link
                          key={col.id}
                          href={`/gallery/${col.slug}`}
                          onClick={onClose}
                          className="block text-[14px] text-white hover:text-[#C5A572] transition-colors mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {col.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function highlightQuery(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ backgroundColor: "rgba(197,165,114,0.3)", color: "#C5A572" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProductById } from "@/lib/data-utils";
import type { Product } from "@/types";

const STORAGE_KEY = "arthaus_recently_viewed";
const MAX_ITEMS = 12;

export function useRecentlyViewed(currentProductId?: string) {
  useEffect(() => {
    if (!currentProductId) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const ids: string[] = stored ? JSON.parse(stored) : [];
      const filtered = ids.filter((id) => id !== currentProductId);
      const updated = [currentProductId, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, [currentProductId]);
}

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const ids: string[] = JSON.parse(stored);
      const prods = ids
        .filter((id) => id !== excludeId)
        .map((id) => getProductById(id))
        .filter((p): p is Product => p !== undefined)
        .slice(0, 8);
      setProducts(prods);
    } catch {
      // ignore
    }
  }, [excludeId]);

  if (products.length === 0) return null;

  return (
    <div className="border-t py-8" style={{ borderColor: "var(--border-color)" }}>
      <p className="text-[12px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--muted)" }}>
        Recently Viewed
      </p>
      <div className="flex gap-3 overflow-x-auto">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/shop/${p.slug}`}
            className="shrink-0 w-16 h-16 rounded-[3px] overflow-hidden border-2 border-transparent hover:border-[#C5A572] transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.images.primary} alt={p.title} className="w-full h-full object-cover" />
          </Link>
        ))}
      </div>
    </div>
  );
}

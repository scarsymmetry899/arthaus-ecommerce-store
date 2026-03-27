"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SlidersHorizontal, Grid3X3, LayoutList, X, ChevronDown } from "lucide-react";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductCard } from "@/components/ui/ProductCard";
import { filterProducts, sortProducts, type SortOption } from "@/lib/data-utils";
import { DEFAULT_FILTERS } from "@/types";
import type { FilterState, Product } from "@/types";

const PAGE_SIZE = 12;

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Editor's Picks", value: "editors-picks" },
];

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-[4px] bg-[#E8E4DF]" style={{ aspectRatio: "4/5" }} />
      <div className="mt-3 space-y-2">
        <div className="h-2.5 w-24 bg-[#E8E4DF] rounded" />
        <div className="h-4 w-32 bg-[#E8E4DF] rounded" />
        <div className="h-3 w-16 bg-[#E8E4DF] rounded" />
      </div>
    </div>
  );
}

function ActiveFilterPills({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const pills: { label: string; onRemove: () => void }[] = [];

  filters.categories.forEach((cat) => {
    pills.push({
      label: cat.replace("-", " "),
      onRemove: () =>
        onChange({ ...filters, categories: filters.categories.filter((c) => c !== cat) }),
    });
  });
  filters.sizes.forEach((size) => {
    pills.push({
      label: size,
      onRemove: () =>
        onChange({ ...filters, sizes: filters.sizes.filter((s) => s !== size) }),
    });
  });
  filters.orientations.forEach((o) => {
    pills.push({
      label: o,
      onRemove: () =>
        onChange({ ...filters, orientations: filters.orientations.filter((x) => x !== o) }),
    });
  });

  if (!pills.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {pills.map((pill, i) => (
        <motion.button
          key={i}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={pill.onRemove}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] capitalize transition-colors hover:border-[#C5A572]"
          style={{ borderColor: "var(--border-color)", color: "var(--muted)" }}
        >
          {pill.label}
          <X size={10} />
        </motion.button>
      ))}
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<FilterState>(() => {
    const cat = searchParams.get("category");
    return {
      ...DEFAULT_FILTERS,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      categories: cat ? [cat as any] : [],
    };
  });

  const [sort, setSort] = useState<SortOption>("newest");
  const [view, setView] = useState<"grid" | "editorial">("grid");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading] = useState(false);

  const filteredProducts = sortProducts(filterProducts(filters), sort);
  const visibleProducts = filteredProducts.slice(0, page * PAGE_SIZE);
  const hasMore = visibleProducts.length < filteredProducts.length;

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
    // Sync URL
    const params = new URLSearchParams();
    if (newFilters.categories.length === 1) params.set("category", newFilters.categories[0]);
    if (newFilters.colors.length > 0) params.set("color", newFilters.colors[0]);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname]);

  const handleClear = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  // Sync category from URL when it changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFilters((prev) => ({ ...prev, categories: [cat as any] }));
    }
  }, [searchParams]);

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* ── Page Header ─────────────────────────────── */}
      <div
        className="border-b py-12 px-6 lg:px-10"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-4 text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
            <Link href="/" className="hover:text-[#C5A572] transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text)" }}>The Collection</span>
          </nav>

          <div className="flex items-end justify-between">
            <div>
              <h1
                className="text-[36px] md:text-[48px] font-normal leading-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                The Collection
              </h1>
              <p className="mt-1 text-[14px]" style={{ color: "var(--muted)" }}>
                {filteredProducts.length} works
              </p>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {/* View toggle */}
              <div className="flex border rounded-[4px] overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
                <button
                  onClick={() => setView("grid")}
                  className="p-2 transition-colors"
                  style={{
                    backgroundColor: view === "grid" ? "#C5A572" : "transparent",
                    color: view === "grid" ? "#0A0A0A" : "var(--muted)",
                  }}
                >
                  <Grid3X3 size={14} />
                </button>
                <button
                  onClick={() => setView("editorial")}
                  className="p-2 transition-colors"
                  style={{
                    backgroundColor: view === "editorial" ? "#C5A572" : "transparent",
                    color: view === "editorial" ? "#0A0A0A" : "var(--muted)",
                  }}
                >
                  <LayoutList size={14} />
                </button>
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="appearance-none pl-3 pr-8 py-2 text-[12px] uppercase tracking-[0.1em] border rounded-[4px] cursor-pointer outline-none"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--text)",
                    backgroundColor: "var(--bg)",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--muted)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="md:hidden flex items-center gap-2 mb-6 px-4 py-2 border rounded-[4px] text-[12px] uppercase tracking-[0.1em]"
          style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
        >
          <SlidersHorizontal size={14} />
          Filters
          {(filters.categories.length + filters.sizes.length + filters.colors.length) > 0 && (
            <span
              className="w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-medium"
              style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
            >
              {filters.categories.length + filters.sizes.length + filters.colors.length}
            </span>
          )}
        </button>

        <div className="flex gap-10">
          {/* Sidebar — desktop */}
          <div className="hidden md:block w-[240px] lg:w-[280px] shrink-0">
            <div className="sticky top-[100px]">
              <FilterSidebar
                filters={filters}
                onChange={handleFiltersChange}
                onClear={handleClear}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Active filter pills */}
            <AnimatePresence>
              <ActiveFilterPills filters={filters} onChange={handleFiltersChange} />
            </AnimatePresence>

            {/* Product grid */}
            {loading ? (
              <div className={`grid gap-6 ${view === "editorial" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="py-24 text-center">
                <p
                  className="text-[24px] mb-3"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                >
                  No works found
                </p>
                <p className="text-[14px] mb-6" style={{ color: "var(--muted)" }}>
                  Try adjusting your filters
                </p>
                <button
                  onClick={handleClear}
                  className="px-6 py-2 border text-[12px] uppercase tracking-[0.1em] transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
                  style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-6 md:gap-8 ${
                  view === "editorial"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {visibleProducts.map((product: Product, i: number) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} index={i} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Load more */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-10 py-3 border text-[13px] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#C5A572] hover:border-[#C5A572] hover:text-[#0A0A0A]"
                  style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(10,10,10,0.5)" }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[300px] overflow-y-auto p-6"
              style={{ backgroundColor: "var(--bg)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[14px] uppercase tracking-[0.2em]" style={{ color: "var(--text)" }}>
                  Filters
                </h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X size={18} style={{ color: "var(--text)" }} />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={(f) => { handleFiltersChange(f); setMobileFilterOpen(false); }}
                onClear={() => { handleClear(); setMobileFilterOpen(false); }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }} />}>
      <ShopContent />
    </Suspense>
  );
}

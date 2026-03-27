import type { Product, Artist, Collection, FilterState } from "@/types";
import { products } from "@/data/products";
import { artists } from "@/data/artists";
import { collections } from "@/data/collections";
import { colorDistance } from "./utils";

// ─── Products ─────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByArtist(artistId: string): Product[] {
  return products.filter((p) => p.artist.id === artistId);
}

export function getProductsByCollection(collectionId: string): Product[] {
  const collection = collections.find((c) => c.id === collectionId);
  if (!collection) return [];
  return collection.product_ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.is_featured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.is_new);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.is_bestseller);
}

export function getLimitedEditions(): Product[] {
  return products.filter((p) => p.is_limited_edition);
}

/**
 * Get related products: same category first, then same artist,
 * then products with similar dominant colors. Excludes the source product.
 */
export function getRelatedProducts(productId: string, limit = 6): Product[] {
  const source = products.find((p) => p.id === productId);
  if (!source) return products.slice(0, limit);

  const others = products.filter((p) => p.id !== productId);

  // Score each product by relevance
  const scored = others.map((p) => {
    let score = 0;
    if (p.category === source.category) score += 10;
    if (p.artist.id === source.artist.id) score += 8;
    if (p.collections.some((c) => source.collections.includes(c))) score += 5;
    // Color proximity bonus (lower distance = higher score)
    const dist = colorDistance(p.dominant_color, source.dominant_color);
    if (dist < 80) score += 4;
    else if (dist < 150) score += 2;
    return { product: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.product);
}

/**
 * Full-text search across title, artist name, tags, description, style_keywords
 */
export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return products.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.artist.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.style_keywords.some((k) => k.toLowerCase().includes(q)) ||
      p.medium.toLowerCase().includes(q)
    );
  });
}

/**
 * Filter products by a FilterState object
 */
export function filterProducts(filters: FilterState): Product[] {
  return products.filter((p) => {
    // Category
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
      return false;
    }

    // Price range
    if (p.price_from < filters.price_min || p.price_from > filters.price_max) {
      return false;
    }

    // Size
    if (filters.sizes.length > 0) {
      const hasSizeMatch = p.sizes.some((s) => filters.sizes.includes(s.label));
      if (!hasSizeMatch) return false;
    }

    // Orientation
    if (filters.orientations.length > 0 && !filters.orientations.includes(p.orientation)) {
      return false;
    }

    // Color (dominant_color proximity)
    if (filters.colors.length > 0) {
      const COLOR_THRESHOLD = 120; // Euclidean RGB distance
      const hasColorMatch = filters.colors.some(
        (swatchHex) => colorDistance(p.dominant_color, swatchHex) < COLOR_THRESHOLD
      );
      if (!hasColorMatch) return false;
    }

    // Medium
    if (filters.mediums.length > 0 && !filters.mediums.includes(p.medium)) {
      return false;
    }

    return true;
  });
}

/**
 * Sort products by a given criterion
 */
export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "popular"
  | "editors-picks";

export function sortProducts(prods: Product[], sort: SortOption): Product[] {
  const copy = [...prods];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price_from - b.price_from);
    case "price-desc":
      return copy.sort((a, b) => b.price_from - a.price_from);
    case "popular":
      return copy.sort((a, b) => b.review_count - a.review_count);
    case "editors-picks":
      return copy.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    case "newest":
    default:
      return copy.sort((a, b) => Number(b.is_new) - Number(a.is_new));
  }
}

// ─── Artists ──────────────────────────────────────────────────────────────────

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function searchArtists(query: string): Artist[] {
  if (!query.trim()) return artists;
  const q = query.toLowerCase();
  return artists.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q) ||
      a.specialties.some((s) => s.toLowerCase().includes(q))
  );
}

// ─── Collections ──────────────────────────────────────────────────────────────

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getActiveCollections(): Collection[] {
  return collections.filter((c) => c.is_active);
}

// ─── Category helpers ─────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<string, string> = {
  abstract: "Abstract",
  photography: "Photography",
  minimalist: "Minimalist",
  contemporary: "Contemporary",
  "nature-botanical": "Nature & Botanical",
  "black-white": "Black & White",
  digital: "Digital Art",
  "limited-editions": "Limited Editions",
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS);

export function getCategoryCounts(): Record<string, number> {
  return ALL_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = products.filter((p) => p.category === cat).length;
      return acc;
    },
    {} as Record<string, number>
  );
}

// ─── Price helpers ────────────────────────────────────────────────────────────

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map((p) => p.price_from);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

// ─── Random / editorial helpers ───────────────────────────────────────────────

export function getRandomProducts(count = 4, exclude: string[] = []): Product[] {
  const pool = products.filter((p) => !exclude.includes(p.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

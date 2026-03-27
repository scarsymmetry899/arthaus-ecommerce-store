import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { artists } from "@/data/artists";
import { journalPosts } from "@/data/journal";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arthaus.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "/", "/shop", "/gallery", "/artists", "/journal", "/about",
    "/contact", "/faq", "/shipping", "/size-guide", "/framing", "/visualizer",
  ].map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map(c => ({
    url: `${BASE}/gallery/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const artistRoutes: MetadataRoute.Sitemap = artists.map(a => ({
    url: `${BASE}/artists/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map(j => ({
    url: `${BASE}/journal/${j.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes, ...artistRoutes, ...journalRoutes];
}

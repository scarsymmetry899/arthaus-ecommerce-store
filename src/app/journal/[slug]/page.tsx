"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, journalPosts } from "@/data/journal";
import { getRandomProducts } from "@/lib/data-utils";
import { ProductCard } from "@/components/ui/ProductCard";
import type { JournalCategory } from "@/types";

const CATEGORY_LABELS: Record<JournalCategory, string> = {
  "art-guide": "Art Guide",
  "artist-interview": "Artist Interview",
  "trend-report": "Trend Report",
  "feature": "Feature",
};

export default function JournalPostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <p style={{ color: "var(--text)" }}>Post not found</p>
      </div>
    );
  }

  const related = journalPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);
  const shopProducts = getRandomProducts(3);

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: "50vh", minHeight: "320px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.hero_image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.8) 100%)" }}
        />
        <div className="absolute bottom-0 inset-x-0 p-8 max-w-[700px] mx-auto">
          <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "#C5A572" }}>
            {CATEGORY_LABELS[post.category]}
          </span>
          <h1
            className="text-[28px] md:text-[40px] font-normal text-white mt-1 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-[720px] mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b" style={{ borderColor: "var(--border-color)" }}>
          <span className="text-[13px]" style={{ color: "var(--muted)" }}>{post.author}</span>
          <span style={{ color: "var(--border-color)" }}>·</span>
          <span className="text-[13px]" style={{ color: "var(--muted)" }}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span style={{ color: "var(--border-color)" }}>·</span>
          <span className="text-[13px]" style={{ color: "var(--muted)" }}>{post.reading_time} min read</span>
        </div>

        {/* Body HTML */}
        <div
          className="prose max-w-none"
          style={{ color: "var(--text)" }}
          dangerouslySetInnerHTML={{ __html: post.body
            .replace(/<h2>/g, `<h2 style="font-family: var(--font-display); font-size: 24px; color: var(--text); margin-top: 2rem; margin-bottom: 1rem;">`)
            .replace(/<blockquote>/g, `<blockquote style="border-left: 3px solid #C5A572; padding-left: 1rem; margin: 2rem 0; font-style: italic; color: var(--muted); font-family: var(--font-display); font-size: 20px;">`)
            .replace(/<p>/g, `<p style="color: var(--muted); line-height: 1.8; margin-bottom: 1rem; font-size: 16px;">`)
          }}
        />

        {/* Shop This Look */}
        <div className="mt-12 border-t pt-10" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: "#C5A572" }}>
            Shop This Look
          </p>
          <div className="grid grid-cols-3 gap-4">
            {shopProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-[12px] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>Share:</span>
          {["Twitter", "Facebook", "Pinterest"].map((s) => (
            <button
              key={s}
              className="text-[12px] transition-colors hover:text-[#C5A572]"
              style={{ color: "var(--muted)" }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12 border-t pt-10" style={{ borderColor: "var(--border-color)" }}>
            <h3
              className="text-[22px] mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((relPost) => (
                <Link key={relPost.id} href={`/journal/${relPost.slug}`} className="group block">
                  <div className="overflow-hidden rounded-[3px] mb-3" style={{ aspectRatio: "16/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={relPost.hero_image} alt={relPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-[15px] group-hover:text-[#C5A572] transition-colors" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                    {relPost.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

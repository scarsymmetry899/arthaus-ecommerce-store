"use client";

import { useUser } from "@/lib/user-context";
import { getProductById } from "@/lib/data-utils";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn || !user) {
    return (
      <div className="text-center py-20">
        <p style={{ color: "var(--muted)" }}>
          Please <Link href="/account" style={{ color: "#C5A572" }}>sign in</Link> to view your wishlist.
        </p>
      </div>
    );
  }

  const wishlistProducts = user.wishlist_ids.map((id) => getProductById(id)).filter(Boolean);

  return (
    <div>
      <h2
        className="text-[28px] font-normal mb-8"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        Your Wishlist
      </h2>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[22px] mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Your wishlist is empty
          </p>
          <p className="text-[14px] mb-8" style={{ color: "var(--muted)" }}>
            Save artworks you love by clicking the heart icon.
          </p>
          <Link
            href="/shop"
            className="inline-flex px-8 py-3 text-[12px] uppercase tracking-[0.15em] transition-all hover:brightness-110"
            style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
          >
            Explore the Gallery
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((p, i) => p && (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

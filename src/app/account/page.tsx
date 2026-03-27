"use client";

import { useUser } from "@/lib/user-context";
import { getRandomProducts, getProductById } from "@/lib/data-utils";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

function LoginForm() {
  const { login } = useUser();

  return (
    <div className="max-w-[400px]">
      <h2 className="text-[28px] mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
        Sign In to Your Gallery
      </h2>
      <div className="space-y-4 mb-6">
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 border text-[14px] outline-none rounded-[3px]"
          style={{ borderColor: "var(--border-color)", color: "var(--text)", backgroundColor: "var(--bg)" }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border text-[14px] outline-none rounded-[3px]"
          style={{ borderColor: "var(--border-color)", color: "var(--text)", backgroundColor: "var(--bg)" }}
        />
      </div>
      <button
        onClick={login}
        className="w-full py-3 text-[13px] uppercase tracking-[0.2em] transition-all hover:brightness-110"
        style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
      >
        Sign In (Demo)
      </button>
      <p className="text-[12px] mt-3 text-center" style={{ color: "var(--muted)" }}>
        Don&apos;t have an account?{" "}
        <span style={{ color: "#C5A572", cursor: "pointer" }}>Create one</span>
      </p>
    </div>
  );
}

export default function AccountDashboard() {
  const { user, isLoggedIn, logout } = useUser();

  if (!isLoggedIn || !user) {
    return <LoginForm />;
  }

  const wishlistProducts = user.wishlist_ids.map((id) => getProductById(id)).filter(Boolean);
  const recommendations = getRandomProducts(4, user.wishlist_ids);

  return (
    <div>
      {/* Welcome */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-[28px] font-normal"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Welcome back, {user.name.split(" ")[0]}
          </h2>
          <p style={{ color: "var(--muted)" }}>{user.email}</p>
        </div>
        <button
          onClick={logout}
          className="text-[12px] uppercase tracking-[0.1em] transition-colors hover:text-[#C5A572]"
          style={{ color: "var(--muted)" }}
        >
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Orders", value: "3" },
          { label: "Wishlist", value: String(user.wishlist_ids.length) },
          { label: "Saved Rooms", value: "2" },
          { label: "Artworks Owned", value: "5" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 border rounded-[4px] text-center"
            style={{ borderColor: "var(--border-color)" }}
          >
            <p
              className="text-[28px] font-light"
              style={{ fontFamily: "var(--font-display)", color: "#C5A572" }}
            >
              {stat.value}
            </p>
            <p className="text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-[20px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Recent Orders
          </h3>
          <Link href="/account/orders" className="text-[12px] uppercase tracking-[0.1em] hover:text-[#C5A572] transition-colors" style={{ color: "var(--muted)" }}>
            View All →
          </Link>
        </div>
        <div
          className="border rounded-[4px] overflow-hidden"
          style={{ borderColor: "var(--border-color)" }}
        >
          {[
            { id: "ARTH-12345", date: "Feb 14, 2026", total: "$162", status: "Delivered" },
            { id: "ARTH-12100", date: "Jan 28, 2026", total: "$98", status: "Delivered" },
          ].map((order, i) => (
            <div
              key={order.id}
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: i < 1 ? `1px solid var(--border-color)` : "none" }}
            >
              <div>
                <p className="text-[13px] font-medium" style={{ color: "var(--text)" }}>{order.id}</p>
                <p className="text-[12px]" style={{ color: "var(--muted)" }}>{order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px]" style={{ color: "var(--text)" }}>{order.total}</p>
                <p className="text-[11px]" style={{ color: "#C5A572" }}>{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist preview */}
      {wishlistProducts.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-[20px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              Your Wishlist
            </h3>
            <Link href="/account/wishlist" className="text-[12px] uppercase tracking-[0.1em] hover:text-[#C5A572] transition-colors" style={{ color: "var(--muted)" }}>
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {wishlistProducts.map((p, i) => p && (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div>
        <h3
          className="text-[20px] mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          Recommended for You
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {recommendations.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

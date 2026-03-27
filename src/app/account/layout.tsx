"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProvider } from "@/lib/user-context";
import type { ReactNode } from "react";
import { LayoutGrid, Package, Heart, Image, Settings } from "lucide-react";

const NAV_ITEMS = [
  { href: "/account", label: "My Gallery", icon: LayoutGrid, exact: true },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/saved-rooms", label: "Saved Rooms", icon: Image },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <UserProvider>
      <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="w-full lg:w-[220px] shrink-0">
              <h2
                className="text-[24px] mb-6"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                Account
              </h2>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href) && !item.exact;
                  const isExactActive = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-[3px] transition-all text-[14px]"
                      style={{
                        color: isExactActive ? "#C5A572" : "var(--muted)",
                        borderLeft: isExactActive ? "3px solid #C5A572" : "3px solid transparent",
                        backgroundColor: isExactActive ? "rgba(197,165,114,0.07)" : "transparent",
                      }}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

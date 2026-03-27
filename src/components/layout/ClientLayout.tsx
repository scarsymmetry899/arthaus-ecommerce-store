"use client";

import dynamic from "next/dynamic";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import type { ReactNode } from "react";

// Client-only components
const CustomCursor = dynamic(
  () => import("@/components/shared/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const CartDrawer = dynamic(
  () => import("@/components/shop/CartDrawer").then((m) => m.CartDrawer),
  { ssr: false }
);

const BackToTop = dynamic(
  () => import("@/components/shared/BackToTop").then((m) => m.BackToTop),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("@/components/shared/CookieConsent").then((m) => m.CookieConsent),
  { ssr: false }
);

const NewsletterPopup = dynamic(
  () => import("@/components/shared/NewsletterPopup").then((m) => m.NewsletterPopup),
  { ssr: false }
);

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <CustomCursor />
          <Header />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
          <CartDrawer />
          <BackToTop />
          <CookieConsent />
          <NewsletterPopup />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

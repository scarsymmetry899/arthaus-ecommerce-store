"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Instagram,
  Twitter,
  Sun,
  Moon,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-context";
import { CATEGORY_LABELS } from "@/lib/data-utils";
import { collections } from "@/data/collections";

// Load SearchOverlay client-side only
const SearchOverlay = dynamic(
  () => import("@/components/shared/SearchOverlay").then((m) => m.SearchOverlay),
  { ssr: false }
);

// ─── Constants ───────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Shop",    href: "/shop",    hasMega: true },
  { label: "Gallery", href: "/gallery", hasMega: false },
  { label: "Artists", href: "/artists", hasMega: false },
  { label: "Journal", href: "/journal", hasMega: false },
  { label: "About",   href: "/about",   hasMega: false },
];

const CATEGORIES = Object.entries(CATEGORY_LABELS);
const FEATURED_COLLECTION = collections[2]; // "The Abstract Edit"

// ─── Mobile menu animation variants ─────────────────────────────────────────

const overlayVariants: Variants = {
  open:   { opacity: 1 },
  closed: { opacity: 0 },
};

const mobileNavContainer: Variants = {
  open:   { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const mobileNavItem: Variants = {
  open:   { x: 0,   opacity: 1 },
  closed: { x: -40, opacity: 0 },
};

// ─── Header ──────────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  const [scrolled,        setScrolled]        = useState(false);
  const [megaOpen,        setMegaOpen]        = useState(false);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [searchOpen,      setSearchOpen]      = useState(false);
  const [prevItemCount,   setPrevItemCount]   = useState(itemCount);
  const [badgePulse,      setBadgePulse]      = useState(false);

  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Cart badge pulse on count change
  useEffect(() => {
    if (itemCount !== prevItemCount) {
      setBadgePulse(true);
      setPrevItemCount(itemCount);
      const t = setTimeout(() => setBadgePulse(false), 400);
      return () => clearTimeout(t);
    }
  }, [itemCount, prevItemCount]);

  // Mega-menu hover helpers
  const openMega = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const textColor   = scrolled ? "var(--text)"     : "#FAF8F5";
  const borderColor = scrolled ? "var(--border-color)" : "rgba(250,248,245,0.15)";

  return (
    <>
      {/* ── Main header bar ───────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "var(--bg)" : "transparent",
          borderBottom:     scrolled ? `1px solid ${borderColor}` : "1px solid transparent",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.22em] uppercase select-none transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-display)", color: textColor }}
          >
            ARTHAUS
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.hasMega ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <button
                    className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.1em] transition-colors duration-200"
                    style={{ color: textColor }}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                  >
                    {link.label}
                    <ChevronDown
                      size={12}
                      className="transition-transform duration-200"
                      style={{ transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-medium uppercase tracking-[0.1em] transition-colors duration-200"
                  style={{ color: pathname.startsWith(link.href) ? "#C5A572" : textColor }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Icon row */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Dark mode toggle */}
            <button
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10"
            >
              {theme === "dark"
                ? <Sun size={17} color={textColor} />
                : <Moon size={17} color={textColor} />
              }
            </button>

            {/* Search */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10"
            >
              <Search size={17} color={textColor} />
            </button>

            {/* Account */}
            <Link
              href="/account"
              aria-label="Account"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10"
            >
              <User size={17} color={textColor} />
            </Link>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              aria-label="Wishlist"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10"
            >
              <Heart size={17} color={textColor} />
            </Link>

            {/* Cart with badge */}
            <button
              aria-label={`Cart — ${itemCount} items`}
              onClick={toggleCart}
              className="relative w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10"
            >
              <ShoppingBag size={17} color={textColor} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: badgePulse ? [1, 1.4, 1] : 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold text-[#0A0A0A]"
                    style={{ backgroundColor: "#C5A572" }}
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger (mobile) */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10 ml-1"
            >
              {mobileOpen
                ? <X size={18} color={textColor} />
                : <Menu size={18} color={textColor} />
              }
            </button>
          </div>
        </div>

        {/* ── Mega menu ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 shadow-xl"
              style={{ backgroundColor: "var(--bg)", borderBottom: `1px solid var(--border-color)` }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <div className="max-w-[1400px] mx-auto px-10 py-8 flex gap-16">

                {/* Left — category links */}
                <div className="grid grid-cols-2 gap-x-10 gap-y-1 flex-1">
                  <div className="col-span-2 mb-2">
                    <Link
                      href="/shop"
                      className="text-[11px] uppercase tracking-[0.15em] font-medium flex items-center gap-1 hover:text-[#C5A572] transition-colors"
                      style={{ color: "var(--muted)" }}
                    >
                      All Art <ArrowRight size={11} />
                    </Link>
                  </div>
                  {CATEGORIES.map(([slug, label]) => (
                    <Link
                      key={slug}
                      href={`/shop?category=${slug}`}
                      className="text-sm py-1.5 transition-colors duration-150 hover:text-[#C5A572]"
                      style={{ color: "var(--text)" }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Right — featured collection card */}
                <div className="w-[260px] shrink-0">
                  <p
                    className="text-[11px] uppercase tracking-[0.15em] mb-3"
                    style={{ color: "var(--muted)" }}
                  >
                    Featured Collection
                  </p>
                  <Link
                    href={`/gallery/${FEATURED_COLLECTION.slug}`}
                    className="group block rounded-sm overflow-hidden"
                  >
                    <div className="relative overflow-hidden h-[140px] bg-[#E8E4DF]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={FEATURED_COLLECTION.hero_image}
                        alt={FEATURED_COLLECTION.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="pt-3">
                      <p className="text-sm font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
                        {FEATURED_COLLECTION.title}
                      </p>
                      <p
                        className="text-[12px] mt-0.5 flex items-center gap-1 group-hover:text-[#C5A572] transition-colors"
                        style={{ color: "var(--muted)" }}
                      >
                        Explore <ArrowRight size={11} />
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Search Overlay ────────────────────────────────────────────────── */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Mobile menu overlay ───────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 h-[72px]">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-semibold tracking-[0.22em] uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ARTHAUS
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <motion.nav
              variants={mobileNavContainer}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex-1 flex flex-col justify-center px-8 gap-2"
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.label} variants={mobileNavItem}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[32px] font-light text-white/80 hover:text-white transition-colors py-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Category sub-links */}
              <motion.div variants={mobileNavItem} className="mt-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/30 mb-3">
                  Browse by style
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(([slug, label]) => (
                    <Link
                      key={slug}
                      href={`/shop?category=${slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.nav>

            {/* Bottom social icons */}
            <div className="px-8 pb-10 flex items-center gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/30 hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-white/30 hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

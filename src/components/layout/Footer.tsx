"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Instagram, Twitter } from "lucide-react";

const shopLinks = [
  { label: "All Art",         href: "/shop" },
  { label: "New Arrivals",    href: "/shop?sort=newest" },
  { label: "Best Sellers",    href: "/shop?sort=popular" },
  { label: "Limited Editions",href: "/shop?category=limited-editions" },
  { label: "Gift Cards",      href: "/gift-cards" },
];

const helpLinks = [
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "FAQ",                href: "/faq" },
  { label: "Contact",            href: "/contact" },
  { label: "Size Guide",         href: "/size-guide" },
  { label: "Framing Guide",      href: "/framing" },
];

// ─── Newsletter form (client state) ──────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-sm" style={{ color: "#C5A572" }}>
        Welcome to the gallery. ✓
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="flex-1 min-w-0 bg-transparent border-b border-white/20 text-sm text-white placeholder:text-white/30 py-2 outline-none focus:border-[#C5A572] transition-colors duration-200"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-opacity hover:opacity-70"
        style={{ backgroundColor: "#C5A572" }}
      >
        <ArrowRight size={14} color="#0A0A0A" />
      </button>
    </form>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--footer-bg)", color: "#FAF8F5" }}
    >
      {/* Grain texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E\")",
          opacity: 0.4,
        }}
      />

      {/* Main columns */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-semibold tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ARTHAUS
            </Link>
            <p className="mt-3 text-xs text-white/40 uppercase tracking-widest">
              Curated art for every space
            </p>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-[240px]">
              We believe great art should live in great homes. Every piece in
              our collection is hand-selected for quality, originality, and
              lasting resonance.
            </p>
          </div>

          {/* Col 2 — Shop */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.15em] mb-5"
              style={{ color: "#C5A572" }}
            >
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-draw text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Help */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.15em] mb-5"
              style={{ color: "#C5A572" }}
            >
              Help
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-draw text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.15em] mb-5"
              style={{ color: "#C5A572" }}
            >
              Connect
            </h3>
            <p className="text-sm text-white/50 mb-1">
              Join our gallery for early access to drops and exclusive prints.
            </p>
            <NewsletterForm />

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ARTHAUS on Instagram"
                className="text-white/40 hover:text-[#C5A572] transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ARTHAUS on Pinterest"
                className="text-white/40 hover:text-[#C5A572] transition-colors duration-200"
              >
                {/* Pinterest not in lucide — use a simple SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.498 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.565 0-2.386-1.715-4.054-4.163-4.054-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.312-.244.995-.277 1.134-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446C17.523 22 22 17.523 22 12S17.523 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ARTHAUS on X"
                className="text-white/40 hover:text-[#C5A572] transition-colors duration-200"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs text-white/30">
            © 2025 ARTHAUS. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

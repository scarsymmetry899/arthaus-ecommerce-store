"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show if already seen this session
    if (sessionStorage.getItem("arthaus_popup_seen")) return;
    // Don't show if already subscribed
    if (localStorage.getItem("arthaus_subscribed")) return;

    const show = () => {
      if (sessionStorage.getItem("arthaus_popup_seen")) return;
      sessionStorage.setItem("arthaus_popup_seen", "1");
      setIsOpen(true);
    };

    // Timer: 30 seconds
    const timer = setTimeout(show, 30000);

    // Scroll: 50% of page
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPct > 0.5) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem("arthaus_subscribed", "1");
    setSubmitted(true);
    setTimeout(close, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className="fixed inset-0 z-[151] flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-[720px] rounded-sm overflow-hidden flex flex-col sm:flex-row"
              style={{ backgroundColor: "var(--bg)", boxShadow: "0 25px 80px rgba(0,0,0,0.4)" }}>

              {/* Left — artwork image */}
              <div className="hidden sm:block w-[280px] shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://picsum.photos/seed/popup-art/400/500" alt="Featured artwork"
                  className="w-full h-full object-cover" />
              </div>

              {/* Right — form */}
              <div className="flex-1 p-10 flex flex-col justify-center">
                <button onClick={close} aria-label="Close"
                  className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <X size={18} />
                </button>

                {submitted ? (
                  <div className="text-center">
                    <p className="text-3xl mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      Welcome to the gallery.
                    </p>
                    <p className="text-sm" style={{ color: "#C5A572" }}>Your 10% discount code is on its way. ✓</p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#C5A572" }}>
                      Limited time offer
                    </p>
                    <h2 className="text-3xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      Get 10% Off Your First Order
                    </h2>
                    <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
                      Join the ARTHAUS community for exclusive drops, curated picks, and art world insights.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="email" value={email} onChange={e => setEmail(e.target.value)}
                        required placeholder="Your email address"
                        className="w-full py-3 px-4 text-sm border outline-none transition-colors focus:border-[#C5A572]"
                        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text)" }}
                      />
                      <button type="submit"
                        className="w-full py-3 text-sm font-medium uppercase tracking-widest transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}>
                        Subscribe &amp; Get 10% Off
                      </button>
                    </form>
                    <button onClick={close} className="mt-4 text-xs text-center w-full" style={{ color: "var(--muted)" }}>
                      No thanks, I&apos;ll pay full price
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "arthaus_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        setTimeout(() => setVisible(true), 1500);
      }
    } catch {
      // ignore
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-50 px-6 py-4"
          style={{ backgroundColor: "#1A1A1A", borderTop: "1px solid #2A2A2A" }}
        >
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <p className="text-[13px] text-white/70 max-w-[600px]">
              We use cookies to improve your experience, personalise content, and analyse traffic.
              You can manage preferences in{" "}
              <span style={{ color: "#C5A572", cursor: "pointer" }}>Settings</span>.
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-[12px] uppercase tracking-[0.1em] text-white/50 hover:text-white transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 text-[12px] uppercase tracking-[0.1em] font-medium transition-all hover:brightness-110"
                style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

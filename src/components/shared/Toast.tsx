"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";

interface ToastItem {
  id: string;
  product: Product;
  message: string;
}

interface ToastProps {
  toasts: ToastItem[];
}

export function Toast({ toasts }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-4 py-3 rounded-[4px] shadow-xl pointer-events-auto"
            style={{
              backgroundColor: "var(--text)",
              color: "var(--bg)",
              minWidth: "280px",
              maxWidth: "360px",
            }}
          >
            {/* Thumbnail */}
            <div className="w-10 h-10 rounded-[3px] overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={toast.product.images.primary}
                alt={toast.product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium" style={{ color: "#C5A572" }}>
                {toast.message}
              </p>
              <p
                className="text-[14px] truncate leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {toast.product.title}
              </p>
            </div>

            {/* Checkmark */}
            <span className="text-[#C5A572] text-lg shrink-0">✓</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

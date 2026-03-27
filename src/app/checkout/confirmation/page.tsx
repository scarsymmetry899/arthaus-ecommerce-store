"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getRandomProducts } from "@/lib/data-utils";
import { ProductCard } from "@/components/ui/ProductCard";

function AnimatedCheckmark() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle */}
      <motion.circle
        cx="40"
        cy="40"
        r="36"
        stroke="#C5A572"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        pathLength="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      {/* Checkmark */}
      <motion.path
        d="M24 40L35 51L56 30"
        stroke="#C5A572"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function ConfirmationPage() {
  const [orderNumber] = useState(
    `ARTH-${Math.floor(10000 + Math.random() * 90000)}`
  );
  const recommendations = getRandomProducts(4);

  // Calculate estimated delivery (5 days from now)
  const [deliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  });

  return (
    <div
      className="min-h-screen py-16 px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-[700px] mx-auto text-center">
        {/* Animated checkmark */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedCheckmark />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <p
            className="text-[12px] uppercase tracking-[0.25em] mb-3"
            style={{ color: "#C5A572" }}
          >
            Order Confirmed
          </p>

          <h1
            className="text-[32px] md:text-[40px] font-normal mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Your Art is on Its Way
          </h1>

          <p className="text-[15px] mb-6" style={{ color: "var(--muted)" }}>
            Thank you for your order. We&apos;re carefully preparing your artwork.
          </p>

          {/* Order details */}
          <div
            className="inline-flex flex-col items-center gap-1 px-8 py-4 rounded-[4px] border mb-8"
            style={{ borderColor: "var(--border-color)" }}
          >
            <p className="text-[12px] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
              Order Number
            </p>
            <p
              className="text-[20px]"
              style={{ fontFamily: "var(--font-display)", color: "#C5A572" }}
            >
              {orderNumber}
            </p>
            <p className="text-[13px]" style={{ color: "var(--muted)" }}>
              Estimated delivery: {deliveryDate}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              className="px-8 py-3 text-[13px] uppercase tracking-[0.15em] border transition-all hover:border-[#C5A572] hover:text-[#C5A572]"
              style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
            >
              Track Order
            </button>
            <Link
              href="/shop"
              className="px-8 py-3 text-[13px] uppercase tracking-[0.15em] text-center transition-all hover:brightness-110"
              style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
            >
              Continue Shopping
            </Link>
          </div>

          {/* Recommendations */}
          <div className="text-left">
            <h2
              className="text-[24px] mb-6 text-center"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              You Might Also Love
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {recommendations.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

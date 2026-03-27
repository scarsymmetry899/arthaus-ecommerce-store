"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import Link from "next/link";

const MOCK_ORDERS = [
  {
    id: "ARTH-12345",
    date: "Feb 14, 2026",
    total: 162,
    status: "Delivered" as const,
    items: [{ title: "Amber Horizon", size: "24×36", qty: 1, price: 162 }],
    tracking: "UPS123456789",
  },
  {
    id: "ARTH-12100",
    date: "Jan 28, 2026",
    total: 98,
    status: "Delivered" as const,
    items: [{ title: "Lunar Drift", size: "18×24", qty: 1, price: 98 }],
    tracking: "UPS987654321",
  },
  {
    id: "ARTH-11900",
    date: "Dec 15, 2025",
    total: 245,
    status: "Delivered" as const,
    items: [{ title: "Urban Nocturne", size: "30×40", qty: 1, price: 245 }],
    tracking: "UPS111222333",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "#2D5A27",
  Shipped: "#C5A572",
  Processing: "var(--muted)",
  Cancelled: "#8B1A1A",
};

export default function OrdersPage() {
  const { isLoggedIn } = useUser();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <p style={{ color: "var(--muted)" }}>Please <Link href="/account" style={{ color: "#C5A572" }}>sign in</Link> to view orders.</p>
      </div>
    );
  }

  return (
    <div>
      <h2
        className="text-[28px] font-normal mb-8"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        Your Orders
      </h2>

      <div className="space-y-3">
        {MOCK_ORDERS.map((order) => (
          <div
            key={order.id}
            className="border rounded-[4px] overflow-hidden"
            style={{ borderColor: "var(--border-color)" }}
          >
            {/* Header row */}
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div>
                <p className="text-[14px] font-medium" style={{ color: "var(--text)" }}>{order.id}</p>
                <p className="text-[12px]" style={{ color: "var(--muted)" }}>{order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[14px]" style={{ color: "var(--text)" }}>${order.total}</p>
                <p
                  className="text-[11px] uppercase tracking-[0.1em]"
                  style={{ color: STATUS_COLORS[order.status] }}
                >
                  {order.status}
                </p>
              </div>
            </button>

            {/* Expanded detail */}
            {expandedOrder === order.id && (
              <div
                className="px-5 pb-5 border-t"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="pt-4 space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-[13px]">
                      <span style={{ color: "var(--text)" }}>{item.title} · {item.size} × {item.qty}</span>
                      <span style={{ color: "var(--muted)" }}>${item.price}</span>
                    </div>
                  ))}
                </div>
                {order.tracking && (
                  <p className="text-[12px]" style={{ color: "var(--muted)" }}>
                    Tracking: <span style={{ color: "#C5A572" }}>{order.tracking}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

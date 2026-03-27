"use client";

import Link from "next/link";

export default function SavedRoomsPage() {
  return (
    <div>
      <h2
        className="text-[28px] font-normal mb-8"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        Saved Rooms
      </h2>
      <div className="text-center py-20">
        <p className="text-[22px] mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
          No saved rooms yet
        </p>
        <p className="text-[14px] mb-8" style={{ color: "var(--muted)" }}>
          Use the Room Visualizer to try artwork in different spaces, then save your favourites.
        </p>
        <Link
          href="/visualizer"
          className="inline-flex px-8 py-3 text-[12px] uppercase tracking-[0.15em] transition-all hover:brightness-110"
          style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
        >
          Open Visualizer
        </Link>
      </div>
    </div>
  );
}

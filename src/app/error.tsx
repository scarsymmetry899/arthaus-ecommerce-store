"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <p className="text-xs uppercase tracking-[0.25em] mb-6" style={{ color: "#C5A572" }}>
        Something went wrong
      </p>
      <h1
        className="text-4xl md:text-5xl mb-4"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        The Gallery Stumbled
      </h1>
      <p className="text-base mb-10 max-w-[400px]" style={{ color: "var(--muted)" }}>
        An unexpected error occurred. Please try again — if the problem persists, contact our team.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={reset}
          className="px-8 py-3 text-sm font-medium uppercase tracking-widest transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-8 py-3 text-sm font-medium uppercase tracking-widest border transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
          style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

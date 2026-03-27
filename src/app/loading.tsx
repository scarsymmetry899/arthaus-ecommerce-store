export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* ARTHAUS wordmark */}
      <span
        className="text-xl tracking-[0.25em] uppercase select-none"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        ARTHAUS
      </span>

      {/* Animated gold bar */}
      <div
        className="relative w-[120px] h-[1px] overflow-hidden"
        style={{ backgroundColor: "var(--border-color)" }}
      >
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{
            backgroundColor: "#C5A572",
            animation: "loading-bar 1.4s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

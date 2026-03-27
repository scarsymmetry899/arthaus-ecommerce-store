import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Size Guide | ARTHAUS",
  description: "Find the perfect print size for your wall. Compare dimensions, recommended room types, and price ranges for every ARTHAUS size.",
};

const SIZES = [
  { name: "Small",      dims: "8×10\"",   cm: "20×25 cm",   rooms: "Desk, small shelf, gallery wall accent",  price: "$35–$55",   cols: 1, rows: 1 },
  { name: "Medium",     dims: "12×16\"",  cm: "30×41 cm",   rooms: "Bedroom, bathroom, narrow hallway",       price: "$55–$85",   cols: 2, rows: 1.3 },
  { name: "Standard",   dims: "18×24\"",  cm: "46×61 cm",   rooms: "Living room, office, above a desk",       price: "$85–$130",  cols: 3, rows: 2 },
  { name: "Large",      dims: "24×36\"",  cm: "61×91 cm",   rooms: "Dining room, master bedroom, entryway",   price: "$130–$195", cols: 4, rows: 2.7 },
  { name: "Oversized",  dims: "30×40\"",  cm: "76×102 cm",  rooms: "Statement wall, open-plan living, above a sofa", price: "$195–$280", cols: 5, rows: 3.3 },
];

const TIPS = [
  {
    title: "Measure Your Wall",
    body: "Use painter's tape to mark out the print dimensions on your wall before ordering. This gives you a realistic sense of scale and helps you decide if you need one large piece or a cluster of smaller ones.",
  },
  {
    title: "The Two-Thirds Rule",
    body: "A piece hung above a sofa or bed should span roughly two-thirds of the furniture's width. For a 90\" sofa, a 24×36\" or 30×40\" print typically works best.",
  },
  {
    title: "Gallery Walls",
    body: "Mix sizes for visual interest — anchor with one large print (18×24\" or bigger) and cluster smaller pieces around it. Keep gaps consistent at 2–3\" for a cohesive look.",
  },
  {
    title: "Framing & Mat Considerations",
    body: "Adding a frame with a mat increases the overall dimensions by 4–8\". A framed 18×24\" print with a standard 2\" mat and frame will take up roughly 24×30\" of wall space.",
  },
];

export default function SizeGuidePage() {
  const maxCols = 5;
  const unitW = 48; // px per unit width
  const unitH = 64; // px per unit height

  return (
    <div className="pt-[72px]" style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <div className="max-w-[900px] mx-auto px-6 pt-16 pb-8">
        <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#C5A572" }}>Size Guide</p>
        <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
          Find Your Perfect Size
        </h1>
        <p className="text-base max-w-[580px]" style={{ color: "var(--muted)" }}>
          Choosing the right print size transforms a wall. Use this guide to match dimensions to your space — and remember, when in doubt, go one size up.
        </p>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pb-24 space-y-16">
        {/* Visual scale diagram */}
        <section>
          <h2 className="text-xl mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Sizes Compared at Scale
          </h2>
          {/* Sofa silhouette + prints */}
          <div className="relative rounded-sm p-8 overflow-x-auto" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)" }}>
            <div className="flex items-end gap-5 min-w-max">
              {/* Person silhouette */}
              <div className="flex flex-col items-center gap-1 mr-4">
                <svg width="24" height="80" viewBox="0 0 24 80" fill="none">
                  <circle cx="12" cy="8" r="7" fill="var(--muted)" fillOpacity="0.4" />
                  <rect x="7" y="16" width="10" height="32" rx="4" fill="var(--muted)" fillOpacity="0.4" />
                  <rect x="5" y="48" width="6" height="24" rx="3" fill="var(--muted)" fillOpacity="0.4" />
                  <rect x="13" y="48" width="6" height="24" rx="3" fill="var(--muted)" fillOpacity="0.4" />
                </svg>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>5&apos;8&quot;</span>
              </div>

              {SIZES.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-2">
                  <div
                    className="rounded-sm flex items-center justify-center text-[10px] font-medium"
                    style={{
                      width:  s.cols * unitW,
                      height: s.rows * unitH,
                      backgroundColor: "#C5A572",
                      opacity: 0.15 + s.cols * 0.15,
                      border: "1px solid #C5A572",
                      color: "#C5A572",
                    }}
                  />
                  <span className="text-[11px] font-medium" style={{ color: "var(--text)" }}>{s.dims}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sizes table */}
        <section>
          <h2 className="text-xl mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Full Size Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
                  {["Size", "Dimensions (in)", "Dimensions (cm)", "Best For", "Price Range"].map((h) => (
                    <th key={h} className="pb-3 pr-6 font-medium text-xs uppercase tracking-wider" style={{ color: "var(--text)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s) => (
                  <tr key={s.name} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td className="py-4 pr-6 font-semibold" style={{ color: "var(--text)" }}>{s.name}</td>
                    <td className="py-4 pr-6"  style={{ color: "var(--muted)" }}>{s.dims}</td>
                    <td className="py-4 pr-6"  style={{ color: "var(--muted)" }}>{s.cm}</td>
                    <td className="py-4 pr-6"  style={{ color: "var(--muted)", maxWidth: 220 }}>{s.rooms}</td>
                    <td className="py-4 font-medium" style={{ color: "#C5A572" }}>{s.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
            * Prices shown are for unframed giclée prints. Framing adds $25–$95 depending on size and frame material.
          </p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            How to Choose the Right Size
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TIPS.map((tip) => (
              <div key={tip.title} className="p-6 rounded-sm" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)" }}>
                <h3 className="text-base font-medium mb-2" style={{ color: "var(--text)" }}>{tip.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link
            href="/shop"
            className="inline-block px-8 py-3 text-sm font-medium uppercase tracking-widest transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
          >
            Browse All Art
          </Link>
          <Link
            href="/framing"
            className="inline-block px-8 py-3 text-sm font-medium uppercase tracking-widest border transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
            style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
          >
            Frame Studio
          </Link>
        </div>
      </div>
    </div>
  );
}

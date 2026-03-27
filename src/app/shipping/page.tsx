import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns | ARTHAUS",
  description: "Learn about ARTHAUS shipping rates, delivery timeframes, packaging, and our 30-day return policy.",
};

const SHIPPING_RATES = [
  { method: "Standard Shipping", domestic: "Free over $150 / $8.95", international: "$24.95", time: "5–8 business days" },
  { method: "Express Shipping",  domestic: "$18.95",                  international: "$44.95", time: "2–3 business days" },
  { method: "White Glove",       domestic: "$49.95",                  international: "N/A",    time: "Scheduled appointment" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10" style={{ borderBottom: "1px solid var(--border-color)" }}>
      <h2 className="text-2xl mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
        {title}
      </h2>
      <div className="text-[15px] leading-relaxed space-y-4" style={{ color: "var(--muted)" }}>
        {children}
      </div>
    </section>
  );
}

export default function ShippingPage() {
  return (
    <div className="pt-[72px]" style={{ backgroundColor: "var(--bg)" }}>
      {/* Hero */}
      <div className="max-w-[760px] mx-auto px-6 pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#C5A572" }}>
          Shipping &amp; Returns
        </p>
        <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
          We Handle Art Like Art
        </h1>
        <p className="text-base" style={{ color: "var(--muted)" }}>
          Every print leaves our facility wrapped in acid-free tissue, reinforced with rigid board, and shipped in a custom-engineered box built for the journey.
        </p>
      </div>

      <div className="max-w-[760px] mx-auto px-6 pb-24">
        {/* Rates table */}
        <Section title="Shipping Rates">
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  {["Method", "Domestic (US)", "International", "Estimated Time"].map((h) => (
                    <th key={h} className="pb-3 pr-6 font-medium text-xs uppercase tracking-wider" style={{ color: "var(--text)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SHIPPING_RATES.map((row) => (
                  <tr key={row.method} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td className="py-4 pr-6 font-medium" style={{ color: "var(--text)" }}>{row.method}</td>
                    <td className="py-4 pr-6">{row.domestic}</td>
                    <td className="py-4 pr-6">{row.international}</td>
                    <td className="py-4">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Free standard shipping on all domestic orders over <strong style={{ color: "var(--text)" }}>$150</strong>. International orders are subject to local customs duties, which are the responsibility of the recipient.
          </p>
        </Section>

        <Section title="Packaging & Protection">
          <p>
            Unframed prints are sandwiched between two sheets of acid-free glassine paper, placed between rigid foam-core boards, and shipped flat in a custom corrugated box. For prints larger than 24×36, we use a reinforced double-wall box.
          </p>
          <p>
            Framed pieces are wrapped in bubble film, corner-protected, and shipped in a custom foam-insert box sized to the frame. Every framed order ships with white-glove handling instructions.
          </p>
          <p>
            We recommend adding <strong style={{ color: "var(--text)" }}>Shipping Insurance</strong> at checkout for orders over $200. This covers loss, theft, and damage during transit at a flat rate of $4.95.
          </p>
        </Section>

        <Section title="Delivery Timeframes">
          <p>All orders are processed within <strong style={{ color: "var(--text)" }}>1–2 business days</strong> of placement (Monday–Friday, excluding public holidays). Framed orders may take an additional 2–3 business days for production.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Standard: 5–8 business days after dispatch</li>
            <li>Express: 2–3 business days after dispatch</li>
            <li>White Glove: Scheduled delivery at your convenience — our team will contact you to arrange</li>
            <li>International: 10–18 business days depending on destination and customs clearance</li>
          </ul>
          <p>A tracking link is emailed as soon as your order ships. You can also view live tracking in your <Link href="/account/orders" className="underline" style={{ color: "#C5A572" }}>account dashboard</Link>.</p>
        </Section>

        <Section title="Returns & Exchanges">
          <p>
            We accept returns on all <strong style={{ color: "var(--text)" }}>unframed prints</strong> within <strong style={{ color: "var(--text)" }}>30 days</strong> of delivery, provided they are in original, undamaged condition.
          </p>
          <p>
            <strong style={{ color: "var(--text)" }}>Limited edition prints</strong> and <strong style={{ color: "var(--text)" }}>custom-framed pieces</strong> are final sale and cannot be returned or exchanged unless damaged in transit.
          </p>
          <p>
            Damaged orders must be reported within <strong style={{ color: "var(--text)" }}>48 hours</strong> of delivery with photographic evidence of the packaging and the damage.
          </p>
        </Section>

        <Section title="How to Return">
          <ol className="list-decimal pl-5 space-y-3">
            <li>Email <a href="mailto:returns@arthaus.com" className="underline" style={{ color: "#C5A572" }}>returns@arthaus.com</a> with your order number and reason for return.</li>
            <li>We'll send a prepaid return label within 1 business day (domestic only; international customers are responsible for return shipping costs).</li>
            <li>Pack the print securely using the original packaging if available.</li>
            <li>Drop off at any authorized carrier location.</li>
            <li>Once received and inspected, your refund will be processed within <strong style={{ color: "var(--text)" }}>5–7 business days</strong> to the original payment method.</li>
          </ol>
        </Section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>Still have questions?</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 text-sm font-medium uppercase tracking-widest transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

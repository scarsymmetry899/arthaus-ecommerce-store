"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const FAQ_SECTIONS = [
  {
    title: "Ordering",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse the gallery, select your artwork, choose your size and optional frame, then add to cart and proceed to checkout. We accept all major payment methods.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Orders can be changed or cancelled within 2 hours of placement. After that, your order enters production and cannot be modified.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Yes — all orders can be gift-wrapped for a small fee. You can add gift wrapping at checkout along with a personalised message.",
      },
      {
        q: "Is it safe to pay on your website?",
        a: "Absolutely. Our checkout is secured with 256-bit SSL encryption and we never store card details. We use Stripe for secure payment processing.",
      },
    ],
  },
  {
    title: "Shipping",
    items: [
      {
        q: "How long will my order take to arrive?",
        a: "Standard delivery takes 5–10 business days. Express delivery takes 2–3 business days. White Glove service is scheduled to your availability.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 40 countries. International shipping costs are calculated at checkout. Duties and taxes may apply depending on your country.",
      },
      {
        q: "How are prints packaged?",
        a: "Unframed prints are carefully rolled in archival tissue and shipped in rigid cardboard tubes. Framed prints are individually wrapped and boxed in custom-fit packaging.",
      },
      {
        q: "What if my order arrives damaged?",
        a: "Please photograph the damage and contact us within 48 hours. We will replace damaged items at no charge and arrange for the damaged piece to be collected.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes — standard shipping is free on all orders over $150. Express and White Glove options are always charged at their respective rates.",
      },
    ],
  },
  {
    title: "Framing",
    items: [
      {
        q: "What framing options are available?",
        a: "We offer six frame options — Classic Black, Gallery White, Natural Oak, Dark Walnut, Brushed Gold, and Raw Aluminum — each available in standard sizes. You can also add a mat in white, off-white, or black.",
      },
      {
        q: "What glass do you use?",
        a: "We offer three glass options: Standard, Non-Glare, and Museum Glass (99% UV protection). Museum Glass is recommended for limited edition works and darker rooms.",
      },
      {
        q: "Can I frame a print I purchased elsewhere?",
        a: "Our framing service is currently only available with artwork purchased from ARTHAUS. We plan to offer standalone framing in the future.",
      },
      {
        q: "How do I clean my frame?",
        a: "Use a soft, dry microfibre cloth. Avoid chemical cleaners on wooden frames. Glass can be gently cleaned with a slightly damp cloth.",
      },
    ],
  },
  {
    title: "Prints & Quality",
    items: [
      {
        q: "What is a giclée print?",
        a: "Giclée (zhee-CLAY) is a professional printing method using museum-grade pigment inks and fine-art cotton rag paper. Giclée prints are archival quality, colour-accurate, and can last over 100 years without fading.",
      },
      {
        q: "Will my print fade?",
        a: "When displayed away from direct sunlight, our giclée prints are rated for 80–100+ years without significant colour shift. We recommend museum glass for artworks in bright rooms.",
      },
      {
        q: "Are the colours accurate to what I see on screen?",
        a: "Our printing process is calibrated for colour accuracy, but all screens are different. We offer a colour accuracy guarantee — if your print doesn't match what you saw, we'll reprint it.",
      },
    ],
  },
  {
    title: "Returns",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days for artworks that arrive damaged or significantly different from what was shown. We don't accept returns for change of mind on unframed prints.",
      },
      {
        q: "How do I start a return?",
        a: "Contact us at hello@arthaus.com with your order number and photos of the issue. We'll arrange collection and issue a refund or replacement within 5 business days.",
      },
      {
        q: "Can I exchange an artwork?",
        a: "Yes, exchanges are possible for damaged items or print quality issues. Simply contact us and we'll arrange it.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b" style={{ borderColor: "var(--border-color)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[15px] pr-4" style={{ color: "var(--text)" }}>{q}</span>
        <ChevronDown
          size={15}
          style={{
            color: "var(--muted)",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-[14px] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const filteredSections = FAQ_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        !search ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => s.items.length > 0);

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="text-center py-16 px-6 border-b" style={{ borderColor: "var(--border-color)" }}>
        <h1
          className="text-[40px] md:text-[56px] font-normal mb-6"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          Frequently Asked Questions
        </h1>
        {/* Search */}
        <div
          className="flex items-center gap-3 max-w-[480px] mx-auto border rounded-[4px] px-4 py-3"
          style={{ borderColor: "var(--border-color)" }}
        >
          <Search size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search questions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-[14px] outline-none"
            style={{ backgroundColor: "transparent", color: "var(--text)" }}
          />
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-12">
        {filteredSections.map((section) => (
          <div key={section.title} className="mb-10">
            <button
              onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
              className="w-full flex items-center justify-between mb-4"
            >
              <h2
                className="text-[22px] font-normal"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                {section.title}
              </h2>
              <span className="text-[12px] uppercase tracking-[0.1em]" style={{ color: "#C5A572" }}>
                {section.items.length} questions
              </span>
            </button>
            <div>
              {section.items.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

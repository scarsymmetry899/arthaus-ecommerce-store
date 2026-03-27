"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { ColorFilter } from "./ColorFilter";
import type { FilterState, ProductCategory, ProductOrientation } from "@/types";

const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: "Abstract", value: "abstract" },
  { label: "Photography", value: "photography" },
  { label: "Minimalist", value: "minimalist" },
  { label: "Contemporary", value: "contemporary" },
  { label: "Nature & Botanical", value: "nature-botanical" },
  { label: "Black & White", value: "black-white" },
  { label: "Digital Art", value: "digital" },
  { label: "Limited Editions", value: "limited-editions" },
];

const SIZES = ["8×10", "12×16", "18×24", "24×36", "30×40"];

const MEDIUMS = ["Giclée Print", "Photographic Print", "Digital Print", "Canvas Print"];

const ORIENTATIONS: { label: string; value: ProductOrientation; icon: string }[] = [
  { label: "Portrait", value: "portrait", icon: "⬜" },
  { label: "Landscape", value: "landscape", icon: "▬" },
  { label: "Square", value: "square", icon: "◼" },
];

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="border-b py-4"
      style={{ borderColor: "var(--border-color)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
      >
        <span
          className="text-[12px] uppercase tracking-[0.15em] font-medium"
          style={{ color: "var(--text)" }}
        >
          {title}
        </span>
        <ChevronDown
          size={14}
          style={{
            color: "var(--muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

export function FilterSidebar({ filters, onChange, onClear }: FilterSidebarProps) {
  const toggleCategory = (cat: ProductCategory) => {
    const cats = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: cats });
  };

  const toggleSize = (size: string) => {
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes });
  };

  const toggleOrientation = (o: ProductOrientation) => {
    const orientations = filters.orientations.includes(o)
      ? filters.orientations.filter((x) => x !== o)
      : [...filters.orientations, o];
    onChange({ ...filters, orientations });
  };

  const toggleMedium = (m: string) => {
    const mediums = filters.mediums.includes(m)
      ? filters.mediums.filter((x) => x !== m)
      : [...filters.mediums, m];
    onChange({ ...filters, mediums });
  };

  const hasFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.orientations.length > 0 ||
    filters.colors.length > 0 ||
    filters.mediums.length > 0 ||
    filters.price_min > 0 ||
    filters.price_max < 500;

  return (
    <aside
      className="w-full"
      style={{ color: "var(--text)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-[13px] uppercase tracking-[0.2em] font-medium"
          style={{ color: "var(--text)" }}
        >
          Filter
        </h3>
        {hasFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-[11px] uppercase tracking-[0.1em] transition-colors hover:text-[#C5A572]"
            style={{ color: "var(--muted)" }}
          >
            <X size={10} />
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <AccordionSection title="Category" defaultOpen>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.value)}
                onChange={() => toggleCategory(cat.value)}
                className="hidden"
              />
              <div
                className="w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors"
                style={{
                  borderColor: filters.categories.includes(cat.value)
                    ? "#C5A572"
                    : "var(--border-color)",
                  backgroundColor: filters.categories.includes(cat.value)
                    ? "#C5A572"
                    : "transparent",
                }}
              >
                {filters.categories.includes(cat.value) && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-[13px] transition-colors group-hover:text-[#C5A572]"
                style={{ color: "var(--text)" }}
              >
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </AccordionSection>

      {/* Price Range */}
      <AccordionSection title="Price" defaultOpen>
        <div className="space-y-3">
          <div className="flex justify-between text-[12px]" style={{ color: "var(--muted)" }}>
            <span>${filters.price_min}</span>
            <span>${filters.price_max}</span>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={filters.price_max}
            onChange={(e) => onChange({ ...filters, price_max: Number(e.target.value) })}
            className="w-full h-px appearance-none cursor-pointer"
            style={{ accentColor: "#C5A572" }}
          />
        </div>
      </AccordionSection>

      {/* Size */}
      <AccordionSection title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className="px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] rounded-full border transition-all"
              style={{
                borderColor: filters.sizes.includes(size) ? "#C5A572" : "var(--border-color)",
                color: filters.sizes.includes(size) ? "#C5A572" : "var(--muted)",
                backgroundColor: filters.sizes.includes(size) ? "rgba(197,165,114,0.1)" : "transparent",
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </AccordionSection>

      {/* Orientation */}
      <AccordionSection title="Orientation">
        <div className="flex gap-2">
          {ORIENTATIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => toggleOrientation(o.value)}
              aria-label={o.label}
              title={o.label}
              className="flex flex-col items-center gap-1 p-2 rounded border transition-all"
              style={{
                borderColor: filters.orientations.includes(o.value)
                  ? "#C5A572"
                  : "var(--border-color)",
                color: filters.orientations.includes(o.value) ? "#C5A572" : "var(--muted)",
              }}
            >
              <span className="text-[16px]">{o.icon}</span>
              <span className="text-[10px]">{o.label}</span>
            </button>
          ))}
        </div>
      </AccordionSection>

      {/* Color */}
      <AccordionSection title="Color">
        <ColorFilter
          selected={filters.colors}
          onChange={(colors) => onChange({ ...filters, colors })}
        />
      </AccordionSection>

      {/* Medium */}
      <AccordionSection title="Medium">
        <div className="space-y-2">
          {MEDIUMS.map((medium) => (
            <label key={medium} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.mediums.includes(medium)}
                onChange={() => toggleMedium(medium)}
                className="hidden"
              />
              <div
                className="w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors"
                style={{
                  borderColor: filters.mediums.includes(medium)
                    ? "#C5A572"
                    : "var(--border-color)",
                  backgroundColor: filters.mediums.includes(medium)
                    ? "#C5A572"
                    : "transparent",
                }}
              >
                {filters.mediums.includes(medium) && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-[13px] transition-colors group-hover:text-[#C5A572]"
                style={{ color: "var(--text)" }}
              >
                {medium}
              </span>
            </label>
          ))}
        </div>
      </AccordionSection>
    </aside>
  );
}

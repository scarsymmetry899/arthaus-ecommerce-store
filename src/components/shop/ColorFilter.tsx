"use client";

const SWATCHES = [
  { hex: "#1A1A2E", label: "Midnight" },
  { hex: "#2C4A6E", label: "Deep Blue" },
  { hex: "#4A7C8E", label: "Teal" },
  { hex: "#6B9E6B", label: "Forest" },
  { hex: "#C5A572", label: "Gold" },
  { hex: "#D4956A", label: "Terracotta" },
  { hex: "#C17A3A", label: "Amber" },
  { hex: "#8B4513", label: "Brown" },
  { hex: "#8B2252", label: "Burgundy" },
  { hex: "#E8D5C4", label: "Cream" },
  { hex: "#A0A0A0", label: "Grey" },
  { hex: "#0A0A0A", label: "Black" },
];

interface ColorFilterProps {
  selected: string[];
  onChange: (colors: string[]) => void;
}

export function ColorFilter({ selected, onChange }: ColorFilterProps) {
  const toggle = (hex: string) => {
    if (selected.includes(hex)) {
      onChange(selected.filter((c) => c !== hex));
    } else {
      onChange([...selected, hex]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {SWATCHES.map((swatch) => {
        const isActive = selected.includes(swatch.hex);
        return (
          <button
            key={swatch.hex}
            onClick={() => toggle(swatch.hex)}
            aria-label={swatch.label}
            title={swatch.label}
            className="relative rounded-full transition-transform hover:scale-110"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: swatch.hex,
              border: isActive ? "2px solid #C5A572" : "2px solid transparent",
              outline: isActive ? "1px solid #C5A572" : "1px solid rgba(0,0,0,0.1)",
              outlineOffset: isActive ? "2px" : "0",
            }}
          />
        );
      })}
    </div>
  );
}

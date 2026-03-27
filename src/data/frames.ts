import type { Frame } from "@/types";

export const frames: Frame[] = [
  {
    id: "frame_01",
    name: "Classic Black",
    material: "classic-black",
    color_hex: "#1A1A1A",
    swatch_image: "https://picsum.photos/seed/frame-black/100/100",
    description:
      "A timeless black hardwood frame with a satin finish. The go-to choice for contemporary spaces — versatile enough to suit any artwork and confident enough to stand on its own. The clean profile (15mm wide, 20mm deep) suits both minimalist compositions and bold abstract works.",
    price_adder_by_size: {
      "8×10": 25,
      "12×16": 35,
      "18×24": 55,
      "24×36": 75,
      "30×40": 95,
    },
  },
  {
    id: "frame_02",
    name: "Gallery White",
    material: "gallery-white",
    color_hex: "#F5F0EB",
    swatch_image: "https://picsum.photos/seed/frame-white/100/100",
    description:
      "A warm off-white hardwood frame with a matte finish, inspired by the gallery walls of major contemporary art institutions. Slightly broader than the Classic Black (20mm wide), it creates a subtle visual pause between the artwork and the wall — ideal for maximalist interiors or works with strong dark tones.",
    price_adder_by_size: {
      "8×10": 25,
      "12×16": 35,
      "18×24": 55,
      "24×36": 75,
      "30×40": 95,
    },
  },
  {
    id: "frame_03",
    name: "Natural Oak",
    material: "natural-oak",
    color_hex: "#C8A870",
    swatch_image: "https://picsum.photos/seed/frame-oak/100/100",
    description:
      "Responsibly sourced European oak with a light natural finish that preserves the wood's grain character. Warm and organic, this frame suits botanical works, photography, and anything that benefits from a touch of natural material. The visible grain varies slightly between frames, making each one unique.",
    price_adder_by_size: {
      "8×10": 30,
      "12×16": 42,
      "18×24": 62,
      "24×36": 85,
      "30×40": 108,
    },
  },
  {
    id: "frame_04",
    name: "Dark Walnut",
    material: "dark-walnut",
    color_hex: "#4A2E1A",
    swatch_image: "https://picsum.photos/seed/frame-walnut/100/100",
    description:
      "Rich, chocolate-brown American walnut with a hand-applied oil finish that enhances the wood's natural warmth and depth. A statement frame for statement pieces — particularly well suited to warm-toned abstracts, classical-style works, and anything that benefits from a sense of gravitas. The wider profile (25mm) adds weight and significance.",
    price_adder_by_size: {
      "8×10": 35,
      "12×16": 50,
      "18×24": 72,
      "24×36": 98,
      "30×40": 125,
    },
  },
  {
    id: "frame_05",
    name: "Brushed Gold",
    material: "brushed-gold",
    color_hex: "#C5A572",
    swatch_image: "https://picsum.photos/seed/frame-gold/100/100",
    description:
      "Hand-finished aluminium with a warm brushed-gold effect — not shiny or ostentatious, but quietly luxurious. Particularly well suited to artworks with warm colour palettes, limited-edition pieces that deserve to be honoured, and any work being displayed in a more formal or traditional interior setting. The profile (18mm wide, 12mm deep) is slim and elegant.",
    price_adder_by_size: {
      "8×10": 38,
      "12×16": 55,
      "18×24": 78,
      "24×36": 105,
      "30×40": 135,
    },
  },
  {
    id: "frame_06",
    name: "Raw Aluminum",
    material: "raw-aluminum",
    color_hex: "#9A9A9A",
    swatch_image: "https://picsum.photos/seed/frame-aluminum/100/100",
    description:
      "A precision-machined aluminium frame with a brushed matte finish — the choice of architects, designers, and anyone who takes minimalism seriously. The ultra-thin profile (8mm) disappears at the edges of the artwork, creating a nearly frameless effect while still providing proper protection. Ideal for photography, digital art, and highly graphic works.",
    price_adder_by_size: {
      "8×10": 28,
      "12×16": 40,
      "18×24": 60,
      "24×36": 82,
      "30×40": 105,
    },
  },
];

export function getFrameById(id: string): Frame | undefined {
  return frames.find((f) => f.id === id);
}

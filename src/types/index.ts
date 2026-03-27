// ─── Enums ────────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "abstract"
  | "photography"
  | "minimalist"
  | "contemporary"
  | "nature-botanical"
  | "black-white"
  | "digital"
  | "limited-editions";

export type ProductOrientation = "portrait" | "landscape" | "square";

export type FrameMaterial =
  | "classic-black"
  | "gallery-white"
  | "natural-oak"
  | "dark-walnut"
  | "brushed-gold"
  | "raw-aluminum";

export type MatOption = "none" | "white" | "off-white" | "black";

export type GlassOption = "standard" | "non-glare" | "museum";

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

// ─── Core Models ──────────────────────────────────────────────────────────────

export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  portrait_image: string;
  location: string;
  specialties: string[];
  social_links: {
    instagram?: string;
    website?: string;
    twitter?: string;
  };
}

export interface ProductSize {
  label: string;        // e.g. "8×10"
  dimensions: string;  // e.g. '8" × 10"'
  price: number;
  sku: string;
}

export interface ProductImages {
  primary: string;
  framed: string;
  room: string;
  detail: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  artist: Artist;
  description: string;
  artist_statement: string;
  category: ProductCategory;
  tags: string[];
  style_keywords: string[];
  dominant_color: string;           // hex
  color_palette: string[];          // array of 5 hex values
  images: ProductImages;
  sizes: ProductSize[];
  orientation: ProductOrientation;
  medium: string;                   // e.g. "Giclée Print"
  paper_type?: string;
  is_limited_edition: boolean;
  edition_size?: number;
  edition_remaining?: number;
  is_new: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
  collections: string[];            // collection IDs
  price_from: number;               // lowest size price
  rating: number;                   // 1–5
  review_count: number;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  curator_note: string;
  hero_image: string;
  product_ids: string[];
  is_active: boolean;
}

export interface Frame {
  id: string;
  name: string;
  material: FrameMaterial;
  color_hex: string;
  swatch_image: string;
  description: string;
  price_adder_by_size: Record<string, number>; // e.g. { "8×10": 25, "12×16": 35 }
}

export interface CartItem {
  product: Product;
  selected_size: ProductSize;
  selected_frame?: Frame;
  selected_mat?: MatOption;
  selected_glass?: GlassOption;
  quantity: number;
  total_price: number;
}

// ─── Filter / State ───────────────────────────────────────────────────────────

export interface FilterState {
  categories: ProductCategory[];
  price_min: number;
  price_max: number;
  sizes: string[];                  // size labels e.g. ["8×10", "12×16"]
  orientations: ProductOrientation[];
  colors: string[];                 // hex values from color swatches
  mediums: string[];
}

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  price_min: 0,
  price_max: 500,
  sizes: [],
  orientations: [],
  colors: [],
  mediums: [],
};

// ─── Journal / Blog ───────────────────────────────────────────────────────────

export type JournalCategory =
  | "art-guide"
  | "artist-interview"
  | "trend-report"
  | "feature";

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: JournalCategory;
  author: string;
  date: string;
  reading_time: number; // minutes
  hero_image: string;
  body: string;         // HTML or markdown
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export interface OrderItem {
  product: Product;
  selected_size: ProductSize;
  selected_frame?: Frame;
  quantity: number;
  line_total: number;
}

export interface Order {
  id: string;
  order_number: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: OrderStatus;
  tracking_number?: string;
  shipping_address: ShippingAddress;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  wishlist_ids: string[];
  favorite_styles: ProductCategory[];
  addresses: ShippingAddress[];
}

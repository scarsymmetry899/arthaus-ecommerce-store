# 🎨 ARTHAUS — Premium Art E-Commerce Platform
## Complete Build Prompt for an Awwwards-Worthy Art Marketplace

---

## PROJECT OVERVIEW

Build **ARTHAUS** — a visually breathtaking, gallery-grade e-commerce platform for selling art prints, custom frames, curated art collections, and dropshipped art designs. The site should feel like walking through a world-class contemporary art gallery that also happens to let you buy everything on the walls. Every pixel should be intentional. Anyone who visits should immediately feel this is NOT a generic Shopify store — it's a digital art experience that rivals the best sites on Awwwards.

**Business Model:**
- Sell curated art prints (dropshipped via Printful/Printify/Gelato)
- Premium custom framing options (frame + mat combos)
- Original digital art downloads
- Art gallery curation / collection drops
- Artist collaboration limited editions
- Corporate art consulting (B2B)
- ~200 active product listings at launch

**Tech Stack (Recommended):**
- **Frontend:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS + Framer Motion for animations
- **CMS/Backend:** Sanity.io or Strapi (headless CMS for art/product data)
- **E-Commerce Engine:** Shopify Storefront API (headless) OR Medusa.js (open-source)
- **Payments:** Stripe (cards + Apple Pay + Google Pay) + PayPal
- **Image CDN:** Cloudinary or Imgix (responsive art delivery with zoom)
- **Hosting:** Vercel (edge-optimized)
- **Search:** Algolia or Meilisearch (instant faceted search)
- **Analytics:** Plausible + Hotjar (heatmaps)

---

## DESIGN PHILOSOPHY & AESTHETIC DIRECTION

### Core Aesthetic: "Digital Gallery Meets Editorial Luxury"

Think: the sophistication of a Gagosian Gallery website meets the editorial drama of a high-end fashion magazine meets the buttery smoothness of Apple's product pages — all fused into an e-commerce experience.

### Design Pillars

1. **Art-First Visual Hierarchy** — The artwork is ALWAYS the hero. UI elements recede. Navigation is almost invisible until needed. The art breathes.

2. **Cinematic Transitions** — Every page change, scroll interaction, and hover state should feel choreographed. Think smooth crossfades, parallax layers, and staggered reveals — never jarring, always fluid.

3. **Typographic Authority** — Use a dramatic serif display font (like `Playfair Display`, `Cormorant Garamond`, `Editorial New`, `Freight Display`, or `GT Super`) paired with a refined sans-serif body font (`Satoshi`, `General Sans`, `Neue Haas Grotesk`, `Switzer`, or `Cabinet Grotesk`). Type should feel like it belongs in a museum catalog.

4. **Restrained Color, Dramatic Contrast** — Primary palette is near-black (#0A0A0A), warm off-white (#FAF8F5), and a single accent color (burnt umber #8B4513, gallery gold #C5A572, or deep crimson #8B1A1A). The art provides all the color.

5. **Negative Space as Design Element** — Generous whitespace. Let compositions breathe. Grid-breaking moments for drama. Asymmetric layouts that guide the eye.

6. **Micro-Interactions Everywhere** — Custom cursor that transforms (dot → crosshair → preview bubble), magnetic hover effects on product cards, smooth parallax on scroll, text reveal animations on viewport entry.

### Reference Aesthetic Benchmarks
- **Layout & UX:** Pace Gallery, Artsy.net, Saatchi Art
- **Animation & Polish:** Apple.com product pages, Locomotive.ca
- **Editorial Feel:** Kinfolk Magazine, Cereal Magazine websites
- **E-Commerce Flow:** SSENSE, Mr Porter, Aesop.com

---

## SITE ARCHITECTURE & PAGES

### Page Map (18+ Unique Pages/Views)

```
ARTHAUS/
├── Home (Immersive landing)
├── Shop/
│   ├── All Art (Master catalog — 200 listings)
│   ├── Category Pages/
│   │   ├── Prints & Posters
│   │   ├── Photography
│   │   ├── Abstract Art
│   │   ├── Minimalist
│   │   ├── Contemporary
│   │   ├── Black & White
│   │   ├── Nature & Botanical
│   │   ├── Digital Art
│   │   └── Limited Editions
│   ├── Product Detail Page (PDP)
│   └── Framing Configurator
├── Gallery/
│   ├── Curated Collections
│   ├── New Arrivals
│   ├── Editor's Picks
│   └── Seasonal Exhibitions
├── Artists/
│   ├── Artist Directory
│   └── Artist Profile Page
├── About/
│   ├── Our Story
│   └── Art Consulting (B2B)
├── Journal / Blog
├── Room Visualizer (AR/Mockup tool)
├── Cart (Slide-over drawer)
├── Checkout (Multi-step)
├── Account/
│   ├── Dashboard
│   ├── Orders
│   ├── Wishlist / Saved Art
│   └── Art Collection Tracker
├── Search (Full-screen overlay)
├── Contact
├── FAQ / Shipping Info
└── 404 Page (Make it art!)
```

---

## DETAILED PAGE SPECIFICATIONS

---

### 1. HOME PAGE — "The Exhibition Entrance"

**Hero Section:**
- Full-viewport cinematic hero with a SLOW Ken Burns zoom on a featured artwork
- Artwork fills 85% of the viewport; minimal overlay text
- Large serif headline animating in letter-by-letter: e.g., "Where Art Lives"
- Subtle grain/noise texture overlay on the image for analog warmth
- A single floating CTA button with magnetic hover effect: "Enter the Gallery"
- Optional: ambient generative art background (WebGL shader — flowing paint/ink effect) behind the hero if no featured artwork is set

**Scrolling Sections (in order):**

**Section 2 — Featured Collection Strip:**
- Horizontal scrolling carousel of 6–8 artworks from the current featured collection
- Each artwork card: image with soft shadow, artist name, title, price — all fading in on scroll
- The collection title is pinned on the left side in large vertical text as user scrolls horizontally
- Smooth drag-to-scroll + scroll-snap behavior
- Hover: artwork scales up 1.03x, a "Quick View" eye icon fades in

**Section 3 — "The Curation" (Editorial Grid):**
- Asymmetric masonry/bento grid layout showcasing 4–6 hero artworks
- Mixed sizes: one large piece spanning 2 columns, two medium, two small
- Each piece has a subtle parallax offset on scroll (different speeds create depth)
- On hover: dark overlay slides up from bottom revealing title, artist, price, and "View" CTA
- Grid should feel like a gallery wall — not a product grid

**Section 4 — Category Navigation:**
- Full-width section with category tiles arranged in a broken grid
- Each tile: category name in large serif type + a peek of artwork behind it
- On hover: artwork fully reveals with a smooth crossfade, category name shifts position
- Categories: Prints, Photography, Abstract, Minimalist, Contemporary, Limited Editions, etc.

**Section 5 — "Art in Your Space" Room Visualizer Teaser:**
- Split section: left side shows a stylish room mockup with art on the wall, right side has copy
- The art in the mockup changes every 4 seconds with a smooth fade transition
- CTA: "See It In Your Room →" leading to the Room Visualizer tool
- Optional: show 3 room styles (Modern, Classic, Scandinavian) as tabs

**Section 6 — Artist Spotlight:**
- Full-width feature on one artist
- Left: large portrait photo of the artist with film-grain effect
- Right: brief bio paragraph, 3 of their artworks in a mini horizontal strip, "Explore Artist →" link
- The entire section has a subtle background color shift (e.g., warm cream)

**Section 7 — "New to the Gallery" / Latest Arrivals:**
- Clean grid of 8 latest arrivals, 4 columns
- Staggered entrance animation (each card delays 100ms from the previous)
- Infinite-scroll-hint: "View All New Art" button at bottom

**Section 8 — Social Proof / Press Bar:**
- Horizontal ticker/marquee of press logos (Architectural Digest, Elle Decor, Dwell, etc.)
- Below: a featured testimonial in large italic serif type with 5-star rating
- Optionally: Instagram-style grid of user-submitted "art in my home" photos

**Section 9 — Newsletter / Community CTA:**
- Moody full-width background (blurred artwork or dark gradient)
- Headline: "Join the Gallery" in large display type
- Email input field with minimalist design (just a bottom border, no box)
- Perk callouts: "Early access to drops · Exclusive prints · Art world insights"

**Footer:**
- 4-column layout: Navigation links, Help, About, Newsletter recap
- Social icons with smooth hover color transitions
- Small detail: the current year's "Most Popular Artwork" thumbnail in the footer
- Subtle animated grain texture on footer background
- Copyright, Terms, Privacy in small mono type

---

### 2. SHOP / CATALOG PAGE — "The Main Gallery"

**Layout & Filtering:**
- Default view: 3-column masonry grid on desktop, 2 on tablet, 1 on mobile
- View toggle: Grid (3-col) / Editorial (2-col large) / List (single column with details)
- Sticky filter sidebar on desktop (collapsible drawer on mobile):
  - Categories (with artwork count badges)
  - Price range (custom-styled slider, not default HTML)
  - Size (Small / Medium / Large / Oversized)
  - Orientation (Portrait / Landscape / Square)
  - Color palette filter (clickable color swatches that filter art by dominant color — this is a WOW feature)
  - Medium (Print, Canvas, Digital, Framed)
  - Artist
  - Sort by: Newest, Price Low→High, Price High→Low, Most Popular, Editor's Pick
- Active filters shown as removable pill chips above the grid
- Total results count + "Showing X of 200" text

**Product Cards:**
- Art image with proper aspect ratio maintained (no cropping!)
- Soft shadow that lifts on hover
- On hover: 
  - Image scales subtly (1.02x)
  - A secondary image/angle fades in (if available — e.g., framed version)
  - Quick action bar slides up from bottom: "Quick View" (eye icon), "Add to Wishlist" (heart), "Add to Cart" (bag icon)
- Below image: Artist name (small caps sans-serif), Artwork title (serif italic), Price (bold), and "From $XX" if multiple sizes available
- "New" badge for items < 14 days old
- "Limited" badge for editions
- Sold-out items show desaturated with "Sold Out" overlay

**Pagination / Infinite Scroll:**
- Default: "Load More" button (not infinite scroll — better for SEO and art browsing pace)
- Show page indicators: "Page 1 of 17"
- Smooth GSAP/Framer Motion staggered entrance for newly loaded items

**Color Palette Filter (Signature Feature):**
- A row of 12–16 color swatches (warm reds, cool blues, earthy tones, monochromes, pastels, etc.)
- Clicking a swatch filters the catalog to artworks whose dominant color matches
- The swatch itself has a subtle pulse animation when active
- This is powered by pre-computed dominant color extraction (run at image upload time, stored as metadata)

---

### 3. PRODUCT DETAIL PAGE (PDP) — "The Viewing Room"

**Layout:**
- Two-column layout on desktop: Left 60% = artwork imagery, Right 40% = product info
- Mobile: stacked, image on top

**Left Column — Artwork Display:**
- Hero image: high-res artwork displayed at maximum fidelity
- Zoom-on-hover (loupe effect) or click-to-open full-screen lightbox with pinch-to-zoom
- If framing options selected, dynamically swap the hero to show the framed mockup
- Below hero: thumbnail strip for alternate views (artwork alone, framed, in a room mockup, detail crop)
- Optional: 360° view for framed pieces (drag to rotate)

**Right Column — Product Info:**
- Artist name (clickable → artist profile page) — small caps
- Artwork title — large serif, italic
- Price — bold, with "or 4 interest-free payments of $XX with Klarna/Afterpay" below
- Star rating (if reviews enabled) + review count link
- Short description / artist statement (2–3 lines, expandable)
- **Size selector:** Visual size comparison (silhouette of person next to each size for scale)
  - Each size shows dimensions + price
  - Sizes: e.g., 8×10, 12×16, 18×24, 24×36, 30×40
- **Frame selector / Framing Configurator:**
  - "No Frame (Print Only)" default option
  - Frame material options shown as clickable swatches: Black Wood, White Wood, Natural Oak, Walnut, Gold, Raw Aluminum
  - Mat options: No Mat, White, Off-White, Black
  - Live preview updates on the left as selections change (composited dynamically)
  - Price adjusts in real-time based on size + frame + mat combo
- **Quantity selector** (minimal stepper: − 1 +)
- **"Add to Cart" button:** Full-width, dark background, serif text. On click: satisfying micro-animation (button compresses, checkmark appears, then reverts). Opens cart drawer.
- **Secondary CTAs:**
  - "Save to Wishlist" (heart icon)
  - "See in Your Room" (opens Room Visualizer with this artwork)
  - "Share" (copy link, Pinterest, Instagram, X)

**Below the Fold:**
- **Artwork Details Accordion:**
  - About This Piece (artist's statement, inspiration)
  - Specifications (medium, dimensions, weight, paper type / canvas type)
  - Shipping & Returns (estimated delivery, free shipping threshold, return policy)
  - Framing Details (if applicable — materials, glass type, hanging hardware)
  - Certificate of Authenticity (for limited editions)
- **"Complete the Wall" — Related Art Section:**
  - Horizontal scrolling row of 6–8 complementary artworks
  - Algorithm: match by color palette, artist, style, or manual curation
  - These should feel like a gallery curator saying "you might also love…"
- **Customer Reviews Section:**
  - Photo reviews prioritized (customers showing art in their spaces)
  - Star breakdown chart
  - "Verified Buyer" badges
- **Recently Viewed Strip:**
  - Persistent mini-strip at bottom showing last 4 viewed artworks

---

### 4. FRAMING CONFIGURATOR — "The Frame Studio"

**Full Interactive Tool Page:**
- Large central preview (mockup of selected artwork in selected frame + mat combo)
- Step-by-step configurator flow:
  1. **Select Your Art** (if entered directly — shows recently viewed or search)
  2. **Choose Size** (visual size comparison with room context)
  3. **Choose Frame** (scrollable strip of frame material swatches with names + price adders)
  4. **Choose Mat** (color picker with visual preview)
  5. **Choose Glass** (Standard / Non-Glare / Museum Glass — with tooltip explanations)
  6. **Review & Add to Cart** (final summary with itemized pricing)
- Preview updates in real-time at every step
- "Start Over" button and step indicator breadcrumbs
- Total price updates live at every configuration change
- This should feel like a premium custom framing consultation, not a boring form

---

### 5. GALLERY / CURATED COLLECTIONS — "The Exhibition Halls"

**Collections Landing:**
- Full-width editorial layout, each collection is a "chapter"
- Each collection: hero image (curated composite of artworks in the collection), title in large serif type, curator's note (2–3 lines), artwork count, "Enter Exhibition →" CTA
- Collections scroll vertically with parallax depth between them
- Featured collection gets a larger, full-viewport hero treatment at top

**Individual Collection Page:**
- Collection hero: cinematic banner with collection title overlay + curator's introduction paragraph
- Artworks displayed in a gallery-wall-style masonry grid (irregular sizes intentional — mimics a physical gallery hang)
- Optional: include "curator's notes" between artwork rows — these are editorial text blocks explaining the thematic thread
- Each artwork card links to its PDP
- "Shop Entire Collection" floating CTA button

**Collection Ideas:**
- "Monochrome Meditation" (B&W art)
- "Mediterranean Summer" (warm, sun-drenched pieces)
- "Tokyo Neon" (vibrant, urban, digital)
- "Desert Minimalism" (earth tones, clean lines)
- "Botanical Dreams" (nature, florals)
- "The Abstract Edit" (non-representational art)
- "Under $50" (accessibility collection)
- "Statement Pieces" ($500+ large-scale works)
- Seasonal: "Spring Awakening," "Winter Solstice," etc.

---

### 6. ARTISTS DIRECTORY & ARTIST PROFILE

**Artists Directory:**
- Alphabetical grid of artist cards
- Each card: artist portrait (or monogram if no photo), name, specialty/medium, number of works
- Filter by medium, style, location
- Search bar with instant results
- Hover: card flips or reveals a mini-carousel of their top 3 works

**Artist Profile Page:**
- Hero: full-width image — either artist at work or their most iconic piece
- Bio section: photo + paragraphs + social links
- "The Collection" — grid of all their available works on ARTHAUS
- Pull quotes from the artist in large serif italic
- Artist stats: total works, most popular piece, years active
- "Follow This Artist" button (email notifications for new drops)

---

### 7. ROOM VISUALIZER — "See It In Your Space"

**Two Modes:**

**Mode A — Preset Rooms:**
- User selects a room style: Modern Living Room, Scandinavian Bedroom, Industrial Loft, Classic Study, Minimal Hallway
- Art appears on the wall in the selected room, correctly scaled
- User can drag to reposition, pinch/scroll to resize
- Shows dimensions overlay when resizing
- "Buy This Look" for the currently displayed piece

**Mode B — Upload Your Room (Premium Feature):**
- User uploads a photo of their wall
- Uses perspective detection (or manual corner marking) to place art on the wall
- Shows realistic shadow/depth for the frame
- "Share This Visualization" → generates a shareable image

**Both Modes:**
- Dropdown to switch artworks without leaving the visualizer
- Size selector synced with PDP sizes
- Frame toggle to show framed vs unframed
- Save visualization to account

---

### 8. CART — "Your Selection"

**Implementation: Slide-Over Drawer (Right Side)**
- Smooth slide-in animation from right (300ms ease-out)
- Backdrop blur on the rest of the page
- Each item:
  - Artwork thumbnail (clickable → PDP)
  - Title, artist, selected size, frame option
  - Price
  - Quantity adjuster (− / +)
  - Remove button (subtle, icon only — trash or X)
- **Upsell: "Add a Frame" prompt** if item is unframed (one-click frame add)
- **Upsell: "Complete the Set"** — show 1–2 complementary pieces
- Order summary:
  - Subtotal
  - Estimated shipping (or "Free Shipping!" if over threshold)
  - Promo code input (expandable, hidden by default)
  - Total
- Two CTAs:
  - "Continue Shopping" (closes drawer)
  - "Proceed to Checkout" (primary button)
- Empty cart state: elegant message + "Discover Art →" CTA
- Cart item count badge on the header cart icon (animated number change)

---

### 9. CHECKOUT — "Complete Your Acquisition"

**Multi-Step Flow (Not a Single Long Page):**

**Step 1 — Information:**
- Email (with "Create account for order tracking" checkbox)
- Shipping address (with Google Places autocomplete)
- Phone number (for delivery updates)

**Step 2 — Shipping:**
- Shipping method options with estimated delivery dates
- Standard, Express, White Glove Delivery (for large/expensive pieces — includes installation)
- Shipping insurance opt-in for high-value orders

**Step 3 — Payment:**
- Express checkout buttons at top: Apple Pay, Google Pay, PayPal (one-click)
- Credit/debit card form (Stripe Elements — custom-styled to match the site)
- Klarna/Afterpay installment option
- Gift card / promo code field
- Order summary sidebar (sticky on desktop)

**Step 4 — Confirmation:**
- "Your Art is on Its Way" headline with subtle confetti or particle animation
- Order summary
- Estimated delivery
- "Track Your Order" button
- "Continue Exploring" CTA back to shop
- Cross-sell: "Others Who Loved This Also Bought…"

---

### 10. SEARCH — "Discover"

**Full-Screen Overlay Search:**
- Triggered by search icon in header → full-screen overlay with backdrop blur
- Large centered search input with blinking cursor, auto-focus
- Instant results as you type (Algolia-powered):
  - Results grouped: Artworks, Artists, Collections, Journal Posts
  - Each result shows thumbnail, title, category
  - Highlight matching text
- **Visual search suggestion:** "Trending Searches" shown before typing: popular terms + color swatches for color-based discovery
- Recent searches (stored locally)
- "No results" state: "We couldn't find that, but here are today's staff picks…" + show 4 recommended works

---

### 11. JOURNAL / BLOG — "The Art Journal"

**Layout:** Editorial magazine style
- Hero article with full-width image + overlay headline
- Below: 2-column grid of articles with large thumbnails
- Categories: Artist Interviews, Art Guides (e.g., "How to Choose Art for Your Living Room"), Behind the Scenes, Trend Reports, Frame & Hang Tips
- Each article page: clean reading layout (max 700px content width), large images, pull quotes, related products inline ("Shop this look" cards within articles)
- Share buttons + reading time estimate

---

### 12. ACCOUNT DASHBOARD — "My Gallery"

**Sections:**
- **Order History:** Clean table/list of past orders with status, tracking, reorder button
- **My Wishlist:** Grid of saved artworks with "Add to Cart" on each
- **My Collection Tracker:** For customers to catalog art they own (even non-ARTHAUS pieces) — a personal art inventory
- **Saved Visualizations:** Room mockups they've created
- **Addresses & Payment Methods:** Standard management
- **Preferences:** Favorite styles/artists (used for personalized recommendations)
- **Loyalty / Points:** If implemented — earn points per purchase, redeem for discounts

---

### 13. 404 PAGE — "Lost in the Gallery"

- Display a famous "lost" artwork or a custom generative art piece
- Headline: "This room appears to be empty."
- Subtext: "The art you're looking for has moved. Let us guide you back."
- CTA: "Return to the Gallery" button
- Below: "Or explore these instead…" + 3 random popular artworks

---

## GLOBAL UI COMPONENTS & INTERACTIONS

### Navigation Header
- **Desktop:** Minimal top bar. Logo (left), main nav links (center), utility icons (right: Search, Account, Wishlist heart, Cart bag with count badge)
- Navigation links: Shop, Gallery, Artists, Journal, About
- "Shop" has a mega-menu dropdown: left side = categories list, right side = featured collection image + CTA
- Header background: transparent on hero → white/dark on scroll (smooth transition)
- **Mobile:** Hamburger menu → full-screen overlay menu with large touch-friendly links, smooth stagger animation

### Custom Cursor
- Default: small dot (6px) with a larger outer ring (30px) that follows with slight lag (spring physics)
- On links/buttons: outer ring expands and fills with accent color
- On product images: cursor becomes a "+" or magnifying glass icon
- On drag areas: cursor becomes a grab hand
- Optional: cursor leaves a subtle trail on hover over artworks (paint-stroke effect)

### Page Transitions
- Smooth crossfade between pages (300ms)
- Optional: FLIP animations for product grid → PDP transitions (the clicked product image animates to fill the PDP hero position)
- Loading state: thin progress bar at top of viewport (like YouTube)

### Scroll Animations
- Text blocks: fade-in + slight upward translate on viewport entry
- Images: fade-in with subtle scale-up (1.05 → 1.0)
- Staggered reveals for grid items (each delays 50–100ms)
- Parallax on hero images and section backgrounds
- Counter animations for numbers/stats

### Toast Notifications
- "Added to Cart" — slides in from bottom-right with artwork thumbnail, auto-dismisses in 4 seconds
- "Added to Wishlist" — heart animation + brief toast
- "Promo Code Applied" — success green accent

### Loading States
- Skeleton screens matching the exact layout (shimmer animation)
- Low-res blurred placeholder → sharp image swap (blur-up technique)
- Never show empty white space while content loads

---

## PRODUCT DATA SCHEMA (for 200 listings)

Each product should have these fields in the CMS:

```
Product:
  - id (auto-generated)
  - title (string) — "Amber Horizon"
  - slug (auto-generated from title)
  - artist (reference → Artist)
  - description (rich text)
  - artist_statement (text — the artist's words about this piece)
  - category (enum: prints, photography, abstract, minimalist, contemporary, b&w, nature, digital, limited)
  - tags (array of strings) — for search and filtering
  - style_keywords (array) — "warm", "moody", "vibrant", "serene", etc.
  - dominant_color (hex value) — extracted from image, used for color filter
  - color_palette (array of 5 hex values) — for "Complete the Wall" matching
  - images:
    - primary (high-res artwork image)
    - framed_mockup (artwork in a frame)
    - room_mockup (artwork in a room setting)
    - detail_crop (zoomed detail)
    - alternate_angles (array, optional)
  - sizes (array):
    - label: "8×10"
    - dimensions: { width: 8, height: 10, unit: "inches" }
    - price: 45.00
    - sku: "AMB-HOR-8x10"
    - stock: 999 (or "unlimited" for POD)
  - frame_options (array of references → Frame Products)
  - orientation (enum: portrait, landscape, square)
  - medium (enum: giclée_print, canvas, photo_print, digital_download)
  - paper_type (string) — "300gsm Hahnemühle Fine Art"
  - is_limited_edition (boolean)
  - edition_size (number, if limited) — e.g., 50
  - edition_remaining (number, if limited)
  - is_new (boolean, or auto-computed from created_date)
  - is_featured (boolean)
  - is_bestseller (boolean)
  - collections (array of references → Collection)
  - related_products (array of references, or auto-computed)
  - seo:
    - meta_title
    - meta_description
    - og_image
  - created_at (date)
  - updated_at (date)

Artist:
  - id
  - name
  - slug
  - bio (rich text)
  - portrait_image
  - location (city, country)
  - specialties (array: "Oil Painting", "Photography", "Digital Art")
  - social_links (Instagram, website, etc.)
  - is_featured (boolean)

Collection:
  - id
  - title — "Monochrome Meditation"
  - slug
  - description (rich text)
  - curator_note (text)
  - hero_image
  - products (array of references → Product)
  - is_active (boolean)
  - start_date / end_date (for seasonal drops)

Frame:
  - id
  - name — "Natural Oak"
  - material — "Solid Oak Wood"
  - color_hex — "#D4A574"
  - swatch_image
  - price_adder_by_size (map: "8x10": 25, "12x16": 35, ...)
  - compatible_mats (array of references → Mat)

Mat:
  - id
  - name — "Classic White"
  - color_hex — "#FFFFFF"
  - price_adder (flat or by size)
```

---

## PRODUCT CATEGORIES & SUGGESTED INVENTORY BREAKDOWN

| Category | # of Listings | Description |
|----------|:---:|-------------|
| Abstract Art | 35 | Bold color fields, geometric compositions, expressive brush marks |
| Photography | 30 | Fine art photography — landscapes, architecture, portraits, street |
| Minimalist | 25 | Clean lines, limited palettes, typographic art, simple compositions |
| Contemporary | 25 | Mixed media, collage-style, pop art influenced, modern figurative |
| Nature & Botanical | 20 | Floral illustrations, botanical prints, nature photography |
| Black & White | 20 | Monochrome art across all mediums |
| Digital Art & Illustration | 20 | AI-enhanced, vector art, surreal digital compositions |
| Limited Editions | 15 | Numbered prints with certificates of authenticity |
| Typography & Quotes | 10 | Artful text-based prints, calligraphy, word art |
| **Total** | **200** | |

---

## PERFORMANCE & TECHNICAL REQUIREMENTS

### Performance Targets
- Lighthouse Score: 90+ on all metrics (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s

### Image Optimization (CRITICAL for Art E-Commerce)
- Serve WebP/AVIF with fallback to JPEG
- Responsive images: `srcset` with multiple breakpoints (400w, 800w, 1200w, 1600w, 2400w)
- Blur-up placeholders (low-res base64 inline → sharp image on load)
- Lazy loading for below-fold images
- Art images must maintain color accuracy — use sRGB color profile, no aggressive compression
- Maximum quality for product hero images (90% quality minimum)
- CDN delivery via Cloudinary/Imgix with on-the-fly transforms

### SEO
- Server-side rendering for all pages (Next.js SSR/ISR)
- Structured data: Product schema (JSON-LD), Breadcrumbs, Organization, FAQPage
- Dynamic sitemap.xml generation
- Open Graph + Twitter Card meta for every page
- Alt text on all images (include artwork title + artist name)
- Clean URL structure: `/shop/abstract/amber-horizon-by-jane-doe`
- Canonical tags to prevent duplicate content (size variants, etc.)

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigable (tab order, focus indicators)
- Screen reader friendly (ARIA labels on interactive elements)
- Color contrast ratios ≥ 4.5:1 for body text
- Reduced motion media query support (disable parallax/animations)
- Skip navigation link

### Dropshipping Integration
- **Printful / Printify / Gelato API integration:**
  - Auto-sync product variants and pricing
  - Auto-forward orders to fulfillment partner
  - Real-time inventory sync (for limited items)
  - Tracking number auto-import
  - Webhooks for order status updates
- Products are print-on-demand: no physical inventory needed
- Custom branding: packaging inserts, custom labels, thank-you cards

---

## ANIMATIONS & MOTION DESIGN SPEC

### Page Load Sequence (Home)
```
0ms    — Background color renders
100ms  — Hero image begins fade-in (opacity 0→1, 800ms)
300ms  — Noise/grain overlay appears
600ms  — Hero headline letters begin staggered reveal (30ms per letter)
900ms  — CTA button fades in + subtle bounce
1200ms — Header nav fades in from top
1500ms — Scroll indicator appears (bouncing chevron)
```

### Product Card Hover
```
On mouse enter:
  0ms   — Image scale: 1 → 1.03 (300ms ease-out)
  0ms   — Shadow elevation increases
  100ms — Quick action bar slides up from bottom (200ms)
  150ms — Price text nudges right slightly (subtle)

On mouse leave:
  All reverse with matching timing
```

### Page Transition
```
Current page: opacity 1 → 0 (200ms)
Simultaneously: new page content opacity 0 → 1 (300ms, 100ms delay)
Product grid → PDP: FLIP animation on clicked image (400ms spring physics)
```

### Scroll-Triggered Reveals
```
Threshold: element 20% visible in viewport
Animation: translateY(40px) → translateY(0), opacity 0 → 1
Duration: 600ms
Easing: cubic-bezier(0.16, 1, 0.3, 1) — smooth decel
Stagger for grid items: +80ms per item
```

---

## RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Columns | Notes |
|-----------|-------|---------|-------|
| Mobile S | 320px | 1 | Small phones |
| Mobile M | 375px | 1 | Standard phones |
| Mobile L | 425px | 1–2 | Large phones |
| Tablet | 768px | 2 | iPads, small tablets |
| Laptop | 1024px | 2–3 | Small laptops |
| Desktop | 1280px | 3–4 | Standard desktops |
| Large Desktop | 1440px | 3–4 | Design max-width |
| Ultra-wide | 1920px+ | 4 | Cap content width at 1600px, center |

---

## THIRD-PARTY INTEGRATIONS

| Service | Purpose |
|---------|---------|
| Stripe | Payment processing (cards, Apple Pay, Google Pay) |
| PayPal | Alternative payment |
| Klarna/Afterpay | Buy Now Pay Later |
| Printful/Printify | Dropship fulfillment |
| Cloudinary/Imgix | Image CDN & transforms |
| Algolia/Meilisearch | Instant search |
| Mailchimp/Klaviyo | Email marketing & automations |
| Hotjar | Heatmaps, session recording |
| Google Analytics 4 | Analytics |
| Meta Pixel | Facebook/Instagram ad tracking |
| Pinterest Tag | Pinterest ad tracking |
| Judge.me / Yotpo | Product reviews |
| Intercom / Crisp | Live chat widget |
| Google Places API | Address autocomplete in checkout |
| Sentry | Error tracking |

---

## EMAIL AUTOMATION FLOWS (Klaviyo/Mailchimp)

1. **Welcome Series** (3 emails): Welcome → Art guide → First purchase discount
2. **Abandoned Cart** (3 emails): 1hr → 24hr → 72hr with escalating urgency + discount
3. **Post-Purchase**: Thank you → Shipping update → Review request → "Frame your new art" upsell
4. **Browse Abandonment**: "Still thinking about [artwork]?" with social proof
5. **Winback**: 60-day inactive → "New art we think you'll love"
6. **Collection Drop Alert**: New collection announcement to opted-in subscribers
7. **Artist Follow Notification**: New work from followed artists
8. **Wishlist Price Drop**: "Good news — [artwork] is now on sale"

---

## CONTENT STRATEGY & COPY TONE

**Brand Voice:** Refined but warm. Knowledgeable but not pretentious. Think: a friend who happens to be an art curator. Never snobby. Accessible but sophisticated.

**Sample Copy:**

- Homepage Hero: *"Art that makes a room — and a moment — unforgettable."*
- Category Intro (Abstract): *"Where color, form, and feeling collide. Abstract art doesn't ask to be understood — it asks to be felt."*
- Empty Cart: *"Your collection awaits. Every great gallery starts with one piece."*
- 404 Page: *"This room appears to be empty. But there's so much more to explore."*
- Newsletter CTA: *"Join the gallery. Be first to discover new art, exclusive prints, and the stories behind the work."*
- Checkout Success: *"Your art is on its way. We can't wait to see where you hang it."*

---

## OPTIONAL PREMIUM FEATURES (Phase 2)

1. **AI Art Recommendations** — "Based on your taste" using collaborative filtering + color palette analysis
2. **AR Wall Preview** — Use device camera to project art onto real walls (WebXR or 8th Wall)
3. **Art Subscription Box** — Monthly curated print delivered (subscription commerce)
4. **NFT / Digital Ownership Certificates** — Blockchain-verified authenticity for limited editions
5. **Gallery Walk Mode** — Full-screen slideshow that turns the website into a virtual gallery walk (keyboard arrows to navigate)
6. **Custom Commission Request Form** — Connect buyers with artists for bespoke pieces
7. **Affiliate / Art Advisor Program** — Interior designers earn commission on referrals
8. **Multi-Currency & Multi-Language** — i18n for international markets
9. **Gift Registry** — "Art Wishlist" that others can buy from (weddings, housewarmings)
10. **Print Comparison Tool** — Side-by-side view of 2–3 artworks at the same scale

---

## LAUNCH CHECKLIST

- [ ] All 200 products uploaded with full metadata, images, and SEO fields
- [ ] Stripe/PayPal payment testing (test mode → live)
- [ ] Dropship fulfillment test order placed and verified
- [ ] Email automation flows tested end-to-end
- [ ] Mobile responsiveness tested on actual devices (iPhone, Android, iPad)
- [ ] Lighthouse audit: 90+ scores
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] SSL certificate configured
- [ ] Analytics, pixels, and tracking verified
- [ ] Legal pages: Terms of Service, Privacy Policy, Refund Policy, Cookie Consent
- [ ] Favicon, OG images, and social sharing tested
- [ ] 404 page configured
- [ ] Sitemap submitted to Google Search Console
- [ ] DNS configured, domain connected
- [ ] CDN caching rules set
- [ ] Error monitoring (Sentry) connected
- [ ] Backup & disaster recovery plan documented

---

## SUMMARY

**ARTHAUS is not a store. It's a destination.**

Every interaction — from the first scroll on the homepage to the checkout confirmation — should feel like an art experience. The design should earn its place among the best sites on Awwwards while also converting visitors into buyers. Beauty and commerce, in perfect tension.

Build this with the craft and obsession of an artist hanging their first solo exhibition. Every detail matters. Every pixel is a brushstroke.

*Now go make something unforgettable.*

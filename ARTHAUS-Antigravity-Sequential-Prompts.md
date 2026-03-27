# ARTHAUS — Google Antigravity Sequential Build Prompts
## 25 Task Prompts for Planning Mode (Feed One at a Time)

---

## HOW TO USE THIS DOCUMENT

**Workflow:**
1. Open Google Antigravity and create a new workspace folder called `arthaus`
2. Select **Planning Mode** for every prompt
3. Feed each prompt one at a time — wait for the agent to complete, review artifacts, approve, then move on
4. After each phase, commit your changes to Git before starting the next prompt
5. Use the Antigravity browser to visually verify each phase before proceeding

**Important Antigravity Tips:**
- Let the agent generate its task list and implementation plan first — review before approving execution
- If the agent asks for permission to run a dev server, approve it — it uses the built-in browser to verify its own work
- Leave comments on artifacts if something looks off — the agent will incorporate feedback without restarting
- After Phase 1–3 (foundation), the rest can be done in any order based on your priority

---

## PHASE 1: PROJECT FOUNDATION (Prompts 1–3)

---

### PROMPT 1 — Project Scaffold & Design System

```
Create a Next.js 14+ project using the App Router with TypeScript and Tailwind CSS. The project is called "ARTHAUS" — a premium art e-commerce platform for selling art prints, custom frames, and curated art collections. It should feel like walking through a world-class contemporary art gallery.

Set up the following:

1. Initialize the Next.js project with: TypeScript, Tailwind CSS, ESLint, App Router, src/ directory, and path aliases (@/components, @/lib, @/styles, @/types, @/hooks, @/data)

2. Install these dependencies: framer-motion, lucide-react, clsx, tailwind-merge

3. Create a Tailwind config with this design system:
   - Colors: near-black (#0A0A0A), warm off-white (#FAF8F5), gallery gold accent (#C5A572), muted gray (#6B6B6B), soft border (#E8E4DF), cream (#F5F0EB), error red (#8B1A1A)
   - Fonts: Configure Google Fonts — "Cormorant Garamond" (serif display, weights 400/500/600/700) and "Satoshi" or "General Sans" (sans-serif body, weights 400/500/600/700). If Satoshi isn't available on Google Fonts, use "DM Sans" as the body font.
   - Custom spacing scale: section padding (80px mobile, 120px desktop), container max-width (1400px)
   - Custom animation easings in Tailwind: "ease-gallery" for cubic-bezier(0.16, 1, 0.3, 1)

4. Create a globals.css with:
   - CSS custom properties for all colors, font families, and spacing
   - Smooth scrolling on html
   - Custom selection color (gold accent on black text)
   - A subtle grain/noise texture as a CSS pseudo-element that can be toggled on sections
   - Base typography styles: body text 16px/1.6, headings in serif font

5. Create the folder structure:
   src/
   ├── app/ (pages)
   ├── components/
   │   ├── layout/ (Header, Footer, PageTransition)
   │   ├── ui/ (Button, Badge, Input, Card, Skeleton)
   │   ├── shop/ (ProductCard, FilterSidebar, ColorFilter)
   │   ├── gallery/ (CollectionCard, ArtworkGrid)
   │   ├── home/ (Hero, FeaturedStrip, CategoryNav, etc.)
   │   └── shared/ (CustomCursor, ScrollReveal, Newsletter)
   ├── hooks/
   ├── lib/
   ├── types/
   ├── data/ (mock data files)
   └── styles/

6. Create a types/index.ts with TypeScript interfaces for: Product, Artist, Collection, Frame, CartItem, and FilterState (refer to this schema):
   - Product: id, title, slug, artist (Artist ref), description, category (enum), tags, dominant_color (hex), images (primary/framed/room/detail URLs), sizes (array with label/dimensions/price/sku), orientation (portrait/landscape/square), medium, is_limited_edition, edition_size, is_new, is_featured, collections, price_from (computed lowest size price)
   - Artist: id, name, slug, bio, portrait_image, location, specialties array, social_links
   - Collection: id, title, slug, description, curator_note, hero_image, product_ids, is_active
   - Frame: id, name, material, color_hex, swatch_image, price_adder_by_size (Record<string, number>)
   - CartItem: product (Product), selected_size, selected_frame (optional), quantity, total_price

Make sure the dev server runs cleanly with no errors. The homepage should show a simple centered "ARTHAUS" heading in the serif font on the off-white background to verify fonts and colors are working.
```

---

### PROMPT 2 — Mock Data & Product Catalog

```
In the ARTHAUS project, create comprehensive mock data that will power the entire site during development. Create these files in src/data/:

1. products.ts — Generate 24 realistic mock products (we'll scale to 200 later) spread across these categories:
   - Abstract Art (5 products)
   - Photography (4 products)
   - Minimalist (3 products)
   - Contemporary (3 products)
   - Nature & Botanical (3 products)
   - Black & White (3 products)
   - Digital Art (2 products)
   - Limited Editions (1 product)

   Each product should have:
   - A creative, evocative title (like "Amber Horizon", "Lunar Drift", "Concrete Poetry", "Still Life with Shadows")
   - Realistic description and artist statement text (2-3 sentences each)
   - 3-5 size options with realistic pricing ($35 for 8x10 up to $280 for 30x40)
   - A dominant_color hex value (varied across the catalog)
   - An array of 5 color_palette hex values
   - Proper orientation, medium, tags, and style_keywords
   - Use https://picsum.photos/ for placeholder image URLs with different seed values for each image (primary, framed, room, detail). Format: https://picsum.photos/seed/{unique-seed}/800/1000
   - is_new for 6 products, is_featured for 4, is_bestseller for 4
   - Limited edition product should have edition_size: 50, edition_remaining: 12

2. artists.ts — Generate 8 mock artists with:
   - Realistic names and creative bios (3-4 sentences)
   - Specialties matching the art they create
   - Locations from around the world (Paris, Tokyo, Brooklyn, Cape Town, etc.)
   - Portrait image URLs via picsum
   - Link each artist to their products

3. collections.ts — Generate 6 curated collections:
   - "Monochrome Meditation" (B&W pieces)
   - "Mediterranean Summer" (warm, vibrant pieces)
   - "The Abstract Edit" (abstract works)
   - "Botanical Dreams" (nature pieces)
   - "Under $50" (affordable picks from various categories)
   - "Statement Pieces" (large format, premium works)
   Each with a curator_note, hero_image, and array of product IDs from the products data

4. frames.ts — Generate 6 frame options:
   - Classic Black, Gallery White, Natural Oak, Dark Walnut, Brushed Gold, Raw Aluminum
   - Each with color_hex, material description, and price_adder_by_size map (e.g., "8×10": 25, "12×16": 35, "18×24": 55, "24×36": 75, "30×40": 95)

5. Create a src/lib/data-utils.ts with helper functions:
   - getProductBySlug(slug)
   - getProductsByCategory(category)
   - getProductsByArtist(artistId)
   - getProductsByCollection(collectionId)
   - getFeaturedProducts()
   - getNewArrivals()
   - getRelatedProducts(productId) — match by category + color proximity
   - searchProducts(query) — search title, artist name, tags, description
   - filterProducts(filters: FilterState) — filter by category, price range, size, orientation, color, medium

Export everything with proper TypeScript typing. Make sure all cross-references (product→artist, collection→products) are consistent.
```

---

### PROMPT 3 — Global Layout Components (Header, Footer, Custom Cursor)

```
Build the global layout shell for ARTHAUS. These components wrap every page.

1. HEADER COMPONENT (src/components/layout/Header.tsx):
   - Fixed position top bar, full width
   - Transparent background on page load → transitions to off-white (#FAF8F5) with subtle bottom border on scroll (use scroll listener, trigger at 50px)
   - Left: ARTHAUS logo in serif font (Cormorant Garamond), weight 600, tracking wide, all caps. Clicking it goes to homepage.
   - Center: Main nav links — "Shop", "Gallery", "Artists", "Journal", "About" — in sans-serif, weight 500, small text (14px), letter-spacing 1px, uppercase
   - Right: Icon row — Search (magnifying glass), Account (user icon), Wishlist (heart icon), Cart (shopping bag icon with item count badge). Use lucide-react icons.
   - The cart icon should have a small gold (#C5A572) circle badge showing item count (hidden when 0). Badge should animate in with a scale spring when count changes.
   - "Shop" link has a MEGA MENU dropdown on hover:
     - Left column: Category links list (Abstract, Photography, Minimalist, Contemporary, Nature, B&W, Digital, Limited Editions, All Art)
     - Right column: Featured collection image card with title and "Explore →" link
     - Mega menu slides down smoothly (200ms ease-out), has a subtle shadow
   - MOBILE (below 1024px): Replace center nav with hamburger menu icon (3 lines). On click, open a full-screen overlay menu:
     - Background: near-black (#0A0A0A)
     - Nav links stagger in from left (large serif text, 32px, white)
     - Social icons at bottom
     - Close button (X) top right
     - Entry animation: backdrop fades in, then links stagger (each 80ms delay)
   - Use Framer Motion for all animations

2. FOOTER COMPONENT (src/components/layout/Footer.tsx):
   - Background: near-black (#0A0A0A), text: off-white
   - 4-column grid layout (stacks to 2-col on tablet, 1-col on mobile):
     - Column 1: "ARTHAUS" logo + tagline "Curated art for every space" + brief 2-line about text
     - Column 2: "Shop" links — All Art, New Arrivals, Best Sellers, Limited Editions, Gift Cards
     - Column 3: "Help" links — Shipping & Returns, FAQ, Contact, Size Guide, Framing Guide
     - Column 4: "Connect" — Newsletter signup (email input with arrow submit button), social icons (Instagram, Pinterest, X/Twitter)
   - Below columns: horizontal divider line, then bottom bar with "© 2025 ARTHAUS. All rights reserved." left, and "Terms · Privacy · Cookies" right
   - Subtle grain texture overlay on the footer background
   - All links have underline-on-hover animation (line draws from left to right)

3. CUSTOM CURSOR (src/components/shared/CustomCursor.tsx):
   - Only render on devices with pointer (use matchMedia or CSS pointer media query)
   - Small inner dot (6px, gold color) that follows the mouse exactly
   - Larger outer ring (32px, 1px border, semi-transparent gold) that follows with a spring/lag effect (use Framer Motion spring with damping: 25, stiffness: 300)
   - On hovering links/buttons: outer ring scales up to 48px and fills with semi-transparent gold (mix-blend-mode: difference optional)
   - On hovering product images: cursor shows a small "+" icon or magnifying glass inside the ring
   - Hide the default cursor via CSS (cursor: none on body)
   - Ensure it doesn't interfere with clicking

4. PAGE TRANSITION WRAPPER (src/components/layout/PageTransition.tsx):
   - Wrap page content with Framer Motion AnimatePresence
   - On page change: current page fades out (opacity 1→0, 150ms), new page fades in (opacity 0→1, 300ms with slight translateY 20px→0px)
   - Use the "ease-gallery" easing: cubic-bezier(0.16, 1, 0.3, 1)

5. ROOT LAYOUT (src/app/layout.tsx):
   - Import and render Header, Footer, CustomCursor, and PageTransition
   - Set up metadata: title "ARTHAUS | Curated Art for Every Space", description, OG tags
   - Apply the font classes from Google Fonts to the body

6. SCROLL REVEAL COMPONENT (src/components/shared/ScrollReveal.tsx):
   - Reusable wrapper component that triggers reveal animation when element enters viewport
   - Props: direction (up/down/left/right), delay (ms), duration (default 600ms), threshold (default 0.2)
   - Animation: element starts offset + invisible, animates to final position + visible
   - Use Framer Motion's useInView hook + motion.div

Test the layout by putting placeholder content on the homepage. Verify:
- Header transparency → solid transition works on scroll
- Mobile menu opens/closes smoothly
- Custom cursor works on desktop
- Footer renders all 4 columns correctly
- Scroll reveal triggers on a test element
```

---

## PHASE 2: HOMEPAGE (Prompts 4–6)

---

### PROMPT 4 — Homepage Hero + Featured Collection Strip

```
Build the first two sections of the ARTHAUS homepage (src/app/page.tsx).

SECTION 1 — HERO (full viewport):
- Full-screen section (100vh) with a featured artwork as the background
- The artwork image should have a slow Ken Burns zoom effect (scale 1 → 1.08 over 20 seconds, CSS animation, infinite alternate)
- Subtle grain/noise texture overlay on top of the image (use the CSS grain from globals)
- Dark gradient overlay from bottom (transparent top → rgba(0,0,0,0.4) bottom) for text readability
- Content overlay (centered, bottom third of viewport):
  - Headline: "Where Art Lives" — Cormorant Garamond, 72px desktop / 40px mobile, white, font-weight 400
  - The headline should animate in letter-by-letter on page load (30ms stagger per letter, fade + translateY)
  - Subtitle below: "Curated prints, custom framing, and gallery-grade art for every space" — sans-serif, 16px, white/80% opacity, fades in after headline completes
  - CTA Button: "Enter the Gallery" — bordered button (1px white border, white text, transparent bg), on hover: fills white with black text. Magnetic hover effect (button slightly follows cursor within 10px radius). Fades in 200ms after subtitle.
- Bottom of hero: small scroll indicator — a thin vertical line (30px) with a small circle at bottom, gently bouncing animation. Text "Scroll" in tiny caps above it.
- Use one of the featured products from mock data for the hero image

SECTION 2 — FEATURED COLLECTION HORIZONTAL STRIP:
- Section title: "The Collection" pinned on the left side in large vertical text (rotated -90deg, Cormorant Garamond, 14px, uppercase, letter-spacing 4px, gold color). This stays fixed while the horizontal content scrolls.
- Horizontal scrolling area with 8 artwork cards from a featured collection
- Each card:
  - Width: 320px desktop, 260px mobile
  - Artwork image with aspect ratio preserved (cover fit, rounded corners 4px)
  - Below image: Artist name (sans-serif, 12px, uppercase, muted gray), Title (serif, 18px, near-black), Price "From $XX" (sans-serif, 14px, gold)
  - Hover: image scales 1.03x, subtle shadow lifts, "Quick View" icon (eye) fades in at center of image
- Scroll behavior: smooth drag-to-scroll (CSS scroll-snap-type: x mandatory, scroll-snap-align: start on cards)
- Gap between cards: 24px
- Left/right arrow buttons (thin circles with chevrons) at the edges for desktop navigation
- Fade-out gradient on left/right edges to hint at more content
- Cards should stagger-animate in when the section enters viewport (ScrollReveal, 80ms delay each)

Use Framer Motion for all animations. Pull data from the mock collections and products.
```

---

### PROMPT 5 — Homepage Sections 3–6 (Curation Grid, Categories, Room Teaser, Artist Spotlight)

```
Continue building the ARTHAUS homepage. Add these 4 sections below the featured collection strip:

SECTION 3 — "THE CURATION" (Asymmetric Editorial Grid):
- Section heading: "The Curation" — large serif text, 48px, with a thin horizontal line extending from the text to the right edge
- Asymmetric bento/masonry grid with 6 featured artworks:
  - Layout: CSS Grid with named areas. One large artwork spanning 2 columns and 2 rows (top-left), two medium pieces (1 col each, stacked on the right), two small pieces bottom row, one medium bottom right
  - Grid gap: 16px
  - Each artwork has a subtle parallax offset on scroll — use different translateY speeds (the large piece moves slower, small pieces move faster) for depth. Use Framer Motion useScroll + useTransform.
  - On hover: dark overlay (rgba(0,0,0,0.5)) slides up from bottom revealing: artwork title (serif, white), artist name (sans-serif, small, white/70%), price (gold), and a "View →" text link
  - Each image uses scroll-triggered fade-in (ScrollReveal component)
- Below grid: "View All Art →" link, right-aligned, underline animation on hover

SECTION 4 — CATEGORY NAVIGATION:
- Full-width section, off-white background (#FAF8F5)
- Section title: "Explore by Style" — centered, serif, 40px
- Grid of 6 category tiles, 3 columns desktop, 2 tablet, 1 mobile
- Each tile:
  - Height: 280px desktop
  - Background: a representative artwork from that category (cropped, slightly desaturated/darkened)
  - Category name overlaid: large serif text (28px), white, centered
  - On hover: the background image fully saturates and brightens, the category name shifts up 10px, a subtle "Explore →" text appears below the name, the entire tile has a 4px gold border animation drawing in from corners
  - Transition: 400ms ease-out
- Categories to show: Abstract, Photography, Minimalist, Contemporary, Nature & Botanical, Black & White
- Each tile links to the category filter on the shop page

SECTION 5 — "ART IN YOUR SPACE" ROOM VISUALIZER TEASER:
- Split layout: left 55% image, right 45% text content
- Left side: a stylish modern living room mockup image with art on the wall
  - The art on the wall should auto-rotate through 3 different artworks with a smooth crossfade (4-second interval, 800ms fade transition)
  - Use absolute positioning to place the artwork images within a specific region of the room image (simulate art on wall)
- Right side content (vertically centered):
  - Small label: "NEW TOOL" — sans-serif, 11px, uppercase, gold, letter-spacing 3px
  - Headline: "See It In Your Space" — serif, 36px
  - Body: "Visualize any artwork on your wall before you buy. Choose from curated room settings or upload your own space." — sans-serif, 16px, muted gray, max-width 400px
  - 3 mini room style thumbnails in a row (Modern, Scandinavian, Classic) as clickable mini-cards
  - CTA button: "Try the Room Visualizer →" — gold background, black text, hover darkens
- Entire section fades in on scroll with ScrollReveal

SECTION 6 — ARTIST SPOTLIGHT:
- Full-width section with warm cream background (#F5F0EB)
- Layout: left 40% = artist portrait, right 60% = content
- Left side: Large artist portrait image with a subtle film-grain CSS filter overlay (contrast 1.05, add noise via SVG filter or pseudo-element)
- Right side:
  - Label: "ARTIST SPOTLIGHT" — sans-serif, 11px, uppercase, gold, letter-spacing 3px
  - Artist name: large serif, 48px
  - Bio excerpt: 3-4 lines, sans-serif, 16px, muted color
  - Horizontal strip of 3 artwork thumbnails from this artist (small squares, 100px, hover: scale 1.1)
  - "Explore [Artist Name] →" link with underline animation
- Use one of the featured mock artists and their products
- ScrollReveal: portrait slides in from left, text content slides in from right

Pull all data from mock data. Ensure responsive behavior for all sections.
```

---

### PROMPT 6 — Homepage Sections 7–9 (New Arrivals, Social Proof, Newsletter + Final Assembly)

```
Complete the ARTHAUS homepage with these final 3 sections:

SECTION 7 — "NEW TO THE GALLERY" (Latest Arrivals Grid):
- Section title: "New to the Gallery" — serif, 40px, centered
- Subtitle: "The latest additions to our collection" — sans-serif, 14px, muted gray, centered
- 4-column grid of 8 product cards (2 rows), 2-col on tablet, 1-col on mobile
- Use the shared ProductCard component (create if not exists) with:
  - Artwork image (aspect ratio preserved, object-fit cover)
  - "New" badge (small gold pill badge, top-left corner of image)
  - On hover: image scales 1.02x, quick-action bar slides up from bottom with 3 icon buttons (Quick View eye, Heart/wishlist, Cart/bag)
  - Below image: Artist name (12px, uppercase, sans-serif, muted gray), Title (serif, 16px), Price "From $XX" (sans-serif, 14px, bold)
- Staggered entrance animation: each card delays 100ms from previous (use ScrollReveal with incremental delay)
- Below grid: "View All New Art →" centered button, bordered style

SECTION 8 — SOCIAL PROOF & PRESS:
- Horizontal marquee/ticker of press logos (create simple SVG text logos for: "Architectural Digest", "Elle Decor", "Dwell Magazine", "Kinfolk", "Cereal", "Dezeen"). Use CSS animation for infinite horizontal scroll, slow speed (40 seconds for one loop), duplicated content for seamless loop.
- Below marquee: featured testimonial block
  - Large quotation mark (serif, 72px, gold, decorative)
  - Testimonial text in large serif italic, 24px, centered, max-width 700px: "The quality exceeded our expectations. Every piece feels museum-worthy, and the framing service was impeccable."
  - Customer name + "★★★★★" rating — sans-serif, 14px, below quote
  - 3 small dots for testimonial pagination (just visual, cycling optional)
- Subtle off-white background for this section

SECTION 9 — NEWSLETTER CTA:
- Full-width section with a dark, moody background (near-black with a very subtle blurred artwork image behind at 10% opacity)
- Centered content:
  - Headline: "Join the Gallery" — serif, 48px, white
  - Subtitle: "Early access to drops · Exclusive prints · Art world insights" — sans-serif, 14px, white/60%, letter-spacing 1px
  - Email input field: minimalist style — transparent background, white bottom border only, white placeholder text "Your email address", white text input. Next to it (or below on mobile): arrow submit button (→) in a gold circle
  - Small text below: "No spam. Unsubscribe anytime." — 12px, white/40%
- On focus: input bottom border transitions to gold
- On submit: brief success message replaces the form: "Welcome to the gallery. ✓"

FINAL ASSEMBLY:
- Ensure all 9 homepage sections flow together smoothly in order:
  1. Hero (full viewport)
  2. Featured Collection Strip (horizontal scroll)
  3. The Curation (editorial grid)
  4. Explore by Style (category tiles)
  5. Art in Your Space (room visualizer teaser)
  6. Artist Spotlight
  7. New to the Gallery (product grid)
  8. Social Proof / Press
  9. Newsletter CTA
- Verify scroll performance is smooth (no jank on animations)
- Check all responsive breakpoints: mobile (375px), tablet (768px), laptop (1024px), desktop (1440px)
- Run the dev server and verify the full homepage in the Antigravity browser
```

---

## PHASE 3: SHOP & PRODUCT PAGES (Prompts 7–10)

---

### PROMPT 7 — Shop Catalog Page with Filters

```
Build the ARTHAUS shop/catalog page at src/app/shop/page.tsx. This is the main product browsing experience.

PAGE HEADER:
- Breadcrumbs: "Home / Shop" — small sans-serif, muted gray, top of page
- Page title: "The Collection" — serif, 48px
- Subtitle: "Showing X works" (dynamic count based on filters) — sans-serif, 14px, muted
- View toggle buttons (top right): Grid icon (3-col) and Editorial icon (2-col large). Active state: gold fill. These toggle the grid layout.
- Sort dropdown (right-aligned): "Sort by" — options: Newest, Price: Low to High, Price: High to Low, Most Popular, Editor's Picks. Custom-styled select (not browser default).

FILTER SIDEBAR (src/components/shop/FilterSidebar.tsx):
- Desktop: sticky sidebar on the left (280px wide), scrollable independently
- Mobile: hidden by default, "Filter" button opens a slide-in drawer from left
- Filter groups (each collapsible accordion):
  1. CATEGORY — checkbox list with count badges: Abstract (5), Photography (4), etc.
  2. PRICE RANGE — custom dual-handle range slider (styled with gold track, dark handles). Shows "$ min — $ max" values. Range: $0 – $500.
  3. SIZE — radio buttons or clickable pills: Small (up to 12×16), Medium (18×24), Large (24×36), Oversized (30×40+)
  4. ORIENTATION — 3 icon buttons: Portrait (tall rectangle), Landscape (wide rectangle), Square
  5. COLOR — SIGNATURE FEATURE (src/components/shop/ColorFilter.tsx):
     - Row of 12 color swatches (circles, 28px each): #E74C3C (red), #E67E22 (orange), #F1C40F (yellow), #27AE60 (green), #2980B9 (blue), #8E44AD (purple), #E91E84 (pink), #1A1A1A (black), #FFFFFF (white), #8B7355 (earth/brown), #BDC3C7 (gray), #F5CBA7 (beige/neutral)
     - Clicking a swatch filters products where dominant_color is within a color-distance threshold of the selected swatch
     - Active swatch: gold ring around it, subtle pulse animation
     - Multiple colors can be selected (OR logic)
  6. MEDIUM — checkbox list: Giclée Print, Canvas, Photo Print, Digital Download
  7. "Clear All Filters" link at bottom when any filter is active

- Active filters shown as removable pill chips above the product grid: "Abstract ✕", "$50–$150 ✕", "Blue ✕"

PRODUCT GRID:
- Default: 3-column masonry grid (CSS columns or grid with auto-rows)
- Editorial view: 2-column, larger images with more text detail
- Use the ProductCard component from the homepage
- 12 products per page initially
- "Load More" button at bottom (not infinite scroll) — loads next 12, with stagger animation on new items
- "Showing 12 of 24 works" counter above grid updates on load more
- Skeleton loading state: shimmer-animated placeholder cards matching exact card dimensions

FUNCTIONALITY:
- All filtering should work client-side on the mock data using the filterProducts utility
- URL params should sync with filters (e.g., /shop?category=abstract&color=blue) so pages are shareable
- Filtering should animate: filtered-out products shrink and fade, remaining products smoothly reposition (use Framer Motion layout animations with AnimatePresence)

Responsive: sidebar becomes a drawer on mobile, grid goes to 2-col on tablet, 1-col on mobile. Filter pills scroll horizontally on mobile.
```

---

### PROMPT 8 — Product Detail Page (PDP)

```
Build the ARTHAUS product detail page at src/app/shop/[slug]/page.tsx. This is the core buying experience.

LAYOUT: Two-column on desktop (60% left / 40% right), stacked on mobile.

LEFT COLUMN — ARTWORK DISPLAY:
- Hero image: large, high-quality artwork image. Object-fit contain on a light gray background (#F5F5F5) so the full artwork is always visible regardless of orientation.
- On hover over the image: show a loupe/zoom effect — a circular magnifier (200px diameter) follows the cursor showing 2x zoomed detail of the area. On mobile: pinch-to-zoom instead.
- Click image: opens full-screen lightbox overlay (dark bg, image centered, close X button, left/right arrows if multiple images)
- Below hero: horizontal thumbnail strip of 4 images (primary, framed mockup, room mockup, detail crop). Clicking a thumbnail swaps the hero image with a smooth crossfade. Active thumbnail has gold bottom border.
- Framing preview: when user selects a frame option (right column), the hero image should swap to the "framed mockup" view. Show a visual indicator that this is a preview.

RIGHT COLUMN — PRODUCT INFO:
- Breadcrumbs: "Home / Shop / [Category] / [Product Title]" — small, muted
- Artist name — clickable link to artist page, sans-serif, 14px, uppercase, muted gray, letter-spacing 1px
- Artwork title — serif, 32px, near-black
- Price — "From $XX" (lowest size price), sans-serif, 24px, bold. If on sale, show original crossed out + sale price in red.
- "or 4 interest-free payments of $XX with Klarna" — small text, 12px
- Star rating: 5 gold stars + "(XX reviews)" link — scrolls to reviews section below

SIZE SELECTOR:
- Visual size comparison area: show a small silhouette of a person (sofa for reference) with the artwork drawn to relative scale for each size option
- Radio button cards for each size: "8×10 — $45", "12×16 — $65", "18×24 — $95", "24×36 — $165", "30×40 — $245"
- Active size: gold border on the card
- Selecting a size updates the total price

FRAME SELECTOR:
- Toggle: "Print Only" (default) or "Add a Frame"
- When "Add a Frame" is selected, reveal frame options:
  - Horizontal row of 6 frame swatches (small colored circles with material names below): Classic Black, Gallery White, Natural Oak, Dark Walnut, Brushed Gold, Raw Aluminum
  - Below frames: Mat options — No Mat, White Mat, Black Mat (radio pills)
  - Price adder shown: "+ $XX for framing"
  - Selecting frame/mat updates hero image to framed mockup and updates total price

QUANTITY: Minimal stepper — "−  1  +" with borders

ADD TO CART BUTTON:
- Full-width, near-black background, white serif text "Add to Cart — $XXX"
- On click: button compresses slightly (scaleX 0.98), text changes to "✓ Added" with green, then reverts after 1.5s
- Below button: secondary action row — "♡ Save to Wishlist" and "Share" (share icon → copy link, Pinterest, X)

BELOW THE FOLD:
- Accordion sections (collapsed by default, click to expand):
  1. "About This Piece" — artist statement + description
  2. "Specifications" — table with: Medium, Paper/Canvas type, Dimensions, Orientation
  3. "Shipping & Returns" — standard shipping info text, free shipping over $150, 30-day returns
  4. "Certificate of Authenticity" — shown only if is_limited_edition (edition X of Y, signed, numbered)

- "Complete the Wall" — related artwork section:
  - Heading: "Complete the Wall" — serif, 28px
  - Horizontal scrolling row of 6 related artworks (matched by category + color)
  - Same ProductCard component

- Recently Viewed (optional): small strip at bottom showing last 4 viewed products (stored in localStorage)

All pricing should compute dynamically: base price (from size) + frame adder + mat adder. Use React state for all selections.
```

---

### PROMPT 9 — Shopping Cart Drawer

```
Build the ARTHAUS shopping cart as a slide-over drawer component (src/components/shop/CartDrawer.tsx) with a global cart state.

CART STATE (src/hooks/useCart.ts or src/lib/cart-context.tsx):
- Create a React Context + Provider for global cart state
- State: items array (CartItem[]), isOpen boolean
- Actions: addItem, removeItem, updateQuantity, clearCart, toggleCart, getSubtotal, getItemCount
- Persist cart to localStorage so it survives page refreshes
- Wrap the app with CartProvider in layout.tsx

CART DRAWER UI:
- Triggered by clicking the cart icon in the Header (or "Add to Cart" on PDP)
- Slides in from the right side (Framer Motion: translateX 100% → 0%, 300ms ease-out)
- Width: 440px on desktop, full-screen on mobile
- Backdrop: semi-transparent black overlay on the rest of the page (click to close)
- Close button (X) top-right of drawer

DRAWER CONTENT:
- Header: "Your Selection" — serif, 24px + item count "(3 items)"
- If cart is empty:
  - Centered content: large shopping bag icon (lucide), "Your collection awaits" — serif, 20px, "Every great gallery starts with one piece." — sans-serif, 14px, muted. "Discover Art →" button linking to /shop
- If cart has items:
  - Scrollable item list, each item:
    - Left: small artwork thumbnail (80px square, rounded 4px, clickable → PDP)
    - Center: title (serif, 14px), artist (12px, muted), size "18×24" and frame option "Natural Oak Frame" if applicable (12px, muted), quantity adjuster (tiny − 1 + stepper)
    - Right: line total price, remove button (small X icon, muted, hover: red)
    - Subtle bottom border between items
  - Each item animates out on removal (fadeOut + slideRight + height collapse, 300ms)

UPSELL SECTION (below items):
- If any item has no frame: show a subtle prompt: "🖼 Add a frame to [artwork title]?" with a "Choose Frame →" link that goes to PDP
- OR: "Complete the Set" — show 1 small recommended artwork card with "Add to Cart" button

ORDER SUMMARY (sticky bottom of drawer):
- Subtotal: $XXX
- Shipping: "Free" if subtotal > $150, else "Calculated at checkout"
- If subtotal is close to free shipping threshold, show: "Add $XX more for free shipping" in gold text
- Promo code: small expandable section "Have a promo code?" → reveals text input + "Apply" button
- Total: $XXX (bold, larger text)
- "Proceed to Checkout" button: full-width, gold background (#C5A572), black text, serif. Hover: darken 10%.
- "Continue Shopping" text link below

TOAST NOTIFICATION (src/components/shared/Toast.tsx):
- When "Add to Cart" is clicked anywhere on the site, show a toast notification:
  - Slides in from bottom-right corner
  - Contains: small artwork thumbnail, "Added to cart" text, artwork title
  - Auto-dismisses after 4 seconds
  - Click to dismiss
  - Framer Motion entrance/exit animations

Make sure the cart icon badge in the Header updates reactively when items are added/removed.
```

---

### PROMPT 10 — Checkout Flow

```
Build a multi-step checkout flow for ARTHAUS at src/app/checkout/page.tsx.

LAYOUT:
- Two-column on desktop: left 60% = checkout steps, right 40% = order summary sidebar (sticky)
- Mobile: single column, order summary collapsible at top

STEP INDICATOR:
- Horizontal progress bar at top showing 3 steps: "Information", "Shipping", "Payment"
- Active step: gold color, bold. Completed steps: gold with checkmark. Future steps: muted gray.
- Steps are clickable to go back (but not forward past current)

STEP 1 — INFORMATION:
- Section: "Contact Information"
  - Email input (full width)
  - Checkbox: "Create an account for order tracking & wishlist" (unchecked by default)
- Section: "Shipping Address"
  - First Name + Last Name (2 columns)
  - Address Line 1 (full width)
  - Address Line 2 (full width, optional)
  - City + State/Province (2 columns)
  - ZIP/Postal Code + Country dropdown (2 columns)
  - Phone number (full width, with note "For delivery updates")
- All inputs: custom styled — transparent background, bottom border only (dark), on focus: border transitions to gold, label floats above (floating label pattern)
- "Continue to Shipping →" button (full-width, dark bg, white text)

STEP 2 — SHIPPING:
- Show the entered address summarized at top with "Edit" link
- Shipping method radio options (styled as selectable cards):
  - "Standard Shipping" — Free (5–8 business days) — or $8.95 if under threshold
  - "Express Shipping" — $18.95 (2–3 business days)
  - "White Glove Delivery" — $49.95 (includes professional installation, available for orders over $300)
- Each option shows estimated delivery date
- Shipping insurance toggle: "Protect your art in transit — $4.95" with info tooltip explaining coverage
- "Continue to Payment →" button

STEP 3 — PAYMENT:
- Express checkout row at top: Apple Pay, Google Pay, PayPal buttons (styled as horizontal row of brand buttons)
- Divider: "— or pay with card —"
- Card form (simulate Stripe Elements styling):
  - Card Number input (with card brand icon auto-detection: Visa, Mastercard, Amex)
  - Expiry Date + CVC (2 columns)
  - Name on Card (full width)
- Billing address: "Same as shipping" checkbox (checked by default), expand address form if unchecked
- Gift card / promo code: expandable section
- Terms: "By placing your order, you agree to our Terms of Service and Privacy Policy" — small text with links
- "Place Order — $XXX.XX" button (full-width, GOLD background, black text, serif, large)

ORDER SUMMARY SIDEBAR:
- Title: "Order Summary" — serif, 20px
- List of items: thumbnail (60px) + title + size/frame details + price
- Subtotal
- Shipping cost
- Insurance (if added)
- Discount (if promo applied, show in green)
- Divider
- Total (bold, 20px)

CONFIRMATION PAGE (src/app/checkout/confirmation/page.tsx):
- Large checkmark icon with subtle animation (draws itself in a circle, then check appears)
- "Your Art is on Its Way" — serif, 36px
- Order number: "#ARTH-XXXXX" (random generated)
- Order summary recap
- Estimated delivery date
- "Track Your Order" button (outlined) + "Continue Exploring" button (filled, links to /shop)
- Below: "Others Who Loved This Also Bought…" — 4 product recommendations

For now this is all frontend with form validation only (no real payment processing). Use React state for step management and form data. Validate each step before allowing progression. Show inline error messages for invalid fields.
```

---

## PHASE 4: GALLERY, ARTISTS & CONTENT PAGES (Prompts 11–14)

---

### PROMPT 11 — Gallery & Curated Collections Pages

```
Build the Gallery / Collections section of ARTHAUS.

GALLERY LANDING PAGE (src/app/gallery/page.tsx):
- Page hero: dark background with large serif headline "The Gallery" + subtitle "Curated exhibitions and collections, refreshed monthly" — centered, white text
- Below hero: vertically stacked collection cards, each collection is a full-width editorial section:
  - Layout: alternating — odd collections have image left + text right, even collections have text left + image right
  - Image side (55%): collection hero image with subtle parallax on scroll
  - Text side (45%): collection title (serif, 32px), curator's note (sans-serif, 16px, muted, 3 lines max), artwork count "12 works", and "Enter Exhibition →" link with arrow animation on hover
  - Each collection section has generous vertical padding (120px) and a thin horizontal divider between them
- The first collection should be featured larger: full-viewport hero image with title overlay, similar to homepage hero but with collection data
- ScrollReveal animations on each collection as it enters viewport

INDIVIDUAL COLLECTION PAGE (src/app/gallery/[slug]/page.tsx):
- Collection hero: full-width banner (50vh) with collection hero image, dark overlay, collection title centered (serif, 56px, white)
- Below hero: curator's introduction — max-width 700px, centered, sans-serif, 18px, 1.8 line-height. This should feel like reading a museum exhibition catalog intro.
- Artwork grid: masonry-style layout with INTENTIONALLY varied sizes (mimicking a gallery wall hang):
  - Some images span 2 columns (featured pieces in the collection)
  - Others are single column
  - Different aspect ratios are maintained (no forced cropping)
  - Gap: 12px (tight, gallery-wall feel)
  - Each artwork: image + overlay on hover (title, artist, price, "View" link)
- Optional: insert "curator's note" text blocks between every 4-6 artworks — these are italicized text paragraphs that explain the thematic thread
- Bottom of page: "Shop Entire Collection" floating CTA button (fixed bottom-center, gold bg, appears after scrolling past hero)
- "Next Exhibition →" link at the very bottom pointing to the next collection

Use mock collection and product data. Ensure the masonry layout is responsive: 3-col desktop, 2-col tablet, 1-col mobile.
```

---

### PROMPT 12 — Artists Directory & Artist Profile

```
Build the Artists section of ARTHAUS.

ARTISTS DIRECTORY (src/app/artists/page.tsx):
- Page title: "Our Artists" — serif, 48px, centered
- Subtitle: "The creative minds behind the collection" — sans-serif, 14px, muted, centered
- Search bar: centered, max-width 500px, minimal style (bottom border only, magnifying glass icon), placeholder "Search artists..." Filters results as you type.
- Grid of artist cards: 4 columns desktop, 3 tablet, 2 mobile. Gap: 24px.
- Each artist card:
  - Portrait image (square, 1:1 ratio, rounded 8px)
  - Below: artist name (serif, 20px), location (sans-serif, 13px, muted — "Brooklyn, NY"), specialties as small pills/tags (e.g., "Photography", "Abstract" — 11px, bordered pills)
  - Number of works available: "12 works" — small text, muted
  - On hover: the portrait gets a subtle warm color overlay tint, name shifts up 4px, a mini horizontal strip of 3 of their artworks peeks out from the bottom of the card (like a drawer sliding up, 60px tall, showing 3 tiny thumbnails)
- Filter tabs above grid: "All", then each specialty (Photography, Abstract, Digital, etc.) — clicking filters the grid with AnimatePresence layout animation
- ScrollReveal stagger on cards

ARTIST PROFILE PAGE (src/app/artists/[slug]/page.tsx):
- Hero section: full-width, split layout
  - Left (45%): large artist portrait image, film-grain filter overlay via CSS
  - Right (55%): 
    - Name: serif, 48px
    - Location: sans-serif, 14px, muted, with a small map pin icon
    - Specialties: row of bordered pill tags
    - Bio: sans-serif, 16px, 1.7 line-height, 3-4 paragraphs
    - Social links: icon row (Instagram, Website, etc.) with hover animations
    - "Follow This Artist" button (outlined, gold border) — for email notifications on new drops
- Artist quote (pull quote style): between hero and gallery, full-width warm cream bg, large serif italic text centered, 28px, with large decorative quotation marks
  - Generate a creative fictional artist quote for each artist
- "The Collection" section: all artworks by this artist
  - Grid layout: 3 columns, standard ProductCard component
  - Sort options: Newest, Price, Popular
- Stats bar: a small horizontal bar showing: "XX Works · Since 20XX · Featured in X Collections" — sans-serif, 14px, muted, with thin vertical dividers between stats
- "More Artists" section at bottom: horizontal scroll of 4 other artist cards (linking to their profiles)

Use mock artist and product data. Make sure artist → product relationships work via the data-utils helpers.
```

---

### PROMPT 13 — Journal/Blog & About Page

```
Build the content pages for ARTHAUS.

JOURNAL PAGE (src/app/journal/page.tsx):
- Page title: "The Art Journal" — serif, 48px, centered
- Subtitle: "Insights, interviews, and inspiration" — sans-serif, 14px, muted
- Create 6 mock blog posts in src/data/journal.ts:
  1. "How to Choose Art for Your Living Room" (Art Guide)
  2. "Behind the Lens: A Conversation with [Artist Name]" (Artist Interview)
  3. "The Rise of Minimalist Art in Modern Homes" (Trend Report)
  4. "Framing 101: A Complete Guide to Custom Framing" (Guide)
  5. "5 Emerging Artists to Watch in 2025" (Feature)
  6. "The Art of the Gallery Wall: Layout Tips & Tricks" (Guide)
  Each with: title, slug, excerpt, category, author, date, reading_time, hero_image (picsum), body (3-4 paragraphs of realistic lorem text about art)

- Featured article: top of page, full-width hero image (50vh) with overlay text (title, category tag, reading time, date). Links to article page.
- Below: 2-column grid of remaining articles. Each card:
  - Image (16:9 ratio), category pill tag overlaid on image top-left
  - Title (serif, 20px), excerpt (2 lines, sans-serif, 14px, muted), date + reading time
  - Hover: image scales 1.03x, title color shifts to gold
- Category filter tabs: "All", "Art Guides", "Artist Interviews", "Trend Reports"

JOURNAL ARTICLE PAGE (src/app/journal/[slug]/page.tsx):
- Clean reading layout: max-width 720px, centered
- Top: category tag (gold pill), title (serif, 40px), author + date + reading time, hero image (full content width)
- Body: well-spaced paragraphs (sans-serif, 17px, 1.8 line-height, dark text)
- Pull quote blocks: indented, large serif italic, gold left border (4px)
- Inline "Shop This Look" cards within articles: small product card (thumbnail + title + price + "Add to Cart") styled as a subtle insert within the article flow
- Bottom: share buttons (Copy Link, Pinterest, X) + "Related Articles" (3 cards)

ABOUT PAGE (src/app/about/page.tsx):
- Hero: full-width image (gallery/studio aesthetic) with centered overlay text: "About ARTHAUS" — serif, 56px, white
- "Our Story" section: 2-column (image left, text right). Write compelling brand story copy about ARTHAUS being founded to make gallery-quality art accessible to everyone. 3 paragraphs.
- "Our Values" section: 3-column grid with icons:
  - "Curated Quality" (diamond icon) — every piece is hand-selected
  - "Artist First" (palette icon) — fair compensation and collaboration
  - "Sustainable" (leaf icon) — eco-friendly materials and carbon-neutral shipping
  Each value: icon (lucide-react), title (serif, 20px), description (2 lines, sans-serif)
- "Art Consulting" teaser section for B2B: dark background, headline "Art for Commercial Spaces", description of corporate art consulting service, "Get in Touch →" CTA
- Team section (optional): 3 team member cards with photos, names, titles

Ensure all pages have proper metadata and follow the site's design language.
```

---

### PROMPT 14 — Search Overlay & 404 Page

```
Build the search experience and error pages for ARTHAUS.

FULL-SCREEN SEARCH OVERLAY (src/components/shared/SearchOverlay.tsx):
- Triggered by clicking the search icon in the Header
- Opens as a full-screen overlay:
  - Background: near-black (rgba(10,10,10,0.97))
  - Framer Motion: fades in (200ms), content slides down from top
- Close button (X) top-right, white, also closes on Escape key
- Large centered search input:
  - No visible border/background — just large white text (serif, 36px desktop, 24px mobile) with a blinking cursor
  - Placeholder: "Search artworks, artists, collections..." in white/30%
  - Auto-focus on open
- BEFORE TYPING:
  - "Trending" section: 4-5 trending search terms as clickable pills (e.g., "Abstract", "Botanical", "Black & White", "Under $50", "New Arrivals")
  - "Popular Colors" row: 6 color swatches (same as shop color filter) — clicking searches by color
- AS USER TYPES (instant results):
  - Results grouped in sections with headers:
    - "Artworks" — up to 4 results, each: small thumbnail + title + artist + price (horizontal layout)
    - "Artists" — up to 2 results: portrait thumbnail + name + specialty
    - "Collections" — up to 2 results: hero thumbnail + title + work count
  - Matching text highlighted (bold or gold) in results
  - Use the searchProducts and other data-util functions for filtering
  - Results fade in as user types (debounce search by 200ms)
- NO RESULTS STATE:
  - "We couldn't find that." — serif, 20px, white
  - "Here are today's staff picks:" — 4 featured/random product cards in a row below

- Keyboard nav: arrow keys to navigate results, Enter to select, Escape to close

404 PAGE (src/app/not-found.tsx):
- Full-viewport centered layout
- A large decorative SVG illustration — either abstract shapes or a minimal line drawing of an empty picture frame
- Headline: "This room appears to be empty." — serif, 36px
- Subtitle: "The art you're looking for has moved or doesn't exist." — sans-serif, 16px, muted
- "Return to the Gallery" primary button (gold bg, black text)
- Below: "Or explore these instead:" — 3 random product cards from mock data in a row
- Subtle floating animation on the illustration (gentle up-down bob, CSS animation)

CONTACT PAGE (src/app/contact/page.tsx):
- Clean, simple layout, max-width 800px centered
- Left column: contact form (Name, Email, Subject dropdown [General, Order Inquiry, Art Consulting, Press, Other], Message textarea, Submit button)
- Right column: contact info (Email address, response time "We typically respond within 24 hours", social links, office hours)
- Form inputs: same floating-label style as checkout
- Success state: form replaced with "Thank you! We'll be in touch." + checkmark animation

Ensure the search overlay is accessible (focus trap while open, screen reader announcements for result count).
```

---

## PHASE 5: ROOM VISUALIZER & FRAMING STUDIO (Prompts 15–16)

---

### PROMPT 15 — Room Visualizer Tool

```
Build the Room Visualizer page for ARTHAUS at src/app/visualizer/page.tsx. This lets users preview artwork on walls.

PAGE LAYOUT:
- Title: "See It In Your Space" — serif, 36px
- Subtitle: "Choose a room setting and preview any artwork on the wall" — sans-serif, 14px, muted

MODE A — PRESET ROOMS (primary, build this):
- Room selector: horizontal row of 5 room style thumbnail cards at the top:
  - "Modern Living Room", "Scandinavian Bedroom", "Industrial Loft", "Classic Study", "Minimal Hallway"
  - Each: small room thumbnail (160x100px), name below, clickable
  - Active room: gold border, slightly enlarged
  - For room images, use picsum photos with specific seeds that look like interior rooms

- Main visualizer area (center, large — 70vh):
  - Display the selected room image as background
  - Overlay the selected artwork on the "wall area" of the room:
    - Position the artwork at a predefined area (e.g., centered, upper third of the room image)
    - The artwork should be draggable (mouse drag to reposition within the room)
    - Show artwork with a subtle drop shadow for realism
    - The artwork should be scaled proportionally based on the selected size option

- RIGHT SIDEBAR CONTROLS (300px):
  - "Select Artwork" dropdown/search:
    - Searchable dropdown of all products
    - Shows small thumbnail + title in dropdown
    - Defaults to a featured product or the product the user came from (if navigated from a PDP)
  - "Select Size" — same size options as PDP (8×10 through 30×40), changes artwork scale in the visualizer
  - "Frame" toggle — No Frame / add frame (shows frame color swatches if enabled)
  - Dimensions overlay toggle: shows a small dimension label (e.g., "24" × 36"") on the artwork in the visualizer
  - "Add to Cart" button — adds the currently configured product to cart
  - Price display: updates based on size + frame selections

- Mobile layout: controls move below the visualizer, room selector becomes horizontally scrollable

MODE B — UPLOAD YOUR ROOM (teaser only):
- Below the main visualizer, add a section:
  - "Want to try your own space?" — serif, 24px
  - Description: "Upload a photo of your wall for a personalized preview"
  - Upload button with drag-and-drop zone (dashed border, icon)
  - Label: "Coming Soon" badge on this section — make it non-functional but visually present
  - This can be built out later when backend image processing is added

SHARING:
- "Save Visualization" button — generates a screenshot/snapshot (use html2canvas or dom-to-image if possible, otherwise just show a styled mock)
- "Share" button with copy-link functionality

Make the room selection and artwork switching feel smooth with crossfade transitions (Framer Motion AnimatePresence). The draggable artwork should use Framer Motion drag with constraints (stay within the room image bounds).
```

---

### PROMPT 16 — Framing Configurator

```
Build the standalone Framing Configurator page at src/app/framing/page.tsx. This is a premium frame customization experience.

PAGE HEADER:
- Title: "The Frame Studio" — serif, 40px
- Subtitle: "Design the perfect frame for your artwork" — sans-serif, 14px, muted

LAYOUT: Two-column — left 55% = live preview, right 45% = configurator steps

LEFT — LIVE PREVIEW PANEL:
- Large artwork preview showing the selected piece in the configured frame + mat combination
- The preview should dynamically compose:
  - Outer frame border (colored to match selected frame material, appropriate width: thin for modern, thicker for classic)
  - Mat area (colored to match selected mat, visible between frame and art — width proportional to selected size)
  - Artwork image centered within the mat
  - Build this as a CSS composition using nested divs with borders/backgrounds, not pre-rendered images
- Shadow under the frame for depth (box-shadow with spread)
- Below preview: dimension label "24" × 36" framed (28" × 40" with mat)" showing both art and total framed size
- Preview should update in real-time with smooth transitions as user changes options

RIGHT — STEP-BY-STEP CONFIGURATOR:
- Step indicator breadcrumbs: "Artwork → Size → Frame → Mat → Glass → Review"
- Active step highlighted in gold, completed steps have checkmarks

STEP 1 — SELECT ARTWORK:
- Grid of 6 popular artwork thumbnails to choose from (or search bar to find any)
- Selected artwork: gold border, checkmark overlay
- "Next →" button

STEP 2 — CHOOSE SIZE:
- Vertical list of size options as cards:
  - Each card: size name, dimensions, base print price
  - Visual scale indicator showing relative sizes (small bar chart or silhouette comparison)
- Selected: gold left border accent
- "Next →" button

STEP 3 — CHOOSE FRAME:
- 6 frame options displayed as large swatches/cards:
  - Each: color swatch circle (60px) + frame name + material description + price adder
  - Classic Black, Gallery White, Natural Oak, Dark Walnut, Brushed Gold, Raw Aluminum
- Selected: gold ring around swatch, card highlighted
- Preview updates on the left as each frame is selected

STEP 4 — CHOOSE MAT:
- 4 options: No Mat, White, Off-White, Black
- Color swatches with names
- Show mat width options if mat selected: Standard (2"), Wide (3"), Extra Wide (4") — each affects preview proportions

STEP 5 — CHOOSE GLASS:
- 3 options displayed as info cards:
  - "Standard Glass" — included, basic protection
  - "Non-Glare Glass" — +$20, reduces reflections (recommended)
  - "Museum Glass" — +$60, UV protection, archival quality, 99% UV block
- Each card: name, price, brief description, recommended badge on Non-Glare

STEP 6 — REVIEW:
- Full summary of all selections:
  - Artwork title + thumbnail
  - Size selected
  - Frame + Mat + Glass
  - Itemized pricing: Print ($XX) + Frame ($XX) + Mat ($XX) + Glass ($XX) = Total ($XXX)
- "Add to Cart" button (gold, large)
- "Start Over" link to reset all selections

NAVIGATION:
- "← Back" and "Next →" buttons on each step
- Step breadcrumbs are clickable to jump between completed steps
- "Start Over" link always visible at top
- Running total price visible at bottom of the right column, updating at every step

Use React state to manage all selections. Framer Motion for step transitions (slide left/right between steps). Ensure the preview panel is sticky on desktop so it's always visible while scrolling through options.
```

---

## PHASE 6: ACCOUNT, WISHLIST & POLISH (Prompts 17–20)

---

### PROMPT 17 — User Account Dashboard

```
Build the account section for ARTHAUS at src/app/account/.

ACCOUNT LAYOUT (src/app/account/layout.tsx):
- Left sidebar navigation (220px, desktop only — becomes top tabs on mobile):
  - "My Gallery" (dashboard icon)
  - "Orders" (package icon)
  - "Wishlist" (heart icon)
  - "Saved Rooms" (image icon)
  - "Settings" (gear icon)
  - Active link: gold text + gold left border accent
- Right: content area for each sub-page

DASHBOARD (src/app/account/page.tsx):
- Welcome: "Welcome back, [Name]" — serif, 28px
- Quick stats row: 3 cards — "X Orders", "X Saved Works", "X Collections Followed" — each with icon, number, label
- "Recent Orders" — show last 2 orders (small cards with order #, date, total, status badge, "View Details" link)
- "Your Wishlist Preview" — show first 4 wishlist items as small thumbnails in a row, "View All →" link
- "Recommended For You" — 4 product cards based on "browsing history" (just random featured items for now)

ORDERS PAGE (src/app/account/orders/page.tsx):
- Table/list of orders:
  - Order # | Date | Items (count) | Total | Status (badge: Processing/Shipped/Delivered) | "View" link
- Order detail view: expanded card or sub-page showing:
  - All items with thumbnails, titles, sizes, frame options, prices
  - Shipping address, shipping method
  - Tracking number link (placeholder)
  - "Reorder" button (adds same items to cart)
- Empty state: "No orders yet. Start your collection →" with link to shop
- Create 2 mock orders in src/data/orders.ts

WISHLIST PAGE (src/app/account/wishlist/page.tsx):
- Grid of saved artwork (3-col desktop, 2-col tablet)
- Each item: ProductCard component + "Add to Cart" button overlay + "Remove" (X) button
- Wishlist state: create a useWishlist hook with add/remove/check functions, persisted in localStorage
- Empty state: "Your wishlist is empty. Browse art that speaks to you →"
- Connect the wishlist heart buttons throughout the site (PDP, ProductCard hover, Cart drawer) to this state

SETTINGS PAGE (src/app/account/settings/page.tsx):
- Sections: Personal Info (name, email — editable form), Shipping Addresses (list + add new), Password Change, and Preferences (favorite styles checkboxes, email notification toggles)
- All forms use the same floating-label input style as checkout
- Save button for each section

Since there's no real auth, create a mock user context (src/lib/user-context.tsx) with a hardcoded user profile. Add a simple "login" state toggle — when logged out, account pages show a login/signup form instead.
```

---

### PROMPT 18 — Wishlist, Recently Viewed & Persistent State

```
Enhance ARTHAUS with cross-site persistent features that make the shopping experience feel personalized.

1. WISHLIST SYSTEM (if not already built, enhance it):
- Global wishlist state via React Context (src/lib/wishlist-context.tsx)
- Persisted in localStorage (key: "arthaus_wishlist")
- Integrate the wishlist heart button into:
  - ProductCard component (hover state): clicking heart toggles wishlist status, filled heart = saved, outline = not saved
  - PDP page: "♡ Save to Wishlist" / "♥ Saved" toggle button
  - CartDrawer: small heart icon on each item
- Heart animation on toggle: scale bounce (1 → 1.3 → 1, 300ms spring) with gold color fill
- Toast notification: "Added to wishlist" / "Removed from wishlist"
- Wishlist count badge on the header heart icon (same style as cart badge)

2. RECENTLY VIEWED:
- Track recently viewed products in localStorage (key: "arthaus_recently_viewed")
- Store last 12 product IDs (no duplicates, most recent first)
- Create a RecentlyViewed component (src/components/shared/RecentlyViewed.tsx):
  - Horizontal scrollable strip of small product thumbnails (80px squares)
  - Shows on PDP pages (below "Complete the Wall" section)
  - Shows on account dashboard
  - Title: "Recently Viewed" — sans-serif, 14px, uppercase, muted
- Add tracking: whenever a PDP is loaded, add that product to recently viewed

3. QUICK VIEW MODAL (src/components/shop/QuickViewModal.tsx):
- Triggered by "Quick View" (eye icon) on ProductCard hover
- Opens a centered modal (not full-page navigation):
  - Backdrop blur + dark overlay
  - Modal content: simplified PDP layout in a card (max-width 900px)
    - Left: artwork image (large)
    - Right: title, artist, price, size selector (simplified — just buttons), "Add to Cart" button, "View Full Details →" link
  - Close button (X) + close on backdrop click + close on Escape
  - Framer Motion: scale 0.95 + opacity 0 → scale 1 + opacity 1

4. BACK TO TOP BUTTON:
- Floating button, bottom-right corner
- Appears after scrolling 600px down
- Thin circle with up-arrow icon, gold color
- Smooth scroll to top on click
- Framer Motion: fade in/out based on scroll position

5. COOKIE CONSENT BANNER (src/components/shared/CookieConsent.tsx):
- Fixed to bottom of viewport on first visit
- Clean design: dark bar with text "We use cookies to enhance your experience." + "Accept" button (gold) + "Preferences" link
- On accept: hide banner, save preference in localStorage
- Framer Motion: slides up from bottom on mount, slides down on dismiss

Make sure all localStorage keys are prefixed with "arthaus_" and handle cases where localStorage is unavailable (SSR, private browsing).
```

---

### PROMPT 19 — Performance Optimization & Image Loading

```
Optimize ARTHAUS for production-grade performance. Target: Lighthouse 90+ on all metrics.

1. IMAGE OPTIMIZATION:
- Create an OptimizedImage component (src/components/ui/OptimizedImage.tsx):
  - Uses Next.js <Image> component under the hood
  - Props: src, alt, width, height, priority (boolean), className
  - Blur-up placeholder: generate a low-quality base64 placeholder (use a solid color or gradient matching the artwork's dominant_color for now — in production this would be a tiny blurred preview)
  - blurDataURL using the product's dominant_color as a solid color placeholder
  - Lazy loading by default (priority=true only for above-fold images)
  - Proper sizes attribute: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" (adjust per usage context)
- Replace ALL <img> tags and picsum references with OptimizedImage throughout the project
- Add loading="lazy" to any non-Next images

2. SKELETON LOADING STATES:
- Create skeleton components (src/components/ui/Skeleton.tsx):
  - ProductCardSkeleton: mimics exact card dimensions with shimmer animation (linear-gradient moving left-to-right, CSS animation)
  - ArticleSkeleton, ArtistCardSkeleton
  - Generic Skeleton component (width, height, rounded props) for flexible use
- Add skeletons to: shop page grid (show 12 skeletons while "loading"), search results, collection pages, and any data-dependent section

3. CODE SPLITTING & LAZY LOADING:
- Lazy load heavy components using next/dynamic:
  - CustomCursor (no SSR)
  - SearchOverlay (loaded on demand when search is clicked)
  - CartDrawer (loaded on demand)
  - QuickViewModal (loaded on demand)
  - Room Visualizer (loaded on demand)
  - Framing Configurator steps
- Use dynamic(() => import(...), { ssr: false }) for components that use window/document

4. ANIMATION PERFORMANCE:
- Add reduced-motion media query support:
  - Create a useReducedMotion hook
  - When prefers-reduced-motion is set: disable all parallax, disable Ken Burns zoom, disable custom cursor, simplify page transitions to instant cuts, keep only essential opacity transitions
- Ensure all Framer Motion animations use transform and opacity only (GPU-accelerated, no layout thrashing)
- Add will-change: transform to parallax elements

5. SEO:
- Add metadata to every page using Next.js Metadata API:
  - Title, description, OG title/description/image, Twitter card
  - PDP pages: dynamic metadata from product data (title: "[Product] by [Artist] | ARTHAUS", description from product description)
  - Use generateMetadata for dynamic routes
- Add JSON-LD structured data to PDP pages (Product schema):
  - name, image, description, brand, offers (price, availability, currency)
- Create a dynamic sitemap at src/app/sitemap.ts listing all static pages + all product slugs + collection slugs + artist slugs
- Add robots.txt at public/robots.txt

6. FONT OPTIMIZATION:
- Use next/font for Google Fonts (Cormorant Garamond + DM Sans or your chosen body font)
- Use display: swap for fonts
- Preload the primary weights (400, 600 for serif; 400, 500 for sans)
- Subset fonts to latin if possible

Run the dev server and verify: fast page loads, no layout shift from images, smooth scrolling, working skeletons, proper meta tags in page source.
```

---

### PROMPT 20 — Responsive Polish & Cross-Browser Testing

```
Do a comprehensive responsive and polish pass across the entire ARTHAUS site. Go through every page and component to ensure pixel-perfect quality at all breakpoints.

BREAKPOINTS TO TEST:
- 375px (iPhone SE/small phones)
- 390px (iPhone 14)
- 768px (iPad portrait)
- 1024px (iPad landscape / small laptops)
- 1280px (standard desktop)
- 1440px (design max-width)

FOR EACH PAGE, CHECK AND FIX:

HOMEPAGE:
- Hero text sizing: 72px → 48px → 36px as viewport shrinks
- Horizontal scroll strip: cards should be touch-scrollable on mobile, no horizontal page overflow
- Bento grid: collapse from multi-col to single-col, maintain visual balance
- Category tiles: 3-col → 2-col → 1-col
- Room visualizer teaser: split → stacked
- Artist spotlight: side-by-side → stacked (portrait on top)
- Newsletter input: inline layout → stacked on mobile
- All section padding: 120px desktop → 80px tablet → 60px mobile

SHOP PAGE:
- Filter sidebar: desktop sidebar → mobile slide-in drawer with "Filter" toggle button
- Active filter pills: horizontally scrollable on mobile
- Product grid: 3-col → 2-col → 1-col
- Sort dropdown: full-width on mobile

PDP:
- Two-column → stacked (image on top, info below)
- Thumbnail strip: horizontal scroll on mobile
- Size selector cards: wrap to 2 columns on small screens
- Frame swatches: scrollable row if they overflow

CHECKOUT:
- Two-column → stacked (summary at top, collapsible)
- Form inputs: all full-width on mobile
- Step indicator: compressed on mobile (show numbers only, not full text)

GLOBAL:
- Header: verify hamburger menu works perfectly on mobile
- Footer: 4-col → 2-col → 1-col
- Cart drawer: full-width on mobile
- Search overlay: input text size down to 24px on mobile
- Custom cursor: hidden on touch devices (verify)
- All buttons: minimum 44px tap target on mobile
- No horizontal scroll/overflow anywhere
- Text doesn't overflow containers

TYPOGRAPHY POLISH:
- Ensure serif headings look elegant at every size
- Body text: 16px minimum on all screens
- Line heights: generous (1.6 body, 1.2 headings)
- Letter spacing on uppercase text is consistent

ANIMATION POLISH:
- Scroll reveals don't trigger too early on mobile (adjust threshold)
- Page transitions are smooth (test navigation between pages)
- No animation jank on lower-power devices (test performance tab)

Open every page in the Antigravity browser at each breakpoint and fix any issues you find. Make the site feel premium and polished at every screen size.
```

---

## PHASE 7: ADVANCED FEATURES (Prompts 21–23)

---

### PROMPT 21 — Email Signup & FAQ/Shipping Pages

```
Build the remaining utility pages and enhance the newsletter system for ARTHAUS.

FAQ PAGE (src/app/faq/page.tsx):
- Title: "Frequently Asked Questions" — serif, 40px
- Organized in collapsible accordion sections by topic:

  ORDERING & PAYMENT (4 questions):
  - "What payment methods do you accept?"
  - "Can I modify or cancel my order?"
  - "Do you offer gift cards?"
  - "Is there a minimum order amount?"

  SHIPPING & DELIVERY (5 questions):
  - "Where do you ship?"
  - "How long does shipping take?"
  - "How much does shipping cost?"
  - "Do you offer expedited shipping?"
  - "How can I track my order?"

  FRAMING (4 questions):
  - "What frame materials do you offer?"
  - "What type of glass options are available?"
  - "How do I choose the right frame size?"
  - "Can I get a frame without a mat?"

  PRINTS & QUALITY (3 questions):
  - "What paper/canvas do you print on?"
  - "Are the colors accurate to what I see online?"
  - "Do limited edition prints come with a certificate?"

  RETURNS & EXCHANGES (3 questions):
  - "What is your return policy?"
  - "How do I initiate a return?"
  - "Do you offer exchanges?"

- Write realistic, helpful answer text for each (3-5 sentences each)
- Accordion behavior: click question to expand/collapse, only one open at a time (or all can be open — your choice)
- Smooth height animation on expand/collapse (Framer Motion, animating height auto)
- Search bar at top: filter FAQ questions as user types
- Bottom CTA: "Still have questions? Contact us →" linking to contact page

SHIPPING & RETURNS PAGE (src/app/shipping/page.tsx):
- Clean information page with sections:
  - Shipping rates table (domestic, international)
  - Delivery timeframes by method
  - Packaging description (how art is protected)
  - Returns policy (30-day, condition requirements)
  - Return process steps
  - Refund timeline
- Use a clean, readable layout with the sans-serif body font, generous spacing

SIZE GUIDE PAGE (src/app/size-guide/page.tsx):
- Visual guide showing all available print sizes
- Create an SVG or CSS illustration showing each size drawn to scale relative to a sofa/person silhouette
- Table: Size name, Dimensions (inches + cm), Recommended for (room type/wall size), Price range
- Tips section: "How to Measure Your Wall", "Choosing the Right Size"

NEWSLETTER ENHANCEMENT:
- Make the newsletter signup form functional (client-side only for now):
  - On submit: validate email format, show success state "Welcome to the gallery ✓", store email in localStorage to prevent re-showing
  - If already subscribed: show "You're already on the list!" message
- Add a newsletter popup (src/components/shared/NewsletterPopup.tsx):
  - Triggers after 30 seconds on site OR on scroll past 50% of any page (whichever comes first)
  - Only shows once per session (tracked in sessionStorage)
  - Modal overlay: artwork image left side, signup form right side
  - Headline: "Get 10% Off Your First Order"
  - Email input + "Subscribe" button
  - Close button + "No thanks" text link
  - Framer Motion: fade in + scale up from center
```

---

### PROMPT 22 — Gallery Walk Mode & Dark Mode Toggle

```
Build two premium features for ARTHAUS:

FEATURE 1 — GALLERY WALK MODE (src/components/shared/GalleryWalk.tsx):
- Accessible from a "Gallery Walk" button in the main nav or as a floating action button on the shop/gallery pages
- Full-screen immersive slideshow experience:
  - Background: pure black
  - Current artwork displayed at maximum size (centered, contain-fit, with generous padding)
  - Below artwork: title (serif, white, 24px), artist name (sans-serif, white/60%, 14px), price (gold, 16px)
  - Controls:
    - Left/right arrow buttons (thin, minimal, edges of screen) for navigation
    - Keyboard support: Left/Right arrows, Escape to exit
    - Small dots or "3 / 24" counter at bottom center
    - Close button (X) top-right
    - "Add to Cart" button (small, bottom-right, gold outlined)
    - Auto-play toggle: advances every 6 seconds if enabled
  - Transitions between artworks: smooth crossfade (600ms)
  - On mobile: swipe left/right to navigate
  - Can be launched from: shop page (walks through filtered results), collection page (walks through collection), or artist page (walks through their works)
  - Pass an array of product IDs to determine the walk sequence
- The experience should feel like being in a dark gallery with a spotlight on each piece

FEATURE 2 — DARK MODE:
- Add a dark mode toggle to the site (sun/moon icon in the header, next to the other utility icons)
- Create a theme context (src/lib/theme-context.tsx):
  - Default: light mode
  - Persisted in localStorage (key: "arthaus_theme")
  - Respects system preference via prefers-color-scheme media query on first visit
- Dark mode color mapping (update CSS variables):
  - Background: #0A0A0A (near-black) instead of #FAF8F5
  - Text: #FAF8F5 (off-white) instead of #0A0A0A
  - Card backgrounds: #1A1A1A
  - Borders: #2A2A2A
  - Muted text: #8A8A8A
  - Gold accent: remains #C5A572 (works on both backgrounds)
  - Footer: #050505 (slightly darker than page bg)
- Use CSS variables + data-theme attribute on <html>:
  - [data-theme="dark"] { --bg: #0A0A0A; --text: #FAF8F5; ... }
- Smooth transition on theme switch: transition all colors over 300ms
- Toggle icon: animated morph between sun and moon (Framer Motion)
- Ensure ALL components look correct in dark mode:
  - Product cards, modals, checkout forms, FAQ accordions, filter sidebar
  - Image backgrounds should have dark borders/shadows adjusted
  - No white flashes on page load (set theme before first paint)

Test both features thoroughly. Gallery Walk should work with keyboard navigation. Dark mode should have no contrast issues or broken components.
```

---

### PROMPT 23 — Final Integration, Animations & Bug Fixes

```
Do a final integration pass on the entire ARTHAUS project. This is the polish and bug-fix round.

1. NAVIGATION & LINKING:
- Verify EVERY link across the site works correctly:
  - Header nav links → correct pages
  - Product cards → /shop/[slug]
  - Artist links → /artists/[slug]
  - Collection links → /gallery/[slug]
  - All "View All" and "Explore" CTAs → correct destinations
  - Breadcrumbs on every page → correct hierarchy
  - Footer links → all working
  - Account nav → all sub-pages
- Back button behavior works correctly (browser history)
- Active state highlighting on nav links matches current page

2. ANIMATION CONSISTENCY:
- Ensure ALL scroll reveal animations use consistent timing:
  - Duration: 600ms
  - Easing: cubic-bezier(0.16, 1, 0.3, 1)
  - Offset: translateY(30px) → translateY(0)
  - Stagger for grids: 80ms per item
- Page transitions work on every route change
- No animation conflicts or double-triggering
- Hover states are consistent: all links use the same underline-draw animation, all buttons use the same hover darkening, all cards use the same lift effect

3. CART INTEGRATION:
- "Add to Cart" works from: PDP, Quick View Modal, Room Visualizer, Framing Configurator, Wishlist page, Recently Viewed, and product recommendations
- Cart badge updates immediately everywhere
- Cart drawer opens automatically after adding an item (with a brief delay — 300ms)
- Removing last item shows empty cart state
- Quantity changes recalculate totals immediately

4. DATA CONSISTENCY:
- All product → artist references resolve correctly (no broken artist links)
- All collection → product references show correct products
- Related products actually show related items (same category or artist)
- Search returns relevant results for common terms
- Color filter shows sensible results

5. VISUAL CONSISTENCY:
- All headings use the serif font (Cormorant Garamond)
- All body text uses the sans-serif font
- Gold accent (#C5A572) used consistently for: active states, badges, CTAs, accents
- Consistent border radius: 4px for cards, 8px for portraits, 999px for pills/badges
- Consistent shadow usage: cards have subtle shadows, modals have deeper shadows

6. ACCESSIBILITY FINAL CHECK:
- Tab through the entire site — focus indicators visible on all interactive elements
- All images have descriptive alt text (format: "[Artwork Title] by [Artist Name]")
- Modal focus trapping (search overlay, quick view, cart drawer, mobile menu)
- ARIA labels on icon-only buttons (search, cart, wishlist, menu toggle)
- Color contrast: verify gold (#C5A572) on both light and dark backgrounds meets 4.5:1 ratio — if not, darken for text usage to #9A8654

7. EMPTY/EDGE STATES:
- Empty cart shows proper empty state
- Empty wishlist shows proper empty state  
- Empty search results shows staff picks
- 404 page renders for any invalid route
- Products with no frame options hide the frame selector on PDP
- Limited edition products show remaining count

Run through every page one more time in the Antigravity browser. Fix any remaining visual issues, broken interactions, or console errors. The site should feel cohesive, fast, and polished.
```

---

## PHASE 8: LAUNCH PREP (Prompts 24–25)

---

### PROMPT 24 — README, Documentation & Environment Setup

```
Create comprehensive documentation for the ARTHAUS project.

1. README.md (root):
- Project title, description, and a brief feature list
- Tech stack summary
- Prerequisites (Node.js version, npm/yarn)
- Getting started: clone, install, run dev server, build for production
- Project structure overview (folder tree with descriptions)
- Environment variables needed (list with descriptions, even if not yet connected):
  - NEXT_PUBLIC_SITE_URL
  - NEXT_PUBLIC_STRIPE_KEY
  - STRIPE_SECRET_KEY
  - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  - SANITY_PROJECT_ID (future CMS)
  - ALGOLIA_APP_ID + ALGOLIA_SEARCH_KEY (future search)
  - PRINTFUL_API_KEY (future fulfillment)
- Deployment instructions (Vercel recommended)
- License

2. .env.example:
- All environment variables with placeholder values and comments

3. Create a ARCHITECTURE.md:
- High-level architecture diagram description (component tree, data flow)
- State management approach (React Context for cart, wishlist, theme, user)
- Folder structure rationale
- Styling approach (Tailwind + CSS variables + Framer Motion)
- Data fetching strategy (currently mock data, designed for easy swap to CMS/API)
- Notes on how to swap mock data for real backend:
  - Replace src/data/ imports with API calls
  - Where to add Sanity/Strapi client
  - Where to add Stripe integration
  - Where to add Algolia search

4. Create a SCALING.md:
- Guide for scaling from 24 mock products to 200+ real products
- CMS setup recommendations (Sanity schema that matches the TypeScript types)
- Image pipeline: upload art → auto-extract dominant color → generate blur placeholder → serve via CDN
- Dropship integration: API flow for order forwarding to Printful/Printify
- Search: how to index products in Algolia with the existing data schema
- Email marketing: Klaviyo webhook integration points
- Analytics: GA4 event tracking recommendations (view_item, add_to_cart, purchase)

5. Verify the project builds without errors:
   - Run `npm run build` (or equivalent)
   - Fix any TypeScript errors
   - Fix any build warnings
   - Ensure all pages are statically generatable or properly configured for SSR
```

---

### PROMPT 25 — Production Build & Deployment Setup

```
Prepare ARTHAUS for production deployment.

1. NEXT.JS CONFIG OPTIMIZATION (next.config.js):
- Enable image optimization with configured domains (picsum.photos for now)
- Enable SWC minification
- Set output: 'standalone' if deploying to Docker, or leave default for Vercel
- Add security headers:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: origin-when-cross-origin
  - Content-Security-Policy (basic policy allowing self, fonts, images)
- Enable gzip/brotli compression

2. FAVICON & BRAND ASSETS:
- Create a minimal favicon set in /public:
  - favicon.ico (16x16 and 32x32)
  - apple-touch-icon.png (180x180)
  - Create these as simple SVGs: the letter "A" in the serif font (Cormorant Garamond) on a dark background, or a minimal abstract mark
- OG image: create a default social sharing image (1200x630) — dark background with "ARTHAUS" centered in serif type + tagline
- Add these to the root layout metadata

3. SITEMAP & ROBOTS:
- Verify src/app/sitemap.ts generates all URLs:
  - Static: /, /shop, /gallery, /artists, /journal, /about, /contact, /faq, /shipping, /size-guide, /framing, /visualizer
  - Dynamic: /shop/[slug] for all products, /gallery/[slug] for collections, /artists/[slug] for artists, /journal/[slug] for articles
- robots.txt: allow all, reference sitemap URL

4. ERROR HANDLING:
- Global error boundary (src/app/error.tsx): friendly error page with "Something went wrong" message and "Go Home" button
- Loading states (src/app/loading.tsx): full-page skeleton or centered spinner with ARTHAUS logo

5. ANALYTICS PLACEHOLDERS:
- Create src/lib/analytics.ts with stub functions:
  - trackPageView(page)
  - trackEvent(eventName, params) — for add_to_cart, purchase, search, wishlist_add, etc.
  - trackEcommerce(action, items) — for enhanced ecommerce events
- Call these functions in relevant places (PDP view, add to cart, checkout steps)
- These are empty functions now — ready to wire up to GA4/Plausible/Hotjar

6. FINAL BUILD CHECK:
- Run `npm run build` — fix all errors and warnings
- Run `npm run start` — verify production mode works
- Test every page loads in production build
- Verify no console errors or warnings
- Check that all fonts load correctly (no FOUT/FOIT issues)
- Verify metadata appears correctly in page source for every page type

7. DEPLOYMENT:
- Create a vercel.json (if needed) with:
  - Build command
  - Output directory
  - Region preference
  - Any rewrites/redirects needed
- OR create a Dockerfile for container deployment
- Add a GitHub Actions CI workflow (.github/workflows/ci.yml):
  - On push to main: install deps → lint → type-check → build
  - Basic quality gate before deployment

The project should now be ready to deploy to Vercel with a single `vercel` command or git push. All the infrastructure is in place for a real launch — mock data just needs to be swapped for real CMS data and payment processing.
```

---

## USAGE TIPS FOR ANTIGRAVITY

**After completing all 25 prompts, you'll have:**
- A complete 18+ page art e-commerce website
- 24 mock products (scalable to 200+)
- Full shopping flow: browse → filter → view → configure frame → cart → checkout
- Interactive features: room visualizer, framing studio, gallery walk mode
- Dark mode, wishlist, recently viewed, search
- SEO, performance optimization, and deployment-ready config

**Recommended commit strategy:**
- Commit after each Phase (1-8)
- Tag major milestones: v0.1 (scaffold), v0.2 (homepage), v0.3 (shop), v0.4 (content), v0.5 (features), v1.0 (launch-ready)

**If Antigravity struggles with a prompt:**
- Break it further: take the sub-sections within a prompt and feed them individually
- Use "Continue from where you left off" if it hits a context limit
- Reference specific file paths when asking for fixes: "Fix the hover animation in src/components/shop/ProductCard.tsx"

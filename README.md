# ARTHAUS

A premium art e-commerce platform for discovering, framing, and purchasing fine art prints from independent artists worldwide.

## Tech Stack

- **Next.js 16** — App Router, server components, image optimisation
- **React 19** — Latest concurrent features
- **TypeScript** — Full type safety across the codebase
- **Tailwind CSS v4** — Utility-first styling with custom design tokens
- **Framer Motion v12** — Page transitions, micro-animations, and gallery effects
- **lucide-react** — Consistent icon set

## Prerequisites

- Node.js 18+
- npm

## Getting Started

```bash
git clone https://github.com/your-org/arthaus.git
cd arthaus
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/           # Next.js App Router pages and layouts
├── components/
│   ├── layout/    # Header, Footer, ClientLayout, PageTransition
│   ├── shared/    # Reusable UI: GalleryWalk, NewsletterPopup, SearchOverlay, etc.
│   ├── shop/      # Product cards, cart drawer, filters
│   └── home/      # Landing page sections
├── data/          # Static data: products, artists, collections, journal posts
├── lib/           # Context providers (cart, wishlist, theme) and utilities
├── types/         # Shared TypeScript interfaces and enums
└── public/        # Static assets
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public base URL (e.g. `https://arthaus.com`) |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image hosting |
| `SANITY_PROJECT_ID` | Sanity CMS project ID |
| `SANITY_DATASET` | Sanity dataset name (e.g. `production`) |
| `SANITY_API_TOKEN` | Sanity API token |
| `ALGOLIA_APP_ID` | Algolia application ID |
| `ALGOLIA_SEARCH_KEY` | Algolia search-only API key |
| `ALGOLIA_ADMIN_KEY` | Algolia admin API key |
| `PRINTFUL_API_KEY` | Printful fulfilment API key |
| `KLAVIYO_API_KEY` | Klaviyo email marketing API key |
| `KLAVIYO_LIST_ID` | Klaviyo subscriber list ID |

Copy `.env.example` to `.env.local` and fill in your values before running locally.

## Deployment

Deploy to Vercel with one click or using the Vercel CLI:

```bash
vercel
```

## License

MIT

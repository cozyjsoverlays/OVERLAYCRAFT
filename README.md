# ⚡ OverlayCraft.com

Premium digital storefront for **VectorKingStudio** — animated stream overlay
packages for Twitch, YouTube, Kick & TikTok Live. Star Seller · 1,300+ sales ·
4.9★ from 193 reviews · crafting since 2020.

**Brand: "Violet Arcana"** — an arcane violet atelier. Locked 4-color palette
(`abyss / volt / lilac / blush`), Cinzel + Outfit + JetBrains Mono, glass
cards, grain overlay, calm artisan motion.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS (brand tokens in [tailwind.config.ts](tailwind.config.ts)) + Framer Motion
- Typed product catalog in [src/data/products.ts](src/data/products.ts) (CMS/database-ready)
- Checkout: Lemon Squeezy hosted checkout links (merchant of record — VAT handled)
- Deploy target: Vercel

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Dropping in real content

1. **Catalog** — replace the 35 seed products in `src/data/products.ts` with the
   full 127-listing file (same `Product` shape, includes real `etsyUrl` per listing).
2. **Media** — drop assets at the paths the catalog expects:
   - `public/media/products/<slug>/preview.mp4` — looping animated preview
   - `public/media/products/<slug>/thumb-1.jpg … thumb-4.jpg` — screen stills
   - `public/media/showreel.mp4` + `showreel-poster.jpg` — home hero backdrop
   - `public/media/custom/…` — commission showcase & before/after images
3. **Email capture** — wire the footer form (`src/components/Footer.tsx`, TODO marked)
   to Kit/Mailchimp/etc.
4. **Commission intake** — wire `src/components/IntakeForm.tsx` (TODO marked) to an
   API route or email service (e.g. Resend).

## Lemon Squeezy integration

Every product's `lemonSqueezyUrl` is stubbed as `"LEMONSQUEEZY_URL"`. To go live:

1. Create a store at lemonsqueezy.com → **Products → New product** (digital file
   or license-less download), one per pack. Upload the .zip as the file — Lemon
   Squeezy delivers the download link after purchase automatically.
2. On each product: **Share → copy the hosted checkout link**
   (`https://<store>.lemonsqueezy.com/buy/<uuid>`).
3. Paste it into that product's `lemonSqueezyUrl` in `src/data/products.ts`.
4. The Buy button ([src/components/BuyButton.tsx](src/components/BuyButton.tsx))
   opens the link in a new tab; until a real URL is set it renders disabled with
   an Etsy hint. Test with Lemon Squeezy's test mode before switching the store live.

Optional later: swap links for the Lemon.js overlay checkout (`lemon.js` script +
`?embed=1`) without touching the catalog shape.

## Structure notes

- **No cart by design** — digital goods buy directly; `BuyButton` is the single
  purchase entry point, so a cart can be added behind it later.
- **Wishlist** — in-memory context ([src/components/WishlistProvider.tsx](src/components/WishlistProvider.tsx));
  add persistence (localStorage/DB) inside the provider only.
- **Marketplace-ready** — products carry `id`/`category[]`; a `sellerId` field and
  seller profile routes can be added without restructuring.
- **SEO** — per-page metadata, canonical URLs, JSON-LD Product schema on product
  pages, FAQPage schema on /faq, `sitemap.ts` + `robots.ts`, 150-word indexable
  category intros in [src/data/categories.ts](src/data/categories.ts).

# 🐾 CozyOverlays.com

A polished, Awwwards-style marketing site for **CozyJsStudio** — an Etsy shop selling animated stream overlay packs for Twitch, YouTube, Kick & TikTok. It's a storefront/landing page that drives traffic to Etsy listings (no cart, no checkout, no backend commerce — every "buy" action links out to Etsy).

## ✨ Features

- **Single long landing page** with smooth-scroll navigation + dedicated `/blog` routes
- Animated **aurora glow blobs**, **floating particles**, **glass-morphism cards**, gradient text, scroll-triggered reveals, shimmer pill buttons, and a full-page film-grain overlay
- **Filterable bestsellers grid** with hover video previews (`.webm` swap) and a lightbox modal
- Browse-by-animal categories, real Etsy reviews, How-It-Works, compatibility strip, custom commission CTA, About, tutorials, and an FAQ accordion
- **Real blog routes** under `/blog/[slug]` with full placeholder articles
- Fully responsive, accessible (semantic HTML, focus states, alt text), and respects `prefers-reduced-motion`
- SEO-ready: metadata, Open Graph + Twitter cards, dynamic favicon, `sitemap.xml`, `robots.txt`
- Remote Etsy images optimized via `next/image`

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (theme tokens for all colors)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [lucide-react](https://lucide.dev/) icons
- `next/font` for Poppins (weights 400–900)

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## 📁 Project Structure

```
src/
├── app/                # App Router pages, layout, SEO (robots, sitemap, icon)
│   ├── blog/           # /blog index + /blog/[slug] article routes
│   ├── layout.tsx      # Poppins font, metadata, OG tags, grain overlay
│   ├── page.tsx        # the single long landing page
│   └── globals.css     # theme tokens, grain, glow utilities
├── components/         # Nav, Hero, PackGrid, Lightbox, Footer, etc.
│   └── ui/             # Button, Reveal, AuroraBackground, Particles, SectionHeading
├── data/               # typed content — packs, reviews, categories, blog, site config
└── lib/                # shared types + helpers
```

All product, review, category, and blog content lives in `src/data/` as typed
data files and is mapped over in the components — edit those to update the site.

## 🎨 Design Tokens

Colors are defined once in `tailwind.config.ts` (and mirrored as CSS variables in
`globals.css`):

| Token | Value | Use |
| --- | --- | --- |
| `base` | `#0D0814` | Page background |
| `surface` / `surface-2` | `#130D26` / `#1A1230` | Cards & sections |
| `lavender` | `#B088FF` | Primary accent |
| `pink` / `cyan` | `#FF6BD6` / `#46E5FF` | Glow accents |
| `heading` / `body` / `muted` | `#F0ECFA` / `#C4BBD9` / `#8A82A0` | Text |

## 🌐 Deploying to Vercel

This project is deploy-ready. Push to a Git repo and import it at
[vercel.com/new](https://vercel.com/new) — no environment variables required.
Remote Etsy image hosts (`i.etsystatic.com`, `v.etsystatic.com`) are already
allow-listed in `next.config.mjs`.

> Update `SITE.url` in `src/data/site.ts` to your production domain so canonical
> URLs, the sitemap, and Open Graph tags resolve correctly.

---

© 2026 CozyOverlays / CozyJsStudio.

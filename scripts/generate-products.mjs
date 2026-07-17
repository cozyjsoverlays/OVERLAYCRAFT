/**
 * Generates src/data/products.ts from the harvested VectorKingStudio catalog
 * (scripts/vks-all.json — one entry per Etsy listing with title, section,
 * cover gallery and preview video).
 *
 * Usage: node scripts/generate-products.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(join(here, "vks-all.json"), "utf8"));
const items = Object.values(raw);

/* ── overrides: keep live site slugs + curated flags for established packs ── */
const OVERRIDES = {
  "4469704695": { slug: "dark-gothic-raven-animated-stream-package", bestseller: true, featured: true },
  "4472564937": { slug: "sakura-dream-wolf-overlay", featured: true },
  "4485199023": { slug: "midnight-magic-cat-overlay", featured: true },
  "4482566225": { slug: "cozy-fox-overlay-animated-stream-package", featured: true },
  "4463392476": { slug: "violet-night-dragon-overlay", featured: true },
  "4443777661": { slug: "red-moon-samurai-overlay", featured: true },
  "4446505271": { slug: "inferno-phoenix-overlay", featured: true },
  "4475723824": { slug: "sakura-dream-panda-overlay", featured: true },
  "4444846752": { slug: "moonlight-raven-overlay" },
  "4526236872": { slug: "blue-gothic-raven-overlay" },
  "4459949438": { slug: "crimson-dragon-overlay" },
  "4465990791": { slug: "shadow-dragon-overlay" },
  "4489189345": { slug: "cozy-dragon-overlay" },
  "4496826215": { slug: "mystic-moonlight-dragon-overlay" },
  "4368785854": { slug: "dark-purple-animated-stream-package" },
  "4407966245": { slug: "samurai-moon-overlay" },
  "4400794138": { slug: "red-moon-sakura-overlay" },
  "4425068448": { slug: "magical-night-cat-overlay" },
  "4497525766": { slug: "starry-wizard-cat-overlay" },
  "4495719095": { slug: "midnight-blood-moon-magic-cat-overlay" },
  "4510497649": { slug: "mystic-moonlight-snake-overlay" },
  "4496723571": { slug: "mystic-moonlight-wolf-overlay" },
  "4514145473": { slug: "mystic-moonlight-reaper-overlay" },
  "4433655101": { slug: "inferno-wolf-overlay" },
  "4449235212": { slug: "midnight-wolf-overlay" },
  "4467610756": { slug: "celestial-wolf-overlay" },
  "4393123797": { slug: "moonlight-wolf-overlay" },
  "4443170595": { slug: "inferno-lion-overlay" },
  "4491147427": { slug: "cozy-raccoon-overlay" },
  "4483478730": { slug: "cozy-panda-overlay" },
  "4464487916": { slug: "crimson-bloom-butterfly-overlay", price: 17.0, salePrice: 4.25 },
  "4396927979": { slug: "mystic-night-tiktok-overlay-package" },
  "4366382193": { slug: "halloween-animated-stream-package", price: 16.09, salePrice: 4.02 },
  "4499837996": { slug: "custom-twitch-overlay-full-stream-package", custom: true },
  "4496797837": { slug: "mystic-moonlight-dog-overlay", newDrop: true },
  "4491744993": { slug: "cozy-wolf-overlay", newDrop: true },
  "4365728007": { slug: "red-animated-stream-package" },
};

/* ── theme detection from titles (drives categories, tags, descriptions) ── */
const THEMES = [
  ["raven", "crow"], ["crow", "crow"], ["falcon", "crow"], ["hawk", "crow"],
  ["wolf", "wolf"], ["dragon", "dragon"], ["cat", "cat"], ["kitty", "cat"],
  ["panda", "panda"], ["fox", "fox"], ["phoenix", "phoenix"],
  ["samurai", "japanese"], ["ninja", "japanese"], ["sakura", "japanese"],
  ["snake", "gothic"], ["reaper", "gothic"], ["dog", "gothic"],
  ["raccoon", "cozy"], ["rabbit", "cozy"], ["bunny", "cozy"], ["frog", "cozy"],
  ["ghost", "cozy"], ["lion", "stream"], ["butterfly", "stream"],
  ["viking", "stream"], ["halloween", "seasonal"], ["christmas", "seasonal"],
  ["valentine", "seasonal"],
];

function themeOf(title) {
  const t = title.toLowerCase();
  for (const [word, cat] of THEMES) if (t.includes(word)) return { noun: word, cat };
  return { noun: "stream", cat: "stream" };
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function shortTitle(title) {
  return title.split(/[:|]/)[0].replace(/\s+/g, " ").trim();
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/* moods for description templates */
function moodOf(title, cats) {
  const t = title.toLowerCase();
  if (/(gothic|mystic|reaper|blood|dark|midnight|shadow|snake)/.test(t)) return "dark";
  if (/(cozy|kawaii|starry|dream|pinky|christmas|valentine)/.test(t)) return "cozy";
  if (/(inferno|crimson|red|fire)/.test(t)) return "fire";
  if (/(sakura|japanese|samurai|ninja|neon)/.test(t)) return "japanese";
  if (cats.includes("tiktok")) return "tiktok";
  return "clean";
}

const DESC = {
  dark: (n, s) => `${s} — slow smoke, pale moonlight and a ${n} that owns the dark. Every screen state, facecam frame, alerts and panels animated in one gothic world, ready for OBS in minutes.`,
  cozy: (n, s) => `${s} — warm light, soft motion and the kind of scene chat settles into. Complete animated set: screens, cam frames, alerts and panels, drag-and-drop ready for OBS and Streamlabs.`,
  fire: (n, s) => `${s} — ember light, rising heat and comeback energy across every screen. Full animated package with cam frames, alerts and panels, built to make gameplay pop.`,
  japanese: (n, s) => `${s} — ink-brush skies, lantern glow and cinematic Japanese atmosphere. The complete animated set: screens, facecam frames, alerts and panels, OBS-ready out of the box.`,
  tiktok: (n, s) => `${s} — composed for the vertical stage, so nothing fights TikTok Live's chat column. Mobile-first animated screens, frames and badges with atelier-grade motion.`,
  clean: (n, s) => `${s} — a complete matched stream identity: animated screens, facecam frames, game overlay, alerts and panels in one coherent look. Instant download, live in OBS in minutes.`,
};

function tagsFor(noun, cats) {
  const N = cap(noun);
  const base = [
    `${N} Twitch Overlay`, `Twitch Overlay ${N}`, `Stream Overlay ${N}`,
    `${N} Overlay`, `${N} Twitch`, "Stream Overlay", "Twitch Overlay",
    "Twitch Overlays", "Stream Overlays", `${N} Twitch Pack`,
    "Animated Stream Overlay", "Kick Stream Package", "Vtuber Overlay",
  ];
  if (cats.includes("tiktok")) base[base.length - 1] = "TikTok Live Overlay";
  return base;
}

/* gallery pollution filter: URLs that appear in 3+ different listings are
   "more from this shop" bleed-through, not the listing's own screens. */
const freq = {};
for (const it of items) for (const u of it.gallery || []) freq[u] = (freq[u] || 0) + 1;

function cleanGallery(it) {
  const g = (it.gallery || []).filter((u, i) => i === 0 || freq[u] <= 2);
  return g.length ? g : (it.gallery || []).slice(0, 1);
}

/* secondary category hints from titles */
function extraCats(title, primary) {
  const t = title.toLowerCase();
  const extras = [];
  if (/(cozy|kawaii)/.test(t)) extras.push("cozy");
  if (/(gothic|mystic|reaper|midnight blood)/.test(t)) extras.push("gothic");
  if (/sakura/.test(t)) extras.push("sakura");
  if (/(anime|vtuber|cyberpunk)/.test(t)) extras.push("anime");
  return extras.filter((c) => c !== primary).slice(0, 1);
}

/* ── build ── */
const seen = new Set();
const out = [];
let counter = 1;

items.sort((a, b) => b.id.localeCompare(a.id)); // newest listings first

for (const it of items) {
  const o = OVERRIDES[it.id] || {};
  const st = shortTitle(it.title);
  const { noun, cat: themeCat } = themeOf(it.title);
  const section = (it.sections || [])[0] || "stream";
  const isLatest = section === "latest-drops";
  const primary = o.custom ? "custom" : (isLatest ? themeCat : (section === "custom" ? "custom" : section));
  const cats = [primary, ...extraCats(it.title, primary)];
  let slug = o.slug || slugify(st);
  let n = 2;
  while (seen.has(slug)) slug = `${o.slug || slugify(st)}-${n++}`;
  seen.add(slug);

  const mood = moodOf(it.title, cats);
  const gallery = cleanGallery(it);
  const price = o.price ?? (o.custom ? 400 : cats.includes("tiktok") ? 17.09 : 20.5);
  const salePrice = o.salePrice ?? (o.custom ? 100 : cats.includes("tiktok") ? 4.27 : 5.12);

  out.push({
    id: `oc-${String(counter++).padStart(3, "0")}`,
    slug,
    title: st,
    category: cats,
    price,
    salePrice,
    etsyTitle: it.title,
    etsyUrl: `https://www.etsy.com/listing/${it.id}/${it.slug || ""}`,
    previewVideo: it.video,
    thumbnails: gallery,
    description: DESC[mood](noun, st),
    tags: tagsFor(noun, cats),
    featured: !!o.featured,
    bestseller: !!o.bestseller,
    newDrop: isLatest || !!o.newDrop,
    customCommission: !!o.custom,
  });
}

/* ── emit products.ts ── */
const productLiteral = (p) => {
  const lines = [
    `    id: ${JSON.stringify(p.id)},`,
    `    slug: ${JSON.stringify(p.slug)},`,
    `    title: ${JSON.stringify(p.title)},`,
    `    category: ${JSON.stringify(p.category)},`,
  ];
  if (p.price !== 20.5) lines.push(`    price: ${p.price},`);
  if (p.salePrice !== 5.12) lines.push(`    salePrice: ${p.salePrice},`);
  lines.push(
    `    etsyTitle: ${JSON.stringify(p.etsyTitle)},`,
    `    etsyUrl: ${JSON.stringify(p.etsyUrl)},`,
    `    previewVideo: ${JSON.stringify(p.previewVideo)},`,
    `    thumbnails: ${JSON.stringify(p.thumbnails)},`,
    `    description: ${JSON.stringify(p.description)},`,
    `    tags: ${JSON.stringify(p.tags)},`
  );
  if (p.featured) lines.push(`    featured: true,`);
  if (p.bestseller) lines.push(`    bestseller: true,`);
  if (p.newDrop) lines.push(`    newDrop: true,`);
  if (p.customCommission) {
    lines.push(`    customCommission: true,`);
    lines.push(`    includes: CUSTOM_INCLUDES,`);
  }
  return `  p({\n${lines.join("\n")}\n  })`;
};

const file = `import type { Product } from "@/lib/types";

/**
 * FULL VectorKingStudio catalog — all ${out.length} live Etsy listings with real
 * cover art, gallery screens, preview videos, exact Etsy titles and listing
 * URLs, harvested from the shop on 2026-07-17.
 *
 * GENERATED by scripts/generate-products.mjs from scripts/vks-all.json —
 * edit the generator (or per-listing OVERRIDES) and re-run rather than
 * hand-editing entries here.
 *
 * \`lemonSqueezyUrl\` stays stubbed until the Lemon Squeezy store exists.
 */

export const STANDARD_INCLUDES = [
  "Starting Soon screen (animated MP4 + static PNG)",
  "Be Right Back screen (animated MP4 + static PNG)",
  "Stream Ending screen (animated MP4 + static PNG)",
  "Offline screen (animated MP4 + static PNG)",
  "Facecam / webcam frames",
  "In-game overlay",
  "Animated alerts (follow, sub, donation, raid)",
  "Info panels",
  "Bonus emotes",
] as const;

const CUSTOM_INCLUDES = [
  "Custom art direction from your brief",
  "All animated screens (Starting Soon, BRB, Ending, Offline)",
  "Custom facecam frames & game overlay",
  "Animated alerts & transitions",
  "Panels & banners",
  "Full Brand tier: emotes, sub badges, mascot logo",
  "Two revision rounds included",
];

export const COMPATIBLE_WITH = [
  "OBS Studio",
  "Streamlabs",
  "Twitch",
  "YouTube",
  "Kick",
] as const;

const LEMONSQUEEZY_URL = "LEMONSQUEEZY_URL";

type Seed = Partial<Product> &
  Pick<Product, "id" | "slug" | "title" | "category" | "description" | "tags">;

function p(seed: Seed): Product {
  return {
    price: 20.5,
    salePrice: 5.12,
    currency: "USD",
    etsyUrl: "",
    previewVideo: "",
    thumbnails: [],
    includes: [...STANDARD_INCLUDES],
    compatibleWith: [...COMPATIBLE_WITH],
    featured: false,
    lemonSqueezyUrl: LEMONSQUEEZY_URL,
    ...seed,
  };
}

export const PRODUCTS: Product[] = [
${out.map(productLiteral).join(",\n")},
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "latest-drops") {
    return PRODUCTS.filter((p) => p.newDrop || p.featured).slice(0, 16);
  }
  return PRODUCTS.filter((p) => p.category.includes(categorySlug));
}

export function relatedProducts(product: Product, count = 4): Product[] {
  const same = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category.some((c) => product.category.includes(c))
  );
  const fill = PRODUCTS.filter((p) => p.slug !== product.slug && !same.includes(p));
  return [...same, ...fill].slice(0, count);
}
`;

writeFileSync(join(here, "..", "src", "data", "products.ts"), file);
console.log(`WROTE products.ts with ${out.length} products`);
console.log("categories:", [...new Set(out.map((p) => p.category[0]))].join(", "));
console.log("newDrops:", out.filter((p) => p.newDrop).length, "| featured:", out.filter((p) => p.featured).length);

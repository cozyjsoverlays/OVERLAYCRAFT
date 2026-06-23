/**
 * Generate `src/data/packs.ts` from an Etsy "Download Data → Currently for sale
 * listings" CSV export.
 *
 *   npx tsx scripts/csv-to-packs.ts "C:/path/EtsyListingsDownload.csv"
 *
 * The export has no per-listing URL, so every pack's buy button points to the
 * shop home (https://www.etsy.com/shop/CozyJsStudio). Images come from IMAGE1.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { parseCsvToObjects } from "./lib/csv";

const SHOP_URL = "https://www.etsy.com/shop/CozyJsStudio";

type Category = "cat" | "dragon" | "bear" | "fox" | "frog" | "japanese";

// Specific animals first, then theme, then "frog" (the Frogs & More catch-all).
const CATEGORY_RULES: Array<[RegExp, Category]> = [
  [/\b(cat|kitty|kitten|neko)\b/i, "cat"],
  [/\bdragon\b/i, "dragon"],
  [/\b(fox|kitsune)\b/i, "fox"],
  [/\b(bear|panda)\b/i, "bear"],
  [
    /\b(samurai|ninja|japan(ese)?|sakura|wolf|koi|geisha|kimono|torii|lantern|temple|oni|kitsune)\b/i,
    "japanese",
  ],
];

function mapCategory(text: string): Category {
  for (const [re, cat] of CATEGORY_RULES) if (re.test(text)) return cat;
  return "frog";
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function cleanName(title: string): string {
  // The display name is the first segment before the first " | ".
  return title.split("|")[0].replace(/\s+/g, " ").trim();
}

function priceStr(raw: string): string {
  const n = parseFloat((raw || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? `$${n.toFixed(2)}` : "$0.00";
}

function describe(name: string): string {
  const theme = name
    .replace(/\b(animated|stream|package|overlay|overlays|twitch|pack|for)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  return theme
    ? `${theme} — cozy animated overlays: screens, alerts, panels & emotes.`
    : "Cozy animated stream overlays — screens, alerts, panels & emotes.";
}

function features(haystack: string): string[] {
  const f = ["Animated Screens", "Alerts", "Panels", "Emotes"];
  if (/\bbadge/i.test(haystack)) f.push("Sub Badges");
  return f;
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: npx tsx scripts/csv-to-packs.ts "<path-to-csv>"');
    process.exit(1);
  }

  const rows = parseCsvToObjects(readFileSync(resolve(file), "utf8"));
  const seen = new Set<string>();
  const packs: string[] = [];
  let skipped = 0;

  for (const r of rows) {
    const title = (r.title || "").trim();
    const image = (r.image1 || "").trim();
    if (!title || !image) {
      skipped++;
      continue;
    }

    const name = cleanName(title);
    let slug = slugify(name);
    if (!slug) {
      skipped++;
      continue;
    }
    while (seen.has(slug)) slug = `${slug}-${seen.size}`;
    seen.add(slug);

    const category = mapCategory(`${title} ${r.tags || ""}`);
    const entry = {
      slug,
      name,
      category,
      price: priceStr(r.price),
      description: describe(name),
      image,
      etsy: SHOP_URL,
      features: features(`${title} ${r.description || ""} ${r.tags || ""}`),
    };

    const body = [
      `    slug: ${JSON.stringify(entry.slug)},`,
      `    name: ${JSON.stringify(entry.name)},`,
      `    category: ${JSON.stringify(entry.category)},`,
      `    price: ${JSON.stringify(entry.price)},`,
      `    description: ${JSON.stringify(entry.description)},`,
      `    image: ${JSON.stringify(entry.image)},`,
      `    etsy: ${JSON.stringify(entry.etsy)},`,
      `    features: ${JSON.stringify(entry.features)},`,
    ].join("\n");
    packs.push(`  {\n${body}\n  }`);
  }

  const out = `import type { Pack, PackCategory } from "@/lib/types";

// AUTO-GENERATED from the Etsy listings CSV export by scripts/csv-to-packs.ts.
// Re-run that script to regenerate. ${packs.length} packs.

export const PACKS: Pack[] = [
${packs.join(",\n")},
];

export interface PackFilter {
  id: PackCategory | "all";
  label: string;
}

export const PACK_FILTERS: PackFilter[] = [
  { id: "all", label: "All" },
  { id: "cat", label: "Cats" },
  { id: "dragon", label: "Dragons" },
  { id: "fox", label: "Foxes" },
  { id: "bear", label: "Bears & Pandas" },
  { id: "japanese", label: "Japanese" },
  { id: "frog", label: "Frogs & More" },
];
`;

  writeFileSync(resolve("src/data/packs.ts"), out, "utf8");

  // Category breakdown for a quick sanity check.
  const counts: Record<string, number> = {};
  for (const p of packs) {
    const m = p.match(/category: "(\w+)"/);
    if (m) counts[m[1]] = (counts[m[1]] || 0) + 1;
  }
  console.log(`✅ Wrote ${packs.length} packs to src/data/packs.ts (${skipped} skipped).`);
  console.log("   Categories:", counts);
}

main();

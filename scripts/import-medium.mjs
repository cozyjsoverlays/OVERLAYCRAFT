/**
 * Import every post from the VectorKingStudio Medium into native site blog
 * posts. Reads Medium's RSS feed (full-content `content:encoded`), converts the
 * article HTML into the site's BlogPost section model (headings -> h2,
 * paragraphs, lists), strips em-dashes, links matching shop packs, and credits
 * the Medium original. Emits src/data/blog-medium.ts (MEDIUM_POSTS).
 *
 *   node scripts/import-medium.mjs
 *
 * Re-run any time to resync (RSS carries the ~10 most recent stories).
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const FEED = "https://medium.com/feed/@VectorKingStudio";
const PROFILE = "https://medium.com/@VectorKingStudio";

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " ", "#x27": "'", "#x2019": "’", hellip: "..." };
function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z0-9#]+);/gi, (m, n) => (ENT[n] !== undefined ? ENT[n] : m));
}
// Site rule: no em-dashes. Hyphens only.
const noDash = (s) => s.replace(/\s*[—–]\s*/g, " - ").replace(/[—–]/g, "-");
const clean = (s) => noDash(decode(s.replace(/<[^>]+>/g, ""))).replace(/\s+/g, " ").trim();
const slugify = (s) =>
  clean(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70).replace(/-+$/, "");

/* pack theme -> real shop slugs for internal linking */
const PACKS = {
  cat: ["midnight-magic-cat-overlay", "magical-night-cat-overlay", "starry-wizard-cat-overlay", "cozy-fox-overlay-animated-stream-package"],
  samurai: ["red-moon-samurai-overlay", "samurai-moon-overlay", "red-moon-sakura-overlay", "mystic-moonlight-wolf-overlay"],
  christmas: ["dark-gothic-raven-animated-stream-package", "cozy-fox-overlay-animated-stream-package", "sakura-dream-wolf-overlay", "inferno-phoenix-overlay"],
  dark: ["dark-gothic-raven-animated-stream-package", "mystic-moonlight-wolf-overlay", "mystic-moonlight-reaper-overlay", "inferno-phoenix-overlay"],
  default: ["dark-gothic-raven-animated-stream-package", "sakura-dream-wolf-overlay", "inferno-phoenix-overlay", "cozy-fox-overlay-animated-stream-package"],
};
function packsFor(title) {
  const t = title.toLowerCase();
  if (/cat|kitty|neko/.test(t)) return PACKS.cat;
  if (/samurai|japanese|sakura|ninja/.test(t)) return PACKS.samurai;
  if (/christmas|snow|holiday|festive/.test(t)) return PACKS.christmas;
  if (/dark|gothic|star bloom|mystic|night/.test(t)) return PACKS.dark;
  return PACKS.default;
}

/* Convert one Medium content:encoded HTML body into BlogPost sections. */
function toSections(html) {
  // drop images/figures/iframes and Medium's own promo footer
  let body = html
    .replace(/<figure[\s\S]*?<\/figure>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  // block tokens in document order
  const blocks = [...body.matchAll(/<(h[1-6]|p|blockquote|ul|ol|pre)\b[^>]*>([\s\S]*?)<\/\1>/gi)];
  const sections = [];
  let cur = null;
  const pushPara = (txt) => {
    if (!txt) return;
    if (!cur) cur = { h2: "Overview", paragraphs: [] };
    (cur.paragraphs ||= []).push(txt);
  };
  for (const b of blocks) {
    const tag = b[1].toLowerCase();
    const inner = b[2];
    if (/^h[1-6]$/.test(tag)) {
      const heading = clean(inner);
      if (!heading) continue;
      if (cur) sections.push(cur);
      cur = { h2: heading };
    } else if (tag === "ul" || tag === "ol") {
      const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => clean(m[1])).filter(Boolean);
      if (!items.length) continue;
      if (!cur) cur = { h2: "Details" };
      cur.list = (cur.list || []).concat(items);
      if (tag === "ol") cur.ordered = true;
    } else {
      const txt = clean(inner);
      if (txt.length > 1) pushPara(txt);
    }
  }
  if (cur) sections.push(cur);
  // Medium often repeats the title as the first heading/paragraph; drop empty sections
  return sections.filter((s) => (s.paragraphs && s.paragraphs.length) || (s.list && s.list.length));
}

const feedText = await (await fetch(FEED, { headers: { "user-agent": "Mozilla/5.0" } })).text();
const items = feedText.split(/<item>/).slice(1);
const RESERVED = new Set();
const posts = [];

for (const it of items) {
  const rawTitle = clean((it.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1] || "");
  const link = ((it.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || "").split("?")[0].trim();
  const pub = (it.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1];
  const content = (it.match(/<content:encoded>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content:encoded>/) || [])[1] || "";
  if (!rawTitle || !content) continue;

  // tidy the title: trim trailing "| ... | ..." keyword tails and the date/ellipsis
  const title = noDash(rawTitle).replace(/\s*\|\s*$/, "").replace(/…$/, "").trim();
  const shortTitle = title.split(/\s*[|:]\s*/)[0].trim();

  let slug = slugify(shortTitle);
  let n = 2;
  while (RESERVED.has(slug)) slug = `${slugify(shortTitle)}-${n++}`;
  RESERVED.add(slug);

  const sections = toSections(content);
  const firstPara = sections.find((s) => s.paragraphs && s.paragraphs[0])?.paragraphs[0] || shortTitle;
  const excerpt = firstPara.slice(0, 200);
  const metaDescription = firstPara.slice(0, 158);
  const date = pub ? new Date(pub).toISOString().slice(0, 10) : "2026-01-01";
  const kw = shortTitle.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter((w) => w.length > 2);
  const keywords = [...new Set([...kw, "stream overlay", "twitch overlay", "vectorkingstudio"])].slice(0, 8);

  posts.push({
    slug,
    title: shortTitle,
    metaTitle: `${shortTitle} - OverlayCraft`.slice(0, 60),
    metaDescription,
    date,
    keywords,
    excerpt,
    sections,
    featuredPacks: packsFor(title),
    related: [
      { label: "Read the original on Medium", href: link },
      { label: "Browse animated overlay packs", href: "/overlays" },
      { label: "The studio portfolio on Behance", href: "https://www.behance.net/vectorkingstudio" },
    ],
  });
}

/* emit TS */
const esc = (s) => JSON.stringify(s);
const sectionLit = (s) => {
  const parts = [`      { h2: ${esc(s.h2)}`];
  if (s.paragraphs) parts.push(`paragraphs: ${esc(s.paragraphs)}`);
  if (s.list) parts.push(`list: ${esc(s.list)}`);
  if (s.ordered) parts.push(`ordered: true`);
  return parts.join(", ") + " }";
};
const postLit = (p) =>
  `  {
    slug: ${esc(p.slug)},
    title: ${esc(p.title)},
    metaTitle: ${esc(p.metaTitle)},
    metaDescription: ${esc(p.metaDescription)},
    date: ${esc(p.date)},
    keywords: ${esc(p.keywords)},
    excerpt: ${esc(p.excerpt)},
    sections: [
${p.sections.map(sectionLit).join(",\n")}
    ],
    featuredPacks: ${esc(p.featuredPacks)},
    related: ${esc(p.related)},
  }`;

const out = `import type { BlogPost } from "./blog";

/**
 * Blog posts imported from the VectorKingStudio Medium (medium.com/@VectorKingStudio).
 * GENERATED by scripts/import-medium.mjs from the Medium RSS feed - re-run to
 * resync rather than hand-editing. Each post credits and links its original.
 */
export const MEDIUM_POSTS: BlogPost[] = [
${posts.map(postLit).join(",\n")}
];
`;

writeFileSync(resolve("src/data/blog-medium.ts"), out);
console.log(`WROTE blog-medium.ts with ${posts.length} posts`);
console.log("slugs:", posts.map((p) => p.slug).join(", "));

import type { FaqEntry } from "@/lib/types";

export const SITE = {
  name: "CozyOverlays",
  shop: "CozyJsStudio",
  url: "https://cozyoverlays.com",
  tagline:
    "Animated stream overlay packs that feel alive & cozy — for Twitch, YouTube, Kick & TikTok.",
  avatar:
    "https://i.etsystatic.com/61635066/r/isla/962937/85081868/isla_180x180.85081868_iwuxhcgu.jpg",
} as const;

export const LINKS = {
  etsy: "https://www.etsy.com/shop/cozyjsstudio",
  etsyCats:
    "https://www.etsy.com/shop/CozyJsStudio?section_id=56165083",
  etsyContact: "https://www.etsy.com/messages/new?with_id=1121232907",
  etsyCustom:
    "https://www.etsy.com/listing/4500763545/custom-animated-twitch-stream-overlay",
  youtube: "https://www.youtube.com/@cozyjsstudio",
  telegram: "https://t.me/Cozyjsstudio",
  pinterest: "https://www.pinterest.com/cozyjsstudio/",
  instagram: "https://www.instagram.com/cozyjsstudio/",
  twitter: "https://twitter.com/Cozyjsstudio",
} as const;

export const NAV_LINKS = [
  { label: "Shop", href: "/#bestsellers" },
  { label: "Browse", href: "/#browse" },
  { label: "Reviews", href: "/#reviews" },
  { label: "About", href: "/#about" },
  { label: "Tutorials", href: "/#tutorials" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const HERO_STATS = [
  "686 happy streamers",
  "⚡ Instant download",
  "4.9★ from 91 reviews",
  "🎮 OBS & Streamlabs ready",
  "🌍 122 unique packs",
] as const;

export const TRUST_ITEMS = [
  "⭐ Etsy Star Seller",
  "91 Reviews · 4.9 avg",
  "Instant delivery",
  "Works with OBS & Streamlabs",
  ".WEBM + .PNG included",
] as const;

export const COMPATIBILITY = [
  "Twitch",
  "YouTube",
  "Kick",
  "TikTok",
  "OBS Studio",
  "Streamlabs",
  "StreamElements",
] as const;

export const ABOUT_CHIPS = [
  "122 Unique Packs",
  "4.9★ Star Seller",
  "686 Sales",
  "Instant Delivery",
  "Custom Commissions",
  "Worldwide",
] as const;

export const HOW_IT_WORKS = [
  {
    title: "Buy on Etsy",
    desc: "Pick your pack and check out securely through Etsy. No account hoops.",
  },
  {
    title: "Unzip the Pack",
    desc: "Your files arrive instantly by email — unzip the .WEBM and .PNG assets.",
  },
  {
    title: "Add to OBS",
    desc: "Drop the animated screens in as browser/media sources. Sized for every platform.",
  },
  {
    title: "Go Live!",
    desc: "Hit stream and glow up your channel with cozy, alive overlays.",
  },
] as const;

export const TUTORIALS = [
  {
    title: "OBS Setup in Under 5 Minutes",
    desc: "Add animated .WEBM overlays as browser sources the right way.",
    tag: "Setup",
  },
  {
    title: "Full Pack Showcase",
    desc: "A walkthrough of every screen, alert, and panel in a cozy pack.",
    tag: "Showcase",
  },
  {
    title: "Stream Tips for New Creators",
    desc: "Small touches that make your stream feel polished from day one.",
    tag: "Tips",
  },
] as const;

export const FAQ: FaqEntry[] = [
  {
    question: "How are the files delivered?",
    answer:
      "Instantly. As soon as your Etsy payment clears, Etsy emails you a download link and the files appear in your Etsy Purchases. No waiting, no shipping — it's a digital download.",
  },
  {
    question: "Will these work with OBS and Streamlabs?",
    answer:
      "Yes. Every animated screen ships as a transparent .WEBM you can drop into OBS Studio, Streamlabs, or StreamElements as a browser/media source. Static .PNG versions are included too for tools that need them.",
  },
  {
    question: "Which platforms are supported?",
    answer:
      "All four: Twitch, YouTube, Kick, and TikTok. The assets are sized and exported so they look crisp on each platform's layout.",
  },
  {
    question: "Can I request changes to a pack?",
    answer:
      "Absolutely — just message me on Etsy. Small tweaks to existing packs can often be arranged, and full personalization is available through a custom commission.",
  },
  {
    question: "What's the refund policy?",
    answer:
      "Because these are instant-download digital goods, all sales are final once the files have been downloaded, in line with Etsy's policy for digital items. If something isn't working, message me and I'll help you get it set up.",
  },
  {
    question: "Do you take custom commissions?",
    answer:
      "Yes! Custom packs start at $601 and include your own character or mascot, a custom palette, every screen and alert, custom emotes, a sub badge set, and matching panels and overlays.",
  },
];

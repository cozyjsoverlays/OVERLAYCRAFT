import type { FaqEntry, Review } from "@/lib/types";

export const SITE = {
  name: "OverlayCraft",
  shop: "VectorKingStudio",
  url: "https://overlaycraft.com",
  tagline: "Cinematic animated stream overlays for Twitch, YouTube, Kick & TikTok Live.",
  description:
    "Premium animated stream overlay packages - forged by VectorKingStudio, Etsy Star Seller with 1,300+ sales and a 4.9★ rating. Instant download. Drag into OBS. Go live.",
} as const;

export const ETSY_SHOP_URL = "https://www.etsy.com/shop/VectorKingStudio";
export const YOUTUBE_URL = "https://www.youtube.com/@vectorkingstudio1";

/** The real custom-commission Etsy listing - all custom orders go here. */
export const CUSTOM_ETSY_URL =
  "https://vectorkingstudio.etsy.com/listing/4499837996/custom-twitch-overlay-stream-package";

export interface Tutorial {
  youtubeId: string;
  title: string;
  description: string;
  /** Optional upload/publish date (ISO) for VideoObject schema. */
  date?: string;
}

/** Real tutorials from the VectorKingStudio YouTube channel. */
export const TUTORIALS: Tutorial[] = [
  {
    youtubeId: "ehUUSW3tZuU",
    title: "How to Set Up OBS for Streaming - Overlays, Facecam, Screens & Free Overlays",
    description:
      "The full OBS walkthrough: install and configure OBS Studio, add your animated overlay screens, frame your facecam, set up your just-chatting scene, and drop in free overlays. If you've never touched OBS, start here - you'll be live by the end.",
    date: "2026-01-01",
  },
];

export const TRUST_BAR = [
  "★ 4.9 from 193 reviews",
  "1,300+ streamers equipped",
  "Star Seller since 2020",
  "Instant download",
] as const;

export const NAV_LINKS = [
  { label: "Overlays", href: "/overlays" },
  { label: "Custom", href: "/custom" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
] as const;

export const HOW_IT_WORKS = [
  {
    title: "Pick your world",
    desc: "Browse the catalog and choose the pack that matches your channel's soul.",
  },
  {
    title: "Instant download",
    desc: "Checkout takes seconds - your files arrive immediately, no waiting.",
  },
  {
    title: "Drag into OBS",
    desc: "Drop the animated screens into OBS or Streamlabs as media sources.",
  },
  {
    title: "Go live",
    desc: "Your stream now looks like a production. Because it is one.",
  },
] as const;

export const REVIEWS: Review[] = [
  {
    author: "NyxRaven_TTV",
    rating: 5,
    text: "The Dark Gothic Raven pack transformed my channel overnight. Viewers kept asking who designed my stream. Absolute quality.",
    pack: "Dark Gothic Raven",
  },
  {
    author: "SakuraSenpai",
    rating: 5,
    text: "Gorgeous animations, silky smooth loops, and setup took me ten minutes. Worth every cent.",
    pack: "Sakura Dream Wolf",
  },
  {
    author: "DragonheartLive",
    rating: 5,
    text: "I've bought overlays from three different shops - nothing comes close to this level of polish.",
    pack: "Violet Night Dragon",
  },
  {
    author: "CozyCatCafe",
    rating: 5,
    text: "The cat pack is adorable and the alerts made my chat go wild the first night. Instant download worked perfectly.",
    pack: "Midnight Magic Cat",
  },
  {
    author: "KickWithKai",
    rating: 5,
    text: "Custom commission was worth every cent - the process was smooth and the mascot logo is unreal.",
    pack: "Custom Full Brand",
  },
  {
    author: "PhoenixPlays",
    rating: 4,
    text: "Beautiful pack, tiny learning curve in OBS if you're brand new - the included guide sorted me out fast.",
    pack: "Inferno Phoenix",
  },
] as const;

export const FAQ: FaqEntry[] = [
  {
    question: "Will these overlays work with OBS and Streamlabs?",
    answer:
      "Yes. Every animated screen ships as a looping video file you drop into OBS Studio, Streamlabs, or StreamElements as a media/browser source, plus static PNG versions for tools that need them. A quick-start install guide is included in every pack.",
  },
  {
    question: "Which platforms are supported?",
    answer:
      "Twitch, YouTube, Kick, and TikTok Live. Assets are sized and exported to look crisp on each platform's layout, and every pack lists its compatibility right on the product page.",
  },
  {
    question: "How does delivery work?",
    answer:
      "Instantly. The moment your payment completes you receive a download link - no shipping, no waiting. Checkout is handled by Lemon Squeezy, our merchant of record, which also takes care of VAT and tax receipts.",
  },
  {
    question: "Can I get a fully custom overlay?",
    answer:
      "Absolutely - custom commissions are our craft. Tiers run from $100 (overlay + screens) to $400 (full brand with emotes, sub badges, and a mascot logo). Head to the Custom Overlays page to start a brief.",
  },
  {
    question: "What's your refund policy?",
    answer:
      "Because these are instant-download digital goods, sales are final once files are delivered. If anything is broken or you hit a technical snag, contact us and we'll fix it or make it right - our 4.9★ rating exists for a reason.",
  },
] as const;

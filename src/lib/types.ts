export type PackCategory =
  | "cat"
  | "dragon"
  | "bear"
  | "fox"
  | "frog"
  | "japanese"
  | "witchy"
  | "room"
  | "seasonal";

export type PackFeature =
  | "Animated Screens"
  | "Alerts"
  | "Panels"
  | "Emotes"
  | "Sub Badges";

export interface Pack {
  slug: string;
  name: string;
  category: PackCategory;
  price: string;
  /** Original price for sale framing (strikethrough + % badge). */
  compareAt?: string;
  description: string;
  image: string;
  video?: string;
  etsy: string;
  features: PackFeature[];
  bestseller?: boolean;
  isNew?: boolean;
}

export interface Review {
  name: string;
  date: string;
  stars: number;
  quote: string;
  pack: string;
}

export interface Category {
  name: string;
  emoji: string;
  count: number;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  /** ISO date (YYYY-MM-DD) for SEO structured data + <time>. */
  isoDate?: string;
  readingTime: string;
  tag: string;
  /** SEO keywords for metadata + JSON-LD. */
  keywords?: string[];
  /** OG/preview image (usually a relevant pack image). */
  heroImage?: string;
  /** Article body. Paragraphs support inline markdown links [text](url) and **bold**. */
  body: { heading?: string; paragraphs: string[] }[];
  /** Prominent call-to-action box (drives to shop/Etsy). */
  cta?: { heading: string; text: string; href: string; label: string };
  /** Helpful links shown at the end of the post. */
  resources?: { label: string; href: string }[];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export type PackCategory =
  | "cat"
  | "dragon"
  | "bear"
  | "fox"
  | "frog"
  | "japanese";

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
  description: string;
  image: string;
  video?: string;
  etsy: string;
  features: PackFeature[];
  bestseller?: boolean;
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
  readingTime: string;
  tag: string;
  /** Article body as an ordered list of section blocks. */
  body: { heading?: string; paragraphs: string[] }[];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

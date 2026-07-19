export interface Product {
  id: string;
  slug: string;
  title: string;
  /** First entry = primary category (used in the canonical URL). */
  category: string[];
  price: number;
  salePrice: number | null;
  currency: "USD";
  /** Real Etsy listing URL, e.g. https://www.etsy.com/listing/123456789/ */
  etsyUrl: string;
  previewVideo: string;
  thumbnails: string[];
  description: string;
  /**
   * Full Etsy listing title (the long, keyword-loaded one). Used in <title>,
   * OG, JSON-LD `name`. Falls back to `title` when absent.
   */
  etsyTitle?: string;
  /**
   * Full Etsy description body. When present, replaces the visible short
   * `description` on the product page (multi-paragraph, preserved).
   */
  etsyDescription?: string;
  /** Per-image alt-text override; falls back to productAlt() when absent. */
  imageAlts?: string[];
  includes: string[];
  compatibleWith: string[];
  tags: string[];
  featured: boolean;
  bestseller?: boolean;
  newDrop?: boolean;
  /** Custom-commission listings link to /custom instead of a checkout. */
  customCommission?: boolean;
  /**
   * Lemon Squeezy hosted-checkout URL for this product.
   * Stubbed at launch - replace per product after creating the store.
   */
  lemonSqueezyUrl: string;
}

export interface Category {
  slug: string;
  name: string;
  /** ~150-word indexable intro paragraph for the category page. */
  intro: string;
  /** Emoji used on the category tile until real art tiles are dropped in. */
  glyph: string;
  /** "lilac" for soft/cozy moods, "abyss" for dark/gothic moods. */
  mood: "lilac" | "abyss";
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  pack?: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

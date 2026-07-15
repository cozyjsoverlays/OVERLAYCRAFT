import type { Product } from "./types";
import { SITE } from "@/data/site";

/** Site-relative paths → absolute; already-absolute URLs (e.g. Etsy CDN) pass through. */
export function absUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
}

/**
 * Rewrite outbound Etsy listing URLs through the shop's subdomain so every
 * click credits VectorKingStudio. Same destination, shop-attributed.
 * Non-Etsy URLs and shop-home URLs pass through unchanged.
 */
export function etsyLink(url: string): string {
  if (!url) return url;
  return url
    .replace(/^https?:\/\/www\.etsy\.com\//i, "https://vectorkingstudio.etsy.com/")
    .replace(/^https?:\/\/etsy\.com\//i, "https://vectorkingstudio.etsy.com/");
}

const SCREEN_NAMES = [
  "animated preview",
  "starting soon screen",
  "facecam frame",
  "alerts & panels",
];

/**
 * SEO-strong alt text for a product image. Uses etsyTitle when present so
 * the alt carries the long keyword form; falls back to short title.
 */
export function productAlt(product: Product, index: number): string {
  if (product.imageAlts && product.imageAlts[index]) return product.imageAlts[index];
  const base = product.etsyTitle ?? product.title;
  const screen = SCREEN_NAMES[index] ?? "screen";
  return `${base} — ${screen}`;
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function discountPercent(product: Product): number | null {
  if (product.salePrice === null || product.salePrice >= product.price) return null;
  return Math.round((1 - product.salePrice / product.price) * 100);
}

export function productPath(product: Product): string {
  return `/overlays/${product.category[0]}/${product.slug}`;
}

export function currentPrice(product: Product): number {
  return product.salePrice ?? product.price;
}

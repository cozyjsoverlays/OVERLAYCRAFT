import type { Product } from "./types";

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

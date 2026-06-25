import { PACKS } from "@/data/packs";
import type { Pack } from "@/lib/types";

/** UI-facing product shape (features deserialized, price kept as cents). */
export interface ProductDTO {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  priceCents: number;
  currency: string;
  image: string;
  video: string | null;
  features: string[];
  bestseller: boolean;
  etsyUrl: string | null;
}

/**
 * The storefront reads from the STATIC catalog in `src/data/packs.ts`. The site
 * is a static export that sells on Etsy, so there's no database or server — it
 * deploys as plain files on any host.
 */

/** Parse a display price like "$24.00" / "24" into integer cents. */
function priceToCents(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

function packToDTO(p: Pack): ProductDTO {
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    priceCents: priceToCents(p.price),
    currency: "USD",
    image: p.image,
    video: p.video ?? null,
    features: p.features,
    bestseller: p.bestseller ?? false,
    etsyUrl: p.etsy ?? null,
  };
}

export async function getAllProducts(): Promise<ProductDTO[]> {
  return PACKS.map(packToDTO);
}

/** A limited set for the homepage featured section (prefers bestsellers). */
export async function getFeaturedProducts(limit = 8): Promise<ProductDTO[]> {
  const sorted = [...PACKS].sort(
    (a, b) => Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)),
  );
  return sorted.slice(0, limit).map(packToDTO);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDTO | null> {
  const p = PACKS.find((x) => x.slug === slug);
  return p ? packToDTO(p) : null;
}

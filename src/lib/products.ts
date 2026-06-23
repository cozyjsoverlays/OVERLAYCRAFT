import { prisma } from "@/lib/db";
import type { Product as PrismaProduct } from "@prisma/client";
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

export function toProductDTO(p: PrismaProduct): ProductDTO {
  let features: string[] = [];
  try {
    const parsed = JSON.parse(p.features);
    if (Array.isArray(parsed)) features = parsed.map(String);
  } catch {
    features = [];
  }
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    priceCents: p.priceCents,
    currency: p.currency,
    image: p.image,
    video: p.video,
    features,
    bestseller: p.bestseller,
    etsyUrl: p.etsyUrl,
  };
}

/**
 * The storefront reads from the STATIC catalog in `src/data/packs.ts` — not the
 * database. Because packs are sold/delivered on Etsy (BUY_ON_ETSY), the site is
 * just a catalog that links out, so it renders on any host (incl. Hostinger)
 * with zero database/env setup. The Prisma layer is retained for the admin and
 * the (toggleable) on-site checkout, but it is NOT required for the shop.
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

/** Fetch DB packs for a set of slugs (used only by the legacy on-site checkout,
 *  which is disabled in the Etsy buy model). Reads the database directly because
 *  the checkout/fulfillment path needs server-only fields like `fileKey`. */
export async function getProductsBySlugs(slugs: string[]) {
  try {
    return await prisma.product.findMany({
      where: { slug: { in: slugs }, active: true, needsFile: false },
    });
  } catch (e) {
    console.error("[products] getProductsBySlugs DB read failed:", e);
    return [];
  }
}

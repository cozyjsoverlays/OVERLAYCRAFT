import { prisma } from "@/lib/db";
import type { Product as PrismaProduct } from "@prisma/client";

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
 * Storefront reads degrade gracefully: if the database is unreachable or not yet
 * migrated (e.g. a fresh deploy before DATABASE_URL/migrations are set up), we
 * log and return an empty catalog instead of throwing. This keeps `next build`
 * and request-time rendering from crashing — the shop simply shows no packs
 * until the DB is provisioned. Mutations still surface their errors normally.
 */
function onReadError(where: string, e: unknown): void {
  console.error(
    `[products] DB read failed in ${where} — returning empty result. ` +
      `Is DATABASE_URL set and migrated?`,
    e,
  );
}

export async function getAllProducts(): Promise<ProductDTO[]> {
  try {
    const products = await prisma.product.findMany({
      // Only active packs that have a deliverable file attached are buyable.
      where: { active: true, needsFile: false },
      orderBy: [
        { sortOrder: "asc" },
        { featured: "desc" },
        { bestseller: "desc" },
        { createdAt: "asc" },
      ],
    });
    return products.map(toProductDTO);
  } catch (e) {
    onReadError("getAllProducts", e);
    return [];
  }
}

/** A limited set for the homepage featured section (prefers featured/bestseller). */
export async function getFeaturedProducts(limit = 8): Promise<ProductDTO[]> {
  try {
    const products = await prisma.product.findMany({
      where: { active: true, needsFile: false },
      orderBy: [
        { featured: "desc" },
        { bestseller: "desc" },
        { sortOrder: "asc" },
        { createdAt: "asc" },
      ],
      take: limit,
    });
    return products.map(toProductDTO);
  } catch (e) {
    onReadError("getFeaturedProducts", e);
    return [];
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDTO | null> {
  try {
    const p = await prisma.product.findUnique({ where: { slug } });
    return p ? toProductDTO(p) : null;
  } catch (e) {
    onReadError("getProductBySlug", e);
    return null;
  }
}

/** Fetch products for a set of slugs, returned in DB order (used by checkout).
 *  Only buyable packs (active + file attached) are returned. */
export async function getProductsBySlugs(slugs: string[]) {
  try {
    return await prisma.product.findMany({
      where: { slug: { in: slugs }, active: true, needsFile: false },
    });
  } catch (e) {
    onReadError("getProductsBySlugs", e);
    return [];
  }
}

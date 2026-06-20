import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const ProductSchema = z.object({
  name: z.string().min(1).max(120),
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
  category: z.string().min(1),
  description: z.string().min(1).max(2000),
  priceCents: z.number().int().positive(),
  currency: z.string().default("USD"),
  image: z.string().url(),
  video: z.string().url().optional().nullable(),
  features: z.array(z.string()).default([]),
  fileKey: z.string().default(""),
  bestseller: z.boolean().default(false),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  needsFile: z.boolean().default(false),
});

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const d = parsed.data;

  // Check slug uniqueness
  const existing = await prisma.product.findUnique({ where: { slug: d.slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: {
      name: d.name,
      slug: d.slug,
      category: d.category,
      description: d.description,
      priceCents: d.priceCents,
      currency: d.currency,
      image: d.image,
      video: d.video ?? null,
      features: JSON.stringify(d.features),
      fileKey: d.fileKey,
      bestseller: d.bestseller,
      active: d.active,
      featured: d.featured,
      sortOrder: d.sortOrder,
      needsFile: d.needsFile,
      source: "manual",
    },
  });

  revalidatePath("/shop");
  revalidatePath("/");
  return NextResponse.json(product, { status: 201 });
}

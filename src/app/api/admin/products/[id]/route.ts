import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const UpdateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  category: z.string().min(1).optional(),
  description: z.string().min(1).max(2000).optional(),
  priceCents: z.number().int().positive().optional(),
  currency: z.string().optional(),
  image: z.string().url().optional(),
  video: z.string().url().optional().nullable(),
  features: z.array(z.string()).optional(),
  fileKey: z.string().optional(),
  bestseller: z.boolean().optional(),
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  needsFile: z.boolean().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const d = parsed.data;

  // If slug is changing, check it doesn't collide
  if (d.slug) {
    const clash = await prisma.product.findFirst({
      where: { slug: d.slug, id: { not: params.id } },
    });
    if (clash) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
  }

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...(d.name !== undefined && { name: d.name }),
      ...(d.slug !== undefined && { slug: d.slug }),
      ...(d.category !== undefined && { category: d.category }),
      ...(d.description !== undefined && { description: d.description }),
      ...(d.priceCents !== undefined && { priceCents: d.priceCents }),
      ...(d.currency !== undefined && { currency: d.currency }),
      ...(d.image !== undefined && { image: d.image }),
      ...(d.video !== undefined && { video: d.video }),
      ...(d.features !== undefined && { features: JSON.stringify(d.features) }),
      ...(d.fileKey !== undefined && {
        fileKey: d.fileKey,
        needsFile: d.fileKey === "" ? true : false,
      }),
      ...(d.bestseller !== undefined && { bestseller: d.bestseller }),
      ...(d.active !== undefined && { active: d.active }),
      ...(d.featured !== undefined && { featured: d.featured }),
      ...(d.sortOrder !== undefined && { sortOrder: d.sortOrder }),
      ...(d.needsFile !== undefined && { needsFile: d.needsFile }),
    },
  });

  revalidatePath("/shop");
  revalidatePath(`/shop/${product.slug}`);
  revalidatePath("/");
  return NextResponse.json(product);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.product.delete({ where: { id: params.id } });

  revalidatePath("/shop");
  revalidatePath(`/shop/${product.slug}`);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

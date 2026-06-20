import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Edit Pack" };

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-heading"
      >
        <ArrowLeft size={15} /> Back to products
      </Link>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-heading">Edit pack</h1>
        <Link
          href={`/shop/${product.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-lavender"
        >
          View live <ExternalLink size={13} />
        </Link>
      </div>
      <ProductForm product={product} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductTable } from "@/components/admin/ProductTable";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Products</h1>
          <p className="mt-0.5 text-sm text-muted">{products.length} packs total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-bold text-base shadow-glow"
        >
          <Plus size={15} /> Add pack
        </Link>
      </div>
      <ProductTable products={products} />
    </div>
  );
}

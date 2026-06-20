import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Add Pack" };

export default function NewProductPage() {
  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-heading"
      >
        <ArrowLeft size={15} /> Back to products
      </Link>
      <h1 className="mb-6 text-2xl font-extrabold text-heading">Add new pack</h1>
      <ProductForm />
    </div>
  );
}

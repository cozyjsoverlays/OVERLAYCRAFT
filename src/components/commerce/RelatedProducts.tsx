"use client";

import { useState } from "react";
import type { ProductDTO } from "@/lib/products";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductLightbox } from "@/components/commerce/ProductLightbox";

export function RelatedProducts({ products }: { products: ProductDTO[] }) {
  const [active, setActive] = useState<ProductDTO | null>(null);
  if (products.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            onOpenMedia={setActive}
          />
        ))}
      </div>
      <ProductLightbox product={active} onClose={() => setActive(null)} />
    </>
  );
}

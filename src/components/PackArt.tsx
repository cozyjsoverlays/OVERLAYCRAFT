"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { getCategory } from "@/data/categories";
import { etsyImage, hasRealImage, productAlt } from "@/lib/utils";

/**
 * Product artwork with a designed fallback. Renders the real cover image when
 * the product has one; if that image is missing OR fails to load at runtime
 * (dead CDN URL, unsupported format, network error), it swaps to a cute branded
 * placeholder - category glyph on a soft gradient. So no card ever shows a
 * broken image and a bad asset can never break the page render.
 */
export function PackArt({
  product,
  index = 0,
  className = "",
}: {
  product: Product;
  index?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = product.thumbnails[index];
  const showImage = hasRealImage(product) && src && !failed;

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={etsyImage(src)}
        alt={productAlt(product, index)}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  const cat = getCategory(product.category[0]);
  const wash =
    cat?.mood === "abyss"
      ? "from-abyss/35 via-lightPink to-ink"
      : "from-lightPink via-ink to-abyss/25";

  return (
    <div
      role="img"
      aria-label={productAlt(product, index)}
      className={`grid place-items-center bg-gradient-to-br ${wash} ${className}`}
    >
      <div className="select-none text-center">
        <span className="text-5xl drop-shadow-sm" aria-hidden>
          {cat?.glyph ?? "✦"}
        </span>
        <p className="mt-2 px-4 font-display text-[10px] uppercase tracking-[0.25em] text-mist">
          Preview coming soon
        </p>
      </div>
    </div>
  );
}

import type { Product } from "@/lib/types";
import { getCategory } from "@/data/categories";
import { hasRealImage, productAlt } from "@/lib/utils";

/**
 * Product artwork with a designed fallback: renders the real cover image when
 * the product has one (Etsy CDN), otherwise a cute branded placeholder —
 * category glyph on a soft pink/lavender gradient — so no card ever shows a
 * broken image while the full catalog media is being collected.
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
  if (hasRealImage(product) && product.thumbnails[index]) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.thumbnails[index]}
        alt={productAlt(product, index)}
        loading="lazy"
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

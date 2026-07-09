import { Star } from "lucide-react";

/** Rating stars — always lilac (never gold) to keep the 4-color palette pure. */
export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden
          className={i < Math.round(rating) ? "fill-lilac text-lilac" : "text-veil"}
        />
      ))}
    </div>
  );
}

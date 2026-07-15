"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistProvider";

export function SaveButton({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(slug);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from saved" : "Save to wishlist"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={`grid h-9 w-9 place-items-center rounded-full border border-veil bg-ink2/70 backdrop-blur transition-transform hover:scale-110 active:scale-95 ${className}`}
    >
      <Heart
        size={16}
        className={saved ? "fill-softRed text-softRed" : "text-softRed"}
        aria-hidden
      />
    </button>
  );
}

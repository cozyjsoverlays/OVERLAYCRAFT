"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { useHydrated } from "@/lib/use-hydrated";
import { clsx } from "@/lib/clsx";

interface WishlistButtonProps {
  slug: string;
  name: string;
  /** "overlay" floats on image corners; "inline" sits next to other buttons. */
  variant?: "overlay" | "inline";
}

export function WishlistButton({ slug, name, variant = "overlay" }: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const hydrated = useHydrated();
  const saved = hydrated && has(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      title={saved ? "Saved ♡" : "Save for later"}
      className={clsx(
        "inline-flex items-center justify-center rounded-full transition-all",
        variant === "overlay"
          ? "h-9 w-9 bg-base/70 backdrop-blur hover:bg-base"
          : "h-11 w-11 border border-subtle bg-white/5 hover:border-pink/50",
        saved ? "text-pink" : "text-heading hover:text-pink",
      )}
    >
      <Heart size={variant === "overlay" ? 16 : 18} className={saved ? "fill-pink" : undefined} />
    </button>
  );
}

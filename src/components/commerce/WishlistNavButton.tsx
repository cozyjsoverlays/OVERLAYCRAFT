"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { useHydrated } from "@/lib/use-hydrated";

/** Navbar heart with a live saved-count badge, linking to /saved. */
export function WishlistNavButton() {
  const { count } = useWishlist();
  const hydrated = useHydrated();

  return (
    <Link
      href="/saved"
      aria-label={`Saved packs${hydrated && count ? ` (${count})` : ""}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-heading transition-colors hover:bg-white/5 hover:text-pink"
    >
      <Heart size={19} />
      {hydrated && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-pink px-1 text-[10px] font-bold leading-[18px] text-base">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

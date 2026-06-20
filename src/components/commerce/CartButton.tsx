"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";

export function CartButton() {
  const count = useCart((s) => s.items.length);
  const openCart = useCart((s) => s.openCart);
  const hydrated = useHydrated();
  const showCount = hydrated && count > 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart${showCount ? `, ${count} item${count > 1 ? "s" : ""}` : ""}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-subtle text-body transition-all hover:border-lavender/40 hover:text-heading hover:shadow-glow"
    >
      <ShoppingBag size={18} />
      {showCount && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-gradient px-1 text-[11px] font-bold text-base">
          {count}
        </span>
      )}
    </button>
  );
}

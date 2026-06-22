"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, Check, Zap, ArrowUpRight } from "lucide-react";
import { useCart, type CartItem } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";
import { clsx } from "@/lib/clsx";
import { BUY_ON_ETSY, ETSY_SHOP_URL } from "@/data/site";
import { EtsyIcon } from "@/components/icons";

interface AddToCartButtonsProps {
  item: CartItem;
  /** "card" = compact buttons for grid; "detail" = larger for product page. */
  variant?: "card" | "detail";
  /** This pack's Etsy listing URL (used when BUY_ON_ETSY is on). */
  etsyUrl?: string | null;
}

export function AddToCartButtons({
  item,
  variant = "card",
  etsyUrl,
}: AddToCartButtonsProps) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const inCart = useCart((s) => s.items.some((i) => i.slug === item.slug));
  const hydrated = useHydrated();

  const added = hydrated && inCart;

  const buyNow = () => {
    add(item);
    router.push("/checkout");
  };

  const large = variant === "detail";

  // Etsy mode: a single button that opens the listing (Etsy handles checkout).
  if (BUY_ON_ETSY) {
    return (
      <a
        href={etsyUrl || ETSY_SHOP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Buy ${item.name} on Etsy`}
        className={clsx(
          "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-gradient bg-[length:200%_auto] font-bold text-base shadow-glow transition-all hover:bg-[position:100%_50%] hover:-translate-y-0.5",
          large ? "px-6 py-3 text-sm" : "px-4 py-2.5 text-sm",
        )}
      >
        <EtsyIcon className="h-4 w-4" /> Buy on Etsy
        <ArrowUpRight size={15} />
      </a>
    );
  }

  return (
    <div className={clsx("flex gap-2", large ? "flex-col sm:flex-row" : "")}>
      <button
        type="button"
        onClick={() => add(item)}
        aria-label={`Add ${item.name} to cart`}
        className={clsx(
          "group inline-flex flex-1 items-center justify-center gap-2 rounded-full border font-bold transition-all",
          large ? "px-6 py-3 text-sm" : "px-4 py-2.5 text-sm",
          added
            ? "border-cyan/40 bg-cyan/10 text-cyan"
            : "border-lavender/30 bg-lavender/10 text-heading hover:border-lavender/60 hover:bg-lavender/20 hover:shadow-glow",
        )}
      >
        {added ? (
          <>
            <Check size={16} /> In Cart
          </>
        ) : (
          <>
            <ShoppingCart size={16} /> Add to Cart
          </>
        )}
      </button>

      <button
        type="button"
        onClick={buyNow}
        aria-label={`Buy ${item.name} now`}
        className={clsx(
          "relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-gradient bg-[length:200%_auto] font-bold text-base shadow-glow transition-all hover:bg-[position:100%_50%] hover:-translate-y-0.5",
          large ? "px-6 py-3 text-sm" : "px-4 py-2.5 text-sm",
        )}
      >
        <Zap size={16} /> Buy Now
      </button>
    </div>
  );
}

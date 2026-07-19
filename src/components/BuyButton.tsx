import { Download } from "lucide-react";
import type { Product } from "@/lib/types";
import { CUSTOM_ETSY_URL } from "@/data/site";
import { currentPrice, etsyLink, formatPrice } from "@/lib/utils";

/**
 * Primary CTA. Custom-commission listings route to /custom. Packs with a real
 * Lemon Squeezy hosted-checkout URL sell on-site; until that store exists the
 * button sells through the pack's Etsy listing (shop-attributed link) so the
 * primary CTA is never dead.
 */
export function BuyButton({ product, className = "" }: { product: Product; className?: string }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl bg-volt px-7 py-3.5 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97] ${className}`;

  if (product.customCommission) {
    // Custom orders go straight to the real Etsy commission listing.
    return (
      <a href={CUSTOM_ETSY_URL} target="_blank" rel="noopener noreferrer" className={cls}>
        <Download size={16} aria-hidden />
        Order Custom - {formatPrice(currentPrice(product))}
      </a>
    );
  }

  const hasCheckout =
    product.lemonSqueezyUrl && product.lemonSqueezyUrl !== "LEMONSQUEEZY_URL";
  const href = hasCheckout ? product.lemonSqueezyUrl : etsyLink(product.etsyUrl);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      <Download size={16} aria-hidden />
      Buy Now - {formatPrice(currentPrice(product))}
    </a>
  );
}

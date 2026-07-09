import Link from "next/link";
import { Download } from "lucide-react";
import type { Product } from "@/lib/types";
import { currentPrice, formatPrice } from "@/lib/utils";

/**
 * Primary CTA. Custom-commission listings route to /custom; everything else
 * opens the product's Lemon Squeezy hosted checkout (stubbed until the store
 * exists — see README).
 */
export function BuyButton({ product, className = "" }: { product: Product; className?: string }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl bg-volt px-7 py-3.5 font-body text-sm font-semibold text-blush shadow-volt transition-all hover:bg-voltDim active:scale-[0.97] ${className}`;

  if (product.customCommission) {
    return (
      <Link href="/custom" className={cls}>
        Start a custom brief
      </Link>
    );
  }

  const stubbed = product.lemonSqueezyUrl === "LEMONSQUEEZY_URL";
  return (
    <a
      href={stubbed ? "#" : product.lemonSqueezyUrl}
      target={stubbed ? undefined : "_blank"}
      rel={stubbed ? undefined : "noopener noreferrer"}
      aria-disabled={stubbed}
      title={stubbed ? "Checkout goes live soon — grab it on Etsy meanwhile" : undefined}
      className={cls}
    >
      <Download size={16} aria-hidden />
      Buy Now — {formatPrice(currentPrice(product))}
    </a>
  );
}

import { ExternalLink } from "lucide-react";
import { etsyLink } from "@/lib/utils";

/**
 * Secondary trust-channel link to the listing's Etsy page. Callers pass the
 * canonical www.etsy.com URL; every outbound href is rewritten through
 * vectorkingstudio.etsy.com so the visit credits the shop.
 */
export function EtsyLink({
  etsyUrl,
  variant = "button",
  className = "",
}: {
  etsyUrl: string;
  variant?: "button" | "text" | "primary";
  className?: string;
}) {
  const href = etsyLink(etsyUrl);

  if (variant === "primary") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-volt px-7 py-3.5 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97] ${className}`}
      >
        Get it on Etsy <ExternalLink size={15} aria-hidden />
      </a>
    );
  }

  if (variant === "text") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 text-sm text-lilac underline-offset-4 hover:underline ${className}`}
      >
        View on Etsy <ExternalLink size={13} aria-hidden />
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-veil bg-ink2/70 px-5 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60 hover:text-blush ${className}`}
    >
      View on Etsy <ExternalLink size={14} aria-hidden />
    </a>
  );
}

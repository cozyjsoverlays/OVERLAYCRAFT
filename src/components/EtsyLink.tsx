import { ExternalLink } from "lucide-react";

/** Secondary trust-channel link to the listing's real Etsy page. */
export function EtsyLink({
  etsyUrl,
  variant = "button",
  className = "",
}: {
  etsyUrl: string;
  variant?: "button" | "text";
  className?: string;
}) {
  if (variant === "text") {
    return (
      <a
        href={etsyUrl}
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
      href={etsyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-veil bg-ink2/70 px-5 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60 hover:text-blush ${className}`}
    >
      View on Etsy <ExternalLink size={14} aria-hidden />
    </a>
  );
}

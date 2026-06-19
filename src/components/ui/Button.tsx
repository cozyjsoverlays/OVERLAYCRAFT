import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-gradient bg-[length:200%_auto] text-base shadow-glow hover:bg-[position:100%_50%] hover:shadow-glow-pink hover:-translate-y-0.5",
  secondary:
    "glass text-heading hover:border-lavender/40 hover:-translate-y-0.5 hover:shadow-glow",
  ghost:
    "text-body hover:text-heading hover:bg-white/5",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className,
  ariaLabel,
}: ButtonProps) {
  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {/* Shimmer sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-shimmer"
      />
    </>
  );

  const classes = clsx(base, variants[variant], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

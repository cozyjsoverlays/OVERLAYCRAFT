"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/data/site";
import { useWishlist } from "./WishlistProvider";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const { saved } = useWishlist();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-veil bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg tracking-wide text-blush">
            Overlay<span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">Craft</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-body text-sm transition-colors hover:text-lilac ${
                  active ? "text-volt" : "text-blush/85"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/saved"
            aria-label={`Saved overlays (${saved.length})`}
            className="relative grid h-9 w-9 place-items-center rounded-full border border-veil text-lilac transition-colors hover:border-lilac/60"
          >
            <Heart size={16} aria-hidden />
            {saved.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-volt px-1 font-mono text-[10px] text-white">
                {saved.length}
              </span>
            )}
          </Link>
          <Link
            href="/overlays"
            className="hidden rounded-xl bg-volt px-4 py-2 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97] md:block"
          >
            Browse Overlays
          </Link>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center text-blush md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-veil bg-ink px-4 py-4 md:hidden" aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 font-body text-blush/90 hover:text-lilac"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/overlays"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-xl bg-volt px-4 py-2.5 text-center font-body text-sm font-medium text-white"
          >
            Browse Overlays
          </Link>
        </nav>
      )}
    </header>
  );
}

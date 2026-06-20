"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { NAV_LINKS, LINKS } from "@/data/site";
import { CartButton } from "@/components/commerce/CartButton";
import { EtsyIcon } from "@/components/icons";
import { clsx } from "@/lib/clsx";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-subtle bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        className={clsx(
          "container-page flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20",
        )}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold text-heading"
        >
          <span aria-hidden>🐾</span>
          <span>
            Cozy<span className="gradient-text">Overlays</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-white/5 hover:text-heading"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={LINKS.etsy}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-body"
          >
            <EtsyIcon className="h-3.5 w-3.5" /> Also on Etsy
            <ArrowUpRight size={12} />
          </a>
          <CartButton />
          <Link
            href="/shop"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-gradient bg-[length:200%_auto] px-5 py-2.5 text-sm font-bold text-base shadow-glow transition-all hover:bg-[position:100%_50%] hover:-translate-y-0.5"
          >
            <Sparkles size={15} /> Shop Now
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <CartButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-heading hover:bg-white/5"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-subtle bg-base/95 backdrop-blur-xl lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-body hover:bg-white/5 hover:text-heading"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow"
            >
              <Sparkles size={15} /> Shop Now
            </Link>
            <a
              href={LINKS.etsy}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1 py-2 text-xs font-medium text-muted"
            >
              <EtsyIcon className="h-3.5 w-3.5" /> Also on Etsy{" "}
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

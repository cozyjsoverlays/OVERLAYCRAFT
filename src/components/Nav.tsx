"use client";

import { useEffect, useState } from "react";
import { Youtube, Send, Menu, X, ExternalLink } from "lucide-react";
import { NAV_LINKS, LINKS } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { PinterestIcon } from "@/components/icons";
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
        <a
          href="/#top"
          className="flex items-center gap-2 text-lg font-extrabold text-heading"
        >
          <span aria-hidden>🐾</span>
          <span>
            Cozy<span className="gradient-text">Overlays</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-white/5 hover:text-heading"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <IconLink href={LINKS.youtube} label="YouTube">
            <Youtube size={18} />
          </IconLink>
          <IconLink href={LINKS.pinterest} label="Pinterest">
            <PinterestIcon className="h-[18px] w-[18px]" />
          </IconLink>
          <IconLink href={LINKS.telegram} label="Telegram">
            <Send size={18} />
          </IconLink>
          <Button href={LINKS.etsy} external className="ml-1">
            Shop on Etsy <ExternalLink size={15} />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-heading hover:bg-white/5 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-subtle bg-base/95 backdrop-blur-xl lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-body hover:bg-white/5 hover:text-heading"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-2">
              <IconLink href={LINKS.youtube} label="YouTube">
                <Youtube size={18} />
              </IconLink>
              <IconLink href={LINKS.pinterest} label="Pinterest">
                <PinterestIcon className="h-[18px] w-[18px]" />
              </IconLink>
              <IconLink href={LINKS.telegram} label="Telegram">
                <Send size={18} />
              </IconLink>
            </div>
            <Button href={LINKS.etsy} external className="mt-3 w-full">
              Shop on Etsy <ExternalLink size={15} />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-subtle text-body transition-all hover:border-lavender/40 hover:text-heading hover:shadow-glow"
    >
      {children}
    </a>
  );
}

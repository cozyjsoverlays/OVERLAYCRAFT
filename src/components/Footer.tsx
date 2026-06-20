import Link from "next/link";
import { Youtube, Send, Instagram } from "lucide-react";
import { LINKS, SITE } from "@/data/site";
import { PACKS } from "@/data/packs";
import { CATEGORIES } from "@/data/categories";
import { XIcon, PinterestIcon, EtsyIcon } from "@/components/icons";

const SOCIALS = [
  { href: LINKS.twitter, label: "X (Twitter)", icon: <XIcon className="h-[18px] w-[18px]" /> },
  { href: LINKS.instagram, label: "Instagram", icon: <Instagram size={18} /> },
  { href: LINKS.pinterest, label: "Pinterest", icon: <PinterestIcon className="h-[18px] w-[18px]" /> },
  { href: LINKS.youtube, label: "YouTube", icon: <Youtube size={18} /> },
  { href: LINKS.telegram, label: "Telegram", icon: <Send size={18} /> },
  { href: LINKS.etsy, label: "Etsy", icon: <EtsyIcon className="h-[18px] w-[18px]" /> },
];

export function Footer() {
  const topPacks = PACKS.slice(0, 5);
  const browse = CATEGORIES.slice(0, 6);

  return (
    <footer className="relative overflow-hidden border-t border-subtle bg-surface/40">
      <div
        aria-hidden
        className="glow-blob absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 bg-lavender opacity-15"
      />
      <div className="container-page relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/#top"
              className="flex items-center gap-2 text-lg font-extrabold text-heading"
            >
              <span aria-hidden>🐾</span>
              Cozy<span className="gradient-text">Overlays</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-body">{SITE.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-subtle text-body transition-all hover:border-lavender/40 hover:text-heading hover:shadow-glow"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Packs */}
          <FooterCol title="Top Packs">
            {topPacks.map((p) => (
              <FooterLink key={p.slug} href={`/shop/${p.slug}`}>
                {p.name
                  .replace(" Animated Stream Package", "")
                  .replace(" Animated Package", "")
                  .replace(" Animated Pack", "")}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Browse */}
          <FooterCol title="Browse">
            <FooterLink href="/shop">All Packs</FooterLink>
            {browse.map((c) => (
              <FooterLink key={c.name} href={c.href}>
                {c.emoji} {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Help */}
          <FooterCol title="Help">
            <FooterLink href="/#faq">FAQ</FooterLink>
            <FooterLink href="/#how">How It Works</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/refund-policy">Refund Policy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href={LINKS.etsyContact} external>
              Contact
            </FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-subtle pt-6 text-sm text-muted sm:flex-row">
          <p>© 2026 CozyOverlays / CozyJsStudio. All rights reserved.</p>
          <p>Made with 🐾 for streamers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-heading">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className =
    "text-sm text-body transition-colors hover:text-lavender";
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} className={className}>
        {children}
      </Link>
    </li>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ETSY_SHOP_URL, SITE, SOCIAL_LINKS } from "@/data/site";
import { Logo } from "./Logo";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Overlays", href: "/overlays" },
    { label: "Latest Drops", href: "/overlays/latest-drops" },
    { label: "Custom Overlays", href: "/custom" },
    { label: "Free Tools", href: "/free-tools" },
    { label: "Saved", href: "/saved" },
  ],
  Studio: [
    { label: "About", href: "/about" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  Legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "License", href: "/license" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="border-t border-veil bg-ink">
      {/* Email capture */}
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="rounded-2xl border border-veil bg-ink2/70 p-8 text-center backdrop-blur md:p-12">
          <h2 className="font-display text-2xl text-blush md:text-3xl">
            Get new drops <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">+ a free overlay</span>
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-mist">
            One email when a new world drops. Your welcome gift: a free animated overlay screen.
          </p>
          {done ? (
            <p className="mt-6 font-body text-lilac">You&apos;re in - check your inbox. ✦</p>
          ) : (
            <form
              className="mx-auto mt-6 flex max-w-md gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire to email provider (Kit / Mailchimp / Resend audience)
                if (email.includes("@")) setDone(true);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@stream.tv"
                className="w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush placeholder:text-mist/60 focus:border-lilac/60 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-volt px-5 py-3 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-display text-blush">OverlayCraft</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Forged for your stream. Animated overlay worlds by {SITE.shop} - Star
            Seller, 1,300+ streamers equipped.
          </p>
          <a
            href={ETSY_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-lilac underline-offset-4 hover:underline"
          >
            {SITE.shop} on Etsy ↗
          </a>

          <p className="mt-5 font-display text-xs uppercase tracking-[0.3em] text-lilac">Follow</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg border border-veil px-3 py-1.5 text-xs text-blush/80 transition-colors hover:border-lilac/60 hover:text-lilac"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <nav key={group} aria-label={group}>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-lilac">{group}</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-blush/80 hover:text-lilac">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-veil py-6 text-center text-xs text-mist">
        © {new Date().getFullYear()} {SITE.name} · {SITE.shop} · All overlays are original works.
      </div>
    </footer>
  );
}

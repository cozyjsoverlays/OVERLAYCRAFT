import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ETSY_SHOP_URL, SITE, TRUST_BAR } from "@/data/site";

export const metadata: Metadata = {
  title: "About - The Atelier Behind OverlayCraft",
  description:
    "OverlayCraft is the home of VectorKingStudio - six years of animated stream overlay craft, 1,300+ streamers equipped, 4.9★ on Etsy. This is where stream worlds are forged.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <SectionHeading label="The atelier" title="About OverlayCraft" />
      <div className="mt-8 space-y-5 leading-relaxed text-blush/85">
        <p>
          OverlayCraft is the home of <strong className="text-lilac">{SITE.shop}</strong> -
          a one-artist studio that has spent six years doing exactly one thing:
          building animated worlds for streamers.
        </p>
        <p>
          It started on Etsy in 2020. Since then: over 1,300 packs delivered,
          a 4.9★ average across 193 reviews, and a Star Seller badge held
          season after season. Ravens, wolves, dragons, sakura storms, cozy
          foxes - every pack begins as a scene, not a template. Something has
          to feel alive in the corner of the frame.
        </p>
        <p>
          This site is the studio&apos;s own storefront: the full catalog with
          instant download, plus the commission desk where one-of-one stream
          identities are forged - emotes, badges, mascots and all.
        </p>
        <p>
          The Etsy shop stays open, and every listing here links to its Etsy
          twin - buy wherever you&apos;re comfortable. Same files, same craft,
          same artist behind both counters.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 rounded-2xl border border-veil bg-ink2/70 p-6">
        {TRUST_BAR.map((t) => (
          <span key={t} className="font-mono text-xs text-mist">{t}</span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/overlays"
          className="rounded-xl bg-volt px-6 py-3 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
        >
          Browse the catalog
        </Link>
        <a
          href={ETSY_SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60"
        >
          Visit the Etsy shop ↗
        </a>
      </div>
    </div>
  );
}

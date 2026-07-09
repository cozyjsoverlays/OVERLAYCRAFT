import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ETSY_SHOP_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Reach the Studio",
  description:
    "Questions about a pack, a download, or a custom commission? Reach OverlayCraft / VectorKingStudio — replies within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <SectionHeading label="Talk to the studio" title="Contact" />
      <p className="mt-6 leading-relaxed text-blush/85">
        Pack question, download hiccup, or a commission idea? We answer
        everything within 24 hours.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:hello@overlaycraft.com"
          className="rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur transition-colors hover:border-lilac/50"
        >
          <p className="font-display text-lg text-blush">Email</p>
          <p className="mt-1 font-mono text-sm text-lilac">hello@overlaycraft.com</p>
          <p className="mt-2 text-sm text-mist">Best for order issues & commissions.</p>
        </a>
        <a
          href={ETSY_SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur transition-colors hover:border-lilac/50"
        >
          <p className="font-display text-lg text-blush">Etsy Messages</p>
          <p className="mt-1 font-mono text-sm text-lilac">VectorKingStudio ↗</p>
          <p className="mt-2 text-sm text-mist">If you purchased through Etsy.</p>
        </a>
      </div>
      <p className="mt-8 text-sm text-mist">
        Commission briefs get the fastest track through the{" "}
        <Link href="/custom" className="text-lilac underline-offset-4 hover:underline">
          Custom Overlays intake form
        </Link>
        .
      </p>
    </div>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SITE } from "@/data/site";

/**
 * Shared chrome for a free-tool page: JSON-LD WebApplication schema, breadcrumb,
 * heading, the tool itself, an optional FAQ and the shop CTA. Keeps each tool
 * page down to its metadata + a couple of props.
 */
export function ToolShell({
  slug,
  title,
  intro,
  children,
  faq,
}: {
  slug: string;
  title: string;
  intro: string;
  children: ReactNode;
  faq?: { question: string; answer: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url: `${SITE.url}/free-tools/${slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="pb-6 text-xs text-mist" aria-label="Breadcrumb">
        <Link href="/free-tools" className="hover:text-lilac">Free Tools</Link>
        <span className="px-1.5">/</span>
        <span className="text-blush/70">{title}</span>
      </nav>

      <SectionHeading label="Free tool" title={title} />
      <p className="mt-6 max-w-2xl leading-relaxed text-mist">{intro}</p>

      <div className="mt-8">{children}</div>

      {faq && faq.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl text-blush">FAQ</h2>
          <div className="mt-5">
            <FAQAccordion items={faq} />
          </div>
        </section>
      )}

      <div className="mt-14 rounded-2xl border border-veil bg-ink2/70 p-7 text-center backdrop-blur">
        <h2 className="font-display text-xl text-blush">
          Ready for the{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">full look?</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          These tools are free forever. When you want a stream that turns heads, our
          animated overlay packs drop straight into OBS with real preview videos.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/overlays" className="rounded-xl bg-volt px-6 py-3 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]">
            Browse Overlays
          </Link>
          <Link href="/free-tools" className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60 hover:text-blush">
            More free tools
          </Link>
        </div>
      </div>
    </div>
  );
}

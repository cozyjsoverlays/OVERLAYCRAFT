import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Download, Monitor } from "lucide-react";
import { PRODUCTS, getProduct, relatedProducts } from "@/data/products";
import { REVIEWS, SITE } from "@/data/site";
import { absUrl, discountPercent, etsyLink, formatPrice, currentPrice, productPath } from "@/lib/utils";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { BuyButton } from "@/components/BuyButton";
import { EtsyLink } from "@/components/EtsyLink";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { Stars } from "@/components/Stars";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.category[0], slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const price = formatPrice(currentPrice(product));
  const seoTitle = product.etsyTitle ?? product.title;
  const seoDesc = product.etsyDescription ?? product.description;
  // If the source text is long enough it stands alone; otherwise append the
  // stock keyword-tail so meta descriptions never come out empty of context.
  const metaDesc =
    seoDesc.length >= 140
      ? seoDesc.slice(0, 155)
      : `${seoDesc.slice(0, 120)} Animated stream package for Twitch, YouTube & Kick. Instant download, OBS-ready.`;
  return {
    title: `${seoTitle} - ${price} Instant Download`,
    description: metaDesc,
    keywords: product.tags,
    alternates: { canonical: productPath(product) },
    openGraph: {
      title: seoTitle,
      description: metaDesc,
      images: [absUrl(product.thumbnails[0])],
      type: "website",
    },
  };
}

const INSTALL_STEPS = [
  "Unzip the pack - screens, frames, alerts and panels are sorted into folders.",
  "In OBS/Streamlabs: add a Media Source to your scene and select the animated file (loop enabled).",
  "Add your facecam frame as an Image source above your camera.",
  "Upload alerts to your alert tool (StreamElements/Streamlabs) and panels to your channel page.",
  "Go live. That's genuinely it.",
];

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const product = getProduct(slug);
  if (!product || product.category[0] !== category) notFound();

  const discount = discountPercent(product);
  const related = relatedProducts(product);
  const reviews = REVIEWS.filter((r) => r.pack === product.title.split(" Overlay")[0]).length
    ? REVIEWS.filter((r) => r.pack === product.title.split(" Overlay")[0])
    : REVIEWS.slice(0, 2);

  const seoTitle = product.etsyTitle ?? product.title;
  const visibleDescription = product.etsyDescription ?? product.description;
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: seoTitle,
    description: visibleDescription,
    image: absUrl(product.thumbnails[0]),
    url: `${SITE.url}${productPath(product)}`,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: currentPrice(product).toFixed(2),
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: `${SITE.url}${productPath(product)}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "193",
    },
  };
  if (product.etsyTitle && product.etsyTitle !== product.title) {
    jsonLd.alternateName = product.title;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="pb-6 text-xs text-mist" aria-label="Breadcrumb">
        <Link href="/overlays" className="hover:text-lilac">Overlays</Link>
        <span className="px-1.5">/</span>
        <Link href={`/overlays/${product.category[0]}`} className="capitalize hover:text-lilac">
          {product.category[0].replace(/-/g, " ")}
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-blush/70">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: gallery */}
        <ProductGallery product={product} />

        {/* Right: buy panel */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.newDrop && (
              <span className="rounded-full bg-volt px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">New Drop</span>
            )}
            {product.bestseller && (
              <span className="rounded-full bg-lilac px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">Bestseller</span>
            )}
            {discount !== null && (
              <span className="rounded-full bg-volt px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">-{discount}% OFF</span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl leading-tight text-blush md:text-4xl">
            {product.title}
          </h1>
          {product.etsyTitle && product.etsyTitle !== product.title && (
            <span className="sr-only">{product.etsyTitle}</span>
          )}

          <div className="mt-3 flex items-center gap-3">
            <Stars rating={4.9} />
            <span className="font-mono text-xs text-mist">4.9 · 193 shop reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3 font-mono">
            <span className="text-4xl text-volt">{formatPrice(currentPrice(product))}</span>
            {product.salePrice !== null && (
              <span className="text-lg text-mist line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <div className="mt-5 whitespace-pre-line leading-relaxed text-blush/85">
            {visibleDescription}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <BuyButton product={product} className="flex-1" />
            <EtsyLink etsyUrl={product.etsyUrl} className="flex-1" />
          </div>

          <div className="mt-4 flex items-center gap-4">
            <SaveButton slug={product.slug} />
            <ShareButton
              title={product.title}
              path={productPath(product)}
              etsyUrl={product.etsyUrl}
              thumbnail={product.thumbnails[0]}
            />
            <a
              href={etsyLink(product.etsyUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-lilac underline-offset-4 hover:underline"
            >
              ♡ Save on Etsy
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-veil bg-ink2/50 p-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-mist">
              <Download size={13} aria-hidden className="text-lilac" /> Instant download
            </span>
            {product.compatibleWith.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 font-mono text-xs text-mist">
                <Monitor size={13} aria-hidden className="text-lilac" /> {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Below the fold */}
      <div className="mt-16 grid gap-10 lg:grid-cols-3">
        <section className="rounded-2xl border border-veil bg-ink2/70 p-7 backdrop-blur lg:col-span-2">
          <h2 className="font-display text-xl text-blush">What&apos;s Included</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {product.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-blush/85">
                <Check size={15} className="mt-0.5 shrink-0 text-lilac" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-xl text-blush">How to Install</h2>
          <ol className="mt-5 space-y-3">
            {INSTALL_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-blush/85">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-abyss/40 font-mono text-xs text-lilac">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur">
            <h2 className="font-display text-lg text-blush">License</h2>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              Personal streaming license: use on your own channels (Twitch, YouTube,
              Kick, TikTok), unlimited streams, forever. No resale, no
              redistribution, no re-editing for sale.{" "}
              <Link href="/license" className="text-lilac underline-offset-4 hover:underline">
                Full license terms
              </Link>
            </p>
          </div>
          {reviews.map((r) => (
            <ReviewCard key={r.author} review={r} />
          ))}
        </aside>
      </div>

      {/* Keyword tags - indexable per-listing pills */}
      {product.tags.length > 0 && (
        <section className="mt-14" aria-label="Keywords">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-lilac">
            Also known as
          </h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <li
                key={t}
                className="rounded-full bg-abyss/20 px-2.5 py-1 text-[11px] text-lilac"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related */}
      <section className="mt-20">
        <SectionHeading label="Same world, different doors" title="You May Also Like" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

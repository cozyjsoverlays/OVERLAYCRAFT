import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowLeft, Shield, Zap, Download } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { RelatedProducts } from "@/components/commerce/RelatedProducts";
import { AddToCartButtons } from "@/components/commerce/AddToCartButtons";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { formatCents } from "@/lib/money";
import { COMPATIBILITY, BUY_ON_ETSY } from "@/data/site";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Pack not found" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

const INCLUDED = [
  "Transparent .WEBM animated files",
  "Static .PNG versions included",
  "Sized for Twitch, YouTube, Kick & TikTok",
  "Instant secure download after payment",
];

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);
  const relatedFallback =
    related.length > 0
      ? related
      : all.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-12 pt-32 md:pt-40">
          <AuroraBackground />
          <div className="container-page">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-lavender transition-colors hover:text-pink"
            >
              <ArrowLeft size={15} /> Back to shop
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Gallery */}
              <div>
                <ProductGallery product={product} />
              </div>

              {/* Details */}
              <div>
                {product.bestseller && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-gradient px-3 py-1 text-xs font-bold text-base shadow-glow">
                    ★ Bestseller
                  </span>
                )}
                <h1 className="mt-3 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight text-heading">
                  {product.name}
                </h1>
                <p className="mt-4 text-lg text-body">{product.description}</p>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-lavender">
                    {formatCents(product.priceCents, product.currency)}
                  </span>
                  <span className="text-sm text-muted">one-time · yours forever</span>
                </div>

                <div className="mt-6">
                  <AddToCartButtons
                    item={{
                      slug: product.slug,
                      name: product.name,
                      priceCents: product.priceCents,
                      image: product.image,
                      currency: product.currency,
                    }}
                    variant="detail"
                    etsyUrl={product.etsyUrl}
                  />
                </div>

                {/* Trust row */}
                <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Zap size={14} className="text-cyan" /> Instant download
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Shield size={14} className="text-cyan" />{" "}
                    {BUY_ON_ETSY ? "Buy safely on Etsy" : "Secure PayPal checkout"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Download size={14} className="text-cyan" /> .WEBM + .PNG
                  </span>
                </div>

                {/* What's included */}
                <div className="mt-8 glass rounded-2xl p-6">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-heading">
                    What&apos;s included
                  </h2>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {[...product.features, ...INCLUDED].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-body"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lavender/15 text-lavender">
                          <Check size={12} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compatibility */}
                <div className="mt-6">
                  <h2 className="text-xs font-bold uppercase tracking-wide text-muted">
                    Works with
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {COMPATIBILITY.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-subtle bg-surface/60 px-3 py-1.5 text-xs font-medium text-body"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="section-pad border-t border-subtle pt-16">
          <div className="container-page">
            <h2 className="text-2xl font-extrabold text-heading">
              You might also love
            </h2>
            <div className="mt-8">
              <RelatedProducts products={relatedFallback} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

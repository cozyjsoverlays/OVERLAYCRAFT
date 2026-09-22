import Link from "next/link";
import { getProduct } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

/**
 * Recommendation block shown at the bottom of every free-tool page: a couple of
 * related guides and a row of matching pack cards. Drives internal linking and
 * gives each tool a next step. Unknown slugs are skipped so a link is never dead.
 */
export function ToolRecommend({
  posts = [],
  packs = [],
}: {
  posts?: { label: string; href: string }[];
  packs?: string[];
}) {
  const products = packs.map((s) => getProduct(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (!products.length && !posts.length) return null;

  return (
    <div className="mt-16 space-y-12">
      {products.length > 0 && (
        <section>
          <h2 className="font-display text-2xl text-blush">Packs to match your channel</h2>
          <p className="mt-2 text-sm text-mist">Animated overlay worlds with real video previews, instant download.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <h2 className="font-display text-2xl text-blush">Related guides</h2>
          <ul className="mt-5 space-y-3">
            {posts.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="flex items-center justify-between gap-3 rounded-xl border border-veil bg-ink2/70 px-5 py-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-lilac/50"
                >
                  <span className="font-body text-sm text-blush">{p.label}</span>
                  <span className="shrink-0 font-body text-sm text-lilac">Read →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

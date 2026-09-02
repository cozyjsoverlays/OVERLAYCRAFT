import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { ShopGrid } from "@/components/ShopGrid";
import { SITE } from "@/data/site";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.name} - Animated Twitch & Kick Stream Packages`,
    description: cat.intro.slice(0, 155),
    alternates: { canonical: `/overlays/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const products = productsByCategory(cat.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Overlays", item: `${SITE.url}/overlays` },
        { "@type": "ListItem", position: 2, name: cat.name, item: `${SITE.url}/overlays/${cat.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${cat.name} - ${SITE.name}`,
      description: cat.intro.slice(0, 300),
      url: `${SITE.url}/overlays/${cat.slug}`,
      isPartOf: { "@id": `${SITE.url}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: products.length,
        itemListElement: products.slice(0, 24).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE.url}/overlays/${p.category[0]}/${p.slug}`,
          name: p.title,
        })),
      },
    },
  ];

  // Mood-tinted page glow: soft categories lean lilac, dark ones lean abyss-deep
  const glow =
    cat.mood === "lilac"
      ? "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(233,179,251,0.12), transparent)"
      : "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(59,2,112,0.8), transparent)";

  return (
    <div style={{ backgroundImage: glow }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-lilac">
          {cat.glyph} Collection
        </p>
        <h1 className="mt-2 font-display text-3xl text-blush md:text-5xl">{cat.name}</h1>
        <div className="mt-4 flex items-center gap-3">
          <span className="h-px w-16 bg-veil" />
          <span className="h-1.5 w-1.5 rotate-45 bg-lilac" />
          <span className="h-px w-16 bg-veil" />
        </div>
        {/* Indexable category intro */}
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mist md:text-base">
          {cat.intro}
        </p>
        <div className="mt-10">
          <ShopGrid products={products} lockedCategory={cat.slug} />
        </div>
      </div>
    </div>
  );
}

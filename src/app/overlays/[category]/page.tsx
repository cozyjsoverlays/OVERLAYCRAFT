import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { ShopGrid } from "@/components/ShopGrid";

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
  // Mood-tinted page glow: soft categories lean lilac, dark ones lean abyss-deep
  const glow =
    cat.mood === "lilac"
      ? "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(233,179,251,0.12), transparent)"
      : "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(59,2,112,0.8), transparent)";

  return (
    <div style={{ backgroundImage: glow }}>
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

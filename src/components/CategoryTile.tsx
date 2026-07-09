import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryTile({ category, count }: { category: Category; count: number }) {
  const moodTint =
    category.mood === "lilac"
      ? "from-lilac/15 via-abyss/30 to-ink"
      : "from-abyss/60 via-abyss/25 to-ink";

  return (
    <Link
      href={`/overlays/${category.slug}`}
      className={`group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-veil bg-gradient-to-b ${moodTint} p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lilac/50 hover:shadow-volt-soft`}
    >
      <span className="absolute right-4 top-4 text-4xl opacity-30 transition-all duration-300 group-hover:scale-110 group-hover:opacity-60" aria-hidden>
        {category.glyph}
      </span>
      <h3 className="font-display text-lg text-blush transition-colors group-hover:text-lilac">
        {category.name}
      </h3>
      <p className="mt-1 font-mono text-xs text-mist">
        {count} {count === 1 ? "pack" : "packs"}
      </p>
    </Link>
  );
}

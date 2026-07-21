import Link from "next/link";
import type { Category } from "@/lib/types";
import { TileMosaic } from "./TileMosaic";

export function CategoryTile({
  category,
  count,
  previews = [],
}: {
  category: Category;
  count: number;
  /** Real pack cover image URLs to show as a mosaic behind the label. */
  previews?: string[];
}) {
  const moodTint =
    category.mood === "lilac"
      ? "from-lilac/15 via-abyss/30 to-ink"
      : "from-abyss/60 via-abyss/25 to-ink";

  return (
    <Link
      href={`/overlays/${category.slug}`}
      className={`group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-veil bg-gradient-to-b ${moodTint} transition-all duration-300 hover:-translate-y-1 hover:border-lilac/50 hover:shadow-volt-soft`}
    >
      {/* Real pack previews */}
      <TileMosaic previews={previews} />

      {/* Readability scrim so the label pops over the art */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />

      <span className="absolute right-3 top-3 text-3xl opacity-80 drop-shadow transition-transform duration-300 group-hover:scale-110" aria-hidden>
        {category.glyph}
      </span>

      <div className="relative p-4">
        <h3 className="font-display text-lg text-blush drop-shadow transition-colors group-hover:text-lilac">
          {category.name}
        </h3>
        <p className="mt-0.5 font-mono text-xs text-mist">
          {count} {count === 1 ? "pack" : "packs"}
        </p>
      </div>
    </Link>
  );
}

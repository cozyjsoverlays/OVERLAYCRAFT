"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/lib/types";
import { CATEGORIES } from "@/data/categories";
import { currentPrice } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

type SortKey = "newest" | "bestsellers" | "price-asc" | "price-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "bestsellers", label: "Bestsellers" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
];

export function ShopGrid({
  products,
  lockedCategory,
}: {
  products: Product[];
  /** When set (category pages), the category filter UI is hidden. */
  lockedCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(lockedCategory ?? "all");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category.includes(category));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.some((c) => c.includes(q))
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => currentPrice(a) - currentPrice(b));
        break;
      case "price-desc":
        list.sort((a, b) => currentPrice(b) - currentPrice(a));
        break;
      case "bestsellers":
        list.sort((a, b) => Number(b.bestseller ?? false) - Number(a.bestseller ?? false) || Number(b.featured) - Number(a.featured));
        break;
      case "newest":
        list.sort((a, b) => Number(b.newDrop ?? false) - Number(a.newDrop ?? false));
        break;
    }
    return list;
  }, [products, category, query, sort]);

  const filterCategories = CATEGORIES.filter((c) => c.slug !== "latest-drops");

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist" aria-hidden />
          <label htmlFor="shop-search" className="sr-only">Search overlays</label>
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packs, themes, tags…"
            className="w-full rounded-xl border border-veil bg-ink2/70 py-2.5 pl-10 pr-4 font-body text-sm text-blush placeholder:text-mist/60 focus:border-lilac/60 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSort(s.key)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 font-body text-xs transition-colors ${
                sort === s.key
                  ? "bg-volt text-white"
                  : "border border-veil text-mist hover:text-lilac"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {!lockedCategory && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              category === "all" ? "bg-abyss/60 text-lilac" : "bg-abyss/20 text-lilac/70 hover:bg-abyss/40"
            }`}
          >
            All
          </button>
          {filterCategories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                category === c.slug ? "bg-abyss/60 text-lilac" : "bg-abyss/20 text-lilac/70 hover:bg-abyss/40"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <p className="mt-8 font-mono text-xs text-mist" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "pack" : "packs"}
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-veil bg-ink2/50 py-20 text-center">
          <p className="font-display text-xl text-blush">Nothing in this corner of the atelier…</p>
          <p className="mt-2 text-sm text-mist">Try a different search or clear the filters.</p>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={category.href}
      className="glass group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-lavender/40 hover:shadow-glow"
    >
      <ArrowUpRight
        size={16}
        className="absolute right-3 top-3 text-muted opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="text-3xl transition-transform duration-300 group-hover:scale-110"
      >
        {category.emoji}
      </span>
      <span className="text-sm font-bold text-heading">{category.name}</span>
      <span className="text-xs text-muted">{category.count} packs</span>
    </Link>
  );
}

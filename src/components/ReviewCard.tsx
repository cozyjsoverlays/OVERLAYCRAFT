import { Star, Quote } from "lucide-react";
import type { Review } from "@/lib/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="glass flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lavender/40 hover:shadow-glow">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label={`${review.stars} out of 5 stars`}>
          {Array.from({ length: review.stars }).map((_, i) => (
            <Star key={i} size={15} className="fill-pink text-pink" />
          ))}
        </div>
        <Quote size={20} className="text-lavender/30" aria-hidden />
      </div>

      <blockquote className="flex-1 text-pretty text-[15px] leading-relaxed text-body">
        “{review.quote}”
      </blockquote>

      <figcaption className="flex items-center justify-between border-t border-subtle pt-4">
        <div>
          <p className="text-sm font-bold text-heading">{review.name}</p>
          <p className="text-xs text-muted">{review.date}</p>
        </div>
        <span className="rounded-full border border-subtle bg-surface-2/60 px-2.5 py-1 text-[11px] font-medium text-lavender">
          {review.pack}
        </span>
      </figcaption>
    </figure>
  );
}

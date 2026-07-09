import type { Review } from "@/lib/types";
import { Stars } from "./Stars";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="w-80 shrink-0 rounded-2xl border border-veil bg-ink2/70 p-5 backdrop-blur">
      <Stars rating={review.rating} />
      <blockquote className="mt-3 text-sm leading-relaxed text-blush/85">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-baseline justify-between gap-2">
        <span className="font-body text-sm font-medium text-lilac">{review.author}</span>
        {review.pack && <span className="font-mono text-[11px] text-mist">{review.pack}</span>}
      </figcaption>
    </figure>
  );
}

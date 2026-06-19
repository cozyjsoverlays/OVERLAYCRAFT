import { Star } from "lucide-react";
import { REVIEWS, REVIEW_SUMMARY } from "@/data/reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { Reveal } from "@/components/ui/Reveal";

export function Reviews() {
  return (
    <section id="reviews" className="section-pad">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-lavender">
            Reviews
          </span>
          <div className="mt-4 flex flex-col items-center gap-2">
            <span className="text-[clamp(3.5rem,8vw,5.5rem)] font-extrabold leading-none gradient-text">
              {REVIEW_SUMMARY.average}
            </span>
            <div className="flex gap-1" aria-label="4.9 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={22} className="fill-pink text-pink" />
              ))}
            </div>
            <p className="mt-1 text-base text-body">
              from {REVIEW_SUMMARY.count} verified reviews on Etsy
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, i) => (
            <Reveal key={`${review.name}-${i}`} delay={(i % 4) * 0.06}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

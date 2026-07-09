import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { CategoryTile } from "@/components/CategoryTile";
import { ReviewCard } from "@/components/ReviewCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Stars } from "@/components/Stars";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS, productsByCategory, getProduct } from "@/data/products";
import { FAQ, HOW_IT_WORKS, REVIEWS, TRUST_BAR } from "@/data/site";
import { productPath } from "@/lib/utils";

const TILE_CATEGORIES = ["crow", "wolf", "dragon", "cat", "japanese", "sakura", "cozy", "phoenix"];

export default function HomePage() {
  const latestDrops = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const bestseller = getProduct("dark-gothic-raven-animated-stream-package")!;
  const bestsellerReview = REVIEWS[0];

  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section className="border-y border-veil bg-ink2/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 py-4 md:px-8">
          {TRUST_BAR.map((item) => (
            <span key={item} className="font-mono text-xs text-mist">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Latest drops */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading label="Fresh from the atelier" title="Latest Drops" />
            <Link href="/overlays" className="text-sm text-lilac underline-offset-4 hover:underline">
              View all packs →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestDrops.map((p, i) => (
            <Reveal key={p.slug} index={i}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Shop by theme */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <Reveal>
          <SectionHeading label="Pick your world" title="Shop by Theme" center />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {TILE_CATEGORIES.map((slug, i) => {
            const cat = CATEGORIES.find((c) => c.slug === slug)!;
            return (
              <Reveal key={slug} index={i}>
                <CategoryTile category={cat} count={productsByCategory(slug).length} />
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Bestseller spotlight */}
      <section className="border-y border-veil bg-gradient-to-b from-abyss/25 to-transparent">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-8">
          <Reveal>
            <Link
              href={productPath(bestseller)}
              className="block overflow-hidden rounded-2xl border border-veil shadow-volt-soft"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bestseller.thumbnails[0]}
                alt={bestseller.title}
                className="aspect-video w-full bg-ink2 object-cover"
              />
            </Link>
          </Reveal>
          <Reveal index={1}>
            <span className="rounded-full bg-lilac px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-abyss">
              Bestseller
            </span>
            <h2 className="mt-4 font-display text-3xl text-blush md:text-4xl">{bestseller.title}</h2>
            <p className="mt-4 leading-relaxed text-mist">{bestseller.description}</p>
            <figure className="mt-6 rounded-xl border border-veil bg-ink2/70 p-4">
              <Stars rating={bestsellerReview.rating} />
              <blockquote className="mt-2 text-sm text-blush/85">
                &ldquo;{bestsellerReview.text}&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-xs text-lilac">— {bestsellerReview.author}</figcaption>
            </figure>
            <Link
              href={productPath(bestseller)}
              className="mt-7 inline-block rounded-xl bg-volt px-7 py-3.5 font-body text-sm font-semibold text-blush shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
            >
              See the pack
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Custom commission banner */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-veil bg-gradient-to-br from-abyss/50 via-ink2 to-ink p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-lilac">
                Commissions open
              </p>
              <h2 className="mt-3 font-display text-3xl text-blush md:text-4xl">
                A stream identity{" "}
                <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">
                  nobody else can buy
                </span>
              </h2>
              <p className="mt-4 leading-relaxed text-mist">
                Your character, your palette, your world — custom overlay packages
                forged from a brief, from <span className="font-mono text-volt">$100</span>.
                Brief → concept → two revision rounds → delivery.
              </p>
              <Link
                href="/custom"
                className="mt-7 inline-block rounded-xl bg-volt px-7 py-3.5 font-body text-sm font-semibold text-blush shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
              >
                Get a Custom Design
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/custom/before.jpg" alt="Stream before a custom overlay" className="aspect-video rounded-xl border border-veil bg-ink object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/custom/after.jpg" alt="Stream after a custom overlay" className="aspect-video rounded-xl border border-lilac/40 bg-ink2 object-cover shadow-volt-soft" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <Reveal>
          <SectionHeading label="From checkout to live" title="How It Works" center />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal key={step.title} index={i}>
              <div className="rounded-2xl border border-veil bg-ink2/70 p-6 text-center backdrop-blur">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-abyss/40 font-mono text-sm text-lilac">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg text-blush">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reviews marquee */}
      <section className="overflow-hidden border-y border-veil bg-ink2/30 py-16">
        <Reveal className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading label="1,300+ streamers equipped" title="What Streamers Say" center />
        </Reveal>
        <div className="mt-10 flex w-max animate-marquee gap-5 pl-5 [--tw-translate-x:0] hover:[animation-play-state:paused]">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} review={r} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8">
        <Reveal>
          <SectionHeading label="Questions, answered" title="FAQ" center />
        </Reveal>
        <Reveal index={1} className="mt-10">
          <FAQAccordion items={FAQ.slice(0, 5)} />
        </Reveal>
        <p className="mt-6 text-center text-sm text-mist">
          More questions?{" "}
          <Link href="/faq" className="text-lilac underline-offset-4 hover:underline">
            Read the full FAQ
          </Link>
        </p>
      </section>
    </>
  );
}

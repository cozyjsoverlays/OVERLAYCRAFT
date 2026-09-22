import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/Stars";
import { VideoPreview } from "@/components/VideoPreview";
import { etsyImage } from "@/lib/utils";
import { SITE } from "@/data/site";
import { CUSTOM_SHOWCASE } from "@/data/custom-showcase";

export const metadata: Metadata = {
  title: "Custom Commission Overlays - Real Work, Real Reviews (from $100)",
  description:
    "See real custom Twitch, YouTube & Kick commission work by VectorKingStudio: the full gallery, preview video and verified 5-star buyer reviews. One-of-one animated stream identities from $100.",
  alternates: { canonical: "/commissions" },
  openGraph: {
    title: "Custom Commission Overlays - Real Work, Real Reviews",
    description:
      "The full gallery, preview video and verified 5-star reviews for VectorKingStudio custom stream commissions. From $100.",
    images: [etsyImage(CUSTOM_SHOWCASE.gallery[0])],
  },
};

const PROCESS = [
  { step: "Brief", desc: "Share your theme, palette, references and platform. We reply within 24h." },
  { step: "Concept", desc: "A concept direction for your world: composition, mood and motion notes." },
  { step: "Revisions x2", desc: "Two full revision rounds are included, we iterate until it is yours." },
  { step: "Delivery", desc: "Every file exported for OBS and Streamlabs, organized and install-ready." },
];

const INCLUDED = [
  "Animated Starting Soon, BRB, Ending and Offline screens",
  "Custom facecam / webcam frame and in-game overlay",
  "Animated alerts (follow, sub, donation, raid) and transitions",
  "Info panels and channel banners",
  "Emotes, sub badges and a mascot logo (Full Brand tier)",
  "Source-matched art direction across every single asset",
];

export default function CommissionsPage() {
  const { gallery, video, aggregate, reviews, listingUrl } = CUSTOM_SHOWCASE;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Custom Twitch, YouTube & Kick Overlay Commission",
    description:
      "One-of-one animated stream identity commissioned from VectorKingStudio: overlays, screens, alerts, panels, emotes, sub badges and mascot logo.",
    image: gallery.slice(0, 6).map((g) => etsyImage(g)),
    brand: { "@type": "Brand", name: SITE.name },
    url: `${SITE.url}/commissions`,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "100",
      priceCurrency: "USD",
      offerCount: aggregate.count,
      availability: "https://schema.org/InStock",
      url: listingUrl,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregate.average.toFixed(1),
      reviewCount: String(aggregate.count),
      bestRating: "5",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewBody: r.text,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="text-center">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-lilac">
          Custom commissions
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-blush md:text-5xl">
          Real commission work,{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">
            real streamer reviews
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-mist">
          A one-of-one animated stream identity, designed from your brief and
          animated by hand. Every screen, alert, panel, emote and badge matched
          into a single world.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Stars rating={aggregate.average} />
          <span className="font-mono text-xs text-mist">
            {aggregate.average.toFixed(1)} · {aggregate.count} reviews · {aggregate.recommend}% recommend
          </span>
        </div>
        <p className="mt-4 font-display text-lg text-blush">
          Commissions from <span className="text-volt">$100</span>
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-volt px-8 py-4 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97] sm:w-auto"
          >
            Start a Commission on Etsy
          </a>
          <Link
            href="/custom#intake"
            className="w-full rounded-xl border border-veil px-8 py-4 font-body text-sm font-medium text-lilac transition-colors hover:border-lilac/60 hover:text-blush sm:w-auto"
          >
            Send a brief
          </Link>
        </div>
      </div>

      {/* Showcase: preview video + full gallery */}
      <div className="mt-16">
        <Reveal>
          <SectionHeading label="Straight from the listing" title="The Work" center />
        </Reveal>
        <Reveal className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-veil">
            <VideoPreview
              src={video}
              poster={etsyImage(gallery[0])}
              alt="Custom commissioned animated stream overlay preview video by VectorKingStudio"
              autoplay
              className="aspect-video w-full"
            />
          </div>
        </Reveal>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((src, i) => (
            <Reveal key={src} index={i % 4}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={etsyImage(src, "il_680xN")}
                alt={`Custom commission overlay screen ${i + 1} - animated Twitch stream package by VectorKingStudio`}
                loading="lazy"
                className="aspect-square w-full rounded-xl border border-veil bg-ink2 object-cover"
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* What's included */}
      <div className="mt-20 grid gap-10 md:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading label="Every asset, matched" title="What a Commission Includes" />
          </Reveal>
          <ul className="mt-8 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-blush/85">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-lilac" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Reveal>
            <SectionHeading label="How it works" title="The Process" />
          </Reveal>
          <div className="mt-8 space-y-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} index={i}>
                <div className="rounded-2xl border border-veil bg-ink2/70 p-5 backdrop-blur">
                  <span className="font-mono text-xs text-volt">0{i + 1}</span>
                  <h3 className="mt-1 font-display text-lg text-blush">{p.step}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Real reviews */}
      <div className="mt-20">
        <Reveal>
          <SectionHeading label="Verified buyer reviews" title="What Clients Say" center />
        </Reveal>
        <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-6 rounded-2xl border border-veil bg-ink2/70 p-5 backdrop-blur">
          <div className="text-center">
            <p className="font-display text-3xl text-blush">{aggregate.average.toFixed(1)}</p>
            <Stars rating={aggregate.average} />
          </div>
          <div className="h-10 w-px bg-veil" />
          <div className="text-center">
            <p className="font-display text-3xl text-blush">{aggregate.recommend}%</p>
            <p className="font-mono text-[11px] text-mist">recommend</p>
          </div>
          <div className="h-10 w-px bg-veil" />
          <div className="text-center">
            <p className="font-display text-3xl text-blush">{aggregate.count}</p>
            <p className="font-mono text-[11px] text-mist">reviews</p>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <figure
              key={r.author + r.date}
              className="rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <Stars rating={r.rating} />
                <span className="font-mono text-[11px] text-mist">{r.date}</span>
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-blush/85">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-body text-sm font-medium text-lilac">
                {r.author}{" "}
                <span className="font-mono text-[11px] text-mist">· Verified Etsy purchase</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-20 rounded-2xl border border-veil bg-ink2/70 p-8 text-center backdrop-blur">
        <h2 className="font-display text-2xl text-blush">Ready to forge your own?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          Commissions start at $100 and scale with scope. Star Seller since 2020,
          hundreds of stream identities delivered.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-volt px-8 py-4 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97] sm:w-auto"
          >
            Start a Commission on Etsy
          </a>
          <Link
            href="/custom"
            className="w-full rounded-xl border border-veil px-8 py-4 font-body text-sm font-medium text-lilac transition-colors hover:border-lilac/60 hover:text-blush sm:w-auto"
          >
            See tiers &amp; send a brief
          </Link>
        </div>
      </div>
    </div>
  );
}

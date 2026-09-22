import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PricingTable } from "@/components/PricingTable";
import { IntakeForm } from "@/components/IntakeForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/Stars";
import { VideoPreview } from "@/components/VideoPreview";
import { CUSTOM_ETSY_URL } from "@/data/site";
import { CUSTOM_SHOWCASE } from "@/data/custom-showcase";
import { etsyImage } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Custom Twitch & Kick Overlays - Commissions from $100",
  description:
    "Commission a one-of-one animated stream identity: custom overlay scenes, screens, alerts, panels, emotes, sub badges and mascot logos. Brief, concept, two revisions, delivery.",
  alternates: { canonical: "/custom" },
};

const STATS = [
  { n: "2020", l: "Star Seller since" },
  { n: "1,300+", l: "commissions delivered" },
  { n: "4.9★", l: "average rating" },
  { n: "100%", l: "would recommend" },
];

const INCLUDED = [
  "Animated Starting Soon, BRB, Ending & Offline screens",
  "Custom facecam / webcam frame",
  "In-game overlay & scene transitions",
  "Animated alerts: follow, sub, donation, raid",
  "Info panels & channel banners",
  "Emote & sub-badge set",
  "Mascot / logo design (Full Brand)",
  "Source-matched art across every asset",
];

const PROCESS = [
  { step: "Brief", desc: "Send your theme, palette, references and platform. We reply within 24 hours." },
  { step: "Concept", desc: "A concept direction for your world: composition, mood and motion notes." },
  { step: "Revisions x2", desc: "Two full revision rounds are included. We iterate until it is yours." },
  { step: "Delivery", desc: "Every file exported for OBS and Streamlabs, organized and install-ready." },
];

export default function CustomPage() {
  const { video, gallery, reviews, aggregate } = CUSTOM_SHOWCASE;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-veil">
        <div className="pointer-events-none absolute inset-0 bg-volt-glow" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.35em] text-lilac">
              Custom commissions
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-blush md:text-5xl xl:text-6xl">
              A stream identity{" "}
              <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">
                forged for you alone
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-mist">
              Your character, your palette, your world, designed from a brief and
              animated by hand. Six years of craft, hundreds of stream identities
              delivered.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Stars rating={aggregate.average} />
              <span className="font-mono text-xs text-mist">
                {aggregate.average.toFixed(1)} · Star Seller since 2020
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#intake"
                className="rounded-xl bg-volt px-8 py-4 text-center font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
              >
                Start your brief
              </a>
              <a
                href={CUSTOM_ETSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-veil px-8 py-4 text-center font-body text-sm font-medium text-lilac transition-colors hover:border-lilac/60 hover:text-blush"
              >
                Order on Etsy
              </a>
            </div>
            <p className="mt-5 font-mono text-xs text-mist">
              From <span className="text-volt">$100</span> · 24h reply · 2 revision rounds included
            </p>
          </div>

          {/* Live work preview */}
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-veil shadow-volt-soft">
                <VideoPreview
                  src={video}
                  poster={etsyImage(gallery[0])}
                  alt="Custom commissioned animated stream overlay by VectorKingStudio"
                  autoplay
                  className="aspect-square w-full"
                />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-veil bg-ink2 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-lilac shadow-soft">
                Custom made · delivered in days
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust stats */}
      <section className="border-b border-veil bg-ink2/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-veil px-4 md:grid-cols-4 md:px-8">
          {STATS.map((s) => (
            <div key={s.l} className="px-4 py-7 text-center">
              <p className="font-display text-3xl text-blush md:text-4xl">{s.n}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mist">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* What's included */}
        <section className="py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Reveal>
                <SectionHeading label="Every asset, matched" title="What a Commission Includes" />
              </Reveal>
              <p className="mt-5 max-w-md leading-relaxed text-mist">
                Not a single template with your name on it. A complete, coherent
                identity where every screen, alert and badge is drawn to the same
                art direction, so your channel looks like one designed world.
              </p>
              <Link
                href="/commissions"
                className="mt-6 inline-block font-body text-sm text-lilac underline-offset-4 hover:underline"
              >
                See real commissioned work &amp; reviews →
              </Link>
            </div>
            <Reveal>
              <ul className="grid gap-x-6 gap-y-3 rounded-2xl border border-veil bg-ink2/70 p-7 backdrop-blur sm:grid-cols-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-blush/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-volt" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Process */}
        <section className="py-8">
          <Reveal>
            <SectionHeading label="How commissions work" title="A Simple, Proven Process" center />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} index={i}>
                <div className="relative h-full rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur">
                  <span className="font-display text-4xl text-volt/30">0{i + 1}</span>
                  <h3 className="mt-1 font-display text-lg text-blush">{p.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <Reveal>
            <SectionHeading label="Choose a scope" title="Commission Tiers" center />
          </Reveal>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-mist">
            Every commission is quoted from your brief, starting at $100 and scaling
            with scope. Pick the tier closest to what you need and we will confirm the
            details before any work begins.
          </p>
          <div className="mt-12">
            <PricingTable />
          </div>
        </section>

        {/* Real reviews */}
        <section className="py-8">
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
              <Reveal key={r.author + r.date}>
                <figure className="h-full rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur">
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
              </Reveal>
            ))}
          </div>
        </section>

        {/* Intake */}
        <section id="intake" className="py-20">
          <Reveal>
            <SectionHeading label="Tell us about your world" title="Start Your Brief" center />
          </Reveal>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-mist">
            The more you share, the sharper the first concept. No commitment, we reply
            within 24 hours.
          </p>
          <div className="mx-auto mt-10 max-w-3xl">
            <IntakeForm />
          </div>
        </section>
      </div>
    </div>
  );
}

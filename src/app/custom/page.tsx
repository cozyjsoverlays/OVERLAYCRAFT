import type { Metadata } from "next";
import { PricingTable } from "@/components/PricingTable";
import { IntakeForm } from "@/components/IntakeForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { Stars } from "@/components/Stars";
import { CUSTOM_ETSY_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Custom Twitch & Kick Overlays - Commissions from $100",
  description:
    "Commission a one-of-one animated stream identity: custom overlay scenes, screens, alerts, panels, emotes, sub badges and mascot logos. Brief → concept → two revisions → delivery.",
  alternates: { canonical: "/custom" },
};

const PROCESS = [
  { step: "Brief", desc: "You fill the intake form - theme, palette, references, platform. We reply within 24h." },
  { step: "Concept", desc: "A concept direction of your world: composition, mood, motion notes." },
  { step: "Revisions ×2", desc: "Two full revision rounds are included - we iterate until it's yours." },
  { step: "Delivery", desc: "All files exported for OBS/Streamlabs, organized and install-ready." },
];

const CUSTOM_REVIEWS = [
  {
    author: "KickWithKai",
    rating: 5,
    text: "Custom commission was worth every cent - the process was smooth and the mascot logo is unreal.",
    pack: "Full Brand",
  },
  {
    author: "MiraPlaysRPG",
    rating: 5,
    text: "They took three messy reference images and a color and gave me a stream that looks like a studio production.",
    pack: "Pro tier",
  },
  {
    author: "GhostOfGrimm",
    rating: 5,
    text: "Second commission from this studio. Communication, speed, quality - all top tier. My whole brand is theirs now.",
    pack: "Full Brand",
  },
];

export default function CustomPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      {/* Hero */}
      <div className="text-center">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-lilac">
          Commissions open
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-blush md:text-5xl">
          A stream identity{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">
            forged for you alone
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-mist">
          Your character, your palette, your world - designed from a brief and
          animated by hand. Six years of craft, hundreds of commissions delivered.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Stars rating={4.9} />
          <span className="font-mono text-xs text-mist">4.9 · Star Seller since 2020</span>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={CUSTOM_ETSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-volt px-8 py-4 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97] sm:w-auto"
          >
            Order Custom on Etsy
          </a>
          <a
            href="#intake"
            className="w-full rounded-xl border border-veil px-8 py-4 font-body text-sm font-medium text-lilac transition-colors hover:border-lilac/60 hover:text-blush sm:w-auto"
          >
            Start your brief ↓
          </a>
        </div>
      </div>

      {/* Showcase - drop real client work into /media/custom/ and swap back to <img> */}
      <Reveal className="mt-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { glyph: "🐉", label: "Full brand - dragon world" },
            { glyph: "🌸", label: "Sakura vtuber identity" },
            { glyph: "🪶", label: "Gothic raven rebrand" },
          ].map((item) => (
            <div
              key={item.label}
              className="grid aspect-video w-full place-items-center rounded-2xl border border-veil bg-gradient-to-br from-lightPink via-ink to-abyss/25"
            >
              <div className="text-center">
                <span className="text-4xl" aria-hidden>{item.glyph}</span>
                <p className="mt-2 px-4 font-display text-[10px] uppercase tracking-[0.25em] text-mist">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Pricing */}
      <div className="mt-20">
        <Reveal>
          <SectionHeading label="Pick your tier" title="Commission Pricing" center />
        </Reveal>
        <div className="mt-10">
          <PricingTable />
        </div>
      </div>

      {/* Process */}
      <div className="mt-20">
        <Reveal>
          <SectionHeading label="How commissions work" title="The Process" center />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} index={i}>
              <div className="relative rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur">
                <span className="font-mono text-xs text-volt">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg text-blush">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-20">
        <Reveal>
          <SectionHeading label="Commissioned & delighted" title="Client Words" center />
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {CUSTOM_REVIEWS.map((r) => (
            <ReviewCard key={r.author} review={r} />
          ))}
        </div>
      </div>

      {/* Intake */}
      <div className="mt-20">
        <Reveal>
          <SectionHeading label="Tell us about your world" title="Start Your Brief" center />
        </Reveal>
        <div className="mx-auto mt-10 max-w-3xl">
          <IntakeForm />
        </div>
      </div>
    </div>
  );
}

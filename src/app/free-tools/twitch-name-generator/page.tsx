import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { TwitchNameGenerator } from "@/components/tools/TwitchNameGenerator";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Twitch Name Generator - Free Username Ideas by Vibe",
  description:
    "Free Twitch name generator: pick a vibe (cozy, gothic, kawaii, epic, chaotic), add an optional word, and get unique stream username ideas to copy instantly.",
  keywords: [
    "twitch name generator",
    "twitch username generator",
    "twitch username ideas",
    "streamer name generator",
    "cool twitch names",
    "cozy twitch names",
  ],
  alternates: { canonical: "/free-tools/twitch-name-generator" },
};

const FAQ_ITEMS = [
  {
    question: "How long can a Twitch username be?",
    answer:
      "4 to 25 characters, letters, numbers and underscores only. Every name this generator produces fits the limit - still check availability on Twitch before you commit.",
  },
  {
    question: "What makes a good Twitch name?",
    answer:
      "Easy to say out loud (raiders and hosts will read it), easy to spell after hearing it once, and matching the vibe of your content. Avoid leetspeak swaps and long number tails - they're hard to recommend by word of mouth.",
  },
  {
    question: "Should I use the same name everywhere?",
    answer:
      "Yes. Grab the same handle on Twitch, YouTube, TikTok and Twitter/X the day you decide, even if you won't use them all yet. One name everywhere is how discovery compounds.",
  },
];

export default function TwitchNameGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Twitch Name Generator",
    url: `${SITE.url}/free-tools/twitch-name-generator`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="pb-6 text-xs text-mist" aria-label="Breadcrumb">
        <Link href="/free-tools" className="hover:text-lilac">Free Tools</Link>
        <span className="px-1.5">/</span>
        <span className="text-blush/70">Twitch Name Generator</span>
      </nav>

      <SectionHeading label="Free tool" title="Twitch Name Generator" />
      <p className="mt-6 max-w-2xl leading-relaxed text-mist">
        Pick the vibe your channel lives in, optionally add a word you love, and
        generate usernames built to be said out loud in a raid. Click any name to copy it.
      </p>

      <div className="mt-8">
        <TwitchNameGenerator />
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-blush">Picking the one: a 20-second checklist</h2>
        <ul className="mt-4 space-y-3">
          {[
            "Say it out loud three times. If it trips your tongue, it trips a raider's.",
            "Search it on Twitch, YouTube and TikTok - take the name only if you can get it on all three.",
            "Imagine it on a sub badge and an alert. If it makes you smile, that's the one.",
            "Skip numbers and underscores unless they mean something - clean names get recommended more.",
          ].map((item) => (
            <li key={item.slice(0, 30)} className="flex items-start gap-2.5 leading-relaxed text-blush/85">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-lilac" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-blush">FAQ</h2>
        <div className="mt-5">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <div className="mt-14 rounded-2xl border border-veil bg-ink2/70 p-7 text-center backdrop-blur">
        <h2 className="font-display text-xl text-blush">
          Got the name? Now get{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">the look.</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          A name is a start - an animated overlay world makes it a channel. 127 packs, real video previews, instant download.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/overlays" className="rounded-xl bg-volt px-6 py-3 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]">
            Browse Overlays
          </Link>
          <Link href="/free-tools/twitch-bio-generator" className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60 hover:text-blush">
            Next: write your bio
          </Link>
        </div>
      </div>
    </div>
  );
}

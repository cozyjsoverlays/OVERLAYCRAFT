import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { TwitchBioGenerator } from "@/components/tools/TwitchBioGenerator";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Twitch Bio Generator - Free Channel Bio Ideas That Convert",
  description:
    "Free Twitch bio generator: enter your name, what you stream and your vibe - get 3 ready-to-paste channel bios under the 300-character limit.",
  keywords: [
    "twitch bio generator",
    "twitch bio ideas",
    "twitch about me",
    "streamer bio examples",
    "twitch channel description",
    "twitch panel bio",
  ],
  alternates: { canonical: "/free-tools/twitch-bio-generator" },
};

const FAQ_ITEMS = [
  {
    question: "How long can a Twitch bio be?",
    answer:
      "The channel bio field allows 300 characters. Every bio this tool generates shows a live character count so you can paste without trimming.",
  },
  {
    question: "What should a Twitch bio include?",
    answer:
      "Three things: what you stream, when you're live, and what the community feels like. Viewers follow vibes, not resumes - one personality-filled line beats a list of games.",
  },
  {
    question: "Where does the bio show up?",
    answer:
      "On your channel page under the player, in search results, and in the mini profile when someone taps your name in chat. It's often the deciding factor between a lurk and a follow.",
  },
];

export default function TwitchBioGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Twitch Bio Generator",
    url: `${SITE.url}/free-tools/twitch-bio-generator`,
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
        <span className="text-blush/70">Twitch Bio Generator</span>
      </nav>

      <SectionHeading label="Free tool" title="Twitch Bio Generator" />
      <p className="mt-6 max-w-2xl leading-relaxed text-mist">
        Fill in three fields, pick your vibe, and get three bios written to turn
        profile visits into follows - each one safely inside Twitch's 300-character limit.
      </p>

      <div className="mt-8">
        <TwitchBioGenerator />
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-blush">What separates a bio that converts</h2>
        <ul className="mt-4 space-y-3">
          {[
            "Lead with feeling, not facts. \"The coziest corner of Twitch\" beats \"I play variety games.\"",
            "Name your schedule if you have one - it turns a visitor into an appointment.",
            "Invite the lurkers. Half your audience never chats; make them feel welcome anyway.",
            "Match the bio to your visuals. If your bio says cozy but your channel looks default, the promise breaks.",
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
          Bio says cozy? Make the channel{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">prove it.</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          Back your new bio with an animated overlay world - 127 packs with real video previews, instant download.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/overlays" className="rounded-xl bg-volt px-6 py-3 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]">
            Browse Overlays
          </Link>
          <Link href="/free-tools/twitch-name-generator" className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60 hover:text-blush">
            Need a name too?
          </Link>
        </div>
      </div>
    </div>
  );
}

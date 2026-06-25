import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { ToolFaq, faqLd, type Faq } from "@/components/tools/ToolFaq";
import { ChannelPointIdeas } from "@/components/tools/ChannelPointIdeas";
import { TOOL_CTA } from "@/lib/tools-config";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Channel Point Reward Ideas for Streamers (Cozy & Wholesome)",
  description:
    "A free, searchable list of Twitch channel point reward ideas — cozy, wholesome, interactive and gameplay rewards with suggested point costs. Copy any idea in one click.",
  keywords: [
    "channel point reward ideas",
    "twitch channel points ideas",
    "cozy channel point rewards",
    "twitch reward ideas",
  ],
  alternates: { canonical: "/free-tools/channel-point-ideas" },
  openGraph: {
    type: "website",
    title: "Channel Point Reward Ideas (Free) · CozyOverlays",
    description: "A copyable list of cozy Twitch channel point reward ideas with suggested costs.",
    url: `${SITE.url}/free-tools/channel-point-ideas`,
  },
};

const FAQS: Faq[] = [
  {
    q: "What are good Twitch channel point rewards?",
    a: "The best rewards are quick, repeatable and on-brand: hydrate reminders, song requests, choosing your next game, triggering an alert, or naming a character. For cozy channels, lean into wholesome ones like 'light a candle' or 'pick the room ambience.'",
  },
  {
    q: "How much should a channel point reward cost?",
    a: "Small interactions (hydrate, posture check) work at 200–500 points; medium ones (song request, read my message) around 500–1500; and big ones (choose my game, VIP for a day) from 2,000 up to 10,000+. Adjust to how fast your viewers earn points.",
  },
  {
    q: "Can I use these reward ideas for free?",
    a: "Yes — copy any idea straight into your Twitch channel points settings. They're free to use and edit to fit your community.",
  },
];

export default function ChannelPointIdeasPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Channel Point Reward Ideas",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    url: `${SITE.url}/free-tools/channel-point-ideas`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "A free, searchable list of cozy Twitch channel point reward ideas with suggested costs.",
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={faqLd(FAQS)} />
      <ToolLayout
        eyebrow="Free Tool"
        title={
          <>
            Channel Point{" "}
            <span className="gradient-text">Reward Ideas</span>
          </>
        }
        subtitle="A searchable list of cozy, wholesome and interactive Twitch channel-point rewards with suggested point costs. Find one you like and copy it straight into your settings."
      >
        <ChannelPointIdeas />

        <ToolCTA
          heading="Make your rewards feel magical"
          text="Pair fun channel-point rewards with animated alerts and overlays that react on screen. Browse 125+ cozy overlay packs and download instantly from Etsy."
          href={TOOL_CTA.shop}
          label="Browse overlays & alerts"
        />

        <ToolFaq faqs={FAQS} />

        <p className="mt-10 text-sm text-muted">
          More:{" "}
          <Link href="/free-tools" className="font-bold text-lavender hover:text-pink">
            all free tools
          </Link>
        </p>
      </ToolLayout>
    </>
  );
}

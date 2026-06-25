import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { ToolFaq, faqLd, type Faq } from "@/components/tools/ToolFaq";
import { PanelMaker } from "@/components/tools/PanelMaker";
import { TOOL_CTA } from "@/lib/tools-config";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Twitch Panel Size Helper & Maker — Free 320px Panel Generator",
  description:
    "Free Twitch panel maker: the correct panel size (320px max width) plus a quick maker — pick a cozy template, type a label, and export a perfectly-sized PNG panel. Runs in your browser.",
  keywords: [
    "twitch panel size",
    "twitch panel maker",
    "twitch panel dimensions",
    "320px panel",
    "stream panel generator",
  ],
  alternates: { canonical: "/free-tools/panel-maker" },
  openGraph: {
    type: "website",
    title: "Twitch Panel Size Helper & Maker (Free) · CozyOverlays",
    description: "Make correctly-sized 320px Twitch panels in a click.",
    url: `${SITE.url}/free-tools/panel-maker`,
  },
};

const FAQS: Faq[] = [
  {
    q: "What size should a Twitch panel be?",
    a: "Twitch panels display at a maximum width of 320 pixels. Height is flexible, but around 100px keeps things tidy. Upload a PNG and keep the same style across every panel for a polished channel page.",
  },
  {
    q: "How many panels should I have?",
    a: "Most channels use a handful: About, Schedule, Socials, Donate, and maybe Discord or Rules. A consistent, matching set makes a new channel look established.",
  },
  {
    q: "Are my panels uploaded anywhere?",
    a: "No. The panel is drawn and exported entirely in your browser with the Canvas API — nothing is sent to a server.",
  },
];

export default function PanelMakerPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Twitch Panel Size Helper & Maker",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    url: `${SITE.url}/free-tools/panel-maker`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free reference and maker for correctly-sized 320px Twitch profile panels.",
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={faqLd(FAQS)} />
      <ToolLayout
        eyebrow="Free Tool"
        title={
          <>
            Twitch Panel{" "}
            <span className="gradient-text">Size Helper</span>
          </>
        }
        subtitle="The correct panel size (320px max width) plus a quick maker — pick a cozy template, type a label, and export a perfectly-sized PNG panel for your channel page."
      >
        <PanelMaker />

        <ToolCTA
          heading="Want a full set of matching panels?"
          text="Every CozyOverlays pack includes a coordinated panel set — About, Schedule, Socials and more — themed to your overlay. Browse 125+ and download instantly from Etsy."
          href={TOOL_CTA.panels}
          label="Browse panel sets"
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

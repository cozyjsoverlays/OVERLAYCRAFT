import type { Metadata } from "next";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQ } from "@/data/site";
import type { FaqEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "FAQ — Stream Overlay Questions, Answered",
  description:
    "Everything about OverlayCraft packs: OBS & Streamlabs setup, platform support, instant delivery, licenses, refunds and custom commissions.",
  alternates: { canonical: "/faq" },
};

const EXTRA_FAQ: FaqEntry[] = [
  {
    question: "Do the overlays work for vertical / TikTok Live streams?",
    answer:
      "The TikTok Overlays collection is composed specifically for vertical framing. Standard desktop packs can often be adapted — contact us before buying and we'll tell you honestly whether a pack will translate.",
  },
  {
    question: "Can I use one pack on multiple channels?",
    answer:
      "Your license covers your own channels across platforms — the same brand streaming on Twitch, YouTube and Kick is fine. It doesn't cover sharing files with friends or using them on channels you don't own.",
  },
  {
    question: "What file formats are included?",
    answer:
      "Animated screens ship as looping MP4 video files plus static PNG versions. Alerts and panels come sized for the common alert tools. Everything is organized into labeled folders with an install guide.",
  },
  {
    question: "Will these slow down my stream PC?",
    answer:
      "No — the loops are exported at streaming-friendly bitrates and OBS media sources are very light. If you can run your game and OBS, you can run these.",
  },
];

export default function FaqPage() {
  const all = [...FAQ, ...EXTRA_FAQ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: all.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeading label="Questions, answered" title="FAQ" />
      <div className="mt-10">
        <FAQAccordion items={all} />
      </div>
    </div>
  );
}

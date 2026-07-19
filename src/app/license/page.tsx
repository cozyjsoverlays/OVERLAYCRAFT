import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Digital License Terms",
  description:
    "What your OverlayCraft purchase lets you do: personal streaming use on your own channels, forever - and what it doesn't (resale, redistribution, re-editing for sale).",
  alternates: { canonical: "/license" },
};

export default function LicensePage() {
  return (
    <LegalPage
      label="The fine print, kept humane"
      title="Digital License"
      sections={[
        {
          heading: "What you may do",
          body: "Use purchased packs on your own live channels and recorded content (Twitch, YouTube, Kick, TikTok and similar), on any number of your own channels, for as long as you like. Modify colors or crop assets for your personal setup. Use the pack in channel trailers, VODs and clips derived from your streams.",
        },
        {
          heading: "What you may not do",
          body: "Resell, redistribute, sublicense or share the files - free or paid, modified or not. Re-edit packs into new overlay products for sale. Claim authorship of the artwork. Use assets in NFT projects or AI-training datasets. Transfer the license to another person or brand.",
        },
        {
          heading: "Custom commissions",
          body: "Commissioned work is licensed exclusively to you once the project is paid in full - we won't resell your custom identity. The studio retains the right to show commissioned work in its portfolio unless we agree otherwise in the brief.",
        },
        {
          heading: "Enforcement & good faith",
          body: "If something here is unclear for your use case, ask before you buy - we're reasonable and answer within a day. Violations may result in revoked licenses and takedown requests, but honest questions never will.",
        },
      ]}
    />
  );
}

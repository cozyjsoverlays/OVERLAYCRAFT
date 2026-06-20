import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for using CozyOverlays.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 2026"
      sections={[
        {
          heading: "License",
          body: [
            "When you purchase a pack, you receive a personal, non-exclusive license to use the assets on your own streams and channels across Twitch, YouTube, Kick, and TikTok.",
            "You may not resell, redistribute, or share the source files, or claim the artwork as your own original work.",
          ],
        },
        {
          heading: "Permitted use",
          body: [
            "Use the overlays on your live streams, recordings, and channel branding. Custom commissions may carry additional terms agreed at the time of order.",
          ],
        },
        {
          heading: "Payments",
          body: [
            "Payments are processed securely by PayPal. CozyOverlays never sees or stores your full payment details.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "We may update these terms over time. Continued use of the site after an update constitutes acceptance of the revised terms.",
          ],
        },
      ]}
    />
  );
}

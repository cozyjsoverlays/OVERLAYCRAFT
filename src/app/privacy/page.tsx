import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What OverlayCraft collects (very little), why, and your rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      sections={[
        {
          heading: "What we collect",
          body: "As little as possible. Purchases are processed by Lemon Squeezy, which collects the billing details required to complete your order under its own privacy policy — we receive your email and order details, not your payment information. The commission intake form collects what you type into it. The newsletter form collects your email address.",
        },
        {
          heading: "What we use it for",
          body: "Delivering your files, answering your messages, running commissions, and — only if you subscribed — telling you about new drops. We do not sell, rent or share your data with third parties for their marketing.",
        },
        {
          heading: "Cookies & analytics",
          body: "The site itself runs without tracking cookies. Wishlist saves live in your browser session, not on our servers. If privacy-friendly analytics are added later, this page will say so first.",
        },
        {
          heading: "Your rights",
          body: "Email hello@overlaycraft.com to access, correct or delete the data we hold about you, or to unsubscribe from anything. We answer within a few days, GDPR and similar frameworks respected.",
        },
      ]}
    />
  );
}

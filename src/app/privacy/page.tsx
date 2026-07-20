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
          body: "As little as possible. Purchases are processed by Lemon Squeezy, which collects the billing details required to complete your order under its own privacy policy - we receive your email and order details, not your payment information. The commission intake form collects what you type into it. The newsletter form collects your email address.",
        },
        {
          heading: "What we use it for",
          body: "Delivering your files, answering your messages, running commissions, and - only if you subscribed - telling you about new drops. We do not sell, rent or share your data with third parties for their marketing.",
        },
        {
          heading: "Cookies & analytics",
          body: "We use Google Analytics (GA4) to understand how visitors use the site - which pages are popular, where people come from - in aggregate. Google sets cookies to do this; you can block them with any cookie or tracking blocker and the site still works fully. Your wishlist is stored in your own browser (localStorage), never on our servers.",
        },
        {
          heading: "Your rights",
          body: "Email hello@overlaycraft.com to access, correct or delete the data we hold about you, or to unsubscribe from anything. We answer within a few days, GDPR and similar frameworks respected.",
        },
      ]}
    />
  );
}

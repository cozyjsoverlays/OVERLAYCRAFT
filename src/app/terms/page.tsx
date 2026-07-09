import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing purchases and use of OverlayCraft.com.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      sections={[
        {
          heading: "The service",
          body: "OverlayCraft.com sells instant-download digital goods (animated stream overlay packages) and custom design commissions, operated by VectorKingStudio. By purchasing or using the site you agree to these terms and to the Digital License that accompanies every product.",
        },
        {
          heading: "Purchases & delivery",
          body: "Checkout is processed by Lemon Squeezy as merchant of record; they handle payment processing, VAT/tax and delivery of your download link. Delivery is immediate after successful payment. Keep your receipt email — it contains your download access.",
        },
        {
          heading: "Refunds",
          body: "Digital goods are non-refundable once downloaded, as files cannot be returned. If a file is broken, missing or you hit a technical problem, contact us within 30 days and we will fix it, replace it, or refund you — technical failures are on us.",
        },
        {
          heading: "Commissions",
          body: "Custom work follows the tier and process described on the Custom page: brief, concept, two revision rounds, delivery. Additional revision rounds or scope changes are quoted separately before any work begins. Commission payments are split 50% upfront / 50% at delivery unless agreed otherwise.",
        },
        {
          heading: "Intellectual property",
          body: "All artwork, animations and site content are the original work of VectorKingStudio and remain the studio's property. Purchases grant the usage license described on the License page, not ownership of the artwork.",
        },
        {
          heading: "Changes",
          body: "We may update these terms as the store evolves; the date above reflects the latest revision. Material changes will be noted on this page. Continued use of the site after changes constitutes acceptance.",
        },
      ]}
    />
  );
}

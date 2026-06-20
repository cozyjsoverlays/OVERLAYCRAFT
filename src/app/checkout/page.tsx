import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CheckoutClient } from "@/components/commerce/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Securely check out with PayPal and download your packs instantly.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}

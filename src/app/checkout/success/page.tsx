import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { SuccessClient } from "@/components/commerce/SuccessClient";

export const metadata: Metadata = {
  title: "Order complete",
  robots: { index: false },
};

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  return (
    <>
      <Nav />
      <main className="relative isolate overflow-hidden pt-24">
        <AuroraBackground />
        <SuccessClient orderId={searchParams.order ?? null} />
      </main>
      <Footer />
    </>
  );
}

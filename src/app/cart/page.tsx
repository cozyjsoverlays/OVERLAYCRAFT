import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartClient } from "@/components/commerce/CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the cozy packs in your cart.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <Nav />
      <main className="pt-28">
        <div className="container-page pb-20">
          <CartClient />
        </div>
      </main>
      <Footer />
    </>
  );
}

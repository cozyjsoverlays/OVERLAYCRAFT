import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  robots: { index: false },
};

export default function CheckoutCancelPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <div className="container-page max-w-xl py-24 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink/15 text-pink">
            <XCircle size={34} />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold text-heading">
            Checkout cancelled
          </h1>
          <p className="mt-4 text-body">
            No worries and no charge was made. Your cart is still saved whenever
            you&apos;re ready.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow"
            >
              Return to checkout
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-heading"
            >
              <ArrowLeft size={15} /> Back to shop
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

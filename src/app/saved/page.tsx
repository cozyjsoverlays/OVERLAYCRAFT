"use client";

import Link from "next/link";
import { useWishlist } from "@/components/WishlistProvider";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";

export default function SavedPage() {
  const { saved } = useWishlist();
  const products = PRODUCTS.filter((p) => saved.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <SectionHeading label="Your wishlist" title="Saved Overlays" />
      {products.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-veil bg-ink2/50 py-20 text-center">
          <p className="font-display text-xl text-blush">Nothing saved yet</p>
          <p className="mt-2 text-sm text-mist">
            Tap the ♡ on any pack to keep it here. (Saves live in this browser
            session for now — accounts are coming.)
          </p>
          <Link
            href="/overlays"
            className="mt-6 inline-block rounded-xl bg-volt px-6 py-3 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
          >
            Browse Overlays
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

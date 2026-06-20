import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function FeaturedShop() {
  const products = await getAllProducts();

  return (
    <section id="shop" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Shop"
          title={
            <>
              Cozy packs your{" "}
              <span className="gradient-text">chat will love</span>
            </>
          }
          subtitle="Fully animated screens, alerts, panels & emotes — ready for OBS, Streamlabs, and StreamElements. Buy with PayPal, download instantly."
        />

        <div className="mt-10">
          <ProductGrid products={products} />
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-accent-gradient bg-[length:200%_auto] px-6 py-3 text-sm font-bold text-base shadow-glow transition-all hover:bg-[position:100%_50%] hover:-translate-y-0.5"
          >
            View the full shop <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

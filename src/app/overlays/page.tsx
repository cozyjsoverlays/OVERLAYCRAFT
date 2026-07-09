import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "All Animated Stream Overlays — Twitch, YouTube, Kick & TikTok",
  description:
    "Browse the full OverlayCraft catalog of animated stream overlay packages: gothic ravens, moonlight wolves, dragons, sakura dreams, cozy worlds and more. Instant download, OBS-ready.",
  alternates: { canonical: "/overlays" },
};

export default function OverlaysPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <SectionHeading label="The full catalog" title="All Overlays" />
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mist">
        Every pack is a complete animated stream identity — screens, cam frames,
        overlays, alerts and panels in one matched world. Pick yours, download
        instantly, go live tonight.
      </p>
      <div className="mt-10">
        <ShopGrid products={PRODUCTS} />
      </div>
    </div>
  );
}

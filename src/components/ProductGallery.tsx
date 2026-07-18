"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { hasRealImage, productAlt } from "@/lib/utils";
import { VideoPreview } from "./VideoPreview";
import { PackArt } from "./PackArt";

export function ProductGallery({ product }: { product: Product }) {
  // Index 0 = the animated preview; the rest show individual screens.
  const [selected, setSelected] = useState(0);
  const { previewVideo: video, thumbnails } = product;

  // No real media yet → one designed placeholder, no broken thumbnail row.
  if (!hasRealImage(product)) {
    return (
      <div className="overflow-hidden rounded-2xl border border-veil shadow-volt-soft">
        <PackArt product={product} className="aspect-video w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-veil shadow-volt-soft">
        {selected === 0 ? (
          <VideoPreview
            src={video}
            poster={thumbnails[0]}
            alt={productAlt(product, 0)}
            autoplay
            className="aspect-video w-full"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnails[selected]}
            alt={productAlt(product, selected)}
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.visibility = "hidden")}
            className="aspect-video w-full bg-ink2 object-cover"
          />
        )}
      </div>
      {thumbnails.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {thumbnails.map((thumb, i) => (
            <button
              key={thumb}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={i === 0 ? "Play animated preview" : `View screen ${i + 1}`}
              className={`relative overflow-hidden rounded-xl border transition-all ${
                selected === i
                  ? "border-lilac/70 shadow-volt-soft"
                  : "border-veil opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb} alt={productAlt(product, i)} className="aspect-video w-full bg-ink2 object-cover" />
              {i === 0 && (
                <span className="absolute inset-0 grid place-items-center text-lg text-white drop-shadow" aria-hidden>
                  ▶
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

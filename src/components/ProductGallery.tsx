"use client";

import { useState } from "react";
import { VideoPreview } from "./VideoPreview";

export function ProductGallery({
  video,
  thumbnails,
  title,
}: {
  video: string;
  thumbnails: string[];
  title: string;
}) {
  // Index 0 = the animated preview; the rest show individual screens.
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-veil shadow-volt-soft">
        {selected === 0 ? (
          <VideoPreview
            src={video}
            poster={thumbnails[0]}
            alt={`${title} — animated preview`}
            autoplay
            className="aspect-video w-full"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnails[selected]}
            alt={`${title} — screen ${selected + 1}`}
            className="aspect-video w-full bg-ink2 object-cover"
          />
        )}
      </div>
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
            <img src={thumb} alt="" className="aspect-video w-full bg-ink2 object-cover" />
            {i === 0 && (
              <span className="absolute inset-0 grid place-items-center text-lg text-blush" aria-hidden>
                ▶
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

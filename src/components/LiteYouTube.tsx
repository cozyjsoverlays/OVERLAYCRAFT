"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Click-to-load YouTube embed. Until the user clicks, we show only a webp
 * thumbnail (falling back to jpg if webp 404s) + a play button - no iframe, no
 * YouTube JS. This keeps the page fast and private, and means a YouTube outage
 * can never break the page render. The nocookie domain is used on load.
 */
export function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`
  );

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-veil bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-veil bg-ink2"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt={title}
        loading="lazy"
        onError={() => {
          // webp maxres missing → fall back to the always-present jpg
          if (thumb.includes("vi_webp")) setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-volt shadow-volt transition-transform duration-300 group-hover:scale-110">
        <Play size={26} className="translate-x-0.5 fill-white text-white" aria-hidden />
      </span>
    </button>
  );
}

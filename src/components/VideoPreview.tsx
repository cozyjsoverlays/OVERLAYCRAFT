"use client";

import { useRef, useState } from "react";

/**
 * Poster-first lazy video. The video element is only mounted on hover/focus
 * (or immediately when `autoplay` is set, e.g. on product pages), crossfading
 * over the poster in 300ms. Respects prefers-reduced-motion.
 */
export function VideoPreview({
  src,
  poster,
  alt,
  autoplay = false,
  className = "",
}: {
  src: string;
  poster: string;
  alt: string;
  autoplay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(autoplay);
  const [videoReady, setVideoReady] = useState(false);
  const reduced = useRef(false);

  function activate() {
    if (typeof window !== "undefined") {
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    if (!reduced.current) setActive(true);
  }

  return (
    <div
      className={`relative overflow-hidden bg-ink2 ${className}`}
      onMouseEnter={activate}
      onFocus={activate}
      onMouseLeave={() => !autoplay && setActive(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {active && (
        <video
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

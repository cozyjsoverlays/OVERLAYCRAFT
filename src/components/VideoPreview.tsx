"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Poster-first lazy video. The video element mounts on hover/focus, or while the
 * card is on screen when `playInView` is set (own3d-style live grid: overlays
 * animate right in the shop), or immediately when `autoplay` is set (product
 * pages). Crossfades over the poster in 300ms. Respects prefers-reduced-motion.
 *
 * With `playInView`, an IntersectionObserver plays only cards near the viewport
 * and unmounts the <video> once scrolled away, so the grid never holds dozens of
 * video decoders at once.
 */
export function VideoPreview({
  src,
  poster,
  alt,
  autoplay = false,
  playInView = false,
  className = "",
}: {
  src: string;
  poster: string;
  alt: string;
  autoplay?: boolean;
  playInView?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(autoplay);
  const [videoReady, setVideoReady] = useState(false);
  const reduced = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  useEffect(() => {
    if (!playInView || autoplay || !src) return;
    if (reduced.current) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playInView, autoplay, src]);

  function activate() {
    if (typeof window !== "undefined") {
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    if (!reduced.current) setActive(true);
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-ink2 ${className}`}
      onMouseEnter={activate}
      onFocus={activate}
      onMouseLeave={() => !autoplay && !playInView && setActive(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          // Dead/blocked poster must never leave a broken-image box behind the
          // video. Hide it; the ink2 background shows until the video plays.
          (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {active && src && (
        <video
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

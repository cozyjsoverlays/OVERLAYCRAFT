"use client";

import { etsyImage } from "@/lib/utils";

/**
 * Crash-safe image grid for category tiles. Shows up to 4 real pack covers in
 * a 2x2 mosaic; any image that fails to load hides itself so the tile's
 * gradient shows through instead of a broken-image box. Cells are small, so a
 * mid-size Etsy variant keeps them crisp without loading full 2000px art here.
 */
export function TileMosaic({ previews }: { previews: string[] }) {
  const imgs = previews.slice(0, 4);
  if (imgs.length === 0) return null;

  return (
    <div
      className={`absolute inset-0 grid gap-0.5 ${
        imgs.length === 1 ? "grid-cols-1" : "grid-cols-2"
      } ${imgs.length <= 2 ? "grid-rows-1" : "grid-rows-2"}`}
      aria-hidden
    >
      {imgs.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src + i}
          src={etsyImage(src, "il_680xN")}
          alt=""
          loading="lazy"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.visibility = "hidden")}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ))}
    </div>
  );
}

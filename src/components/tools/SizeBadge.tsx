/* eslint-disable @next/next/no-img-element */

interface SizeBadgeProps {
  src: string;
  size: number;
  /** Caption under the swatch, e.g. "In chat" or "Largest". */
  note?: string;
}

/** Renders an emote/badge at one exact native pixel size on a transparency grid. */
export function SizeBadge({ src, size, note }: SizeBadgeProps) {
  return (
    <figure className="flex flex-col items-center gap-2">
      <div
        className="flex items-center justify-center rounded-xl border border-subtle p-3"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.06) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.06) 75%)",
          backgroundSize: "12px 12px",
          backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0",
        }}
      >
        <img
          src={src}
          alt={`Preview at ${size} by ${size} pixels`}
          width={size}
          height={size}
          style={{ width: size, height: size, imageRendering: "auto" }}
        />
      </div>
      <figcaption className="text-center">
        <span className="block font-mono text-sm font-bold text-heading">
          {size}×{size}
        </span>
        {note && <span className="block text-xs text-muted">{note}</span>}
      </figcaption>
    </figure>
  );
}

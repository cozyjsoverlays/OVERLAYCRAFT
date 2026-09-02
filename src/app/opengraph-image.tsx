import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const runtime = "nodejs";
export const alt = `${SITE.name} - Animated Stream Overlays for Twitch, YouTube & Kick`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide social share card (Open Graph + Twitter). Generated at build time,
 * so every page that doesn't define its own image gets a branded 1200x630
 * preview instead of a bare link. Pure inline styling - no external assets.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1200px 600px at 15% 10%, #2a1f3d 0%, #0d0a14 55%, #060409 100%)",
          color: "#f4ecff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c9a9ff",
            marginBottom: 24,
          }}
        >
          {`${SITE.name} · ${SITE.shop}`}
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          {"Animated Stream Overlays for Twitch, YouTube & Kick"}
        </div>
        <div style={{ fontSize: 34, color: "#b9b2c9", maxWidth: 880 }}>
          {"Instant download. Drag into OBS. Go live. Etsy Star Seller, 1,300+ sales, 4.9 stars."}
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            fontSize: 26,
            color: "#8de06a",
          }}
        >
          <span>overlaycraft.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

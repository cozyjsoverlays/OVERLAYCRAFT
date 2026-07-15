import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Cute / Modern / Friendly palette ────────────────────────────────
        // Token names kept stable so components don't need per-file rewrites;
        // values pivoted from the old Violet Arcana palette to pastel-pink.

        // Surfaces
        ink: "#F7DDF4", // page background — pastel pink
        ink2: "#FFFFFF", // raised cards / surfaces — white
        lightPink: "#FBE9F8", // very light pink — inner sections / hovers

        // Accents (the "wow" colors)
        volt: "#FF3FA5", // PRIMARY — hot pink. CTAs, prices, active states.
        voltDim: "#F02C97", // volt hover/pressed — dark pink
        lilac: "#F02C97", // secondary accent — dark pink for links/tags/labels
        abyss: "#C9B0C9", // atmospheric tint — dusty lavender (soft washes)

        // Text
        blush: "#1A1A1A", // primary text — rich black
        mist: "#5F5F68", // secondary text — dark gray
        muted: "#9C9CA6", // light gray text

        // Structure
        veil: "#ECECF1", // borders & dividers — soft gray
        iconBlack: "#202020", // charcoal for icon strokes

        // Additional accents (used sparingly)
        softYellow: "#F7E46D", // stars / ratings, small highlights
        softRed: "#F56A6A", // hearts (love/wishlist)
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        volt: "0 8px 24px rgba(255, 63, 165, 0.28)",
        "volt-soft": "0 12px 40px rgba(255, 63, 165, 0.15)",
        soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.7), transparent)",
        "volt-glow":
          "radial-gradient(ellipse 40% 30% at 50% 20%, rgba(255,63,165,0.08), transparent)",
        "cta-gradient": "linear-gradient(135deg, #FF3FA5 0%, #F02C97 100%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.5" },
          "50%": { transform: "translateY(-18px) translateX(8px)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

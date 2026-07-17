import type { Config } from "tailwindcss";

/**
 * Colors are driven by CSS variables (space-separated RGB channels) defined in
 * globals.css under :root (light) and .dark (dark). This lets a single class
 * toggle on <html> flip the whole site — every bg-ink / text-blush / border-veil
 * re-resolves — while keeping Tailwind's /opacity modifiers working.
 */
const token = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces
        ink: token("--ink"), // page background
        ink2: token("--ink2"), // raised cards / surfaces
        lightPink: token("--light-pink"), // inner sections / hovers

        // Accents
        volt: token("--volt"), // PRIMARY — hot pink CTAs, prices, active
        voltDim: token("--volt-dim"), // volt hover/pressed
        lilac: token("--lilac"), // secondary accent — links/tags/labels
        abyss: token("--abyss"), // atmospheric tint for washes/gradients

        // Text
        blush: token("--blush"), // primary text
        mist: token("--mist"), // secondary text
        muted: token("--muted"), // light gray text

        // Structure
        veil: token("--veil"), // borders & dividers
        iconBlack: token("--icon-black"),

        // Fixed-hue accents (same in both modes)
        softYellow: token("--soft-yellow"), // stars
        softRed: token("--soft-red"), // hearts
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
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgb(var(--page-glow) / 0.6), transparent)",
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

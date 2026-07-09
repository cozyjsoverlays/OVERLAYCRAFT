import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core brand (owner-locked)
        abyss: "#3B0270", // brand deep violet — glows, tints, gradients, hovers
        volt: "#6F00FF", // PRIMARY accent — CTAs, prices, active states, badges ONLY
        lilac: "#E9B3FB", // soft accent — links, hearts, tags, highlights
        blush: "#FFF1F1", // text/foreground on dark

        // Derived support shades (mixed from the core 4 only)
        ink: "#14002B", // page background
        ink2: "#1F0440", // raised cards / surfaces
        veil: "rgba(59, 2, 112, 0.6)", // borders & dividers
        mist: "#C9A9E4", // secondary text
        voltDim: "#5500C4", // volt hover/pressed
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        volt: "0 0 24px rgba(111, 0, 255, 0.45)",
        "volt-soft": "0 0 40px rgba(111, 0, 255, 0.25)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,2,112,0.65), transparent)",
        "volt-glow":
          "radial-gradient(ellipse 40% 30% at 50% 20%, rgba(111,0,255,0.05), transparent)",
        "cta-gradient":
          "linear-gradient(135deg, #6F00FF 0%, #3B0270 55%, #14002B 100%)",
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

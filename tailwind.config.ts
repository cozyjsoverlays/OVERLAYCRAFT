import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Cozy Night Studio" palette — a warm lofi bedroom at night.
        // Backgrounds
        base: "#14121F", // deep plum-navy night
        surface: "#1E1B2E", // card
        "surface-2": "#282440",
        // Accents
        lavender: "#A78BFA", // primary — buttons, links
        pink: "#F9A8D4", // sakura pink — badges, highlights
        cyan: "#FCD9A0", // candle glow — stars, prices (legacy token name)
        warm: "#FCD9A0",
        // Text
        heading: "#F3F0FF",
        body: "#CFC9E4",
        muted: "#9B94B8",
      },
      borderColor: {
        subtle: "rgba(167,139,250,.14)",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(167,139,250,.45)",
        "glow-pink": "0 0 40px -8px rgba(249,168,212,.45)",
        "glow-cyan": "0 0 40px -8px rgba(252,217,160,.45)",
        card: "0 20px 60px -20px rgba(0,0,0,.6)",
        "card-hover":
          "0 30px 80px -20px rgba(167,139,250,.35), 0 0 0 1px rgba(167,139,250,.25)",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(120deg, #A78BFA 0%, #F9A8D4 55%, #FCD9A0 100%)",
      },
      keyframes: {
        "aurora-1": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(8%, -6%) scale(1.15)" },
          "66%": { transform: "translate(-6%, 8%) scale(0.95)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0,0) scale(1.1)" },
          "33%": { transform: "translate(-10%, 6%) scale(0.9)" },
          "66%": { transform: "translate(6%, -8%) scale(1.2)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(5%, 5%) scale(1.25)" },
        },
        float: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.8" },
          "100%": { transform: "translateY(-120vh)", opacity: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(150%)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "aurora-1": "aurora-1 22s ease-in-out infinite",
        "aurora-2": "aurora-2 26s ease-in-out infinite",
        "aurora-3": "aurora-3 30s ease-in-out infinite",
        shimmer: "shimmer 1.2s ease-out",
        "gradient-pan": "gradient-pan 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;

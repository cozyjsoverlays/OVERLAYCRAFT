import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { ColorPaletteGenerator } from "@/components/tools/ColorPaletteGenerator";

export const metadata: Metadata = {
  title: "Stream Color Palette Generator - Overlay & Brand Colors",
  description:
    "Free color palette generator for streamers: pick a vibe and get a cohesive 5-color palette with hex codes for your overlays, alerts, panels and brand. Click to copy.",
  keywords: ["stream color palette", "twitch color scheme", "overlay colors", "streamer brand colors", "color palette generator"],
  alternates: { canonical: "/free-tools/color-palette-generator" },
};

const FAQ = [
  { question: "How do I use a palette across my stream?", answer: "Use the two darkest shades for backgrounds and panels, a mid tone for borders, and the brightest color only for alerts and calls to action so they pop. Keeping to five colors is what makes a channel look designed." },
  { question: "Where do I paste the hex codes?", answer: "Into your alert tool, panel maker, or overlay editor - anywhere you set a color. Click any swatch here to copy its hex." },
];

export default function Page() {
  return (
    <ToolShell slug="color-palette-generator" title="Stream Color Palette Generator"
      intro="Pick the vibe your channel lives in and get a cohesive five-color palette with hex codes for your overlays, alerts and panels. Click any color to copy it."
      faq={FAQ}
      posts={[
        { label: "Animated vs Static Stream Overlays", href: "/blog/animated-vs-static-stream-overlays" },
        { label: "Twitch Overlay Size Guide (2026)", href: "/blog/twitch-overlay-size-guide" },
      ]}
      packs={["dark-gothic-raven-animated-stream-package", "inferno-phoenix-overlay", "sakura-dream-wolf-overlay"]}>
      <ColorPaletteGenerator />
    </ToolShell>
  );
}

import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { FancyFontGenerator } from "@/components/tools/FancyFontGenerator";

export const metadata: Metadata = {
  title: "Fancy Font Generator - Cool Text for Twitch Bios & Names",
  description:
    "Free fancy font generator: turn plain text into bold, script, bubble and other unicode styles for your Twitch, YouTube, TikTok and Discord bio or display name.",
  keywords: ["fancy font generator", "cool text generator", "twitch bio fonts", "fancy text for bio", "aesthetic font generator"],
  alternates: { canonical: "/free-tools/fancy-font-generator" },
};

const FAQ = [
  { question: "Do fancy fonts work in Twitch names?", answer: "In display names and bios, usually yes - they are unicode, not images. Keep your actual @login plain, though, so people can type it and search can read it." },
  { question: "Will screen readers read fancy text?", answer: "Often not well - some styles are announced letter by letter or skipped. Use them for flair, but keep the important info (your schedule, links) in plain text too." },
];

export default function Page() {
  return (
    <ToolShell slug="fancy-font-generator" title="Fancy Font Generator"
      intro="Type your name or bio and get it in bold, italic, script, bubble, square and more unicode styles. Click any style to copy it for your bio or display name."
      faq={FAQ}
      posts={[
        { label: "What Is a Twitch Overlay?", href: "/blog/what-is-a-twitch-overlay" },
        { label: "VTuber Overlay Guide", href: "/blog/vtuber-overlay-guide" },
      ]}
      packs={["midnight-magic-cat-overlay", "sakura-dream-wolf-overlay", "cozy-fox-overlay-animated-stream-package"]}>
      <FancyFontGenerator />
    </ToolShell>
  );
}

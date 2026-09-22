import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { TwitchTagsGenerator } from "@/components/tools/TwitchTagsGenerator";

export const metadata: Metadata = {
  title: "Twitch Tags Generator - Discovery Tags for Your Stream",
  description:
    "Free Twitch tags generator: type what you stream and get up to 10 relevant discovery tags to help the right viewers find your channel. Copy them in one click.",
  keywords: ["twitch tags generator", "best twitch tags", "twitch discovery tags", "twitch stream tags"],
  alternates: { canonical: "/free-tools/twitch-tags-generator" },
};

const FAQ = [
  { question: "How many tags can I use on Twitch?", answer: "Up to 10 per stream. Use a mix: one or two broad (your game, language) and several specific to your style so you show up in narrower, less crowded searches." },
  { question: "Do tags actually help small streamers?", answer: "Yes - they are how viewers filter browse. Specific tags put you in front of people looking for exactly your kind of content, where a big channel is not drowning you out." },
];

export default function Page() {
  return (
    <ToolShell slug="twitch-tags-generator" title="Twitch Tags Generator"
      intro="Tell it what you stream and get a set of relevant Twitch discovery tags, ready to copy. Swap a couple each stream and watch which ones pull viewers."
      faq={FAQ}
      posts={[
        { label: "What Is a Twitch Overlay?", href: "/blog/what-is-a-twitch-overlay" },
        { label: "Animated vs Static Stream Overlays", href: "/blog/animated-vs-static-stream-overlays" },
      ]}
      packs={["dark-gothic-raven-animated-stream-package", "sakura-dream-wolf-overlay", "inferno-phoenix-overlay"]}>
      <TwitchTagsGenerator />
    </ToolShell>
  );
}

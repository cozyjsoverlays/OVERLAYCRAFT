import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { StreamTitleGenerator } from "@/components/tools/StreamTitleGenerator";

export const metadata: Metadata = {
  title: "Stream Title Generator - Catchy Twitch Titles by Vibe",
  description:
    "Free stream title generator: enter what you play and a vibe (chill, hype, cozy, funny, pro) and get catchy, click-worthy Twitch stream titles to copy instantly.",
  keywords: ["stream title generator", "twitch title ideas", "catchy stream titles", "twitch stream title generator"],
  alternates: { canonical: "/free-tools/stream-title-generator" },
};

const FAQ = [
  { question: "What makes a good stream title?", answer: "Lead with the game or activity, add one hook (a goal, a mood, or a question), and keep it under ~60 characters so it never gets cut off in browse. Emojis help it stand out in a wall of text." },
  { question: "Should I change my title every stream?", answer: "Yes. Twitch browse is a feed - a fresh, specific title beats a generic evergreen one. Match it to what you are actually doing that day." },
];

export default function Page() {
  return (
    <ToolShell slug="stream-title-generator" title="Stream Title Generator"
      intro="Enter what you are streaming, pick the vibe, and get catchy titles built to earn clicks in Twitch browse. Click any title to copy it."
      faq={FAQ}>
      <StreamTitleGenerator />
    </ToolShell>
  );
}

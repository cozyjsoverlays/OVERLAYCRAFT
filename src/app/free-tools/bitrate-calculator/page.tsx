import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { BitrateCalculator } from "@/components/tools/BitrateCalculator";

export const metadata: Metadata = {
  title: "Twitch Bitrate Calculator - Best OBS Settings for Your Speed",
  description:
    "Free bitrate calculator for streamers: enter your upload speed and target resolution to get the recommended OBS bitrate, keyframe, encoder and preset for a stable stream.",
  keywords: ["twitch bitrate calculator", "obs bitrate settings", "best stream bitrate", "obs encoding settings", "stream bitrate"],
  alternates: { canonical: "/free-tools/bitrate-calculator" },
};

const FAQ = [
  { question: "What bitrate should I stream at?", answer: "It depends on your upload speed and output. Leave ~30% headroom so a busy scene never saturates your connection and drops frames. This tool does that math and gives Twitch-safe numbers." },
  { question: "Why do I keep dropping frames?", answer: "Usually the bitrate is too high for your real upload speed, or another device is using the connection. Lower the bitrate to the value here, use a wired connection, and set keyframe interval to 2 seconds." },
];

export default function Page() {
  return (
    <ToolShell slug="bitrate-calculator" title="Twitch Bitrate Calculator"
      intro="Enter your upload speed and the quality you want to stream at, and get a Twitch-safe bitrate plus the OBS settings that keep your stream smooth and drop-free."
      faq={FAQ}>
      <BitrateCalculator />
    </ToolShell>
  );
}

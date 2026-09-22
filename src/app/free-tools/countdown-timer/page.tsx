import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { CountdownTimer } from "@/components/tools/CountdownTimer";

export const metadata: Metadata = {
  title: "Starting Soon Countdown Timer - Free OBS Browser Source",
  description:
    "Free countdown timer for streamers: set the minutes and a message, then add it to OBS as a browser source for a clean Starting Soon or BRB countdown. No signup.",
  keywords: ["stream countdown timer", "starting soon timer", "obs countdown", "brb timer", "twitch countdown overlay"],
  alternates: { canonical: "/free-tools/countdown-timer" },
};

const FAQ = [
  { question: "How do I put this countdown in OBS?", answer: "Set your minutes and message, click 'Copy OBS browser-source URL', then in OBS add a Browser source and paste the URL (width 1920, height 1080). It auto-starts from the settings baked into the link." },
  { question: "Can I use it just on this page?", answer: "Yes - set the minutes and hit Start, then Fullscreen for a Starting Soon screen on a second monitor or capture card, no OBS needed." },
];

export default function Page() {
  return (
    <ToolShell slug="countdown-timer" title="Starting Soon Countdown Timer"
      intro="Set the minutes and a message, then drop it into OBS as a browser source for a clean countdown on your Starting Soon or BRB screen. Fully free."
      faq={FAQ}
      posts={[
        { label: "How to Add an Overlay to OBS (in Under 5 Minutes)", href: "/blog/how-to-add-overlay-to-obs" },
        { label: "Twitch Overlay Size Guide (2026)", href: "/blog/twitch-overlay-size-guide" },
      ]}
      packs={["cozy-fox-overlay-animated-stream-package", "midnight-magic-cat-overlay", "dark-gothic-raven-animated-stream-package"]}>
      <CountdownTimer />
    </ToolShell>
  );
}

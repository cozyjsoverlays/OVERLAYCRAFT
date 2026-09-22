import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/ToolShell";
import { ChatCommandGenerator } from "@/components/tools/ChatCommandGenerator";

export const metadata: Metadata = {
  title: "Chat Command Generator - Nightbot & StreamElements Commands",
  description:
    "Free chat command generator: fill in your Discord, socials, tip link and schedule and get ready-to-paste Nightbot or StreamElements !commands for your Twitch chat.",
  keywords: ["nightbot commands", "streamelements commands", "twitch chat commands", "chat command generator"],
  alternates: { canonical: "/free-tools/chat-command-generator" },
};

const FAQ = [
  { question: "How do I add these commands?", answer: "Copy a line and paste it into your Twitch chat while Nightbot or StreamElements is modding your channel. The bot creates the command instantly - viewers then type !discord, !socials and so on." },
  { question: "Do I need to be a mod to add commands?", answer: "You (the broadcaster) can always add them. The bot must be a moderator in your channel, which happens automatically when you connect it in its dashboard." },
];

export default function Page() {
  return (
    <ToolShell slug="chat-command-generator" title="Chat Command Generator"
      intro="Fill in your links, choose Nightbot or StreamElements, and copy ready-made !commands for your chat - socials, discord, tip, schedule, shoutout and more."
      faq={FAQ}>
      <ChatCommandGenerator />
    </ToolShell>
  );
}

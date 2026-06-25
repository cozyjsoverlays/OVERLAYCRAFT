/* eslint-disable @next/next/no-img-element */

export type ChatPlatform = "twitch" | "discord" | "youtube";
export type ChatTheme = "light" | "dark";

interface ChatPreviewProps {
  platform: ChatPlatform;
  theme: ChatTheme;
  emoteSrc: string;
  /** Optional sub-badge shown next to the username (Twitch). */
  badgeSrc?: string;
}

const PLATFORM_LABEL: Record<ChatPlatform, string> = {
  twitch: "Twitch chat",
  discord: "Discord",
  youtube: "YouTube live chat",
};

// Per-platform chat surface colors for light/dark.
const SURFACE: Record<ChatPlatform, Record<ChatTheme, { bg: string; text: string; sub: string }>> = {
  twitch: {
    dark: { bg: "#18181b", text: "#efeff1", sub: "#adadb8" },
    light: { bg: "#ffffff", text: "#0e0e10", sub: "#53535f" },
  },
  discord: {
    dark: { bg: "#313338", text: "#dbdee1", sub: "#949ba4" },
    light: { bg: "#ffffff", text: "#060607", sub: "#5c5e66" },
  },
  youtube: {
    dark: { bg: "#0f0f0f", text: "#f1f1f1", sub: "#aaaaaa" },
    light: { bg: "#ffffff", text: "#0f0f0f", sub: "#606060" },
  },
};

const NAME_COLORS = ["#ff7eb6", "#8a7dff", "#3fd0c9", "#ffb454"];

const ROWS = [
  { user: "cozygremlin", text: "this is so cute omg" },
  { user: "lofi_lily", text: "love it" },
  { user: "pixelpanda", text: "spam it" },
];

/** A small, realistic chat mockup showing the emote inline at its true chat size. */
export function ChatPreview({ platform, theme, emoteSrc, badgeSrc }: ChatPreviewProps) {
  const s = SURFACE[platform][theme];
  // Inline emote render size per platform (approx. real chat rendering).
  const emotePx = platform === "youtube" ? 24 : 28;

  return (
    <div className="overflow-hidden rounded-2xl border border-subtle shadow-card">
      <div className="flex items-center justify-between bg-surface-2 px-4 py-2">
        <span className="text-xs font-bold text-heading">{PLATFORM_LABEL[platform]}</span>
        <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
          {theme}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 p-4" style={{ background: s.bg }}>
        {ROWS.map((row, i) => (
          <div key={i} className="flex flex-wrap items-center gap-1.5 text-sm leading-snug">
            {platform === "twitch" && badgeSrc && (
              <img src={badgeSrc} alt="sub badge" width={18} height={18} style={{ width: 18, height: 18 }} />
            )}
            <span style={{ color: NAME_COLORS[i % NAME_COLORS.length], fontWeight: 700 }}>
              {row.user}
              {platform !== "youtube" ? ":" : ""}
            </span>
            <span style={{ color: s.text }} className="inline-flex flex-wrap items-center gap-1">
              {row.text}
              <img
                src={emoteSrc}
                alt="your emote in chat"
                width={emotePx}
                height={emotePx}
                style={{ width: emotePx, height: emotePx, verticalAlign: "middle" }}
              />
            </span>
          </div>
        ))}
        <div className="mt-1 text-xs" style={{ color: s.sub }}>
          {platform === "youtube" ? "Chat is live" : "Send a message"}
        </div>
      </div>
    </div>
  );
}

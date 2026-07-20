"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

type Style = "cozy" | "gothic" | "kawaii" | "epic" | "chaotic";

const BANKS: Record<Style, { adj: string[]; noun: string[]; suffix: string[] }> = {
  cozy: {
    adj: ["Cozy", "Sleepy", "Mellow", "Honey", "Maple", "Pumpkin", "Fuzzy", "Toasty", "Snug", "Drowsy", "Amber", "Willow"],
    noun: ["Fox", "Panda", "Raccoon", "Bunny", "Moth", "Cabin", "Ember", "Biscuit", "Cloud", "Fern", "Otter", "Mug"],
    suffix: ["TV", "Live", "Den", "Nook", "Vibes", "Cafe", "Corner", "Streams"],
  },
  gothic: {
    adj: ["Grim", "Hollow", "Veiled", "Raven", "Dusk", "Wraith", "Obsidian", "Mourning", "Pale", "Thorn", "Crypt", "Nocturne"],
    noun: ["Raven", "Reaper", "Wolf", "Serpent", "Moth", "Widow", "Specter", "Omen", "Talon", "Shade", "Requiem", "Vesper"],
    suffix: ["TV", "Rises", "Wakes", "Hollow", "Manor", "Void", "Live", "Coven"],
  },
  kawaii: {
    adj: ["Mochi", "Peachy", "Bubbly", "Sakura", "Berry", "Puffy", "Sparkle", "Milky", "Sugar", "Pastel", "Choco", "Lulu"],
    noun: ["Neko", "Bun", "Star", "Bean", "Puff", "Pon", "Chan", "Boba", "Melody", "Petal", "Momo", "Pico"],
    suffix: ["Chan", "Uwu", "Pop", "Land", "Chu", "Live", "Play", "Doki"],
  },
  epic: {
    adj: ["Iron", "Storm", "Crimson", "Astral", "Rogue", "Titan", "Blaze", "Frost", "Shadow", "Royal", "Feral", "Primal"],
    noun: ["Phoenix", "Dragon", "Knight", "Ronin", "Falcon", "Viking", "Samurai", "Warden", "Hunter", "Legion", "Sentinel", "Valkyrie"],
    suffix: ["TV", "GG", "Prime", "Rising", "X", "Live", "HQ", "Plays"],
  },
  chaotic: {
    adj: ["Feral", "Unhinged", "Caffeinated", "Goblin", "Cursed", "Sweaty", "Rabid", "Gremlin", "Menace", "Silly", "Rogue", "Crunchy"],
    noun: ["Gremlin", "Goblin", "Rat", "Possum", "Chaos", "Cryptid", "Bandit", "Menace", "Pigeon", "Lizard", "Imp", "Goose"],
    suffix: ["TV", "Era", "Hours", "Mode", "Energy", "Live", "Inc", "Arc"],
  },
};

const STYLES: { key: Style; label: string; glyph: string }[] = [
  { key: "cozy", label: "Cozy", glyph: "🍵" },
  { key: "gothic", label: "Gothic", glyph: "🪶" },
  { key: "kawaii", label: "Kawaii", glyph: "🌸" },
  { key: "epic", label: "Epic", glyph: "🐉" },
  { key: "chaotic", label: "Chaotic", glyph: "🦝" },
];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

function makeNames(style: Style, keywordRaw: string): string[] {
  const { adj, noun, suffix } = BANKS[style];
  const keyword = cap(keywordRaw.replace(/[^a-zA-Z0-9]/g, "").slice(0, 14));
  const out = new Set<string>();
  let guard = 0;
  while (out.size < 8 && guard++ < 80) {
    const roll = Math.random();
    let name: string;
    if (keyword && roll < 0.45) {
      // Weave the user's word in
      name = Math.random() < 0.5 ? `${pick(adj)}${keyword}` : `${keyword}${pick(suffix)}`;
    } else if (roll < 0.7) {
      name = `${pick(adj)}${pick(noun)}`;
    } else if (roll < 0.88) {
      name = `${pick(adj)}${pick(noun)}${pick(suffix)}`;
    } else {
      name = `${pick(noun)}${pick(suffix)}`;
    }
    if (name.length <= 25) out.add(name); // Twitch max username length
  }
  return [...out];
}

export function TwitchNameGenerator() {
  const [style, setStyle] = useState<Style>("cozy");
  const [keyword, setKeyword] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(name: string) {
    await navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur md:p-8">
      <div className="flex flex-wrap gap-2">
        {STYLES.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setStyle(s.key)}
            className={`rounded-full px-4 py-2 font-body text-sm transition-colors ${
              style === s.key ? "bg-volt text-white shadow-volt" : "border border-veil text-mist hover:text-lilac"
            }`}
          >
            {s.glyph} {s.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="ng-keyword" className="sr-only">Optional word to include</label>
          <input
            id="ng-keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            maxLength={14}
            placeholder="Optional: a word to include (your name, a game...)"
            className="w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush placeholder:text-mist/60 focus:border-lilac/60 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setNames(makeNames(style, keyword))}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-volt px-7 py-3 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
        >
          <Sparkles size={16} aria-hidden />
          Generate names
        </button>
      </div>

      {names.length > 0 && (
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {names.map((n) => (
            <li key={n}>
              <button
                type="button"
                onClick={() => copy(n)}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-veil bg-ink px-4 py-3 text-left transition-colors hover:border-lilac/60"
                aria-label={`Copy ${n}`}
              >
                <span className="font-mono text-sm text-blush">{n}</span>
                {copied === n ? (
                  <Check size={15} className="shrink-0 text-volt" aria-hidden />
                ) : (
                  <Copy size={15} className="shrink-0 text-mist" aria-hidden />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {names.length > 0 && (
        <p className="mt-4 text-xs text-mist">
          Click a name to copy it. Check availability on Twitch before you commit - and grab
          it on YouTube and TikTok at the same time so your brand matches everywhere.
        </p>
      )}
    </div>
  );
}

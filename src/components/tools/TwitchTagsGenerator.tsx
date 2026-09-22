"use client";

import { useState } from "react";

const BASE = ["English", "Chill", "Interactive", "FamilyFriendly", "Cozy", "SmallStreamer", "Vibes"];
const MAP: { re: RegExp; tags: string[] }[] = [
  { re: /valorant|cs|fps|shooter|apex|cod|fortnite/i, tags: ["FPS", "Competitive", "Ranked", "Aim", "Controller", "Grind"] },
  { re: /league|lol|dota|moba/i, tags: ["MOBA", "Ranked", "Educational", "Climb", "Coaching"] },
  { re: /minecraft|build|survival/i, tags: ["Minecraft", "Building", "Survival", "Cozy", "Creative"] },
  { re: /art|draw|paint|design|creative/i, tags: ["ArtStream", "DigitalArt", "Illustration", "Commissions", "Procreate", "Chill"] },
  { re: /just chat|irl|talk|podcast/i, tags: ["JustChatting", "IRL", "Talk", "Community", "AMA"] },
  { re: /horror|scary|spooky/i, tags: ["Horror", "Scary", "Reactions", "Jumpscares"] },
  { re: /vtuber|png|model/i, tags: ["VTuber", "PNGTuber", "Anime", "Kawaii", "EN"] },
  { re: /music|sing|guitar|piano|dj/i, tags: ["Music", "LiveMusic", "Singing", "Chill", "Requests"] },
  { re: /speedrun|challenge|hardcore/i, tags: ["Speedrun", "Challenge", "NoHit", "PB"] },
  { re: /cozy|relax|lofi|study/i, tags: ["Cozy", "Lofi", "StudyWithMe", "Relaxing", "Aesthetic"] },
];

export function TwitchTagsGenerator() {
  const [q, setQ] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  function gen() {
    const found = MAP.filter((m) => m.re.test(q)).flatMap((m) => m.tags);
    const set = [...new Set([...(found.length ? found : ["Gaming", "Variety"]), ...BASE])].slice(0, 10);
    setTags(set);
  }
  function copyAll() {
    try { navigator.clipboard.writeText(tags.join(" ")); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <input
          className="w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush placeholder:text-mist/60 focus:border-lilac/60 focus:outline-none"
          value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && gen()}
          placeholder="What do you stream? e.g. Valorant, cozy art, VTuber just chatting"
        />
        <button onClick={gen} className="rounded-xl bg-volt px-6 py-3 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]">
          Get tags
        </button>
      </div>
      {tags.length > 0 && (
        <div className="mt-6 rounded-2xl border border-veil bg-ink2/70 p-5 backdrop-blur">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-veil bg-ink px-3 py-1.5 font-mono text-xs text-lilac">{t}</span>
            ))}
          </div>
          <button onClick={copyAll} className="mt-4 rounded-lg bg-volt px-4 py-2 font-mono text-[11px] font-bold text-white">
            {copied ? "copied!" : "copy all tags"}
          </button>
          <p className="mt-3 text-xs text-mist">Twitch allows up to 10 tags. Add these under your stream info, then swap a couple each stream to see what pulls viewers.</p>
        </div>
      )}
    </div>
  );
}

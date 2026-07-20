"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

type Vibe = "cozy" | "funny" | "competitive" | "wholesome" | "mysterious";

const VIBES: { key: Vibe; label: string; glyph: string }[] = [
  { key: "cozy", label: "Cozy", glyph: "🍵" },
  { key: "funny", label: "Funny", glyph: "😹" },
  { key: "competitive", label: "Competitive", glyph: "🏆" },
  { key: "wholesome", label: "Wholesome", glyph: "🌸" },
  { key: "mysterious", label: "Mysterious", glyph: "🌙" },
];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function makeBios(name: string, content: string, schedule: string, vibe: Vibe, emoji: boolean): string[] {
  const n = name.trim() || "your friendly neighborhood streamer";
  const c = content.trim() || "a little bit of everything";
  const s = schedule.trim();
  const sched = s ? ` Live ${s}.` : "";

  const T: Record<Vibe, ((...a: string[]) => string)[]> = {
    cozy: [
      () => `Welcome to the coziest corner of Twitch. I'm ${n} and I stream ${c} with warm vibes, lofi energy and zero pressure.${sched} Bring a blanket, chat counts as home now.`,
      () => `${n} here. Think of this stream as a late-night cafe: ${c}, soft music, good company.${sched} New friends always welcome, lurkers extra welcome.`,
      () => `Streaming ${c} like it's a rainy Sunday afternoon. I'm ${n}, the kettle is always on, and chat is the comfiest seat in the house.${sched}`,
    ],
    funny: [
      () => `I'm ${n} and I play ${c} badly so you don't have to. Comedy is intentional, the deaths are not.${sched} Follow for chaos, stay for the excuses.`,
      () => `${n}. Professional ${c} enjoyer, amateur everything else. My aim is bad but my one-liners are worse.${sched} You've been warned.`,
      () => `Streaming ${c} with a 100% guaranteed clip-it moment per stream (results not guaranteed). I'm ${n}.${sched} Chat carries, I take credit.`,
    ],
    competitive: [
      () => `${n}. Grinding ${c} every stream - ranked, improvement, and the occasional rage-laugh.${sched} Come for the gameplay, stay for the climb.`,
      () => `I'm ${n} and the goal is simple: get better at ${c} every single day, on camera, no excuses.${sched} Callouts welcome, backseat drivers negotiable.`,
      () => `${c}. High effort, higher standards. I'm ${n} and this channel is the grind in real time.${sched} If you like improvement arcs, you're home.`,
    ],
    wholesome: [
      () => `Hi, I'm ${n}! This is a happy little corner of the internet where we play ${c}, celebrate small wins and hype each other up.${sched} Everyone is welcome here.`,
      () => `${n} here - streaming ${c} with good vibes only. This community is built on kindness, silly moments and cheering each other on.${sched}`,
      () => `Welcome in! I'm ${n} and around here we play ${c}, we say thank you to lurkers, and we never gatekeep.${sched} Pull up a seat, friend.`,
    ],
    mysterious: [
      () => `They say a stream appears here when the moon is right. ${c}. I'm ${n}.${sched} The door is open - whether you should walk through it is another question.`,
      () => `${n}. Keeper of late-night streams and ${c}. The lore reveals itself to those who stay.${sched} The candle is lit, the stream is live.`,
      () => `Some channels are found, this one finds you. I'm ${n}, streaming ${c} from somewhere between midnight and the void.${sched}`,
    ],
  };

  const EMO: Record<Vibe, string> = {
    cozy: " 🍵🕯️",
    funny: " 😹🎪",
    competitive: " 🏆🔥",
    wholesome: " 🌸💖",
    mysterious: " 🌙🪶",
  };

  return T[vibe].map((fn) => {
    let bio = fn();
    if (emoji) bio += EMO[vibe];
    return bio.length > 300 ? bio.slice(0, 297) + "..." : bio;
  });
}

export function TwitchBioGenerator() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [schedule, setSchedule] = useState("");
  const [vibe, setVibe] = useState<Vibe>("cozy");
  const [emoji, setEmoji] = useState(true);
  const [bios, setBios] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  async function copy(bio: string, i: number) {
    await navigator.clipboard.writeText(bio);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  }

  const inputCls =
    "w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush placeholder:text-mist/60 focus:border-lilac/60 focus:outline-none";

  return (
    <div className="rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur md:p-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="bg-name" className="block pb-1.5 font-body text-xs uppercase tracking-wider text-lilac">Your name</label>
          <input id="bg-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} placeholder="e.g. CozyFoxTV" className={inputCls} />
        </div>
        <div>
          <label htmlFor="bg-content" className="block pb-1.5 font-body text-xs uppercase tracking-wider text-lilac">What you stream</label>
          <input id="bg-content" value={content} onChange={(e) => setContent(e.target.value)} maxLength={60} placeholder="e.g. Stardew, Minecraft & chatting" className={inputCls} />
        </div>
        <div>
          <label htmlFor="bg-schedule" className="block pb-1.5 font-body text-xs uppercase tracking-wider text-lilac">Schedule (optional)</label>
          <input id="bg-schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} maxLength={50} placeholder="e.g. Tue-Sat, 7pm EST" className={inputCls} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {VIBES.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setVibe(v.key)}
            className={`rounded-full px-4 py-2 font-body text-sm transition-colors ${
              vibe === v.key ? "bg-volt text-white shadow-volt" : "border border-veil text-mist hover:text-lilac"
            }`}
          >
            {v.glyph} {v.label}
          </button>
        ))}
        <label className="ml-auto flex cursor-pointer items-center gap-2 font-body text-sm text-mist">
          <input type="checkbox" checked={emoji} onChange={(e) => setEmoji(e.target.checked)} className="accent-[#FF3FA5]" />
          Emojis
        </label>
      </div>

      <button
        type="button"
        onClick={() => setBios(makeBios(name, content, schedule, vibe, emoji))}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-volt px-7 py-3 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
      >
        <Sparkles size={16} aria-hidden />
        Generate bios
      </button>

      {bios.length > 0 && (
        <div className="mt-6 space-y-3">
          {bios.map((bio, i) => (
            <div key={i} className="rounded-xl border border-veil bg-ink p-4">
              <p className="leading-relaxed text-blush/90">{bio}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className={`font-mono text-xs ${bio.length > 300 ? "text-softRed" : "text-mist"}`}>
                  {bio.length}/300 characters
                </span>
                <button
                  type="button"
                  onClick={() => copy(bio, i)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-veil px-3 py-1.5 font-body text-xs text-lilac transition-colors hover:border-lilac/60"
                >
                  {copied === i ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
                  {copied === i ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

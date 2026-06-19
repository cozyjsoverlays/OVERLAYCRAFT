import { COMPATIBILITY } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import {
  TwitchIcon,
  KickIcon,
  TikTokIcon,
  StreamlabsIcon,
} from "@/components/icons";
import { Youtube, Video, Radio } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  Twitch: <TwitchIcon className="h-5 w-5" />,
  YouTube: <Youtube className="h-5 w-5" />,
  Kick: <KickIcon className="h-5 w-5" />,
  TikTok: <TikTokIcon className="h-5 w-5" />,
  "OBS Studio": <Video className="h-5 w-5" />,
  Streamlabs: <StreamlabsIcon className="h-5 w-5" />,
  StreamElements: <Radio className="h-5 w-5" />,
};

export function Compatibility() {
  return (
    <section className="border-y border-subtle bg-surface/30 py-12">
      <div className="container-page">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
            Works everywhere you stream
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {COMPATIBILITY.map((name, i) => (
            <Reveal key={name} delay={i * 0.05}>
              <div className="flex items-center gap-2 text-body transition-colors hover:text-heading">
                <span className="text-lavender">{ICONS[name]}</span>
                <span className="text-sm font-bold">{name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

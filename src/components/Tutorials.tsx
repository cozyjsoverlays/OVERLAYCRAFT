import { Play, Youtube, ExternalLink } from "lucide-react";
import { TUTORIALS, LINKS } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Tutorials() {
  return (
    <section id="tutorials" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="YouTube Tutorials"
          title={
            <>
              Learn it in <span className="gradient-text">minutes</span>
            </>
          }
          subtitle="Quick, friendly walkthroughs so your overlays look perfect from your very first stream."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TUTORIALS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <a
                href={LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group block overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-surface-2 to-surface">
                  <div
                    aria-hidden
                    className="glow-blob absolute h-32 w-32 bg-pink opacity-30"
                  />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent-gradient text-base shadow-glow transition-transform group-hover:scale-110">
                    <Play size={26} className="ml-1 fill-base" />
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-base/70 px-2.5 py-1 text-[11px] font-bold text-heading backdrop-blur">
                    {t.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-heading">{t.title}</h3>
                  <p className="mt-2 text-sm text-body">{t.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-6 py-3 text-sm font-bold text-heading transition-all hover:border-lavender/40 hover:shadow-glow"
          >
            <Youtube size={18} className="text-pink" />
            Watch All Tutorials on YouTube
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

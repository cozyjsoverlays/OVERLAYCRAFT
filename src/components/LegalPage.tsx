import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-8 pt-36 md:pt-44">
          <AuroraBackground />
          <div className="container-page max-w-3xl">
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight text-heading">
              {title}
            </h1>
            <p className="mt-3 text-sm text-muted">Last updated {updated}</p>
          </div>
        </section>

        <div className="container-page max-w-3xl pb-20">
          <div className="flex flex-col gap-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="mb-3 text-xl font-bold text-heading">
                  {s.heading}
                </h2>
                <div className="flex flex-col gap-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-body">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
            <p className="mt-4 rounded-xl border border-subtle bg-surface/50 p-4 text-sm text-muted">
              This is a starter policy stub. Replace it with text reviewed for
              your jurisdiction before going live.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

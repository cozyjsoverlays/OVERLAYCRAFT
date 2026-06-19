import { HOW_IT_WORKS } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function HowItWorks() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              Live in <span className="gradient-text">four steps</span>
            </>
          }
          subtitle="No design skills needed. From checkout to going live takes minutes."
        />

        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08}>
              <div className="glass relative h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gradient text-lg font-extrabold text-base shadow-glow">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-heading">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-body">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

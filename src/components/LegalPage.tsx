import { SectionHeading } from "./SectionHeading";

export function LegalPage({
  label,
  title,
  sections,
}: {
  label: string;
  title: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <SectionHeading label={label} title={title} />
      <p className="mt-4 font-mono text-xs text-mist">Last updated: July 2026</p>
      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-lg text-blush">{s.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

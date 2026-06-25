export interface Faq {
  q: string;
  a: string;
}

/** Renders an FAQ block (the H2 + Q/A that answers the literal search query). */
export function ToolFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-extrabold text-heading">
        Frequently asked questions
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-2xl border border-subtle bg-surface/40 p-5">
            <h3 className="font-bold text-heading">{f.q}</h3>
            <p className="mt-2 text-body">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Build schema.org FAQPage JSON-LD from the same data. */
export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

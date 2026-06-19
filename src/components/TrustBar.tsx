import { TRUST_ITEMS } from "@/data/site";

export function TrustBar() {
  return (
    <section
      aria-label="Why streamers trust CozyOverlays"
      className="border-y border-subtle bg-surface/40"
    >
      <div className="container-page">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-sm text-body">
          {TRUST_ITEMS.map((item, i) => (
            <li key={item} className="flex items-center gap-8">
              {i > 0 && (
                <span aria-hidden className="hidden h-1 w-1 rounded-full bg-lavender/40 sm:block" />
              )}
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

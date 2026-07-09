/** Engraved section label + heading with the lilac diamond-spark divider. */
export function SectionHeading({
  label,
  title,
  center = false,
}: {
  label: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="font-display text-xs uppercase tracking-[0.3em] text-lilac">{label}</p>
      <h2 className="mt-2 font-display text-3xl text-blush md:text-4xl">{title}</h2>
      <div className={`mt-4 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="h-px w-16 bg-veil" />
        <span className="h-1.5 w-1.5 rotate-45 bg-lilac" />
        <span className="h-px w-16 bg-veil" />
      </div>
    </div>
  );
}

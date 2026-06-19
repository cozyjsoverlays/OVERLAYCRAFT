import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "@/lib/clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={clsx(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-lavender">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight text-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-base text-body md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

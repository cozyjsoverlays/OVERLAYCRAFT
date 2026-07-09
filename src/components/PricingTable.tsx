import Link from "next/link";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Starter",
    price: 100,
    tagline: "Your world, established.",
    features: ["Custom overlay scene", "All animated screens (Starting Soon, BRB, Ending, Offline)", "Facecam frame", "1 revision round"],
    highlight: false,
  },
  {
    name: "Pro",
    price: 250,
    tagline: "The full broadcast kit.",
    features: ["Everything in Starter", "Animated alerts (follow, sub, raid, donation)", "Info panels & banners", "Stinger transitions", "2 revision rounds"],
    highlight: true,
  },
  {
    name: "Full Brand",
    price: 400,
    tagline: "A channel identity, forged.",
    features: ["Everything in Pro", "Custom emote set", "Sub badge set", "Mascot / logo design", "Source files included"],
    highlight: false,
  },
];

export function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TIERS.map((tier) => (
        <div
          key={tier.name}
          className={`relative flex flex-col rounded-2xl border p-7 backdrop-blur ${
            tier.highlight
              ? "border-volt/60 bg-ink2/90 shadow-volt-soft"
              : "border-veil bg-ink2/70"
          }`}
        >
          {tier.highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-volt px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-blush">
              Most popular
            </span>
          )}
          <h3 className="font-display text-xl text-blush">{tier.name}</h3>
          <p className="mt-1 text-sm text-mist">{tier.tagline}</p>
          <p className="mt-5 font-mono text-4xl text-volt">
            ${tier.price}
            <span className="text-sm text-mist"> / project</span>
          </p>
          <ul className="mt-6 flex-1 space-y-3">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-blush/85">
                <Check size={15} className="mt-0.5 shrink-0 text-lilac" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="#intake"
            className={`mt-7 rounded-xl px-5 py-3 text-center font-body text-sm font-medium transition-all active:scale-[0.97] ${
              tier.highlight
                ? "bg-volt text-blush shadow-volt hover:bg-voltDim"
                : "border border-veil text-lilac hover:border-lilac/60"
            }`}
          >
            Start a {tier.name} brief
          </Link>
        </div>
      ))}
    </div>
  );
}

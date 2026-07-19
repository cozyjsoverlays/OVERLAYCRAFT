/** Crescent-moon "OC" monogram - lilac→volt gradient, volt spark at the tip. */
export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="oc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F02C97" />
          <stop offset="100%" stopColor="#FF3FA5" />
        </linearGradient>
      </defs>
      {/* Crescent O */}
      <path
        d="M20 4a16 16 0 1 0 0 32 13 13 0 0 1-9.5-4.6A13 13 0 0 1 20 4z"
        fill="url(#oc-grad)"
        transform="rotate(20 20 20)"
      />
      {/* C stroke */}
      <path
        d="M27 13a9 9 0 1 0 0 14"
        fill="none"
        stroke="url(#oc-grad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Volt spark at the crescent tip */}
      <circle cx="31" cy="8" r="2.4" fill="#FF3FA5" />
      <circle cx="31" cy="8" r="4.5" fill="#FF3FA5" opacity="0.25" />
    </svg>
  );
}

interface AuroraBackgroundProps {
  /** Add extra glow blobs for hero-level intensity. */
  intense?: boolean;
}

/**
 * Slowly drifting aurora glow blobs. Pure CSS animation (defined in the
 * Tailwind config) so it is GPU-cheap and pauses under prefers-reduced-motion.
 */
export function AuroraBackground({ intense = false }: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="glow-blob absolute -left-[10%] top-[5%] h-[40vw] w-[40vw] animate-aurora-1 bg-lavender"
        style={{ opacity: 0.4 }}
      />
      <div
        className="glow-blob absolute right-[-5%] top-[20%] h-[35vw] w-[35vw] animate-aurora-2 bg-pink"
        style={{ opacity: 0.28 }}
      />
      {intense && (
        <>
          <div
            className="glow-blob absolute bottom-[0%] left-[30%] h-[38vw] w-[38vw] animate-aurora-3 bg-cyan"
            style={{ opacity: 0.22 }}
          />
          <div
            className="glow-blob absolute left-[45%] top-[-10%] h-[28vw] w-[28vw] animate-aurora-2 bg-lavender"
            style={{ opacity: 0.3 }}
          />
        </>
      )}
    </div>
  );
}

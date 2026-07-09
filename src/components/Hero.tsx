"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const DUST = [
  { left: "12%", top: "30%", delay: 0, size: 3 },
  { left: "25%", top: "62%", delay: 1.4, size: 2 },
  { left: "41%", top: "22%", delay: 0.6, size: 2.5 },
  { left: "58%", top: "70%", delay: 2.1, size: 3 },
  { left: "71%", top: "35%", delay: 0.9, size: 2 },
  { left: "84%", top: "55%", delay: 1.8, size: 2.5 },
  { left: "48%", top: "48%", delay: 2.6, size: 2 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Showreel backdrop — drop the real loop at /media/showreel.mp4 */}
      <video
        src="/media/showreel.mp4"
        poster="/media/showreel-poster.jpg"
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
      {/* Faint volt energy glow behind the headline */}
      <div className="absolute inset-0 bg-volt-glow" />

      {/* Drifting lilac dust */}
      {DUST.map((d, i) => (
        <span
          key={i}
          className="absolute animate-drift rounded-full bg-lilac"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            opacity: 0.5,
          }}
          aria-hidden
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 py-28 text-center md:px-8 md:py-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-xs uppercase tracking-[0.35em] text-lilac"
        >
          Forged for your stream
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-blush md:text-6xl"
        >
          Cinematic Stream Overlays.{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">
            Instant Download.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-6 max-w-xl font-body text-mist md:text-lg"
        >
          Animated packages for Twitch, YouTube &amp; Kick — trusted by 1,300+ streamers.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/overlays"
            className="w-full rounded-xl bg-cta-gradient px-8 py-4 font-body text-sm font-semibold text-blush shadow-volt transition-all hover:shadow-volt hover:brightness-110 active:scale-[0.97] sm:w-auto"
          >
            Browse Overlays
          </Link>
          <Link
            href="/custom"
            className="w-full rounded-xl border border-veil px-8 py-4 font-body text-sm font-medium text-lilac transition-colors hover:border-lilac/60 hover:text-blush sm:w-auto"
          >
            Get a Custom Design
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

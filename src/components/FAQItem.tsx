"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqEntry } from "@/lib/types";

export function FAQItem({ entry }: { entry: FaqEntry }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="text-base font-bold text-heading">
            {entry.question}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-subtle text-lavender transition-transform duration-300 ${
              open ? "rotate-45 bg-lavender/15" : ""
            }`}
          >
            <Plus size={16} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="content"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-body">
              {entry.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

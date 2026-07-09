"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqEntry } from "@/lib/types";

export function FAQAccordion({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-veil rounded-2xl border border-veil bg-ink2/70 backdrop-blur">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-body text-sm font-medium text-blush">{item.question}</span>
              <ChevronDown
                size={16}
                aria-hidden
                className={`shrink-0 text-lilac transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-mist">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

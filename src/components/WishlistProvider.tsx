"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface WishlistContextValue {
  saved: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "overlaycraft:wishlist";

/**
 * Wishlist keyed by product slug, persisted to localStorage so saves survive
 * reloads and return visits. Structured so a DB/account sync can replace the
 * storage layer later without touching consumers.
 */
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved slugs once on mount (client only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSaved(parsed.filter((s) => typeof s === "string"));
      }
    } catch {
      /* storage unavailable - stay in-memory for this session */
    }
    setHydrated(true);
  }, []);

  // Persist on every change, but only after the initial load so we never
  // overwrite stored saves with the empty starting state.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [saved, hydrated]);

  // Keep multiple open tabs in sync.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setSaved(parsed.filter((s) => typeof s === "string"));
        } catch {
          /* ignore */
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((slug: string) => {
    setSaved((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      saved,
      isSaved: (slug) => saved.includes(slug),
      toggle,
    }),
    [saved, toggle]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

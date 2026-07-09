"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface WishlistContextValue {
  saved: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

/**
 * In-memory wishlist keyed by product slug. Kept behind a single context so
 * persistence (localStorage, then DB/account) can be added here later without
 * touching consumers.
 */
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);

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

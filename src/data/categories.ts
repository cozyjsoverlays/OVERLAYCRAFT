import type { Category } from "@/lib/types";

/**
 * Browse-by-animal cards. `href` points into the shop; categories that map to a
 * real product category deep-link to that filter, the rest open the full shop.
 */
export const CATEGORIES: Category[] = [
  { name: "Cats", emoji: "🐱", count: 22, href: "/shop?category=cat" },
  { name: "Wolves", emoji: "🐺", count: 12, href: "/shop?category=japanese" },
  { name: "Bears", emoji: "🐻", count: 11, href: "/shop?category=bear" },
  { name: "Foxes", emoji: "🦊", count: 6, href: "/shop?category=fox" },
  { name: "Otters", emoji: "🦦", count: 5, href: "/shop?category=frog" },
  { name: "Dogs", emoji: "🐶", count: 4, href: "/shop" },
  { name: "Dragons", emoji: "🐉", count: 4, href: "/shop?category=dragon" },
  { name: "Bunnies", emoji: "🐰", count: 3, href: "/shop" },
  { name: "Frogs", emoji: "🐸", count: 3, href: "/shop?category=frog" },
  { name: "Raccoons", emoji: "🦝", count: 3, href: "/shop" },
  { name: "Turtles", emoji: "🐢", count: 2, href: "/shop" },
  { name: "TikTok Sets", emoji: "🎵", count: 8, href: "/shop" },
];

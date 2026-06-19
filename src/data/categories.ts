import type { Category } from "@/lib/types";
import { LINKS } from "@/data/site";

export const CATEGORIES: Category[] = [
  { name: "Cats", emoji: "🐱", count: 22, href: LINKS.etsyCats },
  { name: "Wolves", emoji: "🐺", count: 12, href: LINKS.etsy },
  { name: "Bears", emoji: "🐻", count: 11, href: LINKS.etsy },
  { name: "Foxes", emoji: "🦊", count: 6, href: LINKS.etsy },
  { name: "Otters", emoji: "🦦", count: 5, href: LINKS.etsy },
  { name: "Dogs", emoji: "🐶", count: 4, href: LINKS.etsy },
  { name: "Dragons", emoji: "🐉", count: 4, href: LINKS.etsy },
  { name: "Bunnies", emoji: "🐰", count: 3, href: LINKS.etsy },
  { name: "Frogs", emoji: "🐸", count: 3, href: LINKS.etsy },
  { name: "Raccoons", emoji: "🦝", count: 3, href: LINKS.etsy },
  { name: "Turtles", emoji: "🐢", count: 2, href: LINKS.etsy },
  { name: "TikTok Sets", emoji: "🎵", count: 8, href: LINKS.etsy },
];

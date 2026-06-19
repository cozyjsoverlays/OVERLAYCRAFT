import type { Review } from "@/lib/types";

export const REVIEWS: Review[] = [
  {
    name: "Theresa",
    date: "Jun 4, 2026",
    stars: 5,
    quote:
      "Absolutely adorable and comes with literally everything you need to get started.",
    pack: "Dragon Sakura Package",
  },
  {
    name: "Obvskur",
    date: "May 31, 2026",
    stars: 5,
    quote:
      "It is very cute! I have 2 cats, one black and one white and it fits perfectly!",
    pack: "Cat Forest Package",
  },
  {
    name: "Courtney",
    date: "Jun 5, 2026",
    stars: 5,
    quote: "Got this for the panels and they are stunning!",
    pack: "Starry Forest Bear Package",
  },
  {
    name: "Stephen",
    date: "May 28, 2026",
    stars: 5,
    quote: "Absolutely perfect. Just what I needed.",
    pack: "Red Panda Sakura Package",
  },
  {
    name: "Kerry",
    date: "May 24, 2026",
    stars: 5,
    quote: "Just what I wanted 😁",
    pack: "Otter Forest Magic Package",
  },
  {
    name: "Danny",
    date: "May 22, 2026",
    stars: 5,
    quote:
      "Love it and I like dragons — it was such a fun theme, perfect for my stream!",
    pack: "Dragon Sakura Package",
  },
  {
    name: "Tonton",
    date: "Jun 2, 2026",
    stars: 5,
    quote:
      "A very cool and good quality Twitch Overlay. Thank you for the great work!",
    pack: "Lofi Sunset Panda Package",
  },
  {
    name: "Mrs.",
    date: "Jun 8, 2026",
    stars: 5,
    quote: "Thank you very much :)",
    pack: "Cat Forest Package",
  },
];

export const REVIEW_SUMMARY = {
  average: "4.9",
  count: 91,
} as const;

import type { Pack, PackCategory } from "@/lib/types";

export const PACKS: Pack[] = [
  {
    slug: "cat-forest",
    name: "Cat Forest Animated Stream Package",
    category: "cat",
    price: "$24.00",
    description:
      "Dreamy glowing forest cats, soft light, magical woodland atmosphere.",
    image:
      "https://i.etsystatic.com/61635066/r/il/316113/7805031188/il_794xN.7805031188_mn58.jpg",
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/rdr4j94wjoeummxxprj3.mp4",
    etsy: "https://www.etsy.com/listing/4471959754",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
  {
    slug: "dragon-sakura",
    name: "Dragon Sakura Animated Stream Package",
    category: "dragon",
    price: "$25.39",
    description:
      "Majestic lofi dragon amid cherry blossoms — fantasy at its finest.",
    image:
      "https://i.etsystatic.com/61635066/r/il/be4ff6/7769904430/il_794xN.7769904430_keij.jpg",
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/zr0vvvwensivtpsaie0i.mp4",
    etsy: "https://www.etsy.com/listing/4466565669",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes", "Sub Badges"],
    bestseller: true,
  },
  {
    slug: "sakura-panda",
    name: "Sakura Panda Animated Stream Package",
    category: "bear",
    price: "$24.00",
    description:
      "Soft pink blossom world with a gentle panda — pure kawaii energy.",
    image:
      "https://i.etsystatic.com/61635066/r/il/52ef5f/7803817421/il_794xN.7803817421_5b3q.jpg",
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/wpuzrfa9bomqur4qrhlw.mp4",
    etsy: "https://www.etsy.com/listing/4464457983",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
  {
    slug: "fox-forest-magic",
    name: "Fox Forest Magic Animated Package",
    category: "fox",
    price: "$24.00",
    description:
      "A magical lofi fox in a glowing woodland — warm and enchanting.",
    image:
      "https://i.etsystatic.com/61635066/r/il/5fc1ac/7822491494/il_794xN.7822491494_cm0u.jpg",
    etsy: "https://www.etsy.com/listing/4474605659",
    features: ["Animated Screens", "Alerts", "Panels"],
  },
  {
    slug: "frog-forest-magic",
    name: "Frog Forest Magic Animated Package",
    category: "frog",
    price: "$23.00",
    description:
      "A cheerful frog in a lush magical forest — unique and charming.",
    image:
      "https://i.etsystatic.com/61635066/r/il/f1e940/7907499425/il_794xN.7907499425_l3np.jpg",
    etsy: "https://www.etsy.com/listing/4480209391",
    features: ["Animated Screens", "Alerts", "Emotes"],
  },
  {
    slug: "moonlit-samurai",
    name: "Moonlit Samurai Animated Package",
    category: "japanese",
    price: "$24.00",
    description:
      "A cinematic Japanese samurai night scene — bold, dramatic, timeless.",
    image:
      "https://i.etsystatic.com/61635066/r/il/15bcaa/7553109646/il_794xN.7553109646_i5lk.jpg",
    etsy: "https://www.etsy.com/listing/4433133162",
    features: ["Animated Screens", "Alerts", "Panels", "Sub Badges"],
  },
  {
    slug: "matcha-dragon",
    name: "Matcha Dragon Animated Package",
    category: "dragon",
    price: "$24.00",
    description:
      "Soft green matcha vibes with a cute dragon — cozy meets fantasy.",
    image:
      "https://i.etsystatic.com/61635066/r/il/283dce/7971118785/il_794xN.7971118785_iw6c.jpg",
    etsy: "https://www.etsy.com/listing/4490240905",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
  {
    slug: "sakura-cat",
    name: "Sakura Cat Animated Stream Package",
    category: "cat",
    price: "$24.00",
    description:
      "Cherry blossom themed cat overlay — romantic, soft, and cozy.",
    image:
      "https://i.etsystatic.com/61635066/r/il/893484/7609041778/il_794xN.7609041778_oo5u.jpg",
    etsy: "https://www.etsy.com/listing/4443095417",
    features: ["Animated Screens", "Alerts", "Panels"],
  },
  {
    slug: "wolf-train-lofi",
    name: "Wolf Train Lofi Animated Pack",
    category: "japanese",
    price: "$24.00",
    description:
      "Sunset coffee train lofi wolf — cozy, warm, cinematic vibes.",
    image:
      "https://i.etsystatic.com/61635066/r/il/f04082/8010234087/il_794xN.8010234087_3v2u.jpg",
    etsy: "https://www.etsy.com/listing/4500984671",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
  {
    slug: "otter-forest-magic",
    name: "Otter Forest Magic Animated Package",
    category: "frog",
    price: "$24.00",
    description:
      "Adorable otter in a magical forest — playful and full of charm.",
    image:
      "https://i.etsystatic.com/61635066/r/il/b58b2c/7863397025/il_794xN.7863397025_b0kv.jpg",
    etsy: "https://www.etsy.com/listing/4480782954",
    features: ["Animated Screens", "Alerts", "Emotes"],
  },
  {
    slug: "dream-sakura",
    name: "Dream Sakura Animated Stream Package",
    category: "japanese",
    price: "$24.00",
    description:
      "Iconic falling sakura petals, warm pink tones — beautiful Japanese theme.",
    image:
      "https://i.etsystatic.com/61635066/r/il/9c4fac/7563052034/il_794xN.7563052034_p6la.jpg",
    etsy: "https://www.etsy.com/listing/4438531426",
    features: ["Animated Screens", "Alerts", "Panels", "Sub Badges"],
  },
  {
    slug: "midnight-cozy-cat",
    name: "Midnight Cozy Cat Animated Pack",
    category: "cat",
    price: "$24.00",
    description:
      "Gothic dark cat aesthetic — moody, mysterious, and totally cozy.",
    image:
      "https://i.etsystatic.com/61635066/r/il/f3bb2b/7580540193/il_794xN.7580540193_qr8u.jpg",
    etsy: "https://www.etsy.com/listing/4440435657",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
];

export interface PackFilter {
  id: PackCategory | "all";
  label: string;
}

export const PACK_FILTERS: PackFilter[] = [
  { id: "all", label: "All" },
  { id: "cat", label: "Cats" },
  { id: "dragon", label: "Dragons" },
  { id: "fox", label: "Foxes" },
  { id: "bear", label: "Bears & Pandas" },
  { id: "japanese", label: "Japanese" },
  { id: "frog", label: "Frogs & More" },
];

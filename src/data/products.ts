import type { Product } from "@/lib/types";

/**
 * Seed catalog — the 35 featured listings from the launch brief.
 * The full 127-listing catalog (with real per-listing Etsy URLs) drops in here:
 * keep the same shape and replace/extend PRODUCTS.
 *
 * `lemonSqueezyUrl` is a stub — replace per product once the Lemon Squeezy
 * store is created (Products → Share → copy hosted checkout link).
 */

export const STANDARD_INCLUDES = [
  "Starting Soon screen (animated MP4 + static PNG)",
  "Be Right Back screen (animated MP4 + static PNG)",
  "Stream Ending screen (animated MP4 + static PNG)",
  "Offline screen (animated MP4 + static PNG)",
  "Facecam / webcam frames",
  "In-game overlay",
  "Animated alerts (follow, sub, donation, raid)",
  "Info panels",
  "Bonus emotes",
] as const;

export const COMPATIBLE_WITH = [
  "OBS Studio",
  "Streamlabs",
  "Twitch",
  "YouTube",
  "Kick",
] as const;

const LEMONSQUEEZY_URL = "LEMONSQUEEZY_URL";
const ETSY_SHOP_FALLBACK = "https://www.etsy.com/shop/VectorKingStudio";

type Seed = Partial<Product> & Pick<Product, "id" | "slug" | "title" | "category" | "description" | "tags">;

function p(seed: Seed): Product {
  return {
    price: 20.5,
    salePrice: 5.12,
    currency: "USD",
    etsyUrl: ETSY_SHOP_FALLBACK,
    previewVideo: `/media/products/${seed.slug}/preview.mp4`,
    thumbnails: [
      `/media/products/${seed.slug}/thumb-1.jpg`,
      `/media/products/${seed.slug}/thumb-2.jpg`,
      `/media/products/${seed.slug}/thumb-3.jpg`,
      `/media/products/${seed.slug}/thumb-4.jpg`,
    ],
    includes: [...STANDARD_INCLUDES],
    compatibleWith: [...COMPATIBLE_WITH],
    featured: false,
    lemonSqueezyUrl: LEMONSQUEEZY_URL,
    ...seed,
  };
}

export const PRODUCTS: Product[] = [
  p({
    id: "oc-001",
    slug: "cozy-fox-overlay-animated-stream-package",
    title: "Cozy Fox Overlay Animated Stream Package",
    category: ["fox", "cozy"],
    description:
      "A firefly-lit autumn den for your channel — a fluffy-tailed fox curls through every screen while warm lantern light breathes behind your cam. The pack that makes viewers say 'this stream feels like a blanket.'",
    tags: ["fox overlay", "cozy twitch overlay", "animated stream package", "autumn"],
    featured: true,
    newDrop: true,
  }),
  p({
    id: "oc-002",
    slug: "sakura-dream-wolf-overlay",
    title: "Sakura Dream Wolf Overlay",
    category: ["wolf", "sakura"],
    etsyUrl: "https://www.etsy.com/listing/4472564937/sakura-dream-wolf-overlay-animated",
    etsyTitle: "Sakura Dream wolf Overlay Animated Stream Package: Twitch, YouTube, Kick | wolf Overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/2579e3/7870583753/il_fullxfull.7870583753_4jng.jpg"],
    description:
      "A moonlit wolf beneath endless falling cherry blossoms. Petals drift across your BRB, blossom light pulses with every alert — the signature Sakura Dream mood with wild teeth.",
    tags: [
      "Wolf Twitch Overlay",
      "Twitch Overlay Wolf",
      "Stream Overlay Wolf",
      "Sakura Overlay",
      "Sakura Twitch Overlay",
      "Wolf Overlay",
      "Wolf Stream Overlay",
      "Anime Twitch Overlay",
      "Cherry Blossom Overlay",
      "Wolf Twitch Pack",
      "Pink Twitch Overlay",
      "Stream Overlays",
      "Twitch Overlays",
    ],
    featured: true,
    newDrop: true,
  }),
  p({
    id: "oc-003",
    slug: "midnight-magic-cat-overlay",
    title: "Midnight Magic Cat Overlay",
    category: ["cat"],
    etsyUrl: "https://www.etsy.com/listing/4485199023/midnight-magic-cat-overlay-animated",
    etsyTitle: "Midnight Magic Cat Overlay Animated Stream Package: Twitch, YouTube, Kick | Gaming Setup Overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/7a1608/7938633069/il_fullxfull.7938633069_i8ny.jpg"],
    description:
      "A spellcasting midnight familiar with glowing eyes guards your stream. Arcane sparkles trace your webcam frame and every follower alert lands like a small enchantment.",
    tags: [
      "Cat Twitch Overlay",
      "Twitch Overlay Cat",
      "Stream Overlay Cat",
      "Magic Cat Overlay",
      "Cat Overlay",
      "Midnight Cat Twitch",
      "Cat Stream Overlay",
      "Cute Twitch Overlay",
      "Animated Stream Package",
      "Cat Twitch Pack",
      "Witchy Overlay",
      "Stream Overlays",
      "Twitch Overlays",
    ],
    featured: true,
  }),
  p({
    id: "oc-004",
    slug: "dark-gothic-raven-animated-stream-package",
    title: "Dark Gothic Raven Animated Stream Package",
    category: ["crow", "gothic"],
    etsyUrl: "https://www.etsy.com/listing/4469704695/dark-gothic-raven-animated-stream",
    etsyTitle: "Dark Gothic Raven Animated Stream Package: For Twitch Overlay, YouTube, Kick | Crow twitch overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/862919/7790377712/il_fullxfull.7790377712_59t8.jpg"],
    description:
      "The shop's all-time bestseller. A raven perched against a cathedral moon, feathers scattering through fog on every scene change. Deep violet gothic atmosphere that makes cam and gameplay pop from the dark.",
    tags: [
      "Raven Twitch Overlay",
      "Twitch Overlay Raven",
      "Stream Overlay Raven",
      "Crow Overlay",
      "Crow Twitch",
      "Raven Overlay",
      "Stream Overlay",
      "Twitch Overlay",
      "Twitch Overlays",
      "Stream Overlays",
      "Raven Twitch Pack",
      "Raven Twitch",
      "Skull Overlay",
    ],
    featured: true,
    bestseller: true,
  }),
  p({
    id: "oc-005",
    slug: "moonlight-raven-overlay",
    title: "Moonlight Raven Overlay",
    category: ["crow"],
    etsyUrl: "https://www.etsy.com/listing/4444846752/moonlight-raven-animated-stream-package",
    etsyTitle: "Moonlight Raven Animated Stream Package: For Twitch Overlay, YouTube, Kick, Facecam, Panels, Alerts, Stream Overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/11a231/7625844034/il_fullxfull.7625844034_uiih.jpg"],
    description:
      "The bestseller's silver sibling — a raven bathed in cold moonlight, mist rolling low across your screens. Quieter than the gothic original, twice as haunting.",
    tags: [
      "Raven Twitch Overlay",
      "Twitch Overlay Raven",
      "Stream Overlay Raven",
      "Moonlight Overlay",
      "Crow Overlay",
      "Crow Twitch",
      "Raven Overlay",
      "Stream Overlay",
      "Twitch Overlay",
      "Twitch Overlays",
      "Stream Overlays",
      "Raven Twitch Pack",
      "Silver Overlay",
    ],
  }),
  p({
    id: "oc-006",
    slug: "blue-gothic-raven-overlay",
    title: "Blue Gothic Raven Overlay",
    category: ["crow", "gothic"],
    description:
      "Abyssal-blue take on the gothic raven — glacial moon, ink-dark feathers, alerts that flash like lightning behind stained glass.",
    tags: ["blue overlay", "raven twitch overlay", "gothic stream package"],
  }),
  p({
    id: "oc-007",
    slug: "violet-night-dragon-overlay",
    title: "Violet Night Dragon Overlay",
    category: ["dragon"],
    description:
      "A dragon coiled through violet night skies — wings unfurl behind your starting-soon, embers drift across your offline art. The pack that turns a channel into a saga.",
    tags: ["dragon twitch overlay", "purple overlay", "fantasy stream package"],
    featured: true,
  }),
  p({
    id: "oc-008",
    slug: "crimson-dragon-overlay",
    title: "Crimson Dragon Overlay",
    category: ["dragon"],
    description:
      "Blood-red scales and furnace light. The Crimson Dragon pack burns slow across every screen state — built for ranked grinders and boss-fight energy.",
    tags: ["dragon overlay", "red stream package", "fantasy twitch overlay"],
  }),
  p({
    id: "oc-009",
    slug: "shadow-dragon-overlay",
    title: "Shadow Dragon Overlay",
    category: ["dragon"],
    description:
      "A dragon made of smoke and negative space. The darkest pack in the dragon line — shadows breathe, eyes glint, nothing else moves until your alerts strike.",
    tags: ["dragon twitch overlay", "dark overlay", "shadow stream package"],
  }),
  p({
    id: "oc-010",
    slug: "cozy-dragon-overlay",
    title: "Cozy Dragon Overlay",
    category: ["dragon", "cozy"],
    etsyUrl: "https://www.etsy.com/listing/4489189345/cozy-dragon-overlay-animated-stream",
    etsyTitle: "Cozy Dragon Overlay Animated Stream Package: Twitch, YouTube, Kick | Gaming Setup Overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/6aff0b/7916094460/il_fullxfull.7916094460_rgcs.jpg"],
    description:
      "A small dragon, a warm hearth, and a mug of something hot. Fantasy scale-and-ember craft turned down to fireplace temperature — cozy streams with a hoard.",
    tags: [
      "Dragon Twitch Overlay",
      "Twitch Overlay Dragon",
      "Stream Overlay Dragon",
      "Cozy Overlay",
      "Cozy Dragon Overlay",
      "Dragon Overlay",
      "Dragon Stream Overlay",
      "Cute Twitch Overlay",
      "Fantasy Twitch Overlay",
      "Cozy Stream Overlay",
      "Cozy Twitch Pack",
      "Stream Overlays",
      "Twitch Overlays",
    ],
  }),
  p({
    id: "oc-011",
    slug: "mystic-moonlight-dragon-overlay",
    title: "Mystic Moonlight Dragon Overlay",
    category: ["dragon", "gothic"],
    description:
      "Part of the Mystic Moonlight ritual line — a dragon circling a pale moon through arcane fog, runes glowing faintly in the dark corners of every screen.",
    tags: ["dragon overlay", "mystic stream package", "moonlight overlay"],
  }),
  p({
    id: "oc-012",
    slug: "dark-purple-animated-stream-package",
    title: "Dark Purple Animated Stream Package",
    category: ["stream"],
    description:
      "The essential dark-violet stream kit — clean, atmospheric, animal-free. Deep purple gradients and slow light sweeps that flatter any game and any cam.",
    tags: ["purple twitch overlay", "animated stream package", "minimal dark overlay"],
  }),
  p({
    id: "oc-013",
    slug: "red-moon-samurai-overlay",
    title: "Red Moon Samurai Overlay",
    category: ["japanese"],
    description:
      "A ronin silhouetted against a blood moon, ink-brush clouds crossing the sky. Cinematic Japanese atmosphere with katana-sharp alert animations.",
    tags: ["samurai twitch overlay", "japanese stream package", "red moon overlay"],
    featured: true,
  }),
  p({
    id: "oc-014",
    slug: "samurai-moon-overlay",
    title: "Samurai Moon Overlay",
    category: ["japanese"],
    description:
      "The quieter blade — a samurai beneath a silver moon, lantern light and drifting mist across every screen. Late-night JRPG energy in a complete package.",
    tags: ["samurai overlay", "japanese twitch overlay", "moon stream package"],
  }),
  p({
    id: "oc-015",
    slug: "red-moon-sakura-overlay",
    title: "Red Moon Sakura Overlay",
    category: ["sakura", "japanese"],
    description:
      "Cherry blossoms falling under a crimson moon — the Sakura Dream mood with a dramatic edge. Petals catch red light on every scene transition.",
    tags: ["sakura overlay", "red moon overlay", "japanese stream package"],
  }),
  p({
    id: "oc-016",
    slug: "magical-night-cat-overlay",
    title: "Magical Night Cat Overlay",
    category: ["cat"],
    description:
      "A whiskered mage under starfall. Constellations wheel slowly behind your cam while the cat's spellwork powers your alerts and transitions.",
    tags: ["cat overlay", "magic twitch overlay", "night stream package"],
  }),
  p({
    id: "oc-017",
    slug: "starry-wizard-cat-overlay",
    title: "Starry Wizard Cat Overlay",
    category: ["cat"],
    description:
      "A pointy-hatted wizard cat conducting the night sky. Shooting-star alerts, twinkling panels, and the most charming offline screen in the catalog.",
    tags: ["wizard cat overlay", "cute twitch overlay", "starry stream package"],
  }),
  p({
    id: "oc-018",
    slug: "midnight-blood-moon-magic-cat-overlay",
    title: "Midnight Blood & Moon Magic Cat Overlay",
    category: ["cat", "gothic"],
    description:
      "The cat line's dark ritual — blood-moon light, floating sigils, and a familiar whose eyes follow the scene changes. Cute has a gothic cousin.",
    tags: ["gothic cat overlay", "blood moon overlay", "dark cute stream package"],
  }),
  p({
    id: "oc-019",
    slug: "mystic-moonlight-snake-overlay",
    title: "Mystic Moonlight Snake Overlay",
    category: ["gothic"],
    etsyUrl: "https://www.etsy.com/listing/4510497649/mystic-moonlight-snake-overlay-animated",
    etsyTitle: "Mystic Moonlight Snake Overlay Animated Stream Package: For Twitch, YouTube, Kick | Gothic Snake overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/ad4d70/8055338664/il_fullxfull.8055338664_3kio.jpg"],
    description:
      "A serpent winding through moonlit fog and ritual candles. Slow, hypnotic loop design that makes viewers stop scrolling — the rarest animal in the shop.",
    tags: [
      "Snake Twitch Overlay",
      "Twitch Overlay Snake",
      "Stream Overlay Snake",
      "Gothic Overlay",
      "Snake Overlay",
      "Serpent Overlay",
      "Mystic Twitch Overlay",
      "Moonlight Overlay",
      "Dark Twitch Overlay",
      "Snake Twitch Pack",
      "Witchy Overlay",
      "Stream Overlays",
      "Twitch Overlays",
    ],
  }),
  p({
    id: "oc-020",
    slug: "mystic-moonlight-wolf-overlay",
    title: "Mystic Moonlight Wolf Overlay",
    category: ["wolf", "gothic"],
    etsyUrl: "https://www.etsy.com/listing/4496723571/mystic-moonlight-wolf-overlay-animated",
    etsyTitle: "Mystic Moonlight Wolf Overlay Animated Stream Package: For Twitch, YouTube, Kick | Gothic Wolf overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/f34436/8013511541/il_fullxfull.8013511541_pjwz.jpg"],
    description:
      "The Mystic Moonlight ritual meets the pack — a wolf haloed by a pale moon, arcane mist curling through every screen state.",
    tags: [
      "Wolf Twitch Overlay",
      "Twitch Overlay Wolf",
      "Stream Overlay Wolf",
      "Gothic Wolf Overlay",
      "Wolf Overlay",
      "Mystic Wolf Twitch",
      "Wolf Stream Overlay",
      "Moonlight Overlay",
      "Dark Twitch Overlay",
      "Wolf Twitch Pack",
      "Witchy Overlay",
      "Stream Overlays",
      "Twitch Overlays",
    ],
  }),
  p({
    id: "oc-021",
    slug: "mystic-moonlight-reaper-overlay",
    title: "Mystic Moonlight Reaper Overlay",
    category: ["gothic"],
    description:
      "The scythe at the end of the Mystic Moonlight line. A hooded reaper under cold light, lantern flame guttering with every alert. For horror nights and souls-like marathons.",
    tags: ["reaper overlay", "horror twitch overlay", "gothic stream package"],
  }),
  p({
    id: "oc-022",
    slug: "inferno-phoenix-overlay",
    title: "Inferno Phoenix Overlay",
    category: ["phoenix"],
    description:
      "Wings of ember and ash. The Inferno Phoenix rises behind your starting-soon and burns low through your BRB — comeback energy as a complete stream identity.",
    tags: ["phoenix twitch overlay", "fire stream package", "inferno overlay"],
    featured: true,
  }),
  p({
    id: "oc-023",
    slug: "blue-phoenix-overlay",
    title: "Blue Phoenix Overlay",
    category: ["phoenix"],
    description:
      "The rare cold-flame variant — a phoenix of glacial blue fire. Same rebirth drama, entirely different temperature.",
    tags: ["blue phoenix overlay", "fire twitch overlay", "stream package"],
  }),
  p({
    id: "oc-024",
    slug: "inferno-wolf-overlay",
    title: "Inferno Wolf Overlay",
    category: ["wolf"],
    description:
      "A wolf wreathed in ember-light, sparks lifting off its fur on every scene change. The pack's most aggressive cut — ranked-grind fuel.",
    tags: ["wolf overlay", "fire twitch overlay", "inferno stream package"],
  }),
  p({
    id: "oc-025",
    slug: "midnight-wolf-overlay",
    title: "Midnight Wolf Overlay",
    category: ["wolf"],
    description:
      "A lone silhouette against the deep-blue hour. Minimal, moody and clean — the wolf pack's most versatile package for any game genre.",
    tags: ["wolf twitch overlay", "midnight overlay", "dark stream package"],
  }),
  p({
    id: "oc-026",
    slug: "celestial-wolf-overlay",
    title: "Celestial Wolf Overlay",
    category: ["wolf"],
    description:
      "A wolf made of constellations — star-trails follow it across your screens and alerts land as meteor showers. The dreamiest cut in the wolf line.",
    tags: ["celestial overlay", "wolf stream package", "starry twitch overlay"],
  }),
  p({
    id: "oc-027",
    slug: "moonlight-wolf-overlay",
    title: "Moonlight Wolf Overlay",
    category: ["wolf"],
    description:
      "The classic — a wolf howling under a full silver moon, snow drifting through the dark. The package that defines the wolf shelf.",
    tags: ["wolf overlay", "moonlight twitch overlay", "snow stream package"],
  }),
  p({
    id: "oc-028",
    slug: "inferno-lion-overlay",
    title: "Inferno Lion Overlay",
    category: ["stream"],
    description:
      "A lion crowned in fire — mane of embers, throne-room presence. Regal heat for channels that lead from the front.",
    tags: ["lion twitch overlay", "fire stream package", "inferno overlay"],
  }),
  p({
    id: "oc-029",
    slug: "cozy-raccoon-overlay",
    title: "Cozy Raccoon Overlay",
    category: ["cozy"],
    description:
      "A raccoon in a sweater who has absolutely stolen your heart (and a cookie). Lamplight, rain on the window, and the coziest offline screen we've ever shipped.",
    tags: ["raccoon overlay", "cozy twitch overlay", "cute stream package"],
  }),
  p({
    id: "oc-030",
    slug: "cozy-panda-overlay",
    title: "Cozy Panda Overlay",
    category: ["panda", "cozy"],
    description:
      "Bamboo, lamplight and a sleepy panda mascot. Gentle snack-time alerts and soft loops that make chat settle in for the whole stream.",
    tags: ["panda twitch overlay", "cozy stream package", "cute overlay"],
  }),
  p({
    id: "oc-031",
    slug: "sakura-dream-panda-overlay",
    title: "Sakura Dream Panda Overlay",
    category: ["panda", "sakura"],
    description:
      "The Sakura Dream mood with its softest resident — a panda dozing under falling blossoms. Blossom-pink on midnight violet, animated with deliberate calm.",
    tags: ["panda overlay", "sakura stream package", "kawaii twitch overlay"],
    featured: true,
  }),
  p({
    id: "oc-032",
    slug: "crimson-bloom-butterfly-overlay",
    title: "Crimson Bloom Butterfly Overlay",
    category: ["stream"],
    price: 17.0,
    salePrice: 4.25,
    description:
      "Crimson butterflies scattering from blooming night flowers — an elegant, painterly package for art streams and just-chatting channels.",
    tags: ["butterfly overlay", "elegant twitch overlay", "crimson stream package"],
  }),
  p({
    id: "oc-033",
    slug: "mystic-night-tiktok-overlay-package",
    title: "Mystic Night TikTok Overlay Package",
    category: ["tiktok"],
    price: 17.09,
    salePrice: 4.27,
    description:
      "Composed for the vertical stage — mystic night scenes, frames and alert badges positioned so nothing fights TikTok Live's chat column. Mobile-first motion, atelier-grade craft.",
    tags: ["tiktok live overlay", "vertical stream package", "mobile overlay"],
  }),
  p({
    id: "oc-034",
    slug: "halloween-animated-stream-package",
    title: "Halloween Animated Stream Package",
    category: ["seasonal"],
    price: 16.09,
    salePrice: 4.02,
    description:
      "Jack-o'-lantern glow, bats across a harvest moon and alerts that cackle. Run it for spooky month, keep it forever.",
    tags: ["halloween twitch overlay", "seasonal stream package", "spooky overlay"],
  }),
  p({
    id: "oc-036",
    slug: "mystic-moonlight-dog-overlay",
    title: "Mystic Moonlight Dog Overlay",
    category: ["gothic"],
    etsyUrl: "https://www.etsy.com/listing/4496797837/mystic-moonlight-dog-overlay-animated",
    etsyTitle: "Mystic Moonlight Dog Overlay Animated Stream Package: For Twitch, YouTube, Kick | Gothic Dog overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/1b30fa/8014033929/il_fullxfull.8014033929_lqpd.jpg"],
    description:
      "The most loyal member of the Mystic Moonlight line — a spectral hound under a pale moon, arcane mist trailing every scene change. Good boy; great overlay.",
    tags: [
      "Dog Twitch Overlay",
      "Twitch Overlay Dog",
      "Stream Overlay Dog",
      "Gothic Dog Overlay",
      "Dog Overlay",
      "Mystic Dog Twitch",
      "Dog Stream Overlay",
      "Moonlight Overlay",
      "Dark Twitch Overlay",
      "Dog Twitch Pack",
      "Witchy Overlay",
      "Stream Overlays",
      "Twitch Overlays",
    ],
    newDrop: true,
  }),
  p({
    id: "oc-037",
    slug: "cozy-wolf-overlay",
    title: "Cozy Wolf Overlay",
    category: ["wolf", "cozy"],
    etsyUrl: "https://www.etsy.com/listing/4491744993/cozy-wolf-overlay-animated-stream",
    etsyTitle: "Cozy Wolf Overlay Animated Stream Package: Twitch, YouTube, Kick | wolf Overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/9eadec/7980905087/il_fullxfull.7980905087_93y6.jpg"],
    description:
      "The pack's softest side — a wolf curled by lantern light, snow falling gently past the window of every screen. Wild heart, warm den.",
    tags: [
      "Wolf Twitch Overlay",
      "Twitch Overlay Wolf",
      "Stream Overlay Wolf",
      "Cozy Overlay",
      "Cozy Wolf Overlay",
      "Wolf Overlay",
      "Wolf Stream Overlay",
      "Cute Twitch Overlay",
      "Cozy Stream Overlay",
      "Wolf Twitch Pack",
      "Cozy Twitch Pack",
      "Stream Overlays",
      "Twitch Overlays",
    ],
    newDrop: true,
  }),
  p({
    id: "oc-038",
    slug: "red-animated-stream-package",
    title: "Red Animated Stream Package",
    category: ["stream"],
    etsyUrl: "https://www.etsy.com/listing/4365728007/red-animated-stream-package-for-twitch",
    etsyTitle: "Red Animated Stream Package: For Twitch Overlay, YouTube, Kick, Facecam, Panels, Alerts, Stream Overlays by VectorKingStudio",
    thumbnails: ["https://i.etsystatic.com/23257274/r/il/889c2a/7180409732/il_fullxfull.7180409732_hkkh.jpg"],
    description:
      "A clean, aggressive crimson kit — facecam, panels, alerts and every screen state in one matched red-on-black identity. No mascot, all intensity.",
    tags: [
      "Red Twitch Overlay",
      "Twitch Overlay Red",
      "Stream Overlay Red",
      "Animated Stream Package",
      "Red Overlay",
      "Facecam Overlay",
      "Twitch Panels",
      "Twitch Alerts",
      "Stream Overlay",
      "Twitch Overlay",
      "Twitch Overlays",
      "Stream Overlays",
      "Minimal Twitch Overlay",
    ],
  }),
  p({
    id: "oc-035",
    slug: "custom-twitch-overlay-full-stream-package",
    title: "Custom Twitch Overlay | Full Stream Package",
    category: ["custom"],
    price: 400,
    salePrice: 100,
    customCommission: true,
    description:
      "A one-of-one stream identity forged to your brief — custom scenes, animated screens, alerts, panels, transitions, and at full tier your own emotes, sub badges and mascot logo. Brief → concept → two revision rounds → delivery.",
    tags: ["custom twitch overlay", "commission", "full stream brand"],
    featured: true,
    includes: [
      "Custom art direction from your brief",
      "All animated screens (Starting Soon, BRB, Ending, Offline)",
      "Custom facecam frames & game overlay",
      "Animated alerts & transitions",
      "Panels & banners",
      "Full Brand tier: emotes, sub badges, mascot logo",
      "Two revision rounds included",
    ],
  }),
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "latest-drops") {
    return PRODUCTS.filter((p) => p.newDrop || p.featured).slice(0, 12);
  }
  return PRODUCTS.filter((p) => p.category.includes(categorySlug));
}

export function relatedProducts(product: Product, count = 4): Product[] {
  const same = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category.some((c) => product.category.includes(c))
  );
  const fill = PRODUCTS.filter((p) => p.slug !== product.slug && !same.includes(p));
  return [...same, ...fill].slice(0, count);
}

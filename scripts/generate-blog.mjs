/**
 * Generates src/data/blog-generated.ts — ~100 SEO blog posts across real
 * keyword clusters for the stream-overlay niche. Each post has a unique H1,
 * meta title/description, keyword-rich sections, an FAQ (FAQPage schema),
 * internal links, and real shoppable pack cards.
 *
 * Usage: node scripts/generate-blog.mjs
 * The 6 hand-written posts in blog.ts stay separate and are merged at import.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const CAT = JSON.parse(readFileSync(join(here, "cat-slugs.json"), "utf8"));

// Slugs already used by hand-written posts — never collide with them.
const RESERVED = new Set([
  "how-to-add-overlay-to-obs",
  "twitch-overlay-size-guide",
  "animated-vs-static-stream-overlays",
  "kick-stream-overlay-guide",
  "vtuber-overlay-guide",
  "what-is-a-twitch-overlay",
]);

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const packs = (cat, n = 4) => (CAT[cat] || CAT.stream || []).slice(0, n);

// Spread publish dates backward from a base so the archive looks natural.
let dateCursor = new Date("2026-08-20T00:00:00Z").getTime();
function nextDate() {
  const d = new Date(dateCursor).toISOString().slice(0, 10);
  dateCursor -= (1 + Math.floor(Math.random() * 2)) * 86400000;
  return d;
}

const posts = [];
const used = new Set(RESERVED);
function add(post) {
  if (used.has(post.slug)) return;
  used.add(post.slug);
  posts.push({ date: nextDate(), videos: undefined, ...post });
}

/* ─────────────────────────────────────────────────────────────────────────
   CLUSTER A — Theme / animal overlay guides
   ───────────────────────────────────────────────────────────────────────── */
const THEMES = [
  ["Raven", "crow", "gothic ink-black feathers, cathedral moons and drifting fog", "horror, souls-like and dark-fantasy streamers", "a raven that scatters feathers on every scene change", "raven twitch overlay"],
  ["Wolf", "wolf", "moonlit silhouettes, drifting snow and howling-at-the-moon energy", "variety streamers and night-owl communities", "a wolf howling under a full silver moon", "wolf twitch overlay"],
  ["Dragon", "dragon", "unfurling wings, ember and scale, saga-scale atmosphere", "fantasy RPG and lore-heavy channels", "wings that unfurl behind your Starting Soon", "dragon twitch overlay"],
  ["Cat", "cat", "magical familiars, starfall and cozy midnight glow", "cozy, chatting and VTuber channels", "a spellcasting familiar with glowing eyes", "cat twitch overlay"],
  ["Fox", "fox", "firefly light, autumn palettes and fluffy-tailed charm", "cozy and variety streamers", "a fox curled in firefly-lit den", "fox twitch overlay"],
  ["Panda", "panda", "bamboo greens, blossom pinks and sleepy-eyed comfort", "cozy gaming and just-chatting channels", "a sleepy panda under lamplight", "panda twitch overlay"],
  ["Phoenix", "phoenix", "slow-burning fire, ember feathers and comeback energy", "ranked grinders and competitive players", "wings of ember rising behind your screen", "phoenix twitch overlay"],
  ["Sakura", "sakura", "cherry blossoms in perpetual fall over midnight violet", "anime, cozy and midnight streamers", "petals that drift across every transition", "sakura twitch overlay"],
  ["Samurai", "japanese", "blood-red moons, ronin silhouettes and ink-brush skies", "anime, JRPG and fighting-game channels", "a ronin under a blood moon", "samurai twitch overlay"],
  ["Cozy", "cozy", "warm lamplight, rain on the window and lived-in scenes", "chatting, art and cozy-gaming streamers", "rain on the window and a mug of something hot", "cozy twitch overlay"],
  ["Kawaii", "cat", "pastel pinks, soft sparkles and adorable mascots", "VTubers and cute-aesthetic channels", "pastel sparkles that trail your alerts", "kawaii twitch overlay"],
  ["Gothic", "gothic", "candlelight, breathing shadows and cathedral darkness", "horror and late-night talk channels", "candle flame that gutters on every alert", "gothic twitch overlay"],
  ["Anime", "anime", "bold linework, dramatic lighting and opening-sequence drama", "anime fans and VTubers", "expressive motion tuned to your model", "anime twitch overlay"],
  ["Butterfly", "stream", "crimson blooms, scattering wings and painterly elegance", "art streams and just-chatting channels", "crimson butterflies scattering from night flowers", "butterfly twitch overlay"],
  ["Cyberpunk", "stream", "neon rain, glitching signage and midnight cityscapes", "FPS, cyberpunk and night streamers", "neon rain over a midnight alley", "cyberpunk twitch overlay"],
  ["Halloween", "seasonal", "jack-o'-lantern glow, drifting fog and harvest moons", "spooky-season and horror streamers", "bats crossing a harvest moon", "halloween twitch overlay"],
];

for (const [name, cat, aesthetic, suits, signature, kw] of THEMES) {
  const lower = name.toLowerCase();
  add({
    slug: slugify(`best ${name} twitch overlays`),
    title: `Best ${name} Twitch Overlays: A Streamer's Guide`,
    metaTitle: `Best ${name} Twitch Overlays (2026) - Animated & Ready`,
    metaDescription: `Looking for a ${lower} Twitch overlay? Here's what makes a great ${lower} stream package, who it suits, and animated ${lower} overlays ready to drop into OBS.`,
    keywords: [kw, `${lower} overlay`, `${lower} stream overlay`, `animated ${lower} overlay`, `${lower} stream package`, "twitch overlay"],
    excerpt: `${aesthetic.charAt(0).toUpperCase() + aesthetic.slice(1)} - here's how to choose a ${lower} overlay that fits your channel, and animated ${lower} packs ready to go live.`,
    sections: [
      {
        h2: `What makes a great ${lower} overlay`,
        paragraphs: [
          `A ${lower} overlay lives or dies on atmosphere. The best ones lean into ${aesthetic} instead of slapping a ${lower} sticker on a generic template. When it's done right, every screen - Starting Soon, BRB, Ending, Offline - feels like it belongs to the same world, and ${signature} sells the whole thing.`,
          `Motion matters more than most people expect. A frozen ${lower} image says "nothing is happening here"; a slow, deliberate loop says "the stream is alive, stay put." That's why the [${name} collection](/overlays/${cat}) ships every screen animated, with matching webcam frames, alerts and panels.`,
        ],
      },
      {
        h2: `Who ${lower} overlays suit`,
        paragraphs: [
          `${name} overlays are a natural fit for ${suits}. If your content and your visuals agree, a new viewer reads your channel as intentional within the first few seconds - and that's the window where they decide whether to stay.`,
        ],
        list: [
          `Matches the mood of your content, not just a color you like`,
          `Reads clearly at small sizes on mobile, where most discovery happens`,
          `Leaves room for the Twitch UI (chat, controls) so nothing important gets covered`,
        ],
      },
      {
        h2: `What's inside a ${lower} stream package`,
        paragraphs: [
          `A complete ${lower} pack is more than a background. Expect animated Starting Soon, Be Right Back, Stream Ending and Offline screens, a webcam frame, an in-game overlay, animated alerts for follows, subs and raids, and info panels - all in one matched art style. That consistency is what separates a "channel" from a "stream with a picture behind it."`,
        ],
      },
      {
        h2: `Setting up your ${lower} overlay in OBS`,
        paragraphs: [
          `Setup takes minutes. Drop each animated screen into OBS as a Media Source with Loop enabled, add your webcam frame as an Image source above the camera, and upload the alerts to your alert tool. Our full walkthrough covers every click: [how to add an overlay to OBS](/blog/how-to-add-overlay-to-obs).`,
        ],
      },
    ],
    faq: [
      { question: `What is a ${lower} Twitch overlay?`, answer: `It's a matched set of stream graphics in a ${lower} theme - Starting Soon, BRB, Ending and Offline screens plus a webcam frame, alerts and panels - that gives your whole channel one coherent ${lower} look.` },
      { question: `Do ${lower} overlays work on YouTube and Kick?`, answer: `Yes. Overlays render in OBS before the video reaches any platform, so the same 1920x1080 files work on Twitch, YouTube, Kick and TikTok Live.` },
      { question: `Are these ${lower} overlays animated?`, answer: `Every ${lower} pack ships animated screens as looping video files, plus static PNG versions for tools that need them. You can preview the motion on each product page before buying.` },
    ],
    featuredPacks: packs(cat),
    related: [
      { label: `Browse ${name} packs`, href: `/overlays/${cat}` },
      { label: "How to add an overlay to OBS", href: "/blog/how-to-add-overlay-to-obs" },
      { label: "Twitch overlay size guide", href: "/blog/twitch-overlay-size-guide" },
    ],
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   CLUSTER B — Game / genre overlay guides
   ───────────────────────────────────────────────────────────────────────── */
const GAMES = [
  ["Minecraft", "cozy", "cozy and creative", "keep the HUD clear so builds and redstone stay readable"],
  ["Valorant", "stream", "competitive FPS", "leave the minimap and killfeed corners uncovered"],
  ["Fortnite", "stream", "fast-paced battle royale", "keep the bottom-right storm timer and inventory visible"],
  ["League of Legends", "dragon", "MOBA and ranked", "leave the minimap and shop corner clear at all times"],
  ["Just Chatting", "cozy", "chatting and IRL", "make the webcam frame the hero and give chat room to breathe"],
  ["Stardew Valley", "cozy", "cozy farming", "a warm, low-motion overlay that matches the pace of the game"],
  ["Horror games", "gothic", "horror and scary games", "a dark, atmospheric frame that heightens the tension"],
  ["Cozy games", "cozy", "cozy and wholesome", "soft palettes and gentle motion that keep the vibe calm"],
  ["Retro games", "stream", "retro and pixel", "a synthwave or pixel-friendly frame that suits the era"],
  ["IRL streams", "cozy", "IRL and outdoors", "a mobile-friendly overlay that survives a vertical or moving shot"],
  ["Roblox", "cat", "Roblox and family-friendly", "a bright, playful overlay that fits a younger audience"],
  ["Apex Legends", "phoenix", "battle royale FPS", "keep the squad UI and minimap corners clear"],
  ["VRChat", "anime", "social VR", "an expressive, avatar-friendly overlay for a moving camera"],
  ["Elden Ring", "dragon", "souls-like and dark fantasy", "a gothic, lore-heavy frame that matches the world"],
];

for (const [game, cat, genre, tip] of GAMES) {
  add({
    slug: slugify(`best stream overlays for ${game}`),
    title: `The Best Stream Overlays for ${game} Streamers`,
    metaTitle: `Best ${game} Stream Overlays (2026) - OBS Ready`,
    metaDescription: `The best animated stream overlays for ${game}: which aesthetics fit, how to lay out your HUD, and packs that keep your ${genre} gameplay clear.`,
    keywords: [`${game.toLowerCase()} overlay`, `${game.toLowerCase()} stream overlay`, `best overlays for ${game.toLowerCase()}`, "twitch overlay", "stream package"],
    excerpt: `Streaming ${game}? Here's how to pick an overlay that frames your gameplay instead of burying it - and packs that keep the important corners clear.`,
    sections: [
      {
        h2: `What ${game} streamers need from an overlay`,
        paragraphs: [
          `${game} is a ${genre} game, and that shapes what your overlay has to do. The golden rule: ${tip}. A great overlay frames the action and celebrates your big moments (with alerts) without ever covering information you need on screen.`,
          `Because gameplay is the star here, keep in-game motion subtle and save the heavy animation for the waiting screens - Starting Soon, BRB and your raid landing. Browse [animated overlay packs](/overlays) and picture your ${game} footage inside each frame.`,
        ],
      },
      {
        h2: `Aesthetics that suit ${game}`,
        paragraphs: [
          `The best-matched overlays echo the feel of the game. For ${game}, a [${cat} theme](/overlays/${cat}) tends to land well - it complements the on-screen palette instead of fighting it. That said, the strongest choice is one that matches your personality, not just the game; your channel should feel like a place, not a skin.`,
        ],
      },
      {
        h2: `Laying out your ${game} scene`,
        list: [
          `Webcam frame in a corner that doesn't cover ${game}'s key UI`,
          `Alerts anchored where they won't block gameplay when they fire`,
          `In-game overlay elements kept thin and low-contrast so the game reads first`,
          `A separate, fully-animated Starting Soon and BRB for the waiting moments`,
        ],
      },
      {
        h2: `Does an overlay hurt ${game} performance?`,
        paragraphs: [
          `Not meaningfully. A looping media source is one of the cheapest things OBS renders - far lighter than a browser source. If your PC runs ${game} plus OBS today, an animated overlay won't be the thing that drops your frames. For the full breakdown see [animated vs static overlays](/blog/animated-vs-static-stream-overlays).`,
        ],
      },
    ],
    faq: [
      { question: `What overlay is best for ${game}?`, answer: `One that keeps ${game}'s on-screen information clear and matches the game's mood. A ${cat}-style animated pack works well for most ${game} channels.` },
      { question: `Will an overlay cover my ${game} gameplay?`, answer: `A well-designed overlay frames the action and leaves the important corners clear. In OBS you can reposition any element so nothing you need is hidden.` },
      { question: `Do I need a different overlay for each game?`, answer: `No. One good 1920x1080 pack works across every game - just reposition elements per title so the HUD stays readable.` },
    ],
    featuredPacks: packs(cat),
    related: [
      { label: "Browse all overlay packs", href: "/overlays" },
      { label: `${cat.charAt(0).toUpperCase() + cat.slice(1)} overlays`, href: `/overlays/${cat}` },
      { label: "Twitch overlay size guide", href: "/blog/twitch-overlay-size-guide" },
    ],
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   CLUSTER C — How-to setup guides
   ───────────────────────────────────────────────────────────────────────── */
const HOWTOS = [
  ["Add Alerts to Your Stream", "add-alerts-to-your-stream", "add follow, sub and donation alerts", ["Create your alerts in an alert tool (StreamElements, Streamlabs or similar) and copy the browser-source URL.", "In OBS, add a Browser Source and paste that URL.", "Size and position it where it won't cover gameplay.", "Trigger a test alert from your dashboard to confirm it fires."], "Match your alert art to your overlay so every follow feels on-brand."],
  ["Add a Webcam Frame in OBS", "add-a-webcam-frame-in-obs", "frame your facecam", ["Add your camera as a Video Capture Device source.", "Add your frame (PNG) as an Image source above the camera in the list.", "Resize the camera to sit inside the frame's cutout.", "Group them so they move together."], "Pick a frame that matches your camera's aspect ratio, not the canvas."],
  ["Make a Starting Soon Screen", "make-a-starting-soon-screen", "build a Starting Soon screen", ["Create a dedicated Starting Soon scene in OBS.", "Add your animated Starting Soon file as a looping Media Source.", "Add a countdown timer and your socials on top.", "Switch to it a few minutes before you go live."], "This screen is seen by your earliest, most loyal viewers - make it animated."],
  ["Add Chat to Your Stream", "add-chat-to-your-stream", "put chat on screen", ["Get a chat-box browser URL from your alert tool or a chat widget.", "Add it as a Browser Source in OBS.", "Style it to match your overlay's fonts and colors.", "Position it where it won't cover gameplay."], "A styled chat box that matches your overlay looks far more professional than the default."],
  ["Set Up Scene Transitions", "set-up-scene-transitions", "add stinger transitions", ["In OBS, open Scene Transitions and add a Stinger.", "Point it at your transition video file.", "Set the transition point (when the scene swaps behind the animation).", "Test by switching scenes."], "A matching stinger between scenes is the fastest way to look like a bigger channel."],
  ["Add Panels to Your Twitch Channel", "add-panels-to-your-twitch-channel", "add channel panels", ["Turn on Edit Panels below your Twitch player.", "Upload each 320px-wide panel image.", "Add a title, description and link to each.", "Reorder them by dragging."], "A matched set - About, Schedule, Rules, Donate - is the first thing new viewers scroll."],
  ["Add a Countdown Timer", "add-a-countdown-timer", "add a countdown timer", ["Use a countdown widget from your alert tool or a free timer site.", "Add it as a Browser Source in OBS.", "Place it on your Starting Soon or BRB scene.", "Set the target time before you go live."], "Pair it with an animated Starting Soon screen so the wait feels intentional."],
  ["Make an Offline Banner", "make-an-offline-banner", "create an offline banner", ["Design or grab a 1920x1080 offline image or video.", "In Twitch, go to Settings and set your Video Player Banner.", "Point viewers to your schedule and socials on it.", "Keep it on-brand with your live overlay."], "Your offline banner is your channel's storefront 24/7 - don't leave it blank."],
  ["Add a Donation Goal", "add-a-donation-goal", "show a donation or sub goal", ["Create a goal widget in your alert tool.", "Copy its browser-source URL.", "Add it as a Browser Source in OBS.", "Style it to match your overlay."], "Goals give viewers a reason to contribute - keep them visible but not covering gameplay."],
  ["Reduce Dropped Frames in OBS", "reduce-dropped-frames-in-obs", "fix dropped frames", ["Check your upload speed and lower your bitrate if it's too high.", "Switch to a hardware encoder (NVENC / AMD) if available.", "Close bandwidth-hungry apps in the background.", "Use a wired connection instead of Wi-Fi."], "Dropped frames are almost always network, not your overlay - a looping video source is light."],
  ["Set Your OBS Bitrate and Encoder", "set-your-obs-bitrate-and-encoder", "choose bitrate and encoder", ["In Settings > Output, pick your encoder (NVENC for Nvidia, AMD, or x264).", "Set a bitrate your upload can sustain (commonly 3500-6000 kbps).", "Match output resolution to your canvas or downscale to 936p.", "Test with a short private stream."], "Design overlays at 1920x1080 even if you stream at 936p - OBS downscales cleanly."],
  ["Brand Your Twitch Channel", "brand-your-twitch-channel", "brand your channel", ["Pick one aesthetic and apply it everywhere - overlay, panels, emotes, offline banner.", "Use the same handle across Twitch, YouTube, TikTok and X.", "Keep fonts and colors consistent across every graphic.", "Add a matched emote and sub badge set."], "Consistency is what turns a stream into a brand viewers recognize."],
  ["Add a Now Playing Music Widget", "add-a-now-playing-music-widget", "show what's playing", ["Use a Now Playing widget from your alert tool or a free service.", "Add its browser-source URL to OBS.", "Style it to match your overlay.", "Make sure your music is stream-safe."], "Only stream copyright-safe music - a Now Playing widget won't save you from a DMCA strike."],
  ["Set Up Sub Badges on Twitch", "set-up-sub-badges-on-twitch", "upload sub badges", ["In Creator Dashboard, go to Affiliate/Partner > Subscriptions > Sub Badges.", "Upload 72x72, 36x36 and 18x18 PNGs for each tier.", "Save and wait for approval.", "Check them at small size in chat."], "Design badges bold and simple so they read at 18px. Use our free resizer to export every size."],
  ["Upload Emotes to Twitch", "upload-emotes-to-twitch", "add channel emotes", ["Go to Creator Dashboard > Affiliate/Partner > Emotes.", "Upload 112x112 PNGs (Twitch generates the smaller sizes).", "Name each emote with your channel prefix.", "Submit and wait for review."], "Test every emote at 28px before uploading - detail disappears at thumbnail size."],
  ["Go Live for the First Time", "go-live-for-the-first-time-checklist", "prepare for your first stream", ["Set up your scenes: Starting Soon, main, BRB, Ending.", "Test audio levels and your alerts.", "Write a clear stream title and pick the right category.", "Go live, and treat an empty chat like a full one."], "Your first stream won't be perfect - having a real overlay makes it look like you mean it."],
  ["Set Up Streamlabs Alerts", "set-up-streamlabs-alerts", "configure Streamlabs alerts", ["Open your Streamlabs Alert Box and copy its URL.", "Add it as a Browser Source in OBS.", "Upload your custom alert animations per event.", "Send a test alert to confirm."], "Custom alert art that matches your overlay is the detail that sells the whole look."],
  ["Add Sub and Follower Goals", "add-sub-and-follower-goals", "show goals on stream", ["Create follower/sub goal widgets in your alert tool.", "Add each as a Browser Source in OBS.", "Place them on your overlay where they're visible but unobtrusive.", "Reset them per stream or per month."], "A visible goal turns passive viewers into participants."],
  ["Green Screen Without a Green Screen", "green-screen-without-a-green-screen", "remove your background without a green screen", ["Use OBS's Background Removal filter (or the NVIDIA/AI plugin) on your camera.", "Tune the threshold so your edges stay clean.", "Place your keyed camera inside a webcam frame.", "Test against your busiest scene."], "AI background removal keeps hair edges better than a badly-lit green screen."],
  ["Stream to Multiple Platforms at Once", "stream-to-multiple-platforms-at-once", "multistream to several platforms", ["Use a restream service or OBS multi-output.", "Add each platform's stream key.", "Keep one 1920x1080 overlay - it works everywhere.", "Watch each platform's chat with a combined chat tool."], "You don't need a different overlay per platform - one good pack covers Twitch, YouTube and Kick."],
  ["Set Up a BRB Screen", "set-up-a-brb-screen", "make a Be Right Back screen", ["Create a BRB scene in OBS.", "Add your animated BRB file as a looping Media Source.", "Keep your music or a low ambient loop running.", "Switch to it whenever you step away."], "An animated BRB keeps viewers company during breaks - a frozen image makes them leave."],
  ["Add a Stream Deck to Your Setup", "add-a-stream-deck-to-your-workflow", "use a Stream Deck with your overlay", ["Assign each OBS scene to a Stream Deck key.", "Add keys for muting, alerts and starting your timer.", "Label keys with icons that match your brand.", "Practice your scene switches before going live."], "A Stream Deck makes scene switches instant - which makes your overlay feel seamless."],
];

for (const [task, slug, verb, steps, tip] of HOWTOS) {
  add({
    slug,
    title: `How to ${task} (Step-by-Step)`,
    metaTitle: `How to ${task} - Easy 2026 Guide`,
    metaDescription: `How to ${verb} step by step, in plain language. Follow along and ${verb} in minutes - no design skills needed.`,
    keywords: [`how to ${verb}`, task.toLowerCase(), "obs setup", "twitch", "stream setup"],
    excerpt: `A plain-language, step-by-step guide to ${verb} - follow along and you'll be done in a few minutes.`,
    sections: [
      {
        h2: "The quick answer",
        paragraphs: [
          `To ${verb}: ${steps[0].replace(/\.$/, "")}, then work through the steps below. The whole thing takes a few minutes and needs no design software - if you can drag a file into OBS, you can do this.`,
        ],
      },
      {
        h2: "Step-by-step",
        ordered: true,
        list: steps,
      },
      {
        h2: "Make it match your brand",
        paragraphs: [
          `${tip} A stream reads as professional when every piece agrees - the same fonts, the same palette, the same mood. If you're building your look from scratch, a complete [animated overlay pack](/overlays) gives you matching screens, frames, alerts and panels in one download.`,
        ],
      },
    ],
    faq: [
      { question: `Do I need to be able to design to ${verb}?`, answer: `No. This is a drag-and-drop process in OBS or your alert tool. Ready-made packs give you the art; you just place it.` },
      { question: `Does this work in Streamlabs too?`, answer: `Yes. Streamlabs Desktop uses the same source system as OBS, so the steps are nearly identical.` },
      { question: `Will this slow down my stream?`, answer: `No. Overlay elements and looping video sources are light. If your PC streams your game today, this won't change that.` },
    ],
    featuredPacks: packs("cozy"),
    related: [
      { label: "How to add an overlay to OBS", href: "/blog/how-to-add-overlay-to-obs" },
      { label: "Browse overlay packs", href: "/overlays" },
      { label: "Free emote & badge resizer", href: "/free-tools/emote-resizer" },
    ],
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   CLUSTER D — Platform guides & comparisons
   ───────────────────────────────────────────────────────────────────────── */
const PLATFORMS = [
  ["YouTube", "youtube-live-overlay-setup", "YouTube Live overlay setup", "YouTube Live uses the same 16:9 player as Twitch, so your 1920x1080 overlay works without changes. Set your overlay in OBS, point OBS at YouTube via stream key, and you're live.", ["youtube overlay", "youtube live overlay", "youtube stream overlay"]],
  ["Kick", "kick-overlay-setup-guide-2026", "Kick overlay setup", "Kick receives whatever OBS outputs, exactly like Twitch. The same 1920x1080 pack works - the differences are alerts (third-party tools) and where the mobile chat sits.", ["kick overlay", "kick stream overlay", "kick overlay setup"]],
  ["TikTok Live", "tiktok-live-overlay-setup", "TikTok Live overlay setup", "TikTok Live is vertical (9:16), so a desktop 16:9 overlay gets cropped. Use a purpose-built vertical pack and position elements clear of the chat column and interface.", ["tiktok live overlay", "tiktok overlay setup", "vertical stream overlay"]],
];

for (const [plat, slug, label, intro, kws] of PLATFORMS) {
  const cat = plat === "TikTok Live" ? "tiktok" : "stream";
  add({
    slug,
    title: `${label.replace(/ setup$/, "")}: Full Setup Guide`,
    metaTitle: `${label} - Step-by-Step (2026)`,
    metaDescription: `${label} made simple: get your overlay into OBS, stream to ${plat}, and keep your graphics clear of the ${plat} interface.`,
    keywords: [...kws, "obs setup", "stream overlay"],
    excerpt: `Everything you need to get your overlay live on ${plat} - setup, quirks, and how the platform differs from Twitch.`,
    sections: [
      { h2: `Getting your overlay onto ${plat}`, paragraphs: [intro, `Whatever platform you stream to, the overlay itself lives in OBS. Browse [animated packs](/overlays) and pick a world that fits your channel - the file works the same everywhere.`] },
      { h2: `What's different on ${plat}`, list: [
        plat === "TikTok Live" ? "Vertical 9:16 framing - use a vertical pack, not a cropped desktop one" : `${plat}'s player is 16:9, identical to Twitch's canvas`,
        plat === "Kick" ? "Alerts run through third-party tools that give you a browser-source URL" : "Alerts plug in the same way via your alert tool",
        "Chat overlaps different parts of the screen on mobile - preview before you commit",
      ] },
      { h2: `Do you need a ${plat}-specific overlay?`, paragraphs: [
        plat === "TikTok Live"
          ? `Yes - vertical is a genuinely different canvas, so grab a [TikTok overlay pack](/overlays/tiktok) built for 9:16.`
          : `No. Be suspicious of anyone selling a "${plat}-only" version of the same files. One 1920x1080 pack covers Twitch, YouTube and ${plat} - buy once, stream anywhere.`,
      ] },
    ],
    faq: [
      { question: `Do Twitch overlays work on ${plat}?`, answer: plat === "TikTok Live" ? `Not directly - TikTok Live is vertical, so use a 9:16 pack. Desktop 16:9 overlays get cropped.` : `Yes, without modification. Overlays render in OBS before the video reaches ${plat}, so the same files work.` },
      { question: `What size should a ${plat} overlay be?`, answer: plat === "TikTok Live" ? `1080x1920 (vertical 9:16).` : `1920x1080, 16:9 - the same as Twitch.` },
      { question: `How do alerts work on ${plat}?`, answer: `Through an alert tool that gives you a browser-source URL for OBS. Your pack's alert files plug into it the same way as on Twitch.` },
    ],
    featuredPacks: packs(cat),
    related: [
      { label: "Browse overlay packs", href: "/overlays" },
      { label: "How to add an overlay to OBS", href: "/blog/how-to-add-overlay-to-obs" },
      { label: "Kick stream overlay guide", href: "/blog/kick-stream-overlay-guide" },
    ],
  });
}

const COMPARISONS = [
  ["OBS vs Streamlabs: Which Should You Use?", "obs-vs-streamlabs", "obs vs streamlabs", "Both run the same overlays. OBS Studio is lighter and free; Streamlabs Desktop bundles alerts and themes but uses more resources. If you want maximum performance, OBS; if you want everything in one app, Streamlabs.", "The overlay you buy works in both - the choice is about the software, not the art."],
  ["Free vs Paid Twitch Overlays: What's the Difference?", "free-vs-paid-twitch-overlays", "free vs paid overlays", "Free overlays are fine for week one, but thousands of channels run the exact same file - so you look like a default skin. Premium packs give you a designed, animated world nobody else has, usually for the price of a coffee.", "The gap isn't quality of pixels - it's whether your channel looks like everyone else's."],
  ["How Much Do Stream Overlays Cost?", "how-much-do-stream-overlays-cost", "how much do overlays cost", "Free templates exist; designed animated packs typically run $5-$30; fully custom brands with emotes, badges and a mascot run $100-$400+. Most streamers are best served by a premium pack until their channel outgrows it.", "You don't need a custom brand on day one - a premium pack punches far above its price."],
  ["Are Paid Stream Overlays Worth It?", "are-paid-stream-overlays-worth-it", "are paid overlays worth it", "For the cost of a coffee, a premium pack buys your content the audition. A new viewer gives a small channel about eight seconds; a matched, animated identity reads as 'this person is serious' and buys you the time to prove it.", "An overlay can't make your content good - but it stops good content getting skipped."],
];

for (const [title, slug, kw, intro, close] of COMPARISONS) {
  add({
    slug,
    title,
    metaTitle: `${title.replace(/[?:].*$/, "").trim()} (2026 Guide)`,
    metaDescription: `${intro.slice(0, 150)}`,
    keywords: [kw, "twitch overlay", "stream overlay", "streaming setup"],
    excerpt: intro,
    sections: [
      { h2: "The short version", paragraphs: [intro] },
      { h2: "What actually matters for your channel", paragraphs: [`${close} The practical move for most streamers: start with a premium [animated overlay pack](/overlays), keep your branding consistent, and upgrade to custom work once your channel has an identity worth building around.`] },
      { h2: "What to look for either way", list: [
        "Animated waiting screens (Starting Soon, BRB) - that's where motion earns its keep",
        "A matched set: screens, webcam frame, alerts and panels in one style",
        "1920x1080 files that downscale cleanly to any streaming resolution",
        "Real preview videos so you can judge the motion before you buy",
      ] },
    ],
    faq: [
      { question: kw.includes("cost") ? "How much should I spend on an overlay?" : "Do I need to pay for an overlay?", answer: "Most streamers do well with a premium pack ($5-$30). Free works for week one; custom ($100+) is worth it once your channel has an identity to build around." },
      { question: "Do paid overlays work on every platform?", answer: "Yes - a good 1920x1080 pack works on Twitch, YouTube, Kick and (with a vertical pack) TikTok Live." },
      { question: "Can I set up a paid overlay myself?", answer: "Yes. Packs are ready files you drag into OBS. No design software involved." },
    ],
    featuredPacks: packs("stream"),
    related: [
      { label: "Browse animated packs", href: "/overlays" },
      { label: "What is a Twitch overlay?", href: "/blog/what-is-a-twitch-overlay" },
      { label: "Animated vs static overlays", href: "/blog/animated-vs-static-stream-overlays" },
    ],
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   CLUSTER E — Sizes & specs
   ───────────────────────────────────────────────────────────────────────── */
const SIZES = [
  ["Twitch Emote", "twitch-emote-size", "112x112, 56x56 and 28x28 pixels", "Upload at 112x112 and Twitch generates the rest. PNG, under 1MB each.", "Design bold and simple - detail vanishes at 28px."],
  ["Twitch Sub Badge", "twitch-sub-badge-size", "72x72, 36x36 and 18x18 pixels", "Three sizes, PNG, under 1MB each. Badges show tiny in chat, so a single strong shape beats fine detail.", "Test at 18px before uploading."],
  ["Twitch Panel", "twitch-panel-size", "320 pixels wide (height flexible)", "Panels are locked to 320px wide; height is up to you (40-100px works for headers).", "A matched set - About, Schedule, Rules, Donate - is the first thing new viewers scroll."],
  ["Twitch Banner", "twitch-banner-size", "1200x480 for the profile banner", "The profile banner is 1200x480; it compresses hard, so avoid fine detail and small text.", "Keep your logo and key text centered where it won't get cropped on mobile."],
  ["Twitch Offline Banner", "twitch-offline-banner-size", "1920x1080 for the video player banner", "The offline (video player) banner is 1920x1080 - it's your storefront when you're not live.", "Point viewers to your schedule and socials on it."],
  ["Twitch Alert", "twitch-alert-size", "commonly 800x300 pixels", "Alerts are usually built around 800x300; keep text inside the middle 80% so nothing gets clipped.", "Match the alert art to your overlay so every follow feels on-brand."],
  ["Twitch Webcam Overlay", "twitch-webcam-overlay-size", "1280x720 for a 16:9 camera (800x600 for 4:3)", "Match the frame to your camera's ratio, not the canvas. Scale down in OBS, never up.", "Frame above camera in the source list so the cutout shows your face."],
  ["Twitch Channel Point", "twitch-channel-point-icon-size", "112x112, 56x56 and 28x28 pixels", "Channel point reward icons use the same sizes as emotes - and show even smaller in the menu.", "A single bold shape reads far better than detailed art here."],
];

for (const [asset, slug, size, detail, tip] of SIZES) {
  add({
    slug,
    title: `What Size Should a ${asset} Be? (2026)`,
    metaTitle: `${asset} Size 2026 - Exact Dimensions`,
    metaDescription: `The correct ${asset.toLowerCase()} size: ${size}. Plus file format, limits and a quick tip so your art looks sharp everywhere.`,
    keywords: [`${asset.toLowerCase()} size`, `${asset.toLowerCase()} dimensions`, "twitch graphics size", "stream overlay size"],
    excerpt: `The correct ${asset.toLowerCase()} size is ${size}. Here's the full spec, the file rules, and how to make it look sharp.`,
    sections: [
      { h2: "The exact size", paragraphs: [`A ${asset.toLowerCase()} should be ${size}. ${detail}`] },
      { h2: "Getting it sharp", paragraphs: [`${tip} Design at the largest size and let the platform scale down - upscaling a small file makes every edge soft. If you're making emotes, badges or channel-point icons, our [free resizer](/free-tools/emote-resizer) exports every required size from one image, with a preview of how it reads small.`] },
      { h2: "Every Twitch graphic size", table: {
        head: ["Graphic", "Size (px)"],
        rows: [
          ["Stream overlay", "1920 x 1080"],
          ["Webcam frame (16:9)", "1280 x 720"],
          ["Alerts", "800 x 300"],
          ["Panels", "320 x 40-100"],
          ["Emotes", "112 / 56 / 28"],
          ["Sub badges", "72 / 36 / 18"],
          ["Profile banner", "1200 x 480"],
          ["Offline banner", "1920 x 1080"],
        ],
      } },
    ],
    faq: [
      { question: `What size is a ${asset.toLowerCase()}?`, answer: `${size}. ${detail}` },
      { question: `What format should it be?`, answer: `PNG for graphics with transparency; keep emotes, badges and reward icons under 1MB each.` },
      { question: `Can I resize one image to every size?`, answer: `Yes - our free emote & badge resizer generates every required size from a single upload, in your browser.` },
    ],
    featuredPacks: packs(asset.includes("Badge") || asset.includes("Emote") || asset.includes("Channel Point") ? "badges" : "stream"),
    related: [
      { label: "Twitch overlay size guide", href: "/blog/twitch-overlay-size-guide" },
      { label: "Free emote & badge resizer", href: "/free-tools/emote-resizer" },
      { label: "Browse overlay packs", href: "/overlays" },
    ],
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   CLUSTER F — Growth, branding & tips
   ───────────────────────────────────────────────────────────────────────── */
const GROWTH = [
  ["How to Get Your First 10 Twitch Followers", "get-your-first-10-twitch-followers", "get your first followers", "Nobody's first stream is packed. Growth early on is about looking established and showing up consistently - so the handful of people who do find you decide to stay.", ["Treat an empty chat like a full one - talk out loud, narrate, react.", "Stream on a schedule so people can find you again.", "Look established: a matched, animated overlay reads as 'this person is serious.'", "Raid and network with streamers your size after their streams.", "Clip your best moments and post them where your audience already is."]],
  ["A Stream Schedule That Actually Grows Your Channel", "stream-schedule-that-grows-your-channel", "build a stream schedule", "Consistency beats marathon sessions. A viewer who knows when you're live can plan to come back - and repeat viewers are what the algorithm rewards.", ["Pick 3-4 fixed days and times you can genuinely keep.", "Put the schedule on a channel panel and your offline banner.", "Stream at least 2 hours so people have time to find you.", "Protect the slots - showing up matters more than going long."]],
  ["How to Choose a Stream Aesthetic", "how-to-choose-a-stream-aesthetic", "pick a stream aesthetic", "Your aesthetic is the promise your channel makes at a glance. The best one isn't the prettiest - it's the one that matches your content and your personality, so viewers know what they're getting.", ["Start from your content: cozy games want warmth, FPS wants energy.", "Pick one palette and one mood, then apply it everywhere.", "Match your overlay, emotes, panels and offline banner.", "When in doubt, pick the world you'd want to hang out in."]],
  ["The Twitch Channel Branding Checklist", "twitch-channel-branding-checklist", "brand your channel", "Branding is just consistency applied everywhere. When your overlay, panels, emotes and banner all agree, a new viewer reads your channel as a real place - not a default skin.", ["One aesthetic across overlay, panels, emotes and banner.", "The same handle on Twitch, YouTube, TikTok and X.", "A matched emote and sub badge set.", "An offline banner that points to your schedule and socials.", "A consistent stream title format."]],
  ["Why Overlays Matter More for Small Streamers", "why-overlays-matter-for-small-streamers", "understand why overlays matter", "Big streamers get the benefit of the doubt; small streamers get about eight seconds of it. A matched, animated identity buys your content the time to prove itself.", ["First impressions happen before you say a word.", "A polished channel reads as consistent and trustworthy.", "Animated waiting screens keep early arrivals from bouncing.", "Matched branding makes clips and raids look professional."]],
  ["Twitch Retention: Keep Viewers Watching Longer", "twitch-retention-keep-viewers-watching", "improve viewer retention", "Getting a click is half the battle; keeping the click is the other half. Small production touches - animated screens, styled chat, matched alerts - make a stream feel worth staying in.", ["Animate your Starting Soon and BRB - dead screens make people leave.", "Acknowledge every follow and new chatter by name.", "Keep energy up even when the numbers are low.", "Make your stream feel like a place, not a broadcast."]],
  ["Your First Stream Checklist", "your-first-stream-checklist", "prepare your first stream", "You'll never feel fully ready - and that's fine. This checklist covers the essentials so your first stream looks intentional instead of improvised.", ["Scenes ready: Starting Soon, main, BRB, Ending.", "Audio levels tested; alerts tested.", "A clear title and the correct category.", "A real overlay so it looks like you mean it.", "A plan for what you'll do if chat is quiet (you will talk anyway)."]],
  ["How to Name Your Twitch Channel", "how-to-name-your-twitch-channel", "name your channel", "Your name is the first thing raiders read out loud and the thing people search later. Make it easy to say, easy to spell, and available everywhere.", ["Say it out loud - if it trips your tongue, it trips a raider's.", "Grab it on Twitch, YouTube, TikTok and X the day you decide.", "Skip numbers and leetspeak - clean names get recommended more.", "Match the vibe of your content."]],
  ["Consistent Branding Across Every Platform", "consistent-branding-across-platforms", "keep branding consistent", "Discovery compounds when your channel looks the same everywhere. One handle, one aesthetic, one set of assets - so a viewer who finds you on TikTok recognizes you on Twitch.", ["Same handle across all platforms.", "The same overlay aesthetic on every stream.", "Matching emotes and badges.", "Cross-post clips with consistent thumbnails."]],
  ["Twitch Affiliate Requirements (and How to Hit Them)", "twitch-affiliate-requirements", "reach Twitch Affiliate", "Affiliate unlocks subs, bits and emotes. The bar is reachable with consistency - and a channel that looks the part converts more of the viewers you do get.", ["50 followers.", "500 total minutes broadcast.", "7 unique broadcast days.", "An average of 3 concurrent viewers - all over a 30-day window."]],
  ["How to Get More Clips of Your Stream", "how-to-get-more-clips-of-your-stream", "get more clips", "Clips are free marketing that outlives your stream. A clean, branded overlay makes every clip look shareable instead of amateur.", ["Tell chat when something clippable happens.", "Keep a matched overlay so clips look professional.", "Post your best clips where your audience already scrolls.", "Pin your favorites to your channel."]],
  ["Social Media Strategy for Streamers", "social-media-strategy-for-streamers", "grow on social as a streamer", "Your stream is the destination; social is the road there. Short vertical clips do the heaviest lifting - and consistent branding makes every post recognizably yours.", ["Post vertical clips of your best moments daily.", "Use the same handle and aesthetic everywhere.", "Announce your schedule and go-live on stories.", "Engage with streamers your size - community is a growth channel."]],
  ["Sub Perks and Rewards Ideas for Streamers", "sub-perks-and-rewards-ideas", "come up with sub perks", "Subs stay when subscribing feels like joining something. Perks don't have to be expensive - they have to feel personal and consistent with your channel's identity.", ["A custom emote and sub badge set they actually want to use.", "Sub-only Discord channels or game nights.", "Shoutouts and name-in-credits on the Ending screen.", "Priority in game lobbies or requests."]],
  ["How to Make Your Small Stream Look Professional", "make-your-small-stream-look-professional", "look professional on a small budget", "Looking professional is mostly consistency, not money. A matched overlay, clean audio and a real schedule do more than an expensive camera.", ["A matched, animated overlay across every scene.", "Clean, level audio - viewers forgive bad video, not bad sound.", "Styled alerts and a chat box that match your look.", "An offline banner and panels that aren't blank."]],
  ["Twitch Stream Title Tips That Get Clicks", "twitch-stream-title-tips", "write better stream titles", "Your title is a headline competing in a wall of thumbnails. Say what's happening and why it's worth a click - specific beats clever.", ["Lead with the game and what you're doing (ranked, first playthrough, etc.).", "Add a hook - a goal, a challenge, a milestone.", "Skip ALL CAPS and emoji spam.", "Update it when the stream changes."]],
  ["How to Build a Stream Community", "how-to-build-a-stream-community", "build a community", "A community is what turns viewers into regulars and regulars into friends. It grows from consistency, names, and a channel that feels like a place worth belonging to.", ["Learn and use regulars' names.", "Give the community an identity - an emote, an inside joke, a name.", "Run a Discord and show up in it between streams.", "Make your channel look like a home, not a broadcast."]],
];

for (const [title, slug, verb, intro, list] of GROWTH) {
  add({
    slug,
    title,
    metaTitle: `${title} (2026)`.slice(0, 60),
    metaDescription: `${intro.slice(0, 152)}`,
    keywords: [verb, "grow on twitch", "twitch tips", "streaming tips", "small streamer"],
    excerpt: intro,
    sections: [
      { h2: "Why this matters", paragraphs: [intro] },
      { h2: "What to actually do", list },
      { h2: "The part most guides skip", paragraphs: [
        `None of this works if your channel looks like a default skin. A matched, animated identity - screens, webcam frame, alerts and panels in one style - is what makes the difference between a viewer bouncing and a viewer staying. Browse [animated overlay packs](/overlays) and give your growth something to land on.`,
      ] },
    ],
    faq: [
      { question: "How long does it take to grow on Twitch?", answer: "There's no fixed timeline - consistency is the lever. Streaming on a real schedule with a channel that looks established is what compounds over months." },
      { question: "Do I need an overlay to grow?", answer: "You don't strictly need one, but it buys your content the audition. A polished channel keeps more of the viewers you work to attract." },
      { question: "What matters most for a small streamer?", answer: "Consistency, clean audio, and looking like you mean it. Those three do more than any single expensive upgrade." },
    ],
    featuredPacks: packs("cozy"),
    related: [
      { label: "Why overlays matter for small streamers", href: "/blog/why-overlays-matter-for-small-streamers" },
      { label: "Free Twitch name generator", href: "/free-tools/twitch-name-generator" },
      { label: "Browse overlay packs", href: "/overlays" },
    ],
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   CLUSTER G — VTuber
   ───────────────────────────────────────────────────────────────────────── */
const VTUBER = [
  ["Best VTuber Overlays for 2026", "best-vtuber-overlays", "find the best VTuber overlays", "For a VTuber, the overlay isn't decoration - it's the entire world your model lives in. The best ones feel like a set your character belongs to.", ["Scene-based worlds that suit your model's lore (anime, sakura, gothic, cozy).", "Slow, expressive motion that complements the model instead of fighting it.", "A frame or foreground layer for depth in front of the model.", "Room in the layout so busy motion never crowds your model's silhouette."]],
  ["PNGTuber Setup: Everything You Need to Start", "pngtuber-setup-guide", "set up as a PNGTuber", "PNGTubing is the cheapest way onto VTuber street - a reactive image instead of a rigged model. Pair it with a scene-based overlay and it reads as intentional, not budget.", ["Grab a PNGTuber app (many are free) and your character art.", "Set up talking/idle states so it reacts to your mic.", "Place it inside a scene overlay that matches its vibe.", "Keep heavy background motion away from the character."]],
  ["Free VTuber Avatar Options (and How to Use Them)", "free-vtuber-avatar-options", "get a free VTuber avatar", "You don't need a commissioned model to start. Free avatars and maker tools get you on screen today - a good overlay is what makes the whole thing feel finished.", ["Try free avatar makers or PNGTuber templates.", "Capture with a transparent background (alpha beats green screen).", "Drop the model into a scene-based overlay world.", "Upgrade the model later; keep the world consistent."]],
  ["VTube Studio Setup for Beginners", "vtube-studio-setup-for-beginners", "set up VTube Studio", "VTube Studio is the standard for rigged 2D models. Getting it into OBS cleanly - with a matching overlay behind it - is what separates a floating model from a real channel.", ["Rig or import your model in VTube Studio.", "Output to OBS via Spout2 or a transparency-capable window capture.", "Place the model above your scene overlay in the source list.", "Add a webcam frame or foreground element for depth."]],
  ["VTuber vs Facecam: Which Should You Use?", "vtuber-vs-facecam", "choose between VTuber and facecam", "Both work; they just ask different things of your overlay. A facecam borrows your real room for a setting; a VTuber floats in whatever you put behind them - so the overlay matters more.", ["Facecam: a webcam frame and a tidy background do most of the work.", "VTuber: the overlay is the world, so pick one that matches your model's lore.", "Either way, keep the person/model the hero of the scene.", "Consistency across scenes sells the whole look."]],
  ["How to Brand Your VTuber Channel", "how-to-brand-your-vtuber-channel", "brand your VTuber channel", "A VTuber brand is your model plus the world around it. When the overlay, emotes and lore all agree, your channel reads as a place with its own identity.", ["Pick a world that matches your model's story.", "Match your overlay, emotes and badges to that world.", "Keep the same handle and aesthetic across platforms.", "Give returning subs a badge that fits the lore."]],
  ["The Best Overlay Styles for VTubers", "best-overlay-styles-for-vtubers", "pick an overlay style for a VTuber", "The overlay is your model's stage. Anime, sakura, gothic and cozy worlds tend to suit VTubers best - expressive but calm, so the motion matches the model.", ["Anime and sakura for bright, expressive models.", "Gothic and mystic for darker lore.", "Cozy for chill, chatting-focused channels.", "Whatever you pick, keep busy motion off the model's silhouette."]],
];

for (const [title, slug, verb, intro, list] of VTUBER) {
  const cat = /gothic|mystic/.test(title.toLowerCase()) ? "gothic" : "anime";
  add({
    slug,
    title,
    metaTitle: `${title}`.slice(0, 60),
    metaDescription: `${intro.slice(0, 152)}`,
    keywords: [verb, "vtuber overlay", "vtuber setup", "png tuber", "vtuber stream"],
    excerpt: intro,
    sections: [
      { h2: "Why this matters for VTubers", paragraphs: [intro, `Because a VTuber floats in whatever you put behind them, the overlay isn't optional set-dressing - it's the physical world your character inhabits. Browse the [anime collection](/overlays/anime) and [Japanese worlds](/overlays/japanese) and imagine your model standing in each one.`] },
      { h2: "How to do it well", list },
      { h2: "Layer order that works", ordered: true, list: [
        "Alerts - top",
        "Foreground overlay elements (frames, drifting petals)",
        "Your model capture",
        "The animated scene / background overlay",
        "Game capture (if playing) - bottom",
      ] },
    ],
    faq: [
      { question: "What overlay style works best for VTubers?", answer: "Scene-based worlds with expressive but slow motion - anime, sakura, gothic and cozy. The overlay becomes your character's environment, so match it to their lore." },
      { question: "Do I need a special VTuber overlay?", answer: "No - any well-made 1920x1080 animated pack works. What matters is choosing a world that suits your model and keeping busy motion off the silhouette." },
      { question: "Should the overlay go in front of or behind my model?", answer: "Both. The scene sits behind the model; thin foreground elements can sit in front for depth. Alerts always render on top." },
    ],
    featuredPacks: packs(cat),
    related: [
      { label: "VTuber overlay guide", href: "/blog/vtuber-overlay-guide" },
      { label: "Anime overlay packs", href: "/overlays/anime" },
      { label: "Japanese worlds", href: "/overlays/japanese" },
    ],
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   CLUSTER H — Seasonal
   ───────────────────────────────────────────────────────────────────────── */
const SEASONAL = [
  ["Halloween", "halloween-stream-overlays", "seasonal", "jack-o'-lantern glow, drifting fog and bats across a harvest moon", "the fastest way to make your channel feel alive to spooky season without rebuilding your whole brand"],
  ["Christmas", "christmas-stream-overlays", "cozy", "snowfall, warm string lights and a fireside hush", "the coziest way to dress your channel for the holidays - run it for December, then swap back"],
  ["Valentine's Day", "valentines-stream-overlays", "cat", "soft pinks, floating hearts and a romantic hush", "a sweet, limited-run look for February that makes chat feel the love"],
  ["New Year", "new-year-stream-overlays", "stream", "fireworks, countdown energy and a fresh-start glow", "the perfect backdrop for a countdown stream and a fresh-start rebrand"],
  ["Winter", "cozy-winter-stream-overlays", "cozy", "drifting snow, frosted windows and lamplight warmth", "a whole-season cozy look for the cold months that keeps chat settled in"],
  ["Spooky Season", "spooky-season-stream-setup", "gothic", "candlelight, cathedral shadows and things that move in the dark", "everything you need to turn your channel gothic for October and horror marathons"],
];

for (const [season, slug, cat, aesthetic, angle] of SEASONAL) {
  add({
    slug,
    title: `${season} Stream Overlays: Dress Your Channel for the Season`,
    metaTitle: `${season} Stream Overlays (2026) - Animated & Ready`,
    metaDescription: `${season} stream overlays with ${aesthetic}. ${angle}. Animated screens, alerts and panels, ready for OBS.`,
    keywords: [`${season.toLowerCase()} overlay`, `${season.toLowerCase()} stream overlay`, `${season.toLowerCase()} twitch overlay`, "seasonal overlay", "animated overlay"],
    excerpt: `${aesthetic.charAt(0).toUpperCase() + aesthetic.slice(1)} - ${angle}.`,
    sections: [
      { h2: `Why run a ${season} overlay`, paragraphs: [
        `Seasonal overlays are ${angle}. Swap your look for the month, then switch your yearly set back - viewers notice the effort, and a channel that feels current to the calendar reads as active and cared-for.`,
        `Each ${season} pack is still a complete kit: animated Starting Soon, BRB, Ending and Offline screens, a webcam frame, alerts and panels - all matched, all drop-in ready. Browse the [seasonal and ${cat} collections](/overlays/${cat}).`,
      ] },
      { h2: `What's in a ${season} pack`, list: [
        `Animated screens with ${aesthetic}`,
        "A matching webcam frame and in-game overlay",
        "Seasonal animated alerts for follows, subs and raids",
        "Info panels in the same theme",
      ] },
      { h2: "Timing it right", paragraphs: [
        `Grab your seasonal look ahead of the season - ${season} streams look their best when the overlay is up before everyone else's. Setup is minutes: drop the screens into OBS as looping Media Sources and go live. Full walkthrough: [how to add an overlay to OBS](/blog/how-to-add-overlay-to-obs).`,
      ] },
    ],
    faq: [
      { question: `When should I put up my ${season} overlay?`, answer: `A week or two before the season peaks. Early adopters look established while everyone else is still on their default look.` },
      { question: `Can I switch back after the season?`, answer: `Yes - keep your year-round pack and just swap scene collections in OBS. Nothing is permanent.` },
      { question: `Are ${season} overlays animated?`, answer: `Yes - every seasonal pack ships animated screens plus static PNGs, with a real preview video on each product page.` },
    ],
    featuredPacks: packs(cat),
    related: [
      { label: "Seasonal overlay packs", href: "/overlays/seasonal" },
      { label: "How to add an overlay to OBS", href: "/blog/how-to-add-overlay-to-obs" },
      { label: "Browse all packs", href: "/overlays" },
    ],
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   CLUSTER I2 — Style / audience guides (top up to 100)
   ───────────────────────────────────────────────────────────────────────── */
const STYLES = [
  ["Minimalist Twitch Overlays: Less Is More", "minimalist-twitch-overlays", "stream", "minimalist overlay", "clean lines, thin frames and lots of breathing room", "let your gameplay and personality carry the stream while a restrained frame keeps it tidy"],
  ["Cute & Kawaii Overlays for Streamers", "cute-kawaii-overlays-for-streamers", "cat", "kawaii overlay", "pastel palettes, soft sparkles and adorable mascots", "make your whole channel feel warm and huggable from the first second"],
  ["Dark & Gothic Overlays for Horror Streamers", "dark-gothic-overlays-for-horror-streamers", "gothic", "gothic overlay", "candlelight, deep shadows and things that move in the dark", "heighten the tension so your scary games feel even scarier"],
  ["Aesthetic Overlays: Build a Channel People Screenshot", "aesthetic-stream-overlays", "sakura", "aesthetic overlay", "cohesive palettes, dreamy motion and a scene worth staring at", "give viewers a channel so pretty they want to screenshot and share it"],
  ["Animated Alerts: The Cheapest Upgrade to Your Stream", "animated-alerts-for-your-stream", "stream", "animated alerts", "motion, sound and a moment of celebration on every follow", "make every follow, sub and raid feel like an event instead of a line of text"],
];

for (const [title, slug, cat, kw, aesthetic, angle] of STYLES) {
  add({
    slug,
    title,
    metaTitle: `${title}`.slice(0, 60),
    metaDescription: `${aesthetic.charAt(0).toUpperCase() + aesthetic.slice(1)} - ${angle}. Animated ${kw} packs ready for OBS.`,
    keywords: [kw, "twitch overlay", "stream overlay", "animated overlay", "aesthetic stream"],
    excerpt: `${aesthetic.charAt(0).toUpperCase() + aesthetic.slice(1)} - here's how a ${kw} works, who it suits, and packs ready to drop into OBS.`,
    sections: [
      { h2: "The idea", paragraphs: [
        `A great ${kw} is about one thing done well: ${aesthetic}. The goal is to ${angle}. When every screen agrees on that idea, your channel reads as intentional - and intentional is what keeps a new viewer watching.`,
        `Browse the [${cat} collection](/overlays/${cat}) and picture your content inside each frame. The best pick is the one that matches your personality, not just a trend.`,
      ] },
      { h2: "Who it suits and how to use it", list: [
        "Match the style to your content and your energy, not just a color you like",
        "Keep heavy motion on waiting screens; stay subtle in-game",
        "Use matching alerts and panels so nothing looks bolted on",
        "Reads clearly at small sizes on mobile, where most discovery happens",
      ] },
      { h2: "Setting it up", paragraphs: [
        `Setup is minutes: drop each animated screen into OBS as a looping Media Source, add your webcam frame above the camera, and upload the alerts to your alert tool. Full walkthrough: [how to add an overlay to OBS](/blog/how-to-add-overlay-to-obs).`,
      ] },
    ],
    faq: [
      { question: `What is a ${kw}?`, answer: `A matched set of stream graphics - screens, webcam frame, alerts and panels - built around ${aesthetic}, giving your whole channel one coherent look.` },
      { question: `Does it work on YouTube and Kick?`, answer: `Yes. Overlays render in OBS before the video reaches any platform, so the same 1920x1080 files work everywhere.` },
      { question: `Is it animated?`, answer: `Yes - every pack ships animated screens plus static PNGs, with a real preview video on each product page.` },
    ],
    featuredPacks: packs(cat),
    related: [
      { label: `Browse ${cat} packs`, href: `/overlays/${cat}` },
      { label: "Animated vs static overlays", href: "/blog/animated-vs-static-stream-overlays" },
      { label: "Browse all packs", href: "/overlays" },
    ],
  });
}

/* ── emit ─────────────────────────────────────────────────────────────── */
const esc = (v) => JSON.stringify(v);
function sectionLit(s) {
  const parts = [`      h2: ${esc(s.h2)},`];
  if (s.paragraphs) parts.push(`      paragraphs: ${esc(s.paragraphs)},`);
  if (s.ordered) parts.push(`      ordered: true,`);
  if (s.list) parts.push(`      list: ${esc(s.list)},`);
  if (s.table) parts.push(`      table: ${esc(s.table)},`);
  return `    {\n${parts.join("\n")}\n    }`;
}
function postLit(p) {
  const lines = [
    `    slug: ${esc(p.slug)},`,
    `    title: ${esc(p.title)},`,
    `    metaTitle: ${esc(p.metaTitle)},`,
    `    metaDescription: ${esc(p.metaDescription)},`,
    `    date: ${esc(p.date)},`,
    `    keywords: ${esc(p.keywords)},`,
    `    excerpt: ${esc(p.excerpt)},`,
    `    sections: [\n${p.sections.map(sectionLit).join(",\n")}\n    ],`,
    `    faq: ${esc(p.faq)},`,
    `    featuredPacks: ${esc(p.featuredPacks)},`,
    `    related: ${esc(p.related)},`,
  ];
  return `  {\n${lines.join("\n")}\n  }`;
}

const file = `import type { BlogPost } from "./blog";

/**
 * GENERATED SEO blog posts - ${posts.length} guides across theme, game, how-to,
 * platform, size, growth, VTuber and seasonal keyword clusters.
 *
 * GENERATED by scripts/generate-blog.mjs - edit the generator and re-run
 * rather than hand-editing entries here. The 6 hand-written flagship posts
 * live in blog.ts and are merged with these at import.
 */
export const GENERATED_POSTS: BlogPost[] = [
${posts.map(postLit).join(",\n")},
];
`;

writeFileSync(join(here, "..", "src", "data", "blog-generated.ts"), file);
console.log(`WROTE blog-generated.ts with ${posts.length} posts`);
const clusters = {};
posts.forEach((p) => { const k = p.slug.split("-")[0]; clusters[k] = (clusters[k] || 0) + 1; });
console.log("sample slugs:", posts.slice(0, 5).map((p) => p.slug).join(", "));

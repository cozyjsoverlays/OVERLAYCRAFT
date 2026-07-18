import type { FaqEntry } from "@/lib/types";

export interface BlogSection {
  h2: string;
  /** Paragraphs support inline links via [label](/href) markdown syntax. */
  paragraphs?: string[];
  list?: string[];
  ordered?: boolean;
  table?: { head: string[]; rows: string[][] };
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  keywords: string[];
  excerpt: string;
  sections: BlogSection[];
  faq?: FaqEntry[];
  /** Real product slugs featured as shoppable cards inside the post. */
  featuredPacks: string[];
  /** Internal links rendered in the CTA block. */
  related: { label: string; href: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-add-overlay-to-obs",
    title: "How to Add an Overlay to OBS (in Under 5 Minutes)",
    metaTitle: "How to Add an Overlay to OBS — Fast 2026 Setup Guide",
    metaDescription:
      "How to add a Twitch overlay to OBS Studio step by step: image vs media source, looping animated WebM/MP4 files, layer order and the 3 fixes for broken overlays.",
    date: "2026-07-17",
    keywords: [
      "how to add overlay to obs",
      "obs overlay setup",
      "add twitch overlay to obs",
      "animated overlay obs",
      "obs media source loop",
      "twitch overlay",
      "how to install stream overlay",
    ],
    excerpt:
      "Image source or media source? Loop on or off? Here's the exact 5-minute setup for static and animated overlays in OBS Studio — plus the three mistakes that make overlays look broken.",
    sections: [
      {
        h2: "The short answer",
        paragraphs: [
          "Static overlay: add an Image source. Animated overlay: add a Media Source, point it at your MP4 or WebM file, and tick Loop. Drag it above your gameplay in the Sources list. That's genuinely the whole trick — everything below is the detail that makes it look right.",
        ],
      },
      {
        h2: "Step-by-step: adding an animated overlay to OBS",
        ordered: true,
        list: [
          "Open OBS Studio and select the scene you want the overlay on (or make a new one — Scenes panel, bottom left, + button).",
          "In the Sources panel, click + and choose Media Source. Name it something you'll recognize, like \"Starting Soon screen\".",
          "Click Browse and select your overlay's video file — MP4 or WebM. Every [OverlayCraft pack](/overlays) ships these ready to go, with a real preview video on each product page.",
          "Tick Loop. This is the one people miss: without it, your animation plays once and freezes.",
          "Click OK. Drag the red handles to fill the canvas — a proper overlay is made at 1920×1080, so it should snap edge to edge with no stretching.",
          "In the Sources list, drag the overlay above your game or camera source. Sources render top-down: whatever is higher in the list draws on top.",
        ],
      },
      {
        h2: "Static overlays: use an Image source instead",
        paragraphs: [
          "For PNG frames, panels, or a static scene, the steps are the same but you pick Image instead of Media Source. PNGs keep their transparency, so your webcam frame will show the camera through the cutout automatically — as long as the frame sits above the camera in the Sources list.",
        ],
      },
      {
        h2: "Layer order: the mental model",
        paragraphs: [
          "Think of your scene as a stack of paper. Bottom sheet: game capture or camera. Middle: facecam frame, in-game overlay. Top: alerts, since you never want a follower alert hiding behind your gameplay.",
        ],
        list: [
          "Alerts — top",
          "Webcam frame — above the camera",
          "Camera — below its frame",
          "In-game overlay — above game capture",
          "Game capture — bottom",
        ],
      },
      {
        h2: "The three mistakes that make overlays look broken",
        list: [
          "No loop: the animation plays once and sits frozen for the rest of your stream. Tick Loop in the Media Source properties.",
          "Stretched to the wrong ratio: right-click the source → Transform → Fit to screen. Overlays are 16:9; forcing them into a stretched canvas warps every line.",
          "Black background where transparency should be: your file is an MP4 without alpha. Use the WebM version from your pack for transparent elements, or place the MP4 as a full-screen scene instead.",
        ],
      },
      {
        h2: "Does an animated overlay slow down my stream?",
        paragraphs: [
          "Not meaningfully. A looping media source is one of the cheapest things OBS renders — far lighter than a browser source running a web page. If your machine can run your game plus OBS, a 15-second loop won't be the thing that hurts you. Every [cozy overlay pack](/overlays/cozy) and [gothic pack](/overlays/gothic) is exported at streaming-friendly bitrates so it never shows up in your CPU graph.",
        ],
      },
    ],
    faq: [
      {
        question: "What file format should a stream overlay be?",
        answer:
          "WebM for anything that needs transparency (frames, alerts), MP4 for full-screen animated scenes, PNG for static graphics. WebM files are small, support alpha channels, and loop cleanly in OBS.",
      },
      {
        question: "Why is my overlay showing a black box?",
        answer:
          "The file has no alpha channel — usually an MP4 used where a transparent WebM was intended. Swap in the WebM version, or use the MP4 only as a full-screen background scene.",
      },
      {
        question: "Do these steps work in Streamlabs too?",
        answer:
          "Yes. Streamlabs Desktop uses the same source system — add a Media Source for animated files, Image for static ones, and enable looping.",
      },
    ],
    featuredPacks: [
      "cozy-fox-overlay-animated-stream-package",
      "dark-gothic-raven-animated-stream-package",
      "midnight-magic-cat-overlay",
      "cozy-dragon-overlay",
    ],
    related: [
      { label: "Browse animated overlay packs", href: "/overlays" },
      { label: "Twitch overlay size guide", href: "/blog/twitch-overlay-size-guide" },
      { label: "Cozy overlays for chill streams", href: "/overlays/cozy" },
    ],
  },
  {
    slug: "twitch-overlay-size-guide",
    title: "Twitch Overlay Size Guide (2026): Every Dimension That Matters",
    metaTitle: "Twitch Overlay Size Guide 2026 — All Dimensions & Safe Zones",
    metaDescription:
      "Every Twitch graphic size in one table: overlays 1920×1080, webcam frames, alerts, panels 320px, banners and emotes — plus safe zones so chat never covers your art.",
    date: "2026-07-17",
    keywords: [
      "twitch overlay size",
      "twitch overlay dimensions",
      "twitch panel size",
      "twitch webcam overlay size",
      "twitch alert size",
      "stream overlay dimensions",
      "twitch overlay",
    ],
    excerpt:
      "1920×1080 for the overlay, 320px for panels, and a handful of numbers in between. The full dimension table, plus the safe-zone rules that keep your art out from under the chat window.",
    sections: [
      {
        h2: "The quick table",
        paragraphs: [
          "Bookmark this. Every graphic your channel needs, with the size that renders crisp on Twitch in 2026:",
        ],
        table: {
          head: ["Graphic", "Size (px)", "Notes"],
          rows: [
            ["Full stream overlay", "1920 × 1080", "16:9 — matches the OBS canvas"],
            ["Webcam frame (16:9)", "1280 × 720", "Scale down in OBS, never up"],
            ["Webcam frame (4:3)", "800 × 600", "For older cams"],
            ["Alerts", "800 × 300", "Keep text inside the middle 80%"],
            ["Panels", "320 × 40–100", "Width fixed at 320, height flexible"],
            ["Profile banner", "1200 × 480", "Compresses hard — avoid fine detail"],
            ["Video player banner", "1920 × 1080", "Shown when you're offline"],
            ["Emotes", "112 × 112", "Upload 112, Twitch scales to 56/28"],
          ],
        },
      },
      {
        h2: "Why 1920×1080 even if you stream at 936p",
        paragraphs: [
          "Design at full HD and let OBS scale down. Downscaling keeps lines sharp; upscaling a smaller overlay makes every edge soft. All [OverlayCraft packs](/overlays) are exported at 1920×1080 for exactly this reason — they fit the default canvas edge to edge with zero transform fiddling.",
        ],
      },
      {
        h2: "Safe zones: the part size guides skip",
        paragraphs: [
          "A pixel-perfect overlay can still look wrong live, because the Twitch player puts things on top of your stream. Leave breathing room in three places:",
        ],
        list: [
          "Bottom-left corner: the stream info and pause controls appear here on hover. Keep essential art out of the bottom 120px on the left half.",
          "Right edge: many viewers keep chat in theatre mode overlapping the right side on mobile. Don't put your follower goal flush against the right border.",
          "Top edge: extensions and the channel bar can crowd the top ~80px.",
        ],
      },
      {
        h2: "Webcam frames: match the frame to the camera, not the canvas",
        paragraphs: [
          "The classic mistake is stretching a 16:9 frame over a 4:3 camera and wondering why the border doesn't line up. Check what your camera actually outputs (OBS shows it in the source properties), pick the matching frame from your pack, and size the camera to sit inside the frame's cutout — frame above camera in the source list.",
        ],
      },
      {
        h2: "Panels: small canvas, big first impression",
        paragraphs: [
          "Panels are locked to 320px wide, and they're the first thing a new viewer scrolls through when deciding whether to follow. A matched set — About, Schedule, Rules, Donate — in your overlay's art style reads as \"this channel has its act together\" before you've said a word. Most packs on [OverlayCraft](/overlays) ship panels in the same world as the screens for exactly that reason.",
        ],
      },
      {
        h2: "Streaming vertical? Different rules",
        paragraphs: [
          "TikTok Live and vertical streams flip the whole layout — chat and UI sit in different places, and a 16:9 overlay gets cropped. Use a purpose-built [TikTok overlay pack](/overlays/tiktok) composed for 9:16 instead of forcing a desktop overlay sideways.",
        ],
      },
    ],
    faq: [
      {
        question: "What size should a Twitch overlay be?",
        answer:
          "1920×1080 pixels, 16:9. It matches the default OBS/Streamlabs canvas and downscales cleanly to any streaming resolution.",
      },
      {
        question: "What size are Twitch panels?",
        answer:
          "320 pixels wide. Height is up to you — 40 to 100px works for header-style panels; taller is fine for image-heavy ones.",
      },
      {
        question: "What's the best file size for overlays?",
        answer:
          "Keep individual animated screens under ~50 MB and static graphics under a few MB. Smaller files load instantly and never stutter on scene switches.",
      },
    ],
    featuredPacks: [
      "dark-gothic-raven-animated-stream-package",
      "sakura-dream-wolf-overlay",
      "violet-night-dragon-overlay",
      "mystic-night-tiktok-overlay-package",
    ],
    related: [
      { label: "How to add an overlay to OBS", href: "/blog/how-to-add-overlay-to-obs" },
      { label: "Shop full 1920×1080 packs", href: "/overlays" },
      { label: "TikTok (vertical) overlay packs", href: "/overlays/tiktok" },
    ],
  },
  {
    slug: "animated-vs-static-stream-overlays",
    title: "Animated vs Static Stream Overlays: Which Actually Keeps Viewers?",
    metaTitle: "Animated vs Static Stream Overlays — What Retains Viewers",
    metaDescription:
      "Animated stream overlays out-retain static ones in the moments that matter: starting soon, BRB and raids. Here's why motion works, when it backfires, and what to pick.",
    date: "2026-07-17",
    keywords: [
      "animated stream overlay",
      "animated twitch overlay",
      "static vs animated overlay",
      "best animated overlays",
      "stream overlay retention",
      "twitch overlay",
    ],
    excerpt:
      "The screens where viewers decide to stay — starting soon, BRB, raid landings — are exactly the screens where motion earns its keep. And the one place animation can genuinely hurt you.",
    sections: [
      {
        h2: "The honest answer",
        paragraphs: [
          "Animated overlays win where viewers are waiting, static overlays are fine where viewers are watching. The distinction matters more than any aesthetic argument.",
          "When your gameplay is on screen, the game is the show — a static frame does its job. But on a Starting Soon screen, a BRB, or the moment a raid of 40 strangers lands on your channel, there is nothing else to look at. A frozen image says \"nothing is happening here.\" A scene with drifting petals, flickering candlelight or a breathing character says \"the stream is alive, stay put.\"",
        ],
      },
      {
        h2: "Why motion holds attention in the waiting moments",
        paragraphs: [
          "Human eyes are wired to track movement — it's the cheapest attention signal that exists. A subtle loop gives an idle viewer's eyes something to rest on, which makes the wait feel shorter than a static screen does. That's the whole mechanism. It doesn't need to be dramatic; it needs to not be dead.",
          "The practical difference shows up in the first 90 seconds of a stream. Viewers who arrive early sit on your Starting Soon screen. If it feels like a place — rain on a window, a cat asleep by a fire — waiting is comfortable. Browse the [animated overlay collection](/overlays) and you'll see every pack ships a preview video so you can judge the motion before you buy.",
        ],
      },
      {
        h2: "When animation backfires",
        list: [
          "Motion behind your face: a busy animated background directly behind your camera fights your own facial expressions for attention. Keep heavy motion on waiting screens, subtle motion in-game.",
          "Strobe-speed loops: fast flashing loops read as cheap and are genuinely hostile to photosensitive viewers. Slow is premium; fast is noise.",
          "Visible loop seams: a 3-second loop that visibly jumps every 3 seconds is worse than static. Good packs hide the seam with long, layered loops.",
        ],
      },
      {
        h2: "The hybrid setup most partners actually run",
        paragraphs: [
          "Animated: Starting Soon, BRB, Stream Ending, Offline, alerts. Static or near-static: in-game overlay and webcam frame, with at most a gentle glow. That's the layout every pack ships by default — from the atmospheric [gothic worlds](/overlays/gothic) to the comeback-energy [phoenix packs](/overlays/phoenix), full animation on every waiting screen, restraint where your content lives.",
        ],
      },
      {
        h2: "Performance: the objection that stopped being true",
        paragraphs: [
          "A looping video source costs almost nothing in OBS — it's decoded once and replayed, far lighter than a browser source polling a webpage. On any machine built in the last six or seven years, the difference between static and animated screens is invisible in your performance stats. The \"animated overlays cause dropped frames\" advice dates from a different hardware era.",
        ],
      },
    ],
    faq: [
      {
        question: "Do animated overlays use a lot of CPU?",
        answer:
          "No. A looping MP4/WebM media source is one of the lightest things OBS renders. If your setup streams your game fine, it streams animated screens fine.",
      },
      {
        question: "Should my webcam frame be animated?",
        answer:
          "Keep it subtle. Your face is the content — a soft glow or slow shimmer works, but heavy motion around the camera competes with you.",
      },
      {
        question: "What screens matter most to animate?",
        answer:
          "Starting Soon and BRB, because that's where viewers are actively deciding whether to wait. Alerts are second — motion makes every follow feel like an event.",
      },
    ],
    featuredPacks: [
      "dark-gothic-raven-animated-stream-package",
      "inferno-phoenix-overlay",
      "mystic-moonlight-snake-overlay",
      "sakura-dream-wolf-overlay",
    ],
    related: [
      { label: "Browse animated packs", href: "/overlays" },
      { label: "Gothic worlds for dark streams", href: "/overlays/gothic" },
      { label: "How to add an overlay to OBS", href: "/blog/how-to-add-overlay-to-obs" },
    ],
  },
  {
    slug: "kick-stream-overlay-guide",
    title: "Kick Stream Overlays: Setup Guide + What's Different From Twitch",
    metaTitle: "Kick Stream Overlay Guide 2026 — Setup & Twitch Differences",
    metaDescription:
      "Kick stream overlays use the same 1920×1080 files as Twitch — the differences are alerts, panels and where the UI sits. Full OBS setup guide for streaming on Kick.",
    date: "2026-07-17",
    keywords: [
      "kick stream overlay",
      "kick overlay setup",
      "kick stream package",
      "kick vs twitch overlay",
      "overlay for kick",
      "kick obs setup",
    ],
    excerpt:
      "Good news: your overlay files don't care which platform you stream to. What changes on Kick is alerts, panels, and a couple of UI quirks worth designing around.",
    sections: [
      {
        h2: "The core truth: overlays are platform-agnostic",
        paragraphs: [
          "An overlay lives in OBS, not on the platform. Kick receives whatever OBS outputs, exactly like Twitch does — so a 1920×1080 animated pack works identically on both. Every [pack in the catalog](/overlays) is tested against Twitch, YouTube and Kick for this reason. If you're simulcasting or migrating, your visual identity moves with you untouched.",
        ],
      },
      {
        h2: "Setting up your overlay for Kick in OBS",
        ordered: true,
        list: [
          "Add your animated screens as Media Sources (Loop on) and static graphics as Image sources — identical to a Twitch setup. Our [OBS overlay guide](/blog/how-to-add-overlay-to-obs) walks through every click.",
          "In OBS Settings → Stream, select Kick (or Custom RTMP with your Kick stream key from the Creator Dashboard).",
          "Keep the canvas at 1920×1080. Kick's player is 16:9, same as Twitch.",
          "Preview your scene with Kick's chat overlay in mind — on mobile, chat overlaps the lower right of the video more aggressively than Twitch's theatre mode.",
        ],
      },
      {
        h2: "What's actually different on Kick",
        list: [
          "Alerts: Kick doesn't have Twitch's native alert ecosystem — most streamers run alerts through third-party tools that provide a browser-source URL. Your pack's alert animations plug into those tools the same way.",
          "Panels: Kick's about section uses wider image support than Twitch's rigid 320px, but 320px panel sets still look clean and consistent there.",
          "Discoverability: Kick pushes previews of live streams harder — which means your Starting Soon screen is seen by more cold traffic. An animated, branded screen earns its keep even more there.",
        ],
      },
      {
        h2: "Do you need a separate Kick overlay?",
        paragraphs: [
          "No — and be suspicious of anyone selling you a \"Kick-specific\" version of the same files. What you might want is a second OBS scene collection if you simulcast with platform-specific alerts, but the art itself is one purchase, both platforms. Grab a [phoenix pack](/overlays/phoenix) or a [Japanese samurai world](/overlays/japanese) once and stream it anywhere.",
        ],
      },
    ],
    faq: [
      {
        question: "Do Twitch overlays work on Kick?",
        answer:
          "Yes, without modification. Overlays render in OBS before the video reaches any platform, so the same 1920×1080 files work on Twitch, Kick and YouTube.",
      },
      {
        question: "What size should a Kick overlay be?",
        answer: "1920×1080, 16:9 — the same as Twitch. Kick's player uses the standard widescreen ratio.",
      },
      {
        question: "How do alerts work on Kick?",
        answer:
          "Through third-party alert tools that give you a browser-source URL for OBS. Your pack's animated alert files upload into those tools just like on Twitch.",
      },
    ],
    featuredPacks: [
      "inferno-phoenix-overlay",
      "blue-phoenix-animated-stream-package",
      "dark-gothic-raven-animated-stream-package",
      "red-moon-samurai-overlay",
    ],
    related: [
      { label: "Packs tested for Kick", href: "/overlays" },
      { label: "Twitch overlay size guide", href: "/blog/twitch-overlay-size-guide" },
      { label: "Phoenix packs for comeback energy", href: "/overlays/phoenix" },
    ],
  },
  {
    slug: "vtuber-overlay-guide",
    title: "VTuber Overlays: How to Frame Your Model Like a Pro",
    metaTitle: "VTuber Overlay Guide 2026 — Frame Your Model & Scene Setup",
    metaDescription:
      "VTuber overlay setup: layer order for your model, transparent frames, chroma vs alpha, and choosing a scene world that makes a 2D model feel like it lives somewhere.",
    date: "2026-07-17",
    keywords: [
      "vtuber overlay",
      "vtuber stream setup",
      "vtuber twitch overlay",
      "anime stream overlay",
      "vtuber obs setup",
      "best vtuber overlays",
    ],
    excerpt:
      "Your model is the centerpiece — the overlay is the stage. Layer order, transparency, and the scene-mood trick that makes a 2D model feel like it lives somewhere.",
    sections: [
      {
        h2: "The VTuber layer stack",
        paragraphs: [
          "VTuber scenes have one extra layer regular streams don't: the model itself, usually captured from VTube Studio or similar via window capture or Spout. The order that works:",
        ],
        ordered: true,
        list: [
          "Alerts — top",
          "Foreground overlay elements (frames, petals drifting in front)",
          "Your model capture",
          "The animated scene / background overlay",
          "Game capture (if you're playing) — bottom, often inside a framed window",
        ],
      },
      {
        h2: "Transparency: alpha beats chroma",
        paragraphs: [
          "Capture your model with a transparent background whenever your software supports it (Spout2 output or a transparency-capable window capture) instead of green-screening. Chroma key eats fine details — hair edges, translucent fabrics — that alpha capture keeps. Save the green screen for when you have no alternative, and if you must key, key against a color absent from your model.",
        ],
      },
      {
        h2: "Why scene mood matters more for VTubers",
        paragraphs: [
          "A flesh-and-blood streamer's room gives their stream a setting for free. A VTuber floats in whatever you put behind them — which means the overlay isn't decoration, it's the entire physical world your character inhabits. A sakura storm, a neon alley, a candle-lit gothic study: pick the world that matches your character's lore and the whole stream reads as intentional.",
          "This is why atmosphere-heavy packs work so well for VTubers — the expressive motion language matches the model instead of fighting it. Browse the [anime collection](/overlays/anime) and the [Japanese worlds](/overlays/japanese) and imagine your model standing in each one.",
        ],
      },
      {
        h2: "Practical settings that keep your model crisp",
        list: [
          "Capture the model at its native resolution and scale down in OBS — never up.",
          "Keep heavy overlay motion away from the model's silhouette; put drifting elements to the sides or in far background.",
          "If your model idles subtly, pair it with a slow-loop scene — mismatched motion speeds (frantic background, calm model) feel wrong within seconds.",
          "Test your framing against chat overlays on mobile: models tend to stand right where mobile chat lives.",
        ],
      },
    ],
    faq: [
      {
        question: "What overlay style works best for VTubers?",
        answer:
          "Scene-based packs with expressive but slow motion — anime, sakura, gothic and cozy worlds. The overlay becomes your character's environment, so pick one that matches their lore.",
      },
      {
        question: "Should the overlay go in front of or behind my model?",
        answer:
          "Both. The scene sits behind the model; thin foreground elements (frames, drifting petals) can sit in front for depth. Alerts always render on top.",
      },
      {
        question: "Do I need a special VTuber overlay?",
        answer:
          "No — any well-made 1920×1080 animated pack works. What matters is choosing a world that suits your model and keeping busy motion off the model's silhouette.",
      },
    ],
    featuredPacks: [
      "red-moon-samurai-overlay",
      "sakura-dream-wolf-overlay",
      "red-moonrise-gear-animated-stream-package",
      "midnight-magic-cat-overlay",
    ],
    related: [
      { label: "Anime overlay packs", href: "/overlays/anime" },
      { label: "Japanese worlds — samurai & sakura", href: "/overlays/japanese" },
      { label: "Animated vs static overlays", href: "/blog/animated-vs-static-stream-overlays" },
    ],
  },
  {
    slug: "what-is-a-twitch-overlay",
    title: "What Is a Twitch Overlay? Everything a New Streamer Needs",
    metaTitle: "What Is a Twitch Overlay? Beginner's Guide + What to Buy First",
    metaDescription:
      "A Twitch overlay is the graphics layer on top of your stream: screens, frames, alerts and panels. What each piece does, what it costs, and what to get first.",
    date: "2026-07-17",
    keywords: [
      "what is a twitch overlay",
      "twitch overlay",
      "twitch overlay explained",
      "twitch overlay pack",
      "best twitch overlays",
      "new streamer setup",
      "stream overlay for beginners",
    ],
    excerpt:
      "Every piece of a stream package explained in plain language — what screens, frames, alerts and panels actually do, and the order a new streamer should get them in.",
    sections: [
      {
        h2: "The plain-language definition",
        paragraphs: [
          "A Twitch overlay is every graphic layered on top of your raw video: the frame around your webcam, the Starting Soon screen before you go live, the animation that plays when someone follows, the panels below your player. Together they're usually sold as a stream package — one matched visual identity for your whole channel.",
        ],
      },
      {
        h2: "What's inside a full stream package",
        table: {
          head: ["Piece", "What it does", "When viewers see it"],
          rows: [
            ["Starting Soon screen", "Holds early arrivals while you set up", "Before you go live"],
            ["BRB screen", "Covers breaks without dead air", "Mid-stream breaks"],
            ["Stream Ending screen", "Closes the show, points to socials", "End of stream"],
            ["Offline banner", "Your storefront when you're not live", "Channel page, 24/7"],
            ["Webcam frame", "Frames your camera in the scene", "Whole stream"],
            ["In-game overlay", "HUD elements around gameplay", "While playing"],
            ["Alerts", "Celebrates follows, subs, raids", "Live events"],
            ["Panels", "About/Schedule/Rules under the player", "Channel page"],
          ],
        },
      },
      {
        h2: "Why overlays matter more for small streamers",
        paragraphs: [
          "Big streamers get the benefit of the doubt; small streamers get about eight seconds of it. A new viewer landing on a channel with 4 viewers and a matched, animated identity reads it as \"this person takes this seriously\" — and stays long enough to find out if that's true. The overlay can't make your content good, but it buys your content the audition.",
        ],
      },
      {
        h2: "Free vs premium vs custom: honest trade-offs",
        list: [
          "Free overlays: fine for week one. The catch is that thousands of channels run the same file, so you look like a default skin.",
          "Premium packs ($5–$30): a designed world, animated screens, matched panels — the sweet spot for most streamers. That's what the [OverlayCraft catalog](/overlays) is: 127 worlds, real preview videos, instant download.",
          "Custom commissions ($100–$400+): your own character, palette and full brand — emotes, badges, mascot. Worth it once your channel has an identity worth building around — start a brief on the [custom overlays page](/custom).",
        ],
      },
      {
        h2: "What to get first (if budget is tight)",
        ordered: true,
        list: [
          "A Starting Soon + BRB pair — the screens where viewers wait, and where animation earns the most.",
          "A webcam frame — the single most-seen graphic on your whole stream.",
          "Alerts — every follow becomes a small on-screen event.",
          "Panels — polish for your channel page once the live experience looks right.",
        ],
      },
    ],
    faq: [
      {
        question: "How much does a Twitch overlay cost?",
        answer:
          "Free templates exist; designed animated packs typically run $5–$30; fully custom brands run $100–$400+. Most streamers are best served by a premium pack until their channel outgrows it.",
      },
      {
        question: "Do overlays work on YouTube and Kick too?",
        answer:
          "Yes — overlays live in OBS, not on the platform. The same files work for Twitch, YouTube, Kick and TikTok Live (vertical packs exist for TikTok).",
      },
      {
        question: "Can I set up an overlay with no design skills?",
        answer:
          "Yes. Packs come as ready files — you drag them into OBS as sources, tick Loop on the animated ones, and you're live. No editing software involved.",
      },
    ],
    featuredPacks: [
      "dark-gothic-raven-animated-stream-package",
      "cozy-fox-overlay-animated-stream-package",
      "midnight-magic-cat-overlay",
      "inferno-phoenix-overlay",
    ],
    related: [
      { label: "Browse all 127 packs", href: "/overlays" },
      { label: "How to add an overlay to OBS", href: "/blog/how-to-add-overlay-to-obs" },
      { label: "Custom commissions from $100", href: "/custom" },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

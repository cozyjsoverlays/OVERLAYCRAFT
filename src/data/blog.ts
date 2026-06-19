import type { BlogPost } from "@/lib/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "set-up-stream-overlay-obs-5-minutes",
    title: "How to Set Up Your Stream Overlay in OBS in Under 5 Minutes",
    excerpt:
      "A no-fluff walkthrough for adding your animated CozyOverlays pack to OBS Studio — browser sources, sizing, and the one toggle most people miss.",
    date: "Jun 10, 2026",
    readingTime: "4 min read",
    tag: "Tutorial",
    body: [
      {
        paragraphs: [
          "You just downloaded a cozy new overlay pack and you want it live before your next stream. Good news: getting animated overlays into OBS is genuinely a five-minute job once you know the steps. Here's the fast path.",
        ],
      },
      {
        heading: "1. Unzip everything first",
        paragraphs: [
          "Every CozyOverlays pack arrives as a single .zip from Etsy. Right-click and extract it to a folder you'll remember — your Documents or a dedicated 'Stream' folder works great. Inside you'll find animated .WEBM files (with transparency) and matching .PNG versions for tools that prefer static images.",
        ],
      },
      {
        heading: "2. Add an animated screen as a Media Source",
        paragraphs: [
          "In OBS, click the + under Sources and choose Media Source. Point it at the .WEBM screen you want — your Starting Soon, BRB, or main overlay. Tick 'Loop' so it plays continuously, and you're done. The transparency is baked in, so it layers cleanly over your camera and game capture.",
          "Prefer browser sources? Those work too, but for local .WEBM files a Media Source is the simplest, lowest-overhead option.",
        ],
      },
      {
        heading: "3. Size it to the canvas",
        paragraphs: [
          "Drag the corner handles to fill your canvas (hold Alt to crop instead of stretch). The packs are exported at full HD, so they snap to a 1920×1080 scene without getting soft.",
        ],
      },
      {
        heading: "4. The toggle most people miss",
        paragraphs: [
          "If your animation looks like it's stuttering, open the Media Source properties and make sure hardware decoding is enabled. It smooths playback dramatically on most machines and costs you almost nothing in performance.",
          "That's it — loop on, sized to canvas, hardware decode on. Go live.",
        ],
      },
    ],
  },
  {
    slug: "pick-the-right-stream-overlay-for-your-personality",
    title: "How to Pick the Right Stream Overlay for Your Personality",
    excerpt:
      "Your overlay is the first thing a new viewer feels before they hear a word. Here's how to choose a vibe that actually matches you.",
    date: "Jun 6, 2026",
    readingTime: "5 min read",
    tag: "Guide",
    body: [
      {
        paragraphs: [
          "An overlay isn't just decoration — it's the mood of your channel. Before a viewer hears your voice or sees your gameplay, they've already absorbed a feeling from your screen. So the question isn't 'what looks cool,' it's 'what feels like me.'",
        ],
      },
      {
        heading: "Start with your energy, not your game",
        paragraphs: [
          "Cozy, late-night, lofi streamers gravitate toward warm palettes and slow, drifting animation — think the Cat Forest or Wolf Train packs. High-energy variety streamers can carry bolder, more dramatic scenes like Moonlit Samurai. Pick the tempo of your animation to match the tempo of your stream.",
        ],
      },
      {
        heading: "Let one motif do the talking",
        paragraphs: [
          "The strongest channel brands lean on a single recurring character or theme. A blossom-and-dragon world. A cozy cat in the woods. When your overlay, emotes, and panels all share one motif, your channel becomes instantly recognizable on a busy directory page.",
        ],
      },
      {
        heading: "Think about what's around it",
        paragraphs: [
          "Your facecam, alerts, and chat box all sit on top of the overlay. Busy backgrounds fight with busy gameplay. If you play visually loud games, a softer overlay keeps the screen readable; if you do Just Chatting or lofi, you can afford more atmosphere.",
        ],
      },
      {
        heading: "When in doubt, go cozy",
        paragraphs: [
          "Cozy reads as welcoming, and welcoming keeps viewers in the room. That's the whole idea behind every CozyOverlays pack: warm enough to feel like home, polished enough to look pro.",
        ],
      },
    ],
  },
  {
    slug: "inside-the-cat-forest-pack",
    title: "Inside the Cat Forest Pack — Every Asset Explained",
    excerpt:
      "A guided tour of one of our most-loved packs: every screen, alert, panel, and emote, and how to use each one.",
    date: "Jun 2, 2026",
    readingTime: "6 min read",
    tag: "Pack Deep-Dive",
    body: [
      {
        paragraphs: [
          "The Cat Forest pack is one of those designs people buy and then message us about weeks later, still happy. Let's open it up and look at exactly what's inside and how each piece earns its place on your stream.",
        ],
      },
      {
        heading: "The animated screens",
        paragraphs: [
          "You get a full set of full-screen scenes: Starting Soon, Be Right Back, Stream Ending, and an in-stream main overlay. Each is a looping .WEBM with soft glowing light filtering through the trees and the forest cats drifting gently in the frame. They set the tone before you've said a word.",
        ],
      },
      {
        heading: "Alerts",
        paragraphs: [
          "Follow, sub, and donation alerts are themed to match — quick, readable, and never so loud they pull focus from your content. Drop them into your alert tool of choice and they slot right into the world.",
        ],
      },
      {
        heading: "Panels",
        paragraphs: [
          "A matching set of profile panels (About, Schedule, Socials, Donate, and more) so your offline page looks as intentional as your live one. This is the detail reviewers keep calling out — a tidy panel row makes a channel feel established.",
        ],
      },
      {
        heading: "Emotes",
        paragraphs: [
          "Custom forest-cat emotes give your chat a way to speak in your channel's language. They're exported at the sizes Twitch and other platforms expect, so uploading is painless.",
        ],
      },
      {
        heading: "Putting it together",
        paragraphs: [
          "Start with the main overlay and one screen, get those looking right, then layer in alerts and panels. Within an afternoon you'll have a channel that feels like a single, cohesive cozy world.",
        ],
      },
    ],
  },
  {
    slug: "5-things-every-new-streamer-should-set-up",
    title: "5 Things Every New Streamer Should Set Up Before Going Live",
    excerpt:
      "Before you hit that button for the first time, these five basics will make your stream look and feel like you've done it for years.",
    date: "May 29, 2026",
    readingTime: "5 min read",
    tag: "Guide",
    body: [
      {
        paragraphs: [
          "Going live for the first time is exciting and a little terrifying. The good news: a handful of setup choices separate a stream that feels amateur from one that feels intentional. Here are the five we'd prioritize.",
        ],
      },
      {
        heading: "1. A cohesive overlay set",
        paragraphs: [
          "Mismatched free assets read as exactly that. A single coordinated pack — overlay, alerts, panels, and emotes that share one look — instantly makes your channel feel like a brand instead of a default scene.",
        ],
      },
      {
        heading: "2. Clean audio",
        paragraphs: [
          "Viewers forgive mediocre video far more than bad audio. A basic noise-suppression filter in OBS and a mic that isn't your laptop's built-in will do more for retention than any graphics upgrade.",
        ],
      },
      {
        heading: "3. Starting Soon and BRB screens",
        paragraphs: [
          "These give you a buffer to fix things, greet early viewers, and step away without dead air. Every CozyOverlays pack includes animated versions so even your pauses look polished.",
        ],
      },
      {
        heading: "4. Alerts that match",
        paragraphs: [
          "Follow and sub alerts are little dopamine hits for you and your chat. Themed alerts that match your overlay keep the whole experience consistent.",
        ],
      },
      {
        heading: "5. Filled-out panels",
        paragraphs: [
          "Your offline page is your storefront. A row of matching panels — schedule, socials, about — tells visitors you're serious and gives them a reason to follow before you're even live.",
        ],
      },
    ],
  },
  {
    slug: "story-behind-the-dragon-sakura-pack",
    title: "The Story Behind the Dragon Sakura Pack",
    excerpt:
      "Our bestselling design started as a single sketch of a dragon under falling petals. Here's how it became a fan favorite.",
    date: "May 24, 2026",
    readingTime: "4 min read",
    tag: "Behind the Scenes",
    body: [
      {
        paragraphs: [
          "Some packs are designed; others arrive almost fully formed. Dragon Sakura was the second kind. It began as one quiet sketch — a lofi dragon curled beneath cherry blossoms — and that single image carried the whole pack.",
        ],
      },
      {
        heading: "The mood came first",
        paragraphs: [
          "We wanted something that felt majestic without being intimidating. Dragons usually read as fierce; pairing one with the softness of falling sakura flipped the expectation into something calm and cozy. That contrast is the entire personality of the pack.",
        ],
      },
      {
        heading: "Making it move",
        paragraphs: [
          "The animation is deliberately slow — drifting petals, a gentle ambient glow, the smallest motion in the scene. On a live stream, subtle movement reads as 'alive' without ever distracting from the streamer. Getting that balance right took the most iteration.",
        ],
      },
      {
        heading: "Why it resonates",
        paragraphs: [
          "It turned out a lot of streamers were looking for exactly that mix of fantasy and warmth. Reviewers keep using the same words — 'adorable,' 'fun theme,' 'everything you need.' It's become our bestseller, and honestly, it's still one of our favorites to look at.",
        ],
      },
    ],
  },
  {
    slug: "use-stream-overlays-on-tiktok-live",
    title: "How to Use Stream Overlays on TikTok Live",
    excerpt:
      "TikTok Live plays by different rules than Twitch. Here's how to make a cozy overlay look great in a vertical, mobile-first world.",
    date: "May 20, 2026",
    readingTime: "5 min read",
    tag: "Tutorial",
    body: [
      {
        paragraphs: [
          "TikTok Live is a different animal from Twitch or YouTube. It's vertical, it's mobile-first, and the interface eats into your screen in ways desktop platforms don't. A little planning makes your overlay shine instead of getting buried.",
        ],
      },
      {
        heading: "Go live from a computer with OBS",
        paragraphs: [
          "To use custom overlays on TikTok Live, you'll generally stream from a desktop using OBS and TikTok's LIVE Studio or a stream key. That's what lets you composite your animated screens, camera, and game capture into one scene — exactly like you would on Twitch.",
        ],
      },
      {
        heading: "Mind the vertical safe zone",
        paragraphs: [
          "TikTok's vertical layout places comments, gifts, and UI along the bottom and right edges. Keep your key visuals and any text in the upper-center of the frame so the app's interface doesn't cover them. Our TikTok-oriented sets are built with this safe zone in mind.",
        ],
      },
      {
        heading: "Keep motion gentle",
        paragraphs: [
          "On a small phone screen, busy animation turns to noise fast. The cozy, slow-drift style of CozyOverlays packs actually works in your favor here — it stays readable at thumbnail size and on a moving feed.",
        ],
      },
      {
        heading: "Test before you go live",
        paragraphs: [
          "Do a private test stream and watch it back on your phone. What looks balanced on a 27-inch monitor can feel cramped on mobile. Adjust, then go live with confidence.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

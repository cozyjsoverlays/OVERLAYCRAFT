export interface RewardIdea {
  name: string;
  category: string;
  cost: number;
  note?: string;
}

/** Cozy-streamer channel-point reward ideas. Costs are starting suggestions. */
export const REWARD_IDEAS: RewardIdea[] = [
  // Cozy & wholesome
  { name: "Pick the next lofi track", category: "Cozy", cost: 500 },
  { name: "Add a song to the cozy playlist", category: "Cozy", cost: 750 },
  { name: "Light a candle on stream", category: "Cozy", cost: 300 },
  { name: "Pet the stream cat (cam)", category: "Cozy", cost: 400 },
  { name: "Choose the room ambience (rain/fire/cafe)", category: "Cozy", cost: 600 },
  { name: "Tea break — host picks the flavor", category: "Cozy", cost: 1000 },

  // Interaction
  { name: "Hydrate! (streamer drinks water)", category: "Interaction", cost: 200 },
  { name: "Posture check", category: "Interaction", cost: 200 },
  { name: "Read my message aloud", category: "Interaction", cost: 500 },
  { name: "Give me a compliment", category: "Interaction", cost: 250 },
  { name: "Tell a bad pun", category: "Interaction", cost: 400 },
  { name: "Share a cozy recommendation (book/show/game)", category: "Interaction", cost: 600 },

  // Gameplay
  { name: "Choose my next game", category: "Gameplay", cost: 2000 },
  { name: "Name my next character / pet", category: "Gameplay", cost: 1500 },
  { name: "Hardcore mode for 10 minutes", category: "Gameplay", cost: 2500 },
  { name: "No-hints run challenge", category: "Gameplay", cost: 2000 },
  { name: "Play a viewer's favorite cozy game", category: "Gameplay", cost: 3000 },

  // Overlay & visuals
  { name: "Swap to a different overlay theme", category: "Overlay", cost: 1500 },
  { name: "Trigger the confetti/petal alert", category: "Overlay", cost: 500 },
  { name: "Change the webcam frame for the session", category: "Overlay", cost: 1200 },
  { name: "Highlight my name in chat", category: "Overlay", cost: 800 },

  // Community
  { name: "Add a word to the channel dictionary", category: "Community", cost: 1000 },
  { name: "Suggest a sub-goal reward", category: "Community", cost: 1500 },
  { name: "Pick the next emote to design", category: "Community", cost: 5000 },
  { name: "VIP for a day", category: "Community", cost: 10000 },
  { name: "Shoutout a small streamer you love", category: "Community", cost: 2000 },
];

export const REWARD_CATEGORIES = [
  "All",
  ...Array.from(new Set(REWARD_IDEAS.map((r) => r.category))),
];

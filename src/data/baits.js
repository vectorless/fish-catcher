// Bait types. v1 does NOT consume bait — equip-and-keep, like rod choice.
//
// biteDelayMult — multiplies the random 1.5s..5s wait before a bite.
// rarityBias — multiplies each species' base rarity weight at bite-roll time.

export const BAITS = {
  worm: {
    id: 'worm', name: 'Earthworm', price: 0,
    biteDelayMult: 1.0,
    rarityBias: { common: 1.2, uncommon: 1.0, rare: 0.6, epic: 0.3, legendary: 0.1, godlike: 0 },
    color: 0xa8556e,
    blurb: 'Cheap, reliable, attracts the small stuff.'
  },
  minnow: {
    id: 'minnow', name: 'Live Minnow', price: 40,
    biteDelayMult: 0.85,
    rarityBias: { common: 0.8, uncommon: 1.4, rare: 1.0, epic: 0.7, legendary: 0.4, godlike: 0.05 },
    color: 0xc8d2da,
    blurb: 'Faster bites, broader appeal.'
  },
  lure: {
    id: 'lure', name: 'Shiny Lure', price: 120,
    biteDelayMult: 1.0,
    rarityBias: { common: 0.5, uncommon: 1.5, rare: 1.5, epic: 1.2, legendary: 0.8, godlike: 0.1 },
    color: 0xffd24a,
    blurb: 'The big ones notice it.'
  },
  jig: {
    id: 'jig', name: 'Deep Jig', price: 250,
    biteDelayMult: 1.1,
    rarityBias: { common: 0.2, uncommon: 1.0, rare: 3.0, epic: 2.0, legendary: 1.2, godlike: 0.3 },
    color: 0x6ea8ff,
    blurb: 'Skip the small fry. Hunt rares and epics.'
  },
  glow: {
    id: 'glow', name: 'Bioluminescent Lure', price: 800,
    biteDelayMult: 0.95,
    rarityBias: { common: 0.1, uncommon: 0.7, rare: 3.5, epic: 4.0, legendary: 2.5, godlike: 0.8 },
    color: 0xc466ff,
    blurb: 'Glows in the abyss. Calls the giants.'
  },
  ambrosia: {
    id: 'ambrosia', name: 'Ambrosia Lure', price: 2500,
    biteDelayMult: 0.7,
    rarityBias: { common: 0.05, uncommon: 0.4, rare: 4.5, epic: 6.0, legendary: 5.0, godlike: 1.5 },
    color: 0xffd24a,
    blurb: 'Sweet enough to lure legends from the deep.'
  },
  starbait: {
    id: 'starbait', name: 'Star Bait', price: 8000,
    biteDelayMult: 0.6,
    rarityBias: { common: 0.02, uncommon: 0.3, rare: 4.0, epic: 7.5, legendary: 7.0, godlike: 3.0 },
    color: 0x88ffff,
    blurb: 'Compressed starlight. Faster bites and a serious epic bias.'
  },
  singing: {
    id: 'singing', name: 'Singing Lure', price: 25000,
    biteDelayMult: 0.55,
    rarityBias: { common: 0.01, uncommon: 0.2, rare: 3.0, epic: 8.0, legendary: 10.0, godlike: 6.0 },
    color: 0xc466ff,
    blurb: 'Hums a chord that fish hear from a half-mile out.'
  },
  soulhook: {
    id: 'soulhook', name: 'Soulhook', price: 80000,
    biteDelayMult: 0.5,
    rarityBias: { common: 0.005, uncommon: 0.15, rare: 2.5, epic: 9.0, legendary: 14.0, godlike: 12.0 },
    color: 0xff66aa,
    blurb: 'Hooks something subtler than a mouth. Legendaries practically queue up.'
  },
  reality_hook: {
    id: 'reality_hook', name: 'Reality Hook', price: 250000,
    biteDelayMult: 0.45,
    rarityBias: { common: 0.002, uncommon: 0.08, rare: 2.0, epic: 9.0, legendary: 16.0, godlike: 22.0 },
    color: 0xffeeff,
    blurb: 'A hook that exists only when a fish is biting it.'
  },
  wishbait: {
    id: 'wishbait', name: 'Wishbait', price: 1000000,
    biteDelayMult: 0.4,
    rarityBias: { common: 0.001, uncommon: 0.05, rare: 1.5, epic: 8.0, legendary: 18.0, godlike: 45.0 },
    color: 0xffd24a,
    blurb: 'Whatever you most want is, briefly, what bites.'
  }
};

export const BAIT_ORDER = [
  'worm', 'minnow', 'lure', 'jig', 'glow', 'ambrosia',
  'starbait', 'singing', 'soulhook', 'reality_hook', 'wishbait'
];

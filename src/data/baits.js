// Bait types. v1 does NOT consume bait — equip-and-keep, like rod choice.
//
// biteDelayMult — multiplies the random 1.5s..5s wait before a bite.
// rarityBias — multiplies each species' base rarity weight at bite-roll time.

export const BAITS = {
  worm: {
    id: 'worm', name: 'Earthworm', price: 0,
    biteDelayMult: 1.0,
    rarityBias: { common: 1.2, uncommon: 1.0, rare: 0.6, epic: 0.3, legendary: 0.1 },
    color: 0xa8556e,
    blurb: 'Cheap, reliable, attracts the small stuff.'
  },
  minnow: {
    id: 'minnow', name: 'Live Minnow', price: 40,
    biteDelayMult: 0.85,
    rarityBias: { common: 0.8, uncommon: 1.4, rare: 1.0, epic: 0.7, legendary: 0.4 },
    color: 0xc8d2da,
    blurb: 'Faster bites, broader appeal.'
  },
  lure: {
    id: 'lure', name: 'Shiny Lure', price: 120,
    biteDelayMult: 1.0,
    rarityBias: { common: 0.5, uncommon: 1.5, rare: 1.5, epic: 1.2, legendary: 0.8 },
    color: 0xffd24a,
    blurb: 'The big ones notice it.'
  },
  jig: {
    id: 'jig', name: 'Deep Jig', price: 250,
    biteDelayMult: 1.1,
    rarityBias: { common: 0.2, uncommon: 1.0, rare: 3.0, epic: 2.0, legendary: 1.2 },
    color: 0x6ea8ff,
    blurb: 'Skip the small fry. Hunt rares and epics.'
  },
  glow: {
    id: 'glow', name: 'Bioluminescent Lure', price: 800,
    biteDelayMult: 0.95,
    rarityBias: { common: 0.1, uncommon: 0.7, rare: 3.5, epic: 4.0, legendary: 2.5 },
    color: 0xc466ff,
    blurb: 'Glows in the abyss. Calls the giants.'
  }
};

export const BAIT_ORDER = ['worm', 'minnow', 'lure', 'jig', 'glow'];

// Hand-authored species. Each fish has a body sprite spec used both for
// the swimming silhouettes under water in DockScene and the fishdex card.
// Rarity weights: common=10, uncommon=3, rare=1 (multiplied by bait.rarityBias).

export const RARITY_WEIGHT = {
  common: 14, uncommon: 3, rare: 0.6, epic: 0.12, legendary: 0.04
};

export const RARITY_COLOR = {
  common: '#dfe6ed',
  uncommon: '#7fc8ff',
  rare: '#ffd24a',
  epic: '#c466ff',
  legendary: '#ff7a3a'
};

export const FISH = {
  // --- Pond ---------------------------------------------------------------
  bluegill: {
    id: 'bluegill', name: 'Bluegill', zoneIds: ['pond'],
    rarity: 'common', value: 8,
    body: { w: 28, h: 14, color: 0x4a7da3, accent: 0xfff2a8 }
  },
  sunfish: {
    id: 'sunfish', name: 'Sunfish', zoneIds: ['pond'],
    rarity: 'common', value: 12,
    body: { w: 26, h: 16, color: 0xe09a3a, accent: 0xffd47a }
  },
  catfish: {
    id: 'catfish', name: 'Channel Catfish', zoneIds: ['pond'],
    rarity: 'uncommon', value: 35,
    body: { w: 42, h: 14, color: 0x5a4a3a, accent: 0x8e7a5e }
  },
  old_boot: {
    id: 'old_boot', name: 'Old Boot', zoneIds: ['pond'],
    rarity: 'common', value: 2,
    body: { w: 24, h: 18, color: 0x2a1f14, accent: 0x4a3a28 }
  },
  crawdad: {
    id: 'crawdad', name: 'Crawdad', zoneIds: ['pond'],
    rarity: 'common', value: 16,
    body: { w: 22, h: 14, color: 0x9c4a3a, accent: 0xc06a4a }
  },
  bullfrog: {
    id: 'bullfrog', name: 'Bullfrog', zoneIds: ['pond'],
    rarity: 'uncommon', value: 32,
    body: { w: 24, h: 18, color: 0x5a8a3a, accent: 0xc8d27e }
  },
  minnow_swarm: {
    id: 'minnow_swarm', name: 'Minnow Swarm', zoneIds: ['pond'],
    rarity: 'common', value: 14,
    body: { w: 18, h: 8, color: 0xc8d2da, accent: 0x6ea8c8 }
  },
  snapping_turtle: {
    id: 'snapping_turtle', name: 'Snapping Turtle', zoneIds: ['pond'],
    rarity: 'uncommon', value: 60,
    body: { w: 32, h: 22, color: 0x4a5a2a, accent: 0x6e8a3a }
  },
  channel_eel: {
    id: 'channel_eel', name: 'Channel Eel', zoneIds: ['pond'],
    rarity: 'rare', value: 280,
    body: { w: 64, h: 8, color: 0x3a4a3a, accent: 0x6e7a3a }
  },

  // --- River --------------------------------------------------------------
  trout: {
    id: 'trout', name: 'Rainbow Trout', zoneIds: ['river'],
    rarity: 'common', value: 18,
    body: { w: 36, h: 12, color: 0x5fa07a, accent: 0xff8a6e }
  },
  smallmouth: {
    id: 'smallmouth', name: 'Smallmouth Bass', zoneIds: ['river'],
    rarity: 'uncommon', value: 45,
    body: { w: 38, h: 16, color: 0x6e7a3a, accent: 0xc8b04e }
  },
  pike: {
    id: 'pike', name: 'Northern Pike', zoneIds: ['river'],
    rarity: 'rare', value: 130,
    body: { w: 56, h: 12, color: 0x4a6a4a, accent: 0xc8d27e }
  },
  sturgeon: {
    id: 'sturgeon', name: 'Sturgeon', zoneIds: ['river'],
    rarity: 'rare', value: 200,
    body: { w: 60, h: 14, color: 0x3a4a5a, accent: 0x7a8a9a }
  },
  crayfish: {
    id: 'crayfish', name: 'Crayfish', zoneIds: ['river'],
    rarity: 'common', value: 22,
    body: { w: 26, h: 14, color: 0x8a3a3a, accent: 0xc06a4a }
  },
  salmon: {
    id: 'salmon', name: 'King Salmon', zoneIds: ['river'],
    rarity: 'rare', value: 250,
    body: { w: 50, h: 14, color: 0xc06a4a, accent: 0xc8d27e }
  },
  mayfly_larva: {
    id: 'mayfly_larva', name: 'Mayfly Larva', zoneIds: ['river'],
    rarity: 'common', value: 18,
    body: { w: 16, h: 6, color: 0x6a4a3a, accent: 0xc8a85a }
  },
  river_otter: {
    id: 'river_otter', name: 'River Otter', zoneIds: ['river'],
    rarity: 'uncommon', value: 80,
    body: { w: 36, h: 14, color: 0x6a4a2a, accent: 0x9c8a5a }
  },
  alligator_gar: {
    id: 'alligator_gar', name: 'Alligator Gar', zoneIds: ['river'],
    rarity: 'rare', value: 380,
    body: { w: 60, h: 10, color: 0x4a4a3a, accent: 0x8a8a5a }
  },

  // --- Ocean --------------------------------------------------------------
  mackerel: {
    id: 'mackerel', name: 'Mackerel', zoneIds: ['ocean'],
    rarity: 'common', value: 28,
    body: { w: 32, h: 12, color: 0x3a6a8a, accent: 0xc8e0f0 }
  },
  snapper: {
    id: 'snapper', name: 'Red Snapper', zoneIds: ['ocean'],
    rarity: 'uncommon', value: 75,
    body: { w: 34, h: 16, color: 0xc04a3a, accent: 0xff8a7a }
  },
  tuna: {
    id: 'tuna', name: 'Yellowfin Tuna', zoneIds: ['ocean'],
    rarity: 'rare', value: 280,
    body: { w: 50, h: 18, color: 0x2a4a6e, accent: 0xffd24a }
  },
  marlin: {
    id: 'marlin', name: 'Blue Marlin', zoneIds: ['ocean'],
    rarity: 'rare', value: 480,
    body: { w: 70, h: 14, color: 0x1f3a6e, accent: 0x6ec8ff }
  },
  sardine: {
    id: 'sardine', name: 'Sardine', zoneIds: ['ocean'],
    rarity: 'common', value: 18,
    body: { w: 22, h: 10, color: 0xc8d2da, accent: 0x6ea8c8 }
  },
  swordfish: {
    id: 'swordfish', name: 'Swordfish', zoneIds: ['ocean'],
    rarity: 'rare', value: 360,
    body: { w: 64, h: 12, color: 0x4a6a8a, accent: 0xc8d2da }
  },
  pufferfish: {
    id: 'pufferfish', name: 'Pufferfish', zoneIds: ['ocean'],
    rarity: 'common', value: 24,
    body: { w: 24, h: 24, color: 0xc8a85a, accent: 0x4a3a1e }
  },
  barracuda: {
    id: 'barracuda', name: 'Barracuda', zoneIds: ['ocean'],
    rarity: 'uncommon', value: 90,
    body: { w: 46, h: 10, color: 0x9aaeba, accent: 0x4a5a6a }
  },
  great_white: {
    id: 'great_white', name: 'Great White Shark', zoneIds: ['ocean'],
    rarity: 'rare', value: 600,
    body: { w: 78, h: 20, color: 0x6a7a8a, accent: 0xc8d2da }
  },
  kraken: {
    id: 'kraken', name: 'Kraken', zoneIds: ['ocean'],
    rarity: 'legendary', value: 9000,
    body: { w: 120, h: 28, color: 0x6a3a4a, accent: 0x1a1a2e }
  },

  // --- Coral Reef ---------------------------------------------------------
  clownfish: {
    id: 'clownfish', name: 'Clownfish', zoneIds: ['reef'],
    rarity: 'common', value: 40,
    body: { w: 22, h: 16, color: 0xff8a3a, accent: 0xffffff }
  },
  angelfish: {
    id: 'angelfish', name: 'Queen Angelfish', zoneIds: ['reef'],
    rarity: 'uncommon', value: 110,
    body: { w: 26, h: 22, color: 0xffd24a, accent: 0x4a4a8a }
  },
  lionfish: {
    id: 'lionfish', name: 'Lionfish', zoneIds: ['reef'],
    rarity: 'rare', value: 380,
    body: { w: 34, h: 20, color: 0xc04a3a, accent: 0xfff15a }
  },
  manta_ray: {
    id: 'manta_ray', name: 'Manta Ray', zoneIds: ['reef'],
    rarity: 'epic', value: 1400,
    body: { w: 80, h: 18, color: 0x1a3a52, accent: 0x6ec9ff }
  },
  octopus: {
    id: 'octopus', name: 'Octopus', zoneIds: ['reef'],
    rarity: 'uncommon', value: 95,
    body: { w: 30, h: 22, color: 0xc04a8a, accent: 0xff8aaa }
  },
  sea_turtle: {
    id: 'sea_turtle', name: 'Sea Turtle', zoneIds: ['reef'],
    rarity: 'rare', value: 500,
    body: { w: 50, h: 28, color: 0x4a8a4a, accent: 0xc8d27e }
  },
  damselfish: {
    id: 'damselfish', name: 'Damselfish', zoneIds: ['reef'],
    rarity: 'common', value: 35,
    body: { w: 20, h: 14, color: 0x4a8acc, accent: 0xfff15a }
  },
  moray: {
    id: 'moray', name: 'Moray Eel', zoneIds: ['reef'],
    rarity: 'uncommon', value: 130,
    body: { w: 64, h: 10, color: 0x4a6a3a, accent: 0xc8a85a }
  },
  reef_shark: {
    id: 'reef_shark', name: 'Reef Shark', zoneIds: ['reef'],
    rarity: 'rare', value: 600,
    body: { w: 60, h: 16, color: 0x6a8aa8, accent: 0xc8d2da }
  },
  leviathan: {
    id: 'leviathan', name: 'Leviathan', zoneIds: ['reef'],
    rarity: 'legendary', value: 12000,
    body: { w: 140, h: 30, color: 0x1a4a6a, accent: 0xc466ff }
  },

  // --- Abyss --------------------------------------------------------------
  lanternfish: {
    id: 'lanternfish', name: 'Lanternfish', zoneIds: ['abyss'],
    rarity: 'common', value: 70,
    body: { w: 22, h: 12, color: 0x4a4a6a, accent: 0xfff15a }
  },
  gulper_eel: {
    id: 'gulper_eel', name: 'Gulper Eel', zoneIds: ['abyss'],
    rarity: 'uncommon', value: 240,
    body: { w: 58, h: 10, color: 0x1a1a2e, accent: 0xc066ff }
  },
  viperfish: {
    id: 'viperfish', name: 'Viperfish', zoneIds: ['abyss'],
    rarity: 'rare', value: 700,
    body: { w: 44, h: 12, color: 0x2e3a4a, accent: 0xff5a3a }
  },
  anglerfish: {
    id: 'anglerfish', name: 'Anglerfish', zoneIds: ['abyss'],
    rarity: 'rare', value: 900,
    body: { w: 42, h: 24, color: 0x1a2a3a, accent: 0xfff15a }
  },
  giant_squid: {
    id: 'giant_squid', name: 'Giant Squid', zoneIds: ['abyss'],
    rarity: 'epic', value: 2200,
    body: { w: 70, h: 20, color: 0x6a3a4a, accent: 0xc08a4a }
  },
  megalodon: {
    id: 'megalodon', name: 'Megalodon', zoneIds: ['abyss'],
    rarity: 'epic', value: 5500,
    body: { w: 110, h: 24, color: 0x3a4a5a, accent: 0xc8d2da }
  },
  isopod: {
    id: 'isopod', name: 'Giant Isopod', zoneIds: ['abyss'],
    rarity: 'common', value: 110,
    body: { w: 28, h: 18, color: 0xc4a4d6, accent: 0x6a4a8a }
  },
  vampire_squid: {
    id: 'vampire_squid', name: 'Vampire Squid', zoneIds: ['abyss'],
    rarity: 'uncommon', value: 320,
    body: { w: 42, h: 22, color: 0x4a1a2e, accent: 0xc066ff }
  },
  coelacanth: {
    id: 'coelacanth', name: 'Coelacanth', zoneIds: ['abyss'],
    rarity: 'rare', value: 1100,
    body: { w: 64, h: 18, color: 0x4a6a4a, accent: 0xc8d27e }
  },
  abyssal_dragon: {
    id: 'abyssal_dragon', name: 'Abyssal Dragon', zoneIds: ['abyss'],
    rarity: 'legendary', value: 25000,
    body: { w: 160, h: 22, color: 0x1a0a2e, accent: 0xff5a3a }
  }
};

export const FISH_ORDER = [
  'bluegill', 'sunfish', 'catfish', 'old_boot', 'crawdad', 'bullfrog',
  'minnow_swarm', 'snapping_turtle', 'channel_eel',
  'trout', 'smallmouth', 'pike', 'sturgeon', 'crayfish', 'salmon',
  'mayfly_larva', 'river_otter', 'alligator_gar',
  'mackerel', 'snapper', 'tuna', 'marlin', 'sardine', 'swordfish',
  'pufferfish', 'barracuda', 'great_white', 'kraken',
  'clownfish', 'angelfish', 'lionfish', 'manta_ray', 'octopus', 'sea_turtle',
  'damselfish', 'moray', 'reef_shark', 'leviathan',
  'lanternfish', 'gulper_eel', 'viperfish', 'anglerfish', 'giant_squid', 'megalodon',
  'isopod', 'vampire_squid', 'coelacanth', 'abyssal_dragon'
];

export function getFishByZone(zoneId) {
  return FISH_ORDER
    .map(id => FISH[id])
    .filter(f => f.zoneIds.includes(zoneId));
}

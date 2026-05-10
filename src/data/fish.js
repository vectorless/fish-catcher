// Hand-authored species. Each fish has a body sprite spec used both for
// the swimming silhouettes under water in DockScene and the fishdex card.
// Rarity weights: common=10, uncommon=3, rare=1 (multiplied by bait.rarityBias).

export const RARITY_WEIGHT = {
  common: 14, uncommon: 3, rare: 0.6, epic: 0.12, legendary: 0.04, godlike: 0.005
};

export const RARITY_COLOR = {
  common: '#dfe6ed',
  uncommon: '#7fc8ff',
  rare: '#ffd24a',
  epic: '#c466ff',
  legendary: '#ff7a3a',
  godlike: '#88ffff'
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
  water_strider: {
    id: 'water_strider', name: 'Water Strider', zoneIds: ['pond'],
    rarity: 'common', value: 6,
    body: { w: 14, h: 6, color: 0x3a3a2a, accent: 0x8a8a5a }
  },
  pond_perch: {
    id: 'pond_perch', name: 'Pond Perch', zoneIds: ['pond'],
    rarity: 'common', value: 14,
    body: { w: 30, h: 14, color: 0x6e8a3a, accent: 0xc8d27e }
  },
  pond_carp: {
    id: 'pond_carp', name: 'Pond Carp', zoneIds: ['pond'],
    rarity: 'uncommon', value: 50,
    body: { w: 44, h: 18, color: 0xc8a85a, accent: 0xfff15a }
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
  river_dace: {
    id: 'river_dace', name: 'River Dace', zoneIds: ['river'],
    rarity: 'common', value: 20,
    body: { w: 28, h: 10, color: 0x7a8a9a, accent: 0xc8d2da }
  },
  bullhead: {
    id: 'bullhead', name: 'Bullhead Catfish', zoneIds: ['river'],
    rarity: 'uncommon', value: 70,
    body: { w: 38, h: 18, color: 0x4a3a2a, accent: 0x8a6a4a }
  },
  giant_catfish: {
    id: 'giant_catfish', name: 'Giant Catfish', zoneIds: ['river'],
    rarity: 'rare', value: 350,
    body: { w: 78, h: 22, color: 0x4a3a2e, accent: 0xc8a85a }
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
  flounder: {
    id: 'flounder', name: 'Flounder', zoneIds: ['ocean'],
    rarity: 'common', value: 30,
    body: { w: 32, h: 18, color: 0x8a7a4a, accent: 0xc8b07a }
  },
  grouper: {
    id: 'grouper', name: 'Goliath Grouper', zoneIds: ['ocean'],
    rarity: 'uncommon', value: 130,
    body: { w: 50, h: 26, color: 0x4a4a3a, accent: 0xc8a85a }
  },
  giant_octopus: {
    id: 'giant_octopus', name: 'Giant Pacific Octopus', zoneIds: ['ocean'],
    rarity: 'rare', value: 480,
    body: { w: 56, h: 30, color: 0xc04a3a, accent: 0xff8a7a }
  },

  // --- Frozen Lake --------------------------------------------------------
  arctic_minnow: {
    id: 'arctic_minnow', name: 'Arctic Minnow', zoneIds: ['frozen'],
    rarity: 'common', value: 22,
    body: { w: 18, h: 8, color: 0xc8e0f0, accent: 0xffffff }
  },
  ice_perch: {
    id: 'ice_perch', name: 'Ice Perch', zoneIds: ['frozen'],
    rarity: 'common', value: 30,
    body: { w: 28, h: 14, color: 0xa8c8e0, accent: 0xffffff }
  },
  snow_smelt: {
    id: 'snow_smelt', name: 'Snow Smelt', zoneIds: ['frozen'],
    rarity: 'common', value: 26,
    body: { w: 24, h: 10, color: 0xeaeaff, accent: 0x8aaadc }
  },
  arctic_char: {
    id: 'arctic_char', name: 'Arctic Char', zoneIds: ['frozen'],
    rarity: 'uncommon', value: 90,
    body: { w: 38, h: 14, color: 0x4a6a8a, accent: 0xff8aaa }
  },
  snow_crab: {
    id: 'snow_crab', name: 'Snow Crab', zoneIds: ['frozen'],
    rarity: 'uncommon', value: 110,
    body: { w: 30, h: 18, color: 0xff8a7a, accent: 0xffffff }
  },
  glacier_pike: {
    id: 'glacier_pike', name: 'Glacier Pike', zoneIds: ['frozen'],
    rarity: 'rare', value: 420,
    body: { w: 60, h: 14, color: 0x6a8aac, accent: 0xc8e0f0 }
  },
  frost_squid: {
    id: 'frost_squid', name: 'Frost Squid', zoneIds: ['frozen'],
    rarity: 'rare', value: 550,
    body: { w: 50, h: 24, color: 0xa8c8e0, accent: 0x4a6a8a }
  },
  frozen_kraken: {
    id: 'frozen_kraken', name: 'Frozen Kraken', zoneIds: ['frozen'],
    rarity: 'epic', value: 2400,
    body: { w: 120, h: 28, color: 0x2a4a6e, accent: 0xc8e0f0 }
  },
  frostfather: {
    id: 'frostfather', name: 'Frostfather', zoneIds: ['frozen'],
    rarity: 'legendary', value: 28000,
    body: { w: 170, h: 30, color: 0xc8e0f0, accent: 0x4a6a8a }
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
  parrotfish: {
    id: 'parrotfish', name: 'Parrotfish', zoneIds: ['reef'],
    rarity: 'common', value: 45,
    body: { w: 30, h: 16, color: 0x4af0d2, accent: 0xff8aff }
  },
  seahorse: {
    id: 'seahorse', name: 'Seahorse', zoneIds: ['reef'],
    rarity: 'uncommon', value: 140,
    body: { w: 16, h: 26, color: 0xffd24a, accent: 0xff8a3a }
  },
  whale_shark: {
    id: 'whale_shark', name: 'Whale Shark', zoneIds: ['reef'],
    rarity: 'epic', value: 2200,
    body: { w: 130, h: 30, color: 0x3a4a6a, accent: 0xc8d2da }
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
  },
  hagfish: {
    id: 'hagfish', name: 'Hagfish', zoneIds: ['abyss'],
    rarity: 'common', value: 90,
    body: { w: 36, h: 8, color: 0x4a3a3a, accent: 0x8a6a6a }
  },
  abyssal_lobster: {
    id: 'abyssal_lobster', name: 'Abyssal Lobster', zoneIds: ['abyss'],
    rarity: 'uncommon', value: 280,
    body: { w: 36, h: 20, color: 0x6a3a4a, accent: 0xff5a3a }
  },
  oarfish: {
    id: 'oarfish', name: 'Giant Oarfish', zoneIds: ['abyss'],
    rarity: 'epic', value: 3500,
    body: { w: 170, h: 14, color: 0xc0c0c0, accent: 0xff5a3a }
  },

  // --- Volcanic Trench ----------------------------------------------------
  magma_clinger: {
    id: 'magma_clinger', name: 'Magma Clinger', zoneIds: ['volcanic'],
    rarity: 'common', value: 100,
    body: { w: 22, h: 14, color: 0x8a3a1a, accent: 0xff8a3a }
  },
  vent_shrimp: {
    id: 'vent_shrimp', name: 'Vent Shrimp', zoneIds: ['volcanic'],
    rarity: 'common', value: 80,
    body: { w: 20, h: 8, color: 0xc04a3a, accent: 0xffd24a }
  },
  sulfur_eel: {
    id: 'sulfur_eel', name: 'Sulfur Eel', zoneIds: ['volcanic'],
    rarity: 'common', value: 120,
    body: { w: 56, h: 8, color: 0xffd24a, accent: 0x8a3a1a }
  },
  obsidian_crab: {
    id: 'obsidian_crab', name: 'Obsidian Crab', zoneIds: ['volcanic'],
    rarity: 'uncommon', value: 280,
    body: { w: 32, h: 18, color: 0x1a1a1a, accent: 0xff5a3a }
  },
  ember_ray: {
    id: 'ember_ray', name: 'Ember Ray', zoneIds: ['volcanic'],
    rarity: 'uncommon', value: 380,
    body: { w: 70, h: 16, color: 0x4a1a1a, accent: 0xff8a3a }
  },
  lava_eel: {
    id: 'lava_eel', name: 'Lava Eel', zoneIds: ['volcanic'],
    rarity: 'rare', value: 800,
    body: { w: 64, h: 10, color: 0xff5a3a, accent: 0xffd24a }
  },
  molten_serpent: {
    id: 'molten_serpent', name: 'Molten Serpent', zoneIds: ['volcanic'],
    rarity: 'rare', value: 1200,
    body: { w: 100, h: 14, color: 0xc04a1a, accent: 0xffd24a }
  },
  phoenix_eel: {
    id: 'phoenix_eel', name: 'Phoenix Eel', zoneIds: ['volcanic'],
    rarity: 'epic', value: 4500,
    body: { w: 80, h: 22, color: 0xff8a3a, accent: 0xfff15a }
  },
  salamandra: {
    id: 'salamandra', name: 'Salamandra', zoneIds: ['volcanic'],
    rarity: 'legendary', value: 35000,
    body: { w: 140, h: 26, color: 0xff5a3a, accent: 0xffd24a }
  },

  // --- The Leviathan Zone -------------------------------------------------
  nautilus: {
    id: 'nautilus', name: 'Chambered Nautilus', zoneIds: ['leviathan'],
    rarity: 'common', value: 200,
    body: { w: 28, h: 24, color: 0xc8a85a, accent: 0xfff15a }
  },
  giant_jellyfish: {
    id: 'giant_jellyfish', name: 'Giant Jellyfish', zoneIds: ['leviathan'],
    rarity: 'uncommon', value: 500,
    body: { w: 44, h: 40, color: 0xc466ff, accent: 0xfff15a }
  },
  siren: {
    id: 'siren', name: 'Siren', zoneIds: ['leviathan'],
    rarity: 'rare', value: 1500,
    body: { w: 36, h: 22, color: 0x4a8a8a, accent: 0xc8d27e }
  },
  aspidochelone: {
    id: 'aspidochelone', name: 'Aspidochelone', zoneIds: ['leviathan'],
    rarity: 'epic', value: 9000,
    body: { w: 120, h: 40, color: 0x4a3a1e, accent: 0x6e5a3a }
  },
  jormungandr: {
    id: 'jormungandr', name: 'Jörmungandr', zoneIds: ['leviathan'],
    rarity: 'legendary', value: 30000,
    body: { w: 180, h: 18, color: 0x2e4a3a, accent: 0x6ec97a }
  },
  bahamut: {
    id: 'bahamut', name: 'Bahamut', zoneIds: ['leviathan'],
    rarity: 'legendary', value: 50000,
    body: { w: 200, h: 32, color: 0xffd24a, accent: 0xff5a3a }
  },
  kelpie: {
    id: 'kelpie', name: 'Kelpie', zoneIds: ['leviathan'],
    rarity: 'epic', value: 7000,
    body: { w: 70, h: 36, color: 0x2e4a3a, accent: 0x6ec97a }
  },
  cthulhu: {
    id: 'cthulhu', name: 'Cthulhu', zoneIds: ['leviathan'],
    rarity: 'legendary', value: 60000,
    body: { w: 160, h: 50, color: 0x2a4a3a, accent: 0x6a3a4a }
  },
  tiamat: {
    id: 'tiamat', name: 'Tiamat', zoneIds: ['leviathan'],
    rarity: 'godlike', value: 150000,
    body: { w: 220, h: 36, color: 0xc04a8a, accent: 0xffd24a }
  },

  // --- Astral Sea ---------------------------------------------------------
  void_minnow: {
    id: 'void_minnow', name: 'Void Minnow', zoneIds: ['astral'],
    rarity: 'common', value: 280,
    body: { w: 22, h: 8, color: 0x1a0a2e, accent: 0x88ffff }
  },
  starlight_jelly: {
    id: 'starlight_jelly', name: 'Starlight Jelly', zoneIds: ['astral'],
    rarity: 'common', value: 320,
    body: { w: 30, h: 32, color: 0x88ffff, accent: 0xffffff }
  },
  cosmic_squid: {
    id: 'cosmic_squid', name: 'Cosmic Squid', zoneIds: ['astral'],
    rarity: 'uncommon', value: 700,
    body: { w: 44, h: 26, color: 0x4a2a8a, accent: 0xff66ff }
  },
  nebula_ray: {
    id: 'nebula_ray', name: 'Nebula Ray', zoneIds: ['astral'],
    rarity: 'uncommon', value: 850,
    body: { w: 70, h: 18, color: 0x6a2aac, accent: 0x88ffff }
  },
  astral_serpent: {
    id: 'astral_serpent', name: 'Astral Serpent', zoneIds: ['astral'],
    rarity: 'rare', value: 2400,
    body: { w: 110, h: 12, color: 0x4a4a8a, accent: 0xffffff }
  },
  galaxy_whale: {
    id: 'galaxy_whale', name: 'Galaxy Whale', zoneIds: ['astral'],
    rarity: 'rare', value: 3200,
    body: { w: 130, h: 30, color: 0x1a1a4a, accent: 0x88ffff }
  },
  void_kraken: {
    id: 'void_kraken', name: 'Void Kraken', zoneIds: ['astral'],
    rarity: 'epic', value: 9000,
    body: { w: 140, h: 32, color: 0x0a0214, accent: 0xc466ff }
  },
  cosmic_leviathan: {
    id: 'cosmic_leviathan', name: 'Cosmic Leviathan', zoneIds: ['astral'],
    rarity: 'legendary', value: 80000,
    body: { w: 200, h: 36, color: 0x2a1a4a, accent: 0xfff15a }
  },
  eternity: {
    id: 'eternity', name: 'Eternity', zoneIds: ['astral'],
    rarity: 'godlike', value: 250000,
    body: { w: 240, h: 40, color: 0x88ffff, accent: 0xffffff }
  },

  // --- Mangrove Swamp -----------------------------------------------------
  mud_minnow: {
    id: 'mud_minnow', name: 'Mud Minnow', zoneIds: ['swamp'],
    rarity: 'common', value: 35,
    body: { w: 22, h: 10, color: 0x5a4a2a, accent: 0x9a8a4a }
  },
  bog_shrimp: {
    id: 'bog_shrimp', name: 'Bog Shrimp', zoneIds: ['swamp'],
    rarity: 'common', value: 40,
    body: { w: 20, h: 10, color: 0x6a4a3a, accent: 0xc8a85a }
  },
  mangrove_jack: {
    id: 'mangrove_jack', name: 'Mangrove Jack', zoneIds: ['swamp'],
    rarity: 'uncommon', value: 110,
    body: { w: 36, h: 16, color: 0xc04a3a, accent: 0xffd24a }
  },
  snapping_eel: {
    id: 'snapping_eel', name: 'Snapping Eel', zoneIds: ['swamp'],
    rarity: 'uncommon', value: 150,
    body: { w: 56, h: 10, color: 0x3a3a2a, accent: 0x6a6a3a }
  },
  electric_ray: {
    id: 'electric_ray', name: 'Electric Ray', zoneIds: ['swamp'],
    rarity: 'rare', value: 320,
    body: { w: 48, h: 18, color: 0x4a3a5a, accent: 0xfff15a }
  },
  swamp_gator: {
    id: 'swamp_gator', name: 'Swamp Gator', zoneIds: ['swamp'],
    rarity: 'rare', value: 500,
    body: { w: 70, h: 18, color: 0x3a4a2a, accent: 0x6a7a3a }
  },
  bog_serpent: {
    id: 'bog_serpent', name: 'Bog Serpent', zoneIds: ['swamp'],
    rarity: 'epic', value: 1800,
    body: { w: 110, h: 14, color: 0x4a2a3a, accent: 0x8a5a3a }
  },

  // --- Kelp Forest --------------------------------------------------------
  kelp_perch: {
    id: 'kelp_perch', name: 'Kelp Perch', zoneIds: ['kelp'],
    rarity: 'common', value: 60,
    body: { w: 28, h: 14, color: 0x4a8a4a, accent: 0xc8d27e }
  },
  sea_urchin: {
    id: 'sea_urchin', name: 'Sea Urchin', zoneIds: ['kelp'],
    rarity: 'common', value: 70,
    body: { w: 22, h: 22, color: 0x4a2a3a, accent: 0x9a4a5a }
  },
  garibaldi: {
    id: 'garibaldi', name: 'Garibaldi', zoneIds: ['kelp'],
    rarity: 'uncommon', value: 200,
    body: { w: 30, h: 22, color: 0xff8a3a, accent: 0xffd24a }
  },
  leopard_shark: {
    id: 'leopard_shark', name: 'Leopard Shark', zoneIds: ['kelp'],
    rarity: 'uncommon', value: 280,
    body: { w: 56, h: 14, color: 0x8a7a5a, accent: 0x3a2a1a }
  },
  sunflower_star: {
    id: 'sunflower_star', name: 'Sunflower Sea Star', zoneIds: ['kelp'],
    rarity: 'rare', value: 700,
    body: { w: 38, h: 38, color: 0xffd24a, accent: 0xff8a3a }
  },
  kelp_dragon: {
    id: 'kelp_dragon', name: 'Kelp Dragon', zoneIds: ['kelp'],
    rarity: 'epic', value: 2800,
    body: { w: 100, h: 24, color: 0x2e6a3a, accent: 0xc8d27e }
  },
  sea_emperor: {
    id: 'sea_emperor', name: 'Sea Emperor', zoneIds: ['kelp'],
    rarity: 'legendary', value: 22000,
    body: { w: 170, h: 30, color: 0x1a4a3a, accent: 0xffd24a }
  },

  // --- Bioluminescent Cave -----------------------------------------------
  glow_minnow: {
    id: 'glow_minnow', name: 'Glow Minnow', zoneIds: ['cave'],
    rarity: 'common', value: 90,
    body: { w: 22, h: 10, color: 0x1a2a4a, accent: 0x6ec9ff }
  },
  crystal_shrimp: {
    id: 'crystal_shrimp', name: 'Crystal Shrimp', zoneIds: ['cave'],
    rarity: 'common', value: 130,
    body: { w: 22, h: 12, color: 0x88ccff, accent: 0xffffff }
  },
  lumen_eel: {
    id: 'lumen_eel', name: 'Lumen Eel', zoneIds: ['cave'],
    rarity: 'uncommon', value: 380,
    body: { w: 60, h: 10, color: 0x2a3a6a, accent: 0x88ffff }
  },
  ghost_jelly: {
    id: 'ghost_jelly', name: 'Ghost Jelly', zoneIds: ['cave'],
    rarity: 'uncommon', value: 450,
    body: { w: 36, h: 36, color: 0xc8d2ff, accent: 0xffffff }
  },
  crystal_pike: {
    id: 'crystal_pike', name: 'Crystal Pike', zoneIds: ['cave'],
    rarity: 'rare', value: 1200,
    body: { w: 64, h: 14, color: 0x6ec9ff, accent: 0xffffff }
  },
  prismatic_serpent: {
    id: 'prismatic_serpent', name: 'Prismatic Serpent', zoneIds: ['cave'],
    rarity: 'epic', value: 3500,
    body: { w: 120, h: 16, color: 0x88ffff, accent: 0xff8aff }
  },
  cavern_lord: {
    id: 'cavern_lord', name: 'Cavern Lord', zoneIds: ['cave'],
    rarity: 'legendary', value: 18000,
    body: { w: 150, h: 30, color: 0x2a1a4a, accent: 0x6ec9ff }
  },

  // --- Storm Front --------------------------------------------------------
  thunder_minnow: {
    id: 'thunder_minnow', name: 'Thunder Minnow', zoneIds: ['storm'],
    rarity: 'common', value: 200,
    body: { w: 22, h: 10, color: 0x4a4a6a, accent: 0xfff15a }
  },
  charged_jelly: {
    id: 'charged_jelly', name: 'Charged Jelly', zoneIds: ['storm'],
    rarity: 'common', value: 280,
    body: { w: 36, h: 36, color: 0x6a6a8a, accent: 0xfff15a }
  },
  storm_eel: {
    id: 'storm_eel', name: 'Storm Eel', zoneIds: ['storm'],
    rarity: 'uncommon', value: 600,
    body: { w: 60, h: 10, color: 0x3a3a5a, accent: 0x88ffff }
  },
  hurricane_ray: {
    id: 'hurricane_ray', name: 'Hurricane Ray', zoneIds: ['storm'],
    rarity: 'rare', value: 1500,
    body: { w: 80, h: 18, color: 0x2a2a4a, accent: 0xc8d2ff }
  },
  thunder_serpent: {
    id: 'thunder_serpent', name: 'Thunder Serpent', zoneIds: ['storm'],
    rarity: 'rare', value: 2200,
    body: { w: 130, h: 14, color: 0x4a4a6a, accent: 0xfff15a }
  },
  typhoon_kraken: {
    id: 'typhoon_kraken', name: 'Typhoon Kraken', zoneIds: ['storm'],
    rarity: 'epic', value: 6000,
    body: { w: 130, h: 32, color: 0x2a3a5a, accent: 0xc8d2ff }
  },
  raijin: {
    id: 'raijin', name: 'Raijin', zoneIds: ['storm'],
    rarity: 'legendary', value: 40000,
    body: { w: 180, h: 30, color: 0x1a1a3a, accent: 0xfff15a }
  },

  // --- Sky Falls ----------------------------------------------------------
  celestial_carp: {
    id: 'celestial_carp', name: 'Celestial Carp', zoneIds: ['skyfall'],
    rarity: 'uncommon', value: 800,
    body: { w: 44, h: 18, color: 0xc8e0ff, accent: 0xffd24a }
  },
  mirror_perch: {
    id: 'mirror_perch', name: 'Mirror Perch', zoneIds: ['skyfall'],
    rarity: 'uncommon', value: 1200,
    body: { w: 32, h: 18, color: 0xffffff, accent: 0x88ccff }
  },
  prism_ray: {
    id: 'prism_ray', name: 'Prism Ray', zoneIds: ['skyfall'],
    rarity: 'rare', value: 3000,
    body: { w: 80, h: 18, color: 0xc466ff, accent: 0xfff15a }
  },
  aetheric_eel: {
    id: 'aetheric_eel', name: 'Aetheric Eel', zoneIds: ['skyfall'],
    rarity: 'rare', value: 4500,
    body: { w: 80, h: 12, color: 0x88ffff, accent: 0xffeeff }
  },
  chord_serpent: {
    id: 'chord_serpent', name: 'Chord Serpent', zoneIds: ['skyfall'],
    rarity: 'epic', value: 12000,
    body: { w: 140, h: 16, color: 0xffd24a, accent: 0xc466ff }
  },
  ascendant_whale: {
    id: 'ascendant_whale', name: 'Ascendant Whale', zoneIds: ['skyfall'],
    rarity: 'legendary', value: 70000,
    body: { w: 200, h: 36, color: 0xc8e0ff, accent: 0xffd24a }
  },
  empyrean: {
    id: 'empyrean', name: 'Empyrean', zoneIds: ['skyfall'],
    rarity: 'godlike', value: 200000,
    body: { w: 220, h: 38, color: 0xffeeff, accent: 0xffd24a }
  },

  // --- The Voidsea -------------------------------------------------------
  void_polyp: {
    id: 'void_polyp', name: 'Void Polyp', zoneIds: ['voidsea'],
    rarity: 'common', value: 600,
    body: { w: 24, h: 24, color: 0x1a0a2e, accent: 0x6a3a8a }
  },
  nullspace_jelly: {
    id: 'nullspace_jelly', name: 'Nullspace Jelly', zoneIds: ['voidsea'],
    rarity: 'uncommon', value: 1500,
    body: { w: 40, h: 40, color: 0x0a0214, accent: 0x4a2a6a }
  },
  entropic_eel: {
    id: 'entropic_eel', name: 'Entropic Eel', zoneIds: ['voidsea'],
    rarity: 'rare', value: 5000,
    body: { w: 90, h: 12, color: 0x000814, accent: 0xc466ff }
  },
  voidwalker: {
    id: 'voidwalker', name: 'Voidwalker', zoneIds: ['voidsea'],
    rarity: 'epic', value: 18000,
    body: { w: 120, h: 28, color: 0x0a0214, accent: 0x88ffff }
  },
  nullkraken: {
    id: 'nullkraken', name: 'Nullkraken', zoneIds: ['voidsea'],
    rarity: 'legendary', value: 100000,
    body: { w: 200, h: 40, color: 0x000000, accent: 0xc466ff }
  },
  erasure: {
    id: 'erasure', name: 'Erasure', zoneIds: ['voidsea'],
    rarity: 'godlike', value: 350000,
    body: { w: 240, h: 42, color: 0x000000, accent: 0xffffff }
  },

  // --- Tide Pools ---------------------------------------------------------
  hermit_crab: {
    id: 'hermit_crab', name: 'Hermit Crab', zoneIds: ['tide_pools'],
    rarity: 'common', value: 25,
    body: { w: 22, h: 16, color: 0xc8a85a, accent: 0xff8a3a }
  },
  periwinkle: {
    id: 'periwinkle', name: 'Periwinkle Snail', zoneIds: ['tide_pools'],
    rarity: 'common', value: 20,
    body: { w: 16, h: 14, color: 0x4a3a2a, accent: 0xc8a85a }
  },
  tide_anemone: {
    id: 'tide_anemone', name: 'Tide Anemone', zoneIds: ['tide_pools'],
    rarity: 'common', value: 30,
    body: { w: 26, h: 22, color: 0xc04a8a, accent: 0xff8aaa }
  },
  rock_blenny: {
    id: 'rock_blenny', name: 'Rock Blenny', zoneIds: ['tide_pools'],
    rarity: 'uncommon', value: 75,
    body: { w: 26, h: 12, color: 0x6a8a3a, accent: 0xc8d27e }
  },
  tide_eel: {
    id: 'tide_eel', name: 'Tide Eel', zoneIds: ['tide_pools'],
    rarity: 'uncommon', value: 95,
    body: { w: 50, h: 8, color: 0x3a4a4a, accent: 0x88c8e0 }
  },
  rockpool_shark: {
    id: 'rockpool_shark', name: 'Rockpool Shark', zoneIds: ['tide_pools'],
    rarity: 'rare', value: 280,
    body: { w: 44, h: 14, color: 0x6a7a8a, accent: 0xc8d2da }
  },
  smiling_octopus: {
    id: 'smiling_octopus', name: 'Smiling Octopus', zoneIds: ['tide_pools'],
    rarity: 'epic', value: 1200,
    body: { w: 38, h: 28, color: 0xff8aaa, accent: 0xffd24a }
  },

  // --- Sunken Ruins -------------------------------------------------------
  coin_minnow: {
    id: 'coin_minnow', name: 'Coin Minnow', zoneIds: ['ruins'],
    rarity: 'common', value: 280,
    body: { w: 22, h: 10, color: 0xffd24a, accent: 0xc8a85a }
  },
  ruin_crab: {
    id: 'ruin_crab', name: 'Ruin Crab', zoneIds: ['ruins'],
    rarity: 'uncommon', value: 600,
    body: { w: 32, h: 20, color: 0x6a5a3a, accent: 0xc8a85a }
  },
  temple_eel: {
    id: 'temple_eel', name: 'Temple Eel', zoneIds: ['ruins'],
    rarity: 'uncommon', value: 850,
    body: { w: 64, h: 10, color: 0x4a4a3a, accent: 0xffd24a }
  },
  marble_serpent: {
    id: 'marble_serpent', name: 'Marble Serpent', zoneIds: ['ruins'],
    rarity: 'rare', value: 2200,
    body: { w: 110, h: 14, color: 0xeae0d6, accent: 0x6a4a4a }
  },
  gilded_grouper: {
    id: 'gilded_grouper', name: 'Gilded Grouper', zoneIds: ['ruins'],
    rarity: 'epic', value: 6500,
    body: { w: 70, h: 30, color: 0xffd24a, accent: 0x4a3a1a }
  },
  drowned_priest: {
    id: 'drowned_priest', name: 'Drowned Priest', zoneIds: ['ruins'],
    rarity: 'legendary', value: 32000,
    body: { w: 60, h: 36, color: 0x6a5a4a, accent: 0xffd24a }
  },
  drowned_king: {
    id: 'drowned_king', name: 'Drowned King', zoneIds: ['ruins'],
    rarity: 'legendary', value: 75000,
    body: { w: 130, h: 50, color: 0x4a3a1a, accent: 0xffd24a }
  },

  // --- Crystal Lagoon -----------------------------------------------------
  prism_minnow: {
    id: 'prism_minnow', name: 'Prism Minnow', zoneIds: ['lagoon'],
    rarity: 'common', value: 400,
    body: { w: 22, h: 10, color: 0x88e0e8, accent: 0xff66ff }
  },
  opal_shrimp: {
    id: 'opal_shrimp', name: 'Opal Shrimp', zoneIds: ['lagoon'],
    rarity: 'uncommon', value: 900,
    body: { w: 22, h: 12, color: 0xc8e0ff, accent: 0x88ccff }
  },
  crystal_seal: {
    id: 'crystal_seal', name: 'Crystal Seal', zoneIds: ['lagoon'],
    rarity: 'uncommon', value: 1500,
    body: { w: 56, h: 30, color: 0xc8f0ff, accent: 0x88e0e8 }
  },
  mirror_octopus: {
    id: 'mirror_octopus', name: 'Mirror Octopus', zoneIds: ['lagoon'],
    rarity: 'rare', value: 4500,
    body: { w: 50, h: 36, color: 0xeaeaff, accent: 0xc466ff }
  },
  lagoon_dragon: {
    id: 'lagoon_dragon', name: 'Lagoon Dragon', zoneIds: ['lagoon'],
    rarity: 'epic', value: 14000,
    body: { w: 130, h: 24, color: 0x88e0e8, accent: 0xffd24a }
  },
  prism_titan: {
    id: 'prism_titan', name: 'Prism Titan', zoneIds: ['lagoon'],
    rarity: 'legendary', value: 80000,
    body: { w: 200, h: 40, color: 0xc8f0ff, accent: 0xff66ff }
  },
  kaleido: {
    id: 'kaleido', name: 'Kaleido', zoneIds: ['lagoon'],
    rarity: 'godlike', value: 300000,
    body: { w: 220, h: 36, color: 0xff66ff, accent: 0x88e0e8 }
  },

  // --- Heaven's Pool ------------------------------------------------------
  cherub_fish: {
    id: 'cherub_fish', name: 'Cherub Fish', zoneIds: ['heavens'],
    rarity: 'common', value: 1500,
    body: { w: 26, h: 22, color: 0xfff5d6, accent: 0xffd24a }
  },
  halo_jelly: {
    id: 'halo_jelly', name: 'Halo Jelly', zoneIds: ['heavens'],
    rarity: 'uncommon', value: 3500,
    body: { w: 40, h: 40, color: 0xffe8a8, accent: 0xffffff }
  },
  seraph_eel: {
    id: 'seraph_eel', name: 'Seraph Eel', zoneIds: ['heavens'],
    rarity: 'rare', value: 9000,
    body: { w: 80, h: 12, color: 0xffd24a, accent: 0xffffff }
  },
  archangel_ray: {
    id: 'archangel_ray', name: 'Archangel Ray', zoneIds: ['heavens'],
    rarity: 'epic', value: 30000,
    body: { w: 130, h: 22, color: 0xffeeaa, accent: 0xffd24a }
  },
  throne_serpent: {
    id: 'throne_serpent', name: 'Throne Serpent', zoneIds: ['heavens'],
    rarity: 'legendary', value: 140000,
    body: { w: 200, h: 18, color: 0xffd24a, accent: 0xffffff }
  },
  godsong_whale: {
    id: 'godsong_whale', name: 'Godsong Whale', zoneIds: ['heavens'],
    rarity: 'legendary', value: 220000,
    body: { w: 220, h: 44, color: 0xfff5d6, accent: 0xffd24a }
  },
  omnia: {
    id: 'omnia', name: 'Omnia', zoneIds: ['heavens'],
    rarity: 'godlike', value: 600000,
    body: { w: 240, h: 50, color: 0xffffff, accent: 0xffd24a }
  },

  // --- Echo Sea -----------------------------------------------------------
  echo_minnow: {
    id: 'echo_minnow', name: 'Echo Minnow', zoneIds: ['echo'],
    rarity: 'common', value: 3000,
    body: { w: 22, h: 10, color: 0x4a4a6a, accent: 0xc8d2ff }
  },
  refrain_jelly: {
    id: 'refrain_jelly', name: 'Refrain Jelly', zoneIds: ['echo'],
    rarity: 'uncommon', value: 7500,
    body: { w: 40, h: 40, color: 0x6a6a8a, accent: 0xeaeaff }
  },
  harmonic_eel: {
    id: 'harmonic_eel', name: 'Harmonic Eel', zoneIds: ['echo'],
    rarity: 'rare', value: 22000,
    body: { w: 90, h: 12, color: 0x3a3a5a, accent: 0xc466ff }
  },
  chord_kraken: {
    id: 'chord_kraken', name: 'Chord Kraken', zoneIds: ['echo'],
    rarity: 'epic', value: 80000,
    body: { w: 150, h: 36, color: 0x2a2a4a, accent: 0xffd24a }
  },
  silent_god: {
    id: 'silent_god', name: 'Silent God', zoneIds: ['echo'],
    rarity: 'legendary', value: 380000,
    body: { w: 210, h: 44, color: 0x1a1a2a, accent: 0xc466ff }
  },
  eternal_voice: {
    id: 'eternal_voice', name: 'Eternal Voice', zoneIds: ['echo'],
    rarity: 'godlike', value: 1200000,
    body: { w: 240, h: 48, color: 0x4a4a6a, accent: 0xffffff }
  },

  // --- The Beyond ---------------------------------------------------------
  void_carp: {
    id: 'void_carp', name: 'Void Carp', zoneIds: ['beyond'],
    rarity: 'common', value: 8000,
    body: { w: 30, h: 18, color: 0xeaeaff, accent: 0xffeeff }
  },
  mu_squid: {
    id: 'mu_squid', name: 'Mu Squid', zoneIds: ['beyond'],
    rarity: 'uncommon', value: 22000,
    body: { w: 44, h: 30, color: 0xffeeff, accent: 0xc8c8ff }
  },
  theta_jelly: {
    id: 'theta_jelly', name: 'Theta Jelly', zoneIds: ['beyond'],
    rarity: 'rare', value: 70000,
    body: { w: 50, h: 50, color: 0xffffff, accent: 0xffd24a }
  },
  omega_eel: {
    id: 'omega_eel', name: 'Omega Eel', zoneIds: ['beyond'],
    rarity: 'epic', value: 250000,
    body: { w: 110, h: 14, color: 0xc8c8ff, accent: 0xffffff }
  },
  alpha_serpent: {
    id: 'alpha_serpent', name: 'Alpha Serpent', zoneIds: ['beyond'],
    rarity: 'legendary', value: 1200000,
    body: { w: 220, h: 22, color: 0xffffff, accent: 0xffd24a }
  },
  the_void_itself: {
    id: 'the_void_itself', name: 'The Void Itself', zoneIds: ['beyond'],
    rarity: 'godlike', value: 5000000,
    body: { w: 250, h: 60, color: 0x000000, accent: 0xffffff }
  }
};

export const FISH_ORDER = [
  'bluegill', 'sunfish', 'catfish', 'old_boot', 'crawdad', 'bullfrog',
  'minnow_swarm', 'snapping_turtle', 'channel_eel',
  'water_strider', 'pond_perch', 'pond_carp',
  'trout', 'smallmouth', 'pike', 'sturgeon', 'crayfish', 'salmon',
  'mayfly_larva', 'river_otter', 'alligator_gar',
  'river_dace', 'bullhead', 'giant_catfish',
  'mackerel', 'snapper', 'tuna', 'marlin', 'sardine', 'swordfish',
  'pufferfish', 'barracuda', 'great_white', 'kraken',
  'flounder', 'grouper', 'giant_octopus',
  'arctic_minnow', 'ice_perch', 'snow_smelt', 'arctic_char', 'snow_crab',
  'glacier_pike', 'frost_squid', 'frozen_kraken', 'frostfather',
  'clownfish', 'angelfish', 'lionfish', 'manta_ray', 'octopus', 'sea_turtle',
  'damselfish', 'moray', 'reef_shark', 'leviathan',
  'parrotfish', 'seahorse', 'whale_shark',
  'lanternfish', 'gulper_eel', 'viperfish', 'anglerfish', 'giant_squid', 'megalodon',
  'isopod', 'vampire_squid', 'coelacanth', 'abyssal_dragon',
  'hagfish', 'abyssal_lobster', 'oarfish',
  'magma_clinger', 'vent_shrimp', 'sulfur_eel', 'obsidian_crab', 'ember_ray',
  'lava_eel', 'molten_serpent', 'phoenix_eel', 'salamandra',
  'nautilus', 'giant_jellyfish', 'siren', 'aspidochelone', 'jormungandr', 'bahamut',
  'kelpie', 'cthulhu', 'tiamat',
  'void_minnow', 'starlight_jelly', 'cosmic_squid', 'nebula_ray',
  'astral_serpent', 'galaxy_whale', 'void_kraken', 'cosmic_leviathan', 'eternity',
  'mud_minnow', 'bog_shrimp', 'mangrove_jack', 'snapping_eel',
  'electric_ray', 'swamp_gator', 'bog_serpent',
  'kelp_perch', 'sea_urchin', 'garibaldi', 'leopard_shark',
  'sunflower_star', 'kelp_dragon', 'sea_emperor',
  'glow_minnow', 'crystal_shrimp', 'lumen_eel', 'ghost_jelly',
  'crystal_pike', 'prismatic_serpent', 'cavern_lord',
  'thunder_minnow', 'charged_jelly', 'storm_eel', 'hurricane_ray',
  'thunder_serpent', 'typhoon_kraken', 'raijin',
  'celestial_carp', 'mirror_perch', 'prism_ray', 'aetheric_eel',
  'chord_serpent', 'ascendant_whale', 'empyrean',
  'void_polyp', 'nullspace_jelly', 'entropic_eel',
  'voidwalker', 'nullkraken', 'erasure',
  'hermit_crab', 'periwinkle', 'tide_anemone', 'rock_blenny',
  'tide_eel', 'rockpool_shark', 'smiling_octopus',
  'coin_minnow', 'ruin_crab', 'temple_eel', 'marble_serpent',
  'gilded_grouper', 'drowned_priest', 'drowned_king',
  'prism_minnow', 'opal_shrimp', 'crystal_seal', 'mirror_octopus',
  'lagoon_dragon', 'prism_titan', 'kaleido',
  'cherub_fish', 'halo_jelly', 'seraph_eel', 'archangel_ray',
  'throne_serpent', 'godsong_whale', 'omnia',
  'echo_minnow', 'refrain_jelly', 'harmonic_eel', 'chord_kraken',
  'silent_god', 'eternal_voice',
  'void_carp', 'mu_squid', 'theta_jelly', 'omega_eel',
  'alpha_serpent', 'the_void_itself'
];

export function getFishByZone(zoneId) {
  return FISH_ORDER
    .map(id => FISH[id])
    .filter(f => f.zoneIds.includes(zoneId));
}

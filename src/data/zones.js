// Fishing zones. Unlocked by cumulative gold earned (monotonic),
// not balance — buying a rod must never relock a zone.

export const ZONES = {
  pond: {
    id: 'pond', name: 'Pond',
    unlockGoldThreshold: 0,
    waterColor: 0x2e5a78,
    waterDeep: 0x1a3a52,
    skyColor: 0x6a9ec8,
    fishPool: ['bluegill', 'sunfish', 'catfish', 'old_boot', 'crawdad', 'bullfrog',
               'minnow_swarm', 'snapping_turtle', 'channel_eel'],
    luckBias: { common: 1.2, uncommon: 0.9, rare: 0.7, epic: 0, legendary: 0 },
    blurb: 'A quiet little pond. Where everyone starts.'
  },
  river: {
    id: 'river', name: 'River',
    unlockGoldThreshold: 200,
    waterColor: 0x3a7a6e,
    waterDeep: 0x1f4a44,
    skyColor: 0x8eb89e,
    fishPool: ['trout', 'smallmouth', 'pike', 'sturgeon', 'crayfish', 'salmon',
               'mayfly_larva', 'river_otter', 'alligator_gar'],
    luckBias: { common: 1.0, uncommon: 1.0, rare: 1.0, epic: 0, legendary: 0 },
    blurb: 'Faster water, bigger fish.'
  },
  ocean: {
    id: 'ocean', name: 'Ocean',
    unlockGoldThreshold: 800,
    waterColor: 0x1f4a7a,
    waterDeep: 0x0a2238,
    skyColor: 0x5a78a8,
    fishPool: ['mackerel', 'snapper', 'tuna', 'marlin', 'sardine', 'swordfish',
               'pufferfish', 'barracuda', 'great_white', 'kraken'],
    luckBias: { common: 0.8, uncommon: 1.1, rare: 1.4, epic: 0, legendary: 1.0 },
    blurb: 'Open salt. Trophies live here.'
  },
  reef: {
    id: 'reef', name: 'Coral Reef',
    unlockGoldThreshold: 2500,
    waterColor: 0x3aa8b4,
    waterDeep: 0x1a5a6a,
    skyColor: 0x6ed4d4,
    fishPool: ['clownfish', 'angelfish', 'lionfish', 'manta_ray', 'octopus', 'sea_turtle',
               'damselfish', 'moray', 'reef_shark', 'leviathan'],
    luckBias: { common: 0.6, uncommon: 1.1, rare: 1.6, epic: 1.0, legendary: 1.2 },
    blurb: 'Tropical waters. The only place epics roam.'
  },
  abyss: {
    id: 'abyss', name: 'The Abyss',
    unlockGoldThreshold: 6000,
    waterColor: 0x0a1a2e,
    waterDeep: 0x000814,
    skyColor: 0x1a2a3a,
    fishPool: ['lanternfish', 'gulper_eel', 'viperfish', 'anglerfish', 'giant_squid', 'megalodon',
               'isopod', 'vampire_squid', 'coelacanth', 'abyssal_dragon'],
    luckBias: { common: 0.6, uncommon: 1.0, rare: 1.7, epic: 1.4, legendary: 1.6 },
    blurb: 'Sunless dark. Where leviathans hunt.'
  }
};

export const ZONE_ORDER = ['pond', 'river', 'ocean', 'reef', 'abyss'];

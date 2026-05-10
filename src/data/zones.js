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
               'minnow_swarm', 'snapping_turtle', 'channel_eel',
               'water_strider', 'pond_perch', 'pond_carp'],
    luckBias: { common: 1.2, uncommon: 0.9, rare: 0.7, epic: 0, legendary: 0, godlike: 0 },
    blurb: 'A quiet little pond. Where everyone starts.'
  },
  river: {
    id: 'river', name: 'River',
    unlockGoldThreshold: 200,
    waterColor: 0x3a7a6e,
    waterDeep: 0x1f4a44,
    skyColor: 0x8eb89e,
    fishPool: ['trout', 'smallmouth', 'pike', 'sturgeon', 'crayfish', 'salmon',
               'mayfly_larva', 'river_otter', 'alligator_gar',
               'river_dace', 'bullhead', 'giant_catfish'],
    luckBias: { common: 1.0, uncommon: 1.0, rare: 1.0, epic: 0, legendary: 0, godlike: 0 },
    blurb: 'Faster water, bigger fish.'
  },
  tide_pools: {
    id: 'tide_pools', name: 'Tide Pools',
    unlockGoldThreshold: 600,
    waterColor: 0x4a8aac,
    waterDeep: 0x2a5a7a,
    skyColor: 0x88c8e8,
    fishPool: ['hermit_crab', 'periwinkle', 'tide_anemone', 'rock_blenny',
               'tide_eel', 'rockpool_shark', 'smiling_octopus'],
    luckBias: { common: 1.0, uncommon: 1.1, rare: 1.2, epic: 0.5, legendary: 0, godlike: 0 },
    blurb: 'Saltwater puddles between basalt slabs. Surprises hide in every crevice.'
  },
  ocean: {
    id: 'ocean', name: 'Ocean',
    unlockGoldThreshold: 800,
    waterColor: 0x1f4a7a,
    waterDeep: 0x0a2238,
    skyColor: 0x5a78a8,
    fishPool: ['mackerel', 'snapper', 'tuna', 'marlin', 'sardine', 'swordfish',
               'pufferfish', 'barracuda', 'great_white', 'kraken',
               'flounder', 'grouper', 'giant_octopus'],
    luckBias: { common: 0.8, uncommon: 1.1, rare: 1.4, epic: 0, legendary: 1.0, godlike: 0 },
    blurb: 'Open salt. Trophies live here.'
  },
  swamp: {
    id: 'swamp', name: 'Mangrove Swamp',
    unlockGoldThreshold: 1100,
    waterColor: 0x4a5a2e,
    waterDeep: 0x2a3a1a,
    skyColor: 0x6a7a3e,
    fishPool: ['mud_minnow', 'bog_shrimp', 'mangrove_jack', 'snapping_eel',
               'electric_ray', 'swamp_gator', 'bog_serpent'],
    luckBias: { common: 0.9, uncommon: 1.1, rare: 1.3, epic: 0.6, legendary: 0, godlike: 0 },
    blurb: 'Tea-stained water and tangled roots. Watch your fingers.'
  },
  frozen: {
    id: 'frozen', name: 'Frozen Lake',
    unlockGoldThreshold: 1500,
    waterColor: 0x6a9ec8,
    waterDeep: 0x3a5a8a,
    skyColor: 0xc8e0f0,
    fishPool: ['arctic_minnow', 'ice_perch', 'snow_smelt',
               'arctic_char', 'snow_crab',
               'glacier_pike', 'frost_squid',
               'frozen_kraken', 'frostfather'],
    luckBias: { common: 0.7, uncommon: 1.1, rare: 1.5, epic: 0.8, legendary: 0.5, godlike: 0 },
    blurb: 'A glacier-fed mirror of ice. The cold keeps the rares slow.'
  },
  reef: {
    id: 'reef', name: 'Coral Reef',
    unlockGoldThreshold: 2500,
    waterColor: 0x3aa8b4,
    waterDeep: 0x1a5a6a,
    skyColor: 0x6ed4d4,
    fishPool: ['clownfish', 'angelfish', 'lionfish', 'manta_ray', 'octopus', 'sea_turtle',
               'damselfish', 'moray', 'reef_shark', 'leviathan',
               'parrotfish', 'seahorse', 'whale_shark'],
    luckBias: { common: 0.6, uncommon: 1.1, rare: 1.6, epic: 1.0, legendary: 1.2, godlike: 0 },
    blurb: 'Tropical waters. The only place epics roam.'
  },
  kelp: {
    id: 'kelp', name: 'Kelp Forest',
    unlockGoldThreshold: 4000,
    waterColor: 0x2e6a4a,
    waterDeep: 0x1a3a2a,
    skyColor: 0x5e9a7a,
    fishPool: ['kelp_perch', 'sea_urchin', 'garibaldi', 'leopard_shark',
               'sunflower_star', 'kelp_dragon', 'sea_emperor'],
    luckBias: { common: 0.7, uncommon: 1.1, rare: 1.5, epic: 1.2, legendary: 1.0, godlike: 0 },
    blurb: 'A swaying green cathedral. Easy to lose your line in the canopy.'
  },
  abyss: {
    id: 'abyss', name: 'The Abyss',
    unlockGoldThreshold: 6000,
    waterColor: 0x0a1a2e,
    waterDeep: 0x000814,
    skyColor: 0x1a2a3a,
    fishPool: ['lanternfish', 'gulper_eel', 'viperfish', 'anglerfish', 'giant_squid', 'megalodon',
               'isopod', 'vampire_squid', 'coelacanth', 'abyssal_dragon',
               'hagfish', 'abyssal_lobster', 'oarfish'],
    luckBias: { common: 0.6, uncommon: 1.0, rare: 1.7, epic: 1.4, legendary: 1.6, godlike: 0.2 },
    blurb: 'Sunless dark. Where leviathans hunt.'
  },
  cave: {
    id: 'cave', name: 'Bioluminescent Cave',
    unlockGoldThreshold: 7500,
    waterColor: 0x1a2a4a,
    waterDeep: 0x0a142a,
    skyColor: 0x2a4a8a,
    fishPool: ['glow_minnow', 'crystal_shrimp', 'lumen_eel', 'ghost_jelly',
               'crystal_pike', 'prismatic_serpent', 'cavern_lord'],
    luckBias: { common: 0.5, uncommon: 1.0, rare: 1.7, epic: 1.5, legendary: 1.5, godlike: 0.3 },
    blurb: 'Black water lit by drifting blue motes. Stalactites bristle the ceiling.'
  },
  volcanic: {
    id: 'volcanic', name: 'Volcanic Trench',
    unlockGoldThreshold: 9000,
    waterColor: 0x4a1a1a,
    waterDeep: 0x2a0a0a,
    skyColor: 0x6a2a1a,
    fishPool: ['magma_clinger', 'vent_shrimp', 'sulfur_eel',
               'obsidian_crab', 'ember_ray',
               'lava_eel', 'molten_serpent',
               'phoenix_eel', 'salamandra'],
    luckBias: { common: 0.5, uncommon: 1.0, rare: 1.8, epic: 1.6, legendary: 1.8, godlike: 0.5 },
    blurb: 'Boiling vents in a flooded caldera. The water glows.'
  },
  storm: {
    id: 'storm', name: 'Storm Front',
    unlockGoldThreshold: 12000,
    waterColor: 0x2a3a4a,
    waterDeep: 0x0a1a2a,
    skyColor: 0x3a3a5a,
    fishPool: ['thunder_minnow', 'charged_jelly', 'storm_eel', 'hurricane_ray',
               'thunder_serpent', 'typhoon_kraken', 'raijin'],
    luckBias: { common: 0.4, uncommon: 0.9, rare: 1.6, epic: 1.8, legendary: 2.0, godlike: 0.7 },
    blurb: 'A churning slab of ocean under a perpetual squall. Lightning tastes the mast.'
  },
  leviathan: {
    id: 'leviathan', name: 'The Leviathan Zone',
    unlockGoldThreshold: 15000,
    waterColor: 0x1a0a2e,
    waterDeep: 0x0a0214,
    skyColor: 0x2a1a4a,
    fishPool: ['nautilus', 'giant_jellyfish', 'siren', 'aspidochelone', 'jormungandr', 'bahamut',
               'kelpie', 'cthulhu', 'tiamat'],
    luckBias: { common: 0.4, uncommon: 0.8, rare: 1.5, epic: 2.0, legendary: 2.5, godlike: 1.0 },
    blurb: 'Where ancient gods of the deep still hunt.'
  },
  ruins: {
    id: 'ruins', name: 'Sunken Ruins',
    unlockGoldThreshold: 18000,
    waterColor: 0x4a4a3a,
    waterDeep: 0x2a2a1a,
    skyColor: 0x6a5a3a,
    fishPool: ['coin_minnow', 'ruin_crab', 'temple_eel', 'marble_serpent',
               'gilded_grouper', 'drowned_priest', 'drowned_king'],
    luckBias: { common: 0.4, uncommon: 0.9, rare: 1.6, epic: 1.8, legendary: 2.2, godlike: 0.5 },
    blurb: "Toppled columns and barnacle-crusted statues. Something still keeps the lamps lit."
  },
  skyfall: {
    id: 'skyfall', name: 'Sky Falls',
    unlockGoldThreshold: 25000,
    waterColor: 0x6ec9ff,
    waterDeep: 0x2a4a8a,
    skyColor: 0xc8e0ff,
    fishPool: ['celestial_carp', 'mirror_perch', 'prism_ray', 'aetheric_eel',
               'chord_serpent', 'ascendant_whale', 'empyrean'],
    luckBias: { common: 0.3, uncommon: 0.7, rare: 1.4, epic: 2.2, legendary: 2.8, godlike: 1.5 },
    blurb: 'Water that pours upward off a cliff into the open sky.'
  },
  lagoon: {
    id: 'lagoon', name: 'Crystal Lagoon',
    unlockGoldThreshold: 30000,
    waterColor: 0x88e0e8,
    waterDeep: 0x4a8aa8,
    skyColor: 0xc8f0ff,
    fishPool: ['prism_minnow', 'opal_shrimp', 'crystal_seal', 'mirror_octopus',
               'lagoon_dragon', 'prism_titan', 'kaleido'],
    luckBias: { common: 0.3, uncommon: 0.7, rare: 1.5, epic: 2.0, legendary: 2.6, godlike: 1.0 },
    blurb: 'Glassy shallows over ribbon coral. Light shatters and re-sews itself in your wake.'
  },
  astral: {
    id: 'astral', name: 'Astral Sea',
    unlockGoldThreshold: 40000,
    waterColor: 0x1a0a3a,
    waterDeep: 0x0a0214,
    skyColor: 0x2a1a4a,
    fishPool: ['void_minnow', 'starlight_jelly',
               'cosmic_squid', 'nebula_ray',
               'astral_serpent', 'galaxy_whale',
               'void_kraken', 'cosmic_leviathan', 'eternity'],
    luckBias: { common: 0.2, uncommon: 0.6, rare: 1.4, epic: 2.2, legendary: 3.0, godlike: 4.0 },
    blurb: 'A sea poured between the stars. Godlike things drift here.'
  },
  voidsea: {
    id: 'voidsea', name: 'The Voidsea',
    unlockGoldThreshold: 90000,
    waterColor: 0x0a0214,
    waterDeep: 0x000000,
    skyColor: 0x1a0a2a,
    fishPool: ['void_polyp', 'nullspace_jelly', 'entropic_eel',
               'voidwalker', 'nullkraken', 'erasure'],
    luckBias: { common: 0.1, uncommon: 0.4, rare: 1.2, epic: 2.0, legendary: 3.5, godlike: 6.0 },
    blurb: 'Past the stars. Black water that drinks light.'
  },
  heavens: {
    id: 'heavens', name: "Heaven's Pool",
    unlockGoldThreshold: 150000,
    waterColor: 0xfff5d6,
    waterDeep: 0xd6c878,
    skyColor: 0xffe8a8,
    fishPool: ['cherub_fish', 'halo_jelly', 'seraph_eel', 'archangel_ray',
               'throne_serpent', 'godsong_whale', 'omnia'],
    luckBias: { common: 0.05, uncommon: 0.3, rare: 1.0, epic: 2.0, legendary: 4.0, godlike: 8.0 },
    blurb: 'A still gold pool that never ripples. The water hums faintly.'
  },
  echo: {
    id: 'echo', name: 'Echo Sea',
    unlockGoldThreshold: 350000,
    waterColor: 0x3a3a4a,
    waterDeep: 0x1a1a2a,
    skyColor: 0x4a4a6a,
    fishPool: ['echo_minnow', 'refrain_jelly', 'harmonic_eel', 'chord_kraken',
               'silent_god', 'eternal_voice'],
    luckBias: { common: 0.05, uncommon: 0.2, rare: 0.8, epic: 2.0, legendary: 5.0, godlike: 12.0 },
    blurb: "An ocean of overlapping memories. Every cast lands twice."
  },
  beyond: {
    id: 'beyond', name: 'The Beyond',
    unlockGoldThreshold: 1000000,
    waterColor: 0xffffff,
    waterDeep: 0xc8c8ff,
    skyColor: 0xffeeff,
    fishPool: ['void_carp', 'mu_squid', 'theta_jelly', 'omega_eel',
               'alpha_serpent', 'the_void_itself'],
    luckBias: { common: 0.01, uncommon: 0.1, rare: 0.5, epic: 1.5, legendary: 5.0, godlike: 25.0 },
    blurb: 'White water without surface or floor. You are not sure you are casting outward.'
  }
};

export const ZONE_ORDER = [
  'pond', 'river', 'tide_pools', 'ocean', 'swamp', 'frozen', 'reef', 'kelp',
  'abyss', 'cave', 'volcanic', 'storm', 'leviathan', 'ruins', 'skyfall', 'lagoon',
  'astral', 'voidsea', 'heavens', 'echo', 'beyond'
];

// Rod tiers. Bought + equipped in ShopScene. Stats are read live by
// FishingController so swapping rod immediately changes the catch odds.
//
// All rods share the same timing minigame (hitZoneMult and perfectZoneMult
// are constant) — what differentiates rods is their luckBias, the per-rarity
// multiplier on the species-roll weights.

const HIT_ZONE_MULT = 1.0;
const PERFECT_ZONE_MULT = 0.30;

export const RODS = {
  twig: {
    id: 'twig', name: 'Twig Pole', price: 0,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 1.2, uncommon: 0.9, rare: 0.5, epic: 0.2, legendary: 0.05, godlike: 0 },
    color: 0x8e6a3a,
    blurb: 'A bent stick and some string.'
  },
  bamboo: {
    id: 'bamboo', name: 'Bamboo Rod', price: 80,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 1.0, uncommon: 1.0, rare: 1.0, epic: 0.6, legendary: 0.2, godlike: 0 },
    color: 0xc8a85a,
    blurb: 'Reliable and balanced.'
  },
  composite: {
    id: 'composite', name: 'Composite Rod', price: 300,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.7, uncommon: 1.2, rare: 1.8, epic: 1.2, legendary: 0.6, godlike: 0.05 },
    color: 0x4a4a5e,
    blurb: 'Tuned to attract the trophies.'
  },
  master: {
    id: 'master', name: 'Master Rod', price: 1500,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.4, uncommon: 1.0, rare: 2.0, epic: 2.5, legendary: 1.5, godlike: 0.2 },
    color: 0xc466ff,
    blurb: 'Bait wishes itself onto epics.'
  },
  legend: {
    id: 'legend', name: 'Leviathan Rod', price: 4000,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.2, uncommon: 0.8, rare: 2.5, epic: 4.0, legendary: 3.0, godlike: 0.5 },
    color: 0xffd24a,
    blurb: 'Forged for monsters of the deep.'
  },
  titan: {
    id: 'titan', name: 'Titan Rod', price: 12000,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.1, uncommon: 0.6, rare: 3.0, epic: 5.5, legendary: 5.0, godlike: 1.0 },
    color: 0x4af0d2,
    blurb: 'Tempered titanium core. Trophies feel inevitable.'
  },
  mythic: {
    id: 'mythic', name: 'Mythic Rod', price: 50000,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.05, uncommon: 0.5, rare: 10.0, epic: 10.0, legendary: 10.0, godlike: 3.0 },
    color: 0xff4ad2,
    blurb: '10× luck. The lake bends toward you.'
  },
  celestial: {
    id: 'celestial', name: 'Celestial Rod', price: 200000,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.02, uncommon: 0.3, rare: 5.0, epic: 8.0, legendary: 12.0, godlike: 20.0 },
    color: 0x88ffff,
    blurb: 'Forged from a fallen star. Godlike fish answer its call.'
  },
  aether: {
    id: 'aether', name: 'Aether Rod', price: 500000,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.01, uncommon: 0.2, rare: 4.0, epic: 8.0, legendary: 16.0, godlike: 32.0 },
    color: 0xc8f0ff,
    blurb: 'Spun from raw aether. Doubles down on the highest tiers.'
  },
  voidsteel: {
    id: 'voidsteel', name: 'Voidsteel Rod', price: 1500000,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.005, uncommon: 0.15, rare: 3.0, epic: 7.0, legendary: 20.0, godlike: 55.0 },
    color: 0x4a2a8a,
    blurb: 'Forged from collapsed stars. Drinks light at the tip.'
  },
  chronos: {
    id: 'chronos', name: 'Chronos Rod', price: 4000000,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.002, uncommon: 0.1, rare: 2.0, epic: 6.0, legendary: 25.0, godlike: 90.0 },
    color: 0xffd24a,
    blurb: 'Bites happen before you cast. The rod remembers.'
  },
  reality: {
    id: 'reality', name: 'Reality Rod', price: 12000000,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.001, uncommon: 0.05, rare: 1.5, epic: 5.0, legendary: 30.0, godlike: 150.0 },
    color: 0xffeeff,
    blurb: 'Edits the lake to contain a godlike fish.'
  },
  singularity: {
    id: 'singularity', name: 'Singularity Rod', price: 35000000,
    hitZoneMult: HIT_ZONE_MULT, perfectZoneMult: PERFECT_ZONE_MULT,
    luckBias: { common: 0.0005, uncommon: 0.02, rare: 1.0, epic: 4.0, legendary: 35.0, godlike: 250.0 },
    color: 0x000000,
    blurb: 'A point. All luck collapses through it. Anything else is a rounding error.'
  }
};

export const ROD_ORDER = [
  'twig', 'bamboo', 'composite', 'master', 'legend', 'titan', 'mythic', 'celestial',
  'aether', 'voidsteel', 'chronos', 'reality', 'singularity'
];

// Rod tiers. Bought + equipped in ShopScene. Stats are read live by
// FishingController so swapping rod immediately changes the timing-bar feel.
//
// hitZoneMult — multiplier on the base 18% green-zone width.
// perfectZoneMult — fraction of the green zone that's the inner "Perfect!" sub-zone.
// luckBias — per-rarity multiplier on the species-roll weights.

export const RODS = {
  twig: {
    id: 'twig', name: 'Twig Pole', price: 0,
    hitZoneMult: 1.0, perfectZoneMult: 0.30,
    luckBias: { common: 1.2, uncommon: 0.9, rare: 0.5, epic: 0.2, legendary: 0.05 },
    color: 0x8e6a3a,
    blurb: 'A bent stick and some string.'
  },
  bamboo: {
    id: 'bamboo', name: 'Bamboo Rod', price: 80,
    hitZoneMult: 1.5, perfectZoneMult: 0.30,
    luckBias: { common: 1.0, uncommon: 1.0, rare: 1.0, epic: 0.6, legendary: 0.2 },
    color: 0xc8a85a,
    blurb: 'Forgiving window, balanced luck.'
  },
  composite: {
    id: 'composite', name: 'Composite Rod', price: 300,
    hitZoneMult: 2.2, perfectZoneMult: 0.35,
    luckBias: { common: 0.7, uncommon: 1.2, rare: 1.8, epic: 1.2, legendary: 0.6 },
    color: 0x4a4a5e,
    blurb: 'Tuned to attract the trophies.'
  },
  master: {
    id: 'master', name: 'Master Rod', price: 1500,
    hitZoneMult: 3.0, perfectZoneMult: 0.40,
    luckBias: { common: 0.4, uncommon: 1.0, rare: 2.0, epic: 2.5, legendary: 1.5 },
    color: 0xc466ff,
    blurb: 'Bait wishes itself onto epics.'
  },
  legend: {
    id: 'legend', name: 'Leviathan Rod', price: 4000,
    hitZoneMult: 4.0, perfectZoneMult: 0.45,
    luckBias: { common: 0.2, uncommon: 0.8, rare: 2.5, epic: 4.0, legendary: 3.0 },
    color: 0xffd24a,
    blurb: 'Forged for monsters of the deep.'
  },
  titan: {
    id: 'titan', name: 'Titan Rod', price: 12000,
    hitZoneMult: 5.0, perfectZoneMult: 0.50,
    luckBias: { common: 0.1, uncommon: 0.6, rare: 3.0, epic: 5.5, legendary: 5.0 },
    color: 0x4af0d2,
    blurb: 'Tempered titanium core. Trophies feel inevitable.'
  },
  mythic: {
    id: 'mythic', name: 'Mythic Rod', price: 50000,
    hitZoneMult: 6.0, perfectZoneMult: 0.55,
    luckBias: { common: 0.05, uncommon: 0.5, rare: 10.0, epic: 10.0, legendary: 10.0 },
    color: 0xff4ad2,
    blurb: '10× luck. The lake bends toward you.'
  }
};

export const ROD_ORDER = ['twig', 'bamboo', 'composite', 'master', 'legend', 'titan', 'mythic'];

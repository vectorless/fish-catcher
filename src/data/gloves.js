// Diving gloves. Determine which fish rarities you can grab by hand and,
// for the upper tiers, add a flat gold tip on every successful dive grab.
// Bare hands can only handle small / mid-sized fish — bigger ones thrash
// out of your grip. Better gloves let you wrestle rares (and one day epics).

const ALL = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'godlike'];

export const GLOVES = {
  bare: {
    id: 'bare', name: 'Bare Hands', price: 0,
    allowed: ['common', 'uncommon'],
    grabBonus: 0,
    color: 0xf2c89a,
    blurb: 'Skin contact. Slippery on big fish.'
  },
  mesh: {
    id: 'mesh', name: 'Mesh Gloves', price: 400,
    allowed: ['common', 'uncommon', 'rare'],
    grabBonus: 0,
    color: 0x4a4a5e,
    blurb: 'Steel-mesh grip. You can wrestle a rare to the surface.'
  },
  titanium: {
    id: 'titanium', name: 'Titanium Grips', price: 2500,
    allowed: ALL,
    grabBonus: 0,
    color: 0x4af0d2,
    blurb: 'Spiked titanium claws. Nothing slips through.'
  },
  obsidian: {
    id: 'obsidian', name: 'Obsidian Talons', price: 9000,
    allowed: ALL,
    grabBonus: 25,
    color: 0x1a1a1a,
    blurb: 'Volcanic-glass claws. +25g tip on every grab.'
  },
  monoblade: {
    id: 'monoblade', name: 'Monoblade Gauntlets', price: 30000,
    allowed: ALL,
    grabBonus: 100,
    color: 0xc8d2da,
    blurb: 'Edge so fine you forget you are wearing them. +100g per grab.'
  },
  void_grip: {
    id: 'void_grip', name: 'Void Grip', price: 100000,
    allowed: ALL,
    grabBonus: 400,
    color: 0x4a2a8a,
    blurb: 'Reaches through the fish to whatever it owes. +400g per grab.'
  },
  god_hands: {
    id: 'god_hands', name: 'God Hands', price: 400000,
    allowed: ALL,
    grabBonus: 1500,
    color: 0xffd24a,
    blurb: 'Each grab takes its tithe. +1500g, no exceptions.'
  },
  reality_grip: {
    id: 'reality_grip', name: 'Reality Grip', price: 1500000,
    allowed: ALL,
    grabBonus: 6000,
    color: 0xffeeff,
    blurb: 'You hold the idea of the fish. +6000g per grab.'
  }
};

export const GLOVE_ORDER = [
  'bare', 'mesh', 'titanium',
  'obsidian', 'monoblade', 'void_grip', 'god_hands', 'reality_grip'
];

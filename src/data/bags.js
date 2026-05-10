// Carry bags. Equipped one at a time; capacity is the maximum number of
// caught fish that can sit in inventory before you must visit the shop to
// sell. The starter satchel holds a single fish — every catch is a trip
// back to the shop until you upgrade.

export const BAGS = {
  satchel: {
    id: 'satchel', name: 'Old Satchel', price: 0,
    capacity: 1,
    color: 0x8a5a3a,
    blurb: 'A worn cloth pouch. One fish at a time.'
  },
  canvas: {
    id: 'canvas', name: 'Canvas Bag', price: 200,
    capacity: 3,
    color: 0xc8a85a,
    blurb: 'Stitched waxed canvas. Three fish.'
  },
  tackle_box: {
    id: 'tackle_box', name: 'Tackle Box', price: 800,
    capacity: 6,
    color: 0x4a4a5e,
    blurb: 'Six foam-padded compartments.'
  },
  creel: {
    id: 'creel', name: 'Wicker Creel', price: 2500,
    capacity: 12,
    color: 0x6e9c5a,
    blurb: 'Twelve fish, kept cool by river-soaked reeds.'
  },
  cooler: {
    id: 'cooler', name: 'Insulated Cooler', price: 7000,
    capacity: 25,
    color: 0x4a8acc,
    blurb: 'Twenty-five. Keeps a marlin fresh till sundown.'
  },
  live_well: {
    id: 'live_well', name: 'Live Well', price: 20000,
    capacity: 60,
    color: 0x4af0d2,
    blurb: 'Aerated tank on a cart. Sixty live fish, no spoilage.'
  },
  pocket_pond: {
    id: 'pocket_pond', name: 'Pocket Pond', price: 60000,
    capacity: 150,
    color: 0x4a8acc,
    blurb: 'A folded extradimensional puddle. Fits in a vest pocket. 150 fish.'
  },
  bigger_pocket_pond: {
    id: 'bigger_pocket_pond', name: 'Bigger Pocket Pond', price: 200000,
    capacity: 400,
    color: 0x6a3a8a,
    blurb: 'Same idea, larger fold. 400 fish.'
  },
  bag_of_holding: {
    id: 'bag_of_holding', name: 'Bag of Holding', price: 600000,
    capacity: 1000,
    color: 0xc466ff,
    blurb: 'Don’t put another bag inside. 1000 fish.'
  },
  hammerspace: {
    id: 'hammerspace', name: 'Hammerspace Net', price: 2000000,
    capacity: 3000,
    color: 0x000000,
    blurb: 'A fishing net opening into nowhere in particular. 3000 fish.'
  },
  infinite_creel: {
    id: 'infinite_creel', name: 'Infinite Creel', price: 8000000,
    capacity: 999999,
    color: 0xffd24a,
    blurb: 'You will not fill this. 999,999 fish.'
  }
};

export const BAG_ORDER = [
  'satchel', 'canvas', 'tackle_box', 'creel', 'cooler', 'live_well',
  'pocket_pond', 'bigger_pocket_pond', 'bag_of_holding', 'hammerspace', 'infinite_creel'
];

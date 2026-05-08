// Oxygen tanks. Equipped one at a time; determines how long you can stay
// underwater per dive before auto-resurfacing.

export const TANKS = {
  lungs: {
    id: 'lungs', name: 'Just Your Lungs', price: 0,
    oxygenSec: 5,
    color: 0xa0aab8,
    blurb: 'Hold breath, swim fast.'
  },
  copper: {
    id: 'copper', name: 'Copper Lung', price: 150,
    oxygenSec: 12,
    color: 0xc88a3a,
    blurb: 'Antique gear, more than doubles your time.'
  },
  scuba: {
    id: 'scuba', name: 'Scuba Tank', price: 500,
    oxygenSec: 25,
    color: 0x4a8acc,
    blurb: 'Modern compressed air. Linger a while.'
  },
  rebreather: {
    id: 'rebreather', name: 'Rebreather', price: 1500,
    oxygenSec: 60,
    color: 0x6ec97a,
    blurb: 'A full minute below the surface.'
  },
  aquanaut: {
    id: 'aquanaut', name: 'Aquanaut Suit', price: 4500,
    oxygenSec: 150,
    color: 0xc466ff,
    blurb: 'Sealed mixed-gas rig. Two and a half minutes.'
  }
};

export const TANK_ORDER = ['lungs', 'copper', 'scuba', 'rebreather', 'aquanaut'];

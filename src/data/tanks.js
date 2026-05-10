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
  },
  gillsuit: {
    id: 'gillsuit', name: 'Gill Suit', price: 12000,
    oxygenSec: 600,
    color: 0x4af0d2,
    blurb: 'Bio-fabric draws oxygen straight from the water. Ten full minutes.'
  },
  hydrolung: {
    id: 'hydrolung', name: 'Hydrolung Module', price: 35000,
    oxygenSec: 1500,
    color: 0x6ec9ff,
    blurb: 'Cracks water for hydrogen and breathes the oxygen. 25 minutes.'
  },
  abyssal_rig: {
    id: 'abyssal_rig', name: 'Abyssal Pressure Rig', price: 100000,
    oxygenSec: 3600,
    color: 0x4a2a6a,
    blurb: 'Sealed dome. Recycles every breath for an hour.'
  },
  starfreighter: {
    id: 'starfreighter', name: 'Starfreighter Suit', price: 300000,
    oxygenSec: 9000,
    color: 0x88ffff,
    blurb: 'Vacuum-rated. Two and a half hours of swim time.'
  },
  void_lung: {
    id: 'void_lung', name: 'Void Lung', price: 900000,
    oxygenSec: 36000,
    color: 0x000000,
    blurb: 'Breathes vacuum. Ten hours below the surface.'
  },
  forever: {
    id: 'forever', name: 'Forever Bottle', price: 3000000,
    oxygenSec: 999999,
    color: 0xffd24a,
    blurb: 'Never empties. Stay as long as you like.'
  }
};

export const TANK_ORDER = [
  'lungs', 'copper', 'scuba', 'rebreather', 'aquanaut', 'gillsuit',
  'hydrolung', 'abyssal_rig', 'starfreighter', 'void_lung', 'forever'
];

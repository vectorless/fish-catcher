// Swim fins. Equipped one at a time; multiplies the diver's speed in
// dive mode. Walking on the pier is unaffected.

export const FINS = {
  barefoot: {
    id: 'barefoot', name: 'Barefoot', price: 0,
    swimSpeedMult: 1.0,
    color: 0xf2c89a,
    blurb: 'Just kicking. Slow but free.'
  },
  flippers: {
    id: 'flippers', name: 'Rubber Flippers', price: 200,
    swimSpeedMult: 1.4,
    color: 0x2e6ea8,
    blurb: 'Standard rubber fins.'
  },
  scuba_fins: {
    id: 'scuba_fins', name: 'Scuba Fins', price: 600,
    swimSpeedMult: 1.8,
    color: 0x4a4a5e,
    blurb: 'Long blades, strong kick.'
  },
  dolphin_fins: {
    id: 'dolphin_fins', name: 'Dolphin Fins', price: 1800,
    swimSpeedMult: 2.5,
    color: 0xc466ff,
    blurb: 'Carbon-weave monofin. Bullet-fast.'
  },
  hydrofoil: {
    id: 'hydrofoil', name: 'Hydrofoil Fins', price: 4000,
    swimSpeedMult: 3.5,
    color: 0xffd24a,
    blurb: 'Powered glide. The water hardly notices.'
  },
  jet: {
    id: 'jet', name: 'Jet Propulsion Fins', price: 10000,
    swimSpeedMult: 5.0,
    color: 0xff4ad2,
    blurb: 'Mini thrusters at the heel. Currents bow to you.'
  },
  cavitation: {
    id: 'cavitation', name: 'Cavitation Fins', price: 28000,
    swimSpeedMult: 7.0,
    color: 0x88ffff,
    blurb: 'Punch a vapor channel through the water and slip into it.'
  },
  warp: {
    id: 'warp', name: 'Warp Fins', price: 80000,
    swimSpeedMult: 10.0,
    color: 0xc466ff,
    blurb: 'Folds the swim region into a shorter swim region.'
  },
  void_kick: {
    id: 'void_kick', name: 'Void Kick', price: 250000,
    swimSpeedMult: 15.0,
    color: 0x1a0a2a,
    blurb: 'Kicks against literal nothing. Acceleration is essentially instant.'
  },
  light_step: {
    id: 'light_step', name: 'Light Step', price: 800000,
    swimSpeedMult: 25.0,
    color: 0xffffff,
    blurb: 'You move at the speed of seeing yourself decide to move.'
  },
  reality_fins: {
    id: 'reality_fins', name: 'Reality Fins', price: 3000000,
    swimSpeedMult: 40.0,
    color: 0xffeeff,
    blurb: 'Distance becomes optional.'
  }
};

export const FIN_ORDER = [
  'barefoot', 'flippers', 'scuba_fins', 'dolphin_fins', 'hydrofoil', 'jet',
  'cavitation', 'warp', 'void_kick', 'light_step', 'reality_fins'
];

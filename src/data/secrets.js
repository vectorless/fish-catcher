// Hidden chests. One per zone. Reachable only by diving — most are at the
// far edges or deep bottom of the swim area, in spots you'd only stumble
// into while exploring underwater. Coordinates are normalized 0..1
// against the swim region (xLerp on l..r, yLerp on t..b).

export const SECRETS = {
  pond:      { id: 'secret-pond',      zoneId: 'pond',      x: 0.85, y: 0.88, gold: 100,   name: 'Sunken Tackle Box' },
  river:     { id: 'secret-river',     zoneId: 'river',     x: 0.45, y: 0.92, gold: 250,   name: 'River Drifter Cache' },
  ocean:     { id: 'secret-ocean',     zoneId: 'ocean',     x: 0.92, y: 0.55, gold: 500,   name: "Smuggler's Crate" },
  frozen:    { id: 'secret-frozen',    zoneId: 'frozen',    x: 0.20, y: 0.85, gold: 800,   name: 'Frozen Tackle Cache' },
  reef:      { id: 'secret-reef',      zoneId: 'reef',      x: 0.55, y: 0.92, gold: 1000,  name: 'Pirate Coffer' },
  abyss:     { id: 'secret-abyss',     zoneId: 'abyss',     x: 0.92, y: 0.92, gold: 2500,  name: "Lost Diver's Pack" },
  volcanic:  { id: 'secret-volcanic',  zoneId: 'volcanic',  x: 0.75, y: 0.50, gold: 3500,  name: 'Molten Coffer' },
  leviathan: { id: 'secret-leviathan', zoneId: 'leviathan', x: 0.50, y: 0.94, gold: 5000,  name: 'Forgotten Idol' },
  astral:    { id: 'secret-astral',    zoneId: 'astral',    x: 0.50, y: 0.50, gold: 12000, name: 'Cosmic Reliquary' },
  swamp:     { id: 'secret-swamp',     zoneId: 'swamp',     x: 0.30, y: 0.88, gold: 600,   name: 'Bootlegger Stash' },
  kelp:      { id: 'secret-kelp',      zoneId: 'kelp',      x: 0.65, y: 0.40, gold: 1800,  name: "Diver's Hidden Net" },
  cave:      { id: 'secret-cave',      zoneId: 'cave',      x: 0.10, y: 0.60, gold: 4000,  name: 'Crystal Geode' },
  storm:     { id: 'secret-storm',     zoneId: 'storm',     x: 0.85, y: 0.30, gold: 6500,  name: "Storm-Caller's Locker" },
  skyfall:   { id: 'secret-skyfall',   zoneId: 'skyfall',   x: 0.50, y: 0.10, gold: 18000, name: 'Cloud-Forged Vault' },
  voidsea:    { id: 'secret-voidsea',    zoneId: 'voidsea',    x: 0.50, y: 0.95, gold: 60000,   name: 'Singularity Locket' },
  tide_pools: { id: 'secret-tide_pools', zoneId: 'tide_pools', x: 0.95, y: 0.85, gold: 350,     name: 'Salt-Crusted Coffer' },
  ruins:      { id: 'secret-ruins',      zoneId: 'ruins',      x: 0.40, y: 0.70, gold: 14000,   name: 'Sealed Sarcophagus' },
  lagoon:     { id: 'secret-lagoon',     zoneId: 'lagoon',     x: 0.20, y: 0.45, gold: 25000,   name: 'Prism Reliquary' },
  heavens:    { id: 'secret-heavens',    zoneId: 'heavens',    x: 0.50, y: 0.05, gold: 110000,  name: 'Choir-Note Locket' },
  echo:       { id: 'secret-echo',       zoneId: 'echo',       x: 0.10, y: 0.50, gold: 280000,  name: 'Resonant Bell' },
  beyond:     { id: 'secret-beyond',     zoneId: 'beyond',     x: 0.90, y: 0.10, gold: 800000,  name: 'Final Word' }
};

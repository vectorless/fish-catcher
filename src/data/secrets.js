// Hidden chests. One per zone. Reachable only by diving — most are at the
// far edges or deep bottom of the swim area, in spots you'd only stumble
// into while exploring underwater. Coordinates are normalized 0..1
// against the swim region (xLerp on l..r, yLerp on t..b).

export const SECRETS = {
  pond:      { id: 'secret-pond',      zoneId: 'pond',      x: 0.85, y: 0.88, gold: 100,  name: 'Sunken Tackle Box' },
  river:     { id: 'secret-river',     zoneId: 'river',     x: 0.45, y: 0.92, gold: 250,  name: 'River Drifter Cache' },
  ocean:     { id: 'secret-ocean',     zoneId: 'ocean',     x: 0.92, y: 0.55, gold: 500,  name: "Smuggler's Crate" },
  reef:      { id: 'secret-reef',      zoneId: 'reef',      x: 0.55, y: 0.92, gold: 1000, name: 'Pirate Coffer' },
  abyss:     { id: 'secret-abyss',     zoneId: 'abyss',     x: 0.92, y: 0.92, gold: 2500, name: "Lost Diver's Pack" },
  leviathan: { id: 'secret-leviathan', zoneId: 'leviathan', x: 0.50, y: 0.94, gold: 5000, name: 'Forgotten Idol' }
};

# Fish Catcher (prototype)

Side-view fishing game. Cast → time the bite → hook a fish → sell → buy better rods/bait → unlock new zones → fill the fishdex.

## Loop (one cast)

1. **DockScene** — pier on left, water on right, fish silhouettes swimming below the waterline.
2. **SPACE** to cast. Bobber arcs to the water surface.
3. **Wait** for a bite (random 1.5–5s × bait.biteDelayMult). `!` flashes above the bobber.
4. **Timing bar** appears. Cursor sweeps left↔right; SPACE inside the green hits, inside the inner yellow band hits *Perfect* (×1.5 gold). Auto-miss after ~2 sweeps.
5. Catch is auto-sold (gold added) and the species is recorded in the fishdex.

## Hotkeys

| Key | Action |
| --- | ------ |
| `A` / `D` (or arrows) | Walk on pier · swim L/R while diving |
| `SPACE` | Cast / hook (pier) · descend (dive) |
| `W` / `↑` | Ascend while diving |
| `S` | Dive in / out (must be at pier edge) |
| `E` | Shop (rods + bait + tanks) |
| `F` | Fishdex |
| `Z` | Zone select |
| `ESC` | Close any modal |

Scene-swap hotkeys are ignored mid-cast (HUD flashes "Reel in first").

## Architecture invariants — keep these

- **Phaser scenes are modes.** `DockScene` is the hub; `ShopScene`, `FishdexScene`, `ZoneSelectScene` launch as overlays (DockScene is paused, not stopped). `HUDScene` is launched once and persists.
- **Game state lives on `scene.registry`** — `gold`, `goldEarnedTotal`, `ownedRods`, `equippedRodId`, `ownedBaits`, `equippedBaitId`, `fishdex`, `unlockedZones`, `currentZoneId`, `castState`, `lastCatchToast`. Mutators in `src/state.js`. Never `registry.set` from a scene.
- **Content is data, not classes.** `src/data/{fish,rods,baits,zones}.js` are keyed objects + `*_ORDER` arrays. Add a tier by tweaking these.
- **Controllers separated from scenes.** `FishingController` owns the cast state machine and the timing bar; DockScene just instantiates it and forwards `update(delta)`.
- **Use `delta` (ms) for movement** so the timing bar is framerate-independent. Cursor uses manual delta-driven motion (not a tween) so SPACE can capture exact x mid-sweep.
- **Zone unlocks gate on `goldEarnedTotal`** (cumulative, monotonic) — never on balance, so buying a rod can't relock a zone.

## Run

```
npm install
npm run dev
```

Vite binds 127.0.0.1:5173.

## Deferred (not in v1)

Bait consumption, save/load, combat/threats, weather, day/night, audio, animation polish, mobile/touch, NPCs, achievements, records (biggest/total), procedural species, multi-line rods, permit-based zone unlocks.

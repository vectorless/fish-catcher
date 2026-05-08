// Shared game state lives on scene.registry so it survives scene swaps.
// Every read/write goes through a function in this file — never mutate
// the registry directly from a scene.

import { RODS } from './data/rods.js';
import { BAITS } from './data/baits.js';
import { TANKS } from './data/tanks.js';
import { FINS } from './data/fins.js';
import { GLOVES } from './data/gloves.js';
import { CODES } from './data/codes.js';
import { ZONES, ZONE_ORDER } from './data/zones.js';
import { FISH, getFishByZone, RARITY_WEIGHT } from './data/fish.js';

export function initState(registry) {
  registry.set('gold', 0);
  registry.set('goldEarnedTotal', 0);
  registry.set('ownedRods', ['twig']);
  registry.set('equippedRodId', 'twig');
  registry.set('ownedBaits', ['worm']);
  registry.set('equippedBaitId', 'worm');
  registry.set('ownedTanks', ['lungs']);
  registry.set('equippedTankId', 'lungs');
  registry.set('ownedFins', ['barefoot']);
  registry.set('equippedFinId', 'barefoot');
  registry.set('ownedGloves', ['bare']);
  registry.set('equippedGloveId', 'bare');
  registry.set('fishdex', []);
  registry.set('unlockedZones', ['pond']);
  registry.set('currentZoneId', 'pond');
  registry.set('castState', 'idle');
  registry.set('lastCatchToast', null);
  registry.set('redeemedCodes', []);
}

// --- Code redemption -----------------------------------------------------

export function redeemCode(registry, raw) {
  const code = (raw || '').trim();
  if (!code) return { ok: false, error: 'No code entered.' };
  const reward = CODES[code];
  if (!reward) return { ok: false, error: `Unknown code: "${code}".` };
  const used = registry.get('redeemedCodes') || [];
  if (used.includes(code)) return { ok: false, error: 'Already redeemed.' };
  registry.set('redeemedCodes', [...used, code]);
  if (reward.gold) addGold(registry, reward.gold);
  return { ok: true, reward, label: reward.label };
}

// --- Gold ----------------------------------------------------------------

export function addGold(registry, amount) {
  const g = registry.get('gold') || 0;
  const total = registry.get('goldEarnedTotal') || 0;
  registry.set('gold', g + amount);
  registry.set('goldEarnedTotal', total + amount);
  return checkAndUnlockZones(registry);
}

export function spendGold(registry, amount) {
  const g = registry.get('gold') || 0;
  if (g < amount) return false;
  registry.set('gold', g - amount);
  return true;
}

// --- Rods ----------------------------------------------------------------

export function getEquippedRod(registry) {
  const id = registry.get('equippedRodId') || 'twig';
  return RODS[id] || RODS.twig;
}

export function buyOrEquipRod(registry, id) {
  const rod = RODS[id];
  if (!rod) return { ok: false, error: 'No such rod.' };
  const owned = registry.get('ownedRods') || ['twig'];
  if (owned.includes(id)) {
    registry.set('equippedRodId', id);
    return { ok: true, equipped: true };
  }
  if (!spendGold(registry, rod.price)) {
    return { ok: false, error: 'Not enough gold.' };
  }
  registry.set('ownedRods', [...owned, id]);
  registry.set('equippedRodId', id);
  return { ok: true, bought: true };
}

// --- Bait ----------------------------------------------------------------

export function getEquippedBait(registry) {
  const id = registry.get('equippedBaitId') || 'worm';
  return BAITS[id] || BAITS.worm;
}

export function buyOrEquipBait(registry, id) {
  const bait = BAITS[id];
  if (!bait) return { ok: false, error: 'No such bait.' };
  const owned = registry.get('ownedBaits') || ['worm'];
  if (owned.includes(id)) {
    registry.set('equippedBaitId', id);
    return { ok: true, equipped: true };
  }
  if (!spendGold(registry, bait.price)) {
    return { ok: false, error: 'Not enough gold.' };
  }
  registry.set('ownedBaits', [...owned, id]);
  registry.set('equippedBaitId', id);
  return { ok: true, bought: true };
}

// --- Tanks ---------------------------------------------------------------

export function getEquippedTank(registry) {
  const id = registry.get('equippedTankId') || 'lungs';
  return TANKS[id] || TANKS.lungs;
}

export function buyOrEquipTank(registry, id) {
  const tank = TANKS[id];
  if (!tank) return { ok: false, error: 'No such tank.' };
  const owned = registry.get('ownedTanks') || ['lungs'];
  if (owned.includes(id)) {
    registry.set('equippedTankId', id);
    return { ok: true, equipped: true };
  }
  if (!spendGold(registry, tank.price)) {
    return { ok: false, error: 'Not enough gold.' };
  }
  registry.set('ownedTanks', [...owned, id]);
  registry.set('equippedTankId', id);
  return { ok: true, bought: true };
}

// --- Fins ----------------------------------------------------------------

export function getEquippedFin(registry) {
  const id = registry.get('equippedFinId') || 'barefoot';
  return FINS[id] || FINS.barefoot;
}

export function buyOrEquipFin(registry, id) {
  const fin = FINS[id];
  if (!fin) return { ok: false, error: 'No such fins.' };
  const owned = registry.get('ownedFins') || ['barefoot'];
  if (owned.includes(id)) {
    registry.set('equippedFinId', id);
    return { ok: true, equipped: true };
  }
  if (!spendGold(registry, fin.price)) {
    return { ok: false, error: 'Not enough gold.' };
  }
  registry.set('ownedFins', [...owned, id]);
  registry.set('equippedFinId', id);
  return { ok: true, bought: true };
}

// --- Gloves --------------------------------------------------------------

export function getEquippedGlove(registry) {
  const id = registry.get('equippedGloveId') || 'bare';
  return GLOVES[id] || GLOVES.bare;
}

export function buyOrEquipGlove(registry, id) {
  const glove = GLOVES[id];
  if (!glove) return { ok: false, error: 'No such gloves.' };
  const owned = registry.get('ownedGloves') || ['bare'];
  if (owned.includes(id)) {
    registry.set('equippedGloveId', id);
    return { ok: true, equipped: true };
  }
  if (!spendGold(registry, glove.price)) {
    return { ok: false, error: 'Not enough gold.' };
  }
  registry.set('ownedGloves', [...owned, id]);
  registry.set('equippedGloveId', id);
  return { ok: true, bought: true };
}

// --- Fishdex -------------------------------------------------------------

export function hasCaught(registry, speciesId) {
  const dex = registry.get('fishdex') || [];
  return dex.includes(speciesId);
}

export function recordCatch(registry, speciesId) {
  const dex = registry.get('fishdex') || [];
  if (dex.includes(speciesId)) return { isNew: false };
  registry.set('fishdex', [...dex, speciesId]);
  return { isNew: true };
}

// --- Zones ---------------------------------------------------------------

export function getCurrentZone(registry) {
  const id = registry.get('currentZoneId') || 'pond';
  return ZONES[id] || ZONES.pond;
}

export function setCurrentZone(registry, id) {
  const unlocked = registry.get('unlockedZones') || ['pond'];
  if (!unlocked.includes(id)) return false;
  registry.set('currentZoneId', id);
  return true;
}

export function unlockZone(registry, id) {
  const unlocked = registry.get('unlockedZones') || ['pond'];
  if (unlocked.includes(id)) return false;
  registry.set('unlockedZones', [...unlocked, id]);
  return true;
}

// Called automatically after every addGold(). Returns array of zone ids
// newly unlocked on this call so the HUD can pop a "New zone unlocked" toast.
export function checkAndUnlockZones(registry) {
  const total = registry.get('goldEarnedTotal') || 0;
  const unlocked = registry.get('unlockedZones') || ['pond'];
  const newly = [];
  for (const id of ZONE_ORDER) {
    const z = ZONES[id];
    if (!unlocked.includes(id) && total >= z.unlockGoldThreshold) {
      newly.push(id);
    }
  }
  if (newly.length) {
    registry.set('unlockedZones', [...unlocked, ...newly]);
  }
  return newly;
}

export function getFishPoolForZone(zoneId) {
  return getFishByZone(zoneId);
}

// --- Catch roll ----------------------------------------------------------

// Weighted random pick over the current zone's fish pool. Each species'
// base rarity weight is multiplied by the equipped bait, equipped rod, and
// current zone biases — so upgrading any of those three nudges the roll
// toward rarer fish (or away, for the starter twig pole / Pond).
export function rollSpecies(registry) {
  const zone = getCurrentZone(registry);
  const bait = getEquippedBait(registry);
  const rod = getEquippedRod(registry);
  const pool = zone.fishPool.map(id => FISH[id]).filter(Boolean);
  const weights = pool.map(f => {
    const r = f.rarity;
    return RARITY_WEIGHT[r]
      * (bait.rarityBias?.[r] ?? 1)
      * (rod.luckBias?.[r] ?? 1)
      * (zone.luckBias?.[r] ?? 1);
  });
  const total = weights.reduce((s, w) => s + w, 0);
  let pick = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    pick -= weights[i];
    if (pick <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

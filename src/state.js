// Shared game state lives on scene.registry so it survives scene swaps.
// Every read/write goes through a function in this file — never mutate
// the registry directly from a scene.

import { RODS } from './data/rods.js';
import { BAITS } from './data/baits.js';
import { TANKS } from './data/tanks.js';
import { FINS } from './data/fins.js';
import { GLOVES } from './data/gloves.js';
import { CODES } from './data/codes.js';
import { assignRandomQuest } from './data/quests.js';
import { SECRETS } from './data/secrets.js';
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
  registry.set('activeQuest', null);
  registry.set('foundSecrets', []);
  registry.set('inventory', []);
  registry.set('riverNpcDeliveries', 0);
}

// --- Inventory -----------------------------------------------------------
// Each entry is `{ speciesId, rainbow }`. Rainbow fish (10% roll at catch)
// sell for 2× their species value. Selling at the shop converts entries to
// gold; the perfect-catch bonus and +5g tip are paid immediately so they
// don't depend on whether the player ever returns to sell.

export const RAINBOW_MULT = 2;

function _entryValue(entry) {
  const v = FISH[entry.speciesId]?.value || 0;
  return entry.rainbow ? v * RAINBOW_MULT : v;
}

export function addToInventory(registry, speciesId, opts = {}) {
  const inv = registry.get('inventory') || [];
  registry.set('inventory', [...inv, { speciesId, rainbow: !!opts.rainbow }]);
}

export function getInventoryAggregate(registry) {
  const inv = registry.get('inventory') || [];
  const buckets = new Map();
  for (const e of inv) {
    const key = `${e.speciesId}|${e.rainbow ? 1 : 0}`;
    const b = buckets.get(key) || { speciesId: e.speciesId, rainbow: e.rainbow, count: 0 };
    b.count++;
    buckets.set(key, b);
  }
  const out = [];
  for (const b of buckets.values()) {
    const species = FISH[b.speciesId];
    if (!species) continue;
    const unitValue = b.rainbow ? species.value * RAINBOW_MULT : species.value;
    out.push({
      speciesId: b.speciesId, species, rainbow: b.rainbow,
      count: b.count, unitValue, totalValue: unitValue * b.count
    });
  }
  out.sort((a, b) => b.totalValue - a.totalValue);
  return out;
}

export function sellSpecies(registry, speciesId, rainbow = false, count = Infinity) {
  const inv = registry.get('inventory') || [];
  let remaining = count;
  const kept = [];
  let value = 0;
  let sold = 0;
  for (const e of inv) {
    if (e.speciesId === speciesId && !!e.rainbow === !!rainbow && remaining > 0) {
      value += _entryValue(e);
      sold++;
      remaining--;
    } else {
      kept.push(e);
    }
  }
  if (sold === 0) return { sold: 0, value: 0 };
  registry.set('inventory', kept);
  if (value > 0) addGold(registry, value);
  return { sold, value };
}

export function sellAll(registry) {
  const inv = registry.get('inventory') || [];
  if (inv.length === 0) return { sold: 0, value: 0 };
  let total = 0;
  for (const e of inv) total += _entryValue(e);
  registry.set('inventory', []);
  if (total > 0) addGold(registry, total);
  return { sold: inv.length, value: total };
}

export function findRareInInventory(registry) {
  const inv = registry.get('inventory') || [];
  for (const e of inv) {
    if (FISH[e.speciesId]?.rarity === 'rare') {
      return { ...FISH[e.speciesId], rainbow: e.rainbow };
    }
  }
  return null;
}

// --- River NPC -----------------------------------------------------------

const RIVER_NPC_REWARD = 800;

export function getRiverNpcDeliveries(registry) {
  return registry.get('riverNpcDeliveries') || 0;
}

export function deliverRareToRiverNpc(registry) {
  const inv = registry.get('inventory') || [];
  const idx = inv.findIndex(e => FISH[e.speciesId]?.rarity === 'rare');
  if (idx < 0) return null;
  const entry = inv[idx];
  const next = [...inv.slice(0, idx), ...inv.slice(idx + 1)];
  registry.set('inventory', next);
  addGold(registry, RIVER_NPC_REWARD);
  registry.set('riverNpcDeliveries', getRiverNpcDeliveries(registry) + 1);
  return { species: FISH[entry.speciesId], rainbow: entry.rainbow, reward: RIVER_NPC_REWARD };
}

// --- Quests --------------------------------------------------------------

export function getActiveQuest(registry) {
  return registry.get('activeQuest');
}

export function startNewQuest(registry) {
  const q = assignRandomQuest();
  registry.set('activeQuest', q);
  return q;
}

export function claimQuest(registry) {
  const q = registry.get('activeQuest');
  if (!q || !q.complete) return null;
  if (q.reward) addGold(registry, q.reward);
  registry.set('activeQuest', null);
  return q;
}

// Called from recordCatch / addGold to advance progress on the active quest.
function _advanceQuest(registry, advance) {
  const q = registry.get('activeQuest');
  if (!q || q.complete) return;
  const next = advance(q);
  if (!next) return;
  if (next.progress >= next.goal) next.complete = true;
  // Replace the registry value so changedata fires (objects mutate in place
  // otherwise and listeners wouldn't notice).
  registry.set('activeQuest', { ...next });
}

// --- Secrets -------------------------------------------------------------

export function getSecretForZone(zoneId) {
  return SECRETS[zoneId] || null;
}

export function isSecretFound(registry, secretId) {
  const found = registry.get('foundSecrets') || [];
  return found.includes(secretId);
}

export function findSecret(registry, secretId) {
  const secret = Object.values(SECRETS).find(s => s.id === secretId);
  if (!secret) return null;
  if (isSecretFound(registry, secretId)) return null;
  const found = registry.get('foundSecrets') || [];
  registry.set('foundSecrets', [...found, secretId]);
  if (secret.gold) addGold(registry, secret.gold);
  return secret;
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
  if (reward.zone) {
    unlockZone(registry, reward.zone);
    setCurrentZone(registry, reward.zone);
  }
  return { ok: true, reward, label: reward.label };
}

// --- Gold ----------------------------------------------------------------

export function addGold(registry, amount) {
  const g = registry.get('gold') || 0;
  const total = registry.get('goldEarnedTotal') || 0;
  registry.set('gold', g + amount);
  registry.set('goldEarnedTotal', total + amount);
  // Advance earn_gold quest if active.
  _advanceQuest(registry, q => {
    if (q.type !== 'earn_gold' || amount <= 0) return null;
    return { ...q, progress: Math.min(q.goal, q.progress + amount) };
  });
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
  const isNew = !dex.includes(speciesId);
  if (isNew) registry.set('fishdex', [...dex, speciesId]);
  // Advance any matching quest types.
  _advanceQuest(registry, q => {
    if (q.type === 'catch_species' && q.speciesId === speciesId) {
      return { ...q, progress: q.progress + 1 };
    }
    if (q.type === 'catch_rarity') {
      const fish = FISH[speciesId];
      if (fish && fish.rarity === q.rarity) {
        return { ...q, progress: q.progress + 1 };
      }
    }
    return null;
  });
  return { isNew };
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

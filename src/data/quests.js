// Quest templates. assignRandomQuest() rolls one of these and instantiates
// a concrete quest with target/goal/reward filled in.

import { FISH, FISH_ORDER } from './fish.js';

let _idCounter = 1;
const nextId = () => `q-${_idCounter++}`;

// Pick a random species from the easier rarities (common/uncommon) so the
// catch_count quest stays achievable without legendary luck.
function pickEasySpecies() {
  const eligible = FISH_ORDER
    .map(id => FISH[id])
    .filter(f => f.rarity === 'common' || f.rarity === 'uncommon');
  return eligible[Math.floor(Math.random() * eligible.length)];
}

const RARITY_BOUNTY = {
  uncommon: 80,
  rare: 350
};

export function assignRandomQuest() {
  const roll = Math.random();
  if (roll < 0.5) return _catchSpeciesQuest();
  if (roll < 0.8) return _earnGoldQuest();
  return _catchRarityQuest();
}

function _catchSpeciesQuest() {
  const species = pickEasySpecies();
  const goal = 2 + Math.floor(Math.random() * 4); // 2..5
  const reward = Math.floor(species.value * goal * 1.4);
  return {
    id: nextId(),
    type: 'catch_species',
    speciesId: species.id,
    goal,
    progress: 0,
    reward,
    description: `Catch ${goal} ${species.name}`,
    complete: false
  };
}

function _catchRarityQuest() {
  const rarity = Math.random() < 0.7 ? 'uncommon' : 'rare';
  const goal = rarity === 'uncommon' ? 3 : 1;
  const reward = RARITY_BOUNTY[rarity] * goal;
  return {
    id: nextId(),
    type: 'catch_rarity',
    rarity,
    goal,
    progress: 0,
    reward,
    description: `Catch ${goal} ${rarity}-rarity fish`,
    complete: false
  };
}

function _earnGoldQuest() {
  const goal = 100 + Math.floor(Math.random() * 5) * 50; // 100, 150, 200, 250, 300
  const reward = Math.floor(goal * 0.6);
  return {
    id: nextId(),
    type: 'earn_gold',
    goal,
    progress: 0,
    reward,
    description: `Earn ${goal} gold from catches`,
    complete: false
  };
}

// Side-view dock with two modes:
//
//   pier  — Walk along the pier with A/D (or arrows). SPACE casts the rod;
//           bobber lands on water; FishingController runs the timing-bar
//           catch flow. Casts that would land on the pier are refused.
//
//   dive  — S near the pier edge plunges you into the water. WASD/arrows
//           swim 8-way. Touch a fish silhouette to grab it (recordCatch +
//           addGold instantly). Oxygen ticks down from the equipped tank's
//           capacity; on 0 you auto-resurface (drowned). S resurfaces
//           voluntarily.

import Phaser from 'phaser';
import { FishingController } from '../controllers/FishingController.js';
import {
  getCurrentZone, getFishPoolForZone, getEquippedTank, getEquippedFin,
  getEquippedGlove, getEquippedBag, isInventoryFull, getInventoryCount,
  recordCatch, addToInventory, addGold, redeemCode,
  getSecretForZone, isSecretFound, findSecret,
  rollCatchVariant, VARIANT_MULT
} from '../state.js';

const PLAYER_SPEED = 180;
const ROD_TIP_DX = 110;
const ROD_BASE_DX = 6;
const PIER_EDGE_MARGIN = 8;       // bobber must land this far past pier edge
const PIER_EDGE_DIVE_RANGE = 60;  // must be within this many px of pier edge to dive
const SWIM_SPEED = 110;           // diver px/sec — water is heavy
const FISH_CATCH_RADIUS = 24;     // distance threshold for grabbing a fish
const FISH_RESPAWN_MS = 5000;     // caught fish reappear after this delay
const QUEST_BOX_INTERACT_RANGE = 50;
const SECRET_FIND_RADIUS = 26;
const NPC_INTERACT_RANGE = 50;
const SHOP_INTERACT_RANGE = 60;
const SAND_COLOR = 0xe8c890;
const SAND_DARK = 0xc8a870;
const SAND_GRAIN = 0xb89860;

export class DockScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DockScene' });
  }

  create() {
    if (!this.scene.isActive('HUDScene')) this.scene.launch('HUDScene');

    this.uiRoot = this.add.container(0, 0);
    this.fishSprites = [];

    this.controller = null;
    this.player = null;
    this.rodTip = { x: 0, y: 0 };

    // Dive state
    this.mode = 'pier';
    this.diver = null;
    this.oxygenSec = 0;
    this.oxygenMax = 0;
    this._diveReturnX = 0;

    this.keys = this.input.keyboard.addKeys({
      left: 'A', right: 'D', up: 'W',
      leftArrow: 'LEFT', rightArrow: 'RIGHT', upArrow: 'UP',
      descend: 'SPACE'
    });

    this._buildScene();

    this.scale.on('resize', this._onResize, this);
    this.registry.events.on('changedata-currentZoneId', this._onZoneChange, this);

    this.input.keyboard.on('keydown-E', () => this._tryOpen('ShopScene'));
    this.input.keyboard.on('keydown-F', () => this._tryOpen('FishdexScene'));
    this.input.keyboard.on('keydown-Z', () => this._tryOpen('ZoneSelectScene'));
    this.input.keyboard.on('keydown-T', () => this._tryOpen('TutorialScene'));
    this.input.keyboard.on('keydown-S', () => this._toggleDive());
    this.input.keyboard.on('keydown-R', () => this._promptRedeem());
    this.input.keyboard.on('keydown-Q', () => this._tryQuestBox());

    // First-launch tutorial
    if (!this.registry.get('tutorialSeen')) {
      this.scene.launch('TutorialScene');
      this.scene.pause();
    }

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this._shutdown, this);
  }

  _tryOpen(key) {
    if (this.mode === 'dive') {
      this._flashPrompt('Surface first.');
      return;
    }
    if (!this.controller || !this.controller.isIdle()) {
      this._flashPrompt('Reel in first.');
      return;
    }
    this.scene.launch(key);
    this.scene.pause();
  }

  _flashPrompt(text, duration) {
    const hud = this.scene.get('HUDScene');
    if (hud && hud.flashPrompt) hud.flashPrompt(text, duration);
  }

  _tryQuestBox() {
    if (this.mode === 'dive') { this._flashPrompt('Surface first.'); return; }
    if (!this.controller || !this.controller.isIdle()) { this._flashPrompt('Reel in first.'); return; }
    if (!this.player) return;

    // The river NPC takes precedence when both are in range — they're the
    // only zone-specific Q-target, so we'd rather not lose them to the box.
    if (this.riverNpc && Math.abs(this.player.x - this.riverNpc.x) <= NPC_INTERACT_RANGE) {
      this.scene.launch('NpcScene');
      this.scene.pause();
      return;
    }
    if (this.questBox && Math.abs(this.player.x - this.questBox.x) <= QUEST_BOX_INTERACT_RANGE) {
      this.scene.launch('QuestScene');
      this.scene.pause();
      return;
    }
    this._flashPrompt('Walk up to the chest or NPC.');
  }

  _promptRedeem() {
    if (this.mode === 'dive') { this._flashPrompt('Surface first.'); return; }
    if (this.controller && !this.controller.isIdle()) { this._flashPrompt('Reel in first.'); return; }
    // Native browser prompt — modal, captures the code without needing a
    // bespoke text-input UI. Phaser keys won't fire while it's open.
    const code = window.prompt('Enter redeem code:');
    if (code === null) return; // user cancelled
    const result = redeemCode(this.registry, code);
    if (!result.ok) {
      this._flashPrompt(result.error, 2400);
    } else {
      this._flashPrompt(`Redeemed: ${result.label}!`, 3000);
    }
  }

  _onZoneChange() { this._buildScene(); }
  _onResize() { this._buildScene(); }

  _buildScene() {
    const { width, height } = this.scale;
    const zone = getCurrentZone(this.registry);

    // Reset dive state on rebuild.
    this.mode = 'pier';
    this.oxygenSec = 0;

    if (this.controller) { this.controller.destroy(); this.controller = null; }
    this.uiRoot.removeAll(true);
    this.fishSprites.forEach(f => { if (f._respawnTimer) f._respawnTimer.remove(); f.destroy(); });
    this.fishSprites = [];
    if (this.diver) { this.diver.destroy(); this.diver = null; }

    const waterlineY = Math.floor(height * 0.45);
    const pierRightX = Math.floor(width * 0.30);
    const pierTopY = waterlineY - 18;
    const pierBottomY = height;

    // --- Backdrop ---
    const sky = this.add.rectangle(0, 0, width, waterlineY, zone.skyColor)
      .setOrigin(0, 0).setDepth(0);
    const water = this.add.rectangle(0, waterlineY, width, height - waterlineY,
      zone.waterColor).setOrigin(0, 0).setDepth(1);
    const deep = this.add.rectangle(0, waterlineY + (height - waterlineY) * 0.55,
      width, (height - waterlineY) * 0.45, zone.waterDeep)
      .setOrigin(0, 0).setAlpha(0.55).setDepth(2);

    // --- Beach (sand) ---
    const beach = this.add.rectangle(0, pierTopY, pierRightX, pierBottomY - pierTopY,
      SAND_COLOR).setOrigin(0, 0).setStrokeStyle(2, SAND_DARK).setDepth(5);
    // Subtle grain dots so it doesn't read as flat tan.
    const grains = [];
    const seed = (zone.id || '').length * 13 + 7;
    for (let i = 0; i < 60; i++) {
      const gx = ((seed * (i + 3)) % pierRightX);
      const gy = pierTopY + ((seed * (i + 11)) % (pierBottomY - pierTopY - 4));
      grains.push(this.add.circle(gx, gy, 1, SAND_GRAIN, 0.55).setDepth(5));
    }
    // Wet-sand strip at the waterline (slightly darker)
    const wetStrip = this.add.rectangle(0, pierTopY, pierRightX, 6, SAND_DARK)
      .setOrigin(0, 0).setAlpha(0.6).setDepth(6);

    // --- Shop building (left side, persistent on every zone) ---
    this._buildShopBuilding(pierTopY);

    // --- Pier player ---
    const playerXMin = 24;
    const playerXMax = pierRightX - 20;
    const startX = Phaser.Math.Clamp(pierRightX - 60, playerXMin, playerXMax);
    const feetY = pierTopY;
    const body = this.add.rectangle(startX, feetY, 14, 24, 0x2e6ea8)
      .setOrigin(0.5, 1).setStrokeStyle(2, 0x14304a).setDepth(8);
    const head = this.add.circle(startX, feetY - 32, 8, 0xf2c89a)
      .setStrokeStyle(2, 0x4a2e1a).setDepth(9);
    const rod = this.add.line(0, 0, 0, 0, 0, 0, 0xf4e4bc, 1)
      .setOrigin(0, 0).setLineWidth(3).setDepth(10);

    this.player = {
      x: startX, feetY,
      xMin: playerXMin, xMax: playerXMax,
      body, head, rod
    };
    this.pierRightX = pierRightX;
    this.waterlineY = waterlineY;
    this._syncPlayerVisuals();

    // --- Diver (hidden until dive starts) ---
    this.diver = this._makeDiver();
    this.diver.setVisible(false).setDepth(11);

    // --- Fish silhouettes ---
    const pool = getFishPoolForZone(zone.id);
    const swimL = pierRightX + 24;
    const swimR = width - 30;
    const swimTop = waterlineY + 30;
    const swimBottom = height - 30;
    pool.forEach((fish, i) => {
      const y = swimTop + ((i + 0.5) / pool.length) * (swimBottom - swimTop);
      const sprite = this._makeFishSprite(fish);
      sprite.setPosition(swimL + Math.random() * (swimR - swimL), y);
      sprite.setDepth(3);
      const speed = 22 + Math.random() * 30;
      const dir = Math.random() < 0.5 ? -1 : 1;
      sprite.setData('species', fish);
      sprite.setData('speed', speed * dir);
      sprite.setData('homeY', y);
      sprite.setData('bounds', { l: swimL, r: swimR });
      sprite.setScale(dir, 1);
      this.fishSprites.push(sprite);
    });

    this.swimBounds = { l: pierRightX + 16, r: width - 16, t: waterlineY + 14, b: height - 16 };

    // --- Zone label ---
    const title = this.add.text(width - 20, 20, zone.name, {
      fontFamily: 'serif', fontSize: '22px', color: '#f4e4bc',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(1, 0).setDepth(50);
    const blurb = this.add.text(width - 20, 48, zone.blurb, {
      fontFamily: 'serif', fontSize: '13px', color: '#cbb98a', fontStyle: 'italic'
    }).setOrigin(1, 0).setDepth(50);

    // --- Quest box on the pier ---
    const questBoxX = Math.min(96, pierRightX - 80);
    const questBoxY = pierTopY;
    this.questBox = {
      x: questBoxX, y: questBoxY,
      sprite: this.add.rectangle(questBoxX, questBoxY - 12, 28, 24, 0x6e4a2a)
        .setOrigin(0.5, 1).setStrokeStyle(2, 0x3a2a14).setDepth(7),
      lid: this.add.rectangle(questBoxX, questBoxY - 24, 30, 4, 0x4a3a1e)
        .setOrigin(0.5, 1).setStrokeStyle(2, 0x2a1a0e).setDepth(7),
      label: this.add.text(questBoxX, questBoxY - 38, '?', {
        fontFamily: 'serif', fontSize: '18px', color: '#ffd24a',
        fontStyle: 'bold', stroke: '#000', strokeThickness: 3
      }).setOrigin(0.5).setDepth(7),
      prompt: this.add.text(questBoxX, questBoxY - 52, 'Q', {
        fontFamily: 'serif', fontSize: '13px', color: '#f4e4bc',
        backgroundColor: '#000a', padding: { x: 6, y: 2 }
      }).setOrigin(0.5).setDepth(8).setVisible(false)
    };

    // --- Secret chest in this zone (if not already found) ---
    this._buildSecretChest(zone, swimL, swimR, swimTop, swimBottom);

    this.uiRoot.add([
      sky, water, deep, beach, ...grains, wetStrip,
      body, head, rod, this.diver, title, blurb,
      this.questBox.sprite, this.questBox.lid, this.questBox.label, this.questBox.prompt
    ]);
    if (this.secretChest) this.uiRoot.add(this.secretChest);

    // --- River NPC (only spawned in the river zone) ---
    // Added AFTER the beach/player so its sprites render on top — Phaser
    // container children paint in insertion order and ignore .depth on
    // children, so anything added later sits visually above earlier siblings.
    this._buildRiverNpc(zone, pierTopY);

    // --- Controller ---
    this.controller = new FishingController(this, {
      rodTip: this.rodTip,
      landY: waterlineY + 6,
      castRangeX: 200,
      barCenter: { x: width / 2, y: height - 110 },
      canCast: () => this._canCastHere()
    });
    this.controller.on('cast:rejected', (reason) => this._flashPrompt(reason || 'Cannot cast.'));
  }

  _canCastHere() {
    if (isInventoryFull(this.registry)) {
      const bag = getEquippedBag(this.registry);
      return `Bag full (${bag.capacity}/${bag.capacity}) — sell at the shop first.`;
    }
    if (!(this.rodTip.x + 200 > this.pierRightX + PIER_EDGE_MARGIN)) {
      return 'Aim past the pier — walk to the edge.';
    }
    return null;
  }

  _buildShopBuilding(beachTopY) {
    // A small shack on the left side of the beach. The modal shop still
    // opens via E from anywhere — this is the visible reminder that the
    // shop exists and where it lives.
    const baseX = 50;
    const baseW = 64;
    const baseH = 48;
    const baseY = beachTopY;
    const wall = this.add.rectangle(baseX, baseY, baseW, baseH, 0x8a5a3a)
      .setOrigin(0.5, 1).setStrokeStyle(2, 0x4a2e1a).setDepth(7);
    // Roof: triangle just above the wall top.
    const roof = this.add.triangle(baseX, baseY - baseH,
      -baseW / 2 - 6, 0,
      baseW / 2 + 6, 0,
      0, -22,
      0xa84a3a).setStrokeStyle(2, 0x4a2e1a).setDepth(7);
    // Door
    const door = this.add.rectangle(baseX, baseY, 16, 26, 0x4a2e1a)
      .setOrigin(0.5, 1).setStrokeStyle(2, 0x2a1a0a).setDepth(7);
    // Window
    const window = this.add.rectangle(baseX - 18, baseY - baseH + 16, 12, 12, 0xc8d2da)
      .setStrokeStyle(2, 0x4a2e1a).setDepth(7);
    // SHOP sign
    const sign = this.add.text(baseX, baseY - baseH - 28, 'SHOP', {
      fontFamily: 'serif', fontSize: '14px', fontStyle: 'bold',
      color: '#f4e4bc', stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setDepth(8);
    // "E" prompt that appears when the player is close
    const prompt = this.add.text(baseX, baseY - baseH - 46, 'E', {
      fontFamily: 'serif', fontSize: '13px', color: '#ffd24a',
      backgroundColor: '#000a', padding: { x: 6, y: 2 }
    }).setOrigin(0.5).setDepth(8).setVisible(false);

    this.uiRoot.add([wall, roof, door, window, sign, prompt]);
    this.shopBuilding = { x: baseX, prompt };
  }

  _buildRiverNpc(zone, beachTopY) {
    this.riverNpc = null;
    if (zone.id !== 'river') return;
    const pierRightX = this.pierRightX;
    // Sit between the quest box (~x=96) and the player's start (~pierRightX-60).
    // Clamp so the NPC stays comfortably on the beach, not on top of the player.
    const x = Phaser.Math.Clamp(Math.floor(pierRightX * 0.45), 130, 180);
    const feetY = beachTopY;
    const body = this.add.rectangle(x, feetY, 14, 24, 0x9c4a3a)
      .setOrigin(0.5, 1).setStrokeStyle(2, 0x4a2e1a).setDepth(8);
    const head = this.add.circle(x, feetY - 32, 8, 0xf2c89a)
      .setStrokeStyle(2, 0x4a2e1a).setDepth(9);
    // Straw hat
    const hatBrim = this.add.rectangle(x, feetY - 39, 22, 3, 0xc8a85a)
      .setStrokeStyle(2, 0x6a4a2a).setDepth(9);
    const hatCrown = this.add.triangle(x, feetY - 41, -7, 4, 7, 4, 0, -7, 0xc8a85a)
      .setStrokeStyle(2, 0x6a4a2a).setDepth(9);
    const label = this.add.text(x, feetY - 58, '!', {
      fontFamily: 'serif', fontSize: '18px', fontStyle: 'bold',
      color: '#ffd24a', stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setDepth(9);
    const prompt = this.add.text(x, feetY - 76, 'Q', {
      fontFamily: 'serif', fontSize: '13px', color: '#f4e4bc',
      backgroundColor: '#000a', padding: { x: 6, y: 2 }
    }).setOrigin(0.5).setDepth(10).setVisible(false);
    this.uiRoot.add([body, head, hatBrim, hatCrown, label, prompt]);
    this.riverNpc = { x, feetY, prompt };
  }

  _buildSecretChest(zone, swimL, swimR, swimTop, swimBottom) {
    this.secretChest = null;
    this.secretInfo = null;
    const secret = getSecretForZone(zone.id);
    if (!secret) return;
    if (isSecretFound(this.registry, secret.id)) return;
    const x = swimL + secret.x * (swimR - swimL);
    const y = swimTop + secret.y * (swimBottom - swimTop);
    const c = this.add.container(x, y).setDepth(4);
    const box = this.add.rectangle(0, 0, 18, 14, 0x6e4a2a)
      .setStrokeStyle(1, 0xffd24a, 0.7);
    const lid = this.add.rectangle(0, -8, 20, 4, 0x4a3a1e)
      .setStrokeStyle(1, 0xffd24a, 0.5);
    const glint = this.add.circle(0, 0, 1.5, 0xffd24a, 0.6);
    c.add([box, lid, glint]);
    // Subtle pulse so attentive divers can spot it
    this.tweens.add({
      targets: glint, alpha: { from: 0.3, to: 0.9 },
      duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.InOut'
    });
    this.secretChest = c;
    this.secretInfo = { ...secret, x, y };
  }

  _makeDiver() {
    const c = this.add.container(0, 0);
    const body = this.add.rectangle(0, 0, 14, 22, 0x2e6ea8)
      .setOrigin(0.5).setStrokeStyle(2, 0x14304a);
    const head = this.add.circle(0, -16, 8, 0xf2c89a)
      .setStrokeStyle(2, 0x4a2e1a);
    const fin = this.add.triangle(0, 14, -6, 0, 6, 0, 0, 8, 0x14304a);
    const goggles = this.add.rectangle(0, -16, 12, 4, 0x000000).setAlpha(0.6);
    c.add([fin, body, head, goggles]);
    return c;
  }

  _toggleDive() {
    if (this.mode === 'dive') {
      this._endDive('Surfaced.');
      return;
    }
    // Entering dive — must be idle and near the pier edge.
    if (!this.controller || !this.controller.isIdle()) {
      this._flashPrompt('Reel in first.');
      return;
    }
    if (!this.player) return;
    if (this.pierRightX - this.player.x > PIER_EDGE_DIVE_RANGE) {
      this._flashPrompt('Walk to the pier edge to dive.');
      return;
    }
    this._beginDive();
  }

  _beginDive() {
    const tank = getEquippedTank(this.registry);
    this.oxygenMax = tank.oxygenSec;
    this.oxygenSec = tank.oxygenSec;
    this._diveReturnX = this.player.x;

    this.mode = 'dive';
    this.controller.setPaused(true);

    // Hide pier player + rod.
    this.player.body.setVisible(false);
    this.player.head.setVisible(false);
    this.player.rod.setVisible(false);

    // Place diver just past the pier piling, at the surface.
    this.diver.setPosition(this.pierRightX + 22, this.waterlineY + 14);
    this.diver.setVisible(true);
    this._splashAt(this.pierRightX + 22, this.waterlineY);
    this._flashPrompt(`Dive! Tank: ${tank.name} (${tank.oxygenSec}s). S to surface.`);
  }

  _endDive(reason) {
    this.mode = 'pier';
    this.controller.setPaused(false);
    this.diver.setVisible(false);
    this.player.body.setVisible(true);
    this.player.head.setVisible(true);
    this.player.rod.setVisible(true);
    this._splashAt(this.diver.x, this.waterlineY);
    this.player.x = this._diveReturnX;
    this._syncPlayerVisuals();
    this.oxygenSec = 0;
    if (reason) this._flashPrompt(reason);
  }

  _splashAt(x, y) {
    for (let i = 0; i < 6; i++) {
      const drop = this.add.circle(x, y, 3 + Math.random() * 2, 0xc8e0f0).setDepth(40);
      const dx = (Math.random() - 0.5) * 80;
      const dy = -20 - Math.random() * 30;
      this.tweens.add({
        targets: drop,
        x: x + dx, y: y + dy,
        alpha: { from: 1, to: 0 },
        duration: 500 + Math.random() * 200,
        onComplete: () => drop.destroy()
      });
    }
  }

  _syncPlayerVisuals() {
    const p = this.player;
    if (!p) return;
    p.body.x = p.x;
    p.head.x = p.x;
    const rodBaseX = p.x + ROD_BASE_DX;
    const rodBaseY = p.feetY - 18;
    const rodTipX = p.x + ROD_TIP_DX;
    const rodTipY = this.waterlineY - 60;
    p.rod.setTo(rodBaseX, rodBaseY, rodTipX, rodTipY);
    this.rodTip.x = rodTipX;
    this.rodTip.y = rodTipY;
  }

  _makeFishSprite(fish) {
    const c = this.add.container(0, 0);
    const tail = this.add.triangle(-fish.body.w / 2 - 4, 0,
      0, -fish.body.h / 2,
      0, fish.body.h / 2,
      -fish.body.w * 0.25, 0,
      fish.body.color).setAlpha(0.85);
    const body = this.add.ellipse(0, 0, fish.body.w, fish.body.h, fish.body.color)
      .setAlpha(0.85);
    const stripe = this.add.ellipse(0, 0, fish.body.w * 0.6, fish.body.h * 0.25,
      fish.body.accent).setAlpha(0.55);
    const eye = this.add.circle(fish.body.w * 0.32, -1, 1.6, 0x000000);
    c.add([tail, body, stripe, eye]);
    return c;
  }

  update(time, delta) {
    const dt = delta / 1000;

    if (this.mode === 'pier') {
      this._updatePier(dt);
    } else {
      this._updateDive(dt);
    }

    if (this.controller) this.controller.update(delta);
    this._updateFish(dt);
  }

  _updatePier(dt) {
    if (!this.player || !this.controller) return;
    if (this.controller.state === 'biting') return; // lock walking mid-hook

    let dx = 0;
    if (this.keys.left.isDown || this.keys.leftArrow.isDown) dx -= 1;
    if (this.keys.right.isDown || this.keys.rightArrow.isDown) dx += 1;
    if (dx !== 0) {
      const next = Phaser.Math.Clamp(
        this.player.x + dx * PLAYER_SPEED * dt,
        this.player.xMin, this.player.xMax
      );
      if (next !== this.player.x) {
        this.player.x = next;
        this._syncPlayerVisuals();
      }
    }

    // Show "Q" prompt when standing close to the quest box.
    if (this.questBox) {
      const close = Math.abs(this.player.x - this.questBox.x) <= QUEST_BOX_INTERACT_RANGE;
      this.questBox.prompt.setVisible(close);
    }
    // "E" prompt when close to the shop building.
    if (this.shopBuilding) {
      const close = Math.abs(this.player.x - this.shopBuilding.x) <= SHOP_INTERACT_RANGE;
      this.shopBuilding.prompt.setVisible(close);
    }
    // "Q" prompt over the river NPC when close.
    if (this.riverNpc) {
      const close = Math.abs(this.player.x - this.riverNpc.x) <= NPC_INTERACT_RANGE;
      this.riverNpc.prompt.setVisible(close);
    }
  }

  _updateDive(dt) {
    if (!this.diver) return;

    // Tick oxygen
    this.oxygenSec = Math.max(0, this.oxygenSec - dt);
    if (this.oxygenSec === 0) {
      this._endDive('Out of air!');
      return;
    }

    // 8-way swim. SPACE descends; W/Up ascends.
    let dx = 0, dy = 0;
    if (this.keys.left.isDown || this.keys.leftArrow.isDown) dx -= 1;
    if (this.keys.right.isDown || this.keys.rightArrow.isDown) dx += 1;
    if (this.keys.up.isDown || this.keys.upArrow.isDown) dy -= 1;
    if (this.keys.descend.isDown) dy += 1;
    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy);
      dx /= len; dy /= len;
      const b = this.swimBounds;
      const speed = SWIM_SPEED * getEquippedFin(this.registry).swimSpeedMult;
      this.diver.x = Phaser.Math.Clamp(this.diver.x + dx * speed * dt, b.l, b.r);
      this.diver.y = Phaser.Math.Clamp(this.diver.y + dy * speed * dt, b.t, b.b);
      if (dx !== 0) this.diver.setScale(dx > 0 ? 1 : -1, 1);
    }

    // Secret chest collision (must check before fish loop)
    if (this.secretChest && this.secretInfo) {
      const d = Phaser.Math.Distance.Between(
        this.diver.x, this.diver.y,
        this.secretInfo.x, this.secretInfo.y
      );
      if (d < SECRET_FIND_RADIUS) this._collectSecret();
    }

    // Touch fish to catch — but rares are too slippery to grab by hand.
    // You can see them swimming, you just can't catch them this way.
    for (const f of this.fishSprites) {
      if (!f.visible) continue;
      const d = Phaser.Math.Distance.Between(this.diver.x, this.diver.y, f.x, f.y);
      if (d >= FISH_CATCH_RADIUS) continue;
      const species = f.getData('species');
      const glove = getEquippedGlove(this.registry);
      if (!glove.allowed.includes(species.rarity)) {
        if (!this._rareBumpedRecently) {
          this._rareBumpedRecently = true;
          this._flashPrompt(`${species.rarity[0].toUpperCase()}${species.rarity.slice(1)} — your gloves can't hold it.`);
          this.time.delayedCall(2200, () => { this._rareBumpedRecently = false; });
        }
        continue;
      }
      this._grabFish(f);
    }
  }

  _collectSecret() {
    const info = this.secretInfo;
    if (!info) return;
    const claimed = findSecret(this.registry, info.id);
    if (!claimed) return;
    this._flashPrompt(`Secret! ${info.name} (+${info.gold}g)`, 3500);
    // Sparkle burst at chest position
    for (let i = 0; i < 10; i++) {
      const s = this.add.circle(info.x, info.y, 2 + Math.random() * 2, 0xffd24a)
        .setDepth(40);
      const ang = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 30;
      this.tweens.add({
        targets: s,
        x: info.x + Math.cos(ang) * dist,
        y: info.y + Math.sin(ang) * dist,
        alpha: { from: 1, to: 0 },
        duration: 700,
        onComplete: () => s.destroy()
      });
    }
    this.secretChest.destroy();
    this.secretChest = null;
    this.secretInfo = null;
  }

  _grabFish(fishSprite) {
    const species = fishSprite.getData('species');
    if (!species) return;

    if (isInventoryFull(this.registry)) {
      if (!this._bagFullRecently) {
        this._bagFullRecently = true;
        const bag = getEquippedBag(this.registry);
        this._flashPrompt(`Bag full (${bag.capacity}/${bag.capacity}) — surface and sell.`, 2200);
        this.time.delayedCall(2200, () => { this._bagFullRecently = false; });
      }
      return;
    }

    const { isNew } = recordCatch(this.registry, species.id);
    const variant = rollCatchVariant();
    addToInventory(this.registry, species.id, { variant });
    const glove = getEquippedGlove(this.registry);
    const catchBonus = 5 + (glove.grabBonus || 0);
    const newlyUnlocked = addGold(this.registry, catchBonus);
    this.registry.set('lastCatchToast', {
      speciesId: species.id, name: species.name,
      value: species.value * (VARIANT_MULT[variant] || 1),
      isNew, perfect: false, catchBonus, variant, newlyUnlocked
    });

    // Hide the sprite, schedule respawn elsewhere in the swim area.
    fishSprite.setVisible(false);
    if (fishSprite._respawnTimer) fishSprite._respawnTimer.remove();
    fishSprite._respawnTimer = this.time.delayedCall(FISH_RESPAWN_MS, () => {
      const b = fishSprite.getData('bounds');
      const homeY = fishSprite.getData('homeY');
      fishSprite.x = b.l + Math.random() * (b.r - b.l);
      fishSprite.y = homeY;
      fishSprite.setVisible(true);
    });
  }

  _updateFish(dt) {
    for (const f of this.fishSprites) {
      if (!f.visible) continue;
      let speed = f.getData('speed');
      const b = f.getData('bounds');
      f.x += speed * dt;
      if (f.x < b.l) { f.x = b.l; speed = Math.abs(speed); f.setData('speed', speed); }
      if (f.x > b.r) { f.x = b.r; speed = -Math.abs(speed); f.setData('speed', speed); }
      f.setScale(speed >= 0 ? 1 : -1, 1);
    }
  }

  _shutdown() {
    this.scale.off('resize', this._onResize, this);
    this.registry.events.off('changedata-currentZoneId', this._onZoneChange, this);
    this.input.keyboard.removeAllListeners();
    if (this.controller) { this.controller.destroy(); this.controller = null; }
    this.fishSprites.forEach(f => { if (f._respawnTimer) f._respawnTimer.remove(); });
  }
}

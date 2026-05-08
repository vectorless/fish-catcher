// Owns the cast state machine and the timing-bar minigame for DockScene.
// Mirrors `castState` to the registry so HUD/Dock can read it; emits
// `fish:caught` and `fish:missed` events on the parent scene for UI hooks.
//
// State flow:
//   idle ── SPACE ──► casting ── (arc ~600ms) ──► waiting
//                                                   │
//                              random 1.5–5s × bait.biteDelayMult
//                                                   ▼
//                                                biting (bar visible)
//                                ┌──────────────┼───────────────┐
//                       SPACE in zone     SPACE outside     window expires
//                                ▼              ▼                ▼
//                            HOOKED          MISSED            MISSED
//                                            │
//                                     resolving ── ~1.2s ── idle
//
// rodTip is a live-mutated {x,y} reference owned by DockScene. We re-read
// it each frame so the line and idle bobber follow the walking player.

import Phaser from 'phaser';
import {
  getEquippedRod, getEquippedBait, addGold, addToInventory,
  recordCatch, rollSpecies, rollCatchVariant, VARIANT_MULT
} from '../state.js';

const CAST_MS = 600;
const BITE_DELAY_MIN_MS = 1500;
const BITE_DELAY_MAX_MS = 5000;
const SWEEP_SPEED = 200;       // px/sec — base, scaled by species rarity
const RARITY_SWEEP_MULT = { common: 1.0, uncommon: 1.4, rare: 1.9, epic: 2.5, legendary: 3.2 };
const BAR_W = 320;
const BAR_H = 24;
const MAX_SWEEPS = 2;
const BASE_HIT_FRAC = 0.18;
const HOOKED_HOLD_MS = 1100;
const MISS_HOLD_MS = 900;

export class FishingController extends Phaser.Events.EventEmitter {
  constructor(scene, opts) {
    super();
    this.scene = scene;
    this.rodTip = opts.rodTip;             // live-mutated {x,y}
    this.landY = opts.landY;               // water surface y
    this.castRangeX = opts.castRangeX;     // px right of rod tip where bobber lands
    this.barCenter = opts.barCenter;
    this.canCast = opts.canCast || (() => true);
    this.paused = false;

    this.state = 'idle';
    this._setRegistryState('idle');

    // Bobber + line (line is white, hugs from rod tip to bobber)
    this.bobber = scene.add.circle(this.rodTip.x, this.rodTip.y, 5, 0xff5252)
      .setStrokeStyle(2, 0x000000).setDepth(20);
    this.line = scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff, 0.85)
      .setOrigin(0, 0).setLineWidth(1).setDepth(19);

    this.alertText = scene.add.text(0, 0, '!', {
      fontFamily: 'serif', fontSize: '28px', fontStyle: 'bold',
      color: '#ffd24a', stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(25).setVisible(false);

    // Timing bar
    this.bar = scene.add.container(this.barCenter.x, this.barCenter.y).setDepth(30);
    this.barBg = scene.add.rectangle(0, 0, BAR_W, BAR_H, 0x1a1a2e)
      .setStrokeStyle(2, 0x4a4a6e);
    this.hitZone = scene.add.rectangle(0, 0, 1, BAR_H - 4, 0x4ec97a);
    this.perfectZone = scene.add.rectangle(0, 0, 1, BAR_H - 6, 0xfff15a);
    this.cursor = scene.add.rectangle(0, 0, 4, BAR_H + 8, 0xffffff);
    this.barLabel = scene.add.text(0, -BAR_H, 'SPACE to hook!', {
      fontFamily: 'serif', fontSize: '16px', color: '#f4e4bc',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5);
    this.bar.add([this.barBg, this.hitZone, this.perfectZone, this.cursor, this.barLabel]);
    this.bar.setVisible(false);

    // Per-bite scratch
    this.cursorX = 0;
    this.cursorDir = 1;
    this.sweeps = 0;
    this.hitL = 0; this.hitR = 0;
    this.perfL = 0; this.perfR = 0;
    this.species = null;
    this.bobberLand = { x: 0, y: 0 };  // computed at cast time

    this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this._biteTimer = null;
    this._resolveTimer = null;
    this._bobbleTween = null;
  }

  isIdle() {
    return this.state === 'idle';
  }

  // Disable input + hide the rod line and bobber. Used while diving.
  setPaused(p) {
    this.paused = !!p;
    this.bobber.setVisible(!this.paused);
    this.line.setVisible(!this.paused);
  }

  cast() {
    if (this.state !== 'idle') return;
    this._setState('casting');

    const startX = this.rodTip.x;
    const startY = this.rodTip.y;
    const landX = this.rodTip.x + this.castRangeX;
    const landY = this.landY;
    this.bobberLand.x = landX;
    this.bobberLand.y = landY;

    this.bobber.setPosition(startX, startY);

    const peakY = Math.min(startY, landY) - 80;
    this.scene.tweens.add({
      targets: this.bobber, x: landX,
      duration: CAST_MS, ease: 'Sine.Out'
    });
    this.scene.tweens.add({
      targets: this.bobber, y: peakY,
      duration: CAST_MS / 2, ease: 'Sine.Out',
      yoyo: true,
      onYoyo: () => {
        this.scene.tweens.add({
          targets: this.bobber, y: landY,
          duration: CAST_MS / 2, ease: 'Sine.In'
        });
      }
    });

    this.scene.time.delayedCall(CAST_MS, () => {
      if (this.state !== 'casting') return;
      this._enterWaiting();
    });
  }

  _enterWaiting() {
    this._setState('waiting');
    const bait = getEquippedBait(this.scene.registry);
    const lo = BITE_DELAY_MIN_MS * bait.biteDelayMult;
    const hi = BITE_DELAY_MAX_MS * bait.biteDelayMult;
    const wait = lo + Math.random() * (hi - lo);
    this._biteTimer = this.scene.time.delayedCall(wait, () => this._enterBiting());

    this._bobbleTween = this.scene.tweens.add({
      targets: this.bobber, y: this.bobberLand.y - 2,
      duration: 600, yoyo: true, repeat: -1, ease: 'Sine.InOut'
    });
  }

  _enterBiting() {
    if (this._bobbleTween) { this._bobbleTween.stop(); this._bobbleTween = null; }
    this._setState('biting');
    this.species = rollSpecies(this.scene.registry);

    this.alertText.setPosition(this.bobberLand.x, this.bobberLand.y - 26);
    this.alertText.setVisible(true);
    this.scene.tweens.add({
      targets: this.alertText, y: this.bobberLand.y - 36,
      duration: 220, yoyo: true, repeat: 3
    });

    const rod = getEquippedRod(this.scene.registry);
    const hitFrac = Phaser.Math.Clamp(BASE_HIT_FRAC * rod.hitZoneMult, 0.05, 0.85);
    const hitWidth = BAR_W * hitFrac;
    const center = (0.15 + Math.random() * 0.7) * BAR_W;
    this.hitL = center - hitWidth / 2;
    this.hitR = center + hitWidth / 2;
    const perfWidth = hitWidth * rod.perfectZoneMult;
    this.perfL = center - perfWidth / 2;
    this.perfR = center + perfWidth / 2;

    const localCenter = center - BAR_W / 2;
    this.hitZone.setSize(hitWidth, BAR_H - 4);
    this.hitZone.setPosition(localCenter, 0);
    this.perfectZone.setSize(perfWidth, BAR_H - 6);
    this.perfectZone.setPosition(localCenter, 0);

    this.cursorX = 0;
    this.cursorDir = 1;
    this.sweeps = 0;
    this.cursor.setPosition(-BAR_W / 2, 0);
    this.bar.setVisible(true);
  }

  update(deltaMs) {
    if (this.paused) return;

    // Idle: bobber sits at rod tip (held by the player). Casting/waiting/
    // biting/resolving: bobber's position is owned by tweens or by the
    // bite logic, so we don't move it here.
    if (this.state === 'idle') {
      this.bobber.setPosition(this.rodTip.x, this.rodTip.y);
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        if (!this.canCast()) {
          this.emit('cast:rejected');
        } else {
          this.cast();
        }
      }
    }

    if (this.state === 'biting') {
      const dt = deltaMs / 1000;
      const speedMult = RARITY_SWEEP_MULT[this.species?.rarity] ?? 1;
      this.cursorX += this.cursorDir * SWEEP_SPEED * speedMult * dt;
      if (this.cursorX <= 0) { this.cursorX = 0; this.cursorDir = 1; this.sweeps++; }
      if (this.cursorX >= BAR_W) { this.cursorX = BAR_W; this.cursorDir = -1; this.sweeps++; }
      this.cursor.setPosition(this.cursorX - BAR_W / 2, 0);
      if (this.sweeps >= MAX_SWEEPS) { this._missed('Got away…'); return; }
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) this._attemptHook();
    }

    // Always keep the line attached: rod tip → bobber.
    this.line.setTo(this.rodTip.x, this.rodTip.y, this.bobber.x, this.bobber.y);
  }

  _attemptHook() {
    const x = this.cursorX;
    const inHit = x >= this.hitL && x <= this.hitR;
    if (!inHit) { this._missed('Got away…'); return; }
    const perfect = x >= this.perfL && x <= this.perfR;
    this._hooked(perfect);
  }

  _hooked(perfect) {
    this.bar.setVisible(false);
    this.alertText.setVisible(false);
    this._setState('resolving');

    const species = this.species;
    const variant = rollCatchVariant();
    const sellValue = species.value * (VARIANT_MULT[variant] || 1);
    const perfectBonus = perfect ? Math.max(1, Math.floor(sellValue * 0.5)) : 0;
    const catchBonus = 5;
    const { isNew } = recordCatch(this.scene.registry, species.id);
    addToInventory(this.scene.registry, species.id, { variant });
    // Tip jar: a flat catch bonus + the perfect bonus are paid as immediate
    // gold. The fish itself sits in inventory until sold for its base value.
    const newlyUnlocked = addGold(this.scene.registry, catchBonus + perfectBonus);

    this.scene.registry.set('lastCatchToast', {
      speciesId: species.id, name: species.name, value: sellValue,
      isNew, perfect, perfectBonus, catchBonus, variant, newlyUnlocked
    });
    this.emit('fish:caught', { species, value: sellValue, isNew, perfect, perfectBonus, catchBonus, variant, newlyUnlocked });

    this.scene.tweens.add({
      targets: this.bobber, y: this.bobber.y - 16,
      duration: 180, yoyo: true, repeat: 1
    });

    this._resolveTimer = this.scene.time.delayedCall(HOOKED_HOLD_MS, () => this._toIdle());
  }

  _missed(reason) {
    this.bar.setVisible(false);
    this.alertText.setVisible(false);
    if (this._biteTimer) { this._biteTimer.remove(); this._biteTimer = null; }
    if (this._bobbleTween) { this._bobbleTween.stop(); this._bobbleTween = null; }
    this._setState('resolving');
    this.scene.registry.set('lastCatchToast', { missed: true, reason });
    this.emit('fish:missed', { reason });
    this._resolveTimer = this.scene.time.delayedCall(MISS_HOLD_MS, () => this._toIdle());
  }

  _toIdle() {
    this._setState('idle');
    this.species = null;
    // bobber will snap to rod tip on next update tick
  }

  _setState(s) {
    this.state = s;
    this._setRegistryState(s);
  }

  _setRegistryState(s) {
    this.scene.registry.set('castState', s);
  }

  destroy() {
    if (this._biteTimer) this._biteTimer.remove();
    if (this._resolveTimer) this._resolveTimer.remove();
    if (this._bobbleTween) this._bobbleTween.stop();
    this.bobber?.destroy();
    this.line?.destroy();
    this.alertText?.destroy();
    this.bar?.destroy();
    this.removeAllListeners();
  }
}

// Persistent overlay launched once by DockScene.
// Listens to registry change events to keep readouts in sync.

import Phaser from 'phaser';
import { getCurrentZone, getEquippedRod, getEquippedBait, getEquippedBag, getInventoryCount, VARIANT_DISPLAY } from '../state.js';
import { ZONES } from '../data/zones.js';
import { FISH, RARITY_COLOR } from '../data/fish.js';

export class HUDScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HUDScene', active: false });
  }

  create() {
    this.goldText = this.add.text(20, 18, '', {
      fontFamily: 'serif', fontSize: '24px', color: '#ffd24a',
      stroke: '#000', strokeThickness: 3
    }).setScrollFactor(0).setDepth(1000);

    this.zoneText = this.add.text(0, 18, '', {
      fontFamily: 'serif', fontSize: '16px', color: '#cbb98a',
      stroke: '#000', strokeThickness: 2
    }).setScrollFactor(0).setDepth(1000).setOrigin(1, 0);

    this.gearText = this.add.text(0, 42, '', {
      fontFamily: 'serif', fontSize: '13px', color: '#a8b6c4'
    }).setScrollFactor(0).setDepth(1000).setOrigin(1, 0);

    this.bagText = this.add.text(0, 60, '', {
      fontFamily: 'serif', fontSize: '13px', color: '#9ec45f'
    }).setScrollFactor(0).setDepth(1000).setOrigin(1, 0);

    this.helpText = this.add.text(20, 0, 'A/D walk · SPACE cast/hook · S dive · W/SPACE ascend/descend · E shop · F fishdex · Z zones · Q quest · R redeem · T tutorial', {
      fontFamily: 'serif', fontSize: '12px', color: '#7a8a9a'
    }).setScrollFactor(0).setDepth(1000).setOrigin(0, 1);

    // Oxygen bar — only shown while diving.
    this.oxygenGroup = this.add.container(0, 0).setDepth(1000).setVisible(false);
    const oxBg = this.add.rectangle(0, 0, 220, 16, 0x0a1a2a)
      .setOrigin(0.5).setStrokeStyle(2, 0x1a3a5a);
    this.oxygenFill = this.add.rectangle(-110, 0, 216, 12, 0x6ec9ff)
      .setOrigin(0, 0.5);
    this.oxygenLabel = this.add.text(0, 0, '', {
      fontFamily: 'serif', fontSize: '12px', fontStyle: 'bold',
      color: '#ffffff', stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5);
    this.oxygenGroup.add([oxBg, this.oxygenFill, this.oxygenLabel]);

    this.toastText = this.add.text(0, 0, '', {
      fontFamily: 'serif', fontSize: '20px', color: '#f4e4bc',
      backgroundColor: '#000a', padding: { x: 12, y: 6 },
      stroke: '#000', strokeThickness: 2
    }).setScrollFactor(0).setDepth(1100).setOrigin(0.5).setVisible(false);

    this.promptText = this.add.text(0, 0, '', {
      fontFamily: 'serif', fontSize: '16px', color: '#ffd24a',
      backgroundColor: '#000a', padding: { x: 8, y: 4 }
    }).setScrollFactor(0).setDepth(1100).setOrigin(0.5).setVisible(false);

    this._refreshGold();
    this._refreshZone();
    this._refreshGear();
    this._refreshBag();

    this.registry.events.on('changedata-gold', this._refreshGold, this);
    this.registry.events.on('changedata-currentZoneId', this._refreshZone, this);
    this.registry.events.on('changedata-equippedRodId', this._refreshGear, this);
    this.registry.events.on('changedata-equippedBaitId', this._refreshGear, this);
    this.registry.events.on('changedata-equippedBagId', this._refreshBag, this);
    this.registry.events.on('changedata-inventory', this._refreshBag, this);
    this.registry.events.on('changedata-lastCatchToast', this._onCatchToast, this);

    this.scale.on('resize', this._layout, this);
    this._layout();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this._shutdown, this);
  }

  _layout() {
    const { width, height } = this.scale;
    this.zoneText.setPosition(width - 20, 18);
    this.gearText.setPosition(width - 20, 42);
    this.bagText.setPosition(width - 20, 60);
    this.helpText.setPosition(20, height - 12);
    this.toastText.setPosition(width / 2, 80);
    this.promptText.setPosition(width / 2, height - 50);
    this.oxygenGroup.setPosition(width / 2, height - 90);
  }

  _refreshGold() {
    const g = this.registry.get('gold') ?? 0;
    this.goldText.setText(`${g} g`);
  }

  _refreshZone() {
    const zone = getCurrentZone(this.registry);
    this.zoneText.setText(zone.name);
  }

  _refreshGear() {
    const rod = getEquippedRod(this.registry);
    const bait = getEquippedBait(this.registry);
    this.gearText.setText(`${rod.name} · ${bait.name}`);
  }

  _refreshBag() {
    const bag = getEquippedBag(this.registry);
    const count = getInventoryCount(this.registry);
    const full = count >= bag.capacity;
    this.bagText.setColor(full ? '#ff8888' : '#9ec45f');
    this.bagText.setText(`${bag.name}: ${count}/${bag.capacity}${full ? '  (full!)' : ''}`);
  }

  _onCatchToast() {
    const t = this.registry.get('lastCatchToast');
    if (!t) { this.toastText.setVisible(false); return; }
    if (t.missed) {
      this.toastText.setColor('#ff8888');
      this.toastText.setText(t.reason || 'Got away…');
    } else {
      const fish = FISH[t.speciesId];
      const variantStyle = t.variant ? VARIANT_DISPLAY[t.variant] : null;
      const color = variantStyle ? variantStyle.color : (RARITY_COLOR[fish?.rarity] || '#f4e4bc');
      this.toastText.setColor(color);
      const tags = [];
      if (t.variant) tags.push(t.variant.toUpperCase());
      if (t.perfect) tags.push('PERFECT');
      if (t.isNew) tags.push('NEW');
      const tagStr = tags.length ? `  [${tags.join(' · ')}]` : '';
      const bonusParts = [];
      if (t.catchBonus) bonusParts.push(`+${t.catchBonus}g`);
      if (t.perfectBonus) bonusParts.push(`+${t.perfectBonus}g perfect`);
      const bonusStr = bonusParts.length ? `  (${bonusParts.join(' ')})` : '';
      const namePrefix = variantStyle ? variantStyle.prefix : '';
      this.toastText.setText(`Caught ${namePrefix}${t.name} — sells for ${t.value}g${bonusStr}${tagStr}`);
    }
    this.toastText.setAlpha(1);
    this.toastText.setVisible(true);
    this.tweens.killTweensOf(this.toastText);
    this.tweens.add({
      targets: this.toastText, alpha: { from: 1, to: 0 },
      duration: 2500, hold: 800,
      onComplete: () => this.toastText.setVisible(false)
    });

    // Stack a second toast for any zone-unlock event.
    if (t.newlyUnlocked && t.newlyUnlocked.length) {
      const names = t.newlyUnlocked.map(id => ZONES[id]?.name || id).join(', ');
      this.flashPrompt(`New zone unlocked: ${names}!  (Z to switch)`, 4000);
    }
  }

  update() {
    // Poll dive state directly from DockScene (live numbers, no event spam).
    const dock = this.scene.get('DockScene');
    if (!dock || dock.mode !== 'dive' || !dock.oxygenMax) {
      if (this.oxygenGroup.visible) this.oxygenGroup.setVisible(false);
      return;
    }
    if (!this.oxygenGroup.visible) this.oxygenGroup.setVisible(true);
    const ratio = Phaser.Math.Clamp(dock.oxygenSec / dock.oxygenMax, 0, 1);
    this.oxygenFill.width = 216 * ratio;
    this.oxygenFill.fillColor = ratio > 0.5 ? 0x6ec9ff : ratio > 0.25 ? 0xffd24a : 0xff5a5a;
    this.oxygenLabel.setText(`O₂  ${dock.oxygenSec.toFixed(1)}s / ${dock.oxygenMax}s`);
  }

  flashPrompt(text, duration = 1800) {
    this.promptText.setText(text);
    this.promptText.setVisible(true);
    this.promptText.setAlpha(1);
    this.tweens.killTweensOf(this.promptText);
    this.tweens.add({
      targets: this.promptText, alpha: { from: 1, to: 0 },
      duration, hold: 600,
      onComplete: () => this.promptText.setVisible(false)
    });
  }

  _shutdown() {
    this.registry.events.off('changedata-gold', this._refreshGold, this);
    this.registry.events.off('changedata-currentZoneId', this._refreshZone, this);
    this.registry.events.off('changedata-equippedRodId', this._refreshGear, this);
    this.registry.events.off('changedata-equippedBaitId', this._refreshGear, this);
    this.registry.events.off('changedata-equippedBagId', this._refreshBag, this);
    this.registry.events.off('changedata-inventory', this._refreshBag, this);
    this.registry.events.off('changedata-lastCatchToast', this._onCatchToast, this);
    this.scale.off('resize', this._layout, this);
  }
}

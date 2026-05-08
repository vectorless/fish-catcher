// Pick which zone to fish at. Locked zones grayed with their unlock threshold.

import Phaser from 'phaser';
import { ZONES, ZONE_ORDER } from '../data/zones.js';
import { setCurrentZone } from '../state.js';

const CARD_W = 280;
const CARD_H = 130;
const CARD_GAP = 24;

export class ZoneSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ZoneSelectScene' });
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0, 0).setDepth(0).setInteractive();

    this.title = this.add.text(width / 2, 70, 'Where to fish?', {
      fontFamily: 'serif', fontSize: '36px', color: '#f4e4bc',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(1);

    this.feedback = this.add.text(width / 2, 110, '', {
      fontFamily: 'serif', fontSize: '15px', color: '#ff8888'
    }).setOrigin(0.5).setDepth(1);

    this.hint = this.add.text(width / 2, height - 30, 'ESC to close', {
      fontFamily: 'serif', fontSize: '13px', color: '#7a8a9a'
    }).setOrigin(0.5).setDepth(1);

    this.cards = [];
    this._refresh();

    this.input.keyboard.on('keydown-ESC', () => this._close());
    this.input.keyboard.on('keydown-Z', () => this._close());

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard.removeAllListeners();
    });
  }

  _close() {
    this.scene.stop();
    this.scene.resume('DockScene');
  }

  _refresh() {
    this.cards.forEach(c => c.destroy());
    this.cards = [];

    const { width, height } = this.scale;
    const unlocked = new Set(this.registry.get('unlockedZones') || ['pond']);
    const currentId = this.registry.get('currentZoneId') || 'pond';
    const earned = this.registry.get('goldEarnedTotal') || 0;

    const tiers = ZONE_ORDER.map(id => ZONES[id]);
    const totalH = tiers.length * CARD_H + (tiers.length - 1) * CARD_GAP;
    let y = (height - totalH) / 2;
    for (const zone of tiers) {
      const card = this._makeZoneCard(zone, unlocked.has(zone.id), zone.id === currentId, earned);
      card.setPosition(width / 2, y + CARD_H / 2).setDepth(1);
      this.cards.push(card);
      y += CARD_H + CARD_GAP;
    }
  }

  _makeZoneCard(zone, isUnlocked, isCurrent, earned) {
    const c = this.add.container(0, 0);
    let bgColor, strokeColor, statusText, statusColor, clickable;
    if (isCurrent) {
      bgColor = 0x3b5a78; strokeColor = 0xffe27a;
      statusText = '★ HERE NOW'; statusColor = '#ffe27a'; clickable = false;
    } else if (isUnlocked) {
      bgColor = 0x223445; strokeColor = 0x9ec45f;
      statusText = 'click to travel'; statusColor = '#9ec45f'; clickable = true;
    } else {
      const need = Math.max(0, zone.unlockGoldThreshold - earned);
      bgColor = 0x252a30; strokeColor = 0x44505a;
      statusText = `Locked — earn ${need}g more (${earned} / ${zone.unlockGoldThreshold})`;
      statusColor = '#7a8a9a'; clickable = false;
    }

    const bg = this.add.rectangle(0, 0, CARD_W, CARD_H, bgColor)
      .setStrokeStyle(2, strokeColor);
    if (clickable) {
      bg.setInteractive({ useHandCursor: true });
      bg.on('pointerdown', () => this._handleClick(zone));
      bg.on('pointerover', () => bg.setFillStyle(Phaser.Display.Color.IntegerToColor(bgColor).clone().brighten(15).color));
      bg.on('pointerout', () => bg.setFillStyle(bgColor));
    }
    c.add(bg);

    // Water swatch on the left
    const swatch = this.add.rectangle(-CARD_W / 2 + 36, 0, 56, CARD_H - 24,
      isUnlocked ? zone.waterColor : 0x1a1a22).setStrokeStyle(2, 0x000000);
    c.add(swatch);

    const name = this.add.text(-CARD_W / 2 + 80, -CARD_H / 2 + 14, zone.name, {
      fontFamily: 'serif', fontSize: '20px',
      color: isUnlocked ? '#f4e4bc' : '#7a8a9a', fontStyle: 'bold'
    }).setOrigin(0, 0);
    c.add(name);

    const blurb = this.add.text(-CARD_W / 2 + 80, -CARD_H / 2 + 42, zone.blurb, {
      fontFamily: 'serif', fontSize: '12px',
      color: isUnlocked ? '#cbb98a' : '#5a6a7a',
      fontStyle: 'italic',
      wordWrap: { width: CARD_W - 100 }
    }).setOrigin(0, 0);
    c.add(blurb);

    const status = this.add.text(0, CARD_H / 2 - 16, statusText, {
      fontFamily: 'serif', fontSize: '12px', color: statusColor
    }).setOrigin(0.5);
    c.add(status);

    return c;
  }

  _handleClick(zone) {
    const ok = setCurrentZone(this.registry, zone.id);
    if (!ok) {
      this.feedback.setText('Zone is locked.');
      this.feedback.setAlpha(1);
      this.tweens.add({ targets: this.feedback, alpha: 0, duration: 1500, hold: 500 });
      return;
    }
    this._close();
  }
}

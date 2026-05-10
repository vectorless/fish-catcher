// Pick which zone to fish at. Locked zones grayed with their unlock threshold.

import Phaser from 'phaser';
import { ZONES, ZONE_ORDER } from '../data/zones.js';
import { setCurrentZone } from '../state.js';

const CARD_W = 210;
const CARD_H = 96;
const CARD_GAP_X = 14;
const CARD_GAP_Y = 12;
const SIDE_MARGIN = 20;
const CONTENT_TOP_Y = 124;
const CONTENT_BOTTOM_PAD = 44;

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
    }).setOrigin(0.5).setDepth(2);

    this.feedback = this.add.text(width / 2, 110, '', {
      fontFamily: 'serif', fontSize: '15px', color: '#ff8888'
    }).setOrigin(0.5).setDepth(2);

    this.hint = this.add.text(width / 2, height - 30,
      'ESC to close · scroll if zones extend past the screen', {
      fontFamily: 'serif', fontSize: '13px', color: '#7a8a9a'
    }).setOrigin(0.5).setDepth(2);

    // Scrollable container so the grid still works on short windows.
    this.scrollContainer = this.add.container(0, CONTENT_TOP_Y).setDepth(1);
    this.scrollMask = this.add.graphics().setVisible(false);
    this.scrollContainer.setMask(this.scrollMask.createGeometryMask());

    this._refresh();

    this.input.keyboard.on('keydown-ESC', () => this._close());
    this.input.keyboard.on('keydown-Z', () => this._close());
    this.input.on('wheel', this._onWheel, this);
    this.scale.on('resize', this._refresh, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard.removeAllListeners();
      this.input.removeAllListeners('wheel');
      this.scale.off('resize', this._refresh, this);
    });
  }

  _close() {
    this.scene.stop();
    this.scene.resume('DockScene');
  }

  _refresh() {
    const { width, height } = this.scale;
    this.title.setPosition(width / 2, 70);
    this.feedback.setPosition(width / 2, 110);
    this.hint.setPosition(width / 2, height - 30);

    // Resize scroll mask to current viewport.
    const maskTop = CONTENT_TOP_Y;
    const maskBottom = height - CONTENT_BOTTOM_PAD;
    const maskH = Math.max(120, maskBottom - maskTop);
    this.scrollMask.clear();
    this.scrollMask.fillStyle(0xffffff);
    this.scrollMask.fillRect(0, maskTop, width, maskH);

    this.scrollContainer.removeAll(true);

    const unlocked = new Set(this.registry.get('unlockedZones') || ['pond']);
    const currentId = this.registry.get('currentZoneId') || 'pond';
    const earned = this.registry.get('goldEarnedTotal') || 0;
    const tiers = ZONE_ORDER.map(id => ZONES[id]);

    const usable = Math.max(CARD_W, width - SIDE_MARGIN * 2);
    const perRow = Math.max(1, Math.floor((usable + CARD_GAP_X) / (CARD_W + CARD_GAP_X)));
    const rowCount = Math.ceil(tiers.length / perRow);

    for (let r = 0; r < rowCount; r++) {
      const rowItems = tiers.slice(r * perRow, r * perRow + perRow);
      const rowW = rowItems.length * CARD_W + (rowItems.length - 1) * CARD_GAP_X;
      let x = (width - rowW) / 2;
      const cy = r * (CARD_H + CARD_GAP_Y) + CARD_H / 2;
      for (const zone of rowItems) {
        const card = this._makeZoneCard(zone, unlocked.has(zone.id), zone.id === currentId, earned);
        card.setPosition(x + CARD_W / 2, cy);
        this.scrollContainer.add(card);
        x += CARD_W + CARD_GAP_X;
      }
    }

    this._contentH = rowCount * CARD_H + (rowCount - 1) * CARD_GAP_Y;
    this.scrollContainer.y = CONTENT_TOP_Y;
  }

  _onWheel(_p, _o, _dx, dy) {
    const { height } = this.scale;
    const viewH = (height - CONTENT_BOTTOM_PAD) - CONTENT_TOP_Y;
    const overflow = Math.max(0, this._contentH - viewH);
    if (overflow === 0) return;
    const minY = CONTENT_TOP_Y - overflow;
    const next = this.scrollContainer.y - dy * 0.5;
    this.scrollContainer.y = Phaser.Math.Clamp(next, minY, CONTENT_TOP_Y);
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

    const swatch = this.add.rectangle(-CARD_W / 2 + 22, 0, 32, CARD_H - 22,
      isUnlocked ? zone.waterColor : 0x1a1a22).setStrokeStyle(2, 0x000000);
    c.add(swatch);

    const name = this.add.text(-CARD_W / 2 + 46, -CARD_H / 2 + 8, zone.name, {
      fontFamily: 'serif', fontSize: '15px',
      color: isUnlocked ? '#f4e4bc' : '#7a8a9a', fontStyle: 'bold'
    }).setOrigin(0, 0);
    c.add(name);

    const blurb = this.add.text(-CARD_W / 2 + 46, -CARD_H / 2 + 28, zone.blurb, {
      fontFamily: 'serif', fontSize: '10px',
      color: isUnlocked ? '#cbb98a' : '#5a6a7a',
      fontStyle: 'italic',
      wordWrap: { width: CARD_W - 56 }
    }).setOrigin(0, 0);
    c.add(blurb);

    const status = this.add.text(0, CARD_H / 2 - 10, statusText, {
      fontFamily: 'serif', fontSize: '10px', color: statusColor
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

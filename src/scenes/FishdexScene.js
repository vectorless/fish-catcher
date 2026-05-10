// Collection log. Grouped by zone, sorted within zone by rarity (rare → common).
// Locked entries: black silhouette + "???" + rarity color border.
// Caught entries: full-color sprite + name + rarity color.

import Phaser from 'phaser';
import { ZONES, ZONE_ORDER } from '../data/zones.js';
import { FISH, RARITY_COLOR } from '../data/fish.js';
import { hasCaught } from '../state.js';

const CARD_W = 150;
const CARD_H = 110;
const CARD_GAP_X = 14;
const CARD_GAP_Y = 16;
const SECTION_GAP = 30;
const SIDE_MARGIN = 30;

const RARITY_RANK = { godlike: 0, legendary: 1, epic: 2, rare: 3, uncommon: 4, common: 5 };

export class FishdexScene extends Phaser.Scene {
  constructor() {
    super({ key: 'FishdexScene' });
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(0, 0, width, height, 0x081420, 0.92)
      .setOrigin(0, 0).setDepth(0).setInteractive();

    this.title = this.add.text(width / 2, 50, 'Fishdex', {
      fontFamily: 'serif', fontSize: '40px', color: '#f4e4bc',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(1);

    this.summary = this.add.text(width / 2, 92, '', {
      fontFamily: 'serif', fontSize: '15px', color: '#cbb98a'
    }).setOrigin(0.5).setDepth(1);

    this.hint = this.add.text(width / 2, height - 30, 'ESC to close', {
      fontFamily: 'serif', fontSize: '13px', color: '#7a8a9a'
    }).setOrigin(0.5).setDepth(1);

    // Scrollable container for sections
    this.scrollContainer = this.add.container(0, 0).setDepth(1);
    this.contentTopY = 130;
    this.contentBottomY = height - 60;

    this.scrollMask = this.add.graphics().setVisible(false);
    this.scrollMask.fillStyle(0xffffff);
    this.scrollMask.fillRect(0, this.contentTopY, width, this.contentBottomY - this.contentTopY);
    this.scrollContainer.setMask(this.scrollMask.createGeometryMask());

    this._build();

    this.input.keyboard.on('keydown-ESC', () => this._close());
    this.input.keyboard.on('keydown-F', () => this._close());
    this.input.on('wheel', (_p, _o, _dx, dy) => {
      const overflow = Math.max(0, this._contentH - (this.contentBottomY - this.contentTopY));
      if (overflow === 0) return;
      const minY = this.contentTopY - overflow;
      const next = this.scrollContainer.y - dy * 0.5;
      this.scrollContainer.y = Phaser.Math.Clamp(next, minY, this.contentTopY);
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard.removeAllListeners();
      this.input.removeAllListeners('wheel');
    });
  }

  _close() {
    this.scene.stop();
    this.scene.resume('DockScene');
  }

  _build() {
    const { width } = this.scale;
    const unlocked = new Set(this.registry.get('unlockedZones') || ['pond']);
    const dex = this.registry.get('fishdex') || [];
    const totalCaught = dex.length;
    const totalSpecies = Object.keys(FISH).length;
    this.summary.setText(`${totalCaught} / ${totalSpecies} species discovered`);

    let y = 0;
    for (const zoneId of ZONE_ORDER) {
      const zone = ZONES[zoneId];
      const zoneIsUnlocked = unlocked.has(zoneId);
      const species = zone.fishPool
        .map(id => FISH[id])
        .sort((a, b) => RARITY_RANK[a.rarity] - RARITY_RANK[b.rarity]);
      const caughtInZone = species.filter(s => hasCaught(this.registry, s.id)).length;

      // Header
      const headerColor = zoneIsUnlocked ? '#f4e4bc' : '#7a8a9a';
      const headerText = zoneIsUnlocked
        ? `${zone.name.toUpperCase()}    ${caughtInZone} / ${species.length} caught`
        : `${zone.name.toUpperCase()}    [locked — ${zone.unlockGoldThreshold}g earned]`;
      const header = this.add.text(width / 2, y + 16, headerText, {
        fontFamily: 'serif', fontSize: '20px', color: headerColor,
        fontStyle: 'bold'
      }).setOrigin(0.5, 0);
      this.scrollContainer.add(header);
      y += 44;

      // Card grid (wraps to multiple rows when there are more cards than fit)
      const usable = Math.max(CARD_W, width - SIDE_MARGIN * 2);
      const perRow = Math.max(1, Math.floor((usable + CARD_GAP_X) / (CARD_W + CARD_GAP_X)));
      const rowCount = Math.ceil(species.length / perRow);
      for (let r = 0; r < rowCount; r++) {
        const rowItems = species.slice(r * perRow, r * perRow + perRow);
        const rowW = rowItems.length * CARD_W + (rowItems.length - 1) * CARD_GAP_X;
        let x = (width - rowW) / 2;
        const cy = y + r * (CARD_H + CARD_GAP_Y) + CARD_H / 2;
        for (const fish of rowItems) {
          const caught = hasCaught(this.registry, fish.id);
          const card = this._makeFishCard(fish, caught, zoneIsUnlocked);
          card.setPosition(x + CARD_W / 2, cy);
          this.scrollContainer.add(card);
          x += CARD_W + CARD_GAP_X;
        }
      }
      y += rowCount * CARD_H + (rowCount - 1) * CARD_GAP_Y + SECTION_GAP;
    }

    this._contentH = y;
    this.scrollContainer.setPosition(0, this.contentTopY);
  }

  _makeFishCard(fish, caught, zoneUnlocked) {
    const c = this.add.container(0, 0);
    const rarityColorHex = RARITY_COLOR[fish.rarity];
    const rarityColorInt = Phaser.Display.Color.HexStringToColor(rarityColorHex).color;

    const bg = this.add.rectangle(0, 0, CARD_W, CARD_H,
      caught ? 0x1a2a3a : 0x141a22)
      .setStrokeStyle(2, caught ? rarityColorInt : 0x3a4452);
    c.add(bg);

    // Fish sprite (silhouette if not caught)
    const fishSprite = this._makeFishVisual(fish, caught);
    fishSprite.setPosition(0, -10);
    c.add(fishSprite);

    // Name / ???
    const nameText = caught ? fish.name : '???';
    const name = this.add.text(0, 32, nameText, {
      fontFamily: 'serif', fontSize: '13px',
      color: caught ? '#f4e4bc' : '#5a6a7a',
      fontStyle: caught ? 'normal' : 'italic'
    }).setOrigin(0.5);
    c.add(name);

    // Rarity / value line
    if (caught) {
      const valueText = this.add.text(0, 50, `${fish.rarity} · ${fish.value}g`, {
        fontFamily: 'serif', fontSize: '11px', color: rarityColorHex
      }).setOrigin(0.5);
      c.add(valueText);
    } else {
      const rarityText = this.add.text(0, 50, fish.rarity, {
        fontFamily: 'serif', fontSize: '11px', color: rarityColorHex,
        fontStyle: 'italic'
      }).setOrigin(0.5).setAlpha(0.7);
      c.add(rarityText);
    }

    return c;
  }

  _makeFishVisual(fish, caught) {
    const c = this.add.container(0, 0);
    const bodyColor = caught ? fish.body.color : 0x000000;
    const accentColor = caught ? fish.body.accent : 0x000000;
    const alpha = caught ? 0.95 : 0.85;
    const scale = Math.min(1.0, 110 / Math.max(fish.body.w + 12, 60));

    const tail = this.add.triangle(-fish.body.w / 2 - 4, 0,
      0, -fish.body.h / 2,
      0, fish.body.h / 2,
      -fish.body.w * 0.25, 0,
      bodyColor).setAlpha(alpha);
    const body = this.add.ellipse(0, 0, fish.body.w, fish.body.h, bodyColor).setAlpha(alpha);
    const stripe = this.add.ellipse(0, 0, fish.body.w * 0.6, fish.body.h * 0.25,
      accentColor).setAlpha(caught ? 0.6 : 0);
    const eye = this.add.circle(fish.body.w * 0.32, -1, 1.6,
      caught ? 0xffffff : 0x000000);
    c.add([tail, body, stripe, eye]);
    c.setScale(scale);
    return c;
  }
}

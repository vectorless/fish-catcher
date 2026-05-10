// Modal shop. Five card grids: rods, bait, oxygen tanks, fins, gloves.
// Content is wrapped in a scrollable masked container — wheel to scroll.
// Launched as an overlay over a paused DockScene; Esc/E closes.

import Phaser from 'phaser';
import { RODS, ROD_ORDER } from '../data/rods.js';
import { BAITS, BAIT_ORDER } from '../data/baits.js';
import { TANKS, TANK_ORDER } from '../data/tanks.js';
import { FINS, FIN_ORDER } from '../data/fins.js';
import { GLOVES, GLOVE_ORDER } from '../data/gloves.js';
import { BAGS, BAG_ORDER } from '../data/bags.js';
import { RARITY_COLOR } from '../data/fish.js';
import {
  buyOrEquipRod, buyOrEquipBait, buyOrEquipTank,
  buyOrEquipFin, buyOrEquipGlove, buyOrEquipBag,
  getInventoryAggregate, sellSpecies, sellAll, VARIANT_DISPLAY
} from '../state.js';

const CARD_W = 210;
const CARD_H = 88;
const CARD_GAP = 14;
const HEADER_TO_CARD_GAP = 22;
const ROW_GAP = 14;               // between wrapped rows of cards
const SECTION_BOTTOM_GAP = 30;    // padding below last row of a section
const SIDE_MARGIN = 30;           // min horizontal padding on each side
const CONTENT_TOP_Y = 130;
const CONTENT_BOTTOM_PAD = 50;    // distance from scene bottom to scroll mask bottom

export class ShopScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ShopScene' });
  }

  create() {
    const { width, height } = this.scale;

    // Backdrop swallows clicks so the paused dock isn't affected.
    this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0, 0).setDepth(0).setInteractive();

    // Fixed chrome (above scroll mask) ---------------------------------------
    this.title = this.add.text(width / 2, 40, 'Shop', {
      fontFamily: 'serif', fontSize: '36px', color: '#f4e4bc',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(2);

    this.goldLine = this.add.text(width / 2, 78, '', {
      fontFamily: 'serif', fontSize: '17px', color: '#ffd24a'
    }).setOrigin(0.5).setDepth(2);

    this.feedback = this.add.text(width / 2, 104, '', {
      fontFamily: 'serif', fontSize: '15px', color: '#ffe27a'
    }).setOrigin(0.5).setDepth(2);

    this.hint = this.add.text(width / 2, height - 22,
      'ESC or E to close · scroll for more · click a card to buy / equip', {
      fontFamily: 'serif', fontSize: '13px', color: '#7a8a9a'
    }).setOrigin(0.5).setDepth(2);

    // Scrollable content -----------------------------------------------------
    this.scrollContainer = this.add.container(0, CONTENT_TOP_Y).setDepth(1);
    this.scrollMask = this.add.graphics().setVisible(false);
    this.scrollContainer.setMask(this.scrollMask.createGeometryMask());

    this._sections = [
      { kind: 'sell',  label: 'SELL CAUGHT FISH' },
      { kind: 'rod',   label: 'RODS',          order: ROD_ORDER,   data: RODS,   listKey: 'rodCards',   factory: this._makeRodCard,
        ownedKey: 'ownedRods',   equippedKey: 'equippedRodId',   defaults: ['twig'],     defaultId: 'twig' },
      { kind: 'bait',  label: 'BAIT',          order: BAIT_ORDER,  data: BAITS,  listKey: 'baitCards',  factory: this._makeBaitCard,
        ownedKey: 'ownedBaits',  equippedKey: 'equippedBaitId',  defaults: ['worm'],     defaultId: 'worm' },
      { kind: 'tank',  label: 'OXYGEN TANKS',  order: TANK_ORDER,  data: TANKS,  listKey: 'tankCards',  factory: this._makeTankCard,
        ownedKey: 'ownedTanks',  equippedKey: 'equippedTankId',  defaults: ['lungs'],    defaultId: 'lungs' },
      { kind: 'fin',   label: 'FINS',          order: FIN_ORDER,   data: FINS,   listKey: 'finCards',   factory: this._makeFinCard,
        ownedKey: 'ownedFins',   equippedKey: 'equippedFinId',   defaults: ['barefoot'], defaultId: 'barefoot' },
      { kind: 'glove', label: 'GLOVES',        order: GLOVE_ORDER, data: GLOVES, listKey: 'gloveCards', factory: this._makeGloveCard,
        ownedKey: 'ownedGloves', equippedKey: 'equippedGloveId', defaults: ['bare'],     defaultId: 'bare' },
      { kind: 'bag',   label: 'BAGS',          order: BAG_ORDER,   data: BAGS,   listKey: 'bagCards',   factory: this._makeBagCard,
        ownedKey: 'ownedBags',   equippedKey: 'equippedBagId',   defaults: ['satchel'],  defaultId: 'satchel' }
    ];
    this._sections.forEach(s => {
      if (s.listKey) this[s.listKey] = [];
      this[`${s.kind}Header`] = null;
    });

    this._refresh();

    this.input.keyboard.on('keydown-ESC', () => this._close());
    this.input.keyboard.on('keydown-E', () => this._close());
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
    const g = this.registry.get('gold') ?? 0;
    this.goldLine.setText(`${g} g`);

    const { width, height } = this.scale;
    this.title.setPosition(width / 2, 40);
    this.goldLine.setPosition(width / 2, 78);
    this.feedback.setPosition(width / 2, 104);
    this.hint.setPosition(width / 2, height - 22);

    // Resize the scroll mask to the current viewport area.
    const maskTop = CONTENT_TOP_Y;
    const maskBottom = height - CONTENT_BOTTOM_PAD;
    const maskH = Math.max(80, maskBottom - maskTop);
    this.scrollMask.clear();
    this.scrollMask.fillStyle(0xffffff);
    this.scrollMask.fillRect(0, maskTop, width, maskH);

    // Rebuild content
    this.scrollContainer.removeAll(true);
    this._sections.forEach(s => { if (s.listKey) this[s.listKey] = []; });

    let y = 0;
    for (const sec of this._sections) {
      const header = this.add.text(width / 2, y, sec.label, {
        fontFamily: 'serif', fontSize: '17px',
        color: sec.kind === 'sell' ? '#ffd24a' : '#cbb98a',
        fontStyle: 'bold'
      }).setOrigin(0.5, 0);
      this.scrollContainer.add(header);

      if (sec.kind === 'sell') {
        y = this._buildSellSection(y + 26);
      } else {
        const rowsTopY = y + 18 + HEADER_TO_CARD_GAP;
        const usedH = this._buildSection(sec, rowsTopY);
        y = rowsTopY + usedH + SECTION_BOTTOM_GAP;
      }
    }
    this._contentH = y;

    // Snap scroll to top on rebuild (stable across resize/refresh).
    this.scrollContainer.y = CONTENT_TOP_Y;
  }

  _buildSellSection(yStart) {
    const { width } = this.scale;
    const rows = getInventoryAggregate(this.registry);
    const rowW = Math.min(560, width - 100);
    const rowH = 30;
    const gap = 6;
    let y = yStart;

    if (rows.length === 0) {
      const empty = this.add.text(width / 2, y + 10,
        'No fish on hand. Catch some, then come back to sell.', {
        fontFamily: 'serif', fontSize: '13px', color: '#7a8a9a',
        fontStyle: 'italic'
      }).setOrigin(0.5, 0);
      this.scrollContainer.add(empty);
      return y + 38;
    }

    // Sell-all bar at the top of the section.
    const totalAll = rows.reduce((s, r) => s + r.totalValue, 0);
    const sellAllBtn = this._sellRow(width / 2, y, rowW, rowH,
      `SELL ALL  →  ${totalAll}g`,
      0x3b5a3b, 0xffd24a, () => this._handleSellAll());
    this.scrollContainer.add(sellAllBtn);
    y += rowH + gap + 4;

    // One row per (species, variant) bucket
    for (const r of rows) {
      const variantStyle = r.variant ? VARIANT_DISPLAY[r.variant] : null;
      const color = variantStyle ? variantStyle.color : (RARITY_COLOR[r.species.rarity] || '#f4e4bc');
      const namePrefix = variantStyle ? variantStyle.prefix : '';
      const label = `${namePrefix}${r.species.name}  ×${r.count}  →  ${r.totalValue}g`;
      const fill = r.variant === 'shiny' ? 0x3a3a14 : r.variant === 'rainbow' ? 0x3a1a3a : 0x223445;
      const rowC = this._sellRow(width / 2, y, rowW, rowH, label,
        fill, Phaser.Display.Color.HexStringToColor(color).color,
        () => this._handleSellSpecies(r.speciesId, r.variant, r.species.name, r.totalValue));
      this.scrollContainer.add(rowC);
      y += rowH + gap;
    }

    return y + 16;
  }

  _sellRow(centerX, y, w, h, label, fillColor, strokeColor, onClick) {
    const c = this.add.container(centerX, y + h / 2);
    const bg = this.add.rectangle(0, 0, w, h, fillColor)
      .setStrokeStyle(2, strokeColor)
      .setInteractive({ useHandCursor: true });
    bg.on('pointerdown', onClick);
    bg.on('pointerover', () => bg.setFillStyle(Phaser.Display.Color.IntegerToColor(fillColor).clone().brighten(15).color));
    bg.on('pointerout', () => bg.setFillStyle(fillColor));
    const text = this.add.text(0, 0, label, {
      fontFamily: 'serif', fontSize: '14px', fontStyle: 'bold',
      color: '#f4e4bc'
    }).setOrigin(0.5);
    c.add([bg, text]);
    return c;
  }

  _handleSellAll() {
    const r = sellAll(this.registry);
    if (r.sold === 0) {
      this._showFeedback({ ok: false, error: 'Nothing to sell.' });
    } else {
      this._showFeedback({ ok: true, equipped: false, bought: false }, `${r.sold} fish for ${r.value}g`);
      this.feedback.setText(`Sold ${r.sold} fish for ${r.value}g.`);
    }
    this._refresh();
  }

  _handleSellSpecies(speciesId, variant, name, expectedValue) {
    const r = sellSpecies(this.registry, speciesId, variant);
    if (r.sold === 0) return;
    this.feedback.setColor('#ffe27a');
    const prefix = variant ? VARIANT_DISPLAY[variant].prefix : '';
    this.feedback.setText(`Sold ${r.sold}× ${prefix}${name} for ${r.value}g.`);
    this.feedback.setAlpha(1);
    this.tweens.killTweensOf(this.feedback);
    this.tweens.add({
      targets: this.feedback, alpha: { from: 1, to: 0 },
      duration: 2200, hold: 700
    });
    this._refresh();
  }

  _buildSection(sec, rowsTopY) {
    const { width } = this.scale;
    const ownedSet = new Set(this.registry.get(sec.ownedKey) || sec.defaults);
    const equippedId = this.registry.get(sec.equippedKey) || sec.defaultId;
    const tiers = sec.order.map(id => sec.data[id]);

    const usable = Math.max(CARD_W, width - SIDE_MARGIN * 2);
    const perRow = Math.max(1, Math.floor((usable + CARD_GAP) / (CARD_W + CARD_GAP)));
    const rowCount = Math.ceil(tiers.length / perRow);

    for (let r = 0; r < rowCount; r++) {
      const rowItems = tiers.slice(r * perRow, r * perRow + perRow);
      const rowW = rowItems.length * CARD_W + (rowItems.length - 1) * CARD_GAP;
      const startX = (width - rowW) / 2;
      const cy = rowsTopY + r * (CARD_H + ROW_GAP) + CARD_H / 2;
      let x = startX;
      for (const item of rowItems) {
        const card = sec.factory.call(this, item, ownedSet, equippedId);
        card.setPosition(x + CARD_W / 2, cy);
        this.scrollContainer.add(card);
        this[sec.listKey].push(card);
        x += CARD_W + CARD_GAP;
      }
    }

    return rowCount * CARD_H + (rowCount - 1) * ROW_GAP;
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

  // --- Card factories ----------------------------------------------------

  _cardStyle(owned, active, canAfford) {
    if (active) return { bg: 0x3b5a78, stroke: 0xffe27a, status: '★ EQUIPPED', statusColor: '#ffe27a', clickable: false };
    if (owned) return { bg: 0x223445, stroke: 0x9ec45f, status: 'click to equip', statusColor: '#9ec45f', clickable: true };
    if (canAfford) return { bg: 0x2e3a23, stroke: 0x9ec45f, status: 'click to buy', statusColor: '#ffe27a', clickable: true };
    return { bg: 0x252a30, stroke: 0x44505a, status: '(need gold)', statusColor: '#7a8a9a', clickable: false };
  }

  _bgFor(s, onClick) {
    const bg = this.add.rectangle(0, 0, CARD_W, CARD_H, s.bg)
      .setStrokeStyle(2, s.stroke);
    if (s.clickable) {
      bg.setInteractive({ useHandCursor: true });
      bg.on('pointerdown', onClick);
      bg.on('pointerover', () => bg.setFillStyle(Phaser.Display.Color.IntegerToColor(s.bg).clone().brighten(15).color));
      bg.on('pointerout', () => bg.setFillStyle(s.bg));
    }
    return bg;
  }

  _makeRodCard(rod, ownedSet, equippedId) {
    const c = this.add.container(0, 0);
    const owned = ownedSet.has(rod.id);
    const active = equippedId === rod.id;
    const canAfford = (this.registry.get('gold') ?? 0) >= rod.price;
    const s = this._cardStyle(owned, active, canAfford);
    c.add(this._bgFor(s, () => this._handleClick('rod', rod)));

    const rodLine = this.add.line(0, 0, -32, 18, 32, -18, rod.color, 1)
      .setOrigin(0.5).setLineWidth(3);
    rodLine.setPosition(-CARD_W / 2 + 38, -CARD_H / 2 + 26);
    c.add(rodLine);

    c.add(this.add.text(-CARD_W / 2 + 70, -CARD_H / 2 + 12, rod.name, {
      fontFamily: 'serif', fontSize: '15px', color: '#f4e4bc'
    }).setOrigin(0, 0));
    const rodLuck = ['rare', 'epic', 'legendary', 'godlike']
      .map(r => `${r[0].toUpperCase()}×${(rod.luckBias?.[r] ?? 0).toFixed(1)}`)
      .join(' ');
    c.add(this.add.text(-CARD_W / 2 + 14, -2,
      `Luck — ${rodLuck}`, {
      fontFamily: 'serif', fontSize: '11px', color: '#cbb98a'
    }).setOrigin(0, 0));
    c.add(this.add.text(-CARD_W / 2 + 14, CARD_H / 2 - 32, rod.blurb, {
      fontFamily: 'serif', fontSize: '11px', color: '#9aa6b4', wordWrap: { width: CARD_W - 28 }
    }).setOrigin(0, 0));
    c.add(this._priceText(rod, owned, canAfford));
    c.add(this._statusText(s));
    return c;
  }

  _makeBaitCard(bait, ownedSet, equippedId) {
    const c = this.add.container(0, 0);
    const owned = ownedSet.has(bait.id);
    const active = equippedId === bait.id;
    const canAfford = (this.registry.get('gold') ?? 0) >= bait.price;
    const s = this._cardStyle(owned, active, canAfford);
    c.add(this._bgFor(s, () => this._handleClick('bait', bait)));

    const icon = this.add.ellipse(-CARD_W / 2 + 28, -CARD_H / 2 + 24, 22, 12, bait.color)
      .setStrokeStyle(2, 0x000000);
    c.add(icon);

    c.add(this.add.text(-CARD_W / 2 + 56, -CARD_H / 2 + 12, bait.name, {
      fontFamily: 'serif', fontSize: '15px', color: '#f4e4bc'
    }).setOrigin(0, 0));

    const biasParts = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'godlike']
      .map(r => `${r[0].toUpperCase()}×${(bait.rarityBias[r] ?? 0).toFixed(1)}`);
    c.add(this.add.text(-CARD_W / 2 + 14, -2,
      `Bite ×${bait.biteDelayMult.toFixed(2)} · ${biasParts.join(' ')}`, {
      fontFamily: 'serif', fontSize: '10px', color: '#cbb98a'
    }).setOrigin(0, 0));
    c.add(this.add.text(-CARD_W / 2 + 14, CARD_H / 2 - 32, bait.blurb, {
      fontFamily: 'serif', fontSize: '11px', color: '#9aa6b4', wordWrap: { width: CARD_W - 28 }
    }).setOrigin(0, 0));
    c.add(this._priceText(bait, owned, canAfford));
    c.add(this._statusText(s));
    return c;
  }

  _makeTankCard(tank, ownedSet, equippedId) {
    const c = this.add.container(0, 0);
    const owned = ownedSet.has(tank.id);
    const active = equippedId === tank.id;
    const canAfford = (this.registry.get('gold') ?? 0) >= tank.price;
    const s = this._cardStyle(owned, active, canAfford);
    c.add(this._bgFor(s, () => this._handleClick('tank', tank)));

    const iconX = -CARD_W / 2 + 26;
    const iconY = -CARD_H / 2 + 26;
    const cyl = this.add.rectangle(iconX, iconY, 12, 22, tank.color)
      .setStrokeStyle(2, 0x000000);
    const cap = this.add.rectangle(iconX, iconY - 14, 6, 5, 0x303a48)
      .setStrokeStyle(2, 0x000000);
    c.add([cyl, cap]);

    c.add(this.add.text(-CARD_W / 2 + 50, -CARD_H / 2 + 12, tank.name, {
      fontFamily: 'serif', fontSize: '15px', color: '#f4e4bc'
    }).setOrigin(0, 0));
    c.add(this.add.text(-CARD_W / 2 + 14, -2,
      `Oxygen: ${tank.oxygenSec} sec`, {
      fontFamily: 'serif', fontSize: '12px', color: '#7fc8ff'
    }).setOrigin(0, 0));
    c.add(this.add.text(-CARD_W / 2 + 14, CARD_H / 2 - 32, tank.blurb, {
      fontFamily: 'serif', fontSize: '11px', color: '#9aa6b4', wordWrap: { width: CARD_W - 28 }
    }).setOrigin(0, 0));
    c.add(this._priceText(tank, owned, canAfford));
    c.add(this._statusText(s));
    return c;
  }

  _makeFinCard(fin, ownedSet, equippedId) {
    const c = this.add.container(0, 0);
    const owned = ownedSet.has(fin.id);
    const active = equippedId === fin.id;
    const canAfford = (this.registry.get('gold') ?? 0) >= fin.price;
    const s = this._cardStyle(owned, active, canAfford);
    c.add(this._bgFor(s, () => this._handleClick('fin', fin)));

    const blade = this.add.triangle(-CARD_W / 2 + 24, -CARD_H / 2 + 24,
      -8, -10, 8, -10, 0, 12,
      fin.color).setStrokeStyle(2, 0x000000);
    c.add(blade);

    c.add(this.add.text(-CARD_W / 2 + 46, -CARD_H / 2 + 10, fin.name, {
      fontFamily: 'serif', fontSize: '14px', color: '#f4e4bc'
    }).setOrigin(0, 0));
    c.add(this.add.text(-CARD_W / 2 + 14, -2,
      `Swim speed × ${fin.swimSpeedMult.toFixed(2)}`, {
      fontFamily: 'serif', fontSize: '11px', color: '#7fc8ff'
    }).setOrigin(0, 0));
    c.add(this.add.text(-CARD_W / 2 + 14, CARD_H / 2 - 28, fin.blurb, {
      fontFamily: 'serif', fontSize: '10px', color: '#9aa6b4', wordWrap: { width: CARD_W - 28 }
    }).setOrigin(0, 0));
    c.add(this._priceText(fin, owned, canAfford));
    c.add(this._statusText(s));
    return c;
  }

  _makeGloveCard(glove, ownedSet, equippedId) {
    const c = this.add.container(0, 0);
    const owned = ownedSet.has(glove.id);
    const active = equippedId === glove.id;
    const canAfford = (this.registry.get('gold') ?? 0) >= glove.price;
    const s = this._cardStyle(owned, active, canAfford);
    c.add(this._bgFor(s, () => this._handleClick('glove', glove)));

    // Glove icon — small rounded mitten silhouette
    const iconX = -CARD_W / 2 + 24;
    const iconY = -CARD_H / 2 + 26;
    const palm = this.add.rectangle(iconX, iconY, 18, 16, glove.color)
      .setStrokeStyle(2, 0x000000);
    const thumb = this.add.rectangle(iconX + 11, iconY + 2, 6, 8, glove.color)
      .setStrokeStyle(2, 0x000000);
    c.add([palm, thumb]);

    c.add(this.add.text(-CARD_W / 2 + 46, -CARD_H / 2 + 10, glove.name, {
      fontFamily: 'serif', fontSize: '14px', color: '#f4e4bc'
    }).setOrigin(0, 0));
    const tipLine = glove.grabBonus ? `  +${glove.grabBonus}g/grab` : '';
    c.add(this.add.text(-CARD_W / 2 + 14, -2,
      `Grabs: ${glove.allowed.join(', ')}${tipLine}`, {
      fontFamily: 'serif', fontSize: '11px', color: '#7fc8ff'
    }).setOrigin(0, 0));
    c.add(this.add.text(-CARD_W / 2 + 14, CARD_H / 2 - 28, glove.blurb, {
      fontFamily: 'serif', fontSize: '10px', color: '#9aa6b4', wordWrap: { width: CARD_W - 28 }
    }).setOrigin(0, 0));
    c.add(this._priceText(glove, owned, canAfford));
    c.add(this._statusText(s));
    return c;
  }

  _makeBagCard(bag, ownedSet, equippedId) {
    const c = this.add.container(0, 0);
    const owned = ownedSet.has(bag.id);
    const active = equippedId === bag.id;
    const canAfford = (this.registry.get('gold') ?? 0) >= bag.price;
    const s = this._cardStyle(owned, active, canAfford);
    c.add(this._bgFor(s, () => this._handleClick('bag', bag)));

    // Bag icon: pouch body + flap
    const iconX = -CARD_W / 2 + 26;
    const iconY = -CARD_H / 2 + 28;
    const pouch = this.add.rectangle(iconX, iconY, 22, 18, bag.color)
      .setStrokeStyle(2, 0x000000);
    const flap = this.add.triangle(iconX, iconY - 9,
      -11, 0, 11, 0, 0, 6, bag.color)
      .setStrokeStyle(2, 0x000000);
    c.add([pouch, flap]);

    c.add(this.add.text(-CARD_W / 2 + 50, -CARD_H / 2 + 10, bag.name, {
      fontFamily: 'serif', fontSize: '14px', color: '#f4e4bc'
    }).setOrigin(0, 0));
    c.add(this.add.text(-CARD_W / 2 + 14, -2,
      `Capacity: ${bag.capacity} fish`, {
      fontFamily: 'serif', fontSize: '12px', color: '#7fc8ff'
    }).setOrigin(0, 0));
    c.add(this.add.text(-CARD_W / 2 + 14, CARD_H / 2 - 28, bag.blurb, {
      fontFamily: 'serif', fontSize: '10px', color: '#9aa6b4', wordWrap: { width: CARD_W - 28 }
    }).setOrigin(0, 0));
    c.add(this._priceText(bag, owned, canAfford));
    c.add(this._statusText(s));
    return c;
  }

  _priceText(item, owned, canAfford) {
    return this.add.text(CARD_W / 2 - 10, -CARD_H / 2 + 10,
      item.price === 0 ? 'free' : `${item.price} g`, {
      fontFamily: 'serif', fontSize: '14px', fontStyle: 'bold',
      color: canAfford || owned ? '#ffd24a' : '#7a8a9a'
    }).setOrigin(1, 0);
  }

  _statusText(s) {
    return this.add.text(0, CARD_H / 2 - 12, s.status, {
      fontFamily: 'serif', fontSize: '11px', color: s.statusColor
    }).setOrigin(0.5);
  }

  _handleClick(kind, item) {
    let r;
    if (kind === 'rod') r = buyOrEquipRod(this.registry, item.id);
    else if (kind === 'bait') r = buyOrEquipBait(this.registry, item.id);
    else if (kind === 'tank') r = buyOrEquipTank(this.registry, item.id);
    else if (kind === 'fin') r = buyOrEquipFin(this.registry, item.id);
    else if (kind === 'glove') r = buyOrEquipGlove(this.registry, item.id);
    else if (kind === 'bag') r = buyOrEquipBag(this.registry, item.id);
    this._showFeedback(r, item.name);
    this._refresh();
  }

  _showFeedback(result, name) {
    if (!result.ok) {
      this.feedback.setColor('#ff8888');
      this.feedback.setText(result.error || 'Purchase failed.');
    } else {
      this.feedback.setColor('#ffe27a');
      if (result.bought) this.feedback.setText(`Bought and equipped ${name}.`);
      else this.feedback.setText(`Equipped ${name}.`);
    }
    this.feedback.setAlpha(1);
    this.tweens.killTweensOf(this.feedback);
    this.tweens.add({
      targets: this.feedback, alpha: { from: 1, to: 0 },
      duration: 2200, hold: 700
    });
  }
}

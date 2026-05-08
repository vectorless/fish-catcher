// River NPC dialog. Old Fisher who'll trade gold for any rare fish from
// your inventory. Repeatable — keep bringing rares.

import Phaser from 'phaser';
import {
  findRareInInventory, deliverRareToRiverNpc, getRiverNpcDeliveries
} from '../state.js';

export class NpcScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NpcScene' });
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0, 0).setDepth(0).setInteractive();

    this.title = this.add.text(width / 2, 80, 'The Old Fisher', {
      fontFamily: 'serif', fontSize: '36px', color: '#f4e4bc',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(1);

    this.flavor = this.add.text(width / 2, 122,
      "Sun-creased face, straw hat. Watches the river all day.", {
      fontFamily: 'serif', fontSize: '14px', color: '#cbb98a', fontStyle: 'italic'
    }).setOrigin(0.5).setDepth(1);

    this.panel = this.add.container(width / 2, 0).setDepth(1);
    this.feedback = this.add.text(width / 2, 0, '', {
      fontFamily: 'serif', fontSize: '15px', color: '#ffe27a'
    }).setOrigin(0.5).setDepth(1);

    this.hint = this.add.text(width / 2, height - 30, 'ESC or Q to leave', {
      fontFamily: 'serif', fontSize: '13px', color: '#7a8a9a'
    }).setOrigin(0.5).setDepth(1);

    this._render();

    this.input.keyboard.on('keydown-ESC', () => this._close());
    this.input.keyboard.on('keydown-Q', () => this._close());
    this.scale.on('resize', this._render, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard.removeAllListeners();
      this.scale.off('resize', this._render, this);
    });
  }

  _close() {
    this.scene.stop();
    this.scene.resume('DockScene');
  }

  _render() {
    const { width, height } = this.scale;
    this.title.setPosition(width / 2, 80);
    this.flavor.setPosition(width / 2, 122);
    this.feedback.setPosition(width / 2, height - 80);
    this.hint.setPosition(width / 2, height - 30);

    this.panel.removeAll(true);
    this.panel.setPosition(width / 2, height / 2 - 30);

    const cardW = Math.min(560, width - 80);
    const bg = this.add.rectangle(0, 0, cardW, 200, 0x1c2a3a)
      .setStrokeStyle(2, 0xffd24a);
    this.panel.add(bg);

    const deliveries = getRiverNpcDeliveries(this.registry);
    const rare = findRareInInventory(this.registry);

    this.panel.add(this.add.text(0, -78,
      '"Bring me a rare fish — any kind."', {
      fontFamily: 'serif', fontSize: '18px', color: '#f4e4bc'
    }).setOrigin(0.5));

    if (deliveries > 0) {
      this.panel.add(this.add.text(0, -50,
        `You've brought him ${deliveries} so far.`, {
        fontFamily: 'serif', fontSize: '13px', color: '#9aa6b4',
        fontStyle: 'italic'
      }).setOrigin(0.5));
    }

    if (rare) {
      this.panel.add(this.add.text(0, -16,
        `In your bag:  ${rare.name}  (rare)`, {
        fontFamily: 'serif', fontSize: '15px', color: '#ffd24a'
      }).setOrigin(0.5));
      this.panel.add(this.add.text(0, 14,
        'Hand it over for 800g.', {
        fontFamily: 'serif', fontSize: '13px', color: '#9aa6b4'
      }).setOrigin(0.5));
      this.panel.add(this._button(0, 56, `Hand over the ${rare.name}`,
        0x2e3a23, 0x9ec45f, () => this._handleDeliver()));
    } else {
      this.panel.add(this.add.text(0, -8,
        'No rare in your bag yet. Come back when you have one.', {
        fontFamily: 'serif', fontSize: '14px', color: '#dfe6ed'
      }).setOrigin(0.5));
      this.panel.add(this.add.text(0, 22,
        '(Catch a rare with a rod, or grab one underwater with mesh gloves.)', {
        fontFamily: 'serif', fontSize: '12px', color: '#7a8a9a',
        fontStyle: 'italic', wordWrap: { width: cardW - 40 }
      }).setOrigin(0.5));
    }
  }

  _button(x, y, label, fillColor, strokeColor, onClick) {
    const c = this.add.container(x, y);
    const w = 280, h = 38;
    const bg = this.add.rectangle(0, 0, w, h, fillColor)
      .setStrokeStyle(2, strokeColor)
      .setInteractive({ useHandCursor: true });
    bg.on('pointerdown', onClick);
    bg.on('pointerover', () => bg.setFillStyle(Phaser.Display.Color.IntegerToColor(fillColor).clone().brighten(15).color));
    bg.on('pointerout', () => bg.setFillStyle(fillColor));
    const t = this.add.text(0, 0, label, {
      fontFamily: 'serif', fontSize: '14px', color: '#f4e4bc'
    }).setOrigin(0.5);
    c.add([bg, t]);
    return c;
  }

  _handleDeliver() {
    const result = deliverRareToRiverNpc(this.registry);
    if (!result) {
      this._flashFeedback('No rare in your bag.');
      return;
    }
    this._flashFeedback(`Gave him a ${result.species.name} — got ${result.reward}g.`);
    this._render();
  }

  _flashFeedback(text) {
    this.feedback.setText(text);
    this.feedback.setAlpha(1);
    this.tweens.killTweensOf(this.feedback);
    this.tweens.add({
      targets: this.feedback, alpha: { from: 1, to: 0 },
      duration: 2400, hold: 800
    });
  }
}

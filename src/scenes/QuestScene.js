// Quest panel. Opened by interacting with the quest box on the pier (Q).
// Shows the active quest (if any) with progress and a Claim button when
// complete; offers a new quest when there's none.

import Phaser from 'phaser';
import { getActiveQuest, startNewQuest, claimQuest } from '../state.js';

export class QuestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestScene' });
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0, 0).setDepth(0).setInteractive();

    this.title = this.add.text(width / 2, 80, 'Quest Board', {
      fontFamily: 'serif', fontSize: '38px', color: '#f4e4bc',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(1);

    this.flavor = this.add.text(width / 2, 122,
      'A weathered chest on the pier. Take a job?', {
      fontFamily: 'serif', fontSize: '14px', color: '#cbb98a', fontStyle: 'italic'
    }).setOrigin(0.5).setDepth(1);

    this.panel = this.add.container(width / 2, 0).setDepth(1);
    this.feedback = this.add.text(width / 2, 0, '', {
      fontFamily: 'serif', fontSize: '15px', color: '#ffe27a'
    }).setOrigin(0.5).setDepth(1);

    this.hint = this.add.text(width / 2, height - 30, 'ESC or Q to close', {
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

    const q = getActiveQuest(this.registry);
    const cardW = Math.min(560, width - 80);
    const cardH = 200;
    const bg = this.add.rectangle(0, 0, cardW, cardH, 0x1c2a3a)
      .setStrokeStyle(2, 0xffd24a);
    this.panel.add(bg);

    if (!q) {
      this.panel.add(this.add.text(0, -50, 'No active quest.', {
        fontFamily: 'serif', fontSize: '20px', color: '#dfe6ed'
      }).setOrigin(0.5));
      this.panel.add(this.add.text(0, -16, 'A new job pays in gold and helps fill out the dex.', {
        fontFamily: 'serif', fontSize: '13px', color: '#9aa6b4'
      }).setOrigin(0.5));
      this.panel.add(this._button(0, 40, 'Accept new quest', 0x2e3a23, 0x9ec45f, () => this._handleAccept()));
      return;
    }

    this.panel.add(this.add.text(0, -68, q.description, {
      fontFamily: 'serif', fontSize: '20px', color: '#f4e4bc',
      stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5));

    // Progress bar
    const barW = cardW - 80;
    const barX = -barW / 2;
    const ratio = Phaser.Math.Clamp(q.progress / q.goal, 0, 1);
    this.panel.add(this.add.rectangle(0, -28, barW, 16, 0x0a1a2a)
      .setStrokeStyle(1, 0x4a4a6e));
    this.panel.add(this.add.rectangle(barX, -28, barW * ratio, 16,
      q.complete ? 0xffd24a : 0x6ec97a).setOrigin(0, 0.5));
    this.panel.add(this.add.text(0, -28,
      `${q.progress} / ${q.goal}`, {
      fontFamily: 'serif', fontSize: '12px', fontStyle: 'bold',
      color: '#ffffff', stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5));

    this.panel.add(this.add.text(0, 4, `Reward: ${q.reward} g`, {
      fontFamily: 'serif', fontSize: '15px', color: '#ffd24a'
    }).setOrigin(0.5));

    if (q.complete) {
      this.panel.add(this._button(0, 50, 'Claim reward', 0x2e3a23, 0x9ec45f, () => this._handleClaim()));
    } else {
      this.panel.add(this.add.text(0, 50, 'Catch fish to make progress.', {
        fontFamily: 'serif', fontSize: '13px', color: '#9aa6b4', fontStyle: 'italic'
      }).setOrigin(0.5));
    }
  }

  _button(x, y, label, fillColor, strokeColor, onClick) {
    const c = this.add.container(x, y);
    const w = 200, h = 40;
    const bg = this.add.rectangle(0, 0, w, h, fillColor)
      .setStrokeStyle(2, strokeColor)
      .setInteractive({ useHandCursor: true });
    bg.on('pointerdown', onClick);
    bg.on('pointerover', () => bg.setFillStyle(Phaser.Display.Color.IntegerToColor(fillColor).clone().brighten(15).color));
    bg.on('pointerout', () => bg.setFillStyle(fillColor));
    const t = this.add.text(0, 0, label, {
      fontFamily: 'serif', fontSize: '15px', color: '#f4e4bc'
    }).setOrigin(0.5);
    c.add([bg, t]);
    return c;
  }

  _handleAccept() {
    const q = startNewQuest(this.registry);
    this._flashFeedback(`New quest: ${q.description}`);
    this._render();
  }

  _handleClaim() {
    const q = claimQuest(this.registry);
    if (q) this._flashFeedback(`Claimed ${q.reward} g!`);
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

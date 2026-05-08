// Tutorial overlay. Auto-launched on first session start; reopen with T.
// Plain info panel — controls + the loop. Any key / click dismisses.

import Phaser from 'phaser';

const SECTIONS = [
  {
    title: 'On the pier',
    lines: [
      'A / D  (or arrows)  — walk',
      'SPACE — cast rod, then SPACE again inside the green to hook',
      'Better rods widen the green; the inner yellow band = Perfect (×1.5 gold)',
      'Cursor sweeps faster for rarer fish'
    ]
  },
  {
    title: 'Underwater',
    lines: [
      'At the pier edge, S — dive in / surface',
      'A / D — swim left / right',
      'W or ↑  — ascend',
      'SPACE — descend',
      'Touch a fish to grab it. Oxygen ticks down — surface before it hits 0',
      'Bare hands grab common & uncommon. Buy gloves to grab rares. Epics only on a rod.'
    ]
  },
  {
    title: 'Shop & progression',
    lines: [
      'E — Shop (rods · bait · tanks · fins · gloves) — scroll for more',
      'F — Fishdex (your collection)',
      'Z — Zone select. New zones unlock by total gold earned.',
      'R — redeem codes',
      'Earn 200g for River, 800g for Ocean, 2500g for Reef, 6000g for the Abyss'
    ]
  }
];

export class TutorialScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TutorialScene' });
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.78)
      .setOrigin(0, 0).setDepth(0).setInteractive();

    this.title = this.add.text(width / 2, 50, 'How to Play', {
      fontFamily: 'serif', fontSize: '40px', color: '#f4e4bc',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(1);

    this.subtitle = this.add.text(width / 2, 92,
      'Catch fish → sell → upgrade → dive deeper → fill the fishdex.', {
      fontFamily: 'serif', fontSize: '15px', color: '#cbb98a', fontStyle: 'italic'
    }).setOrigin(0.5).setDepth(1);

    this.dismissHint = this.add.text(width / 2, height - 36,
      'Press any key or click to close · T to reopen later', {
      fontFamily: 'serif', fontSize: '13px', color: '#7a8a9a'
    }).setOrigin(0.5).setDepth(1);

    this.body = this.add.container(0, 0).setDepth(1);
    this._build();

    this.input.keyboard.on('keydown', () => this._close());
    this.input.on('pointerdown', () => this._close());
    this.scale.on('resize', this._build, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard.removeAllListeners();
      this.input.removeAllListeners('pointerdown');
      this.scale.off('resize', this._build, this);
    });
  }

  _build() {
    const { width, height } = this.scale;
    this.body.removeAll(true);
    this.title.setPosition(width / 2, 50);
    this.subtitle.setPosition(width / 2, 92);
    this.dismissHint.setPosition(width / 2, height - 36);

    const panelW = Math.min(720, width - 60);
    const panelX = (width - panelW) / 2;
    let y = 130;
    for (const sec of SECTIONS) {
      const header = this.add.text(panelX, y, sec.title.toUpperCase(), {
        fontFamily: 'serif', fontSize: '17px', color: '#ffd24a',
        fontStyle: 'bold'
      }).setOrigin(0, 0);
      this.body.add(header);
      y += 26;
      for (const line of sec.lines) {
        const t = this.add.text(panelX + 12, y, '· ' + line, {
          fontFamily: 'serif', fontSize: '14px', color: '#dfe6ed',
          wordWrap: { width: panelW - 12 }
        }).setOrigin(0, 0);
        this.body.add(t);
        y += t.height + 4;
      }
      y += 14;
    }
  }

  _close() {
    this.registry.set('tutorialSeen', true);
    this.scene.stop();
    this.scene.resume('DockScene');
  }
}

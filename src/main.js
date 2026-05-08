import Phaser from 'phaser';
import { DockScene } from './scenes/DockScene.js';
import { ShopScene } from './scenes/ShopScene.js';
import { FishdexScene } from './scenes/FishdexScene.js';
import { ZoneSelectScene } from './scenes/ZoneSelectScene.js';
import { TutorialScene } from './scenes/TutorialScene.js';
import { HUDScene } from './scenes/HUDScene.js';
import { initState } from './state.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#06121c',
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: '100%',
    height: '100%'
  },
  scene: [DockScene, ShopScene, FishdexScene, ZoneSelectScene, TutorialScene, HUDScene]
});

initState(game.registry);

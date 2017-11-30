/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import testMapJson from '../../assets/maps/test.json';
// import mapSprite from '../../assets/sprites/testmapsprite.png';

export default class extends Phaser.State {
  init () {
    this.playerX = 30*5;
    this.playerY = 30*5;

    this.player;
  }
  preload () {
    this.game.load.image('terrain', 'assets/sprites/testmapsprite.png');
    this.game.load.image('objects', 'assets/sprites/objectset.png');
    this.game.load.image('player', 'assets/sprites/Hero.png');
    this.game.load.tilemap('test', null, testMapJson, Phaser.Tilemap.TILED_JSON);
  }

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    let map = this.game.add.tilemap('test');
    map.addTilesetImage('terrain');
    map.addTilesetImage('objects');

    let layer = map.createLayer('Tile Layer 1');
    layer.scale.set(30);
    layer.smoothed = false;
    layer.resizeWorld();

    map.forEach((tile) => {
      console.log(tile);
    }, this, 0, 0, 18, 18);

    let objectLayer = map.createLayer('Object Layer 1');
    objectLayer.scale.set(30);
    objectLayer.smoothed = false;
    objectLayer.resizeWorld();

    // const startTile = objectLayer.getTiles(0, 5, 1, 1);

    this.player = game.add.sprite(this.playerX, this.playerY, 'player');

    this.player.scale.set(30);

    const inputs = [
      {
        key: Phaser.Keyboard.UP,
        handler: () => {
          this.playerY -= 30;
        }
      },
      {
        key: Phaser.Keyboard.DOWN,
        handler: () => {
          this.playerY += 30;
        }
      },
      {
        key: Phaser.Keyboard.LEFT,
        handler: () => {
          this.playerX -= 30;
        }
      },
      {
        key: Phaser.Keyboard.RIGHT,
        handler: () => {
          this.playerX += 30;
        }
      },

    ];

    inputs.forEach((input) => {
      const key = game.input.keyboard.addKey(input.key);
      key.onDown.add(input.handler, this);
    });
  }

  update () {
    this.player.x = this.playerX;
    this.player.y = this.playerY;
  }

  render () {
    if (__DEV__) {

    }
  }
}

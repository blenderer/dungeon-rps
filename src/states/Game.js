/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import testMapJson from '../../assets/maps/test.json';
// import mapSprite from '../../assets/sprites/testmapsprite.png';

const SCALE = 30;

export default class extends Phaser.State {
  init () {
    this.playerX = 5;
    this.playerY = 5;

    this.player;
  }
  preload () {
    this.game.load.image('terrain', 'assets/sprites/testmapsprite.png');
    this.game.load.image('objects', 'assets/sprites/objectset.png');
    this.game.load.image('player', 'assets/sprites/Hero.png');
    this.game.load.tilemap('test', null, testMapJson, Phaser.Tilemap.TILED_JSON);
  }

  create () {
    this.map = this.game.add.tilemap('test');
    this.map.addTilesetImage('terrain');
    this.map.addTilesetImage('objects');

    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.scale.set(SCALE);
    this.layer.smoothed = false;
    this.layer.resizeWorld();

    this.walls = this.map.createLayer('Walls');
    this.walls.scale.set(SCALE);
    this.walls.smoothed = false;
    this.walls.resizeWorld();

    this.player = game.add.sprite(this.playerX * SCALE, this.playerY * SCALE, 'player');
    this.player.scale.set(SCALE);

    const inputs = [
      {
        key: Phaser.Keyboard.UP,
        handler: () => {
          const aboveTile = this.map.getTileAbove(this.walls.index, this.playerX, this.playerY);
          if (aboveTile && aboveTile.properties.isWalkable) {
            this.player.y = aboveTile.y * SCALE;
            this.playerY = aboveTile.y;
          }
        }
      },
      {
        key: Phaser.Keyboard.DOWN,
        handler: () => {
          const belowTile = this.map.getTileBelow(this.walls.index, this.playerX, this.playerY);
          if (belowTile && belowTile.properties.isWalkable) {
            this.player.y = belowTile.y * SCALE;
            this.playerY = belowTile.y;
          }
        }
      },
      {
        key: Phaser.Keyboard.LEFT,
        handler: () => {
          const leftTile = this.map.getTileLeft(this.walls.index, this.playerX, this.playerY);
          if (leftTile && leftTile.properties.isWalkable) {
            this.player.x = leftTile.x * SCALE;
            this.playerX = leftTile.x;
          }
        }
      },
      {
        key: Phaser.Keyboard.RIGHT,
        handler: () => {
          const rightTile = this.map.getTileRight(this.walls.index, this.playerX, this.playerY);
          if (rightTile && rightTile.properties.isWalkable) {
            this.player.x = rightTile.x * 30;
            this.playerX = rightTile.x;
          }
        }
      },

    ];

    inputs.forEach((input) => {
      const key = this.game.input.keyboard.addKey(input.key);
      key.onDown.add(input.handler, this);
    });
  }

  update () {

  }

  render () {
    this.game.debug.bodyInfo(this.player, 32, 280);
  }
}

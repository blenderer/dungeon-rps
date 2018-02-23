/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import testMapJson from '../../assets/maps/test.json';
// import mapSprite from '../../assets/sprites/testmapsprite.png';

const SCALE = 30;
const directions = {
  'left': {
    axis: 'x',
    mapFunctionName: 'getTileLeft'
  },
  right: {
    axis: 'x',
    mapFunctionName: 'getTileRight'
  },
  above: {
    axis: 'y',
    mapFunctionName: 'getTileAbove'
  },
  below: {
    axis: 'y',
    mapFunctionName: 'getTileBelow'
  }
};

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

  getPlayerAdjacent (mapFunctionName) {
    return this.map[mapFunctionName](this.walls.index, this.playerX, this.playerY);;
  }

  movePlayerIfAble (direction) {
    const config = directions[direction];
    const axis = config.axis;
    const AXIS = config.axis.toUpperCase();
    const tile = this.getPlayerAdjacent(config.mapFunctionName);

    if (tile && tile.properties.isWalkable) {
      this.player[axis] = tile[axis] * SCALE;
      this[`player${AXIS}`] = tile[axis];
    }
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
          this.movePlayerIfAble('above');
        }
      },
      {
        key: Phaser.Keyboard.DOWN,
        handler: () => {
          this.movePlayerIfAble('below');
        }
      },
      {
        key: Phaser.Keyboard.LEFT,
        handler: () => {
          this.movePlayerIfAble('left');
        }
      },
      {
        key: Phaser.Keyboard.RIGHT,
        handler: () => {
          this.movePlayerIfAble('right');
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

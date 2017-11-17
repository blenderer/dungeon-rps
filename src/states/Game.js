/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import testMapJson from '../../assets/maps/test.json';
// import mapSprite from '../../assets/sprites/testmapsprite.png';

export default class extends Phaser.State {
  init () {}
  preload () {
    this.game.load.image('terrain', 'assets/sprites/testmapsprite.png');
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

    let layer = map.createLayer('Tile Layer 1');
    layer.scale.set(30);
    layer.smoothed = false;
    layer.resizeWorld();
    // const map = new Phaser.Tilemap(this.game);
    // const mapLayer = map.create('test', 100, 100, 10, 10);
    // const newTile = new Phaser.Tile(mapLayer, 0, 0, 0, 10, 10)
    // map.putTile(newTile, 0, 0);
    // console.log(map.getTile(0, 0));

    // console.log(Phaser.Tilemap.create());
  }

  render () {
    if (__DEV__) {

    }
  }
}

import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
    });
    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tarId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('Game INITT');
    }
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', (_, time) => {
        this.map.init();
        console.log('####: render', time);
      });
      console.log('####: this.engine', this.engine);
      console.log('####: this.map', this.map);
      this.engine.start();
    });
  }
}

export default ClientGame;

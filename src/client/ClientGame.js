import ClientEngine from './ClientEngine';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
    });
    this.engine = this.createEngine();
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tarId));
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('Game INI');
    }
  }
}

export default ClientGame;

class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    // хуярим цикл по world.json
    // console.log(this.levelCfg);

    this.engine.renderSpriteFrame({
      sprite: ['terrain', 'grass'],
      frame: 0,
      x: 48,
      y: 48,
      w: 48,
      h: 48,
    });
  }
}

export default ClientWorld;

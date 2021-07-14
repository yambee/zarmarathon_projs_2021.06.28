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
    const { map } = this.levelCfg;

    // цикл по строкам
    map.forEach((row, sX) => {
      // цикл по ячейкам в строке
      row.forEach((cell, sY) => {
        // цикл по слоям спрайтов в ячейке снизу вверх
        cell.forEach((layerSprite) => {
          this.engine.renderSpriteFrame({
            sprite: ['terrain', layerSprite],
            frame: 0,
            x: sX * 48,
            y: sY * 48,
            w: 48,
            h: 48,
          });
        });
      });
    });
  }
}

export default ClientWorld;

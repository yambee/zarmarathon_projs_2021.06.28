class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
      cellWidth: 30,
      cellHeight: 30,
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
            x: sX * this.cellWidth,
            y: sY * this.cellHeight,
            w: this.cellWidth,
            h: this.cellHeight,
          });
        });
      });
    });
  }
}

export default ClientWorld;

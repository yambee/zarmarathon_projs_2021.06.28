import './index.scss';
import Female1Walk from './assets/Female-1-Walk.png';
// import Female1Walk from './assets/Male-5-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasW = canvas.width;
const canvasH = canvas.height;
const spriteW = 48;
const spriteH = 48;
// const shots = 3;
let cycle = 1;
let bottomPressed = false;
let topPressed = false;
let rightPressed = false;
let leftPressed = false;
let pY = 0;
let pX = 0;
let atlasRow = 0;
const step = 17;

// зададим порядковые номера строк атласа для направлений
const atlasRows = {
  down: 0,
  left: 1,
  right: 2,
  up: 3,
};

// объект определяющий логику кадров спрайта

const frameCounter = {
  stayFrame: 1, // позиция стоЯщего спрайта
  walkingSequence: [0, 2], // последовательность спрайтов идущего персонажа
  currentWalkingIndex: 0, // индекс текущего кадра шагающего спрайта
  currentFrame: 1, // начальный кадр спрайта - стоим

  next() {
    // метод возвращает номер следующего кадра "идущего" спрайта
    // eslint-disable-next-line no-plusplus
    if (++this.currentWalkingIndex === this.walkingSequence.length) this.currentWalkingIndex = 0;
    this.currentFrame = this.walkingSequence[this.currentWalkingIndex];
    return this.currentFrame;
  },

  stay() {
    // метод возвращает индекс "стоЯщего" спрайта
    return this.stayFrame;
  },
};

// центрируем персонажа по канвасу
pX = (canvasW - spriteW) / 2;
pY = (canvasH - spriteH) / 2;

const keyDownHandler = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') bottomPressed = true;
  if (e.key === 'Up' || e.key === 'ArrowUp') topPressed = true;
  if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = true;
  if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = true;
};

const keyUpHandler = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') bottomPressed = false;
  if (e.key === 'Up' || e.key === 'ArrowUp') topPressed = false;
  if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = false;
  if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = false;
  cycle = frameCounter.stay(); // кадр стоим
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = Female1Walk;

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed) {
      atlasRow = atlasRows.down;
      if (pY === canvasH - spriteH) {
        cycle = frameCounter.stay();
      } else {
        cycle = frameCounter.next();
        if (pY + step < canvasH - spriteH) {
          pY += step;
        } else {
          pY = canvasH - spriteH;
        }
      }
    }
    if (topPressed) {
      atlasRow = atlasRows.up;
      if (pY === 1) {
        cycle = frameCounter.stay();
      } else {
        cycle = frameCounter.next();
        if (pY - step > 1) {
          pY -= step;
        } else {
          pY = 1;
        }
      }
    }
    if (rightPressed) {
      atlasRow = atlasRows.right;
      if (pX === canvasW - spriteW) {
        cycle = frameCounter.stay();
      } else {
        cycle = frameCounter.next();
        if (pX + step < canvasW - spriteW) {
          pX += step;
        } else {
          pX = canvasW - spriteW;
        }
      }
    }
    if (leftPressed) {
      atlasRow = atlasRows.left;
      if (pX === 1) {
        cycle = frameCounter.stay();
      } else {
        cycle = frameCounter.next();
        if (pX - step > 1) {
          pX -= step;
        } else {
          pX = 1;
        }
      }
    }
    ctx.clearRect(0, 0, canvasW, canvasH);
    // console.log(cycle, frameCounter.currentWalkingIndex, frameCounter.walkingSequence.length);

    // eslint-disable-next-line max-len
    ctx.drawImage(img, cycle * spriteW, atlasRow * spriteH, spriteW, spriteH, pX, pY, spriteW, spriteH);
  }, 120);

  // уберём Loading... из центра страницы чтобы не маячил после загрузки
  document.querySelector("h3[data='loading']").innerText = '';
});

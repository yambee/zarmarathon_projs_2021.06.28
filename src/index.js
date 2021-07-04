import './index.scss';
import Female1Walk from './assets/Female-1-Walk.png';
// import Male5Walk from './assets/Male-5-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let bottomPressed = false;
let topPressed = false;
let rightPressed = false;
let leftPressed = false;
let pY = 0;
let pX = 0;
let atlasRow = 0;

// зададим порядковые номера строк атласа для направлений
const atlasRows = {
  down: 0,
  left: 1,
  right: 2,
  up: 3,
};

// центрируем персонажа по канвасу
pX = 300;
pY = 300;

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
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = Female1Walk;

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed) {
      if (pY <= 600 - 48 - 10) pY += 10;
      atlasRow = atlasRows.down;
      cycle = (cycle + 1) % shots;
    }
    if (topPressed) {
      if (pY >= 10) pY -= 10;
      atlasRow = atlasRows.up;
      cycle = (cycle + 1) % shots;
    }
    if (rightPressed) {
      if (pX < 600 - 48) pX += 10;
      atlasRow = atlasRows.right;
      cycle = (cycle + 1) % shots;
    }
    if (leftPressed) {
      if (pX >= 10) pX -= 10;
      atlasRow = atlasRows.left;
      cycle = (cycle + 1) % shots;
    }
    ctx.clearRect(0, 0, 600, 600);

    // eslint-disable-next-line max-len
    ctx.drawImage(img, cycle * spriteW, atlasRow * spriteH, spriteW, spriteH, pX, pY, spriteW, spriteH);
  }, 120);

  // уберём Loading... из центра страницы чтобы не маячил после загрузки
  document.querySelector("h3[data='loading']").innerText = '';
});

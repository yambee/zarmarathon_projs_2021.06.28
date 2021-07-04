import './index.scss';
import Female1Walk from './assets/Female-1-Walk.png';
// import Male5Walk from './assets/Male-5-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;

const img = document.createElement('img');
img.src = Female1Walk;

img.addEventListener('load', () => {
  setInterval(() => {
    cycle = (cycle + 1) % shots;
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, 0, spriteW, spriteH, 0, 0, 100, 100);
  }, 120);
});

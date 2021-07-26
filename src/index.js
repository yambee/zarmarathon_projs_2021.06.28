import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  ClientGame.init({ tarId: 'game' });
});

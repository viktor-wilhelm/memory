import './styles/style.scss';
import { mountApp } from './app/screens';

const root = document.getElementById('app');
if (root) {
  mountApp(root);
}

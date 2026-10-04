import './styles/style.scss';
import { mountApp } from './app/screens';

/** Mounts the app into the `#app` element of the page. */
function bootstrap(): void {
  const root = document.getElementById('app');
  if (root) mountApp(root);
}

bootstrap();

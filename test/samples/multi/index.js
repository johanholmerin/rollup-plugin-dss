import styles from './index.css';
import comp from './comp.js';

export default function () {
  return `<div class="${styles.foo}"></div>` + comp();
}



import { createApp } from 'vue';
import App from './App.vue';

export const THEME = sessionStorage.getItem('theme') || 'light';
const loadTheme = () => {
  return new Promise(resolve => {
    import (`./themes/${THEME}.js`);
    resolve(THEME);
  });
};

loadTheme().then((THEME) => {
  createApp(App).mount('#app');
  document.body.setAttribute("theme", `${THEME}`);
})


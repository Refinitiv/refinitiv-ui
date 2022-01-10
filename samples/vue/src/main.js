

import { createApp } from 'vue'
import App from './App.vue'

const loadTheme = () => {
  return new Promise(resolve => {
    sessionStorage.setItem('theme', sessionStorage.getItem('theme') || 'light') ;
    const theme = sessionStorage.getItem('theme');
    import (`./themes/${theme}.js`)
    resolve(theme);
  });
};

loadTheme().then((theme) => {
  createApp(App).mount('#app')
  document.body.setAttribute("theme", `${theme}`);
})


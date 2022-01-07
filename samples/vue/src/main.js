localStorage.theme = localStorage.theme || 'light';
const theme = localStorage.theme || 'light';
import (`./themes/${theme}.js`)

import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')

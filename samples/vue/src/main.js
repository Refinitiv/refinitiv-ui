
import '@refinitiv-ui/elements/loader';
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/email-field';
import '@refinitiv-ui/elements/tab-bar';
import '@refinitiv-ui/elements/tab';
import '@refinitiv-ui/elements/header';
import '@refinitiv-ui/elements/dialog';
import '@refinitiv-ui/elements/radio-button';
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elements/checkbox';
import '@refinitiv-ui/elements/sidebar-layout';
import '@refinitiv-ui/elements/interactive-chart';
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elements/toggle';

localStorage.theme = localStorage.theme || 'light';
const theme = localStorage.theme || 'light';
import (`./themes/${theme}.js`)

import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')

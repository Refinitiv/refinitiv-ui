import '@refinitiv-ui/components/template-login.js';
import '@refinitiv-ui/components/select.js';

const el = document.getElementById('sign-in');

// eslint-disable-next-line
el?.addEventListener('submit', (event) => console.log('Submit', (event as unknown as CustomEvent).detail));

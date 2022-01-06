// Components
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/toggle';
import '@refinitiv-ui/elements/header';
import '@refinitiv-ui/elements/interactive-chart';
import '@refinitiv-ui/elements/dialog';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/email-field';
import '@refinitiv-ui/elements/radio-button';
import '@refinitiv-ui/elements/checkbox';
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elements/overlay';
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elements/tab-bar';
import '@refinitiv-ui/elements/tab';

const loadTheme = () => {
  return new Promise(resolve => {
    const theme = sessionStorage.getItem('elf-theme') || 'light';
    import(`./themes/${theme}`);
    document.documentElement.setAttribute('theme', theme);
    resolve(theme);
  })
}
loadTheme().then((theme) => {});
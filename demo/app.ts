import '@refinitiv-ui/components/pattern-sign-in';
import '@refinitiv-ui/components/select';
import { Select } from '@refinitiv-ui/components/select';

const el = document.getElementById('sign-in');
const settings = document.querySelectorAll('aside ui-select');

const doc = document.documentElement;

// eslint-disable-next-line
el?.addEventListener('submit', (event) => console.log('Submit', (event as unknown as CustomEvent).detail));

const setTheme = (value: string): void => {
  // load theme
};

const setMode = (value: string): void => {
  if (value) {
    doc.setAttribute('prefers-color-scheme', value);
  }
  else {
    doc.removeAttribute('prefers-color-scheme');
  }
};

const setDensity = (value: string): void => {
  if (value) {
    doc.setAttribute('prefers-density', value);
  }
  else {
    doc.removeAttribute('prefers-density');
  }
};

const setMotion = (value: string): void => {
  if (value) {
    doc.setAttribute('prefers-reduced-motion', value);
  }
  else {
    doc.removeAttribute('prefers-reduced-motion');
  }
};

const onValueChanged = (event: CustomEvent) => {
  const option = event.target as Select;
  switch (option.id) {
    case 'setting-theme':
      return setTheme(option.value);
    case 'setting-mode':
      return setMode(option.value);
    case 'setting-density':
      return setDensity(option.value);
    case 'setting-motion':
      return setMotion(option.value);
    default:
      return;
  }
};

for (const option of settings) {
  option.addEventListener('value-changed', (event) => onValueChanged(event as CustomEvent));
}

//eslint-disable import/first
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

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

loadTheme().then((theme) => {
  ReactDOM.render(
    <React.StrictMode>
      <App theme={theme}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

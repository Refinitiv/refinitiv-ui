//eslint-disable import/first
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const loadTheme = () => {
  return new Promise(resolve => {
    const theme = sessionStorage.getItem('elf-theme') || 'light';
    import(`./themes/${theme}`);
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

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

import { data } from './chartData';

const loadTheme = () => {
  return new Promise(resolve => {
    const theme = sessionStorage.getItem('elf-theme') || 'light';
    import(`./themes/${theme}`);
    document.documentElement.setAttribute('theme', theme);
    resolve(theme);
  })
}

loadTheme().then((defaultTheme) => {
  const toggle = document.querySelector('ef-toggle');
  const tabs = document.querySelectorAll('ef-tab');
  const profileButton = document.querySelector('#profile-button');
  const dialog = document.querySelector('ef-dialog');
  const textField = document.querySelector('ef-text-field');
  const radioGroup = document.querySelector('#radio-group');
  const datetimePicker = document.querySelector('ef-datetime-picker');
  const textArea = document.querySelector('textarea');
  const emailField = document.querySelector('ef-email-field');
  const menu = document.querySelector('ef-overlay-menu');
  const jobPanel = document.querySelector('#job-panel');
  const jobDisplay = document.querySelector('#job-display');
  const checkbox = document.querySelector('ef-checkbox');
  const confirmButton = document.querySelector('#confirm-button');
  const cancelButton = document.querySelector('#cancel-button');
  const chart = document.querySelector('ef-interactive-chart');
  // variable
  const initialChartType = 'line';
  let formData = { isReceiveMail: true };
  let isEmailError = true;

  // inject theme
  const head = document.getElementsByTagName('HEAD')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `./dist/styles/${defaultTheme}.css`;
  head.appendChild(link);

  // initial chart config
  setChartType(initialChartType);
  setActiveTab(initialChartType);
  
  // initial form config
  confirmButton.disabled = isSubmitDisabled(formData);
  menu.positionTarget = jobPanel;

  // initial form config theme switching section
  if (defaultTheme === 'dark') {
    toggle.checked = true;
  }

  // attach events
  tabs.forEach((tab) => {
    tab.addEventListener('tap', (e) => handleClickTab(e.target));
  });
  profileButton.addEventListener('tap', (e) => toggleDialog());
  textField.addEventListener('value-changed', (e) => handleChangeFormData({ name: e.detail.value }));
  radioGroup.addEventListener('checked-changed', (e) => handleChangeFormData({ gender: e.target.textContent }));
  datetimePicker.addEventListener('value-changed', (e) => handleChangeFormData({ date: e.detail.value }));
  textArea.addEventListener('change', (e) => handleChangeFormData({ address: e.target.value }));
  emailField.addEventListener('value-changed', (e) => handleChangeFormData({ email: e.detail.value }));
  emailField.addEventListener('error-changed', (e) => handleEmailError(e.detail.value));
  menu.parentElement.addEventListener('item-trigger', (e) => handleItemTrigger(e.detail.value));
  checkbox.checked = true;
  checkbox.addEventListener('checked-changed', (e) => handleChangeFormData({ isReceiveMail: e.target.checked }));
  confirmButton.addEventListener('tap', (e) => handleClickConfirm());
  cancelButton.addEventListener('tap', (e) => toggleDialog());
  jobPanel.addEventListener('tap', () => {
    menu.opened = true;
  });
  toggle.addEventListener('checked-changed', (e) => handleChangeTheme(e.target.checked));

  function setChartType (type) {
    const config = {
      options: {
        timeScale: {
          timeVisible: true,
          secondsVisible: true
        }
      },
      series: [{
        symbol: 'Price',
        type: type,
        data: data
      }]
    };
    chart.config = config;
  };

  function getType (label) {
    return label.substring(0, label.indexOf(' ')).toLowerCase();
  };
  
  function setActiveTab (selectedType) {
    tabs.forEach((tab) => {
      const type = getType(tab.label || tab.getAttribute('label'));
      (selectedType === type) ? tab.active = true : tab.active = false
    })
  };

  function isSubmitDisabled (data) {
    return !data.name || !data.email || isEmailError ? true : undefined
  };

  function handleItemTrigger (value) {
    if(value) {
      handleChangeFormData({ job: value });
      jobDisplay.innerHTML = value;
      menu.opened = false;
    }
  };

  function handleClickConfirm () {
    // eslint-disable-next-line no-console
    console.log('data =', JSON.stringify(formData, null, 2));
    toggleDialog();
  };

  function handleClickTab (element) {
    const selectType = getType(element.label);
    setActiveTab(selectType);
    setChartType(selectType);
  };

  function handleChangeFormData (data) {
    formData = Object.assign(formData, data);
    confirmButton.disabled = isSubmitDisabled(formData);
  };

  function handleEmailError (value) {
    isEmailError = value;
    confirmButton.disabled = isSubmitDisabled(formData);
  };

  function toggleDialog () {
    dialog.opened = !dialog.opened;
  };

  function handleChangeTheme (checked) {
    const theme = checked ? 'dark' : 'light';
    sessionStorage.setItem('elf-theme', theme);
    window.location.reload();
  };
});
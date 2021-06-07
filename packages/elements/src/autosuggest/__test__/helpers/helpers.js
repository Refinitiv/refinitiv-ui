import { fixture, nextFrame } from '@refinitiv-ui/test-helpers';

export const createFixture = (fixtureType = 'default') => {
  switch (fixtureType) {
    case 'default':
      return fixture('<ef-autosuggest></ef-autosuggest>');
    case 'request-on-focus':
      return fixture('<ef-autosuggest debounce-rate="0" request-on-focus attach="#input-element"></ef-autosuggest>');
    case 'snapshot':
      return fixture('<ef-autosuggest loading attach="#input-element" more-results></ef-autosuggest>');
    case 'reason':
      return fixture('<ef-autosuggest request-on-focus attach="#input-element" debounce-rate="0"></ef-autosuggest>');
    case 'navigation':
      return fixture('<ef-autosuggest attach="#input-element" debounce-rate="0"></ef-autosuggest>');
    case 'custom-renderer':
      return fixture('<ef-autosuggest attach="#input-element" debounce-rate="0"></ef-autosuggest>');
    case 'html-renderer':
      return fixture('<ef-autosuggest attach="#input-element" debounce-rate="0" html-renderer></ef-autosuggest>');
    default:
      throw new Error('unknown fixture');
  }
};
export const createInputElement = () => {
  return fixture('<ef-text-field id="input-element"></ef-text-field>');
};
const keyMap = {
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Space: ' ',
  Escape: 27,
  Enter: 13,
  Tab: 9
};
export const data = [{ label: 'Cornelius Martin', value: 'cornelius.martin', group: 'Core Team' },
  { label: 'Memphis Hoover', value: 'memphis.hoover', group: 'Contractors' },
  { label: 'Angela Lloyd', value: 'angela.lloyd', group: 'Management' },
  { label: 'Emilee Gay', value: 'emilee.gay', group: 'Management' },
  { label: 'Selah Richardson', value: 'selah.richardson', group: 'Core Team' },
  { label: 'Christina Erickson', value: 'christina.erickson', group: 'Application Team' },
  { label: 'Elaina Welch', value: 'elaina.welch', group: 'Application Team' },
  { label: 'Houston Tran', value: 'houston.tran', group: 'Contractors' },
  { label: 'Richard Peterson', value: 'richard.peterson', group: 'Core Team' },
  { label: 'Andrew Lin', value: 'andrew.lin', group: 'Management' },
  { label: 'Isabell Kaiser', value: 'isabell.kaiser', group: 'Core Team' },
  { label: 'Brent Glass', value: 'brent.glass', group: 'Management' },
  { label: 'Martha Jones', value: 'martha.jones', group: 'Application Team' },
  { label: 'Anton Mcclain', value: 'anton.mcclain', group: 'Contractors' },
  { label: 'Jamir Martin', value: 'jamir.martin', group: 'Core Team' },
  { label: 'Kassandra Manning', value: 'kassandra.manning', group: 'Core Team' },
  { label: 'Madisyn Mccormick', value: 'madisyn.mccormick', group: 'Management' },
  { label: 'Anabel Savage', value: 'anabel.savage', group: 'Core Team' },
  { label: 'Tyler Phillips', value: 'tyler.phillips', group: 'Contractors' },
  { label: 'Ronan Deleon', value: 'ronan.deleon', group: 'Management' }
];
const keyboardEventFor = (type, keyCode, modifiers, key) => {
  const event = new CustomEvent(type, {
    detail: 0,
    bubbles: true,
    cancelable: true,
    // Allow event to go outside a ShadowRoot.
    composed: true
  });

  event.keyCode = keyCode;
  event.code = keyCode;

  modifiers = modifiers || [];
  if (typeof modifiers === 'string') {
    modifiers = [modifiers];
  }
  event.shiftKey = modifiers.indexOf('shift') !== -1;
  event.altKey = modifiers.indexOf('alt') !== -1;
  event.ctrlKey = modifiers.indexOf('ctrl') !== -1;
  event.metaKey = modifiers.indexOf('meta') !== -1;

  event.key = key;

  return event;
};
const keyEventOn = (target, type, keyCode, modifiers, key) => {
  target.dispatchEvent(keyboardEventFor(type, keyCode, modifiers, key));
};
const keyDownOn = (target, keyCode, modifiers, key) => {
  keyEventOn(target, 'keydown', keyCode, modifiers, key);
};
const keyUpOn = (target, keyCode, modifiers, key) => {
  keyEventOn(target, 'keyup', keyCode, modifiers, key);
};
const pressAndReleaseKeyOn = async (target, keyCode, modifiers, key) => {
  keyDownOn(target, keyCode, modifiers, key);
  await nextFrame();
  await nextFrame();
  keyUpOn(target, keyCode, modifiers, key);
  await nextFrame();
  await nextFrame();
};
export const pressKey = async (el, key, modifiers = null) => {
  await nextFrame();
  await nextFrame();
  await pressAndReleaseKeyOn(el, keyMap[key], modifiers, key);
  await nextFrame();
  await nextFrame();
};
const actionCreator = (actionType) => async (element) => {
  await nextFrame();
  await nextFrame();
  element.dispatchEvent(new CustomEvent(actionType, { bubbles: false, cancelable: true, composed: false }));
  await nextFrame();
  await nextFrame();
};
export const focusAction = async (element) => {
  await nextFrame();
  await nextFrame();
  element.focus();
  await nextFrame();
  await nextFrame();
};
export const blurAction = async (element) => {
  await nextFrame();
  await nextFrame();
  element.blur();
  await nextFrame();
  await nextFrame();
};
export const inputAction = actionCreator('input');
export const tapAction = (element) => element.dispatchEvent(new CustomEvent('tap', { bubbles: true }));
export const isFirefox = () => /firefox/i.test(navigator.userAgent);

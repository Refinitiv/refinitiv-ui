import { triggerFocusFor, nextFrame } from '@refinitiv-ui/test-helpers';

const inputValue = (el) => el.inputValue; // Access private property
const inputElement = (el) => el.inputElement; // Access private property
const focusInput = async (el) => {
  await triggerFocusFor(inputElement(el));
  await nextFrame(el);
};

const arrowRight = async (el) => {
  inputElement(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
  await nextFrame();
}

const arrowLeft = async (el) => {
  inputElement(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
  await nextFrame();
}

const arrowUp = async (el) => {
  inputElement(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
  await nextFrame();
}

const arrowDown = async (el) => {
  inputElement(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
  await nextFrame();
}

export const isSafari = (version = undefined) => { // Indicates if this is Safari. Put version parameter to specific version.
  const safari = !(/Chrome/).test(navigator.userAgent) && (/Apple Computer/).test(navigator.vendor);
  if (version) {
    return safari && (navigator.userAgent.indexOf(`Version\/${String(version)}`) > -1);
  }
  return safari;
};

export {
  inputValue,
  inputElement,
  focusInput,
  arrowRight,
  arrowLeft,
  arrowUp,
  arrowDown
};

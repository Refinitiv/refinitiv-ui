import { triggerFocusFor, nextFrame, keyboardEvent } from '@refinitiv-ui/test-helpers';

const inputValue = (el) => el.inputValue; // Access private property
const inputElement = (el) => el.inputElement; // Access private property
const focusInput = async (el) => {
  await triggerFocusFor(inputElement(el));
  await nextFrame();
};

const arrowRight = async (el) => {
  inputElement(el).dispatchEvent(keyboardEvent('keydown', { key: 'ArrowRight' }));
  await nextFrame();
}

const arrowLeft = async (el) => {
  inputElement(el).dispatchEvent(keyboardEvent('keydown', { key: 'ArrowLeft' }));
  await nextFrame();
}

const arrowUp = async (el) => {
  inputElement(el).dispatchEvent(keyboardEvent('keydown', { key: 'ArrowUp' }));
  await nextFrame();
}

const arrowDown = async (el) => {
  inputElement(el).dispatchEvent(keyboardEvent('keydown', { key: 'ArrowDown' }));
  await nextFrame();
}

export {
  inputValue,
  inputElement,
  focusInput,
  arrowRight,
  arrowLeft,
  arrowUp,
  arrowDown
};

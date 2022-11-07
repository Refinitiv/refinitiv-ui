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

export {
  inputValue,
  inputElement,
  focusInput,
  arrowRight,
  arrowLeft,
  arrowUp,
  arrowDown
};

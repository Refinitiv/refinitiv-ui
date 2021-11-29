import { elementUpdated, nextFrame, keyboardEvent as createKeyboardEvent } from '@refinitiv-ui/test-helpers';
import { RenderView } from '../../../lib/calendar/constants.js';

export const setView = async (el, view) => {
  el.renderView = view;
  await elementUpdated(el);
};

export const setYearView = async (el) => {
  await setView(el, RenderView.YEAR);
};

export const setMonthView = async (el) => {
  await setView(el, RenderView.MONTH);
};

export const setDayView = async (el) => {
  await setView(el, RenderView.DAY);
};

export const clickView = async (el) => {
  el.shadowRoot.querySelector('[part=btn-view]').click();
  await elementUpdated(el);
};

export const clickNext = async (el) => {
  el.shadowRoot.querySelector('[part=btn-next]').click();
  await elementUpdated(el);
};

export const clickPrev = async (el) => {
  el.shadowRoot.querySelector('[part=btn-prev]').click();
  await elementUpdated(el);
};

export const keyboardEvent = async (el, key) => {
  const event = createKeyboardEvent('keydown', {
    key,
    detail: 0,
    bubbles: true,
    cancelable: true,
    composed: true
  });

  el.dispatchEvent(event);
  await elementUpdated(el);
  await nextFrame(); // need this for IE11 to ensure focus is set

  return event;
};

export const left = async (el) => await keyboardEvent(el, 'ArrowLeft');
export const right = async (el) => await keyboardEvent(el, 'ArrowRight');
export const up = async (el) => await keyboardEvent(el, 'ArrowUp');
export const down = async (el) => await keyboardEvent(el, 'ArrowDown');
export const home = async (el) => await keyboardEvent(el, 'Home');
export const end = async (el) => await keyboardEvent(el, 'End');

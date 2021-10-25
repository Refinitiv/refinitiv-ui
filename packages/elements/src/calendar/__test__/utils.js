import { elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';
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

export const fireKeyBoardEvent = (type, init = {}) => {
  const event = new CustomEvent(type, {
    detail: 0,
    bubbles: true,
    cancelable: true,
    composed: true
  });

  event.key = init.key || '';
  event.shiftKey = init.shiftKey || false;
  event.altKey = init.altKey || false;
  event.ctrlKey = init.ctrlKey || false;
  event.metaKey = init.metaKey || false;

  return event;
};

export const keyboardEvent = async (el, key, options = {}) => {
  const event = fireKeyBoardEvent('keydown', Object.assign({ key }, options));
  el.dispatchEvent(event);
  await elementUpdated(el);
  await nextFrame(); // need this for IE11 to ensure focus is set

  return event;
};

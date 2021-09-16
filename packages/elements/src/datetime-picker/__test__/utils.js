import { elementUpdated, keyboardEvent } from '@refinitiv-ui/test-helpers';
import { format, parse, DateFormat, DateTimeFormat, addMonths as utilsAddMonths } from '@refinitiv-ui/utils';

export const fireKeydownEvent = (element, key, shiftKey = false) => {
  const event = keyboardEvent('keydown', { key, shiftKey });
  element.dispatchEvent(event);
};

export const typeText = (element, text) => {
  element.value = text;
  element.dispatchEvent(new CustomEvent('value-changed', {
    detail: {
      value: text
    }
  }));
};

export const addMonths = (date, amount) => {
  return parse(utilsAddMonths(format(date, DateTimeFormat.yyyMMddTHHmmss), amount));
};

export const formatToView = (date) => {
  return format(date, DateFormat.yyyyMM);
};

export const calendarClickNext = async (calendarEl) => {
  calendarEl.shadowRoot.querySelector('[part=btn-next]').click();
  await elementUpdated(calendarEl);
};

export const snapshotIgnore = {
  ignoreAttributes: ['style', 'class']
};

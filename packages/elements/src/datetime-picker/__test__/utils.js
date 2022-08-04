import { elementUpdated, keyboardEvent } from '@refinitiv-ui/test-helpers';
import { format, parse, DateFormat, DateTimeFormat, addMonths as utilsAddMonths } from '@refinitiv-ui/utils';

const buttonElement = (el) => el.shadowRoot.querySelector('[part="button"]');
const inputElement = (el) => el.inputRef.value; // Access private property
const inputToElement = (el) => el.inputToRef.value // Access private property
const calendarElement = (el) => el.calendarRef.value // Access private property
const calendarToElement = (el) => el.calendarToRef.value // Access private property
const timePickerElement = (el) => el.timepickerRef.value // Access private property

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

export {
  buttonElement,
  inputElement,
  inputToElement,
  calendarElement,
  calendarToElement,
  timePickerElement
}
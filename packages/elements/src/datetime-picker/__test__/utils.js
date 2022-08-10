import { elementUpdated, keyboardEvent } from '@refinitiv-ui/test-helpers';
import { format, parse, DateFormat, DateTimeFormat, addMonths as utilsAddMonths } from '@refinitiv-ui/utils';

const snapshotIgnore = {
  ignoreAttributes: ['style']
};

const buttonElement = (el) => el.shadowRoot.querySelector('[part="button"]');
const inputElement = (el) => el.inputRef.value; // Access private property
const inputToElement = (el) => el.inputToRef.value // Access private property
const calendarElement = (el) => el.calendarRef.value // Access private property
const calendarToElement = (el) => el.calendarToRef.value // Access private property
const timePickerElement = (el) => el.timepickerRef.value // Access private property


const fireKeydownEvent = (element, key, shiftKey = false) => {
  const event = keyboardEvent('keydown', { key, shiftKey });
  element.dispatchEvent(event);
};

const typeText = (element, text) => {
  element.value = text;
  element.dispatchEvent(new CustomEvent('value-changed', {
    detail: {
      value: text
    }
  }));
};

const addMonths = (date, amount) => {
  return parse(utilsAddMonths(format(date, DateTimeFormat.yyyMMddTHHmmss), amount));
};

const formatToView = (date) => {
  return format(date, DateFormat.yyyyMM);
};

const calendarClickNext = async (calendarEl) => {
  calendarEl.shadowRoot.querySelector('[part=btn-next]').click();
  await elementUpdated(calendarEl);
};

export {
  snapshotIgnore,
  buttonElement,
  inputElement,
  inputToElement,
  calendarElement,
  calendarToElement,
  timePickerElement,
  fireKeydownEvent,
  typeText,
  addMonths,
  formatToView,
  calendarClickNext
}

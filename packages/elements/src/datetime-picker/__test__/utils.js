import { elementUpdated, isIE } from '@refinitiv-ui/test-helpers';

export const fireKeydownEvent = (element, key, shiftKey = false) => {
  let event;

  if (isIE()) {
    event = document.createEvent('Event');

    event.initEvent('keydown', true, true);

    event.view = document.defaultView;
    event.altKey = false;
    event.ctrlKey = false;
    event.shiftKey = shiftKey;
    event.metaKey = false;
    event.key = key;
  }
  else {
    event = new KeyboardEvent('keydown', { key, shiftKey });
  }
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
  date = new Date(date);
  const dayOfMonth = date.getDate();
  const endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();

  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  }
  else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
};

export const calendarClickNext = async (calendarEl) => {
  calendarEl.shadowRoot.querySelector('[part=btn-next]').click();
  await elementUpdated(calendarEl);
};

export const snapshotIgnore = {
  ignoreAttributes: ['style', 'class']
};

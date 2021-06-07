import { isIE } from '@refinitiv-ui/test-helpers';

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

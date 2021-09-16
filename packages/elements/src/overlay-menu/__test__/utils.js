import { elementUpdated, isIE, nextFrame } from '@refinitiv-ui/test-helpers';


/**
 * Cross browser function to wait while select element becomes opened/closed and resized
 * @param {OverlayMenu} el Overlay menu
 * @returns {void}
 */
const openedUpdated = async (el) => {
  await elementUpdated(el);
  await nextFrame();
  await nextFrame(); // IE11 needs a second iframe, otherwise resize observer is not run;
};

const getMenuTriggers = (itemList) => {
  return itemList.filter(item => !!item.for);
};

const triggerMouseMove = (el) => {
  el.dispatchEvent(new MouseEvent('mousemove', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  }));
};

const triggerKeyEvent = (el, key, type = 'keydown') => {
  let event;
  if (isIE()) {
    event = new CustomEvent(type, {
      detail: 0,
      bubbles: true,
      cancelable: true,
      composed: true
    });

    event.key = key || '';
  }
  else {
    event = new KeyboardEvent(type, {
      key: key
    });
  }
  el.dispatchEvent(event);
};

export { openedUpdated, triggerMouseMove, triggerKeyEvent, getMenuTriggers };

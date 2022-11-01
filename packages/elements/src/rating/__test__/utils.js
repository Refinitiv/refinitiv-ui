import { elementUpdated, keyboardEvent } from "@refinitiv-ui/test-helpers";

/**
 * Update value and wait update complete
 * @param value value to update
 * @param el element to update
 * @param key key of value to update
 * @returns {void}
 */
const valueUpdated = async (value, el, key = 'value') => {
  el[key] = value;
  await elementUpdated(el);
}

const keyArrowLeft = keyboardEvent('keydown', { key: 'ArrowLeft'});
const keyArrowRight = keyboardEvent('keydown', { key: 'ArrowRight' });
const keyArrowDown = keyboardEvent('keydown', { key: 'ArrowDown' });
const keyArrowUp = keyboardEvent('keydown', { key: 'ArrowUp'});
const keyHome = keyboardEvent('keydown', { key: 'Home'});
const keyEnd = keyboardEvent('keydown', { key: 'End'});

export {
  valueUpdated,
  keyArrowLeft,
  keyArrowRight,
  keyArrowDown,
  keyArrowUp,
  keyHome,
  keyEnd
}

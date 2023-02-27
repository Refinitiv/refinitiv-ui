import { elementUpdated } from "@refinitiv-ui/test-helpers";

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

const keyArrowLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft'});
const keyArrowRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
const keyArrowDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
const keyArrowUp = new KeyboardEvent('keydown', { key: 'ArrowUp'});
const keyHome = new KeyboardEvent('keydown', { key: 'Home'});
const keyEnd = new KeyboardEvent('keydown', { key: 'End'});

export {
  valueUpdated,
  keyArrowLeft,
  keyArrowRight,
  keyArrowDown,
  keyArrowUp,
  keyHome,
  keyEnd
}

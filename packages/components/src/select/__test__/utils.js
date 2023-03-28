import { elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';

export const snapshotIgnore = {
  ignoreAttributes: ['style', 'class']
};

/**
 * Cross browser function to wait while select element becomes opened/closed and resized
 * @param {Select} el Select
 * @returns {void}
 */
export const openedUpdated = async (el) => {
  await elementUpdated(el);
  await nextFrame();
  await nextFrame();
};

export const data = [{
  value: 'AF', /* 1 */
  label: 'Afghanistan'
}, {
  value: 'AX', /* 2 */
  label: 'Aland Islands'
}, {
  value: 'AL', /* 3 */
  label: 'Albania'
}];

export const getOptions = (selected = []) => {
  const options = data.map((item, idx) => {
    const value = item.value ? `value="${item.value}"` : '';
    const isSelected = selected.indexOf(idx) !== -1 ? 'selected' : '';
    const attributes = [value, isSelected].join(' ');
    return `<ui-option ${attributes}>${item.label || ''}</ui-option>`;
  });
  return options.join('');
};

/**
 * Get private menu element property
 */
export const getMenuEl = select => select.subSelectElement.menuRef.value;

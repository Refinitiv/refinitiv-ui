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
  type: 'header', /* 0 */
  label: 'Countries'
}, {
  value: 'AF', /* 1 */
  label: 'Afghanistan'
}, {
  value: 'AX', /* 2 */
  label: 'Aland Islands'
}, {
  type: 'divider' /* 3 */
}, {
  value: 'AL', /* 4 */
  label: 'Albania'
}];

export const getData = (selected = [], disabled = [], readonly = []) => {
  return data.map((item, idx) => Object.assign({}, item, {
    selected: selected.indexOf(idx) !== -1,
    disabled: disabled.indexOf(idx) !== -1,
    readonly: readonly.indexOf(idx) !== -1
  }));
};

export const getOptions = (selected = [], disabled = [], readonly = []) => {
  const options = data.map((item, idx) => {
    const type = item.type ? `type="${item.type}"` : '';
    const value = item.value ? `value="${item.value}"` : '';
    const isSelected = selected.indexOf(idx) !== -1 ? 'selected' : '';
    const isDisabled = disabled.indexOf(idx) !== -1 ? 'disabled' : '';
    const isReadonly = readonly.indexOf(idx) !== -1 ? 'readonly' : '';
    const attributes = [type, value, isSelected, isDisabled, isReadonly].join(' ');
    return `<ui-option ${attributes}>${item.label || ''}</ui-option>`;
  });
  return options.join('');
};

/**
 * Get private menu element property
 */
export const getMenuEl = select => select.menuRef.value;

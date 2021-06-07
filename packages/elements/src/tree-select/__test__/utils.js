import { elementUpdated, expect, nextFrame } from '@refinitiv-ui/test-helpers';

/**
 * Cross browser function to wait while select element becomes opened/closed and resized
 * @param {TreeSelect} el Tree select
 * @returns {void}
 */
export const openedUpdated = async (el) => {
  await elementUpdated(el);
  await nextFrame();
  await nextFrame(); // IE11 needs a second iframe, otherwise resize observer is not run;
};

/**
 * @param {TreeSelect} el tree select
 * @param {[]} toChange Array of item references for selection change
 * @param {boolean} [uncheck] Uncheck items, default is to select
 * @returns {[]} Set of values that were selected
 */
export const changeItemSelection = (el, toChange, uncheck) => {
  const treeManager = el.treeManager;
  // toChange is an array of references to the original items
  toChange.forEach((item) => {
    if (uncheck) {
      treeManager.uncheckItem(item);
    }
    else {
      treeManager.checkItem(item);
    }
  });
  el.updateMemo();
  return toChange.map(item => item.value);
};

/**
 * Compare expect result and actual result
 * @param {[]} expectedValues Expected values
 * @param {[]} actualValues Actual values
 * @returns {boolean} Do values match
 */
export const doValuesMatch = (expectedValues, actualValues) => {
  let match = true;
  expectedValues.forEach((value) => {
    match = actualValues.indexOf(value) !== -1;
  });
  return match;
};

/**
 * Check the element's memo
 * @param {TreeSelect} el Tree select instance to check
 * @param {{expandable: number, expanded: number, selectable: number, selected: number}} expected Expected memo
 */
export const checkMemo = (el, expected) => {
  expect(el.memo.expandable).to.equal(expected.expandable, 'memo.expandable is incorrect');
  expect(el.memo.expanded).to.equal(expected.expanded, 'memo.expanded is incorrect');
  expect(el.memo.selectable).to.equal(expected.selectable, 'memo.selectable is incorrect');
  expect(el.memo.selected).to.equal(expected.selected, 'memo.selected is incorrect');
};

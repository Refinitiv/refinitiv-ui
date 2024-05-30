// import element and theme
import '@refinitiv-ui/elements/tree-select';

import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { aTimeout, elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import { flatData, flatSelection } from './mock_data/flat.js';
import { nestedData, nestedSelection, selectableCount } from './mock_data/nested.js';
import { changeItemSelection, checkMemo, openedUpdated } from './utils.js';

describe('tree-select/Interaction', function () {
  describe('Interaction Test', function () {
    it('Persists a selection - flat', async function () {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      // ensure events are fired
      el.data = flatData;
      const expectedSelection = changeItemSelection(el, flatSelection);
      checkMemo(el, {
        expandable: 0,
        expanded: 0,
        selectable: flatData.length,
        selected: flatSelection.length
      });
      el.save();
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(savedValues).to.have.all.members(expectedSelection, 'Values do not match');
    });

    it('Persists a selection - nested', async function () {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      const expectedSelection = changeItemSelection(el, nestedSelection);
      checkMemo(el, {
        expandable: 2,
        expanded: 0,
        selectable: selectableCount,
        selected: nestedSelection.length
      });
      el.save();
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(savedValues).to.have.all.members(expectedSelection, 'Values do not match');
    });

    it('Cancels a selection - flat', async function () {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      // ensure events are fired
      el.data = flatData;
      const expectedSelection = [];
      changeItemSelection(el, flatSelection);
      await aTimeout(200); // make sure all processes are finished
      checkMemo(el, {
        expandable: 0,
        expanded: 0,
        selectable: flatData.length,
        selected: flatSelection.length
      });
      el.cancel();
      await elementUpdated(el);
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(savedValues).to.have.all.members(expectedSelection, 'Values do not match');
      expect(el.treeManager.visibleItems.length).to.equal(
        flatData.length,
        'Data list should remain the same'
      );
      const savedComposerValues = el.composerValues;
      expect(savedValues).to.have.all.members(
        savedComposerValues,
        'Values and ComposerValues should be same'
      );
      expect(savedValues.length).to.equal(
        savedComposerValues.length,
        'Values and ComposerValues should be same'
      );
    });

    it('Cancels a selection - nested', async function () {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      const expectedSelection = [];
      changeItemSelection(el, nestedSelection);
      await aTimeout(200); // make sure all processes are finished
      el.cancel();
      await elementUpdated(el);
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(savedValues).to.have.all.members(expectedSelection, 'Values do not match');
      expect(el.opened).to.equal(false, 'Cancel should close the list');
      const savedComposerValues = el.composerValues;
      expect(savedValues).to.have.all.members(
        savedComposerValues,
        'Values and ComposerValues should be same'
      );
      expect(savedValues.length).to.equal(
        savedComposerValues.length,
        'Values and ComposerValues should be same'
      );
    });

    it('Cancels a selection - already have selected item', async function () {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      const data = [
        { selected: true, label: '1', value: '1' },
        { label: '2', value: '2' }
      ];
      el.data = data;
      changeItemSelection(el, data);
      await aTimeout(200); // make sure all processes are finished
      el.cancel();
      await elementUpdated(el);
      const expectedSelection = data.filter((item) => item.selected).map((item) => item.value);
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(savedValues).to.have.all.members(expectedSelection, 'Values do not match');
      expect(el.opened).to.equal(false, 'Cancel should close the list');
      const savedComposerValues = el.composerValues;
      expect(savedValues).to.have.all.members(
        savedComposerValues,
        'Values and ComposerValues should be same'
      );
      expect(savedValues.length).to.equal(
        savedComposerValues.length,
        'Values and ComposerValues should be same'
      );
    });

    it('Persist a selection, make changes and cancel - flat', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      // ensure events are fired
      el.data = flatData;
      const expectedSelection = changeItemSelection(el, flatSelection);
      el.save();
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(savedValues).to.have.all.members(expectedSelection, 'Values do not match');
      // make change with no commit
      changeItemSelection(el, flatSelection, true);
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(savedValues).to.have.all.members(expectedSelection, 'Values do not match');
    });

    it('Persist a selection, make changes and cancel - nested', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      // ensure events are fired
      el.data = nestedData;
      const expectedSelection = changeItemSelection(el, nestedSelection);
      el.save();
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(savedValues).to.have.all.members(expectedSelection, 'Values do not match');
      // make change with no commit
      changeItemSelection(el, nestedSelection, true);
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(savedValues).to.have.all.members(expectedSelection, 'Values do not match');
    });

    it('Persists a selection - sequential selection', async function () {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      el.data = flatData;

      // Check selected items
      let expectedSelection = changeItemSelection(el, flatSelection);
      await openedUpdated(el);
      await nextFrame();

      // Save and close popup
      el.save();
      el.opened = false;
      await openedUpdated(el);

      expect(el.values.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(el.values).to.have.ordered.members(
        expectedSelection,
        'Values sequential selection do not match'
      );
    });

    it('Persists a selection - sequential selection modify', async function () {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      el.data = flatData;

      // Check selected items
      changeItemSelection(el, flatSelection);
      await openedUpdated(el);
      await nextFrame();

      // Save and close popup
      el.save();
      el.opened = false;
      await openedUpdated(el);

      const expectedSelection = el.values;
      const modifyTarget = flatSelection[0];

      // Open popup and toggle an selected item which affect to sequential items
      el.opened = true;
      await openedUpdated(el);
      el.treeManager.uncheckItem(modifyTarget);
      await aTimeout(10);
      el.treeManager.checkItem(modifyTarget);

      // Save and close popup
      el.save();
      el.opened = false;
      await openedUpdated(el);

      // Modified item must always moved to the last selected
      const modifiedItem = expectedSelection.shift();
      expectedSelection.push(modifiedItem);

      expect(el.values.length).to.equal(expectedSelection.length, 'Saved and Expected values are not equal');
      expect(el.values).to.have.ordered.members(
        expectedSelection,
        'Values sequential selection do not match'
      );
    });

    it('Persist a selection change from programmatic update by calling commit', async function () {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      el.data = flatData;

      // Check selected items
      let expectedSelection = changeItemSelection(el, flatSelection);
      await openedUpdated(el);
      await nextFrame();

      el.commit();

      expect(el.values.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(el.values).to.have.ordered.members(
        expectedSelection,
        'Values sequential selection do not match'
      );
    });

    it('Cancels a selection - sequential selection', async function () {
      const el = await fixture('<ef-tree-select show-pills lang="en-gb"></ef-tree-select>');
      el.data = flatData;

      // Check selected items
      el.opened = true;
      const expectedSelection = changeItemSelection(el, flatSelection);
      await openedUpdated(el);
      await nextFrame();

      // Save and close popup
      el.save();
      el.opened = false;
      await openedUpdated(el);

      // Test selected items
      expect(el.values.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(el.values).to.have.ordered.members(
        expectedSelection,
        'Values sequential selection do not match xxx'
      );

      // Test reverting values when cancel
      el.treeManager.uncheckItem(flatSelection[1]);
      await aTimeout(10);
      el.treeManager.checkItem(flatSelection[1]);
      el.cancel();
      await openedUpdated(el);

      el.opened = true;
      await openedUpdated(el);
      await nextFrame();

      expect(el.values.length).to.equal(expectedSelection.length, 'Revert values are not equal');
      expect(el.values).to.have.ordered.members(
        expectedSelection,
        'Revert values sequential selection do not match'
      );

      // Test reverting pill data correctly
      let pillValues = el.pillsData.map((item) => item.value);
      expect(pillValues.length).to.equal(
        expectedSelection.length,
        'Saved and values and pills values are not equal'
      );
      expect(pillValues).to.have.ordered.members(expectedSelection, 'Pill values do not match');
    });

    it('Should revert selected item on click cancel button when selection filter applied', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      const data = [
        { label: '1', value: '1', selected: true },
        { label: '2', value: '2', selected: true },
        { label: '3', value: '3', selected: false }
      ];
      el.data = data;
      el.opened = true;
      await elementUpdated(el);
      await nextFrame();

      const treeItems = el.treeEl.querySelectorAll('[role=treeitem]');
      const cancel = el.popupEl.querySelector('#cancel');
      const selectedFilter = el.popupEl.querySelector('[part~=selected-filter]');

      treeItems[0].click(); // unchecked item
      await elementUpdated(el);
      await nextFrame();

      selectedFilter.click();
      cancel.click();
      await elementUpdated(el);
      await nextFrame();

      expect(el.treeManager.checkedItems.length).to.equal(2, 'Selected items do not reverted');

      el.opened = true;
      await elementUpdated(el);
      await nextFrame();

      treeItems[2].click(); // checked item
      await elementUpdated(el);
      await nextFrame();

      selectedFilter.click();
      cancel.click();
      await elementUpdated(el);
      await nextFrame();

      expect(el.treeManager.checkedItems.length).to.equal(2, 'Selected items do not reverted');
    });

    it('Adds selection to pills', async function () {
      const el = await fixture('<ef-tree-select show-pills lang="en-gb"></ef-tree-select>');
      el.data = flatData;

      // Check selected items
      changeItemSelection(el, flatSelection);
      await openedUpdated(el);
      await nextFrame();

      // Save and close popup
      el.save();
      el.opened = false;
      await openedUpdated(el);

      // Open popup to get pillData
      el.opened = true;
      await openedUpdated(el);
      await nextFrame();
      const savedValues = el.values;
      const pillValues = el.pillsData.map((item) => item.value);

      expect(pillValues.length).to.equal(savedValues.length, 'Saved and Expected pills are not equal');
      expect(savedValues).to.have.ordered.members(pillValues, 'Values do not match');
    });

    it('Removes from selection on pill removal', async function () {
      const el = await fixture('<ef-tree-select show-pills opened lang="en-gb"></ef-tree-select>');
      const itemToRemove = flatSelection[0];
      el.data = flatData;
      el.opened = true;
      changeItemSelection(el, flatSelection);
      await openedUpdated(el);
      await nextFrame();
      const elementToRemove = [...el.shadowRoot.querySelectorAll('ef-pill')].find(
        (el) => el.value === itemToRemove.value
      ); // Austria
      elementToRemove.dispatchEvent(
        new CustomEvent('clear', {
          detail: {
            value: itemToRemove.value
          }
        })
      );
      expect(el.treeManager.checkedItems.indexOf(itemToRemove) === -1).to.equal(true, 'Item is removed');
    });

    it('Toggles expand all', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      el.opened = true;
      el.expansionToggleClickHandler();
      await openedUpdated(el);
      const tree = el.shadowRoot.querySelector('[part=tree]');
      await aTimeout(200);
      checkMemo(el, {
        expandable: 2,
        expanded: 2,
        selectable: selectableCount,
        selected: 0
      });
      expect(tree.children.length).to.equal(selectableCount + 2, 'Children are expanded');
      // and collapse
      el.expansionToggleClickHandler();
      await aTimeout(200);
      checkMemo(el, {
        expandable: 2,
        expanded: 0,
        selectable: selectableCount,
        selected: 0
      });
      expect(tree.children.length).to.equal(2, 'Children are collapsed');
    }).timeout(4000);

    it('Toggles select all - flat', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      el.selectionToggleHandler({
        detail: {
          value: true
        }
      });
      await elementUpdated(el);
      await aTimeout(200);
      checkMemo(el, {
        expandable: 0,
        expanded: 0,
        selectable: flatData.length,
        selected: flatData.length
      });
      expect(el.values.length).to.equal(0, 'Values are unaffected');
      const tempSelected = el.composer.queryItemsByPropertyValue('selected', true);
      expect(tempSelected.length).to.equal(flatData.length, 'All items are selected');
      el.selectionToggleHandler({
        detail: {
          value: false
        }
      });
      await aTimeout(200);
      checkMemo(el, {
        expandable: 0,
        expanded: 0,
        selectable: flatData.length,
        selected: 0
      });
      expect(el.values.length).to.equal(0, 'Values are unaffected');
      const tempSelectedAfter = el.composer.queryItemsByPropertyValue('selected', true);
      expect(tempSelectedAfter.length).to.equal(0, 'No items are selected');
    });

    it('Toggles select all - nested', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      el.selectionToggleHandler({
        detail: {
          value: true
        }
      });
      // the metadata used to determine the toggle state is currently throttled
      await aTimeout(200);
      checkMemo(el, {
        expandable: 2,
        expanded: 0,
        selectable: selectableCount,
        selected: selectableCount
      });
      expect(el.values.length).to.equal(0, 'Values are unaffected');
      expect(el.treeManager.checkedItems.slice().length).to.equal(selectableCount, 'All items are selected');
      el.selectionToggleHandler({
        detail: {
          value: false
        }
      });
      // await for update delay
      await aTimeout(200);
      checkMemo(el, {
        expandable: 2,
        expanded: 0,
        selectable: selectableCount,
        selected: 0
      });
      expect(el.treeManager.checkedItems.slice().length).to.equal(0, 'No items are selected');
    });

    it('Toggles select all - search with no result', async function () {
      // jira ELF-1373
      const el = await fixture('<ef-tree-select opened></ef-tree-select>');
      el.data = nestedData;
      await aTimeout(200);

      el.query = 'asd'; // query with no result matched
      await aTimeout(200);
      expect(el.shadowRoot.querySelector('[part="tree-control"]')).to.equal(null, 'tree-control should hide');
      expect(el.shadowRoot.querySelectorAll('[part="filter-wrapper"]').length).to.equal(
        0,
        'filter-wrapper should hide'
      );
      expect(el.shadowRoot.querySelector('[part="pills"]')).to.equal(null, 'pills should hide');
    });

    it('has correct disabled state on confirm button when select an item', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb" max="4"></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await elementUpdated(el);
      const treeItems = el.treeEl.querySelectorAll('[role=treeitem]');
      const confirmButton = el.popupEl.querySelector('#done');
      treeItems[0].click();
      treeItems[1].click();
      treeItems[2].click();
      treeItems[3].click();
      await elementUpdated(el);
      expect(confirmButton.disabled).to.equal(false);
      treeItems[4].click();
      await elementUpdated(el);
      expect(confirmButton.disabled).to.equal(true);
      treeItems[4].click(); // uncheck item
      await elementUpdated(el);
      expect(confirmButton.disabled).to.equal(false);
    });

    it('Tapping on clears button should clear the value', async function () {
      const el = await fixture('<ef-tree-select clears lang="en-gb"></ef-tree-select>');
      const data = [
        { label: '1', value: '1', selected: true },
        { label: '2', value: '2', selected: true },
        { label: '3', value: '3', selected: false }
      ];
      el.data = data;
      await elementUpdated(el);
      el.clearsButton.dispatchEvent(new CustomEvent('tap'));
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Tapping on clears did not clear the value');
    });
  });
});

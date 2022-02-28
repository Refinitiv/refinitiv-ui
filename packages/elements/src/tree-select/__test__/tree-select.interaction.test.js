import { aTimeout, elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

// Translations polyfills
import '@formatjs/intl-locale/polyfill.iife';
import '@formatjs/intl-getcanonicallocales/polyfill.iife';
import '@formatjs/intl-pluralrules/polyfill.iife';
import '@formatjs/intl-pluralrules/locale-data/en';

// import element and theme
import '@refinitiv-ui/elements/tree-select';
import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { flatData, flatSelection } from './mock_data/flat';
import { nestedData, nestedSelection, selectableCount } from './mock_data/nested';
import { changeItemSelection, checkMemo, doValuesMatch, openedUpdated } from './utils';

describe('tree-select/Interaction', () => {
  describe('Interaction Test', () => {

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
      expect(doValuesMatch(expectedSelection, savedValues)).to.equal(true, 'Values do not match');
    });

    it('Persists a selection - nested', async () => {
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
      expect(doValuesMatch(expectedSelection, savedValues)).to.equal(true, 'Values do not match');
    });

    it('Cancels a selection - flat', async () => {
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
      expect(doValuesMatch(expectedSelection, savedValues)).to.equal(true, 'Values do not match');
      expect(el.treeManager.visibleItems.length).to.equal(flatData.length, 'Data list should remain the same');
      const savedComposerValues = el.composerValues;
      expect(doValuesMatch(savedValues, savedComposerValues)).to.equal(true, 'Values and ComposerValues should be same');
      expect(savedValues.length).to.equal(savedComposerValues.length, 'Values and ComposerValues should be same');
    });

    it('Cancels a selection - nested', async () => {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      const expectedSelection = [];
      changeItemSelection(el, nestedSelection);
      await aTimeout(200); // make sure all processes are finished
      el.cancel();
      await elementUpdated(el);
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(doValuesMatch(expectedSelection, savedValues)).to.equal(true, 'Values do not match');
      expect(el.opened).to.equal(false, 'Cancel should close the list');
      const savedComposerValues = el.composerValues;
      expect(doValuesMatch(savedValues, savedComposerValues)).to.equal(true, 'Values and ComposerValues should be same');
      expect(savedValues.length).to.equal(savedComposerValues.length, 'Values and ComposerValues should be same');
    });

    it('Cancels a selection - already have selected item', async () => {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      const data = [{ selected: true, label: '1', value: '1' }, { label: '2', value: '2' }];
      el.data = data;
      changeItemSelection(el, data );
      await aTimeout(200); // make sure all processes are finished
      el.cancel();
      await elementUpdated(el);
      const expectedSelection = data.filter(item => item.selected).map(item => item.value);
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(doValuesMatch(expectedSelection, savedValues)).to.equal(true, 'Values do not match');
      expect(el.opened).to.equal(false, 'Cancel should close the list');
      const savedComposerValues = el.composerValues;
      expect(doValuesMatch(savedValues, savedComposerValues)).to.equal(true, 'Values and ComposerValues should be same');
      expect(savedValues.length).to.equal(savedComposerValues.length, 'Values and ComposerValues should be same');
    });

    it('Persist a selection, make changes and cancel - flat', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      // ensure events are fired
      el.data = flatData;
      const expectedSelection = changeItemSelection(el, flatSelection);
      el.save();
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(doValuesMatch(expectedSelection, savedValues)).to.equal(true, 'Values do not match');
      // make change with no commit
      changeItemSelection(el, flatSelection, true);
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(doValuesMatch(expectedSelection, savedValues)).to.equal(true, 'Values do not match');
    });

    it('Persist a selection, make changes and cancel - nested', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      // ensure events are fired
      el.data = nestedData;
      const expectedSelection = changeItemSelection(el, nestedSelection);
      el.save();
      const savedValues = el.values;
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(doValuesMatch(expectedSelection, savedValues)).to.equal(true, 'Values do not match');
      // make change with no commit
      changeItemSelection(el, nestedSelection, true);
      expect(savedValues.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(doValuesMatch(expectedSelection, savedValues)).to.equal(true, 'Values do not match');
    });

    it('Adds selection to pills', async () => {
      const el = await fixture('<ef-tree-select show-pills lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      const pillValues = el.pillsData.map(item => item.value);
      expect(pillValues).to.deep.equal(el.values, 'Values do not match');
    });

    it('Removes from selection on pill removal', async () => {
      const el = await fixture('<ef-tree-select show-pills opened lang="en-gb"></ef-tree-select>');
      const itemToRemove = flatSelection[0];
      el.data = flatData;
      el.opened = true;
      changeItemSelection(el, flatSelection);
      await nextFrame();
      const elementToRemove = [...el.shadowRoot.querySelectorAll('ef-pill')].find(el => el.value === itemToRemove.value); // Austria
      elementToRemove.dispatchEvent(new CustomEvent('clear', {
        detail: {
          value: itemToRemove.value
        }
      }));
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

    it('Toggles select all - flat', async () => {
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

    it('Toggles select all - nested', async () => {
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

    it('Toggles select all - search with no result', async () => { // jira ELF-1373
      const el = await fixture('<ef-tree-select opened></ef-tree-select>');
      el.data = nestedData;
      await aTimeout(200);

      el.query = 'asd'; // query with no result matched
      await aTimeout(200);
      expect(el.shadowRoot.querySelector('[part="tree-control"]')).to.equal(null, 'tree-control should hide');
      expect(el.shadowRoot.querySelectorAll('[part="filter-wrapper"]').length).to.equal(0, 'filter-wrapper should hide');
      expect(el.shadowRoot.querySelector('[part="pills"]')).to.equal(null, 'pills should hide');
  });
  });
});

import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/tree-select';
import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { flatData, flatSelection } from './mock_data/flat';
import { nestedData, nestedSelection, selectableCount } from './mock_data/nested';
import { changeItemSelection, openedUpdated } from './utils';

/*
*
* Nested tests are skipped as should inject parents
* This will be addressed and those tests turned back on
*
*/

describe('tree-select/Filter', () => {
  describe('Filter Test', () => {

    it('No filter applied', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
    });

    it('Text filter applied - flat', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      el.query = 'Macedonia';
      expect(el.treeManager.visibleItems.length).to.equal(1, 'One item is shown');
      expect(el.treeManager.visibleItems[0].label).to.equal('Republic of Macedonia');
    });

    it('Text filter applied - nested', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = nestedData;
      await openedUpdated(el);
      el.opened = true;
      await openedUpdated(el);
      el.query = 'Macedonia';
      expect(el.treeManager.visibleItems.length).to.equal(2, 'Two items shown');
      expect(el.treeManager.visibleItems[0].label).to.equal('Europe');
      expect(el.treeManager.visibleItems[1].label).to.equal('Republic of Macedonia');
    });

    it('Text filter applied, no result - flat', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      el.query = 'xxx';
      expect(el.treeManager.visibleItems.length).to.equal(0, 'No item is shown');
    });

    it('Removes Text filter', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      el.query = 'Macedonia';
      expect(el.treeManager.visibleItems.length).to.equal(1, 'One item is shown');
      expect(el.treeManager.visibleItems[0].label).to.equal('Republic of Macedonia');
      el.query = '';
      await elementUpdated(el);
      expect(el.treeManager.visibleItems.length).to.equal(flatData.length, 'All items are shown');
    });

    it('Removes Text filter - nested', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = nestedData;
      await elementUpdated(el);
      el.opened = true;
      await openedUpdated(el);
      el.query = 'Macedonia';
      expect(el.treeManager.visibleItems.length).to.equal(2, 'One item is shown');
      expect(el.treeManager.visibleItems[0].label).to.equal('Europe');
      expect(el.treeManager.visibleItems[1].label).to.equal('Republic of Macedonia');
      el.query = '';
      await elementUpdated(el);
      const expectedItemsLength = nestedData.length + nestedData[1].items.length;
      expect(el.treeManager.visibleItems.length).to.equal(expectedItemsLength, 'All items are shown');
    });

    it('Selection filter applied', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      await openedUpdated(el);
      changeItemSelection(el, flatSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(flatSelection.length, 'Unchecked items are hidden');
    });

    it('Selection filter applied - nested', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = nestedData;
      await openedUpdated(el);
      changeItemSelection(el, nestedSelection);
      el.selectedClickHandler();
      await elementUpdated(el);
      // match is selection + parents
      expect(el.treeManager.visibleItems.length).to.equal(nestedSelection.length + 2, 'Unchecked items are hidden');
    });

    it('Selection filter applied and selection changed within', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      changeItemSelection(el, flatSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(flatSelection.length, 'Unchecked items are hidden');
      el.treeManager.uncheckItem(flatSelection[3]);
      expect(el.treeManager.visibleItems.length).to.equal(flatSelection.length, 'Item unchecked in state is visible');
    });

    it('Selection filter applied and selection changed within - nested', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = nestedData;
      changeItemSelection(el, nestedSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(nestedSelection.length + 2, 'Unchecked items are hidden');
      el.treeManager.uncheckItem(nestedSelection[3]);
      el.treeManager.uncheckItem(nestedSelection[4]);
      el.treeManager.uncheckItem(nestedSelection[5]);
      // no change in the list
      expect(el.treeManager.visibleItems.length).to.equal(nestedSelection.length + 2, 'Item unchecked in state is visible');
    });

    it('Removes selection filter', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      changeItemSelection(el, flatSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length === flatData.length).to.equal(false, 'Unchecked items are hidden');
      expect(el.treeManager.visibleItems.length).to.equal(flatSelection.length, 'Checked items are shown');
      el.fullClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(flatData.length, 'All items are shown');
    });

    it('Removes selection filter - nested', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = nestedData;
      changeItemSelection(el, nestedSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length === selectableCount + 2).to.equal(false, 'Unchecked items are hidden');
      expect(el.treeManager.visibleItems.length).to.equal(nestedSelection.length + 2, 'Checked items are shown');
      el.fullClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(selectableCount + 2, 'All items are shown');
    });

    it('Text and selection filter applied', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      changeItemSelection(el, flatSelection);
      el.selectedClickHandler();
      el.query = 'an';
      await elementUpdated(el);
      expect(el.treeManager.visibleItems.length).to.equal(2, 'Unchecked items are hidden');
    });

    it('Text and selection filter applied - nested', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = nestedData;
      changeItemSelection(el, nestedSelection);
      el.selectedClickHandler();
      el.query = 'congo';
      // Africa and Congo will be visible
      expect(el.treeManager.visibleItems.length).to.equal(2, 'Parent and child are visible');
    });

    it('Text and selection filter removed', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      changeItemSelection(el, flatSelection);
      el.selectedClickHandler();
      el.query = 'an';
      expect(el.treeManager.visibleItems.length).to.equal(2, 'Unchecked items are hidden');
      el.query = '';
      el.fullClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(flatData.length, 'All items are shown');
    });

    it('Text and selection filter removed - nested', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = nestedData;
      changeItemSelection(el, nestedSelection);
      el.selectedClickHandler();
      el.query = 'congo';
      // Africa and Congo will be visible
      expect(el.treeManager.visibleItems.length).to.equal(2, 'Parent and child are visible');
      el.query = '';
      el.fullClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(selectableCount + 2, 'All items are visible');
    });

  });
});

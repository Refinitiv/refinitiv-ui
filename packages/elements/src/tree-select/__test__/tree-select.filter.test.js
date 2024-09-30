// import element and theme
import escapeStringRegexp from 'escape-string-regexp';

import '@refinitiv-ui/elements/tree-select';

import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { aTimeout, elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import { createDefaultFilter } from '../../../lib/combo-box/helpers/filter.js';
import { flatData, flatSelection } from './mock_data/flat.js';
import { multiLevelData } from './mock_data/multi-level.js';
import { nestedData, nestedSelection, selectableCount } from './mock_data/nested.js';
import { noRelationData } from './mock_data/no-relation.js';
import { changeItemSelection, getTreeElPart, openedUpdated } from './utils.js';

/*
 *
 * Nested tests are skipped as should inject parents
 * This will be addressed and those tests turned back on
 *
 */

describe('tree-select/Filter', function () {
  describe('Filter Test', function () {
    it('No filter applied', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
    });

    it('Text filter applied - flat', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      el.query = 'Macedonia';
      expect(el.treeManager.visibleItems.length).to.equal(1, 'One item is shown');
      expect(el.treeManager.visibleItems[0].label).to.equal('Republic of Macedonia');
    });

    it('Text filter applied - nested', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      await openedUpdated(el);
      el.opened = true;
      await openedUpdated(el);
      el.query = 'Macedonia';
      expect(el.treeManager.visibleItems.length).to.equal(2, 'Two items shown');
      expect(el.treeManager.visibleItems[0].label).to.equal('Europe');
      expect(el.treeManager.visibleItems[1].label).to.equal('Republic of Macedonia');
    });

    it('Text filter applied, expanded ancestors of matched items correctly - multi level', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = multiLevelData;
      await elementUpdated(el);
      el.opened = true;
      await openedUpdated(el);
      el.query = '-2';
      await elementUpdated(el);
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[0])).to.equal(
        true,
        'Level 1-1 is expanded because matched some descendant item'
      );
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[1])).to.equal(
        true,
        'Level 2-1 is expanded because matched some descendant item'
      );
    });

    it('Text filter applied, collapsed children of matched items and included descendants correctly - multi level', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = multiLevelData;
      await elementUpdated(el);
      el.opened = true;
      await openedUpdated(el);
      el.query = '-2';
      await elementUpdated(el);
      // Matched item must be collapsed when does not have any matched descendants
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[3])).to.equal(
        false,
        'Level 2-2 is collapsed because does not matched any descendant item'
      );
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[4])).to.equal(
        false,
        'Level 1-2 is collapsed because does not matched any descendant item'
      );

      // All descendants of matched items must be included
      const descendants = [
        ...el.treeManager.getItemDescendants(el.treeManager.parentItems[2]), // Level 2-2
        ...el.treeManager.getItemDescendants(el.treeManager.parentItems[3]) // Level 1-2
      ];
      descendants.forEach((item) =>
        expect(el.treeManager.isItemHidden(item)).to.equal(
          false,
          'Descendants of matched items must be included'
        )
      );
    });

    it('Text filter applied, expanded and collapsed correctly - multi level', async function () {
      // If filter match a parent but not match any children, the parent will be collapsed
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = multiLevelData;
      await elementUpdated(el);
      el.opened = true;
      await openedUpdated(el);
      el.query = 'Level 2';
      await elementUpdated(el);
      // Level 1 will be visible and level 2 will be visible and collapsed
      expect(el.treeManager.visibleItems.length).to.equal(6, 'Level 2 are collapsed');
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[1])).to.equal(
        false,
        'Level 2-1 is collapsed'
      );
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[2])).to.equal(
        false,
        'Level 2-2 is collapsed'
      );
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[4])).to.equal(
        false,
        'Level 2-3 is collapsed'
      );

      // Query all level have suffix "-2"
      el.query = '-2';
      await elementUpdated(el);
      // Matched items should be visible and expanding and collapsing should be shown correctly.
      expect(el.treeManager.visibleItems.length).to.equal(5, 'Visible all level have suffix "-2"');
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[0])).to.equal(
        true,
        'Level 1-1 is expanded because matched child item'
      );
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[1])).to.equal(
        true,
        'Level 2-1 is expanded because matched child item'
      );
      // Todo: Inform tester to update these tests to check if the result is correct. Look at comparing data object instead.
      // expect(el.treeManager.isItemVisible(el.treeManager.visibleItems[2])).to.equal(true, 'Level 3-2 is matched item and visible');
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[3])).to.equal(
        false,
        'Level 2-2 is matched item and collapsed because not matched any descendant items'
      );
      expect(el.treeManager.isItemExpanded(el.treeManager.visibleItems[4])).to.equal(
        false,
        'Level 1-2 is matched item and collapsed because not matched any descendant items'
      );

      // All descendants of matched items must be included
      const descendants = [
        ...el.treeManager.getItemDescendants(el.treeManager.parentItems[2]), // Level 2-2
        ...el.treeManager.getItemDescendants(el.treeManager.parentItems[3]) // Level 1-2
      ];
      descendants.forEach((item) =>
        expect(el.treeManager.isItemHidden(item)).to.equal(
          false,
          'Descendants of matched items must be included'
        )
      );
    });

    it('Text filter applied, no result - flat', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);

      setTimeout(() => {
        el.query = 'xxx';
      }); // Safari need more time to handle the query change

      await elementUpdated(el);
      await aTimeout(100); // Safari need more time to handle the query change

      expect(el.treeManager.visibleItems.length).to.equal(0, 'No item is shown');
    });

    it('Removes Text filter', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
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

    it('Removes Text filter - nested', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
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

    it('Selection filter applied', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      await openedUpdated(el);
      changeItemSelection(el, flatSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(flatSelection.length, 'Unchecked items are hidden');
    });

    it('Selection filter applied - nested', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      await openedUpdated(el);
      changeItemSelection(el, nestedSelection);
      el.selectedClickHandler();
      await elementUpdated(el);
      // match is selection + parents
      expect(el.treeManager.visibleItems.length).to.equal(
        nestedSelection.length + 2,
        'Unchecked items are hidden'
      );
    });

    it('Selection filter applied and selection changed within', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      changeItemSelection(el, flatSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(flatSelection.length, 'Unchecked items are hidden');
      el.treeManager.uncheckItem(flatSelection[3]);
      expect(el.treeManager.visibleItems.length).to.equal(
        flatSelection.length,
        'Item unchecked in state is visible'
      );
    });

    it('Selection filter applied and selection changed within - nested', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      changeItemSelection(el, nestedSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(
        nestedSelection.length + 2,
        'Unchecked items are hidden'
      );
      el.treeManager.uncheckItem(nestedSelection[3]);
      el.treeManager.uncheckItem(nestedSelection[4]);
      el.treeManager.uncheckItem(nestedSelection[5]);
      // no change in the list
      expect(el.treeManager.visibleItems.length).to.equal(
        nestedSelection.length + 2,
        'Item unchecked in state is visible'
      );
    });

    it('Should not show unselected items when clicking on selected button in no-relation mode', async function () {
      const el = await fixture('<ef-tree-select opened no-relation></ef-tree-select>');
      el.data = noRelationData;
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(el.treeManager.checkedItems.length);
    });

    it('Should have correct selected amount when checking on parent item in no-relation mode', async function () {
      const el = await fixture('<ef-tree-select opened no-relation></ef-tree-select>');
      el.data = noRelationData;
      el.treeManager.uncheckItem(noRelationData[0].items[0]); // unselected all items excepts the parent
      el.updateMemo();
      expect(el.memo.expandable).to.equal(el.treeManager.parentItems.length);
      expect(el.memo.selected).to.equal(el.treeManager.checkedItems.length);
    });

    it('Removes selection filter', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      changeItemSelection(el, flatSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length === flatData.length).to.equal(
        false,
        'Unchecked items are hidden'
      );
      expect(el.treeManager.visibleItems.length).to.equal(flatSelection.length, 'Checked items are shown');
      el.fullClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(flatData.length, 'All items are shown');
    });

    it('Removes selection filter - nested', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      changeItemSelection(el, nestedSelection);
      el.selectedClickHandler();
      expect(el.treeManager.visibleItems.length === selectableCount + 2).to.equal(
        false,
        'Unchecked items are hidden'
      );
      expect(el.treeManager.visibleItems.length).to.equal(
        nestedSelection.length + 2,
        'Checked items are shown'
      );
      el.fullClickHandler();
      expect(el.treeManager.visibleItems.length).to.equal(selectableCount + 2, 'All items are shown');
    });

    it('Text and selection filter applied', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      changeItemSelection(el, flatSelection);
      el.selectedClickHandler();
      el.query = 'an';
      await elementUpdated(el);
      expect(el.treeManager.visibleItems.length).to.equal(2, 'Unchecked items are hidden');
    });

    it('Text and selection filter applied - nested', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      changeItemSelection(el, nestedSelection);
      el.selectedClickHandler();
      el.query = 'congo';
      // Africa and Congo will be visible
      expect(el.treeManager.visibleItems.length).to.equal(2, 'Parent and child are visible');
    });

    it('Text and selection filter removed', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
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

    it('Text and selection filter removed - nested', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
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

    it('Should allow selected filter button when there is only selected but disabled item in tree', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      const data = [
        { selected: true, label: '1', value: '1', disabled: true },
        { label: '2', value: '2' }
      ];
      el.data = data;
      el.selectedClickHandler();
      const selectedData = data.filter((item) => item.selected === true);
      expect(el.treeManager.visibleItems.length).to.equal(
        selectedData.length,
        'Show all selected items including disabled'
      );
    });

    it('Should allow selected filter button when there is only selected but readonly item in tree', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      const data = [
        { selected: true, label: '1', value: '1', readonly: true },
        { label: '2', value: '2' }
      ];
      el.data = data;
      el.selectedClickHandler();
      const selectedData = data.filter((item) => item.selected === true);
      expect(el.treeManager.visibleItems.length).to.equal(
        selectedData.length,
        'Show all selected items including readonly'
      );
    });

    it('Should be able to filter items based on updated label value', async function () {
      const el = await fixture('<ef-tree-select opened></ef-tree-select>');
      el.data = flatData;
      await elementUpdated(el);
      const treeEl = getTreeElPart(el);
      expect(treeEl.children.length).to.equal(
        flatData.length,
        `there should be only ${flatData.length} children with default query`
      );

      const treeNodes = el.treeManager.getTreeNodes();
      const node = treeNodes[0];
      node.label = 'show me the code';
      el.query = 'show me the code';
      await elementUpdated(el);
      expect(treeEl.children.length).to.equal(1, 'there should be 1 child with the provided query');
    });

    it('Should be able to use custom filter function', async function () {
      const el = await fixture('<ef-tree-select opened></ef-tree-select>');
      el.data = flatData;
      await elementUpdated(el);

      const createCustomFilter = (treeSelect) => {
        let query = '';
        let queryRegExp;
        // Items could be filtered with case-insensitive partial match of both labels & values.
        const getRegularExpressionOfQuery = () => {
          if (treeSelect.query !== query || !queryRegExp) {
            query = treeSelect.query || '';
            queryRegExp = new RegExp(escapeStringRegexp(query), 'i');
          }
          return queryRegExp;
        };
        return (item, treeManager) => {
          const treeNode = treeManager.getTreeNode(item);
          const { label, value } = treeNode;
          const regex = getRegularExpressionOfQuery();
          const result = regex.test(value) || regex.test(label);
          return result;
        };
      };
      el.filter = createCustomFilter(el);
      const query = 'is';
      el.query = query;
      await elementUpdated(el);

      const expectedLength = 4;
      const treeEl = getTreeElPart(el);
      expect(treeEl.children.length).to.equal(
        expectedLength,
        `there should be only ${expectedLength} children with a query of ${query}`
      );
    });

    it('should update filter result when filter is updated', async function () {
      const el = await fixture('<ef-tree-select opened></ef-tree-select>');
      el.data = flatData;
      await elementUpdated(el);

      const createCustomFilter = (treeSelect) => {
        let query = '';
        let queryRegExp;
        // Items could be filtered with case-insensitive partial match of both labels & values.
        const getRegularExpressionOfQuery = () => {
          if (treeSelect.query !== query || !queryRegExp) {
            query = treeSelect.query || '';
            queryRegExp = new RegExp(escapeStringRegexp(query), 'i');
          }
          return queryRegExp;
        };
        return (item, treeManager) => {
          const treeNode = treeManager.getTreeNode(item);
          const { label, value } = treeNode;
          const regex = getRegularExpressionOfQuery();
          const result = regex.test(value) || regex.test(label);
          return result;
        };
      };
      el.filter = createCustomFilter(el);
      const query = 'DEU';
      el.query = query;
      await elementUpdated(el);

      const expectedLength = 1;
      const treeEl = getTreeElPart(el);
      expect(treeEl.children.length).to.equal(
        expectedLength,
        `there should be only ${expectedLength} child(ren) with a query of ${query}`
      );

      el.filter = createDefaultFilter(el);
      await elementUpdated(el);

      const noChildren = 0;
      expect(treeEl.children.length).to.equal(
        noChildren,
        `there should be ${noChildren} child(ren) with the provided custom filter & query of ${query}`
      );
    });
  });
});

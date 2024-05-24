// import element and theme
import escapeStringRegexp from 'escape-string-regexp';

import '@refinitiv-ui/elements/tree';

import '@refinitiv-ui/elemental-theme/light/ef-tree';
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  isIE,
  keyboardEvent,
  nextFrame,
  oneEvent
} from '@refinitiv-ui/test-helpers';

import {
  deepNestedData,
  firstFilterData,
  flatData,
  multiLevelData,
  nestedData,
  secondFilterData
} from './helpers/data.js';

const keyArrowUp = keyboardEvent('keydown', { key: 'Up' });
const keyArrowDown = keyboardEvent('keydown', { key: 'Down' });
const keyArrowLeft = keyboardEvent('keydown', { key: 'Left' });
const keyArrowRight = keyboardEvent('keydown', { key: 'Right' });
const keyEnter = keyboardEvent('keydown', { key: 'Enter' });

describe('tree/Tree', function () {
  describe('Basic Tests', function () {
    it('Label and DOM structure is correct', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      expect(el).dom.to.equalSnapshot();
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Icon in DOM structure is correct', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);

      const firstElementIcon = el.children[0].shadowRoot.querySelector('[part="label-icon"]');
      expect(firstElementIcon.attributes.icon.value).to.equal('info');

      const secondElementIcon = el.children[1].shadowRoot.querySelector('[part="label-icon"]');
      expect(secondElementIcon.attributes.icon.value).to.equal('');

      const thirdElementIcon = el.children[2].shadowRoot.querySelector('[part="label-icon"]');
      expect(thirdElementIcon.attributes.icon.value).to.equal(
        'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg'
      );

      const forthElementIcon = el.children[3].shadowRoot.querySelector('[part="label-icon"]');
      expect(forthElementIcon).to.equal(null);
    });

    it('Should set the correct icon value', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);

      const iconElement = el.children[0].shadowRoot.querySelector('[part="label-icon"]');

      el.composer.setItemPropertyValue(el.manager.visibleItems[0], 'icon', '');
      await elementUpdated(el);
      await nextFrame();
      expect(iconElement.attributes.icon.value).to.equal('');

      el.composer.setItemPropertyValue(
        el.manager.visibleItems[0],
        'icon',
        'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg'
      );
      await elementUpdated(el);
      await nextFrame();
      expect(iconElement.attributes.icon.value).to.equal(
        'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg'
      );

      el.composer.setItemPropertyValue(el.manager.visibleItems[0], 'icon', 'buzz');
      await elementUpdated(el);
      await nextFrame();
      expect(iconElement.attributes.icon.value).to.equal('buzz');

      el.composer.setItemPropertyValue(el.manager.visibleItems[0], 'icon', undefined);
      await elementUpdated(el);
      await nextFrame();
      expect(el.children[0].shadowRoot.querySelector('[part="label-icon"]')).to.equal(null);
    });

    it('Supports a flat data structure', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);
    });

    it('Supports a nested data structure', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
    });

    it('Should set the correct value', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.value).to.equal('1.2');
      expect(el.values).to.deep.equal(['1.2']);
    });

    it('Should return parent values in no-relation mode', async function () {
      const el = await fixture('<ef-tree no-relation multiple></ef-tree>');
      el.data = nestedData;
      el.value = '1';
      await elementUpdated(el);
      expect(el.value).to.equal('1');
      expect(el.values).to.deep.equal(['1']);
    });

    it('Supports selecting a nested item on tap', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      const item = el.children[1];
      item.click();
      await elementUpdated(el);
      expect(el.value).to.equal('1.1');
    });

    it('Supports expanding and collapsing groups', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      const expandToggle = el.firstElementChild.shadowRoot.querySelector('[expand-toggle]');
      expect(el.children).to.have.lengthOf(6, 'All 6 children should be rendered');
      expandToggle.click();
      await elementUpdated(el);
      expect(el.children).to.have.lengthOf(4, 'Collapsing group should leave only 4 children left');
      expandToggle.click();
      await elementUpdated(el);
      isIE() && (await nextFrame());
      expect(el.children).to.have.lengthOf(6, 'Expanding the group should show all 6 children again');
    });

    it('Fires expanded-changed events', async function () {
      let event;
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      const firstElement = el.firstElementChild;
      const expandToggle = firstElement.shadowRoot.querySelector('[expand-toggle]');
      setTimeout(() => firstElement.click());
      event = await oneEvent(el, 'expanded-changed');
      expect(event.detail.value, 'Group should be collapsed').to.be.false;
      expect(event.detail.item, 'Item should be the same as the original').to.equal(nestedData[0]);
      setTimeout(() => firstElement.click());
      event = await oneEvent(el, 'expanded-changed');
      expect(event.detail.value, 'Group should be expanded').to.be.true;
      expect(event.detail.item, 'Item should be the same as the original').to.equal(nestedData[0]);
      setTimeout(() => expandToggle.click());
      event = await oneEvent(el, 'expanded-changed');
      expect(event.detail.value, 'Group should be collapsed').to.be.false;
      expect(event.detail.item, 'Item should be the same as the original').to.equal(nestedData[0]);
      setTimeout(() => expandToggle.click());
      event = await oneEvent(el, 'expanded-changed');
      expect(event.detail.value, 'Group should be expanded').to.be.true;
      expect(event.detail.item, 'Item should be the same as the original').to.equal(nestedData[0]);
      setTimeout(() => el.dispatchEvent(keyArrowLeft));
      event = await oneEvent(el, 'expanded-changed');
      expect(event.detail.value, 'Group should be collapsed').to.be.false;
      expect(event.detail.item, 'Item should be the same as the original').to.equal(nestedData[0]);
      setTimeout(() => el.dispatchEvent(keyArrowRight));
      event = await oneEvent(el, 'expanded-changed');
      expect(event.detail.value, 'Group should be expanded').to.be.true;
      expect(event.detail.item, 'Item should be the same as the original').to.equal(nestedData[0]);
    });

    it('Can expand/collapse all items', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.children).to.have.lengthOf(6, 'All 6 children should be rendered');
      el.collapseAll();
      await elementUpdated(el);
      expect(el.children).to.have.lengthOf(4, 'Collapsing all should hide 2 leaving 4 children');
      el.expandAll();
      await elementUpdated(el);
      isIE() && (await nextFrame());
      expect(el.children).to.have.lengthOf(6, 'Expanding all should show all 6 children again');
    });

    it('Should not be able to check all items in single selection mode', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1.2']);
      el.uncheckAll();
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
      expect(() => el.checkAll()).to.throw('You cannot check all items in single selection mode');
    });

    it('Can navigate using the keyboard', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      el.collapseAll();
      await elementUpdated(el);
      el.dispatchEvent(keyArrowDown);
      el.dispatchEvent(keyArrowRight);
      el.dispatchEvent(keyArrowDown);
      el.dispatchEvent(keyEnter);
      await elementUpdated(el);
      expect((el.value = '1.1'));
      el.dispatchEvent(keyArrowUp);
      el.dispatchEvent(keyArrowLeft);
      el.dispatchEvent(keyArrowDown);
      el.dispatchEvent(keyArrowDown);
      el.dispatchEvent(keyArrowDown);
      await elementUpdated(el);
      expect((el.value = '4'));
    });
  });

  describe('Multiple Selection Mode', function () {
    it('Values property change', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      const data = [];

      // Create data item 1 - 4
      for (let i = 1; i <= 4; i++) {
        data.push({ label: 'Item ' + i, value: i });
      }
      let expectedValues = data.map((item) => item.value);

      el.data = data;
      await elementUpdated(el);

      // Test set values property
      el.values = expectedValues;
      await elementUpdated(el);
      expect(el.values).to.have.ordered.members(expectedValues, 'Values do not match');

      // Set same values property with a new sequence
      expectedValues.reverse();
      el.values = expectedValues;
      await elementUpdated(el);
      expect(el.values).to.have.ordered.members(expectedValues, 'Values do not match with a new sequence');
    });

    it('Shows correct checked states', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = deepNestedData;
      await elementUpdated(el);
      el.expandAll();
      await elementUpdated(el);
      isIE() && (await nextFrame());
      const item = el.children[3];
      const itemChild = el.children[4];
      expect(item.label).to.equal('Item 1.3');
      expect(item.checkedState).to.equal(1); // Checked
      item.click();
      await elementUpdated(el);
      isIE() && (await nextFrame());
      expect(item.checkedState).to.equal(0); // Unchecked
      itemChild.click();
      await elementUpdated(el);
      isIE() && (await nextFrame());
      expect(item.checkedState).to.equal(-1); // Indeterminate
    });

    it('Supports deselecting an item on tap', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);
      const item = el.children[3];
      expect(el.value).to.equal('4');
      item.click();
      await elementUpdated(el);
      expect(el.value).to.equal('');
    });

    it('Supports selecting/deselecting all items in groups', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      const item = el.firstElementChild;
      item.click();
      await elementUpdated(el);
      expect(el.values).to.have.all.members(['1.1', '1.2']);
      item.click();
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
    });

    it('Can check/uncheck all items', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1.2']);
      el.uncheckAll();
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
      el.checkAll();
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1.1', '1.2', '4']);
    });

    it('Uncheck all items correctly with deep nested data', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = deepNestedData;
      await elementUpdated(el);
      el.uncheckAll();
      el.expandAll();
      await elementUpdated(el);
      const item = el.children[3];
      const itemChild = el.children[4];
      itemChild.click();
      await elementUpdated(el);
      el.uncheckAll();
      await elementUpdated(el);
      expect(item.checkedState).to.equal(0);
      el.uncheckAll();
      await elementUpdated(el);
      el.values = ['1.3.1.1'];
      await elementUpdated(el);
      el.uncheckAll();
      await elementUpdated(el);
      expect(item.checkedState).to.equal(0);
      expect(itemChild.checkedState).to.equal(0);
    });

    it('check/uncheck all items correctly in no-relation with deep nested data', async function () {
      const el = await fixture('<ef-tree multiple no-relation></ef-tree>');
      el.data = deepNestedData;
      await elementUpdated(el);
      el.uncheckAll();
      el.expandAll();
      await elementUpdated(el);
      const item = el.children[3];
      const itemChild = el.children[4];
      itemChild.click();
      await elementUpdated(el);
      el.uncheckAll();
      await elementUpdated(el);
      expect(item.checkedState).to.equal(0);
      el.checkAll();
      await elementUpdated(el);
      expect(item.checkedState).to.equal(1);
      expect(itemChild.checkedState).to.equal(1);
    });

    it('Values sequential selection', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      const data = [];
      const selection = [1, 0, 3, 2]; // array index
      let expectedSelection = [];

      // Create data item 1 - 4
      for (let i = 1; i <= 4; i++) {
        data.push({ label: 'Item ' + i, value: i });
      }
      el.data = data;
      await elementUpdated(el);

      // Sequential selection
      for (let i = 0; i < selection.length; i++) {
        const treeItem = el.children[i];
        expectedSelection.push(treeItem.item.value);
        treeItem.click();
        await aTimeout(10); // Delay for sequential selection checking
      }

      expect(el.values.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(expectedSelection).to.have.ordered.members(
        el.values,
        'Values sequential selection do not match'
      );
    });

    it('Can set values programmatically', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = nestedData;
      el.value = '';
      await elementUpdated(el);
      expect(el.value).to.equal('');
      expect(el.values).to.deep.equal([]);
      el.values = ['1.1', '1.2'];
      await elementUpdated(el);
      expect(el.value).to.equal('1.1');
      expect(el.values).to.deep.equal(['1.1', '1.2']);
    });

    it('Update the parent selected state correctly', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      const item = el.children[0];
      expect(item.checkedState).to.equal(-1); // Indeterminate
      el.values = [];
      await elementUpdated(el);
      expect(item.checkedState).to.equal(0); // Unchecked
      el.values = ['1.1'];
      await elementUpdated(el);
      expect(item.checkedState).to.equal(-1); // Indeterminate
    });

    it('Should set values to empty array when set invalid values', async function () {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      el.values = '1.1';
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
    });
  });

  describe('Stateless Mode', function () {
    it('Should expand/collapse when tapping on single mode parent', async function () {
      const el = await fixture('<ef-tree stateless></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);

      el.children[0].click();
      await elementUpdated(el);
      expect(el.children[0].expanded).to.be.false;

      el.children[0].click();
      await elementUpdated(el);
      expect(el.children[0].expanded).to.be.true;
    });

    it('Should not expand/collapse when tapping on multiple mode parent', async function () {
      const el = await fixture('<ef-tree multiple stateless></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);

      el.children[0].click();
      await elementUpdated(el);
      expect(el.children[0].expanded).to.be.true;

      el.children[0].click();
      await elementUpdated(el);
      expect(el.children[0].expanded).to.be.true;
    });

    it('Should not select value when tapping on multiple mode parent', async function () {
      const el = await fixture('<ef-tree multiple stateless></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);

      el.children[0].click();
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1.2'], 'should have only 1.2 as default seleted value');
    });
  });

  describe('Filter Tests', function () {
    it('Text filter applied, query attribute - multi level', async function () {
      const el = await fixture('<ef-tree query="-3" ></ef-tree>');
      el.data = multiLevelData;
      await elementUpdated(el);
      expect(el.manager.visibleItems.length).to.equal(5, 'Visible all level have suffix "-3"');

      // Change attribute
      el.setAttribute('query', '5');
      await elementUpdated(el);
      expect(el.manager.visibleItems.length).to.equal(3, 'Visible 3 items');

      // Remove attribute
      el.removeAttribute('query');
      await elementUpdated(el);
      expect(el.manager.visibleItems.length).to.equal(11, 'Visible 11 items');
    });

    it('Text filter applied, query property - multi level', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = multiLevelData;
      el.query = 'Level 2';
      await elementUpdated(el);
      expect(el.manager.visibleItems.length).to.equal(6, 'Level 1 and 2 are visible');

      el.query = 'Level 3';
      await elementUpdated(el);
      expect(el.manager.visibleItems.length).to.equal(10, 'Level 3 are visible');

      // Show all items when query is empty
      el.query = '';
      await elementUpdated(el);
      expect(el.manager.visibleItems.length).to.equal(11, 'All items are visible');
    });

    it('Text filter applied, expanded ancestors of matched items correctly - multi level', async function () {
      const el = await fixture('<ef-tree query="-2"></ef-tree');
      el.data = multiLevelData;
      await elementUpdated(el);
      expect(el.manager.isItemExpanded(el.manager.visibleItems[0])).to.equal(
        true,
        'Level 1-1 is expanded because matched some descendant item'
      );
      expect(el.manager.isItemExpanded(el.manager.visibleItems[1])).to.equal(
        true,
        'Level 2-1 is expanded because matched some descendant item'
      );
    });

    it('Text filter applied, collapsed children of matched items and included descendants correctly - multi level', async function () {
      const el = await fixture('<ef-tree query="-2"></ef-tree');
      el.data = multiLevelData;
      await elementUpdated(el);

      // Matched item must be collapsed when does not have any matched descendants
      expect(el.manager.isItemExpanded(el.manager.visibleItems[3])).to.equal(
        false,
        'Level 2-2 is collapsed because does not matched any descendant item'
      );
      expect(el.manager.isItemExpanded(el.manager.visibleItems[4])).to.equal(
        false,
        'Level 1-2 is collapsed because does not matched any descendant item'
      );

      // All descendants of matched items must be included
      const descendants = [
        ...el.manager.getItemDescendants(el.manager.parentItems[2]), // Level 2-2
        ...el.manager.getItemDescendants(el.manager.parentItems[3]) // Level 1-2
      ];
      descendants.forEach((item) =>
        expect(el.manager.isItemHidden(item)).to.equal(false, 'Descendants of matched items must be included')
      );
    });

    it('Text filter applied, expanded and the collapsed must be display correctly  - multi level', async function () {
      // If filter match a parent but not match any children, the parent will be collapsed
      const el = await fixture('<ef-tree></ef-tree');
      el.data = multiLevelData;
      await elementUpdated(el);
      expect(el.manager.isItemExpanded(el.manager.visibleItems[1])).to.equal(false, 'Level 2-1 is collapsed');
      expect(el.manager.isItemExpanded(el.manager.visibleItems[2])).to.equal(false, 'Level 2-2 is collapsed');
      expect(el.manager.isItemExpanded(el.manager.visibleItems[4])).to.equal(false, 'Level 2-3 is collapsed');

      // Query all level have suffix "-2"
      el.query = '-2';
      await elementUpdated(el);
      // Matched items should be visible and expanding and collapsing should be shown correctly.
      expect(el.manager.visibleItems.length).to.equal(5, 'Visible all level have suffix "-2"');
      expect(el.manager.isItemExpanded(el.manager.visibleItems[0])).to.equal(
        true,
        'Level 1-1 is expanded because matched child item'
      );
      expect(el.manager.isItemExpanded(el.manager.visibleItems[1])).to.equal(
        true,
        'Level 2-1 is expanded because matched child item'
      );
      // Todo: Inform tester to update these tests to check if the result is correct. Look at comparing data object instead.
      // expect(el.manager.isItemVisible(el.manager.visibleItems[2])).to.equal(true, 'Level 3-2 is matched item and visible');
      expect(el.manager.isItemExpanded(el.manager.visibleItems[3])).to.equal(
        false,
        'Level 2-2 is matched item and collapsed because not matched any descendant items'
      );
      expect(el.manager.isItemExpanded(el.manager.visibleItems[4])).to.equal(
        false,
        'Level 1-2 is matched item and collapsed because not matched any descendant items'
      );

      // All descendants of matched items must be included
      const descendants = [
        ...el.manager.getItemDescendants(el.manager.parentItems[2]), // Level 2-2
        ...el.manager.getItemDescendants(el.manager.parentItems[3]) // Level 1-2
      ];
      descendants.forEach((item) =>
        expect(el.manager.isItemHidden(item)).to.equal(false, 'Descendants of matched items must be included')
      );
    });

    it('Should be able to select value after filter is applied', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);

      el.children[0].click();
      await elementUpdated(el);

      el.query = 'Item 4';
      await elementUpdated(el);

      el.children[0].click();
      await elementUpdated(el);

      expect(el.value).to.equal('4', 'Value should be update when selecting a new item on filter applied.');
    });

    it('Text filter applied, check/uncheck item and switch between single and multiple selection mode', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);

      el.children[0].click();
      await elementUpdated(el);

      el.query = 'Item 4';
      await elementUpdated(el);

      el.multiple = true;
      await elementUpdated(el);

      el.uncheckAll();
      await elementUpdated(el);
      expect(el.value).to.equal('1', "hidden selected item in multiple mode shouldn't unchecked");

      el.multiple = false;
      await elementUpdated(el);

      el.children[0].click();
      await elementUpdated(el);
      expect(el.value).to.equal('4', 'Value should be update when selecting a new item on filter applied.');
    });

    it('should be able to filter items with custom filter & query', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = firstFilterData;
      await elementUpdated(el);

      const createCustomFilter = (tree) => {
        let query = '';
        let queryRegExp;
        const getRegularExpressionOfQuery = () => {
          if (tree.query !== query || !queryRegExp) {
            query = tree.query || '';
            queryRegExp = new RegExp(escapeStringRegexp(query), 'i');
          }
          return queryRegExp;
        };
        return (item, manager) => {
          const treeNode = manager.getTreeNode(item);
          const { label, value } = treeNode;
          const regex = getRegularExpressionOfQuery();
          const result = regex.test(value) || regex.test(label);
          return result;
        };
      };
      el.filter = createCustomFilter(el);
      el.query = '3';
      await elementUpdated(el);

      const firstChildrenCount = 7;
      expect(el.children.length).to.equal(
        firstChildrenCount,
        `there should be ${firstChildrenCount} child(ren) with the provided custom filter & query`
      );

      el.query = 'three';
      await elementUpdated(el);

      expect(el.children.length).to.equal(
        firstChildrenCount,
        `there should be ${firstChildrenCount} child(ren) with the provided custom filter & query`
      );

      el.data = secondFilterData;
      await elementUpdated(el);

      const secondChildrenCount = 4;
      expect(el.children.length).to.equal(
        secondChildrenCount,
        `there should be ${secondChildrenCount} child(ren) with the provided custom filter, query & data`
      );
    });

    it('should be able to filter items based on updated label value', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);
      expect(el.children.length).to.equal(
        flatData.length,
        `there should be ${flatData.length} children with default query`
      );

      const treeNodes = el.manager.getTreeNodes();
      const node = treeNodes[0];
      node.label = 'lit';
      el.query = 'lit';
      await elementUpdated(el);
      expect(el.children.length).to.equal(1, 'there should be 1 child with the provided query');
    });
  });
});

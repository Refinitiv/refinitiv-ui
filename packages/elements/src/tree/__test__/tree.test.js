import {
  fixture,
  expect,
  elementUpdated,
  isIE,
  nextFrame,
  keyboardEvent,
  oneEvent
} from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/tree';
import '@refinitiv-ui/elemental-theme/light/ef-tree';
import { multiLevelData } from './mock_data/multi-level';

const keyArrowUp = keyboardEvent('keydown', { key: 'Up' });
const keyArrowDown = keyboardEvent('keydown', { key: 'Down' });
const keyArrowLeft = keyboardEvent('keydown', { key: 'Left' });
const keyArrowRight = keyboardEvent('keydown', { key: 'Right' });
const keyEnter = keyboardEvent('keydown', { key: 'Enter' });

const flatData = [{
  icon: 'info',
  label: 'Item 1',
  value: '1'
},
{
  icon: '',
  label: 'Item 2',
  value: '2',
  readonly: true
},
{
  icon: 'https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg',
  label: 'Item 3',
  value: '3',
  disabled: true
},
{
  label: 'Item 4',
  value: '4',
  selected: true
}];

const nestedData = [{
  label: 'Item 1',
  value: '1',
  expanded: true,
  items: [{
    label: 'Item 1.1',
    value: '1.1'
  },
  {
    label: 'Item 1.2',
    value: '1.2',
    selected: true
  }]
},
{
  label: 'Item 2',
  value: '2',
  readonly: true
},
{
  label: 'Item 3',
  value: '3',
  disabled: true
},
{
  label: 'Item 4',
  value: '4'
}];

const deepNestedData = [{
  label: 'Item 1',
  value: '1',
  items: [
    {
      label: 'Item 1.1',
      value: '1.1',
    },
    {
      label: 'Item 1.2',
      value: '1.2',
    },
    {
      label: 'Item 1.3',
      value: '1.3',
      items: [
        {
          label: 'Item 1.3.1',
          value: '1.3.1',
          items: [
            {
              label: 'Item 1.3.1.1',
              value: '1.3.1.1',
              selected: true,
            },
            {
              label: 'Item 1.3.1.2',
              value: '1.3.1.2',
              selected: true,
            },
            {
              label: 'Item 1.3.1.3',
              value: '1.3.1.3',
              selected: true,
            },
          ],
        },
        {
          label: 'Item 1.3.2',
          value: '1.3.2',
          items: [
            {
              label: 'Item 1.3.2.1',
              value: '1.3.2.1',
              selected: true,
            },
            {
              label: 'Item 1.3.2.2',
              value: '1.3.2.2',
              selected: true,
            },
            {
              label: 'Item 1.3.2.3',
              value: '1.3.2.3',
              selected: true,
            },
          ],
        },
      ],
    },
  ],
}];

describe('tree/Tree', () => {

  describe('Basic Tests', () => {

    it('Label and DOM structure is correct', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      expect(el).to.equalSnapshot();
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Icon in DOM structure is correct', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);

      const firstElementIcon = el.children[0].shadowRoot.querySelector('[part="label-icon"]');
      expect(firstElementIcon.attributes.icon.value).to.equal('info');

      const secondElementIcon = el.children[1].shadowRoot.querySelector('[part="label-icon"]');
      expect(secondElementIcon.attributes.icon.value).to.equal('');

      const thirdElementIcon = el.children[2].shadowRoot.querySelector('[part="label-icon"]');
      expect(thirdElementIcon.attributes.icon.value).to.equal('https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg');

      const forthElementIcon = el.children[3].shadowRoot.querySelector('[part="label-icon"]');
      expect(forthElementIcon).to.equal(null);
    });

    it('Should set the correct icon value', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);

      const iconElement = el.children[0].shadowRoot.querySelector('[part="label-icon"]');

      el.composer.setItemPropertyValue(el.manager.visibleItems[0], 'icon', '');
      await elementUpdated(el);
      await nextFrame();
      expect(iconElement.attributes.icon.value).to.equal('');

      el.composer.setItemPropertyValue(el.manager.visibleItems[0], 'icon', 'https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg');
      await elementUpdated(el);
      await nextFrame();
      expect(iconElement.attributes.icon.value).to.equal('https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg');

      el.composer.setItemPropertyValue(el.manager.visibleItems[0], 'icon', 'buzz');
      await elementUpdated(el);
      await nextFrame();
      expect(iconElement.attributes.icon.value).to.equal('buzz');

      el.composer.setItemPropertyValue(el.manager.visibleItems[0], 'icon', undefined);
      await elementUpdated(el);
      await nextFrame();
      expect(el.children[0].shadowRoot.querySelector('[part="label-icon"]')).to.equal(null);
    });

    it('Supports a flat data structure', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);
    });

    it('Supports a nested data structure', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
    });

    it('Should set the correct value', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.value).to.equal('1.2');
      expect(el.values).to.deep.equal(['1.2']);
    });

    it('Should return parent values in no-relation mode', async () => {
      const el = await fixture('<ef-tree no-relation multiple></ef-tree>');
      el.data = nestedData;
      el.value = '1';
      await elementUpdated(el);
      expect(el.value).to.equal('1');
      expect(el.values).to.deep.equal(['1']);
    });

    it('Supports selecting a nested item on tap', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      const item = el.children[1];
      item.click();
      await elementUpdated(el);
      expect(el.value).to.equal('1.1');
    });

    it('Supports expanding and collapsing groups', async () => {
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
      isIE() && await nextFrame();
      expect(el.children).to.have.lengthOf(6, 'Expanding the group should show all 6 children again');
    });

    it('Fires expanded-changed events', async () => {
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

    it('Can expand/collapse all items', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.children).to.have.lengthOf(6, 'All 6 children should be rendered');
      el.collapseAll();
      await elementUpdated(el);
      expect(el.children).to.have.lengthOf(4, 'Collapsing all should hide 2 leaving 4 children');
      el.expandAll();
      await elementUpdated(el);
      isIE() && await nextFrame();
      expect(el.children).to.have.lengthOf(6, 'Expanding all should show all 6 children again');
    });

    it('Should not be able to check all items in single selection mode', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1.2']);
      el.uncheckAll();
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
      expect(() => el.checkAll()).to.throw('You cannot check all items in single selection mode');
    });

    it('Can navigate using the keyboard', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;
      el.collapseAll();
      await elementUpdated(el);
      el.dispatchEvent(keyArrowDown);
      el.dispatchEvent(keyArrowRight);
      el.dispatchEvent(keyArrowDown);
      el.dispatchEvent(keyEnter);
      await elementUpdated(el);
      expect(el.value = '1.1');
      el.dispatchEvent(keyArrowUp);
      el.dispatchEvent(keyArrowLeft);
      el.dispatchEvent(keyArrowDown);
      el.dispatchEvent(keyArrowDown);
      el.dispatchEvent(keyArrowDown);
      await elementUpdated(el);
      expect(el.value = '4');
    });

  });

  describe('Multiple Selection Mode', () => {

    it('Shows correct checked states', async () => {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = deepNestedData;
      await elementUpdated(el);
      el.expandAll();
      await elementUpdated(el);
      isIE() && await nextFrame();
      const item = el.children[3];
      const itemChild = el.children[4];
      expect(item.label).to.equal('Item 1.3');
      expect(item.checkedState).to.equal(1); // Checked
      item.click();
      await elementUpdated(el);
      isIE() && await nextFrame();
      expect(item.checkedState).to.equal(0); // Unchecked
      itemChild.click();
      await elementUpdated(el);
      isIE() && await nextFrame();
      expect(item.checkedState).to.equal(-1); // Indeterminate
    });

    it('Supports deselecting an item on tap', async () => {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);
      const item = el.children[3];
      expect(el.value).to.equal('4');
      item.click();
      await elementUpdated(el);
      expect(el.value).to.equal('');
    });

    it('Supports selecting/deselecting all items in groups', async () => {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      const item = el.firstElementChild;
      item.click();
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1.1', '1.2']);
      item.click();
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
    });

    it('Can check/uncheck all items', async () => {
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

    it('Uncheck all items correctly with deep nested data', async () => {
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

    it('check/uncheck all items correctly in no-relation with deep nested data', async () => {
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

    it('Can set values programmatically', async () => {
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

    it('Update the parent selected state correctly', async () => {
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

    it('Should set values to empty array when set invalid values', async () => {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      el.values = '1.1';
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
    });
  });

  describe('Filter Tests', () => {

    it('Text filter applied, query attribute - multi level', async () => {
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

    it('Text filter applied, query property - multi level', async () => {
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

    it('Text filter applied, expanded ancestors of matched items correctly - multi level', async () => {
      const el = await fixture('<ef-tree query="-2"></ef-tree');
      el.data = multiLevelData;
      await elementUpdated(el);
      expect(el.manager.isItemExpanded(el.manager.visibleItems[0])).to.equal(true, 'Level 1-1 is expanded because matched some descendant item');
      expect(el.manager.isItemExpanded(el.manager.visibleItems[1])).to.equal(true, 'Level 2-1 is expanded because matched some descendant item');
    });

    it('Text filter applied, collapsed children of matched items and included descendants correctly - multi level', async () => {
      const el = await fixture('<ef-tree query="-2"></ef-tree');
      el.data = multiLevelData;
      await elementUpdated(el);

      // Matched item must be collapsed when does not have any matched descendants
      expect(el.manager.isItemExpanded(el.manager.visibleItems[3])).to.equal(false, 'Level 2-2 is collapsed because does not matched any descendant item');
      expect(el.manager.isItemExpanded(el.manager.visibleItems[4])).to.equal(false, 'Level 1-2 is collapsed because does not matched any descendant item');

      // All descendants of matched items must be included
      const descendants = [
        ...el.manager.getItemDescendants(el.manager.parentItems[2]), // Level 2-2
        ...el.manager.getItemDescendants(el.manager.parentItems[3]) // Level 1-2
      ];
      descendants.forEach(item => expect(el.manager.isItemHidden(item)).to.equal(false, 'Descendants of matched items must be included'));
    });

    it('Text filter applied, expanded and the collapsed must be display correctly  - multi level', async () => {
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
      expect(el.manager.isItemExpanded(el.manager.visibleItems[0])).to.equal(true, 'Level 1-1 is expanded because matched child item');
      expect(el.manager.isItemExpanded(el.manager.visibleItems[1])).to.equal(true, 'Level 2-1 is expanded because matched child item');
      // Todo: Inform tester to update these tests to check if the result is correct. Look at comparing data object instead.
      // expect(el.manager.isItemVisible(el.manager.visibleItems[2])).to.equal(true, 'Level 3-2 is matched item and visible');
      expect(el.manager.isItemExpanded(el.manager.visibleItems[3])).to.equal(false, 'Level 2-2 is matched item and collapsed because not matched any descendant items');
      expect(el.manager.isItemExpanded(el.manager.visibleItems[4])).to.equal(false, 'Level 1-2 is matched item and collapsed because not matched any descendant items');


      // All descendants of matched items must be included
      const descendants = [
        ...el.manager.getItemDescendants(el.manager.parentItems[2]), // Level 2-2
        ...el.manager.getItemDescendants(el.manager.parentItems[3]) // Level 1-2
      ];
      descendants.forEach(item => expect(el.manager.isItemHidden(item)).to.equal(false, 'Descendants of matched items must be included'));
    });

    it('Should be able to select value after filter is applied', async () => {
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

    it('Text filter applied, check/uncheck item and switch between single and multiple selection mode', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = flatData;
      await elementUpdated(el);

      el.children[0].click();
      await elementUpdated(el);

      el.query = 'Item 4';
      await elementUpdated(el);

      el.multiple = true
      await elementUpdated(el);

      el.uncheckAll();
      await elementUpdated(el);
      expect(el.value).to.equal('1', 'hidden selected item in multiple mode shouldn\'t unchecked');

      el.multiple = false
      await elementUpdated(el);

      el.children[0].click();
      await elementUpdated(el);
      expect(el.value).to.equal('4', 'Value should be update when selecting a new item on filter applied.');

    });
  });
});


import { fixture, expect, elementUpdated, isIE, nextFrame, keyboardEvent, oneEvent } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/tree';
import '@refinitiv-ui/elemental-theme/light/ef-tree';

const keyArrowUp = keyboardEvent('keydown', { key: 'Up' });
const keyArrowDown = keyboardEvent('keydown', { key: 'Down' });
const keyArrowLeft = keyboardEvent('keydown', { key: 'Left' });
const keyArrowRight = keyboardEvent('keydown', { key: 'Right' });
const keyEnter = keyboardEvent('keydown', { key: 'Enter' });

const flatData = [{
  label: 'Item 1',
  value: '1'
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

describe('Tree', () => {

  describe('Basic Tests', () => {

    it('Label and DOM structure is correct', async () => {
      const el = await fixture('<ef-tree></ef-tree>');
      expect(el).to.equalSnapshot();
      expect(el).shadowDom.to.equalSnapshot();
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
      el.dispatchEvent(keyArrowDown);
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

    it('Deprecated APIs should still work', async () => {
      const el = await fixture('<ef-tree multiple></ef-tree>');
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1.2']);
      el.deselectAll();
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
      el.selectAll();
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1.1', '1.2', '4']);
    });

  });
});


// import element and theme
import '@formatjs/intl-getcanonicallocales/polyfill.iife';
// Translations polyfills
import '@formatjs/intl-locale/polyfill.iife';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/polyfill.iife';

import '@refinitiv-ui/elements/tree-select';

import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { aTimeout, elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import { flatData, flatSelection } from './mock_data/flat.js';

const data1 = [{ items: [{ selected: true, value: '1', label: '1' }] }];
const data2 = [
  {
    items: [
      { selected: true, value: '1', label: '1' },
      { selected: true, value: '2', label: '2' }
    ]
  }
];

describe('tree-select/Value', function () {
  describe('Value Test', function () {
    let el;

    beforeEach(async function () {
      el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
    });

    it('Value/values is empty by default', function () {
      expect(el.value).to.equal('', 'Value should be empty');
      expect(el.values).to.be.empty;
    });

    it('Value/values is accurate when data is set with selections', async function () {
      el.data = data2;
      await elementUpdated(el);
      expect(el.values).to.have.lengthOf(2);
      expect(el.value).to.equal(
        el.values[0],
        'Value should be equal to the first value in the values collection'
      );
    });

    it('Values stay in sync with data changes', async function () {
      expect(el.values).to.deep.equal([]);
      el.data = data1;
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1']);
      el.data = data2;
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1', '2']);
      el.data = [];
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
    });

    it('Values sequential selection', async function () {
      el.data = flatData;
      let expectedSelection = [];

      // Check selected items
      for (const item of flatSelection) {
        expectedSelection.push(item.value);
        el.treeManager.checkItem(item);
        await aTimeout(10); // Delay for sequential selection checking
      }
      el.save();

      expect(el.values.length).to.equal(expectedSelection.length, 'Saved and Expected are not equal');
      expect(expectedSelection).to.have.ordered.members(
        el.values,
        'Values sequential selection do not match'
      );
    });
  });
  describe('max', function () {
    it('has correct disabled state on confirm button when values changed', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb" max="1"></ef-tree-select>');
      el.data = data2;
      el.opened = true;
      await elementUpdated(el);
      const confirmButton = el.popupEl.querySelector('#done');
      expect(confirmButton.disabled).to.equal(true);
      el.values = [];
      await elementUpdated(el);
      expect(confirmButton.disabled).to.equal(false);
    });
    it('has correct disabled state on confirm button when max value changed', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb" max="1"></ef-tree-select>');
      el.data = data2;
      el.opened = true;
      await elementUpdated(el);
      const confirmButton = el.popupEl.querySelector('#done');
      expect(confirmButton.disabled).to.equal(true);
      el.max = '2';
      await elementUpdated(el);
      expect(confirmButton.disabled).to.equal(false);
    });
    it('Should reset max to null when define negative max value', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb" max="-1"></ef-tree-select>');
      await elementUpdated(el);
      expect(el.max).to.equal(null);
      el.max = '2';
      expect(el.max).to.equal('2');
    });
  });
});

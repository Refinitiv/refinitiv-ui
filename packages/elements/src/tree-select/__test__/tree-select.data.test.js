import { aTimeout, elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/tree-select';
import '@refinitiv-ui/elemental-theme/light/ef-tree-select';

import { flatData } from './mock_data/flat';
import { nestedData, selectableCount } from './mock_data/nested';
import { openedUpdated } from './utils';

describe('tree-select/Data', () => {
  describe('Data Test', () => {

    it('Takes data', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      await elementUpdated(el);
      expect(el.treeManager.visibleItems.length).to.equal(flatData.length);
    });

    it('Takes new data', async () => {
      const el = await fixture('<ef-tree-select opened lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      await elementUpdated(el);
      expect(el.treeManager.visibleItems.length).to.equal(flatData.length);
      el.data = nestedData;
      el.opened = true;
      await openedUpdated(el);
      el.expansionToggleClickHandler();
      await elementUpdated(el);
      expect(el.treeManager.visibleItems.length).to.equal(selectableCount + 2);
    });

    it('Ignores existing data applied twice', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      const dummyChangedData = JSON.parse(JSON.stringify(flatData));
      el.data = dummyChangedData;
      dummyChangedData.push({ label: 'Bob', value: 'bob' });
      await elementUpdated(el);
      el.data = dummyChangedData;
      expect(el.data).to.not.equal(flatData, 'Same data array is not re-applied');
    });

    it('Does not show nesting controls for flat data', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      expect(el.shadowRoot.querySelector('[part~=expand-toggle]') === null).to.equal(true, 'expand-toggle is not shown');
    });

    it('Does show nesting controls for nested data', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      await openedUpdated(el);
      el.opened = true;
      await openedUpdated(el);
      expect(el.shadowRoot.querySelector('[part~=expand-toggle]') !== null).to.equal(true, 'expand-toggle is shown');
    });

    it('Configures internal memoized meta data - flat', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      await aTimeout(200);
      expect(el.memo.expandable).to.equal(0);
      expect(el.memo.expanded).to.equal(0);
      expect(el.memo.selectable).to.equal(flatData.length);
      expect(el.memo.selected).to.equal(0);
    });

    it('Configures internal memoized meta data - nested', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = nestedData;
      await aTimeout(200);
      expect(el.memo.expandable).to.equal(2);
      expect(el.memo.expanded).to.equal(0);
      expect(el.memo.selectable).to.equal(selectableCount);
      expect(el.memo.selected).to.equal(0);
    });
  });
});

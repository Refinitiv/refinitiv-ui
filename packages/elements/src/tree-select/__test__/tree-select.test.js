// import element and theme
import '@refinitiv-ui/elements/tree-select';

import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import { flatData, flatSelection } from './mock_data/flat.js';
import { changeItemSelection, openedUpdated } from './utils.js';

describe('tree-select/TreeSelect', function () {
  describe('Defaults', function () {
    it('DOM structure is correct', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Does not render popup content initially', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      expect(el.popupEl).to.equal(null);
    });

    it('Renders popup when opened', async function () {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      expect(el.popupEl === null).to.equal(false, 'Popup is shown');
    });

    it('Displays pills appropriately', async function () {
      const el = await fixture('<ef-tree-select show-pills opened lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      changeItemSelection(el, flatSelection);
      await openedUpdated(el);
      await nextFrame();
      expect(el.shadowRoot.querySelector('[part=pills]') === null).to.equal(false, 'Pills is present');
    });
  });
});

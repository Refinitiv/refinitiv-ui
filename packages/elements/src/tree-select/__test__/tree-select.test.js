import { expect, fixture } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/tree-select';
import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { flatData, flatSelection } from './mock_data/flat';
import { changeItemSelection, openedUpdated } from './utils';

describe('TreeSelect', () => {
  describe('Defaults', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Does not render popup content initially', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      expect(el.querySelector('[part=list]')).to.equal(null);
    });

    xit('Renders popup when opened', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      expect(el.querySelector('[part=list]') === null).to.equal(false, 'Popup is shown');
    });

    it('Displays pills appropriately', async () => {
      const el = await fixture('<ef-tree-select show-pills opened></ef-tree-select>');
      el.data = flatData;
      changeItemSelection(el, flatSelection);
      await openedUpdated(el);
      expect(el.shadowRoot.querySelector('[part=pills]') === null).to.equal(false, 'Pills is present');
    });

  });
});

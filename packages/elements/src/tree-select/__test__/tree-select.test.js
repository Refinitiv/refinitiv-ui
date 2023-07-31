// import element and theme
import '@formatjs/intl-getcanonicallocales/polyfill.iife';
// Translations polyfills
import '@formatjs/intl-locale/polyfill.iife';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/polyfill.iife';

import '@refinitiv-ui/elements/tree-select';

import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { expect, fixture } from '@refinitiv-ui/test-helpers';

import { flatData, flatSelection } from './mock_data/flat';
import { changeItemSelection, openedUpdated } from './utils';

describe('tree-select/TreeSelect', function() {
  describe('Defaults', function() {
    it('DOM structure is correct', async function() {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Does not render popup content initially', async function() {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      expect(el.querySelector('[part=list]')).to.equal(null);
    });

    xit('Renders popup when opened', async function() {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      el.opened = true;
      await openedUpdated(el);
      expect(el.querySelector('[part=list]') === null).to.equal(false, 'Popup is shown');
    });

    it('Displays pills appropriately', async function() {
      const el = await fixture('<ef-tree-select show-pills opened lang="en-gb"></ef-tree-select>');
      el.data = flatData;
      changeItemSelection(el, flatSelection);
      await openedUpdated(el);
      expect(el.shadowRoot.querySelector('[part=pills]') === null).to.equal(false, 'Pills is present');
    });
  });
});

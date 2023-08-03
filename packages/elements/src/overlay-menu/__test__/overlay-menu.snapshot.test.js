// import element and theme
import '@refinitiv-ui/elements/overlay-menu';

import '@refinitiv-ui/elemental-theme/light/ef-overlay-menu';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import { flatData } from './data.js';
import { flatMarkupOpened } from './markup.js';
import { openedUpdated } from './utils.js';

describe('overlay-menu/Snapshot', function () {
  describe('Snapshot Test', function () {
    it('DOM structure with flatData is correct', async function () {
      const el = await fixture('<ef-overlay-menu opened></ef-overlay-menu>');
      el.data = flatData;
      await elementUpdated();
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with flatMarkup is correct', async function () {
      const el = await fixture(flatMarkupOpened);
      await openedUpdated(el);
      expect(el).lightDom.to.equalSnapshot();
    });
  });
});

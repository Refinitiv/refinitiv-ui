import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elemental-theme/light/ef-overlay-menu';
import { flatData } from './data';
import { flatMarkupOpened } from './markup';
import { openedUpdated } from './utils';

describe('overlay-menu/Snapshot', () => {
  describe('Snapshot Test', () => {
    it('DOM structure with flatData is correct', async () => {
      const el = await fixture('<ef-overlay-menu opened></ef-overlay-menu>');
      el.data = flatData;
      await elementUpdated();
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with flatMarkup is correct', async () => {
      const el = await fixture(flatMarkupOpened);
      await openedUpdated(el);
      await expect(el).lightDom.to.equalSnapshot();
    });
  });
});

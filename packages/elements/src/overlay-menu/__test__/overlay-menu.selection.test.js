import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elemental-theme/light/ef-overlay-menu';
import { flatMarkup, nestedMarkup } from './markup';

describe('OverlayMenu', () => {
  describe('Selection Test', () => {

    it('Selects flat markup', async () => {
      const el = await fixture(flatMarkup);
      const itemtoSelect = el.querySelector('ef-item[value=two]');
      itemtoSelect.selected = true;
      await elementUpdated(el);
      expect(itemtoSelect.selected).to.be.true;
      expect(el.values[0]).to.equal(itemtoSelect.value);
    });

    it('Selects nested markup', async () => {
      const el = await fixture(nestedMarkup);
      const selected = [
        el.querySelector('ef-item[value=two]'),
        el.querySelector('ef-item[value=sm-two]'),
        el.querySelector('ef-item[value=ssm-two]')
      ];
      selected.forEach((item) => {
        item.selected = true;
      });
      const menu = el.querySelector('ef-overlay-menu');
      await elementUpdated(menu);
      expect(String(menu.values)).to.equal(String(['two', 'sm-two', 'ssm-two']));
    });

  });
});

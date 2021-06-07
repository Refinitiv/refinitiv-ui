import { expect, fixture, elementUpdated } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elemental-theme/light/ef-overlay-menu';
import { flatData, nestedData } from './data';
import { openedUpdated } from './utils';
import { flatMarkupOpened, nestedMarkup } from './markup';

describe('OverlayMenu', () => {
  describe('Attributes Test', () => {

    it('Uses compact', async () => {
      const el = await fixture('<ef-overlay-menu compact></ef-overlay-menu>');
      el.data = flatData;
      expect(el.compact).to.be.true;
    });

    it('Opens with opened attr', async () => {
      const el = await fixture('<ef-overlay-menu opened></ef-overlay-menu>');
      setTimeout(() => {
        el.data = flatData;
      });
      await openedUpdated(el);
      expect(el.opened, 'Opened prop is true').to.be.true;
      expect(window.getComputedStyle(el).display !== 'none').to.be.true;
    });

    it('Opens with opened attr - markup', async () => {
      const el = await fixture(flatMarkupOpened);
      await openedUpdated(el);
      expect(window.getComputedStyle(el).display !== 'none').to.be.true;
    });

    it('Opens with opened and compact attr', async () => {
      const el = await fixture('<ef-overlay-menu compact opened></ef-overlay-menu>');
      el.data = flatData;
      await openedUpdated(el);
      expect(window.getComputedStyle(el).display !== 'none').to.be.true;
    });

    it('Opens and then closes with opened and compact attr', async () => {
      const el = await fixture('<ef-overlay-menu compact opened></ef-overlay-menu>');
      el.data = flatData;
      await openedUpdated(el);
      expect(window.getComputedStyle(el).display !== 'none').to.be.true;
      el.opened = false;
      await openedUpdated(el);
      expect(window.getComputedStyle(el).display === 'none').to.be.true;
      el.opened = true;
      await openedUpdated(el);
      expect(window.getComputedStyle(el).display !== 'none').to.be.true;
    });

    it('Can set/get values when slotted', async () => {
      const el = await fixture(nestedMarkup);
      const menu = el.querySelector('ef-overlay-menu');

      const values = ['one', 'sm-one', 'ssm-one'];
      menu.values = values;
      await elementUpdated(menu);

      const selected = [...document.querySelectorAll('ef-item[selected]')].map(({ value }) => value);
      expect(String(menu.values)).to.equal(String(values), 'Values setter/getter is wrong');
      expect(String(menu.values)).to.equal(String(selected), 'Items are not selected');

      menu.values = [];
      await elementUpdated(menu);
      expect(menu.values.length).to.equal(0, 'Values are not reset');
      expect(document.querySelectorAll('ef-item[selected]').length).to.equal(0, 'Selection is not reset');
    });

    it('Can set/get values when from data', async () => {
      const el = await fixture('<ef-overlay-menu compact opened></ef-overlay-menu>');
      el.data = nestedData;
      const values = ['one', 'sm-one', 'ssm-one'];
      el.values = values;
      await elementUpdated(el);
      expect(String(el.values)).to.equal(String(values), 'Values setter/getter is wrong');
      el.values = [];
      await elementUpdated(el);
      expect(el.values.length).to.equal(0, 'Values are not reset');
    });

    it('Can set/get value when from data', async () => {
      const el = await fixture('<ef-overlay-menu compact opened></ef-overlay-menu>');
      el.data = nestedData;
      const value = 'ssm-two';
      el.value = value;
      await elementUpdated(el);
      expect(el.value).to.equal(value, 'Value should select ssm-two');
      el.value = '';
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Values should reset');
    });

    it('Get value from values', async () => {
      const el = await fixture('<ef-overlay-menu compact opened></ef-overlay-menu>');
      el.data = nestedData;
      const values = ['one', 'sm-one', 'ssm-one'];
      el.values = values;
      await elementUpdated(el);
      expect(el.value).to.equal(values[0], 'Value should select the first item of values');
    });
  });
});

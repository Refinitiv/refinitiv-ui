import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elemental-theme/light/ef-overlay-menu';
import { flatData, nestedData, numberData } from './data';

describe('OverlayMenu', () => {
  describe('Data Test', () => {

    it('Loads data', async () => {
      const el = await fixture('<ef-overlay-menu opened></ef-overlay-menu>');
      el.data = flatData;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('ef-item').length).to.equal(flatData.length);
    });

    it('Igonres same data', async () => {
      const el = await fixture('<ef-overlay-menu opened></ef-overlay-menu>');
      el.data = flatData;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('ef-item').length).to.equal(flatData.length);
      el.data = flatData;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('ef-item').length).to.equal(flatData.length);
    });

    it('Loads new data', async () => {
      const el = await fixture('<ef-overlay-menu opened></ef-overlay-menu>');
      el.data = flatData;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('ef-item').length).to.equal(flatData.length);
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('ef-item').length).to.equal(nestedData.length);
    });

    it('Wipes data', async () => {
      const el = await fixture('<ef-overlay-menu opened></ef-overlay-menu>');
      el.data = flatData;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('ef-item').length).to.equal(flatData.length);
      el.data = null;
      await elementUpdated(el);
      expect(el.renderRoot.querySelectorAll('ef-item').length).to.equal(0);
    });

    it('Selects zero number value', async () => { // jira ELF-1313
      const el = await fixture('<ef-overlay-menu opened></ef-overlay-menu>');
      el.data = numberData;
      const values = [0,2];
      el.values = values;
      await elementUpdated(el);
      expect(String(el.values)).to.equal(String(values), 'Values with zero number value should be selected');
    });
  });
});

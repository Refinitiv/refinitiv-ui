import { fixture, expect, elementUpdated, isIE } from '@refinitiv-ui/test-helpers';
import { getData, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/elements/combo-box';
import '@refinitiv-ui/elemental-theme/light/ef-combo-box';

describe('ComboBox', () => {
  describe('Template Parts', () => {
    it('Empty DOM has all required parts', async () => {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Placeholder is rendered', async () => {
      const el = await fixture('<ef-combo-box placeholder="Placeholder" lang="en"></ef-combo-box>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      expect(el.placeholder).to.equal('Placeholder', 'Placeholder is not reflected to attribute');
      el.setAttribute('placeholder', 'New Placeholder');
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.placeholder = null;
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Lazy Render: data', async () => {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      el.data = getData();
      el.opened = true;
      await openedUpdated(el);
      expect(el.hasAttribute('opened')).to.equal(true, 'opened attribute is not reflected');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.opened = false;
      await elementUpdated(el);
      expect(el.hasAttribute('opened')).to.equal(false, 'opened attribute is not reflected');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Data is reflected to render', async () => {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = getData().reverse();
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = [];
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('--list-max-width recalculates popup width', async function () {
      if (isIE()) { /* CSS Variables do not work in IE11 without a polyfill. Skip */
        this.skip();
      }

      const el = await fixture('<ef-combo-box style="--list-max-width: 50px;" opened></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);
      const styles = window.getComputedStyle(el.shadowRoot.querySelector('ef-overlay'));
      expect(styles.maxWidth).to.equal('50px', 'CSS Variable is not passed');
      expect(styles.minWidth).to.equal('0px', 'min width is not reset');
    });
  });
});

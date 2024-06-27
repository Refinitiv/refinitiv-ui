import '@refinitiv-ui/elements/combo-box';

import '@refinitiv-ui/elemental-theme/light/ef-combo-box';
import { elementUpdated, expect, fixture, isIE, nextFrame } from '@refinitiv-ui/test-helpers';

import { getData, openedUpdated, snapshotIgnore } from './utils.js';

describe('combo-box/Template', function () {
  describe('Template Parts', function () {
    it('Empty DOM has all required parts', async function () {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure with clears is correct', async function () {
      const el = await fixture('<ef-combo-box clears></ef-combo-box>');
      el.data = getData([1]);
      await openedUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it("Shouldn't have clears button when set readonly", async function () {
      const el = await fixture('<ef-combo-box readonly clears value="AF" lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      expect(el.clearsButton).to.equal(undefined, "Clear button shouldn't display");
    });
    it("Shouldn't have clears button when set disabled", async function () {
      const el = await fixture('<ef-combo-box disabled clears value="AF" lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      expect(el.clearsButton).to.equal(undefined, "Clear button shouldn't display");
    });
    it("Shouldn't have clears button when no value", async function () {
      const el = await fixture('<ef-combo-box clears lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      expect(el.clearsButton).to.equal(undefined, "Clear button shouldn't display");
    });

    it('Placeholder is rendered', async function () {
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

    it('Lazy Render: data', async function () {
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

    it('Data is reflected to render', async function () {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = getData().reverse();
      await elementUpdated(el);
      await nextFrame(); // Safari required extra frame
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = [];
      await elementUpdated(el);
      await nextFrame(); // Safari required extra frame
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('--list-max-width recalculates popup width', async function () {
      if (isIE()) {
        /* CSS Variables do not work in IE11 without a polyfill. Skip */
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
  describe('readonly and disabled attributes test', function () {
    it('Input should be disabled when disabled attribute is set', async function () {
      const el = await fixture('<ef-combo-box disabled></ef-combo-box>');
      const input = el.shadowRoot.querySelector('[part=input]');

      await elementUpdated(el);

      expect(input.disabled).to.be.equal(true);
    });

    it('Input should be readonly when readonly attribute is set', async function () {
      const el = await fixture('<ef-combo-box readonly></ef-combo-box>');
      const input = el.shadowRoot.querySelector('[part=input]');

      await elementUpdated(el);

      expect(input.readOnly).to.be.equal(true);
    });
  });
});

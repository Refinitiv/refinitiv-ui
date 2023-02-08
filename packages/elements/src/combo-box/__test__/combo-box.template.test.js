import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';
import { getData, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/elements/combo-box';
import '@refinitiv-ui/elemental-theme/light/ef-combo-box';

describe('combo-box/Template', () => {
  describe('Template Parts', () => {
    it('Empty DOM has all required parts', async () => {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Placeholder is rendered', async () => {
      const el = await fixture('<ef-combo-box placeholder="Placeholder" lang="en"></ef-combo-box>');
      expect(el.placeholder).to.equal('Placeholder', 'Incorrect placeholder value');

      el.placeholder = 'New Placeholder';
      await elementUpdated(el);
      expect(el.placeholder).equal('New Placeholder', 'Incorrect placeholder value');
      expect(el.getAttribute('placeholder')).equal('Placeholder', 'Placeholder value must not reflect to attribute');

      el.placeholder = null;
      await elementUpdated(el);
      expect(el.getAttribute('placeholder')).equal('Placeholder', 'Placeholder value must not reflect to attribute');
    });

    it('Lazy Render: data', async () => {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      el.data = getData();
      el.opened = true;
      await openedUpdated(el);
      expect(el.hasAttribute('opened')).to.equal(true, 'opened attribute is not reflected');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.opened = false;
      await elementUpdated(el);
      expect(el.hasAttribute('opened')).to.equal(false, 'opened attribute is not reflected');
    });

    it('Data is reflected to render', async () => {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Data is reflected to render: reverse', async () => {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData().reverse();
      await openedUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Data is reflected to render: empty', async () => {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);
      expect(el.data.length).greaterThan(0);

      el.data = [];
      await openedUpdated(el);
      await nextFrame(); // Safari required extra frame
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('--list-max-width recalculates popup width', async function () {
      const el = await fixture('<ef-combo-box style="--list-max-width: 50px;" opened></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);
      const styles = window.getComputedStyle(el.shadowRoot.querySelector('ef-overlay'));
      expect(styles.maxWidth).to.equal('50px', 'CSS Variable is not passed');
      expect(styles.minWidth).to.equal('0px', 'min width is not reset');
    });
  });
  describe('readonly and disabled attributes test', () => {
    it('Input should be disabled when disabled attribute is set', async () => {
      const el = await fixture('<ef-combo-box disabled></ef-combo-box>');
      const input = el.shadowRoot.querySelector('[part=input]');

      await elementUpdated(el);

      expect(input.disabled).to.be.equal(true)
    });

    it('Input should be readonly when readonly attribute is set', async () => {
        const el = await fixture('<ef-combo-box readonly></ef-combo-box>');
        const input = el.shadowRoot.querySelector('[part=input]');

        await elementUpdated(el);

        expect(input.readOnly).to.be.equal(true)
    });
  })
});

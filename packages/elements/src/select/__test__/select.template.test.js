import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';
import { getData, getMenuEl, getOptions, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/elements/select';
import '@refinitiv-ui/elemental-theme/light/ef-select';

describe('select/Template', () => {
  describe('Template Parts', () => {
    it('Empty DOM has all required parts', async () => {
      const el = await fixture('<ef-select></ef-select>');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Placeholder is rendered', async () => {
      const el = await fixture('<ef-select placeholder="Placeholder"></ef-select>');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);

      el.setAttribute('placeholder', 'New Placeholder');
      await elementUpdated(el);
      expect(el.placeholder).to.equal('New Placeholder', 'Placeholder is not updated');

      el.placeholder = null;
      await elementUpdated(el);
      expect(el.placeholder).to.equal(null, 'Placeholder is not be null');
      expect(el.getAttribute('placeholder')).to.equal('New Placeholder', 'Placeholder must not reflected to attribute');
    });

    it('Lazy Render: options', async () => {
      const el = await fixture(`<ef-select>${getOptions()}</ef-select>`);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Lazy Render: options opened', async () => {
      const el = await fixture(`<ef-select>${getOptions()}</ef-select>`);
      el.opened = true;
      await openedUpdated(el);
      expect(el.hasAttribute('opened')).to.equal(true, 'opened attribute is not reflected');
      expect(getMenuEl(el).hasAttribute('opened')).to.equal(true, 'opened attribute is not reflected on popup');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);

      el.opened = false;
      await elementUpdated(el);
      expect(el.hasAttribute('opened')).to.equal(false, 'opened attribute is not reflected');
      expect(getMenuEl(el).hasAttribute('opened')).to.equal(false, 'opened attribute is not reflected on popup');
    });

    it('Lazy Render: data', async () => {
      const el = await fixture('<ef-select></ef-select>');
      el.data = getData();
      await elementUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Lazy Render: data opened', async () => {
      const el = await fixture('<ef-select></ef-select>');
      el.data = getData();
      await elementUpdated(el);

      el.opened = true;
      await openedUpdated(el);
      expect(el.hasAttribute('opened')).to.equal(true, 'opened attribute is not reflected');
      expect(getMenuEl(el).hasAttribute('opened')).to.equal(true, 'opened attribute is not reflected on popup');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);

      el.opened = false;
      await elementUpdated(el);
      expect(el.hasAttribute('opened')).to.equal(false, 'opened attribute is not reflected');
      expect(getMenuEl(el).hasAttribute('opened')).to.equal(false, 'opened attribute is not reflected on popup');
    });

    it('Data is reflected to render', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await openedUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Data is reflected to reverse render', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData().reverse();
      await elementUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Data is reflected to render null data', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await elementUpdated(el);
      expect(el.data).not.to.be.null;

      el.data = null;
      await elementUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);

    });

    it('--list-max-width recalculates popup width', async function () {
      const el = await fixture(`<ef-select style="--list-max-width: 50px;" opened>${getOptions()}</ef-select>`);
      await openedUpdated(el);
      const styles = window.getComputedStyle(getMenuEl(el));
      expect(styles.maxWidth).to.equal('50px', 'CSS Variable is not passed');
      expect(styles.minWidth).to.equal('0px', 'min width is not reset');
    });
  });
});

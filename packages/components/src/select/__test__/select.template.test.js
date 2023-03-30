import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';
import { getMenuEl, getOptions, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/components/select';

describe('select/Template', () => {
  describe('Template Parts', () => {
    it('Empty DOM has all required parts', async () => {
      const el = await fixture('<ui-select></ui-select>');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Lazy Render: options', async () => {
      const el = await fixture(`<ui-select>${getOptions()}</ui-select>`);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Lazy Render: options opened', async () => {
      const el = await fixture(`<ui-select>${getOptions()}</ui-select>`);
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

    it('--list-max-width recalculates popup width', async function () {
      const el = await fixture(`<ui-select style="--ui-select-list-max-width: 50px;" opened>${getOptions()}</ui-select>`);
      await openedUpdated(el);
      const styles = window.getComputedStyle(getMenuEl(el));
      expect(styles.maxWidth).to.equal('50px', 'CSS Variable is not passed');
      expect(styles.minWidth).to.equal('0px', 'min width is not reset');
    });
  });
});

import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';
import { getOptions, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/components/select';

describe('select/Value', () => {
  describe('Selection by Value Attribute', () => {
    it('Options Selected: Afghanistan', async () => {
      const el = await fixture(`<ui-select opened>${getOptions()}</ui-select>`);
      el.value = 'AF';
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value getter does not get correct value');
      expect(el.querySelector('ui-option[selected]').value).to.equal('AF', 'Item is not selected from value');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);

      el.value = 'UNKNOWN';
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Unknown value should reset');
      expect(el.querySelector('ui-option[selected]')).to.equal(null, 'Selected item is not reset');

      el.value = 'AL';
      await elementUpdated(el);
      expect(el.value).to.equal('AL', 'Value is not reflected from selected attribute');
      expect(el.querySelector('ui-option[selected]').value).to.equal('AL', 'Item is not selected from value');

      el.value = 'AL';
      await elementUpdated(el);
      expect(el.value).to.equal('AL', 'Same value should do nothing');
      el.value = '';
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Value is not reflected from selected attribute');
      expect(el.querySelector('ui-option[selected]')).to.equal(null, 'Selected item is not reset');
    });
  });
});

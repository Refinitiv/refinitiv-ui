import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';
import { data, getOptions, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/components/select';

describe('select/Selection', () => {
  describe('Selection by Selected Property', () => {
    it('Options Selected: Afghanistan', async () => {
      const el = await fixture(`<ui-select opened>${getOptions([1])}</ui-select>`);
      await openedUpdated(el);
      expect(el.value).to.equal(data[1].value, 'Value is not reflected from selected');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.querySelector('ui-option[value=AX]').selected = false;
      el.querySelector('ui-option[value=AL]').selected = true;
      await elementUpdated(el);
      expect(el.value).to.equal('AL', 'Value is not reflected from selected');

      el.querySelector('ui-option[value=AL]').selected = false;
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Value is not reset to empty string');
    });
  });
});

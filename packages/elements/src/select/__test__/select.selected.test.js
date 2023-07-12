import '@refinitiv-ui/elements/select';

import '@refinitiv-ui/elemental-theme/light/ef-select';
import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import { getData, getOptions, openedUpdated, snapshotIgnore } from './utils';

describe('select/Selection', () => {
  describe('Selection by Selected Property', () => {
    it('Options Selected: Afghanistan', async () => {
      const el = await fixture(`<ef-select opened placeholder="Placeholder">${getOptions([1])}</ef-select>`);
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value is not reflected from selected');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.querySelector('ef-item[value=AF]').selected = false;
      el.querySelector('ef-item[value=AL]').selected = true;
      await elementUpdated(el);
      expect(el.value).to.equal('AL', 'Value is not reflected from selected');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.querySelector('ef-item[value=AL]').selected = false;
      await elementUpdated(el);
      await nextFrame(); // IE11 needs it for unknown reason
      expect(el.value).to.equal('', 'Value is not reset to empty string');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Data Selected: Afghanistan', async () => {
      const el = await fixture('<ef-select opened placeholder="Placeholder"></ef-select>');
      el.data = getData([1]);
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value is not reflected from selected');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = getData([4]);
      await elementUpdated(el);
      expect(el.value).to.equal('AL', 'Value is not reflected from selected');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = getData();
      expect(el.value).to.equal('', 'Value is not reset to empty string');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });
});

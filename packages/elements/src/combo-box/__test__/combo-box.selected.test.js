import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';
import { getData, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/elements/combo-box';
import '@refinitiv-ui/elemental-theme/light/ef-combo-box';

describe('combo-box/Selected', () => {
  describe('Selection By Selected Property', () => {
    it('Data Selected: Afghanistan', async () => {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData([1]);
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value is not reflected from selected');
      expect(el.inputElement.value).to.equal('Afghanistan', 'Input is not reflected for AF');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = getData([3]);
      await elementUpdated(el);
      await nextFrame(); // Safari required extra frame
      expect(el.value).to.equal('AL', 'Value is not reflected from selected');
      expect(el.inputElement.value).to.equal('Albania', 'Input is not reflected for AL');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = getData();
      await elementUpdated(el);
      await nextFrame(); // Safari required extra frame
      expect(el.value).to.equal('', 'Value is not reset to empty string');
      expect(el.inputElement.value).to.equal('', 'Input is not reflected for ""');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('Multiple. Data Selected: Afghanistan, Albania', async () => {
      const el = await fixture('<ef-combo-box multiple opened lang="en"></ef-combo-box>');
      el.data = getData([1, 3]);
      await openedUpdated(el);
      expect(String(el.values)).to.equal('AF,AL', 'Values are not reflected from selected');
      expect(el.inputElement.value).to.equal('Afghanistan;  Albania', 'Input is not reflected for AF, AL');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = getData([2]);
      await elementUpdated(el);
      await nextFrame(); // Safari required extra frame
      expect(String(el.values)).to.equal('AX', 'Values are not reflected from selected');
      expect(el.inputElement.value).to.equal('Aland Islands', 'Input is not reflected for AX');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.data = getData();
      await elementUpdated(el);
      await nextFrame(); // Safari required extra frame
      expect(String(el.values)).to.equal('', 'Values are not reset to empty string');
      expect(el.inputElement.value).to.equal('', 'Input is not reflected for ""');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });
});

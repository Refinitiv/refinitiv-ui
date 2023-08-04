import '@refinitiv-ui/elements/combo-box';

import '@refinitiv-ui/elemental-theme/light/ef-combo-box';
import { aTimeout, elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import { getData, snapshotIgnore } from './utils.js';

describe('combo-box/AsyncFilter', function () {
  describe('Setting Data Asynchronously', function () {
    it('Should be possible to set data asynchronously', async function () {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      await elementUpdated(el);
      expect(el.data.length).equal(0);
      const dataPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(getData());
        }, 100);
      });
      el.data = dataPromise;
      await aTimeout(200);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });
});

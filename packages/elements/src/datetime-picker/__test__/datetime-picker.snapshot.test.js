// import element and theme
import '@refinitiv-ui/elements/datetime-picker';

import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';
import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import { snapshotIgnore } from './utils.js';

describe('datetime-picker/DOMStructure', function () {
  describe('DOM Structure', function () {
    it('DOM structure is correct', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04"></ef-datetime-picker>');
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when opened', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" opened></ef-datetime-picker>'
      );
      await nextFrame();
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when range', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" range opened></ef-datetime-picker>'
      );
      await nextFrame();
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when duplex', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" duplex opened></ef-datetime-picker>'
      );
      await nextFrame();
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when timepicker', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" timepicker opened></ef-datetime-picker>'
      );
      await nextFrame();
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when timepicker and with-seconds', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" timepicker with-seconds opened></ef-datetime-picker>'
      );
      await nextFrame();
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when range timepicker', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" timepicker range opened></ef-datetime-picker>'
      );
      await nextFrame();
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when add custom cell slot of calendar without prefix', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04">' +
          '<div slot="2020-04-01">slotted</div>' +
          '</ef-datetime-picker>'
      );
      el.opened = true;

      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when add custom cell slot of calendar with prefix', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" duplex>' +
          '<div slot="from-2020-04-01">slotted</div>' +
          '<div slot="to-2020-05-01">slotted</div>' +
          '</ef-datetime-picker>'
      );
      el.opened = true;

      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when add custom cell slot of calendar while opened', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" duplex opened>' +
          '<div slot="from-2020-04-01">slotted</div>' +
          '<div slot="to-2020-05-01">slotted</div>' +
          '</ef-datetime-picker>'
      );
      el.updateCalendarSlot();

      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });
});

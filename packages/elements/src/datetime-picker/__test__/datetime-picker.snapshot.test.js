// import element and theme
import '@refinitiv-ui/elements/datetime-picker';

import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';
import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import { snapshotIgnore } from './utils.js';

const slotFrom = document.createElement('div');
const slotTo = document.createElement('div');
slotFrom.setAttribute('slot', 'from-2020-04-01');
slotTo.setAttribute('slot', 'to-2020-05-01');

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
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when range', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" range opened></ef-datetime-picker>'
      );
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when duplex', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" duplex opened></ef-datetime-picker>'
      );
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when timepicker', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" timepicker opened></ef-datetime-picker>'
      );
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when timepicker and with-seconds', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" timepicker with-seconds opened></ef-datetime-picker>'
      );
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when range timepicker', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" timepicker range opened></ef-datetime-picker>'
      );
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when add custom cell slot of calendar without prefix', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04">' +
          '<div slot="2020-04-01"></div>' +
          '</ef-datetime-picker>'
      );
      el.opened = true;

      await elementUpdated(el);
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when add custom cell slot of calendar with prefix', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" duplex></ef-datetime-picker>'
      );
      el.appendChild(slotFrom);
      el.appendChild(slotTo);
      el.opened = true;

      await elementUpdated(el);
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when add custom cell slot of calendar while overlay is opened', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" duplex opened></ef-datetime-picker>'
      );
      el.appendChild(slotFrom);
      el.appendChild(slotTo);
      el.updateCalendarSlot();

      await elementUpdated(el);
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure should not contain added custom cell slot when overlay is closed', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" view="2020-04" duplex opened></ef-datetime-picker>'
      );
      el.appendChild(slotFrom);
      el.appendChild(slotTo);
      el.opened = false;

      await elementUpdated(el);
      await nextFrame(2);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure with clears is correct', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" value="2024-05-31" clears></ef-datetime-picker>'
      );
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it("Shouldn't have clears button when set readonly", async function () {
      const el = await fixture(
        '<ef-datetime-picker readonly clears value="2020-04-21" lang="en-gb"></ef-datetime-picker>'
      );
      expect(el.clearsButton).to.equal(undefined, "Clear button shouldn't display");
    });
    it("Shouldn't have clears button when set disabled", async function () {
      const el = await fixture(
        '<ef-datetime-picker disabled clears value="2020-04-21" lang="en-gb"></ef-datetime-picker>'
      );
      expect(el.clearsButton).to.equal(undefined, "Clear button shouldn't display");
    });
    it("Shouldn't have clears button when no value", async function () {
      const el = await fixture('<ef-datetime-picker clears lang="en-gb"></ef-datetime-picker>');
      expect(el.clearsButton).to.equal(undefined, "Clear button shouldn't display");
    });
  });
});

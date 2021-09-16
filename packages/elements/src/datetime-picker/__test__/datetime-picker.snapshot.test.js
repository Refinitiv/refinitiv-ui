import { fixture, expect, nextFrame } from '@refinitiv-ui/test-helpers';
import { snapshotIgnore } from './utils';

// import element and theme
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';

describe('datetime-picker/DOMStructure', () => {
  describe('DOM Structure', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-datetime-picker view="2020-04"></ef-datetime-picker>');
      await nextFrame();
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when opened', async () => {
      const el = await fixture('<ef-datetime-picker view="2020-04" opened></ef-datetime-picker>');
      await nextFrame();
      await nextFrame(); /* second frame required for IE11 as popup opened might not fit into one frame */
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when range', async () => {
      const el = await fixture('<ef-datetime-picker view="2020-04" range opened></ef-datetime-picker>');
      await nextFrame();
      await nextFrame();
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when duplex', async () => {
      const el = await fixture('<ef-datetime-picker view="2020-04" duplex opened></ef-datetime-picker>');
      await nextFrame();
      await nextFrame();
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when timepicker', async () => {
      const el = await fixture('<ef-datetime-picker view="2020-04" timepicker opened></ef-datetime-picker>');
      await nextFrame();
      await nextFrame();
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when timepicker and with-seconds', async () => {
      const el = await fixture('<ef-datetime-picker view="2020-04" timepicker with-seconds opened></ef-datetime-picker>');
      await nextFrame();
      await nextFrame();
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when range timepicker', async () => {
      const el = await fixture('<ef-datetime-picker view="2020-04" timepicker range opened></ef-datetime-picker>');
      await nextFrame();
      await nextFrame();
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });
});

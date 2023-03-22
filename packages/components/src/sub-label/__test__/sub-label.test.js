import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';
import '@refinitiv-ui/components/sub-label';

describe('ui-sub-label', () => {

  describe('DOM Structure', () => {
      it('default DOM is correct', async () => {
        const el = await fixture(`<ui-sub-label>Label</ui-sub-label`);
        await expect(el).to.equalSnapshot();
      });
      it('error DOM is correct', async () => {
        const el = await fixture(`<ui-sub-label error>Label</ui-sub-label`);
        await expect(el).to.equalSnapshot();
      });
      it('warning DOM is correct', async () => {
        const el = await fixture(`<ui-sub-label warning>Label</ui-sub-label`);
        await expect(el).to.equalSnapshot();
      });
  });

  describe('Attributes', () => {
    describe('error', () => {
      it('error attribute should not be presented by default', async () => {
        const el = await fixture(`<ui-sub-label>Label</ui-sub-label`);
        await expect(el.hasAttribute('error')).to.be.false;
      });
      it('error attribute should be reflected with property', async () => {
        const el = await fixture(`<ui-sub-label error>Label</ui-sub-label`);
        await expect(el.error).to.be.true;
      });
      it('error attribute should be reflected when property value has change', async () => {
        const el = await fixture(`<ui-sub-label error>Label</ui-sub-label`);
        el.error = false;

        await elementUpdated(el);
        await expect(el.hasAttribute('error')).to.be.false;
      });
    });
    describe('warning', () => {
      it('warning attribute should not be presented by default', async () => {
        const el = await fixture(`<ui-sub-label>Label</ui-sub-label`);
        await expect(el.hasAttribute('warning')).to.be.false;
      });
      it('warning attribute should be reflected with property', async () => {
        const el = await fixture(`<ui-sub-label warning>Label</ui-sub-label`);
        await expect(el.warning).to.be.true;
      });
      it('warning attribute should be reflected when property value has change', async () => {
        const el = await fixture(`<ui-sub-label warning>Label</ui-sub-label`);
        el.warning = false;

        await elementUpdated(el);
        await expect(el.hasAttribute('warning')).to.be.false;
      });
    });
  });
});


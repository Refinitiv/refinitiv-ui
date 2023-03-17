import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';
import '@refinitiv-ui/components/sub-label';

describe('DOM Structure', () => {
  it('Should have correct DOM structure', async () => {
    const el = await fixture(`<ds-sub-label>Label</ds-sub-label`)
    await expect(el).shadowDom.to.equalSnapshot();
  });
});
describe('Attribute', () => {
  describe('Should error attribute reflect with property', () => {
    it('When add error property to label', async () => {
      const el = await fixture(`<ds-sub-label>Label</ds-sub-label`)
      el.error = true;

      await elementUpdated(el);
      await expect(el.hasAttribute('error')).to.be.true;
    });
    it('When remove error property from label', async() => {
      const el = await fixture(`<ds-sub-label error>Label</ds-sub-label`)
      el.error = false;

      await elementUpdated(el);
      await expect(el.hasAttribute('error')).to.be.false;
    });
  });
  describe('Should warning attribute reflect with property', () => {
    it('When add warning property to label', async () => {
      const el = await fixture(`<ds-sub-label>Label</ds-sub-label`)
      el.warning = true;

      await elementUpdated(el);
      await expect(el.hasAttribute('warning')).to.be.true;
    });
    it('When remove warning property from label', async() => {
      const el = await fixture(`<ds-sub-label warning>Label</ds-sub-label`)
      el.warning = false;

      await elementUpdated(el);
      await expect(el.hasAttribute('warning')).to.be.false;
    });
  });
});
describe('Property', () => {
  describe('Should error property reflect with attribute', () => {
    it('When add error attribute to label', async () => {
      const el = await fixture(`<ds-sub-label error>Label</ds-sub-label`)

      await expect(el.error).to.be.true;
    });
    it('When remove error attribute from label', async() => {
      const el = await fixture(`<ds-sub-label error>Label</ds-sub-label`)
      el.removeAttribute('error');

      await elementUpdated(el);
      await expect(el.error).to.be.false;
    });
  });
  describe('Should warning property reflect with attribute', () => {
    it('When add warning attribute to label', async () => {
      const el = await fixture(`<ds-sub-label warning>Label</ds-sub-label`)

      await expect(el.warning).to.be.true;
    });
    it('When remove warning attribute from label', async() => {
      const el = await fixture(`<ds-sub-label warning>Label</ds-sub-label`)
      el.removeAttribute('warning');

      await elementUpdated(el);
      await expect(el.warning).to.be.false;
    });
  });
});

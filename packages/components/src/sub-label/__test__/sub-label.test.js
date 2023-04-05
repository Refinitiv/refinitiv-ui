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
});


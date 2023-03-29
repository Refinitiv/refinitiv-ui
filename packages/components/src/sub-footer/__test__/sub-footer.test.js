import { fixture, expect } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-footer';

describe('ui-sub-footer', () => {
  describe('DOM Structure', () => {
    it('Default DOM is correct', async () => {
      const el = await fixture('<ui-sub-footer></ui-sub-footer>');
      await expect(el).to.equalSnapshot();
    });
    it('DOM with slot content is correct', async () => {
      const el = await fixture('<ui-sub-footer><div>Content</div></ui-sub-footer>');
      await expect(el).to.equalSnapshot();
    });
  });
});

import { fixture, expect } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/card';

describe('ui-card', () => {
  describe('DOM Structure', () => {
    it('Default DOM is correct', async () => {
      const el = await fixture('<ui-card></ui-card>');
      await expect(el).to.equalSnapshot();
    });
    it('DOM with slot content is correct', async () => {
      const el = await fixture('<ui-card><div>Content</div></ui-card>');
      await expect(el).to.equalSnapshot();
    });
  });
});

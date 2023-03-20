import { fixture, expect } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-overlay';

describe('ds-sub-overlay', () => {
  describe('DOM Structure', () => {
    it('Default Title and DOM structure is correct', async () => {
      const el = await fixture('<ds-sub-overlay><div>Default</div></ds-sub-overlay>');
      await expect(el).to.equalSnapshot();
    });
    it('Title and DOM structure is correct when opened', async () => {
      const el = await fixture('<ds-sub-overlay opened><div>Default</div></ds-sub-overlay>');
      await expect(el).to.equalSnapshot();
    });
  });
});

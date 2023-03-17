import { fixture, expect } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-overlay';

describe('overlay/Snapshot', () => {
  describe('Snapshot Test', () => {

    it('Title and DOM structure is correct', async () => {
      const el = await fixture('<ds-sub-overlay opened><div>Default</div></ds-sub-overlay>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });
});

import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-overlay';

describe('ds-sub-overlay', () => {
  describe('Events', () => {
    it('Overlay should close on click', async () => {
      const el = await fixture('<ds-sub-overlay opened><div>Default</div></ds-sub-overlay>');
      expect(el.opened).to.equal(true);
      document.dispatchEvent(new CustomEvent('tapstart'));
      await elementUpdated(el);
      expect(el.opened).to.equal(false);
    });
  });
});

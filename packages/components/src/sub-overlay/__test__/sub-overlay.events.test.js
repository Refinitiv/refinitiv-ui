import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-overlay';

describe('ui-sub-overlay', () => {
  describe('Events', () => {
    it('Overlay should close on click', async () => {
      const el = await fixture('<ui-sub-overlay opened><div>Default</div></ui-sub-overlay>');
      expect(el.opened).to.equal(true);
      document.dispatchEvent(new CustomEvent('tapstart'));
      await elementUpdated(el);
      expect(el.opened).to.equal(false);
    });
  });
});

import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/overlay';

describe('overlay/Behaviour', () => {
  describe('User Interaction Test', () => {
    it('Overlay should close on click', async () => {
      const el = await fixture('<ds-overlay opened><div>Default</div></ds-overlay>');
      expect(el.opened).to.equal(true);
      document.dispatchEvent(new CustomEvent('tapstart'));
      await elementUpdated(el);
      expect(el.opened).to.equal(false);
    });
  });
});

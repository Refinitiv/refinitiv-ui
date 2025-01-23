import '@refinitiv-ui/elements/overlay';

import '@refinitiv-ui/halo-theme/light/ef-overlay.js';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

describe('overlay/Behaviour', function () {
  describe('User Interaction Test', function () {
    it('Overlay should close on click', async function () {
      const el = await fixture('<ef-overlay opened><div>Default</div></ef-overlay>');
      expect(el.opened).to.equal(true);
      document.dispatchEvent(new CustomEvent('tapstart'));
      await elementUpdated(el);
      expect(el.opened).to.equal(false);
    });
  });
});

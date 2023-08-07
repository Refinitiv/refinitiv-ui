// import element and theme
import '@refinitiv-ui/elements/overlay';

import '@refinitiv-ui/elemental-theme/light/ef-overlay';
import { expect, fixture } from '@refinitiv-ui/test-helpers';

describe('overlay/Snapshot', function () {
  describe('Snapshot Test', function () {
    it('Title and DOM structure is correct', async function () {
      const el = await fixture('<ef-overlay opened><div>Default</div></ef-overlay>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });
});

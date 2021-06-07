import { fixture, expect } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/overlay';
import '@refinitiv-ui/elemental-theme/light/ef-overlay';

describe('Overlay', () => {
  describe('Snapshot Test', () => {

    it('Title and DOM structure is correct', async () => {
      const el = await fixture('<ef-overlay opened><div>Default</div></ef-overlay>');
      expect(el).shadowDom.to.equalSnapshot();
    });
  });
});

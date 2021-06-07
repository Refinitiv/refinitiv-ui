import { fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/overlay';
import '@refinitiv-ui/elemental-theme/light/ef-overlay';

describe('Overlay', () => {
  describe('Scroll Lock Manager', () => {
    it('Scroll should be locked', async () => {
      // const el = await fixture('<ef-overlay opened>Lock</ef-overlay>');
      document.dispatchEvent(new CustomEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaX: 0,
        deltaY: 100
      }));
      // TODO: test scroll
    });
  });

  describe('Focus Manager', () => {
    it('Overlay should be focus', async () => {
      const el = await fixture('<ef-overlay opened>Lock</ef-overlay>');

      // TODO: focus test
      nextFrame(el);
      el.focus();

      nextFrame(el);
    });
  });
});

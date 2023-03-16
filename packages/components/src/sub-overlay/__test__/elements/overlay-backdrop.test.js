import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/sub-overlay';
import '../../../../lib/sub-overlay/elements/overlay-backdrop.js';

describe('overlay/elements/OverlayBackdrop', () => {
  describe('Overlay Backdrop', () => {
    describe('shadowDOM Correctness', () => {
      it('DOM structure is correct', async () => {
        const el = await fixture('<ds-overlay-backdrop></ds-overlay-backdrop>');
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });

    describe('Properties and Attributes', () => {
      it('Test zIndex set property zIndex=1', async () => {
        const el = await fixture('<ds-overlay-backdrop></ds-overlay-backdrop>');

        el.zIndex = 1;

        await elementUpdated(el);

        expect(el.zIndex).to.equal(undefined, 'zIndex property should have just setter');
        expect(Number(el.style.zIndex)).to.equal(1, 'zIndex style property should be set to 1');
      });
      it('Test zIndex set property zIndex=null', async () => {
        const el = await fixture('<ds-overlay-backdrop></ds-overlay-backdrop>');

        el.zIndex = null;

        await elementUpdated(el);

        expect(el.zIndex).to.equal(undefined, 'zIndex property should have just setter');
        expect(el.style.zIndex).to.equal('', 'zIndex style property should be empty string while number is not set');
      });
      it('Test zIndex set attribute zIndex=1', async () => {
        const el = await fixture('<ds-overlay-backdrop z-index="1"></ds-overlay-backdrop>');

        expect(el.zIndex).to.equal(undefined, 'zIndex property should have just setter');
        expect(el.style.zIndex).to.equal('', 'zIndex style property should be empty string cause attribute should not be taken');
      });
    })
  });
});

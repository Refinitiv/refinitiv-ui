import '@refinitiv-ui/elements/overlay';

import '@refinitiv-ui/elemental-theme/light/ef-overlay';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import '../../../../lib/overlay/elements/overlay-backdrop.js';

describe('overlay/elements/OverlayBackdrop', function () {
  describe('Overlay Backdrop', function () {
    describe('shadowDOM Correctness', function () {
      it('DOM structure is correct', async function () {
        const el = await fixture('<ef-overlay-backdrop></ef-overlay-backdrop>');
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });

    describe('Properties and Attributes', function () {
      it('Test zIndex set property zIndex=1', async function () {
        const el = await fixture('<ef-overlay-backdrop></ef-overlay-backdrop>');

        el.zIndex = 1;

        await elementUpdated(el);

        expect(el.zIndex).to.equal(undefined, 'zIndex property should have just setter');
        expect(Number(el.style.zIndex)).to.equal(1, 'zIndex style property should be set to 1');
      });
      it('Test zIndex set property zIndex=null', async function () {
        const el = await fixture('<ef-overlay-backdrop></ef-overlay-backdrop>');

        el.zIndex = null;

        await elementUpdated(el);

        expect(el.zIndex).to.equal(undefined, 'zIndex property should have just setter');
        expect(el.style.zIndex).to.equal(
          '',
          'zIndex style property should be empty string while number is not set'
        );
      });
      it('Test zIndex set attribute zIndex=1', async function () {
        const el = await fixture('<ef-overlay-backdrop z-index="1"></ef-overlay-backdrop>');

        expect(el.zIndex).to.equal(undefined, 'zIndex property should have just setter');
        expect(el.style.zIndex).to.equal(
          '',
          'zIndex style property should be empty string cause attribute should not be taken'
        );
      });
    });
  });
});

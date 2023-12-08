import '@refinitiv-ui/elements/slider';

import '@refinitiv-ui/elemental-theme/light/ef-slider.js';
import { expect, fixture } from '@refinitiv-ui/test-helpers';

describe('slider/SliderMarker', function () {
  describe('SliderMarker', function () {
    describe('Snapshots', function () {
      it('DOM structure is correct', async function () {
        const el = await fixture('<ef-slider-marker>100°C</ef-slider-marker>');
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
  });
});

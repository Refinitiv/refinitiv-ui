import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';
import { COLOR_ITEMS } from '../../../lib/color-dialog/helpers/color-helpers.js';

import '../../../lib/color-dialog/elements/color-palettes';
import '../../../lib/color-dialog/elements/grayscale-palettes';

describe('color-dialog/ColorPalettes', () => {
  describe('Color Palettes', () => {
    let palettes;
    let polygonItems;
    let colorSelector;
    let colorSelectorShadow;

    beforeEach(async () => {
      palettes = await fixture('<ef-color-palettes></ef-color-palettes>');
      polygonItems = palettes.shadowRoot.querySelectorAll('polygon');
      colorSelector = palettes.shadowRoot.querySelector('.color-selector');
      colorSelectorShadow = palettes.shadowRoot.querySelector('.color-selector-shadow');
    });

    it('DOM structure is correct', async () => {
      expect(palettes.shadowRoot.getElementById('colorPalettes')).not.to.be.null;
      expect(polygonItems.length).not.equal(0);
      expect(colorSelector).not.to.be.null;
      expect(colorSelectorShadow).not.to.be.null;
    });
    it('should render palettes correctly from COLOR_ITEMS array', async () => {
      const color = COLOR_ITEMS[0][1]; // color code of first item
      expect(polygonItems.length).not.equal(0);
      expect(polygonItems[0].getAttribute('fill')).to.equal(color);
    });

    it('should have selected correct color value when tab on a color item', async () => {
      polygonItems[0].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(palettes.value).to.equal(COLOR_ITEMS[0][1]);
      polygonItems[5].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(palettes.value).to.equal(COLOR_ITEMS[5][1]);
    });

    it('should render color selector position and styled correctly when tab on a color item', async () => {
      polygonItems[0].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(colorSelector.style.display).not.to.equal('none');
      expect(colorSelector.getAttribute('points')).to.equal(polygonItems[0].getAttribute('points'));
      expect(colorSelectorShadow.style.display).not.to.equal('none');
      expect(colorSelectorShadow.getAttribute('points')).to.equal(polygonItems[0].getAttribute('points'));
    });

    it('should render color selector position and styled correctly when value changed', async () => {
      palettes.value = COLOR_ITEMS[0][1];
      await elementUpdated();
      expect(colorSelector.style.display).not.to.equal('none');
      expect(colorSelector.getAttribute('points')).to.equal(polygonItems[0].getAttribute('points'));
      expect(colorSelectorShadow.style.display).not.to.equal('none');
      expect(colorSelectorShadow.getAttribute('points')).to.equal(polygonItems[0].getAttribute('points'));
    });

    it('should change position of color selector correctly when change color by tapping', async () => {
      polygonItems[0].dispatchEvent(new Event('tap'));
      await elementUpdated();
      polygonItems[3].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(colorSelectorShadow.getAttribute('points')).to.equal(polygonItems[3].getAttribute('points'));
    });

    it('should hide color selector if the value is an invalid color code', async () => {
      palettes.value = COLOR_ITEMS[0][1];
      await elementUpdated();
      expect(colorSelector.style.display).to.equal('');
      expect(colorSelectorShadow.style.display).to.equal('');
      palettes.value = 'invalid';
      await elementUpdated();
      expect(colorSelector.style.display).to.equal('none');
      expect(colorSelectorShadow.style.display).to.equal('none');
    });

    it('should dispatch value-changed event when tapping', async () => {
      const onTapping = () => polygonItems[0].dispatchEvent(new Event('tap'));
      setTimeout(onTapping);
      const e = await oneEvent(palettes, 'value-changed');
      expect(e.type).to.equal('value-changed');
    });
  });
});

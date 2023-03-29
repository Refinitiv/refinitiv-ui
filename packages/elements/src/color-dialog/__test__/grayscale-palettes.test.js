import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/color-dialog';
import '@refinitiv-ui/elemental-theme/light/ef-color-dialog';
import '@refinitiv-ui/elemental-theme/light/ef-text-field';
import '@refinitiv-ui/elemental-theme/light/ef-number-field';
import { GRAYSCALE_ITEMS, NOCOLOR_POINTS } from '../../../lib/color-dialog/helpers/color-helpers.js';

describe('color-dialog/GrayscalePalettes', () => {
  describe('Grayscale Palettes', () => {
    let palettes;
    let nocolorPalettes;
    let polygonItems;
    let colorSelector;
    let colorSelectorShadow;

    beforeEach(async () => {
      palettes = await fixture('<ef-grayscale-palettes></ef-grayscale-palettes>');
      nocolorPalettes = await fixture('<ef-grayscale-palettes allow-nocolor></ef-grayscale-palettes>');
      polygonItems = palettes.shadowRoot.querySelectorAll('polygon');
      colorSelector = palettes.shadowRoot.querySelector('.color-selector');
      colorSelectorShadow = palettes.shadowRoot.querySelector('.color-selector-shadow');
    });

    it('DOM structure is correct', async () => {
      expect(palettes.shadowRoot.getElementById('grayscale-palettes')).not.to.be.null;
      expect(polygonItems.length).not.equal(0);
      expect(colorSelector).not.to.be.null;
      expect(colorSelectorShadow).not.to.be.null;
    });
    it('should render palettes correctly from GRAYSCALE_ITEMS array', async () => {
      const color = GRAYSCALE_ITEMS[0][1]; // color code of first item
      expect(polygonItems.length).not.equal(0);
      expect(polygonItems[0].getAttribute('fill')).to.equal(color);
      expect(polygonItems[0].getAttribute('stroke').replace(/\s/g, '')).to.equal('rgba(0,0,0,0.4)');
    });

    it('should not show no-color options by default', async () => {
      const noColorItem = palettes.shadowRoot.getElementById('nocolor-item');
      expect(noColorItem).to.be.null;
    });

    it('should have selected correct color value when tab on a color item', async () => {
      polygonItems[0].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(palettes.value).to.equal(GRAYSCALE_ITEMS[0][1]);
      polygonItems[5].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(palettes.value).to.equal(GRAYSCALE_ITEMS[5][1]);
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
      palettes.value = GRAYSCALE_ITEMS[0][1];
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
      palettes.value = GRAYSCALE_ITEMS[0][1];
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

    it('should show no color option correctly when set allow-nocolor to true', async () => {
      palettes.setAttribute('allow-nocolor', true);
      await elementUpdated();
      const noColorItem = palettes.shadowRoot.getElementById('nocolor-item');
      expect(noColorItem).not.to.be.null;
      expect(noColorItem).points = NOCOLOR_POINTS;
    });

    it('should hide no color option when set allow-nocolor to false', async () => {
      let noColorItem;
      noColorItem = nocolorPalettes.shadowRoot.getElementById('nocolor-item');
      expect(noColorItem).not.to.be.null;
      nocolorPalettes.removeAttribute('allow-nocolor');
      await elementUpdated();
      noColorItem = nocolorPalettes.shadowRoot.getElementById('nocolor-item');
      expect(noColorItem).to.be.null;
    });

    it('should have empty string as value when tapping on no-color option', async () => {
      const noColorItem = nocolorPalettes.shadowRoot.getElementById('nocolor-item');
      noColorItem.dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(nocolorPalettes).value = '';
    });
  });
});

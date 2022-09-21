import { fixture, expect, elementUpdated, oneEvent, isIE } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/color-dialog';
import '@refinitiv-ui/elemental-theme/light/ef-color-dialog';
import '@refinitiv-ui/elemental-theme/light/ef-text-field';
import '@refinitiv-ui/elemental-theme/light/ef-number-field';
import { rgb, removeHashSign } from '@refinitiv-ui/utils/color.js';
import { COLOR_ITEMS } from '../../../lib/color-dialog/helpers/color-helpers';

describe('color-dialog/ColorDialog', () => {
  describe('Default Color Dialog', () => {
    let defaultColorDialog;
    let colorPalettes;
    let polygonItems;
    let redInput;
    let greenInput;
    let blueInput;
    let hexInput;
    let previewColor;
    let confirmBtn;
    let closeBtn;

    beforeEach(async () => {
      defaultColorDialog = await fixture('<ef-color-dialog opened></ef-color-dialog>');
      colorPalettes = defaultColorDialog.shadowRoot.querySelector('ef-color-palettes');
      polygonItems = colorPalettes.shadowRoot.querySelectorAll('polygon');
      redInput = defaultColorDialog.shadowRoot.getElementById('redInput');
      greenInput = defaultColorDialog.shadowRoot.getElementById('greenInput');
      blueInput = defaultColorDialog.shadowRoot.getElementById('blueInput');
      hexInput = defaultColorDialog.shadowRoot.getElementById('hexInput');
      previewColor = defaultColorDialog.shadowRoot.querySelector('[part=preview-color]');
      confirmBtn = defaultColorDialog.shadowRoot.getElementById('confirmButton');
      closeBtn = defaultColorDialog.shadowRoot.getElementById('closeButton');
    });

    it('DOM structure is correct', async () => {
      expect(defaultColorDialog).shadowDom.to.equalSnapshot({
        ignoreAttributes: ['class', 'tabindex']
      });
    });

    it('should have correct color value when tapping on color palettes', async () => {
      polygonItems[5].dispatchEvent(new Event('tap'));
      await elementUpdated();
      confirmBtn.click();
      await elementUpdated();
      expect(defaultColorDialog.value).to.equal(COLOR_ITEMS[5][1]);
      expect(colorPalettes.value).to.equal(COLOR_ITEMS[5][1]);
    });

    it('should updated value of r,g,b input correctly when tapping on color palettes', async () => {
      const rgbValue = rgb(COLOR_ITEMS[5][1]);
      polygonItems[5].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(redInput.value).to.equal(`${rgbValue.r}`);
      expect(greenInput.value).to.equal(`${rgbValue.g}`);
      expect(blueInput.value).to.equal(`${rgbValue.b}`);
    });

    it('should updated value of hex input correctly when tapping on color palettes', async () => {
      const hexValue = removeHashSign(COLOR_ITEMS[5][1]);
      polygonItems[5].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(hexInput.value).to.equal(hexValue);
    });

    it('should updated previewColor element styled correctly when tapping on color palettes', async () => {
      const rgbValue = rgb(COLOR_ITEMS[10][1]);
      const rgbStr = `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`;
      polygonItems[10].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(previewColor.style.backgroundColor).to.equal(rgbStr);
    });

    it('should updated other value correctly when update r,g,b value', async () => {
      const hexColor = rgb(10, 30, 20).formatHex();
      defaultColorDialog.red = '10';
      defaultColorDialog.green = '30';
      defaultColorDialog.blue = '20';
      await elementUpdated();
      expect(colorPalettes.value).to.equal(hexColor);
      expect(defaultColorDialog.value).to.equal(hexColor);
      expect(previewColor.style.backgroundColor).to.equal('rgb(10, 30, 20)');
      expect(hexInput.value).to.equal(removeHashSign(hexColor));
    });

    it('should updated other value correctly when update r,g,b value by typing', async () => {
      const hexColor = rgb(10, 30, 20).formatHex();
      redInput.value = 10;
      redInput.dispatchEvent(new Event('value-changed'));
      greenInput.value = 30;
      greenInput.dispatchEvent(new Event('value-changed'));
      blueInput.value = 20;
      blueInput.dispatchEvent(new Event('value-changed'));
      await elementUpdated();
      expect(colorPalettes.value).to.equal(hexColor);
      expect(previewColor.style.backgroundColor).to.equal('rgb(10, 30, 20)');
      expect(hexInput.value).to.equal(removeHashSign(hexColor));
      confirmBtn.click();
      await elementUpdated();
      expect(defaultColorDialog.value).to.equal(hexColor);
    });

    it('should updated other value correctly when update hex value', async () => {
      const hexColor = '#fefefe';
      const rgbValue = rgb('#fefefe');
      const rgbStr = `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`;
      defaultColorDialog.hex = 'fefefe';
      await elementUpdated();
      expect(colorPalettes.value).to.equal(hexColor);
      expect(defaultColorDialog.value).to.equal(hexColor);
      expect(previewColor.style.backgroundColor).to.equal(rgbStr);
      expect(redInput.value).to.equal(`${rgbValue.r}`);
      expect(greenInput.value).to.equal(`${rgbValue.g}`);
      expect(blueInput.value).to.equal(`${rgbValue.b}`);
    });

    it('should updated other value correctly when update hex value by typing', async () => {
      const hexColor = '#fefefe';
      const rgbValue = rgb('#fefefe');
      const rgbStr = `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`;
      hexInput.value = 'fefefe';
      hexInput.dispatchEvent(new Event('value-changed'));
      await elementUpdated();
      expect(colorPalettes.value).to.equal(hexColor);
      expect(previewColor.style.backgroundColor).to.equal(rgbStr);
      expect(redInput.value).to.equal(`${rgbValue.r}`);
      expect(greenInput.value).to.equal(`${rgbValue.g}`);
      expect(blueInput.value).to.equal(`${rgbValue.b}`);
      confirmBtn.click();
      await elementUpdated();
      expect(defaultColorDialog.value).to.equal(hexColor);
    });

    it('should updated other value correctly when update hex value in shorthand', async () => {
      const hexColor = '#fef';
      const rgbValue = rgb(hexColor);
      const rgbStr = `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`;
      defaultColorDialog.hex = 'fef';
      await elementUpdated();
      expect(colorPalettes.value).to.equal(hexColor);
      expect(previewColor.style.backgroundColor).to.equal(rgbStr);
      expect(redInput.value).to.equal(`${rgbValue.r}`);
      expect(greenInput.value).to.equal(`${rgbValue.g}`);
      expect(blueInput.value).to.equal(`${rgbValue.b}`);
      confirmBtn.click();
      await elementUpdated();
      expect(defaultColorDialog.value).to.equal(hexColor);
    });

    it('should updated other value correctly when update hex value after set wrong r,g,b', async () => {
      const hexColor = '#fef';
      const rgbValue = rgb(hexColor);
      const rgbStr = `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`;
      defaultColorDialog.red = 'invalid';
      await elementUpdated();
      defaultColorDialog.hex = 'fef';
      await elementUpdated();
      expect(colorPalettes.value).to.equal(hexColor);
      expect(previewColor.style.backgroundColor).to.equal(rgbStr);
      expect(redInput.value).to.equal(`${rgbValue.r}`);
      expect(greenInput.value).to.equal(`${rgbValue.g}`);
      expect(blueInput.value).to.equal(`${rgbValue.b}`);
      confirmBtn.click();
      await elementUpdated();
      expect(defaultColorDialog.value).to.equal(hexColor);
    });

    it('should not fired value-changed event when r,g,b changed', async () => {
      let isCall = false;

      defaultColorDialog.addEventListener('value-changed', () => {
        isCall = true;
      });

      defaultColorDialog.red = 10;
      defaultColorDialog.green = 30;
      defaultColorDialog.blue = 20;

      await elementUpdated();
      expect(isCall).to.equal(false);
    });

    it('should not fired value-changed event when tapping on palettes', async () => {
      let isCall = false;

      defaultColorDialog.addEventListener('value-changed', () => {
        isCall = true;
      });

      polygonItems[5].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(isCall).to.equal(false);
    });
    it('should disabled confirmed button when value is null', async () => {
      defaultColorDialog.value = '';
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(true);
    });
    it('should disabled confirmed button when value is invalid', async () => {
      defaultColorDialog.value = 'invalidja';
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(true);
    });
    it('should disabled confirmed button when r,g,b value is invalid', async () => {
      defaultColorDialog.red = 500;
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(true);
    });
    it('should disabled confirmed button when typing invalid r,g,b', async () => {
      redInput.value = 500;
      redInput.dispatchEvent(new Event('value-changed'));
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(true);
    });
    it('should disabled confirmed button when hex is invalid', async () => {
      defaultColorDialog.hex = 'invalid';
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(true);
    });
    it('should enabled confirmed button when tapping on color item', async () => {
      polygonItems[5].dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(false);
    });
    it('should enabled confirmed button when r,g,b is valid', async () => {
      redInput.value = '255';
      greenInput.value = '200';
      blueInput.value = '20';
      redInput.dispatchEvent(new Event('value-changed'));
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(false);
    });
    it('should enabled confirmed button when hex is valid', async () => {
      hexInput.value = 'ffffff';
      hexInput.dispatchEvent(new Event('value-changed'));
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(false);
    });
    it('should close modal when tapping on close button', async () => {
      defaultColorDialog.opened = true;
      closeBtn.dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(defaultColorDialog.opened).to.equal(false);
    });
    it('should fired value-changed event and close modal when tapping on confirm button', async () => {
      defaultColorDialog.opened = true;
      polygonItems[5].dispatchEvent(new Event('tap'));
      await elementUpdated();
      const onConfirm = () => confirmBtn.click();
      setTimeout(onConfirm);
      const { detail } = await oneEvent(defaultColorDialog, 'value-changed');
      expect(detail.value).to.equal(COLOR_ITEMS[5][1]);
      expect(defaultColorDialog.opened).to.equal(false);
    });
  });
  describe('Allow No Color Dialog', () => {
    let allowNoColorDialog;
    let grayscalePalettes;
    let grayscaleSelector;
    let noColorItem;
    let redInput;
    let greenInput;
    let blueInput;
    let hexInput;
    let previewColor;
    let confirmBtn;

    beforeEach(async () => {
      allowNoColorDialog = await fixture('<ef-color-dialog opened allow-nocolor></ef-color-dialog>');
      grayscalePalettes = allowNoColorDialog.shadowRoot.querySelector('ef-grayscale-palettes');
      grayscaleSelector = grayscalePalettes.shadowRoot.querySelector('.color-selector');
      SVGAElement = grayscalePalettes.shadowRoot.getElementById('grayscale-palettes');
      noColorItem = SVGAElement.getElementById('nocolor-item');
      redInput = allowNoColorDialog.shadowRoot.getElementById('redInput');
      greenInput = allowNoColorDialog.shadowRoot.getElementById('greenInput');
      blueInput = allowNoColorDialog.shadowRoot.getElementById('blueInput');
      hexInput = allowNoColorDialog.shadowRoot.getElementById('hexInput');
      previewColor = allowNoColorDialog.shadowRoot.querySelector('[part=preview-color]');
      confirmBtn = allowNoColorDialog.shadowRoot.getElementById('confirmButton');
    });
    it('should render no color option', async () => {
      let item = noColorItem;
      if(isIE()) {
        for(let i = 0; i < SVGAElement.childNodes.length; i++) {
          if(SVGAElement.childNodes[i].nodeName === 'polygon') {
            item = SVGAElement.childNodes[i];
            return;
          }
        }
      }
      expect(item).not.to.be.null;
    });
    it('should update value correctly when tapping on no color item', async () => {
      let item = noColorItem;
      if(isIE()) {
        for(let i = 0; i < SVGAElement.childNodes.length; i++) {
          if(SVGAElement.childNodes[i].nodeName === 'polygon') {
            item = SVGAElement.childNodes[i];
            return;
          }
        }
      }
      allowNoColorDialog.value = '#ffffff';
      await elementUpdated();
      expect(allowNoColorDialog.value).to.equal('#ffffff');
      item.dispatchEvent(new Event('tap'));
      confirmBtn.click();
      await elementUpdated();
      expect(allowNoColorDialog.value).to.equal('');
    });
    it('should update other value correctly when tapping on no color item', async () => {
      let item = noColorItem;
      if(isIE()) {
        for(let i = 0; i < SVGAElement.childNodes.length; i++) {
          if(SVGAElement.childNodes[i].nodeName === 'polygon') {
            item = SVGAElement.childNodes[i];
            return;
          }
        }
      }
      item.dispatchEvent(new Event('tap'));
      await elementUpdated();
      expect(redInput.value).to.equal('');
      expect(blueInput.value).to.equal('');
      expect(greenInput.value).to.equal('');
      expect(hexInput.value).to.equal('');
      expect(previewColor.hasAttribute('no-color')).to.equal(true);
      expect(previewColor.style.backgroundColor).to.equal('');
      expect(grayscalePalettes.value).to.equal('');
    });
    it('should hide grayscale selector when remove allow-nocolor attr', async () => {
      allowNoColorDialog.value = '';
      allowNoColorDialog.removeAttribute('allow-nocolor');
      await elementUpdated();
      expect(grayscaleSelector.style.display).to.equal('none');
    });
    it('should enabled confirmed button when value is null', async () => {
      allowNoColorDialog.value = '#fff';
      await elementUpdated();
      hexInput.value = '';
      hexInput.dispatchEvent(new Event('value-changed'));
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(false);
    });
    it('should disabled confirmed button when value is invalid', async () => {
      allowNoColorDialog.value = 'invalidja';
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(true);
    });
    it('should disabled confirmed button when r,g,b value is invalid', async () => {
      allowNoColorDialog.red = '500';
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(true);
    });
    it('should disabled confirmed button when typing invalid r,g,b', async () => {
      redInput.value = 500;
      redInput.dispatchEvent(new Event('value-changed'));
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(true);
    });
    it('should disabled confirmed button when hex is invalid', async () => {
      allowNoColorDialog.hex = 'invalid';
      await elementUpdated();
      expect(confirmBtn.disabled).to.equal(true);
    });
  });
});


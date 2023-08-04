// import element and theme
import '@refinitiv-ui/elements/color-picker';

import '@refinitiv-ui/elemental-theme/light/ef-color-picker';
import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

/**
 * Get private dialog element property
 * @param {Object} colorPicker ef-color-picker
 * @return {Object} ref of ef-color-dialog
 */
const getDialogEl = (colorPicker) => colorPicker.dialogRef.value;

describe('color-picker/ColorPicker', function () {
  describe('DOM structure', function () {
    it('DOM structure is correct', async function () {
      const el = await fixture('<ef-color-picker value="#001EFF"></ef-color-picker>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure is correct when opened', async function () {
      const el = await fixture('<ef-color-picker value="#001EFF" opened></ef-color-picker>');
      await expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class', 'style'] });
    });
  });

  describe('Value property', function () {
    it('Should have default value', async function () {
      const el = await fixture('<ef-color-picker></ef-color-picker>');
      expect(el.value).to.equal('');
    });
    it('Should update value when set hex color', async function () {
      const el = await fixture('<ef-color-picker value="#001EFF"></ef-color-picker>');
      expect(el.value).to.equal('#001EFF');
    });
    it('Should update aria-label when change value color', async function () {
      const el = await fixture('<ef-color-picker value="#0000FF"></ef-color-picker>');
      expect(el.colorAriaLabel).to.equal('blue');
      el.value = '#ff0000';
      await elementUpdated(el);
      expect(el.colorAriaLabel).to.equal('red');
    });
    it('Should reset to default value when value is invalid', async function () {
      const el = await fixture('<ef-color-picker value="hello"></ef-color-picker>');
      expect(el.value).to.equal('');
    });
    it('Should not fires value-changed event when programmatically changes value', async function () {
      const value = '#001EFF';
      const el = await fixture('<ef-color-picker></ef-color-picker>');

      let eventFired = false;
      el.addEventListener('value-changed', () => {
        eventFired = true;
      });
      el.value = value;
      expect(el.value).to.equal(value);
      expect(eventFired).to.equal(false);
    });
    it('Should fires value-changed event when value change by user interactions', async function () {
      const el = await fixture('<ef-color-picker value="#001EFF" opened></ef-color-picker>');
      const dialogEl = getDialogEl(el);
      const redInput = dialogEl.shadowRoot.getElementById('redInput');
      const confirmBtn = dialogEl.shadowRoot.getElementById('confirmButton');
      redInput.value = 200;
      redInput.dispatchEvent(new Event('value-changed'));
      await elementUpdated(el);
      setTimeout(() => confirmBtn.click());
      await oneEvent(el, 'value-changed');
      await elementUpdated(el);
      expect(el.value).to.equal('#c81eff');
    });
  });

  describe('No color property', function () {
    it('Should not have allow-nocolor property on color dialog', async function () {
      const el = await fixture('<ef-color-picker></ef-color-picker>');
      el.opened = true;
      await elementUpdated(el);
      expect(getDialogEl(el).hasAttribute('allow-nocolor')).to.be.equal(false);
    });
    it('Should pass allow-nocolor property to color dialog', async function () {
      const el = await fixture('<ef-color-picker allow-nocolor></ef-color-picker>');
      el.opened = true;
      await elementUpdated(el);
      expect(getDialogEl(el).hasAttribute('allow-nocolor')).to.be.equal(true);
    });
  });

  describe('Color dialog', function () {
    it('Should open dialog when click on color picker', async function () {
      const el = await fixture('<ef-color-picker></ef-color-picker>');
      el.click();
      await elementUpdated(el);
      expect(getDialogEl(el).opened).to.be.equal(true, 'clicking on color picker should open color dialog');
    });
    it('Should open dialog when opened programmatically', async function () {
      const el = await fixture('<ef-color-picker></ef-color-picker>');
      el.opened = true;
      await elementUpdated(el);
      expect(getDialogEl(el).hasAttribute('opened')).to.be.equal(true);
    });
    it('Should not open color dialog when disabled', async function () {
      const el = await fixture('<ef-color-picker disabled></ef-color-picker>');
      el.click();
      expect(el.opened).to.be.equal(false, 'clicking on disabled should do nothing');
    });
    it('Should not open color dialog when readonly', async function () {
      const el = await fixture('<ef-color-picker readonly></ef-color-picker>');
      el.click();
      expect(el.opened).to.be.equal(false, 'clicking on readonly should do nothing');
    });
  });

  describe('Navigation', function () {
    it('Should open dialog when press enter key', async function () {
      const el = await fixture('<ef-color-picker></ef-color-picker>');
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(getDialogEl(el).opened).to.be.equal(true, 'Enter should open dialog');
    });
    it('Should open dialog when press spacebar key', async function () {
      const el = await fixture('<ef-color-picker></ef-color-picker>');
      el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      await elementUpdated(el);
      expect(getDialogEl(el).opened).to.be.equal(true, 'Spacebar should open dialog');
    });
  });
});

import '@refinitiv-ui/elements/text-field';

import '@refinitiv-ui/elemental-theme/light/ef-text-field';
import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

describe('text-field/Validation', function () {
  describe('Default', function () {
    it('should show error state on initial when set error attribute', async function () {
      const el = await fixture('<ef-text-field error></ef-text-field>');
      expect(el.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called with no constraint', async function () {
      const el = await fixture('<ef-text-field error></ef-text-field>');
      expect(el.error).to.be.equal(true);
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should fired error-changed event when reportValidity is called', async function () {
      const el = await fixture('<ef-text-field error></ef-text-field>');
      setTimeout(() => el.reportValidity());
      const e = await oneEvent(el, 'error-changed');
      await elementUpdated(el);
      expect(e.detail.value).to.equal(false);
    });
    // todo: can't mock blur event by user
    // it('should remove error state when input blur by user')
  });
  describe('With minlength / maxlength', function () {
    it('should not show error state on initial', async function () {
      const elMin = await fixture('<ef-text-field minlength="3"></ef-text-field>');
      const elMax = await fixture('<ef-text-field maxlength="3"></ef-text-field>');
      expect(elMin.error).to.be.equal(false);
      expect(elMax.error).to.be.equal(false);
    });
    it('should not show error state with invalid initial value', async function () {
      const elMin = await fixture('<ef-text-field minlength="3" value="a"></ef-text-field>');
      const elMax = await fixture('<ef-text-field maxlength="3 value="abcd"></ef-text-field>');
      expect(elMin.error).to.be.equal(false);
      expect(elMax.error).to.be.equal(false);
    });
    it('should show error state on initial when error attribute is set', async function () {
      const elMin = await fixture('<ef-text-field error minlength="3"></ef-text-field>');
      const elMax = await fixture('<ef-text-field error maxlength="3"></ef-text-field>');
      expect(elMin.error).to.be.equal(true);
      expect(elMax.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called without initial value', async function () {
      const elMin = await fixture('<ef-text-field error minlength="3"></ef-text-field>');
      const elMax = await fixture('<ef-text-field error maxlength="3"></ef-text-field>');
      elMin.reportValidity();
      elMax.reportValidity();
      expect(elMin.error).to.be.equal(false);
      expect(elMax.error).to.be.equal(false);
    });
    it('should set error state to false when reportValidity is called with invalid initial value', async function () {
      const elMin = await fixture('<ef-text-field error minlength="3" value="a"></ef-text-field>');
      const elMax = await fixture('<ef-text-field error maxlength="3" value="abcd"></ef-text-field>');
      elMin.reportValidity();
      elMax.reportValidity();
      expect(elMin.error).to.be.equal(
        false,
        'Value is Invalid, but Error State is False: Following Native Input Behavior'
      );
      expect(elMax.error).to.be.equal(
        false,
        'Value is Invalid, but Error State is False: Following Native Input Behavior'
      );
    });
    it('should set error state to false when reportValidity is called if value is invalid and be changed programmatically', async function () {
      const elMin = await fixture('<ef-text-field error minlength="3"></ef-text-field>');
      const elMax = await fixture('<ef-text-field error maxlength="3"></ef-text-field>');
      elMin.value = 'a';
      elMax.value = 'abcd';
      await elementUpdated(elMin);
      await elementUpdated(elMax);
      elMin.reportValidity();
      elMax.reportValidity();
      expect(elMin.error).to.be.equal(
        false,
        'Value is Invalid, but Error State is False: Following Native Input Behavior'
      );
      expect(elMax.error).to.be.equal(
        false,
        'Value is Invalid, but Error State is False: Following Native Input Behavior'
      );
    });
    // todo: can't mock blur / input event by user
    // it('should remove error state on blur');
    // it('should remove error state when value changed from valid to invalid / invalid to valid by user')
  });
  describe('With pattern', function () {
    it('should not show error state on initial with no initial value', async function () {
      const el = await fixture('<ef-text-field pattern="[a-z]"></ef-text-field>');
      expect(el.error).to.be.equal(false);
    });
    it('should not show error state with invalid initial value', async function () {
      const el = await fixture('<ef-text-field pattern="[a-z]" value="1"></ef-text-field>');
      expect(el.error).to.be.equal(false);
    });
    it('should show error state on initial when set error attribute', async function () {
      const el = await fixture('<ef-text-field pattern="[a-z]" error></ef-text-field>');
      expect(el.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called without value', async function () {
      const el = await fixture('<ef-text-field error pattern="[a-z]"></ef-text-field>');
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should show error state when reportValidity is called with invalid initial value', async function () {
      const el = await fixture('<ef-text-field pattern="[a-z]" value="1"></ef-text-field>');
      expect(el.error).to.be.equal(false);
      el.reportValidity();
      expect(el.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called with error attribute and valid initial value', async function () {
      const el = await fixture('<ef-text-field error pattern="[a-z]" value="a"></ef-text-field>');
      expect(el.error).to.be.equal(true);
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should not set error state to false when value change programmatically with error attribute', async function () {
      const el = await fixture('<ef-text-field error pattern="[a-z]"></ef-text-field>');
      expect(el.error).to.be.equal(true);
      el.value = 'a';
      await elementUpdated(el);
      expect(el.error).to.be.equal(true);
    });
    it('should not set error state to true when pattern change programmatically', async function () {
      const el = await fixture('<ef-text-field pattern="[a-z]"></ef-text-field>');
      expect(el.error).to.be.equal(false);
      el.value = 'a';
      el.pattern = '[1-10]';
      await elementUpdated(el);
      expect(el.error).to.be.equal(false);
    });
    // todo: can't mock blur / input event by user
    // it('should remove error state on blur with no initial value');
    // it('should remove error state when value changed from valid to invalid / invalid to valid by user')
  });
});

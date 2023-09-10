import '@refinitiv-ui/elements/text-field';

import '@refinitiv-ui/elemental-theme/light/ef-text-field';
import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

describe('text-field/Validation', function () {
  describe('Default', function () {
    it('should show error state on initial when set error attr', async function () {
      const el = await fixture('<ef-text-field error></ef-text-field>');
      expect(el.error).to.be.equal(true);
    });
    it('should remove error state when call reportValidity with no validation', async function () {
      const el = await fixture('<ef-text-field error></ef-text-field>');
      expect(el.error).to.be.equal(true);
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should fired error-changed event when call reportValidity', async function () {
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
    it('should show error state on initial when set error attr', async function () {
      const elMin = await fixture('<ef-text-field error minlength="3"></ef-text-field>');
      const elMax = await fixture('<ef-text-field error maxlength="3"></ef-text-field>');
      expect(elMin.error).to.be.equal(true);
      expect(elMax.error).to.be.equal(true);
    });
    it('should remove error state when call reportValidity without value', async function () {
      const elMin = await fixture('<ef-text-field error minlength="3"></ef-text-field>');
      const elMax = await fixture('<ef-text-field error maxlength="3"></ef-text-field>');
      elMin.reportValidity();
      elMax.reportValidity();
      expect(elMin.error).to.be.equal(false);
      expect(elMax.error).to.be.equal(false);
    });
    it('should show incorrect error state when call reportValidity with invalid initial value ( because minlength / maxlength not validate programmatically value)', async function () {
      const elMin = await fixture('<ef-text-field error minlength="3" value="a"></ef-text-field>');
      const elMax = await fixture('<ef-text-field error maxlength="3" value="abcd"></ef-text-field>');
      elMin.reportValidity();
      elMax.reportValidity();
      expect(elMin.error).to.be.equal(
        false,
        'value is invalid but error state is invalid, followed native input behavior'
      );
      expect(elMax.error).to.be.equal(
        false,
        'value is invalid but error state is invalid, followed native input behavior'
      );
    });
    it('should show incorrect error state when call reportValidity if value is invalid and be changed programmatically', async function () {
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
        'value is invalid but error state is invalid, followed native input behavior'
      );
      expect(elMax.error).to.be.equal(
        false,
        'value is invalid but error state is invalid, followed native input behavior'
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
    it('should show error state on initial when set error attr', async function () {
      const el = await fixture('<ef-text-field pattern="[a-z]" error></ef-text-field>');
      expect(el.error).to.be.equal(true);
    });
    it('should remove error state when call reportValidity without value', async function () {
      const el = await fixture('<ef-text-field error pattern="[a-z]"></ef-text-field>');
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should show error state when call reportValidity with invalid initial value', async function () {
      const el = await fixture('<ef-text-field pattern="[a-z]" value="1"></ef-text-field>');
      expect(el.error).to.be.equal(false);
      el.reportValidity();
      expect(el.error).to.be.equal(true);
    });
    it('should remove error state when call reportValidity with error attr and valid initial value', async function () {
      const el = await fixture('<ef-text-field error pattern="[a-z]" value="a"></ef-text-field>');
      expect(el.error).to.be.equal(true);
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should not remove error state when value change programmatically with error attr', async function () {
      const el = await fixture('<ef-text-field error pattern="[a-z]"></ef-text-field>');
      expect(el.error).to.be.equal(true);
      el.value = 'a';
      await elementUpdated(el);
      expect(el.error).to.be.equal(true);
    });
    it('should not remove error state when pattern change programmatically', async function () {
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

// import element and theme
import '@refinitiv-ui/elements/email-field';

import '@refinitiv-ui/elemental-theme/light/ef-email-field';
import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

describe('email-field/EmailField', function () {
  it('Default DOM structure and properties are correct', async function () {
    const el = await fixture('<ef-email-field></ef-email-field>');
    expect(el.multiple).to.equal(false, 'multiple');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('DOM structure and properties are correct', async function () {
    const el = await fixture('<ef-email-field multiple></ef-email-field>');
    expect(el.multiple).to.equal(true, 'multiple');
    await expect(el).shadowDom.to.equalSnapshot();
  });
});

describe('email-field/Validation', function () {
  describe('Default: pattern from input type="email"', function () {
    it('should not show error state on initial with no initial value', async function () {
      const el = await fixture('<ef-email-field></ef-email-field>');
      expect(el.error).to.be.equal(false);
    });
    it('should not show error state with invalid initial value', async function () {
      const el = await fixture('<ef-email-field value="1"></ef-email-field>');
      expect(el.error).to.be.equal(false);
    });
    it('should show error state on initial when set error attribute', async function () {
      const el = await fixture('<ef-email-field error></ef-email-field>');
      expect(el.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called without value', async function () {
      const el = await fixture('<ef-email-field error"></ef-email-field>');
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should show error state when reportValidity is called with invalid initial value', async function () {
      const el = await fixture('<ef-email-field value="1"></ef-email-field>');
      expect(el.error).to.be.equal(false);
      el.reportValidity();
      expect(el.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called with error attribute and valid initial value', async function () {
      const el = await fixture('<ef-email-field error value="a@b"></ef-email-field>');
      expect(el.error).to.be.equal(true);
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should not set error state to false when value change programmatically with error attribute', async function () {
      const el = await fixture('<ef-email-field error></ef-email-field>');
      expect(el.error).to.be.equal(true);
      el.value = 'a@b';
      await elementUpdated(el);
      expect(el.error).to.be.equal(true);
    });
    // TODO: can't mock blur by user
    // it('should remove error state on blur with no initial value', function () { });
    it('should add error state when value changed from valid to invalid by a mock user interaction', async function () {
      const el = await fixture('<ef-email-field></ef-email-field>');
      expect(el.error).to.be.equal(false);

      const input = el.shadowRoot.querySelector('input');
      input.value = '10';
      setTimeout(() => input.dispatchEvent(new Event('input')));
      await oneEvent(el, 'value-changed');
      expect(el.error).to.be.equal(true);
    });
    it('should remove error state when value changed from invalid to valid by a mock user interaction', async function () {
      const el = await fixture('<ef-email-field error value="10"></ef-email-field>');
      expect(el.error).to.be.equal(true);

      const input = el.shadowRoot.querySelector('input');
      input.value = 'a@b';
      setTimeout(() => input.dispatchEvent(new Event('input')));
      await oneEvent(el, 'value-changed');
      expect(el.error).to.be.equal(false);
    });
  });

  describe('With non-empty string pattern', function () {
    // intersect with native pattern
    it('should not show error state on initial with no initial value', async function () {
      const el = await fixture('<ef-email-field pattern=".+@bar"></ef-email-field>');
      expect(el.error).to.be.equal(false);
    });
    it('should not show error state with invalid initial value', async function () {
      const el = await fixture('<ef-email-field pattern=".+@bar" value="a@b"></ef-email-field>');
      expect(el.error).to.be.equal(false);
    });
    it('should show error state on initial when set error attribute', async function () {
      const el = await fixture('<ef-email-field pattern=".+@bar" error></ef-email-field>');
      expect(el.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called without value', async function () {
      const el = await fixture('<ef-email-field error pattern=".+@bar"></ef-email-field>');
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should show error state when reportValidity is called with invalid initial value', async function () {
      const el = await fixture('<ef-email-field pattern=".+@bar" value="a@b"></ef-email-field>');
      expect(el.error).to.be.equal(false);
      el.reportValidity();
      expect(el.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called with error attribute and valid initial value', async function () {
      const el = await fixture('<ef-email-field error pattern=".+@bar" value="a@bar"></ef-email-field>');
      expect(el.error).to.be.equal(true);
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should not set error state to false when value change programmatically with error attribute', async function () {
      const el = await fixture('<ef-email-field error pattern=".+@bar"></ef-email-field>');
      expect(el.error).to.be.equal(true);
      el.value = 'a@bar';
      await elementUpdated(el);
      expect(el.error).to.be.equal(true);
    });
    it('should not set error state to true when pattern change programmatically', async function () {
      const el = await fixture('<ef-email-field pattern=".+@bar"></ef-email-field>');
      expect(el.error).to.be.equal(false);
      el.value = 'a@bar';
      el.pattern = '.+@foo';
      await elementUpdated(el);
      expect(el.error).to.be.equal(false);
    });
    // TODO: can't mock blur by user
    // it('should remove error state on blur with no initial value', function () { });
    it('should add error state when value changed from valid to invalid by a mock user interaction', async function () {
      const el = await fixture('<ef-email-field pattern=".+@bar"></ef-email-field>');
      expect(el.error).to.be.equal(false);

      const input = el.shadowRoot.querySelector('input');
      input.value = 'a@b';
      setTimeout(() => input.dispatchEvent(new Event('input')));
      await oneEvent(el, 'value-changed');
      expect(el.error).to.be.equal(true);
    });
    it('should remove error state when value changed from invalid to valid by a mock user interaction', async function () {
      const el = await fixture('<ef-email-field pattern=".+@bar" error value="a@b"></ef-email-field>');
      expect(el.error).to.be.equal(true);

      const input = el.shadowRoot.querySelector('input');
      input.value = 'a@bar';
      setTimeout(() => input.dispatchEvent(new Event('input')));
      await oneEvent(el, 'value-changed');
      expect(el.error).to.be.equal(false);
    });
  });

  describe('With empty string pattern: no validation constraint', function () {
    it('should show error state on initial when set error attribute', async function () {
      const el = await fixture('<ef-email-field pattern="" error></ef-email-field>');
      expect(el.error).to.be.equal(true);
    });
    it('should set error state to false when reportValidity is called with no constraint', async function () {
      const el = await fixture('<ef-email-field pattern="" error></ef-email-field>');
      expect(el.error).to.be.equal(true);
      el.reportValidity();
      expect(el.error).to.be.equal(false);
    });
    it('should fired error-changed event when reportValidity is called', async function () {
      const el = await fixture('<ef-email-field pattern="" error></ef-email-field>');
      setTimeout(() => el.reportValidity());
      const e = await oneEvent(el, 'error-changed');
      await elementUpdated(el);
      expect(e.detail.value).to.equal(false);
    });
    it('should maintain error state when the input value is updated by a mock user interaction', async function () {
      const el = await fixture('<ef-email-field pattern="" error></ef-email-field>');
      expect(el.error).to.be.equal(true);
      const input = el.shadowRoot.querySelector('input');
      input.value = 'hello@mail.com';
      setTimeout(() => input.dispatchEvent(new Event('input')));
      await oneEvent(el, 'value-changed');
      expect(el.error).to.be.equal(true);
    });
    // TODO: can't mock blur event by user
    // it('should maintain error state when the input loses focus', function () { });
  });
});

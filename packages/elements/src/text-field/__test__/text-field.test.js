import '@refinitiv-ui/elements/text-field';

import '@refinitiv-ui/elemental-theme/light/ef-text-field';
import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

describe('text-field/TextField', function () {
  it('Default DOM structure and properties are correct', async function () {
    const el = await fixture('<ef-text-field></ef-text-field>');

    expect(el.value).to.equal('', 'value');
    expect(el.error).to.equal(false, 'error');
    expect(el.warning).to.equal(false, 'warning');
    expect(el.transparent).to.equal(false, 'transparent');
    expect(el.pattern).to.equal('', 'pattern');
    expect(el.placeholder).to.equal('', 'placeholder');
    expect(el.minLength).to.equal(null, 'minLength');
    expect(el.maxLength).to.equal(null, 'maxLength');
    expect(el.icon).to.equal(null, 'icon');

    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('DOM structure and properties are correct', async function () {
    const el = await fixture(`
        <ef-text-field
            value="abbr"
            error
            warning
            transparent
            pattern="[a-z]"
            placeholder="Placeholder"
            minlength="5"
            maxlength="10"
            icon="menu"
        ></ef-text-field>
      `);

    expect(el.value).to.equal('abbr', 'value');
    expect(el.error).to.equal(true, 'error');
    expect(el.warning).to.equal(true, 'warning');
    expect(el.transparent).to.equal(true, 'transparent');
    expect(el.pattern).to.equal('[a-z]', 'pattern');
    expect(el.placeholder).to.equal('Placeholder', 'placeholder');
    expect(el.minLength).to.equal(5, 'minLength');
    expect(el.maxLength).to.equal(10, 'maxLength');
    expect(el.icon).to.equal('menu', 'icon');

    await expect(el).shadowDom.to.equalSnapshot();
  });

  describe('Functional Tests', function () {
    it('icon-click', async function () {
      const el = await fixture('<ef-text-field icon="menu"></ef-text-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      let clickCount = 0;

      el.addEventListener('icon-click', () => {
        clickCount += 1;
      });

      icon.dispatchEvent(new CustomEvent('tap'));

      expect(clickCount).to.equal(0, 'Icon should not be clickable by default');
    });

    it('icon-click with icon-has-action', async function () {
      const el = await fixture('<ef-text-field icon="menu" icon-has-action></ef-text-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      let clickCount = 0;

      el.addEventListener('icon-click', () => {
        clickCount += 1;
      });

      icon.dispatchEvent(new CustomEvent('tap'));

      expect(clickCount).to.equal(1, 'Icon should be clickable');
    });

    it('icon-click with icon-has-action and disabled', async function () {
      const el = await fixture('<ef-text-field icon="menu" icon-has-action disabled></ef-text-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      let clickCount = 0;

      el.addEventListener('icon-click', () => {
        clickCount += 1;
      });

      icon.dispatchEvent(new CustomEvent('tap'));

      expect(clickCount).to.equal(0, 'Icon should not be clickable when disabled');
    });

    it('icon-click with icon-has-action and press `tab` should not fire event', async function () {
      const el = await fixture('<ef-text-field icon="menu" icon-has-action></ef-text-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      let clickCount = 0;

      el.addEventListener('icon-click', () => {
        clickCount += 1;
      });

      icon.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(clickCount).to.equal(0, 'Icon-click event should not be fired');
    });

    it('should change value', async function () {
      const el = await fixture('<ef-text-field value="abbr"></ef-text-field>');
      const input = el.shadowRoot.querySelector('[part=input]');
      expect(el.value).to.equal('abbr');
      expect(input.value).to.equal('abbr');

      el.value = 'valg';
      await elementUpdated(el);

      expect(el.value).to.equal('valg');
      expect(input.value).to.equal('valg');
    });

    it('should change value and fire value-changed', async function () {
      const el = await fixture('<ef-text-field value="abbr"></ef-text-field>');
      const input = el.shadowRoot.querySelector('[part=input]');

      input.value = 'test';
      await elementUpdated(el);

      setTimeout(() => {
        input.dispatchEvent(
          new Event('input', {
            bubbles: true,
            cancelable: true
          })
        );
      });

      const { detail } = await oneEvent(el, 'value-changed');
      expect(detail.value).to.equal('test');
    });
    it('Tapping on clears button should clear the value', async function () {
      const el = await fixture('<ef-text-field clears value="abbr"></ef-text-field>');
      el.clearsButton.dispatchEvent(new CustomEvent('tap'));
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Tapping on clears did not clear the value');
    });
  });
  describe('Accessibility', function () {
    it('Should pass when `aria-label` was set on component', async function () {
      const el = await fixture('<ef-text-field aria-label="Text Field"></ef-text-field>');
      await expect(el).to.be.accessible();
    });
    it('Should be accessible with `aria-labelledby`', async function () {
      await fixture('<span id="label">Label</label>');
      await fixture('<span id="sub-label">Sub Label</label>');
      const el = await fixture('<ef-text-field id="txt" aria-labelledby="label sub-label"></ef-text-field>');
      await expect(el).to.be.accessible();
    });
    it('Should be accessible with `for` attribute on label', async function () {
      await fixture('<label for="text">Text Field</label>');
      const el = await fixture('<ef-text-field id="text"></ef-text-field>');
      await expect(el).to.be.accessible();
    });
    it('Should propagate `aria-description` attribute to input correctly', async function () {
      const el = await fixture('<ef-text-field aria-description="Text Field"></ef-text-field>');

      const input = el.shadowRoot.querySelector('[part=input]');
      expect(input.getAttribute('aria-description')).to.be.equal('Text Field');
    });

    it('Should propagate `aria-describedby` attribute to input correctly', async function () {
      const helperMessage = await fixture('<span id="helper-message">Field description</label>');
      const errorMessage = await fixture('<span id="error-message">Error</label>');
      const el = await fixture(
        '<ef-text-field aria-describedby="helper-message error-message"></ef-text-field>'
      );

      const input = el.shadowRoot.querySelector('[part=input]');
      expect(input.getAttribute('aria-description')).to.be.equal(
        `${helperMessage.textContent} ${errorMessage.textContent}`
      );
    });
  });
});

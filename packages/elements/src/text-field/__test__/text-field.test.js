import { elementUpdated, expect, fixture, oneEvent, keyboardEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elemental-theme/light/ef-text-field';

describe('text-field/TextField', () => {
  it('Default DOM structure and properties are correct', async () => {
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

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('DOM structure and properties are correct', async () => {
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

    expect(el).shadowDom.to.equalSnapshot();
  });

  describe('Functional Tests', () => {
    it('Error-changed from true to false for pattern', async () => {
      const el = await fixture('<ef-text-field pattern="[a-z]" value="1"></ef-text-field>');

      expect(el.error).to.equal(true);
      setTimeout(() => {
        el.value = 'a';
      });

      const { detail } = await oneEvent(el, 'error-changed');

      expect(detail.value).to.equal(false);
      expect(el.error).to.equal(false);
    });

    it('Error-changed from false to true for pattern', async () => {
      const el = await fixture('<ef-text-field></ef-text-field>');

      el.value = '1';
      await elementUpdated(el);
      expect(el.error).to.equal(false);

      setTimeout(() => {
        el.pattern = '[a-z]';
      });

      const { detail } = await oneEvent(el, 'error-changed');

      expect(el.error).to.equal(true);
      expect(detail.value).to.equal(true);
    });

    it('set error state when input value does not match pattern expression', async () => {
      const el = await fixture('<ef-text-field pattern="[a-z]"></ef-text-field>');
      const input = el.shadowRoot.querySelector('[part=input]');

      input.value = '12345';
      el.validateInput();
      expect(el.error).to.equal(true);
    });

    it('remove error state when input value does match pattern expression', async () => {
      const el = await fixture('<ef-text-field></ef-text-field>');
      const input = el.shadowRoot.querySelector('[part=input]');

      el.setAttribute('pattern', '[a-z]{4}');
      el.setAttribute('error', 'true');
      input.value = 'test';
      await elementUpdated(el);
      el.validateInput();
      expect(el.error).to.equal(false);
    });

    it('icon-click', async () => {
      const el = await fixture('<ef-text-field icon="menu"></ef-text-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      let clickCount = 0;

      el.addEventListener('icon-click', () => {
        clickCount += 1;
      });

      icon.dispatchEvent(new CustomEvent('tap'));

      expect(clickCount).to.equal(0, 'Icon should not be clickable by default');
    });

    it('icon-click with icon-has-action', async () => {
      const el = await fixture('<ef-text-field icon="menu" icon-has-action></ef-text-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      let clickCount = 0;

      el.addEventListener('icon-click', () => {
        clickCount += 1;
      });

      icon.dispatchEvent(new CustomEvent('tap'));

      expect(clickCount).to.equal(1, 'Icon should be clickable');
    });

    it('icon-click with icon-has-action and disabled', async () => {
      const el = await fixture('<ef-text-field icon="menu" icon-has-action disabled></ef-text-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      let clickCount = 0;

      el.addEventListener('icon-click', () => {
        clickCount += 1;
      });

      icon.dispatchEvent(new CustomEvent('tap'));

      expect(clickCount).to.equal(0, 'Icon should not be clickable when disabled');
    });

    it('icon-click with icon-has-action and press `tab` should not fire event', async () => {
      const el = await fixture('<ef-text-field icon="menu" icon-has-action></ef-text-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      let clickCount = 0;

      el.addEventListener('icon-click', () => {
        clickCount += 1;
      });

      icon.dispatchEvent(keyboardEvent('keydown', { key: 'Tab' }));

      expect(clickCount).to.equal(0, 'Icon-click event should not be fired');
    });

    it('should change value', async () => {
      const el = await fixture('<ef-text-field value="abbr"></ef-text-field>');
      const input = el.shadowRoot.querySelector('[part=input]');
      expect(el.value).to.equal('abbr');
      expect(input.value).to.equal('abbr');

      el.value = 'valg';
      await elementUpdated(el);

      expect(el.value).to.equal('valg');
      expect(input.value).to.equal('valg');
    });

    it('should change value and fire value-changed', async () => {
      const el = await fixture('<ef-text-field value="abbr"></ef-text-field>');
      const input = el.shadowRoot.querySelector('[part=input]');

      input.value = 'test';
      await elementUpdated(el);

      setTimeout(() => {
        input.dispatchEvent(new Event('input', {
          bubbles: true,
          cancelable: true
        }));
      });

      const { detail } = await oneEvent(el, 'value-changed');
      expect(detail.value).to.equal('test');
    });
  });
  describe('Accessiblity', () => {
    it('should fail without label', async () => {
      const el = await fixture('<ef-text-field></ef-text-field>');
      expect(el).not.to.be.accessible();
    });
    it('should pass a11y test with aria-label', async () => {
      const el = await fixture('<ef-text-field aria-label="Text Field"></ef-text-field>');
      setTimeout(() => el.dispatchEvent(new Event('focus')));
      await oneEvent(el, 'focus');

      const input = el.shadowRoot.querySelector('[part=input]');
      expect(input.getAttribute('aria-label')).to.be.equal('Text Field');
      expect(el).to.be.accessible();
    });
    it('should pass a11y test with aria-labelledby', async () => {
      const label = await fixture('<span id="label">Label</label>');
      const subLabel = await fixture('<span id="sub-label">Sub Label</label>');
      const el = await fixture(`<ef-text-field id="txt" aria-labelledby="label sub-label"></ef-text-field>`);
      setTimeout(() => el.dispatchEvent(new Event('focus')));
      await oneEvent(el, 'focus');

      const input = el.shadowRoot.querySelector('[part=input]');
      expect(input.getAttribute('aria-label')).to.be.equal(`${label.textContent} ${subLabel.textContent}`);
      expect(el).to.be.accessible();
    });

    it('should pass a11y test using label for and id', async () => {
      await fixture('<label for="text">Text Field</label>');
      const el = await fixture('<ef-text-field id="text"></ef-text-field>');
      setTimeout(() => el.dispatchEvent(new Event('focus')));
      await oneEvent(el, 'focus');

      const input = el.shadowRoot.querySelector('[part=input]');
      expect(input.getAttribute('aria-label')).to.be.equal('Text Field');
      expect(el).to.be.accessible();
    });

    it('should pass a11y test when using aria-description', async () => {
      const el = await fixture('<ef-text-field aria-description="Text Field"></ef-text-field>');
      setTimeout(() => el.dispatchEvent(new Event('focus')));
      await oneEvent(el, 'focus');

      const input = el.shadowRoot.querySelector('[part=input]');
      expect(input.getAttribute('aria-description')).to.be.equal('Text Field');
      expect(el).to.be.accessible();
    });

    it('should pass a11y test when using aria-describedby', async () => {
      const helperMessage = await fixture('<span id="helper-message">Field description</label>');
      const errorMessage = await fixture('<span id="error-message">Error</label>');
      const el = await fixture('<ef-text-field aria-describedby="helper-message error-message"></ef-text-field>');
      setTimeout(() => el.dispatchEvent(new Event('focus')));
      await oneEvent(el, 'focus');

      const input = el.shadowRoot.querySelector('[part=input]');
      expect(input.getAttribute('aria-description')).to.be.equal(`${helperMessage.textContent} ${errorMessage.textContent}`);
      expect(el).to.be.accessible();
    });
  });
});


import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/input-field';

describe('ui-input-field', () => {
  const textfieldDefault = `<ui-input-field></ui-input-field>`;
  const textfieldAttributes = `
  <ui-input-field
      value="abbr"
      error
      warning
      pattern="[a-z]"
      minlength="5"
      maxlength="10"
      icon="menu"
  ></ui-input-field>
`;

  describe('DOM Structure', () => {
    it('DOM default is correct', async () => {
      const el = await fixture(textfieldDefault);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM with attributes are correct', async () => {
      const el = await fixture(textfieldAttributes);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Attributes', () => {
    describe('value', () => {
      it('value attribute should be empty string by default', async () => {
        const el = await fixture(textfieldDefault);
        await expect(el.value).to.equal('', 'value');
      });
      it('value attribute should be reflected with property', async () => {
        const el = await fixture(textfieldAttributes);
        await expect(el.value).to.equal('abbr', 'value');
      });
      it('value attribute should not reflected when property value has change', async () => {
        const el = await fixture(textfieldAttributes);
        el.value = '';
        await elementUpdated(el);
        await expect(el.getAttribute('value')).to.equal('abbr');
      });
      it('should correct value with input value', async () => {
        const el = await fixture('<ui-input-field value="abbr"></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-text-field');
        await expect(el.value).to.equal('abbr');
        await expect(input.value).to.equal('abbr');
      });
      it('should reflect value with input value', async () => {
        const el = await fixture('<ui-input-field value="abbr"></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-text-field');
        el.value = 'valg';
        await elementUpdated(el);
        await expect(el.value).to.equal('valg');
        await expect(input.value).to.equal('valg');
      });
    });
    describe('error', () => {
      it('error attribute should not be presented by default', async () => {
        const el = await fixture(textfieldDefault);
        await expect(el.error, 'error').to.be.false;
      });
      it('error attribute should be reflected with property', async () => {
        const el = await fixture(textfieldAttributes);
        await expect(el.error, 'error').to.be.true;
      });
      it('error attribute should be reflected when property value has change', async () => {
        const el = await fixture(textfieldAttributes);
        el.error = false;
        await elementUpdated(el);
        await expect(el.hasAttribute('error')).to.be.false;
      });
      it('show error state when value does not match pattern expression', async () => {
        const el = await fixture('<ui-input-field value="123" pattern="[a-z]{4}"></ui-input-field>');
        await expect(el.error).to.be.true;
      });
      it('set error state when input value does not match pattern expression', async () => {
        const el = await fixture('<ui-input-field pattern="[a-z]"></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-text-field');
        input.value = '12345';
        await elementUpdated(el);
        input.validateInput();
        await expect(el.error).to.be.true;
      });
      it('remove error state when input value does match pattern expression', async () => {
        const el = await fixture('<ui-input-field value="123" pattern="[a-z]{4}"></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-text-field');
        input.value = 'test';
        await elementUpdated(el);
        input.validateInput();
        await expect(el.error).to.be.false;
      });
    });
    describe('warning', () => {
      it('warning attribute should not be presented by default', async () => {
        const el = await fixture(textfieldDefault);
        await expect(el.warning, 'warning').to.be.false;
      });
      it('warning attribute should be reflected with property', async () => {
        const el = await fixture(textfieldAttributes);
        await expect(el.warning, 'warning').to.be.true;;
      });
      it('warning attribute should be reflected when property value has change', async () => {
        const el = await fixture(textfieldAttributes);
        el.warning = false;
        await elementUpdated(el);
        await expect(el.hasAttribute('warning')).to.be.false;
      });
    });
    describe('pattern', () => {
      it('pattern attribute should be empty string by default', async () => {
        const el = await fixture(textfieldDefault);
        await expect(el.pattern).to.equal('', 'pattern');
      });
      it('pattern attribute should be reflected with property', async () => {
        const el = await fixture(textfieldAttributes);
        await expect(el.pattern).to.equal('[a-z]', 'pattern');
      });
      it('pattern attribute should not reflected when property value has change', async () => {
        const el = await fixture(textfieldAttributes);
        el.pattern = '';
        await elementUpdated(el);
        await expect(el.getAttribute('pattern')).to.equal('[a-z]');
      });
    });
    describe('minLength', () => {
      it('minLength attribute should be null by default', async () => {
        const el = await fixture(textfieldDefault);
        await expect(el.minLength, 'minLength').to.be.null;
      });
      it('minLength attribute should be reflected with property', async () => {
        const el = await fixture(textfieldAttributes);
        await expect(el.minLength).to.equal(5, 'minLength');
      });
      it('minLength attribute should not reflected when property value has change', async () => {
        const el = await fixture(textfieldAttributes);
        el.minLength = null;
        await elementUpdated(el);
        await expect(el.hasAttribute('minLength')).to.be.false;
      });
    });
    describe('maxLength', () => {
      it('maxLength attribute should be null by default', async () => {
        const el = await fixture(textfieldDefault);
        await expect(el.maxLength, 'maxLength').to.be.null;
      });
      it('maxLength attribute should be reflected with property', async () => {
        const el = await fixture(textfieldAttributes);
        await expect(el.maxLength).to.equal(10, 'maxLength');
      });
      it('maxLength attribute should not reflected when property value has change', async () => {
        const el = await fixture(textfieldAttributes);
        el.maxLength = null;
        await elementUpdated(el);
        await expect(el.hasAttribute('maxLength')).to.be.false;
      });
    });
    describe('icon', () => {
      it('icon attribute should be null by default', async () => {
        const el = await fixture(textfieldDefault);
        await expect(el.icon, 'icon').to.be.null;
      });
      it('icon attribute should be reflected with property', async () => {
        const el = await fixture(textfieldAttributes);
        await expect(el.icon).to.equal('menu', 'icon');
      });
      it('icon attribute should not reflected when property value has change', async () => {
        const el = await fixture(textfieldAttributes);
        el.icon = null;
        await elementUpdated(el);
        await expect(el.hasAttribute('icon')).to.be.false;
      });
    });
  });

  describe('Events', () => {
    describe('error-changed', () => {
      it('Error-changed from true to false for pattern', async () => {
        const el = await fixture('<ui-input-field pattern="[a-z]" value="1"></ui-input-field>');
        await expect(el.error).to.be.true;
        setTimeout(() => {
          el.value = 'a';
        });
        const { detail } = await oneEvent(el, 'error-changed');
        await expect(detail.value).to.be.false;
        await expect(el.error).to.be.false;
      });

      it('Error-changed from false to true for pattern', async () => {
        const el = await fixture('<ui-input-field></ui-input-field>');
        el.value = '1';
        await elementUpdated(el);
        await expect(el.error).to.be.false;
        setTimeout(() => {
          el.pattern = '[a-z]';
        });
        const { detail } = await oneEvent(el, 'error-changed');
        await expect(el.error).to.be.true;
        await expect(detail.value).to.be.true;
      });
    });

    describe('icon-click', () => {
      it('Icon should not be clickable by default', async () => {
        const el = await fixture('<ui-input-field icon="menu"></ui-input-field>');
        const icon = el.shadowRoot.querySelector('[part=icon]');
        let clickCount = 0;
        el.addEventListener('icon-click', () => {
          clickCount += 1;
        });
        icon.dispatchEvent(new CustomEvent('tap'));
        await expect(clickCount).to.equal(0);
      });
      it('icon-click with icon-has-action', async () => {
        const el = await fixture('<ui-input-field icon="menu" icon-has-action></ui-input-field>');
        const icon = el.shadowRoot.querySelector('[part=icon]');
        let clickCount = 0;
        el.addEventListener('icon-click', () => {
          clickCount += 1;
        });
        icon.dispatchEvent(new CustomEvent('tap'));
        await expect(clickCount).to.equal(1, 'Icon should be clickable');
      });
      it('icon-click with icon-has-action and disabled', async () => {
        const el = await fixture('<ui-input-field icon="menu" icon-has-action disabled></ui-input-field>');
        const icon = el.shadowRoot.querySelector('[part=icon]');
        let clickCount = 0;
        el.addEventListener('icon-click', () => {
          clickCount += 1;
        });
        icon.dispatchEvent(new CustomEvent('tap'));
        await expect(clickCount).to.equal(0, 'Icon should not be clickable when disabled');
      });
      it('icon-click with icon-has-action and press `tab` should not fire event', async () => {
        const el = await fixture('<ui-input-field icon="menu" icon-has-action></ui-input-field>');
        const icon = el.shadowRoot.querySelector('[part=icon]');
        let clickCount = 0;
        el.addEventListener('icon-click', () => {
          clickCount += 1;
        });
        icon.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
        await expect(clickCount).to.equal(0, 'Icon-click event should not be fired');
      });
    });
    describe('value-changed', () => {
      it('should change value and fire value-changed', async () => {
        const el = await fixture('<ui-input-field value="abbr"></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-text-field');
        input.value = 'test';
        await elementUpdated(el);
        setTimeout(() => {
          input.dispatchEvent(new Event('input', {
            bubbles: true,
            cancelable: true
          }));
        });
        const { detail } = await oneEvent(el, 'value-changed');
        await expect(detail.value).to.equal('test');
      });
    });
  });
  describe('Accessibility', () => {
    it('Should pass when `label` was set on component', async () => {
      const el = await fixture('<ui-input-field label="Text Field"></ui-input-field>');
      await expect(el).to.be.accessible();
    });
    it('Should be accessible with `aria-labelledby`', async () => {
      await fixture('<span id="label">Label</label>');
      await fixture('<span id="sub-label">Sub Label</label>');
      const el = await fixture(`<ui-input-field id="txt" aria-labelledby="label sub-label"></ui-input-field>`);
      await expect(el).to.be.accessible();
    });
    it('Should be accessible with `for` attribute on label', async () => {
      await fixture('<label for="text">Text Field</label>');
      const el = await fixture('<ui-input-field id="text"></ui-input-field>');
      await expect(el).to.be.accessible();
    });
    it('Should propagate `aria-description` attribute to input correctly', async () => {
      const el = await fixture('<ui-input-field aria-description="Text Field"></ui-input-field>');

      const input = el.shadowRoot.querySelector('ui-sub-text-field');
      await expect(input.getAttribute('aria-description')).to.be.equal('Text Field');
    });
    it('Should propagate `aria-describedby` attribute to input correctly', async () => {
      const helperMessage = await fixture('<span id="helper-message">Field description</label>');
      const errorMessage = await fixture('<span id="error-message">Error</label>');
      const el = await fixture('<ui-input-field aria-describedby="helper-message error-message"></ui-input-field>');

      const input = el.shadowRoot.querySelector('ui-sub-text-field');
      await expect(input.getAttribute('aria-description')).to.be.equal(`${helperMessage.textContent} ${errorMessage.textContent}`);
    });
  });
});


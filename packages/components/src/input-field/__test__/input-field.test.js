import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/input-field';

describe('ui-input-field', () => {
  describe('DOM Structure', () => {
    it('DOM default is correct', async () => {
      const el = await fixture(`<ui-input-field></ui-input-field>`);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM with type password is correct', async () => {
      const el = await fixture(`<ui-input-field type="password"></ui-input-field>`);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM with type text is correct', async () => {
      const el = await fixture(`<ui-input-field type="text"></ui-input-field>`);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM with label is correct', async () => {
      const el = await fixture(`<ui-input-field label="test"></ui-input-field>`);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Attributes', () => {
    describe('value', () => {
      it('should be not present by default', async () => {
        const el = await fixture(`<ui-input-field></ui-input-field>`);
        await expect(el.hasAttribute('value')).to.be.false;
      });
      it('should reflect to property', async () => {
        const el = await fixture(`<ui-input-field value="abbr"></ui-input-field>`);
        await expect(el.value).to.equal('abbr');
      });
      it('should value propagate to sub-text-field', async () => {
        const el = await fixture('<ui-input-field value="abbr"></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-text-field');

        await expect(input.value).to.equal('abbr');
      });
      it('should value propagate to sub-password-field', async () => {
        const el = await fixture('<ui-input-field type="password" value="abbr"></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-password-field');

        await expect(input.value).to.equal('abbr');
      });
    });
    describe('type', () => {
      it('should be not present by default', async () => {
        const el = await fixture(`<ui-input-field></ui-input-field>`);
        await expect(el.hasAttribute('type')).to.be.false;
      });
      it('should display password-field when set type to password', async () => {
        const el = await fixture(`<ui-input-field type="password" value="abbr"></ui-input-field>`);
        const input = el.shadowRoot.querySelector('ui-sub-password-field');

        await expect(input).to.be.exist;
      });
      it('should display text-field when set type to text', async () => {
        const el = await fixture(`<ui-input-field type="text" value="abbr"></ui-input-field>`);
        const input = el.shadowRoot.querySelector('ui-sub-text-field');

        await expect(input).to.be.exist;
      });
    });
    describe('label', () => {
      it('should be not present by default', async () => {
        const el = await fixture(`<ui-input-field></ui-input-field>`);
        await expect(el.hasAttribute('label')).to.be.false;
      });
      it('should reflect to property', async () => {
        const el = await fixture(`<ui-input-field label="test label"></ui-input-field>`);
        await expect(el.label).to.equal('test label');
      });
      it('should reflect to property when attribute value has change', async () => {
        const el = await fixture(`<ui-input-field label="test label"></ui-input-field>`);
        el.setAttribute('label', 'test')

        await elementUpdated(el);
        await expect(el.label).to.equal('test');
      });
      it('should propagate value to sub-label', async () => {
        const el = await fixture(`<ui-input-field label="test label"></ui-input-field>`);
        const subLabel = el.shadowRoot.querySelector('ui-sub-label');

        await expect(subLabel.innerText.trim()).to.equal('test label');
      });
    });
  });

  describe('Properties', () => {
    describe('value', () => {
      it('should be empty string by default', async () => {
        const el = await fixture(`<ui-input-field></ui-input-field>`);
        await expect(el.value).to.equal('');
      });
      it('should be update when update new value', async () => {
        const el = await fixture(`<ui-input-field value="valg"></ui-input-field>`);
        el.value = 'abbr'

        await elementUpdated(el);
        await expect(el.value).to.equal('abbr');
      });
      it('should not reflect to attribute when property value has change', async () => {
        const el = await fixture(`<ui-input-field value="abbr"></ui-input-field>`);
        el.value = '';
        await elementUpdated(el);
        await expect(el.getAttribute('value')).to.equal('abbr');
      });
      it('should value propagate to sub-text-field', async () => {
        const el = await fixture('<ui-input-field></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-text-field');
        el.value = 'abbr';

        await elementUpdated(el);
        await expect(input.value).to.equal('abbr');
      });
      it('should value propagate to sub-password-field', async () => {
        const el = await fixture('<ui-input-field type="password"></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-password-field');
        el.value = 'abbr';

        await elementUpdated(el);
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
  });

  describe('Events', () => {
    describe('value-changed', () => {
      it('should change value and fire value-changed', async () => {
        const el = await fixture('<ui-input-field value="abbr"></ui-input-field>');
        const input = el.shadowRoot.querySelector('ui-sub-text-field').shadowRoot.querySelector('[part=input');
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
    it('should accessible with default type', async () => {
      const el = await fixture('<ui-input-field label="text"></ui-input-field>');
      await expect(el).to.be.accessible();
    });
    it('should accessible with type password', async () => {
      const el = await fixture('<ui-input-field type="password" label="Password"></ui-input-field>');
      await expect(el).to.be.accessible();
    });
    it('should accessible when `label` was set on component', async () => {
      const el = await fixture('<ui-input-field label="Text Field"></ui-input-field>');
      await expect(el).to.be.accessible();
    });
    it('should accessible with `aria-labelledby`', async () => {
      await fixture('<span id="label">Label</label>');
      await fixture('<span id="sub-label">Sub Label</label>');

      const el = await fixture(`<ui-input-field id="txt" aria-labelledby="label sub-label"></ui-input-field>`);
      await expect(el).to.be.accessible();
    });
    it('should accessible with `for` attribute on label', async () => {
      await fixture('<label for="text">Text Field</label>');
      const el = await fixture('<ui-input-field id="text"></ui-input-field>');

      await expect(el).to.be.accessible();
    });
    it('should propagate `aria-description` attribute to input correctly', async () => {
      const el = await fixture('<ui-input-field aria-description="Text Field"></ui-input-field>');

      const input = el.shadowRoot.querySelector('ui-sub-text-field');
      await expect(input.getAttribute('aria-description')).to.be.equal('Text Field');
    });
    it('should propagate `aria-describedby` attribute to input correctly', async () => {
      const helperMessage = await fixture('<span id="helper-message">Field description</label>');
      const errorMessage = await fixture('<span id="error-message">Error</label>');
      const el = await fixture('<ui-input-field aria-describedby="helper-message error-message"></ui-input-field>');

      const input = el.shadowRoot.querySelector('ui-sub-text-field');
      await expect(input.getAttribute('aria-description')).to.be.equal(`${helperMessage.textContent} ${errorMessage.textContent}`);
    });
  });
});


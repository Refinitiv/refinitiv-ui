import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-password-field';

describe('ui-sub-password-field', () => {
  describe('DOM Structure', () => {
    it('Default DOM is correct', async () => {
      const el = await fixture('<ui-sub-password-field></ui-sub-password-field>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('Show password DOM is correct', async () => {
      const el = await fixture('<ui-sub-password-field></ui-sub-password-field>');
      const eyeIconEl = el.shadowRoot.querySelector('[part~=password-icon]');
      eyeIconEl.click();

      await elementUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Attributes', () => {
    describe('value', () => {
      it('should be not present by default', async () => {
        const el = await fixture(`<ui-sub-password-field></ui-sub-password-field>`);
        await expect(el.hasAttribute('value')).to.be.false;
      });
      it('should propagate value to input ', async () => {
        const el = await fixture(`<ui-sub-password-field value="abbr"></ui-sub-password-field>`);
        const input = el.shadowRoot.querySelector('[part=input]');

        await expect(input.value).to.equal('abbr')
      });
    });
  });

  describe('Properties', () => {
    describe('value', () => {
      it('should be empty string by default', async () => {
        const el = await fixture(`<ui-sub-password-field></ui-sub-password-field>`);
        const input = el.shadowRoot.querySelector('[part=input]');

        await expect(input.value).to.equal('');
        await expect(el.value).to.equal('');
      });
      it('should propagate value to input', async () => {
        const el = await fixture(`<ui-sub-password-field></ui-sub-password-field>`);
        const input = el.shadowRoot.querySelector('[part=input]');
        el.value = 'test';

        await elementUpdated(el);
        await expect(input.value).to.equal('test');
      });
    });
  });

  describe('Events', () => {
    describe('value-changed', () => {
      it('should change value and fire value-changed', async () => {
        const el = await fixture('<ui-sub-password-field value="abbr"></ui-sub-password-field>');
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
        await expect(detail.value).to.equal('test');
      });
    });
  });
});

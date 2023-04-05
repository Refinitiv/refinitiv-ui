import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-text-field';

describe('ui-sub-text-field', () => {
  describe('DOM Structure', () => {
    it('DOM default is correct', async () => {
      const el = await fixture(`<ui-sub-text-field></ui-sub-text-field>`);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Attributes', () => {
    describe('value', () => {
      it('should be not presented by default', async () => {
        const el = await fixture(`<ui-sub-text-field></ui-sub-text-field>`);
        await expect(el.hasAttribute('value')).to.be.false;
      });
      it('should reflect to property', async () => {
        const el = await fixture(`<ui-sub-text-field value="abbr"></ui-sub-text-field>`);
        await expect(el.value).to.equal('abbr');
      });
      it('should propagate value to input', async () => {
        const el = await fixture(`<ui-sub-text-field value="abbr"></ui-sub-text-field>`);
        const input = el.shadowRoot.querySelector('[part=input]');

        await expect(input.value).to.equal('abbr')
      });
    });
  });

  describe('Properties', () => {
    describe('value', () => {
      it('should be empty string by default', async () => {
        const el = await fixture(`<ui-sub-text-field></ui-sub-text-field>`);
        const input = el.shadowRoot.querySelector('[part=input]');

        await expect(input.value).to.equal('');
        await expect(el.value).to.equal('');
      });
      it('should be update when update new value', async () => {
        const el = await fixture(`<ui-sub-text-field value="abbr"></ui-sub-text-field>`);
        el.value = 'test';

        await elementUpdated(el);
        await expect(el.value).to.equal('test');
      });
      it('should propagate value to input', async () => {
        const el = await fixture(`<ui-sub-text-field value="abbr"></ui-sub-text-field>`);
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
        const el = await fixture('<ui-sub-text-field value="abbr"></ui-sub-text-field>');
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


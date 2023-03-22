import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/sub-password-field';

describe('ui-sub-password-field', () => {
  describe('DOM Structure', () => {
    it('Default DOM is correct', async () => {
      const el = await fixture('<ui-sub-password-field></ui-sub-password-field>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });
  it('Can toggle password field', async () => {
    const el = await fixture('<ui-sub-password-field></ui-sub-password-field>');
    const eyeIconEl = el.shadowRoot.querySelector('[part~=icon]');
    eyeIconEl.click();
    await elementUpdated(el);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  describe('Attributes', () => {
    describe('value', () => {
      it('value attribute should be empty string by default', async () => {
        const el = await fixture('<ui-sub-password-field></ui-sub-password-field>');
        await expect(el.value).to.equal('', 'value');
      });
      it('value attribute should be reflected with property', async () => {
        const el = await fixture('<ui-sub-password-field value="abbr"></ui-sub-password-field>');
        await expect(el.value).to.equal('abbr', 'value');
      });
      it('value attribute should not reflected when property value has change', async () => {
        const el = await fixture('<ui-sub-password-field value="abbr"></ui-sub-password-field>');
        el.value = '';
        await elementUpdated(el);
        await expect(el.getAttribute('value')).to.equal('abbr');
      });
      it('should correct value with input value', async () => {
        const el = await fixture('<ui-sub-password-field value="abbr"></ui-sub-password-field>');
        const input = el.shadowRoot.querySelector('[part=input]');
        await expect(el.value).to.equal('abbr');
        await expect(input.value).to.equal('abbr');
      });
      it('should reflect value with input value', async () => {
        const el = await fixture('<ui-sub-password-field value="abbr"></ui-sub-password-field>');
        const input = el.shadowRoot.querySelector('[part=input]');
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

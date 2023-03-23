/* eslint-disable no-console */
import { expect, fixture, html, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/button';

describe('ui-button', () => {
  describe('DOM Structure', () => {
    it('Default DOM is correct', async () => {
      const el = await fixture(html`<ui-button>Button</ui-button>`);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('should be instance of HTMLElement', async () => {
      const el = await fixture(html`<ui-button>Button</ui-button>`);
      expect(el).to.be.instanceOf(HTMLElement);
    });
    it('should have the "Button" string in the textContent field if the slot has the "Button" string', async () => {
      const el = await fixture(html`<ui-button>Button</ui-button>`);
      expect(el.textContent.trim()).to.equal('Button');
    });
    it('should have the empty string if the slot is empty', async () => {
      const el = await fixture(html`<ui-button></ui-button>`);
      expect(el.textContent.trim()).to.equal('');
    });
  });

  describe('Attributes', () => {
    describe('icon-end', () => {
      it('should have the "tick" icon when set the icon-end attribute', async () => {
        const el = await fixture(html`<ui-button icon-end="tick"></ui-button>`);
      });
    });

    describe('variant', () => {
      it('variant attribute should be primary by default', async () => {
        const el = await fixture('<ui-button></ui-button>');
        await expect(el.getAttribute('variant')).to.equal('primary');
      });
    });
  });
  
  describe('Properties', () => {
    describe('icon-end', () => {
      it('should have the "tick" icon when set the icon-end attribute', async () => {
        const el = await fixture(html`<ui-button icon-end="tick"></ui-button>`);
        expect(el.iconEnd).to.equal('tick');
      });
    });
    
    describe('variant', () => {
      it('variant property should be reflected with attribute', async () => {
        const el = await fixture(html`<ui-button variant="secondary"></ui-button>`);
        await expect(el.variant).to.equal('secondary');
      });
    });
  });

  describe('Keyboard', () => {
    if ((/Trident/g).test(navigator.userAgent)) {
      window.KeyboardEvent = class extends Event {
        constructor (type, data) {
          super(type, data);
          this.key = data.key;
        }
      };
    }

    describe('keyup', () => {
      it('should call the keyboard event', async () => {
        const el = await fixture(html`<ui-button></ui-button>`);
        setTimeout(() => el.dispatchEvent(new Event('keyup', { key: 'Backspace' })));
        await oneEvent(el, 'keyup');
      });
    });

    describe('tap', () => {
      it('should be called when tap is dispatched', async () => {
        const el = await fixture(html`<ui-button></ui-button>`);
        setTimeout(() => el.dispatchEvent(new Event('tap')));
        await oneEvent(el, 'tap');
      });
    });

    describe('click', () => {
      it('should call the keyboard event with space or enter', async () => {
        const el = await fixture(html`<ui-button></ui-button>`);
        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })));
        const enterEvent = await oneEvent(el, 'click');
        expect(enterEvent.detail).to.equal(0, 'the clicked enter');
        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' })));
        const spaceEvent = await oneEvent(el, 'click');
        expect(spaceEvent.detail).to.equal(0, 'the clicked space');
      });
    });
  });

  describe('Accessibility', () => {
    it('should not be accessible without label', async () => {
      const el = await fixture(`<ui-button></ui-button>`);
      await expect(el).not.to.be.accessible();
    });
    it('should pass a11y requirement when text content is provided', async () => {
      const el = await fixture(`<ui-button>TEST</ui-button>`);
      await expect(el).to.be.accessible();
    });
    it('should pass a11y requirement when text content and icon-end are provided', async () => {
      const el = await fixture(`<ui-button icon-end="tick">TEST</ui-button>`);
      await expect(el).to.be.accessible();
    });
  });
});

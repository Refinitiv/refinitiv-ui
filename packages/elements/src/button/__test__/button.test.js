/* eslint-disable no-console */
import { expect, fixture, html, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elemental-theme/light/ef-button';

describe('button/Button', () => {
  it('should be created', async () => {
    const el = await fixture(html`<ef-button>Button</ef-button>`);
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('should be instance of HTMLElement', async () => {
    const el = await fixture(html`<ef-button>Button</ef-button>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  describe('Transparent Property', () => {
    it('should set to true if the transparent attribute exists', async () => {
      const el = await fixture(html`<ef-button transparent></ef-button>`);
      expect(el.transparent).to.equal(true);
    });

    it('should set to false if the transparent attribute doesn\'t exist', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      expect(el.transparent).to.equal(false);
    });

    it('should exist if the transparent property sets to true', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      el.transparent = true;
      await elementUpdated(el);
      expect(el.hasAttribute('transparent')).to.exist;
    });
  });

  describe('cta(call-to-action) property', () => {
    it('should set to true if the cta attribute exists', async () => {
      const el = await fixture(html`<ef-button cta></ef-button>`);
      expect(el.cta).to.equal(true);
    });

    it('should set to false if the cta attribute doesn\'t exist', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      expect(el.cta).to.equal(false);
    });

    it('should have cta attribute set to true if the cta property sets to true', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      el.cta = true;
      expect(el.hasAttribute('cta')).to.exist;
    });
  });

  describe('Empty Property', () => {
    it('should set to true if the empty attribute exists', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      expect(el.empty).to.equal(true);
    });

    it('should set to false if the default slot is not empty', async () => {
      const el = await fixture(html`<ef-button>Button</ef-button>`);
      expect(el.empty).to.equal(false);
    });

    it('should set empty to true if set innerHTML to empty', async () => {
      const el = await fixture(html`<ef-button>Button</ef-button>`);
      el.innerHTML = '';
      await elementUpdated(el);
      expect(el.empty).to.equal(true);
    });
  });

  describe('Toggles Property', () => {
    it('should set to true if the toggles attribute exists', async () => {
      const el = await fixture(html`<ef-button toggles></ef-button>`);
      expect(el.toggles).to.equal(true);
    });

    it('should set to false if the toggles attribute doesn\'t exist', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      expect(el.toggles).to.equal(false);
    });

    it('should have attribute set to true if the toggles property sets to true', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      el.toggles = true;
      expect(el.hasAttribute('toggles')).to.exist;
    });
  });

  describe('Active Property', () => {
    it('should set to true if the the active attribute exists', async () => {
      const el = await fixture(html`<ef-button toggles active></ef-button>`);
      expect(el.active).to.equal(true);
    });

    it('should set to false if the active attribute doesn\'t exist', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      expect(el.active).to.equal(false);
    });

    it('should have attribute set to true if the active property sets to true', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      el.active = true;
      await elementUpdated(el);
      expect(el.hasAttribute('active')).to.be.equal(true);
    });
  });

  describe('Textpos Property', () => {
    it('should have default value to "after"', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      expect(el.textpos).to.equal('after');
      expect(el.hasAttribute('textpos')).to.be.exist;
    });

    it('should set to "after" the active attribute sets "after"', async () => {
      const el = await fixture(html`<ef-button textpos="after"></ef-button>`);
      expect(el.textpos).to.equal('after');
    });

    it('should be able to set textpos accordingly', async () => {
      const el = await fixture(html`<ef-button textpos="before"></ef-button>`);
      el.textpos = 'after';
      await elementUpdated(el);

      expect(el.textpos).to.equal('after');
    });
  });

  describe('Icon Properties', () => {
    it('should have the "tick" icon and set the icon property to ef-icon with icon id', async () => {
      const el = await fixture(html`<ef-button icon="tick"></ef-button>`);
      const iconEl = el.shadowRoot.querySelector('#icon');
      expect(iconEl.getAttribute('icon')).to.equal('tick');
    });

    it('should have the "tick" icon and set the icon property to ef-icon with hover-icon id', async () => {
      const el = await fixture(html`<ef-button icon="search" hover-icon="tick"></ef-button>`);
      const iconEl = el.shadowRoot.querySelector('#hover-icon');
      expect(iconEl.getAttribute('icon')).to.equal('tick');
    });
  });

  describe('Default Slot', () => {
    it('should have the "Button" string in the textContent field if the slot has the "Button" string', async () => {
      const el = await fixture(html`<ef-button>Button</ef-button>`);
      expect(el.textContent.trim()).to.equal('Button');
    });

    it('should have the empty string if the slot is empty', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      expect(el.textContent.trim()).to.equal('');
    });
  });

  describe('Toggle Behavior For The Tap Event', () => {
    it('should set the active property to true if the element with toggles attribute is taped', async () => {
      const el = await fixture(html`<ef-button toggles icon="icon.png" hover-icon="hover-icon.png"></ef-button>`);
      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');
      expect(el.active).to.equal(true);
    });

    it('should set the active property to false if the element with toggles and active attributes are taped', async () => {
      const el = await fixture(html`<ef-button toggles active icon="icon.png" hover-icon="hover-icon.png"></ef-button>`);
      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');
      expect(el.active).to.equal(false);
    });

    describe('Role=radio', () => {
      it('should set the active property to true if the element with toggles attribute is taped', async () => {
        const el = await fixture(html`<ef-button toggles role="radio" icon="icon.png" hover-icon="hover-icon.png"></ef-button>`);
        setTimeout(() => el.dispatchEvent(new Event('tap')));
        await oneEvent(el, 'tap');
        expect(el.active).to.equal(true);
      });

      it('should set the active property to false if the element with toggles and active attributes are taped', async () => {
        const el = await fixture(html`<ef-button toggles active role="radio" icon="icon.png" hover-icon="hover-icon.png"></ef-button>`);
        setTimeout(() => el.dispatchEvent(new Event('tap')));
        await oneEvent(el, 'tap');
        expect(el.active).to.equal(false);
      });
    });
  });

  describe('Tap Method', () => {
    if ((/Trident/g).test(navigator.userAgent)) {
      window.KeyboardEvent = class extends Event {
        constructor (type, data) {
          super(type, data);
          this.key = data.key;
        }
      };
    }
    it('should be called when tap is dispatched', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');
    });

    it('should have `pressed` attribute reflected when `tapstart` and removed when `tapend`', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      el.dispatchEvent(new Event('tapstart'));
      await elementUpdated(el);

      expect(el.getAttribute('pressed')).to.equal('');

      el.dispatchEvent(new Event('tapend'));
      await elementUpdated(el);

      expect(el.getAttribute('pressed')).to.equal(null);
    });

    it('should call the keyboard event with space or enter', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);

      setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })));
      const enterEvent = await oneEvent(el, 'click');
      expect(enterEvent.detail).to.equal(0, 'the clicked enter');

      setTimeout(() => el.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' })));
      const spaceEvent = await oneEvent(el, 'click');
      expect(spaceEvent.detail).to.equal(0, 'the clicked space');
    });

    it('should call the keyboard event', async () => {
      const el = await fixture(html`<ef-button></ef-button>`);
      setTimeout(() => el.dispatchEvent(new Event('keyup', { key: 'Backspace' })));
      await oneEvent(el, 'keyup');
    });
  });

  describe('Accessibility', () => {
    it('should not be accessible without label', async () => {
      const el = await fixture(`<ef-button></ef-button>`);
      expect(el).not.to.be.accessible();
    });

    it('should pass a11y requirement when text content is provided', async () => {
      const el = await fixture(`<ef-button>TEST</ef-button>`);
      expect(el).to.be.accessible({
        ignoredRules: ['aria-allowed-attr', 'color-contrast']
      });
    });

    it('should pass a11y requirement when aria-label is provided instead of text content', async () => {
      const el = await fixture(`<ef-button aria-label="Tick Icon" icon="tick"></ef-button>`);
      expect(el).to.be.accessible({
        ignoredRules: ['aria-allowed-attr']
      });
    });

    it('should have aria-pressed="false" when it is not pressed', async () => {
      const el = await fixture(`<ef-button toggles>Toggle</ef-button>`);
      expect(el).to.be.accessible({
        ignoredRules: ['aria-allowed-attr', 'color-contrast']
      });
      await expect(el.getAttribute('aria-pressed')).to.equal('false');
    });

    it('should have aria-pressed="true" when it is pressed', async () => {
      const el = await fixture(`<ef-button toggles active>Toggle</ef-button>`);
      expect(el).to.be.accessible({
        ignoredRules: ['aria-allowed-attr', 'color-contrast']
      });
      await expect(el.getAttribute('aria-pressed')).to.equal('true');
    });

    it('should have aria-pressed instead of aria-checked when button has role="radio"', async () => {
      const el = await fixture(`<ef-button role='radio' toggles></ef-button>`);
      expect(el.hasAttribute('aria-checked')).to.be.true;
      expect(el.hasAttribute('aria-pressed')).to.be.false;
    });
  });
});


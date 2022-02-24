import { elementUpdated, expect, fixture, html, oneEvent, keyboardEvent } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/pill';
import '@refinitiv-ui/elemental-theme/light/ef-pill';

describe('pill/Pill', () => {
  it('Should have correct default Shadow DOM structure', async () => {
    const el = await fixture(html`<ef-pill>Tiger</ef-pill>`);
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Should have correct "clears" Shadow DOM structure', async () => {
    const el = await fixture(html`<ef-pill clears>Tiger</ef-pill>`);
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Should have correct default Light DOM structure for a slot', async () => {
    const el = await fixture(html`<ef-pill>Tiger</ef-pill>`);
    expect(el).lightDom.to.equalSnapshot();
  });

  it('Should have correct "clears" Light DOM structure for a slot', async () => {
    const el = await fixture(html`<ef-pill clears>Tiger</ef-pill>`);
    expect(el).lightDom.to.equalSnapshot();
  });

  it('Should contains the correct structure', async () => {
    const el = await fixture(html`<ef-pill value="tiger">Tiger</ef-pill>`);

    expect(el.textContent.trim()).to.equal('Tiger');
    expect(el.value).to.equal('tiger', 'should be able to get value of value property');
  });

  describe('Test attributes and properties', () => {
    describe('Test toggles property and attribute', () => {
      it('Should be false if the attribute doesn\'t exist', async () => {
        const el = await fixture(html`<ef-pill></ef-pill>`);
        expect(el.toggles).to.equal(false);
        expect(el.hasAttribute('toggles')).to.equal(false);
        expect(el.getAttribute('toggles')).to.equal(null);

        el.toggles = true;
        await elementUpdated(el);

        expect(el.toggles).to.equal(true);
        expect(el.hasAttribute('toggles')).to.equal(true);
        expect(el.getAttribute('toggles')).to.equal('');

      });

      it('Should be true if the attribute exists', async () => {
        const el = await fixture(html`<ef-pill toggles></ef-pill>`);
        expect(el.toggles).to.equal(true);
        expect(el.hasAttribute('toggles')).to.equal(true);
        expect(el.getAttribute('toggles')).to.equal('');

        el.toggles = false;
        await elementUpdated(el);

        expect(el.toggles).to.equal(false);
        expect(el.hasAttribute('toggles')).to.equal(false);
        expect(el.getAttribute('toggles')).to.equal(null);
      });
    });

    describe('Test active property and attribute', () => {
      it('Should be false if the attribute doesn\'t exist', async () => {
        const el = await fixture(html`<ef-pill></ef-pill>`);
        expect(el.active).to.equal(false);
        expect(el.hasAttribute('active')).to.equal(false);
        expect(el.getAttribute('active')).to.equal(null);

        el.active = true;
        await elementUpdated(el);

        expect(el.active).to.equal(true);
        expect(el.hasAttribute('active')).to.equal(true);
        expect(el.getAttribute('active')).to.equal('');

      });

      it('Should be true if the attribute exists', async () => {
        const el = await fixture(html`<ef-pill active></ef-pill>`);
        expect(el.active).to.equal(true);
        expect(el.hasAttribute('active')).to.equal(true);
        expect(el.getAttribute('active')).to.equal('');

        el.active = false;
        await elementUpdated(el);

        expect(el.active).to.equal(false);
        expect(el.hasAttribute('active')).to.equal(false);
        expect(el.getAttribute('active')).to.equal(null);
      });
    });

    describe('Test clears property and attribute', () => {
      it('Should be false if the attribute doesn\'t exist', async () => {
        const el = await fixture(html`<ef-pill></ef-pill>`);
        expect(el.clears).to.equal(false);
        expect(el.hasAttribute('clears')).to.equal(false);
        expect(el.getAttribute('clears')).to.equal(null);

        el.clears = true;
        await elementUpdated(el);

        expect(el.clears).to.equal(true);
        expect(el.hasAttribute('clears')).to.equal(true);
        expect(el.getAttribute('clears')).to.equal('');

      });

      it('Should be true if the attribute exists', async () => {
        const el = await fixture(html`<ef-pill clears></ef-pill>`);
        expect(el.clears).to.equal(true);
        expect(el.hasAttribute('clears')).to.equal(true);
        expect(el.getAttribute('clears')).to.equal('');

        el.clears = false;
        await elementUpdated(el);

        expect(el.clears).to.equal(false);
        expect(el.hasAttribute('clears')).to.equal(false);
        expect(el.getAttribute('clears')).to.equal(null);
      });
    });

    describe('Test pressed property and attribute', () => {
      it('Should be false if the attribute doesn\'t exist', async () => {
        const el = await fixture(html`<ef-pill></ef-pill>`);
        expect(el.pressed).to.equal(false);
        expect(el.hasAttribute('pressed')).to.equal(false);
        expect(el.getAttribute('pressed')).to.equal(null);

        // private property should not be accessed outside class

        // el.pressed = true;
        // await elementUpdated(el);
        //
        // expect(el.pressed).to.equal(true);
        // expect(el.hasAttribute('pressed')).to.equal(true);
        // expect(el.getAttribute('pressed')).to.equal('');

      });

      it('Should be true if the attribute exists', async () => {
        const el = await fixture(html`<ef-pill pressed></ef-pill>`);
        expect(el.pressed).to.equal(true);
        expect(el.hasAttribute('pressed')).to.equal(true);
        expect(el.getAttribute('pressed')).to.equal('');

        // private property should not be accessed outside class

        // el.pressed = false;
        // await elementUpdated(el);
        //
        // expect(el.pressed).to.equal(false);
        // expect(el.hasAttribute('pressed')).to.equal(false);
        // expect(el.getAttribute('pressed')).to.equal(null);
      });
    });
  });

  describe('Test tap event', () => {
    it('Should fire click event when clicked', async () => {
      const el = await fixture(html`<ef-pill></ef-pill>`);

      setTimeout(() => el.dispatchEvent(new Event('tap')));
      const ev = await oneEvent(el, 'tap');

      expect(ev.type).to.equal('tap');
    });

    it('Shouldn\'t change the active property if the toggles property doesn\'t exist', async () => {
      const el = await fixture(html`<ef-pill></ef-pill>`);

      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');

      expect(el.active).to.equal(false);
    });

    it('Should change the active property if the toggles property exists', async () => {
      const el = await fixture(html`<ef-pill toggles></ef-pill>`);

      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');

      expect(el.active).to.equal(true);
      expect(el.hasAttribute('active')).to.equal(true);
    });

    it('Should change the active property if the toggles property exist', async () => {
      const el = await fixture(html`<ef-pill toggles active></ef-pill>`);

      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');

      expect(el.active).to.equal(false);
      expect(el.hasAttribute('active')).to.equal(false);
    });

    it('Should tap the close button', async () => {
      const el = await fixture(html`<ef-pill toggles active clears>Toggles Active</ef-pill>`);
      const closeElement = el.shadowRoot.querySelector('[part="close"]');

      setTimeout(() => closeElement.dispatchEvent(new Event('tap')));
      await oneEvent(closeElement, 'tap');

      expect(el.active).to.equal(true);
      expect(el.clears).to.equal(true);
    });

    it('Should change active state and not change clears state', async () => {
      const el = await fixture(html`<ef-pill toggles active clears>Toggles Active</ef-pill>`);

      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');

      expect(el.active).to.equal(false);
      expect(el.clears).to.equal(true);
    });

    it('Should fire clear event when close button is clicked', async () => {
      const el = await fixture(html`<ef-pill clears value="tiger">Tiger</ef-pill>`);
      const closeElement = el.shadowRoot.querySelector('[part="close"]');

      setTimeout(() => closeElement.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'clear');

      expect(el.active).to.equal(false);
      expect(el.value).to.equal('tiger');
    });

    it('should set pressed to be true on tapstart', async () => {
      const el = await fixture(html`<ef-pill></ef-pill>`);

      setTimeout(() => el.dispatchEvent(new Event('tapstart')));
      await oneEvent(el, 'tapstart');

      expect(el.pressed).to.equal(true, 'pressed property should be true');
    });

    it('should set pressed to be false on tapend', async () => {
      const el = await fixture(html`<ef-pill></ef-pill>`);

      setTimeout(() => el.dispatchEvent(new Event('tapstart')));
      await oneEvent(el, 'tapstart');

      expect(el.pressed).to.equal(true, 'pressed property should be true');

      setTimeout(() => el.dispatchEvent(new Event('tapend')));
      await oneEvent(el, 'tapend');

      expect(el.pressed).to.equal(false, 'pressed property should be false after tapend on pill element');
    });

    it('should set pressed to be false on tapend on `clears` icon', async () => {
      const el = await fixture(html`<ef-pill clears></ef-pill>`);
      const closeElement = el.shadowRoot.querySelector('[part=close]');

      setTimeout(() => el.dispatchEvent(new Event('tapstart')));
      await oneEvent(el, 'tapstart');

      expect(el.pressed).to.equal(true, 'pressed property should be true');

      setTimeout(() => closeElement.dispatchEvent(new Event('tapend', { bubbles: true, composed: true })));
      await oneEvent(el, 'tapend');

      expect(el.pressed).to.equal(false, 'pressed property should be false after tapend on `clears` icon');
    });

    it('should not change pressed property on tapstart to close icon', async () => {
      const el = await fixture(html`<ef-pill clears></ef-pill>`);
      const closeElement = el.shadowRoot.querySelector('[part=close]');

      setTimeout(() => closeElement.dispatchEvent(new Event('tapstart', { bubbles: true, composed: true })));
      await oneEvent(el, 'tapstart');

      expect(el.pressed).to.equal(false, 'pressed property should not be changed to true');
    });

    it('should not change pressed property on tapend if `pressed` was false', async () => {
      const el = await fixture(html`<ef-pill clears></ef-pill>`);

      setTimeout(() => el.dispatchEvent(new Event('tapend')));
      await oneEvent(el, 'tapend');

      expect(el.pressed).to.equal(false, 'pressed property should stay false');
    });
  });

  describe('Accessibility', () => {
    it('should apply aria-pressed when toggle pill is pressed', async () => {
      const el = await fixture(html`<ef-pill toggles></ef-pill>`);

      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');

      expect(el.getAttribute('aria-pressed')).to.equal('true');

      setTimeout(() => el.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'tap');

      expect(el.getAttribute('aria-pressed')).to.equal('false');
    });

    it('aria-pressed should be removed when toggles attribute is removed', async () => {
      const el = await fixture(html`<ef-pill toggles></ef-pill>`);
      el.toggles = false;

      await elementUpdated(el);

      expect(el.getAttribute('aria-pressed')).to.be.null;
    });

    it('should fire clear event when press delete', async () => {
      const el = await fixture(html`<ef-pill clears></ef-pill>`);
      const event = keyboardEvent('keydown', { key: 'Delete' });

      setTimeout(() => el.dispatchEvent(event));
      const ev = await oneEvent(el, 'clear');

      expect(ev.type).to.equal('clear');
    });

  });
});

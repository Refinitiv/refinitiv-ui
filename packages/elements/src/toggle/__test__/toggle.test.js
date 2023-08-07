// import element and theme
import '@refinitiv-ui/elements/toggle';

import '@refinitiv-ui/elemental-theme/light/ef-toggle';
import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

describe('toggle/Toggle', function () {
  describe('DOM Structure', function () {
    it('DOM structure is correct', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('Label DOM structure is correct', async function () {
      const el = await fixture('<ef-toggle label="ON" checked-label="OFF"></ef-toggle>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('Checked Label DOM structure is correct', async function () {
      const el = await fixture('<ef-toggle checked label="ON" checked-label="OFF"></ef-toggle>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Accessiblity', function () {
    let el;
    beforeEach(async function () {
      el = await fixture('<ef-toggle label="ON" checked-label="OFF"></ef-toggle>');
    });

    it('Should failed without any visible text', async function () {
      el = await fixture('<ef-toggle></ef-toggle>');
      await expect(el).not.to.be.accessible();
    });
    it('Should be accessible when custom label is provided', async function () {
      el.label = 'Disable';
      el.checkedLabel = 'Enable';

      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
    it('Should be accessible when aria-label is provided', async function () {
      el = await fixture('<ef-toggle aria-label="Bluetooth"></ef-toggle>');
      await expect(el).to.be.accessible();
    });
    it('Should pass a11y test when in unchecked state', async function () {
      await expect(el).to.be.accessible();
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('Should pass a11y test when in checked state', async function () {
      el.checked = true;

      await elementUpdated(el);
      await expect(el).to.be.accessible();
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('Should pass a11y test when disabled', async function () {
      el.disabled = true;

      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
    it('Should pass a11y test when readonly', async function () {
      el.readonly = true;

      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
  });

  describe('Reflect attribute', function () {
    it('Label', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');
      const label = 'OFF';
      el.label = label;
      await elementUpdated(el);

      expect(el.getAttribute('label')).to.equal(label);
    });
    it('CheckedLabel', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');
      const checkedLabel = 'ON';
      el.checkedLabel = checkedLabel;
      await elementUpdated(el);

      expect(el.getAttribute('checked-label')).to.equal(checkedLabel);
    });
    it('Checked', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');
      el.checked = true;
      await elementUpdated(el);

      expect(el.getAttribute('checked')).to.equal('');
    });
  });

  describe('Checked', function () {
    it('Should be unchecked by default', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');
      expect(el.checked).to.equal(false);
      expect(el.getAttribute('checked')).to.equal(null);
    });
    it('Should be checked when provide attribute checked', async function () {
      const el = await fixture('<ef-toggle checked></ef-toggle>');
      expect(el.checked).to.equal(true);
      expect(el.getAttribute('checked')).to.equal('');
    });
    it('Should be unchecked when provide property checked', async function () {
      const el = await fixture('<ef-toggle checked></ef-toggle>');
      el.checked = false;
      await elementUpdated(el);

      expect(el.checked).to.equal(false);
      expect(el.getAttribute('checked')).to.equal(null);
    });
    it('Should be checked when provide property checked', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');
      el.checked = true;
      await elementUpdated(el);

      expect(el.checked).to.equal(true);
      expect(el.getAttribute('checked')).to.equal('');
    });
  });

  describe('Checked-label', function () {
    it('Should be display label when provide unchecked', async function () {
      const el = await fixture('<ef-toggle label="OFF" checked-label="ON"></ef-toggle>');
      const displayLabel = el.shadowRoot.querySelector('[part=toggle]').innerText;

      expect(el.checked).to.equal(false);
      expect(el.getAttribute('checked')).to.equal(null);
      expect(displayLabel).to.equal(el.label);
    });
    it('Should be display checked-label when provide attribute checked', async function () {
      const el = await fixture('<ef-toggle label="OFF" checked-label="ON" checked></ef-toggle>');
      const displayLabel = el.shadowRoot.querySelector('[part=toggle]').innerText;

      expect(el.checked).to.equal(true);
      expect(el.getAttribute('checked')).to.equal('');
      expect(displayLabel).to.equal(el.checkedLabel);
    });

    it('Should be display label when provide checked property and checked-label attribute is empty', async function () {
      const el = await fixture('<ef-toggle label="OFF" checked-label=""></ef-toggle>');
      el.checked = true;
      await elementUpdated(el);
      const displayLabel = el.shadowRoot.querySelector('[part=toggle]').innerText;

      expect(el.checked).to.equal(true);
      expect(el.getAttribute('checked')).to.equal('');
      expect(displayLabel).to.equal(el.label);
    });

    it('Should be display label when provide attribute checked and checked-label is empty', async function () {
      const el = await fixture('<ef-toggle label="OFF" checked-label="" checked></ef-toggle>');
      const displayLabel = el.shadowRoot.querySelector('[part=toggle]').innerText;

      expect(el.checked).to.equal(true);
      expect(el.getAttribute('checked')).to.equal('');
      expect(displayLabel).to.equal(el.label);
    });
  });

  describe('Event', function () {
    const tapAndWait = async (element) => {
      element.dispatchEvent(new Event('tap'));
      await elementUpdated(element);
    };
    it('Can be checked by tapping', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');

      await tapAndWait(el);
      expect(el.checked).to.equal(true);
    });
    it('Can be unchecked by tapping', async function () {
      const el = await fixture('<ef-toggle checked></ef-toggle>');

      await tapAndWait(el); // checked
      expect(el.checked).to.equal(false);
    });
    it('Should fired checked-changed event on tap', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');

      setTimeout(() => el.dispatchEvent(new Event('tap')));

      const event = await oneEvent(el, 'checked-changed');
      expect(event.target.checked).to.equal(true);
    });
    it('Should not fired checked-changed event setting checked value via property', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');

      let eventFired = false;

      el.addEventListener('checked-changed', () => {
        eventFired = true;
      });

      el.checked = true;

      await elementUpdated(el);

      expect(eventFired).to.equal(false);
      expect(el.checked).to.equal(true);
    });
    it('Should not fired checked-changed event setting checked value via attribute', async function () {
      const el = await fixture('<ef-toggle></ef-toggle>');

      let eventFired = false;

      el.addEventListener('checked-changed', () => {
        eventFired = true;
      });

      el.setAttribute('checked', true);

      await elementUpdated(el);

      expect(eventFired).to.equal(false);
      expect(el.checked).to.equal(true);
      expect(Boolean(el.getAttribute('checked'))).to.equal(true);
    });
  });

  describe('Disabled', function () {
    it('Should not allow tapping and checked value must stay the same', async function () {
      const el = await fixture('<ef-toggle disabled></ef-toggle>');

      expect(el.disabled).to.equal(true);
      expect(el.checked).to.equal(false);

      el.dispatchEvent(new Event('tap'));

      expect(el.checked).to.equal(false);
    });
  });

  describe('Readonly', function () {
    it('Should not allow tapping and checked value must stay the same', async function () {
      const el = await fixture('<ef-toggle readonly></ef-toggle>');

      expect(el.readonly).to.equal(true);
      expect(el.checked).to.equal(false);

      el.dispatchEvent(new Event('tap'));

      expect(el.checked).to.equal(false);
    });
  });

  describe('Enter keypress', function () {
    describe('Checked value & event', function () {
      it('Should toggle checked value', async function () {
        const el = await fixture('<ef-toggle></ef-toggle>');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        expect(el.checked).to.equal(true);
      });
      it('Should fired an checked-changed event on Enter keypress and change checked value', async function () {
        const el = await fixture('<ef-toggle></ef-toggle>');
        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })));
        const event = await oneEvent(el, 'checked-changed');
        expect(event.target.checked).to.equal(true);
      });
    });
    describe('Disabled state', function () {
      it('Should not change checked value on Enter keypress', async function () {
        const el = await fixture('<ef-toggle disabled></ef-toggle>');
        expect(el.disabled).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        expect(el.checked).to.equal(false);
      });
    });
    describe('Readonly state', function () {
      it('Should not change checked value on Enter keypress', async function () {
        const el = await fixture('<ef-toggle readonly></ef-toggle>');
        expect(el.readonly).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        expect(el.checked).to.equal(false);
      });
    });
  });

  describe('Spacebar keypress', function () {
    describe('Checked value & event', function () {
      it('Should toggle checked value', async function () {
        const el = await fixture('<ef-toggle></ef-toggle>');
        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        expect(el.checked).to.equal(true);
      });
      it('Should fired an checked-changed event on Spacebar keypress and change checked value', async function () {
        const el = await fixture('<ef-toggle></ef-toggle>');
        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' })));
        const event = await oneEvent(el, 'checked-changed');
        expect(event.target.checked).to.equal(true);
      });
    });
    describe('Disabled state', function () {
      it('Should not change checked value on Spacebar keypress', async function () {
        const el = await fixture('<ef-toggle disabled></ef-toggle>');
        expect(el.disabled).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        expect(el.checked).to.equal(false);
      });
    });
    describe('Readonly state', function () {
      it('Should not change checked value on Spacebar keypress', async function () {
        const el = await fixture('<ef-toggle readonly></ef-toggle>');
        expect(el.readonly).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        expect(el.checked).to.equal(false);
      });
    });
  });
});

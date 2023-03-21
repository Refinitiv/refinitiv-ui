import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/checkbox';

const createEnterKeyboardEvent = () => new KeyboardEvent('keydown', { key: 'Enter' });
const createSpacebarKeyboardEvent = () => new KeyboardEvent('keydown', { key: ' ' });

describe('checkbox/Checkbox', () => {
  let el;
  const LABEL = 'Checkbox label';

  const query = (q) => {
    return el.shadowRoot.querySelector(q);
  };

  const noLabel = '<ui-checkbox></ui-checkbox>';
  const unchecked = `<ui-checkbox>${LABEL}</ui-checkbox>`;
  const checked = `<ui-checkbox checked>${LABEL}</ui-checkbox>`;
  const disabled = `<ui-checkbox disabled>${LABEL}</ui-checkbox>`;
  const readonly = `<ui-checkbox readonly>${LABEL}</ui-checkbox>`;

  describe('Accessiblity', () => {
    it('should fail without label', async () => {
      const el = await fixture(noLabel);
      await expect(el).not.to.be.accessible();
    });
    it('should pass a11y test with aria-label', async () => {
      const el = await fixture(`<ui-checkbox aria-label="Checkbox without label"></ui-checkbox>`);
      await expect(el).to.be.accessible();
    });
    it('should pass a11y test with slotted label', async () => {
      const el = await fixture(unchecked);
      await expect(el).to.be.accessible();
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('should pass a11y test when in checked state', async () => {
      const el = await fixture(checked);
      await expect(el).to.be.accessible();
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('should pass a11y test when disabled', async () => {
      const el = await fixture(disabled);
      await expect(el).to.be.accessible();
    });
    it('should pass a11y test when readonly', async () => {
      const el = await fixture(readonly);
      await expect(el).to.be.accessible();
    });
  });

  describe('Basic Structure And State', () => {
    it('DOM structure is correct', async () => {
      el = await fixture(unchecked);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('contains the correct label', async () => {
      el = await fixture(unchecked);
      expect(el.textContent.trim()).to.equal(LABEL, 'correct text');
    });
    it('should show label when updated a label with contents', async () => {
      el = await fixture(noLabel);
      el.innerHTML = 'abc';
      await elementUpdated(el);
      expect(el.innerHTML.trim().length).to.not.equal(0);
    });
    it('should in unchecked state', async () => {
      el = await fixture(unchecked);
      expect(el.checked).to.equal(false);
    });
    it('should in checked state', async () => {
      el = await fixture(checked);
      expect(el.checked).to.equal(true);
    });
  });

  describe('Tap Event', () => {
    describe('Check / Unchecked State', () => {
      const tapAndWait = async (elem) => {
        elem.dispatchEvent(new Event('tap'));
        await elementUpdated(el);
      };
      it('can be checked / unchecked by tap on the checkbox', async () => {
        el = await fixture(unchecked);

        await tapAndWait(el);
        expect(el.checked).to.equal(true);
        await tapAndWait(el);
        expect(el.checked).to.equal(false);
      });
      it('can be checked / unchecked by tap on the label of checkbox', async () => {
        el = await fixture(unchecked);
        const checkPart = query('[part=label]');
        checkPart.click();
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
        checkPart.click();
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
      it('should fired a checked-changed event on tap and has the correct value', async () => {
        el = await fixture(unchecked);
        const onChecked = () => el.dispatchEvent(new Event('tap'));
        setTimeout(onChecked);
        const e = await oneEvent(el, 'checked-changed');
        expect(e.target.checked).to.equal(true);
      });
    });

    describe('Disabled State', () => {
      it('should not be able to tap when disabled', async () => {
        el = await fixture(disabled);
        expect(el.disabled).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(new Event('tap'));
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });

    describe('Readonly State', () => {
      it('should not be able to tap when readonly ', async () => {
        el = await fixture(readonly);
        expect(el.readonly).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(new Event('tap'));
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });
  });

  describe('Keypress Enter Event', () => {
    let enterEvent;
    describe('Check / Unchecked State', () => {
      it('should not be able to check when Enter key is pressed', async () => {
        enterEvent = createEnterKeyboardEvent();
        el = await fixture(unchecked);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(enterEvent);
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
      it('should not be able to uncheck when Enter key is pressed', async () => {
        enterEvent = createEnterKeyboardEvent();
        el = await fixture(checked);
        expect(el.checked).to.equal(true);
        el.dispatchEvent(enterEvent);
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
      });
    });

    describe('Disabled State', () => {
      it('should do nothing when Enter key is pressed', async () => {
        enterEvent = createEnterKeyboardEvent();
        el = await fixture(disabled);
        expect(el.disabled).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(enterEvent);
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });

    describe('Readonly State', () => {
      it('should do nothing when Enter key is pressed', async () => {
        enterEvent = createEnterKeyboardEvent();
        el = await fixture(readonly);
        expect(el.readonly).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(enterEvent);
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });
  });

  describe('Keypress Spacebar Event', () => {
    describe('Check / Unchecked State', () => {
      it('can be checked by pressed Spacebar on the checkbox', async () => {
        el = await fixture(unchecked);
        el.dispatchEvent(createSpacebarKeyboardEvent());
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
      });
      it('should fired an checked-changed event on press Spacebar and has the correct value', async () => {
        el = await fixture(unchecked);
        const onChecked = () => el.dispatchEvent(createSpacebarKeyboardEvent());
        setTimeout(onChecked);
        const e = await oneEvent(el, 'checked-changed');
        expect(e.target.checked).to.equal(true);
      });
    });

    describe('Disabled State', () => {
      it('should not be able to press Spacebar when disabled', async () => {
        el = await fixture(disabled);
        expect(el.disabled).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(createSpacebarKeyboardEvent());
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });

    describe('Readonly State', () => {
      it('should not be able to press Spacebar when readonly', async () => {
        el = await fixture(readonly);
        expect(el.readonly).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(createSpacebarKeyboardEvent());
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });
  });

  describe('By Attribute', () => {
    it('should not fired checked-changed event on set / remove Attribute', async () => {
      let isCall = false;
      el = await fixture(unchecked);
      el.addEventListener('checked-changed', () => {
        isCall = true;
      });
      el.setAttribute('checked', true);
      await elementUpdated(el);
      expect(isCall).to.equal(false);
      el.removeAttribute('checked', true);
      await elementUpdated(el);
      expect(isCall).to.equal(false);
    });
    describe('Check / Unchecked State', () => {
      it('can be check / unchecked by attribute', async () => {
        el = await fixture(unchecked);
        el.setAttribute('checked', true);
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
        el.removeAttribute('checked');
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });
  });

  describe('By Property', () => {
    it('should not fired checked-changed event when property changed', async () => {
      let isCall = false;
      el = await fixture(unchecked);
      el.addEventListener('checked-changed', () => {
        isCall = true;
      });
      el.checked = true;
      await elementUpdated(el);
      expect(isCall).to.equal(false);
      el.checked = false;
      await elementUpdated(el);
      expect(isCall).to.equal(false);
    });
    describe('Check / Unchecked State', () => {
      it('can be checked / unchecked by property', async () => {
        el = await fixture(unchecked);
        el.checked = true;
        await elementUpdated(el);
        expect(el.checked).to.equal(true);

        el.checked = false;
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });
  });
});

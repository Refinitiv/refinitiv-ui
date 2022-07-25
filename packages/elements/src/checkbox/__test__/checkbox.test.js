import { fixture, expect, elementUpdated, oneEvent, keyboardEvent, isIE } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/checkbox';
import '@refinitiv-ui/elemental-theme/light/ef-checkbox';

const createEnterKeyboardEvent = () => keyboardEvent('keydown', { key: 'Enter' });
const createSpacebarKeyboardEvent = () => keyboardEvent('keydown', { key: isIE() ? 'Spacebar' : ' ' });

describe('checkbox/Checkbox', () => {
  let el;
  const label = 'Call me label';

  const getStyle = (elem, propName) => {
    return window.getComputedStyle(elem).getPropertyValue(propName);
  };

  const query = (q) => {
    return el.shadowRoot.querySelector(q);
  };

  const noLabel = '<ef-checkbox></ef-checkbox>';
  const unchecked = `<ef-checkbox>${label}</ef-checkbox>`;
  const checked = `<ef-checkbox checked>${label}</ef-checkbox>`;
  const disabled = `<ef-checkbox disabled>${label}</ef-checkbox>`;
  const readonly = `<ef-checkbox readonly>${label}</ef-checkbox>`;
  const indeterminate = `<ef-checkbox indeterminate>${label}</ef-checkbox>`;

  describe('Accessiblity', () => {
    it('should fail without label', async () => {
      const el = await fixture(noLabel);
      expect(el).not.to.be.accessible();
    });
    it('should pass a11y test with aria-label', async () => {
      const el = await fixture(`<ef-checkbox aria-label="Checkbox without label"></ef-checkbox>`);
      expect(el).to.be.accessible();
    });
    it('should pass a11y test with slotted label', async () => {
      const el = await fixture(unchecked);
      expect(el).to.be.accessible();
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('should pass a11y test when in checked state', async () => {
      const el = await fixture(checked);
      expect(el).to.be.accessible();
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('should pass a11y test when in indeterminate state and has aria-checked="mixed"', async () => {
      const el = await fixture(indeterminate);
      expect(el).to.be.accessible();
      expect(el.getAttribute('aria-checked')).to.equal('mixed');
    });
    it('should have aria-checked equals to false when indeterminate changes to false', async () => {
      const el = await fixture(indeterminate);
      el.indeterminate = false;
      await elementUpdated(el);

      expect(el).to.be.accessible();
      expect(el.checked).to.equal(false);
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('should have aria-checked equals to false when checked is set to indeterminate checkbox', async () => {
      const el = await fixture(indeterminate);
      el.checked = true;
      await elementUpdated(el);

      expect(el).to.be.accessible();
      expect(el.checked).to.equal(true);
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('should have aria-checked equals to mixed when indeterminate is set to checked checkbox', async () => {
      const el = await fixture(checked);
      el.indeterminate = true;
      await elementUpdated(el);

      expect(el).to.be.accessible();
      expect(el.checked).to.equal(false);
      expect(el.getAttribute('aria-checked')).to.equal('mixed');
    });
    it('should pass a11y test when disabled', async () => {
      const el = await fixture(disabled);
      expect(el).to.be.accessible();
    });
    it('should pass a11y test when readonly', async () => {
      const el = await fixture(readonly);
      expect(el).to.be.accessible();
    });
  })

  describe('Basic Structure And State', () => {
    it('DOM structure is correct', async () => {
      el = await fixture(unchecked);
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('contains the correct structure', async () => {
      el = await fixture(unchecked);
      expect(query('[part=container]')).to.not.equal(null, 'has container');
      expect(query('[part=check]')).to.not.equal(null, 'has check');
      expect(query('[part=label]')).to.not.equal(null, 'has label');
    });
    it('contains the correct label', async () => {
      el = await fixture(unchecked);
      expect(el.textContent.trim()).to.equal(label, 'correct text');
    });
    it('should have correct value of css class when label is not set', async () => {
      el = await fixture(noLabel);
      expect(window.getComputedStyle(query('[part=label]')).display).to.equal('none');
      expect(el.innerHTML.trim().length).to.equal(0);
    });
    it('should show label when updated a label with contents', async () => {
      el = await fixture(noLabel);
      el.innerHTML = 'abc';
      await elementUpdated(el);
      expect(el.innerHTML.trim().length).to.not.equal(0);
    });
    it('should not has hidden attribute in label part on first load if it has label', async () => {
      el = await fixture(unchecked);
      expect(query('[part=label]').hidden).to.equal(false);
    });
    it('should in unchecked state', async () => {
      el = await fixture(unchecked);
      expect(el.checked).to.equal(false);
    });
    it('should hide a check part in unchecked state', async () => {
      el = await fixture(unchecked);
      const checkPart = query('[part=check]');
      const isHidden = getStyle(checkPart, 'visibility') === 'hidden' || getStyle(checkPart, 'display') === 'none';

      expect(isHidden).to.equal(true);
    });
    it('should in checked state', async () => {
      el = await fixture(checked);
      expect(el.checked).to.equal(true);
    });
    it('should show a check part in checked state', async () => {
      el = await fixture(checked);
      const checkPart = query('[part=check]');
      const isHidden = getStyle(checkPart, 'visibility') === 'hidden' || getStyle(checkPart, 'display') === 'none';

      expect(isHidden).to.equal(false);
    });
    it('should in indeterminate state', async () => {
      el = await fixture(indeterminate);
      expect(el.checked).to.equal(false);
      expect(el.indeterminate).to.equal(true);
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

        await tapAndWait(el); // checked
        expect(el.checked).to.equal(true);
        await tapAndWait(el); // unchecked
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

    describe('Indeterminate state', () => {
      it('should fired an checked-changed event on tap and has correct value', async () => {
        el = await fixture(indeterminate);
        const onChecked = () => el.dispatchEvent(new Event('tap'));
        setTimeout(onChecked);
        const e = await oneEvent(el, 'checked-changed');
        await elementUpdated(el);
        expect(e.target.checked).to.equal(true);
        expect(e.target.indeterminate).to.equal(false);
      });
      it('should changed state from indeterminate to checked on tap', async () => {
        el = await fixture(indeterminate);
        el.dispatchEvent(new Event('tap'));
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(true);
      });
      it('should have a correct state when users tap as indeterminate => checked => unchecked => checked', async () => {
        el = await fixture(indeterminate);
        el.dispatchEvent(new Event('tap'));
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(true);
        el.dispatchEvent(new Event('tap'));
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(new Event('tap'));
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(true);
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
    describe('Indeterminate State', () => {
      it('should not check on Enter key pressed', async () => {
        enterEvent = createEnterKeyboardEvent();
        el = await fixture(indeterminate);
        el.dispatchEvent(enterEvent);
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
        expect(el.indeterminate).to.equal(true);
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
    describe('Indeterminate State', () => {
      it('can be checked by pressed Spacebar on the checkbox', async () => {
        el = await fixture(indeterminate);
        el.dispatchEvent(createSpacebarKeyboardEvent());
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
        expect(el.indeterminate).to.equal(false);
      });
      it('should have a correct state when users press Spacebar as indeterminate => checked => unchecked => checked', async () => {
        const event = createSpacebarKeyboardEvent();

        el = await fixture(indeterminate);
        el.dispatchEvent(event);
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(true);
        el.dispatchEvent(event);
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(event);
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(true);
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
        el.setAttribute('checked', true); // checked
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
        el.removeAttribute('checked'); // unchecked
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });
    describe('Indeterminate State', () => {
      it('should changed state from indeterminate to checked', async () => {
        el = await fixture(indeterminate);
        el.setAttribute('checked', 'true');
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
        expect(el.indeterminate).to.equal(false);
      });
      it('should changed state from checked to indeterminate', async () => {
        el = await fixture(checked);
        el.setAttribute('indeterminate', 'true');
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
        expect(el.indeterminate).to.equal(true);
      });
      it('should have a correct state when set attribute as indeterminate => checked => unchecked => checked', async () => {
        el = await fixture(indeterminate);
        el.setAttribute('checked', 'true');
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(true);
        el.removeAttribute('checked');
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(false);
        el.setAttribute('checked', 'true');
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(true);
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
        const checkPart = query('[part=check]');

        el.checked = true; // checked
        await elementUpdated(el);
        const isChecked = getStyle(checkPart, 'visibility') !== 'hidden' || getStyle(checkPart, 'display') !== 'none';
        expect(isChecked).to.equal(true);

        el.checked = false; // unchecked
        await elementUpdated(el);
        const isUnchecked = getStyle(checkPart, 'visibility') === 'hidden' || getStyle(checkPart, 'display') === 'none';
        expect(isUnchecked).to.equal(true);
      });
    });
    describe('Indeterminate State', () => {
      it('should changed state from indeterminate to checked', async () => {
        el = await fixture(indeterminate);
        el.checked = true;
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
        expect(el.indeterminate).to.equal(false);
      });
      it('should changed state from checked to indeterminate', async () => {
        el = await fixture(checked);
        el.indeterminate = true;
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
        expect(el.indeterminate).to.equal(true);
      });
      it('should have a correct state when property changed as indeterminate => checked => unchecked => checked', async () => {
        el = await fixture(indeterminate);
        el.checked = true;
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(true);
        el.checked = false;
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(false);
        el.checked = true;
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        expect(el.checked).to.equal(true);
      });
      it('should have a correct state when property changed as unchecked => indeterminate => checked => indeterminate', async () => {
        el = await fixture(unchecked);
        el.indeterminate = true;
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
        el.checked = true;
        await elementUpdated(el);
        expect(el.indeterminate).to.equal(false);
        el.indeterminate = true;
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });
  });
});


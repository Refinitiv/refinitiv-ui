import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';
import '@refinitiv-ui/elements/sub-checkbox';

const defaultValues = {
  checked: false,
  disabled: false,
  readonly: false
}
class Expects {
  defaultValues;
  constructor(defaultValues){
    this.defaultValues = defaultValues;
  }
  async properties(el, expectValuess) {
    const defaultExpectValuess = {...this.defaultValues, ...expectValuess};
    for (const [key, value] of Object.entries(defaultExpectValuess)) {
      await expect(el[key]).to.equal(value, `Property '${key}' should be ${value}`);
    }
  }
  async attributes(el, expectValuess) {
    const defaultExpectValuess = {...this.defaultValues, ...expectValuess};
    for (const [key, value] of Object.entries(defaultExpectValuess)) {
      await expect(el.hasAttribute(key)).to.equal(value, `Attribute '${key}' should be ${value}`);
    }
  }
};
const expects = new Expects(defaultValues);


const createEnterKeyboardEvent = () => new KeyboardEvent('keydown', { key: 'Enter' });
const createSpacebarKeyboardEvent = () => new KeyboardEvent('keydown', { key: ' ' });

describe('ds-sub-checkbox', () => {
  const unchecked = `<ds-sub-checkbox></ds-sub-checkbox>`;
  const checked = `<ds-sub-checkbox checked></ds-sub-checkbox>`;
  const disabled = `<ds-sub-checkbox disabled></ds-sub-checkbox>`;
  const disabledChecked = `<ds-sub-checkbox disabled checked></ds-sub-checkbox>`;
  const readonly = `<ds-sub-checkbox readonly></ds-sub-checkbox>`;
  const readonlyChecked = `<ds-sub-checkbox readonly checked></ds-sub-checkbox>`;

  describe('DOM Structure', () => {
    it('DOM default is correct', async () => {
      const el = await fixture(unchecked);
      await expect(el).to.be.accessible();
      await expect(el).to.equalSnapshot();
    });
    it('DOM checked is correct', async () => {
      const el = await fixture(checked);
      await expect(el).to.equalSnapshot();
    });
    it('DOM disabled unchecked is correct', async () => {
      const el = await fixture(disabled);
      await expect(el).to.equalSnapshot();
    });
    it('DOM readonly unchecked is correct', async () => {
      const el = await fixture(readonly);
      await expect(el).to.equalSnapshot();
    });
    it('DOM disabled checked is correct', async () => {
      const el = await fixture(disabledChecked);
      await expect(el).to.equalSnapshot();
    });
    it('DOM readonly checked is correct', async () => {
      const el = await fixture(readonlyChecked);
      await expect(el).to.equalSnapshot();
    });
  });

  describe('Attributes', () => {    
    describe('checked', () => {
      it('Should reflect checked attribute with checked property', async () => {
        const el = await fixture(unchecked);
        await expects.attributes(el, { checked: false });
        el.checked = true;
        await elementUpdated(el);
        await expects.attributes(el, { checked: true});
        el.checked = false;
        await elementUpdated(el);
        await expects.attributes(el, { checked: false });
      });
    });

    describe('disabled', () => {
      it('Should reflect disabled attribute with disabled property', async () => {
        const el = await fixture(unchecked);
        await expects.attributes(el, { disabled: false });
        el.disabled = true;
        await elementUpdated(el);
        await expects.attributes(el, { disabled: true});
        el.disabled = false;
        await elementUpdated(el);
        await expects.attributes(el, { disabled: false });
      });
      it('Should reflect disabled attribute with disabled checked property', async () => {
        const el = await fixture(checked);
        await expects.attributes(el, { disabled: false, checked: true });
        el.disabled = true;
        await elementUpdated(el);
        await expects.attributes(el, { disabled: true, checked: true});
        el.disabled = false;
        await elementUpdated(el);
        await expects.attributes(el, { disabled: false, checked: true });
      });
    });

    describe('readonly', () => {
      it('Should reflect readonly attribute with readonly property', async () => {
        const el = await fixture(unchecked);
        await expects.attributes(el, { readonly: false });
        el.readonly = true;
        await elementUpdated(el);
        await expects.attributes(el, { readonly: true});
        el.readonly = false;
        await elementUpdated(el);
        await expects.attributes(el, { readonly: false });
      });
      it('Should reflect readonly attribute with readonly checked property', async () => {
        const el = await fixture(checked);
        await expects.attributes(el, { readonly: false, checked: true });
        el.readonly = true;
        await elementUpdated(el);
        await expects.attributes(el, { readonly: true, checked: true});
        el.readonly = false;
        await elementUpdated(el);
        await expects.attributes(el, { readonly: false, checked: true });
      });
    });
  });

  describe('Properties', () => {
    describe('checked', () => {
      it('Should reflect checked property with checked attribute', async () => {
        const el = await fixture(unchecked);
        await expects.properties(el, { checked: false });
        el.setAttribute('checked', '');
        await elementUpdated(el);
        await expects.properties(el, { checked: true });
        el.removeAttribute('checked');
        await elementUpdated(el);
        await expects.properties(el, { checked: false });
      });
    });

    describe('disabled', () => {
      it('Should reflect disabled property with disabled attribute', async () => {
        const el = await fixture(unchecked);
        await expects.properties(el, { disabled: false });
        el.setAttribute('disabled', '');
        await elementUpdated(el);
        await expects.properties(el, { disabled: true });
        el.removeAttribute('disabled');
        await elementUpdated(el);
        await expects.properties(el, { disabled: false });
      });
      it('Should reflect disabled property with disabled checked attribute', async () => {
        const el = await fixture(checked);
        await expects.properties(el, { disabled: false, checked: true });
        el.setAttribute('disabled', '');
        await elementUpdated(el);
        await expects.properties(el, { disabled: true, checked: true });
        el.removeAttribute('disabled');
        await elementUpdated(el);
        await expects.properties(el, { disabled: false, checked: true });
      });
    });

    describe('readonly', () => {
      it('Should reflect readonly property with readonly attribute', async () => {
        const el = await fixture(unchecked);
        await expects.properties(el, { readonly: false });
        el.setAttribute('readonly', '');
        await elementUpdated(el);
        await expects.properties(el, { readonly: true });
        el.removeAttribute('readonly');
        await elementUpdated(el);
        await expects.properties(el, { readonly: false });
      });
      it('Should reflect readonly property with readonly checked attribute', async () => {
        const el = await fixture(checked);
        await expects.properties(el, { readonly: false, checked: true });
        el.setAttribute('readonly', '');
        await elementUpdated(el);
        await expects.properties(el, { readonly: true, checked: true });
        el.removeAttribute('readonly');
        await elementUpdated(el);
        await expects.properties(el, { readonly: false, checked: true });
      });
    });
  });

  describe('Events', () => {
    const tapAndWait = async (el) => {
      el.dispatchEvent(new Event('tap'));
      await elementUpdated(el);
    };
    it('Can toggle checked/unchecked when tap on checkbox', async () => {
      const el = await fixture(unchecked);
      await tapAndWait(el);
      expect(el.checked).to.equal(true);
      await tapAndWait(el);
      expect(el.checked).to.equal(false);
    });
  });

  describe('Keyboard', () => {
    describe('Enter', () => {
      let enterEvent = createEnterKeyboardEvent();
        it('Should not toggle unchecked to checked when Enter key is pressed', async () => {
          const el = await fixture(unchecked);
          expect(el.checked).to.equal(false);
          el.dispatchEvent(enterEvent);
          await elementUpdated(el);
          expect(el.checked).to.equal(false);
        });
        it('Should not toggle checked to unchecked when Enter key is pressed', async () => {
          const el = await fixture(checked);
          expect(el.checked).to.equal(true);
          el.dispatchEvent(enterEvent);
          await elementUpdated(el);
          expect(el.checked).to.equal(true);
        });
        it('Should not toggle disabled unchecked to checked when Enter key is pressed', async () => {
          const el = await fixture(disabled);
          expect(el.checked).to.equal(false);
          el.dispatchEvent(enterEvent);
          await elementUpdated(el);
          expect(el.checked).to.equal(false);
        });
        it('Should not toggle readonly unchecked to checked when Enter key is pressed', async () => {
          const el = await fixture(readonly);
          expect(el.checked).to.equal(false);
          el.dispatchEvent(enterEvent);
          await elementUpdated(el);
          expect(el.checked).to.equal(false);
        });
    });
  
    describe('Spacebar', () => {
      it('can be checked by pressed Spacebar on the checkbox', async () => {
        const el = await fixture(unchecked);
        el.dispatchEvent(createSpacebarKeyboardEvent());
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
      });
      it('should fired an checked-changed event on press Spacebar and has the correct value', async () => {
        const el = await fixture(unchecked);
        const onChecked = () => el.dispatchEvent(createSpacebarKeyboardEvent());
        setTimeout(onChecked);
        const e = await oneEvent(el, 'checked-changed');
        expect(e.target.checked).to.equal(true);
      });
      it('should not be able to press Spacebar when disabled', async () => {
        const el = await fixture(disabled);
        expect(el.disabled).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(createSpacebarKeyboardEvent());
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
      it('should not be able to press Spacebar when readonly', async () => {
        const el = await fixture(readonly);
        expect(el.readonly).to.equal(true);
        expect(el.checked).to.equal(false);
        el.dispatchEvent(createSpacebarKeyboardEvent());
        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });
  });
});

import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/checkbox';

const createEnterKeyboardEvent = () => new KeyboardEvent('keydown', { key: 'Enter' });
const createSpacebarKeyboardEvent = () => new KeyboardEvent('keydown', { key: ' ' });

describe('Checkbox', () => {
  let el;
  const LABEL = 'Checkbox label';

  const query = (q) => {
    return el.shadowRoot.querySelector(q);
  };

  const noLabel = '<ds-checkbox></ds-checkbox>';
  const unchecked = `<ds-checkbox>${LABEL}</ds-checkbox>`;
  const checked = `<ds-checkbox checked>${LABEL}</ds-checkbox>`;
  const disabled = `<ds-checkbox disabled>${LABEL}</ds-checkbox>`;
  const readonly = `<ds-checkbox readonly>${LABEL}</ds-checkbox>`;
  const disabledChecked = `<ds-checkbox disabled checked>${LABEL}</ds-checkbox>`;
  const readonlyChecked = `<ds-checkbox readonly checked>${LABEL}</ds-checkbox>`;


  describe('Basic Structure', () => {
    it('default light DOM with no label is correct', async () => {
      el = await fixture(noLabel);
      await expect(el).to.equalSnapshot();
    });
    it('default shadow DOM with no label is correct', async () => {
      el = await fixture(noLabel);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('default light DOM with label is correct', async () => {
      el = await fixture(unchecked);
      await expect(el).to.equalSnapshot();
    });
    it('default shadow DOM with label is correct', async () => {
      el = await fixture(unchecked);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('checked light DOM with label is correct', async () => {
      el = await fixture(checked);
      await expect(el).to.equalSnapshot();
    });
    it('checked shadow DOM with label is correct', async () => {
      el = await fixture(checked);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('disabled light DOM with label is correct', async () => {
      el = await fixture(disabled);
      await expect(el).to.equalSnapshot();
    });
    it('disabled shadow DOM with label is correct', async () => {
      el = await fixture(disabled);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('readonly light DOM with label is correct', async () => {
      el = await fixture(readonly);
      await expect(el).to.equalSnapshot();
    });
    it('readonly shadow DOM with label is correct', async () => {
      el = await fixture(readonly);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('disabled light checked DOM with label is correct', async () => {
      el = await fixture(disabledChecked);
      await expect(el).to.equalSnapshot();
    });
    it('disabled shadow checked DOM with label is correct', async () => {
      el = await fixture(disabledChecked);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('readonly light checked DOM with label is correct', async () => {
      el = await fixture(readonlyChecked);
      await expect(el).to.equalSnapshot();
    });
    it('readonly shadow checked DOM with label is correct', async () => {
      el = await fixture(readonlyChecked);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Attributes', () => {
    describe('checked', () => {
      it('checked attribute should not be presented by default', async () => {
        const el = await fixture(unchecked);
        await expect(el.hasAttribute('checked')).to.be.false;
      });
      it('checked attribute should be reflected with property', async () => {
        const el = await fixture(checked);
        await expect(el.checked).to.be.true;
      });
      it('checked attribute should be reflected when property value has change', async () => {
        const el = await fixture(checked);
        el.checked = false;

        await elementUpdated(el);
        await expect(el.hasAttribute('checked')).to.be.false;
      });
    });

    describe('disabled', () => {
      it('disabled attribute should not be presented by default', async () => {
        const el = await fixture(unchecked);
        await expect(el.hasAttribute('disabled')).to.be.false;
      });
      it('disabled attribute should be reflected with property', async () => {
        const el = await fixture(disabled);
        await expect(el.disabled).to.be.true;
      });
      it('disabled attribute should be reflected when property value has change', async () => {
        const el = await fixture(disabled);
        el.disabled = false;

        await elementUpdated(el);
        await expect(el.hasAttribute('disabled')).to.be.false;
      });
    });

    describe('readonly', () => {
      it('readonly attribute should not be presented by default', async () => {
        const el = await fixture(unchecked);
        await expect(el.hasAttribute('readonly')).to.be.false;
      });
      it('readonly attribute should be reflected with property', async () => {
        const el = await fixture(readonly);
        await expect(el.readonly).to.be.true;
      });
      it('readonly attribute should be reflected when property value has change', async () => {
        const el = await fixture(readonly);
        el.readonly = false;

        await elementUpdated(el);
        await expect(el.hasAttribute('readonly')).to.be.false;
      });
    });
  });

  describe('Events', () => {
      const tapAndWait = async (elem) => {
        elem.dispatchEvent(new Event('tap'));
        await elementUpdated(el);
      };
      it('should be toggle checked / unchecked when tap on checkbox', async () => {
        el = await fixture(unchecked);

        await tapAndWait(el);
        expect(el.checked).to.equal(true);

        await tapAndWait(el);
        expect(el.checked).to.equal(false);
      });
      it('should not be able to tap on checkbox when disabled', async () => {
        el = await fixture(disabled);

        await tapAndWait(el);
        expect(el.checked).to.equal(false);
      });
      it('should not be able to tap on checkbox when readonly ', async () => {
        el = await fixture(readonly);

        await tapAndWait(el);
        expect(el.checked).to.equal(false);
      });
      it('should be toggle checked / unchecked when tap on the label of checkbox', async () => {
        el = await fixture(unchecked);
        const labelPart = query('[part=label]');

        labelPart.click();

        await elementUpdated(el);
        expect(el.checked).to.equal(true);

        labelPart.click();

        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
      it('should not be able checked when tap on the label of disabled checkbox', async () => {
        el = await fixture(disabledChecked);
        const labelPart = query('[part=label]');
        labelPart.click();

        await elementUpdated(el);
        expect(el.checked).to.equal(true);
      });
      it('should not be able unchecked when tap on the label of disabled checkbox', async () => {
        el = await fixture(disabled);
        const labelPart = query('[part=label]');
        labelPart.click();

        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
      it('should not be able checked when tap on the label of readonly checkbox', async () => {
        el = await fixture(readonlyChecked);
        const labelPart = query('[part=label]');
        labelPart.click();

        await elementUpdated(el);
        expect(el.checked).to.equal(true);
      });
      it('should not be able unchecked when tap on the label of readonly checkbox', async () => {
        el = await fixture(readonly);
        const labelPart = query('[part=label]');
        labelPart.click();

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

  describe('Keyboard', () => {
    describe('Enter', () => {
      let enterEvent = createEnterKeyboardEvent();
      it('should not toggle unchecked to checked when Enter key is pressed', async () => {
        const el = await fixture(unchecked);

        el.dispatchEvent(enterEvent);

        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
      it('should not toggle checked to unchecked when Enter key is pressed', async () => {
        const el = await fixture(checked);

        el.dispatchEvent(enterEvent);

        await elementUpdated(el);
        expect(el.checked).to.equal(true);
      });
      it('should not toggle disabled unchecked to checked when Enter key is pressed', async () => {
        const el = await fixture(disabled);

        el.dispatchEvent(enterEvent);

        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
      it('should not toggle readonly unchecked to checked when Enter key is pressed', async () => {
        const el = await fixture(readonly);

        el.dispatchEvent(enterEvent);

        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });

    describe('Spacebar', () => {
      it('should be checked when pressed Spacebar on the checkbox', async () => {
        const el = await fixture(unchecked);
        el.dispatchEvent(createSpacebarKeyboardEvent());

        await elementUpdated(el);
        expect(el.checked).to.equal(true);
      });
      it('should be fired an checked-changed event on press Spacebar and has the correct value', async () => {
        const el = await fixture(unchecked);
        const onChecked = () => el.dispatchEvent(createSpacebarKeyboardEvent());
        setTimeout(onChecked);
        const e = await oneEvent(el, 'checked-changed');

        expect(e.target.checked).to.equal(true);
      });
      it('should not be able to press Spacebar when disabled', async () => {
        const el = await fixture(disabled);

        el.dispatchEvent(createSpacebarKeyboardEvent());

        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
      it('should not be able to press Spacebar when readonly', async () => {
        const el = await fixture(readonly);

        el.dispatchEvent(createSpacebarKeyboardEvent());

        await elementUpdated(el);
        expect(el.checked).to.equal(false);
      });
    });
  });

  describe('Accessibility', () => {
    it('should be failed without label', async () => {
      const el = await fixture(noLabel);
      await expect(el).not.to.be.accessible();
    });
    it('should be passed with aria-label', async () => {
      const el = await fixture(`<ds-checkbox aria-label="Checkbox without label"></ds-checkbox>`);
      await expect(el).to.be.accessible();
    });
    it('should aria-checked should be reflect with checked state', async () => {
      const el = await fixture(checked);
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('should aria-checked should be reflect with unchecked state', async () => {
      const el = await fixture(checked);
      el.checked = false

      await elementUpdated(el);
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('should be passed accessibility check with disabled state', async () => {
      const el = await fixture(disabled);
      await expect(el).to.be.accessible();
    });
    it('should be passed accessibility check with readonly state', async () => {
      const el = await fixture(readonly);
      await expect(el).to.be.accessible();
    });
  });
});

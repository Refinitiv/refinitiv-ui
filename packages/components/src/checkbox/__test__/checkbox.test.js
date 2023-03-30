import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/components/checkbox';

const createEnterKeyboardEvent = () => new KeyboardEvent('keydown', { key: 'Enter' });
const createSpacebarKeyboardEvent = () => new KeyboardEvent('keydown', { key: ' ' });

describe('ui-checkbox', () => {
  let el;
  const LABEL = 'Checkbox label';

  const query = (q) => {
    return el.shadowRoot.querySelector(q);
  };

  const noLabel = '<ui-checkbox></ui-checkbox>';
  const unchecked = `<ui-checkbox>${LABEL}</ui-checkbox>`;
  const checked = `<ui-checkbox checked>${LABEL}</ui-checkbox>`;


  describe('DOM Structure', () => {
    it('default DOM with no label is correct', async () => {
      el = await fixture(noLabel);
      await expect(el).to.equalSnapshot();
    });
    it('default DOM with label is correct', async () => {
      el = await fixture(unchecked);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('checked DOM with label is correct', async () => {
      el = await fixture(checked);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Attributes', () => {
    describe('checked', () => {
      it('should not be presented by default', async () => {
        const el = await fixture(unchecked);
        await expect(el.hasAttribute('checked')).to.be.false;
      });
      it('should be reflected when property value has change', async () => {
        const el = await fixture(checked);
        el.checked = false;

        await elementUpdated(el);
        await expect(el.hasAttribute('checked')).to.be.false;
      });
    });
  });

  describe('Properties', () => {
    describe('checked', () => {
      it('should be reflected with attribute', async () => {
        const el = await fixture(checked);
        await expect(el.checked).to.be.true;
      });
    });
  });

  describe('Events', () => {
      const tapAndWait = async (elem) => {
        elem.dispatchEvent(new Event('tap'));
        await elementUpdated(el);
      };
      it('should toggle checked / unchecked when tap on checkbox', async () => {
        el = await fixture(unchecked);

        await tapAndWait(el);
        expect(el.checked).to.equal(true);

        await tapAndWait(el);
        expect(el.checked).to.equal(false);
      });
      it('should toggle checked / unchecked when tap on the label of checkbox', async () => {
        el = await fixture(unchecked);
        const labelPart = query('[part=label]');

        labelPart.click();

        await elementUpdated(el);
        expect(el.checked).to.equal(true);

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
    });
  });

  describe('Accessibility', () => {
    it('should be failed without label', async () => {
      const el = await fixture(noLabel);
      await expect(el).not.to.be.accessible();
    });
    it('should accessible with aria-label', async () => {
      const el = await fixture(`<ui-checkbox aria-label="Checkbox without label"></ui-checkbox>`);
      await expect(el).to.be.accessible();
    });
    it('should aria-checked reflect with checked state', async () => {
      const el = await fixture(checked);
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
    it('should aria-checked reflect with unchecked state', async () => {
      const el = await fixture(checked);
      el.checked = false

      await elementUpdated(el);
      expect(el.getAttribute('aria-checked')).to.equal(String(el.checked));
    });
  });
});

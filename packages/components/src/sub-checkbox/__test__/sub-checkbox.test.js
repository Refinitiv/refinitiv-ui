import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';
import '@refinitiv-ui/components/sub-checkbox';

const createEnterKeyboardEvent = () => new KeyboardEvent('keydown', { key: 'Enter' });
const createSpacebarKeyboardEvent = () => new KeyboardEvent('keydown', { key: ' ' });

describe('ui-sub-checkbox', () => {
  const unchecked = `<ui-sub-checkbox></ui-sub-checkbox>`;
  const checked = `<ui-sub-checkbox checked></ui-sub-checkbox>`;

  describe('DOM Structure', () => {
    it('default DOM is correct', async () => {
      const el = await fixture(unchecked);
      await expect(el).to.equalSnapshot();
    });
    it('checked DOM is correct', async () => {
      const el = await fixture(checked);
      await expect(el).to.equalSnapshot();
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

  });

  describe('Events', () => {
    it('should fired checked-changed event when tap on unchecked checkbox', async () => {
      const el = await fixture(unchecked);
      setTimeout(() => el.dispatchEvent(new Event('tap')));
      const { detail } = await oneEvent(el, 'checked-changed');
      expect(detail.value).to.be.true;
    });
    it('should fired checked-changed event when tap on checked checkbox', async () => {
      const el = await fixture(checked);
      setTimeout(() => el.dispatchEvent(new Event('tap')));
      const { detail } = await oneEvent(el, 'checked-changed');
      expect(detail.value).to.be.false;
    });
  });

  describe('Keyboard', () => {
    describe('Enter', () => {
      let enterEvent = createEnterKeyboardEvent();
        it('should not toggle unchecked to checked when Enter key is pressed', async () => {
          const el = await fixture(unchecked);
          el.dispatchEvent(enterEvent);
          await elementUpdated(el);
          expect(el.checked).to.be.false;
        });
        it('should not toggle checked to unchecked when Enter key is pressed', async () => {
          const el = await fixture(checked);
          el.dispatchEvent(enterEvent);
          await elementUpdated(el);
          expect(el.checked).to.be.true;
        });
    });

    describe('Spacebar', () => {
      it('should be checked by pressed Spacebar on the unchecked checkbox', async () => {
        const el = await fixture(unchecked);
        el.dispatchEvent(createSpacebarKeyboardEvent());
        await elementUpdated(el);
        expect(el.checked).to.be.true;
      });
      it('should be unchecked by pressed Spacebar on the checked checkbox', async () => {
        const el = await fixture(unchecked);
        el.dispatchEvent(createSpacebarKeyboardEvent());
        await elementUpdated(el);
        expect(el.checked).to.equal(true);
      });
    });
  });
});


















import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';
import '@refinitiv-ui/components/sub-checkbox';

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
    it('default DOM is correct', async () => {
      const el = await fixture(unchecked);
      await expect(el).to.equalSnapshot();
    });
    it('checked DOM is correct', async () => {
      const el = await fixture(checked);
      await expect(el).to.equalSnapshot();
    });
    it('disabled unchecked DOM are correct', async () => {
      const el = await fixture(disabled);
      await expect(el).to.equalSnapshot();
    });
    it('readonly unchecked DOM are correct', async () => {
      const el = await fixture(readonly);
      await expect(el).to.equalSnapshot();
    });
    it('disabled checked DOM are correct', async () => {
      const el = await fixture(disabledChecked);
      await expect(el).to.equalSnapshot();
    });
    it('readonly checked DOM are correct', async () => {
      const el = await fixture(readonlyChecked);
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
    const tapAndWait = async (el) => {
      el.dispatchEvent(new Event('tap'));
      await elementUpdated(el);
    };
    it('can toggle checked/unchecked when tap on checkbox', async () => {
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
      it('should be checked by pressed Spacebar on the checkbox', async () => {
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
});


















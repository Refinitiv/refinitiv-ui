import { fixture, expect, elementUpdated, nextFrame, triggerFocusFor } from '@refinitiv-ui/test-helpers';
import { getOptions, openedUpdated, getData, getMenuEl } from './utils';

import '@refinitiv-ui/components/select';

describe('select/Events', () => {
  describe('opened-changed event is fired only on internal actions', () => {
    it('opened-changed is not fired when opened flag changed externally', async () => {
      const el = await fixture(`<ef-select>${getOptions()}</ef-select>`);
      let counter = 0;
      el.addEventListener('opened-changed', () => {
        counter += 1;
      });

      el.opened = true;
      await openedUpdated(el);
      expect(counter).to.equal(0, 'opened-changed should not fire when opened externally');

      el.opened = false;
      await openedUpdated(el);
      expect(counter).to.equal(0, 'opened-changed should not fire when closed externally');
    });

    it('opened-changed is fired when trigger is pressed', async function () {
      const el = await fixture(`<ef-select>${getOptions()}</ef-select>`);
      await triggerFocusFor(el);
      const trigger = el.shadowRoot.querySelector('#trigger');
      let counter = 0;
      let opened = false;

      el.addEventListener('opened-changed', ({ detail: { value } }) => {
        counter += 1;
        opened = value;
      });

      trigger.dispatchEvent(new CustomEvent('tapstart'));
      await openedUpdated(el);
      expect(counter).to.equal(1, 'opened-changed should fire when trigger has been clicked');
      expect(opened).to.equal(true, 'opened-changed did not pass correct value');

      trigger.dispatchEvent(new CustomEvent('tapstart'));
      await openedUpdated(el);
      expect(counter).to.equal(2, 'opened-changed should fire when trigger has been clicked');
      expect(opened).to.equal(false, 'opened-changed did not pass correct value');
    });

    it('opened-changed is fired on document tap', async () => {
      const el = await fixture(`<ef-select>${getOptions()}</ef-select>`);
      let counter = 0;
      let opened = false;

      el.addEventListener('opened-changed', ({ detail: { value } }) => {
        counter += 1;
        opened = value;
      });

      el.opened = true;
      await openedUpdated(el);
      document.dispatchEvent(new Event('tapstart'));
      await openedUpdated(el);

      expect(counter).to.equal(1, 'opened-changed should fire when document tap event happened');
      expect(opened).to.equal(false, 'opened-changed did not pass correct value');
    });

    it('opened-changed event on item tap', async () => {
      const el = await fixture(`<ef-select>${getOptions(undefined, [1], [2])}</ef-select>`);
      const options = el.querySelectorAll('ef-item');
      let counter = 0;
      let opened = false;

      el.addEventListener('opened-changed', ({ detail: { value } }) => {
        counter += 1;
        opened = value;
      });

      el.opened = true;
      await openedUpdated(el);
      options[0].click(); /* header tap */
      await openedUpdated(el);
      expect(counter).to.equal(0, 'opened-changed should not fire when clicked on header');

      options[1].click(); /* disabled tap */
      await openedUpdated(el);
      expect(counter).to.equal(0, 'opened-changed should not fire when clicked on disabled item');

      options[2].click(); /* readonly tap */
      await openedUpdated(el);
      expect(counter).to.equal(0, 'opened-changed should not fire when clicked on readonly item');

      options[3].click(); /* divider tap */
      await openedUpdated(el);
      expect(counter).to.equal(0, 'opened-changed should not fire when clicked on divider');

      options[4].click();
      await openedUpdated(el);
      expect(counter).to.equal(1, 'opened-changed should fire when clicked on item');
      expect(opened).to.equal(false, 'opened-changed did not pass correct value');
    });

    it('opened-changed event on keyboard pressed', async () => {
      const el = await fixture(`<ef-select>${getOptions()}</ef-select>`);
      el.focus();
      await nextFrame(el);
      let counter = 0;
      let opened = false;

      el.addEventListener('opened-changed', ({ detail: { value } }) => {
        counter += 1;
        opened = value;
      });

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' })); /* random key, do nothing */
      await openedUpdated(el);
      expect(counter).to.equal(0, 'opened-changed should not fire for A key');

      const openEvents = ['Up', 'ArrowUp', 'Down', 'ArrowDown', 'Enter', 'Spacebar', ' '];

      for (let i = 0; i < openEvents.length; i += 1) {
        const key = openEvents[i];
        el.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await openedUpdated(el);
        expect(counter).to.equal(i + 1, `opened-changed should fire for "${key}"`);
        expect(opened).to.equal(true, `opened-changed did not pass correct value for "${key}"`);
        el.opened = false;
        await openedUpdated(el);
      }
    });

    it('opened-changed event on popup keyboard pressed', async () => {
      const el = await fixture(`<ef-select>${getOptions()}</ef-select>`);
      let counter = 0;
      let opened = false;

      el.addEventListener('opened-changed', ({ detail: { value } }) => {
        counter += 1;
        opened = value;
      });

      const closeEvents = ['Esc', 'Escape'];
      for (let i = 0; i < closeEvents.length; i += 1) {
        el.opened = true;
        await openedUpdated(el);
        const key = closeEvents[i];
        document.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await openedUpdated(el);
        expect(counter).to.equal(i + 1, `opened-changed should fire for "${key}"`);
        expect(opened).to.equal(false, `opened-changed did not pass correct value for "${key}"`);
      }
    });

    it('opened-changed event on popup keyboard pressed when item highlighted', async () => {
      const el = await fixture(`<ef-select>${getOptions([1])}</ef-select>`);
      let counter = 0;
      let opened = false;

      el.addEventListener('opened-changed', ({ detail: { value } }) => {
        counter += 1;
        opened = value;
      });

      const closeEvents = [' ', 'Spacebar', 'Enter'];
      for (let i = 0; i < closeEvents.length; i += 1) {
        el.opened = true;
        await openedUpdated(el);
        const key = closeEvents[i];
        getMenuEl(el).dispatchEvent(new KeyboardEvent('keydown', { key }));
        await openedUpdated(el);
        expect(counter).to.equal(i + 1, `opened-changed should fire for "${key}"`);
        expect(opened).to.equal(false, `opened-changed did not pass correct value for "${key}"`);
      }
    });
  });

  describe('value-changed event is fired only on internal actions', () => {
    it('Options: value-changed is not fired when value is set externally', async () => {
      const el = await fixture(`<ef-select>${getOptions()}</ef-select>`);
      const options = el.querySelectorAll('ef-item');
      let counter = 0;

      el.addEventListener('value-changed', () => {
        counter += 1;
      });

      el.value = 'AF';
      await elementUpdated(el);
      expect(counter).to.equal(0, 'value-changed should not fire when value has changed');
      options[1].selected = false; // AF
      options[2].selected = true; // AX

      await elementUpdated(el);
      expect(counter).to.equal(0, 'value-changed should not fire when selected has changed');
    });

    it('Data: value-changed is not fired when value is set externally', async () => {
      const el = await fixture(`<ef-select>${getData()}</ef-select>`);
      let counter = 0;

      el.addEventListener('value-changed', () => {
        counter += 1;
      });
      el.value = 'AF';
      await elementUpdated(el);
      expect(counter).to.equal(0, 'value-changed should not fire when value has changed');
    });

    it('Data: value-changed on mouse and keyboard interactions', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      let counter = 0;
      let changedValue = '';

      const options = el.querySelectorAll('ef-item');

      el.addEventListener('value-changed', ({ detail: { value } }) => {
        counter += 1;
        changedValue = value;
      });

      await openedUpdated(el);

      options[1].click(); // AF
      expect(counter).to.equal(1, 'value-changed should fire when item is clicked on');
      expect(changedValue).to.equal('AF', 'value-changed detail: value should pass the selected value');

      el.opened = true;
      await openedUpdated(el);

      options[1].click(); // AF
      expect(counter).to.equal(1, 'value-changed should not fire when clicked on the same value');

      counter = 0;

      const valueChangedEvents = [' ', 'Spacebar', 'Enter'];
      for (let i = 0; i < valueChangedEvents.length; i += 1) {
        el.value = '';
        el.opened = true;
        await openedUpdated(el);
        el.setItemHighlight(options[1]); // AF
        await nextFrame();
        const key = valueChangedEvents[i];
        getMenuEl(el).dispatchEvent(new KeyboardEvent('keydown', { key }));
        await openedUpdated(el);
        expect(counter).to.equal(i + 1, `value-changed should fire when item selected for "${key}"`);
        expect(changedValue).to.equal('AF', `value-changed detail: value should pass the selected value for "${key}"`);
      }
    });
  });
});

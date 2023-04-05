import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';
import { getMenuEl, getOptions, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/components/select';

describe('ui-select', () => {
  describe('DOM Structure', () => {
    it('default DOM is correct', async () => {
      const el = await fixture('<ui-select></ui-select>');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('DOM with options is correct', async () => {
      const el = await fixture(`<ui-select>${getOptions()}</ui-select>`);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('opened DOM with options is correct', async () => {
      const el = await fixture(`<ui-select opened>${getOptions()}</ui-select>`);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });

  describe('Attributes', () => {
    describe('value', () => {
      it('should not be presented by default', async () => {
        const el = await fixture(`<ui-select opened>${getOptions()}</ui-select>`);
        expect(el.hasAttribute('value')).to.equal(false);
      });
    });
    describe('label', () => {
      it('should be not present by default', async () => {
        const el = await fixture(`<ui-select></ui-select>`);
        await expect(el.hasAttribute('label')).to.be.false;
      });
      it('should reflect to property', async () => {
        const el = await fixture(`<ui-select label="test label"></ui-select>`);
        await expect(el.label).to.equal('test label');
      });
      it('should reflect to property when attribute value has change', async () => {
        const el = await fixture(`<ui-select label="test label"></ui-select>`);
        el.setAttribute('label', 'test')

        await elementUpdated(el);
        await expect(el.label).to.equal('test');
      });
      it('should propagate value to sub-label', async () => {
        const el = await fixture(`<ui-select label="test label"></ui-select>`);
        const subLabel = el.shadowRoot.querySelector('ui-sub-label');

        await expect(subLabel.innerText.trim()).to.equal('test label');
      });
    });
  });

  describe('Properties', () => {
    describe('value', () => {
      it('should not be empty by default', async () => {
        const el = await fixture(`<ui-select opened>${getOptions()}</ui-select>`);
        expect(el.value).to.equal('');
      });
      it('should select correct option when property is set', async () => {
        const el = await fixture(`<ui-select opened>${getOptions()}</ui-select>`);

        el.value = 'AF';
        await openedUpdated(el);

        expect(el.value).to.equal('AF');
        expect(el.querySelector('ui-option[selected]').value).to.equal('AF');
      });
    });
  });

  describe('Event', () => {
    describe('value-changed', () => {
      it('should not be fired when value is set externally', async () => {
        const el = await fixture(`<ui-select>${getOptions()}</ui-select>`);
        const options = el.querySelectorAll('ui-option');
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
      it('should be fired on mouse and keyboard interactions', async () => {
        const el = await fixture(`<ui-select opened>${getOptions()}</ui-select>`);
        let counter = 0;
        let changedValue = '';
  
        const options = el.querySelectorAll('ui-option');
  
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

  describe('Accessibility', () => {
    it('should accessible when popup is not opened', async () => {
      const el = await fixture(`<ui-select label="test label">${getOptions()}</ui-select>`);
      await expect(el).to.be.accessible();
    });
    it('should accessible when popup is opened', async () => {
      const el = await fixture(`<ui-select label="test label" opened>${getOptions()}</ui-select>`);
      await expect(el).to.be.accessible();
    });
    it('should accessible when popup is opened and selected option', async () => {
      const el = await fixture(`<ui-select label="test label" opened>${getOptions()}</ui-select>`);

      el.value = "AF";
      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });
  });
});

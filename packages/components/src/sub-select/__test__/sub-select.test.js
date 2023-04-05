import { fixture, expect, elementUpdated, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';
import { getData, getMenuEl, getOptions, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/components/sub-select';

describe('ui-sub-select', () => {
  describe('DOM Structure', () => {
    it('Empty DOM has all required parts', async () => {
      const el = await fixture('<ui-sub-select></ui-sub-select>');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Lazy Render: options', async () => {
      const el = await fixture(`<ui-sub-select>${getOptions()}</ui-sub-select>`);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('Options Selected: Afghanistan', async () => {
      const el = await fixture(`<ui-sub-select opened>${getOptions()}</ui-sub-select>`);
      el.value = 'AF';
      await openedUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });

  describe('Attributes', () => {
    describe('value', () => {
      it('should not have selected item when change value to empty', async () => {
        const el = await fixture(`<ui-sub-select opened>${getOptions()}</ui-sub-select>`);
        el.value = 'AL';
        await elementUpdated(el);
        el.value = '';
        await elementUpdated(el);
        expect(el.querySelector('ui-option[selected]')).to.equal(null, 'Selected item is not reset');
      });
    });
  });

  describe('Properties', () => {
    describe('value', () => {
      it('should reflect with know value property', async () => {
        const el = await fixture(`<ui-sub-select opened>${getOptions()}</ui-sub-select>`);
        el.value = 'AF';
        await openedUpdated(el);
        expect(el.value).to.equal('AF', 'Value getter does not get correct value');
      });
      it('should reset to empty with unknown value property', async () => {
        const el = await fixture(`<ui-sub-select opened>${getOptions()}</ui-sub-select>`);
        el.value = 'UNKNOWN';
        await elementUpdated(el);
        expect(el.value).to.equal('', 'Unknown value should reset');
      });

      it('Options Selected: Afghanistan', async () => {
        const el = await fixture(`<ui-sub-select opened placeholder="Placeholder">${getOptions([1])}</ui-sub-select>`);
        await openedUpdated(el);
        expect(el.value).to.equal('AF', 'Value is not reflected from selected');
        await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
  
        el.querySelector('ui-option[value=AF]').selected = false;
        el.querySelector('ui-option[value=AL]').selected = true;
        await elementUpdated(el);
        expect(el.value).to.equal('AL', 'Value is not reflected from selected');
  
        el.querySelector('ui-option[value=AL]').selected = false;
        await elementUpdated(el);
        expect(el.value).to.equal('', 'Value is not reset to empty string');
      });
    });
  });

  describe('Events', () => {
    describe('value-changed', () => {
      it('Options: value-changed is fired when value is set internally', async () => {
        const el = await fixture(`<ui-sub-select opened>${getOptions()}</ui-sub-select>`);
        const option = el.querySelectorAll('ui-option')[1]; // AF
        setTimeout(() => option.click());
        await elementUpdated(el);
        const { detail } = await oneEvent(el, 'value-changed');
        expect(detail.value).to.equal('AF');
      });
      it('Options: value-changed is not fired when value is set externally', async () => {
        const el = await fixture(`<ui-sub-select>${getOptions()}</ui-sub-select>`);
        let counter = 0;
        el.addEventListener('value-changed', () => {
          counter += 1;
        });
        el.value = 'AF';
        await elementUpdated(el);
        expect(counter).to.equal(0, 'value-changed should not fire when value has changed');
      });
    });
  });
});

import '@refinitiv-ui/elemental-theme/light/ef-combo-box';
import '@refinitiv-ui/elements/combo-box';
import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import { dispatchCustomEvent, getData, makeQueryRequest, onFocusEl, openedUpdated } from './utils';

describe('combo-box/Interaction', () => {
  describe('Can Open Popup By Different Means', () => {
    it('Tapping on combo-box should open popup', async function () {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      el.data = getData();
      await dispatchCustomEvent(el, 'tapstart');
      await onFocusEl(el);
      await openedUpdated(el);
      expect(el.opened).to.equal(true, 'Tapping on combo-box should open the popup');

      await dispatchCustomEvent(el, 'tapstart');
      await onFocusEl(el);
      await openedUpdated(el);
      expect(el.opened).to.equal(true, 'Tapping on opened combo-box should keep popup open');
    });

    it('Tapping on toggles button should toggle popup', async function () {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await dispatchCustomEvent(el.toggleButtonEl, 'tapstart');
      await onFocusEl(el);
      await openedUpdated(el);
      expect(el.opened).to.equal(true, 'Tapping on toggle button should open the popup');

      await dispatchCustomEvent(el.toggleButtonEl, 'tapstart');
      await onFocusEl(el);
      await openedUpdated(el);
      expect(el.opened).to.equal(false, 'Tapping on toggle button should close the popup');
    });

    it('Tapping on clears button should clear the value', async () => {
      const el = await fixture('<ef-combo-box clears value="AF" lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await dispatchCustomEvent(el.clearsButtonEl, 'tapstart');
      await onFocusEl(el);
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Tapping on clears did not clear the value');
    });

    it('Pressing down key should open popup', async () => {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown'
      });
      el.dispatchEvent(event);
      await openedUpdated(el);
      expect(el.opened).to.equal(true, 'Arrow down should open popup');
    });

    it('Pressing Enter key should open popup', async () => {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      const event = new KeyboardEvent('keydown', {
        key: 'Enter'
      });
      el.dispatchEvent(event);
      await openedUpdated(el);
      expect(el.opened).to.equal(true, 'Enter should open popup');
    });

    it('Pressing up key should open popup', async () => {
      const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp'
      });
      el.dispatchEvent(event);
      await openedUpdated(el);
      expect(el.opened).to.equal(true, 'Arrow up should open popup');
    });
  });

  describe('Can Select Value In The List', () => {
    it('On tap should select value in the list', async function () {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await makeQueryRequest(el, 'Afghanistan');
      const afItem = el.listEl.querySelectorAll('ef-list-item')[1]; // AF, Afghanistan
      await dispatchCustomEvent(afItem, 'tap');
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Tapping on the list did not select the value');
      expect(el.query).to.equal('', 'Tapping on the list did not clear the query');
      expect(el.opened).to.equal(false, 'Tapping on the list did not close the popup');
      expect(el.inputElement.value).to.equal(
        'Afghanistan',
        'Tapping on the list did not set the value of input'
      );
    });
    it('Multiple: on tap should select value in the list', async function () {
      const el = await fixture('<ef-combo-box opened multiple lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await makeQueryRequest(el, 'Al');
      const axItem = el.listEl.querySelectorAll('ef-list-item')[1]; // AX, Aland Islands
      const alItem = el.listEl.querySelectorAll('ef-list-item')[2]; // AL, Albania
      await dispatchCustomEvent(axItem, 'tap');
      await dispatchCustomEvent(alItem, 'tap');
      await openedUpdated(el);
      expect(String(el.values)).to.equal('AX,AL', 'Multiple: tapping on the list did not select the values');
      expect(el.query).to.equal('Al', 'Multiple: tapping on the list should clear a query');
      expect(el.opened).to.equal(true, 'Multiple: tapping on the list should not close the popup');
      expect(el.inputElement.value).to.equal(
        'Al',
        'Multiple: tapping on the list should not clear input value'
      );
      expect(el.shadowRoot.querySelector("[part='selection-badge']").value).to.equal(
        '2',
        'Multiple: counter on the combo-box did not show correct value'
      );
    });
    it('Enter should select a value in the list', async function () {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      const afItem = el.listEl.querySelectorAll('ef-list-item')[1]; // AF, Afghanistan
      dispatchCustomEvent(afItem, 'mousemove');
      await elementUpdated(afItem);
      const event = new KeyboardEvent('keydown', {
        key: 'Enter'
      });
      el.dispatchEvent(event);
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Enter should select an item');
      expect(el.opened).to.equal(false, 'Enter should close popup');
    });
    it('Free text mode allows to type random value', async () => {
      const el = await fixture('<ef-combo-box opened free-text lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await makeQueryRequest(el, 'Free text');
      expect(el.value).to.equal('Free text', 'Value did not change for "Free text"');
    });
  });

  describe('Navigation Keys Work As Expected', () => {
    it('Once the list is open the first item should be highlighted', async function () {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await onFocusEl(el);
      const afItem = el.listEl.querySelector('ef-list-item[highlighted]'); // AF, Afghanistan
      expect(afItem.value).to.equal('AF', 'The first non header item should be highlighted');
    });
    it('Down key should highlight next item', async function () {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await onFocusEl(el);
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown'
      });
      el.dispatchEvent(event);
      await nextFrame();
      const axItem = el.listEl.querySelector('ef-list-item[highlighted]'); // AX, Aland Islands
      expect(axItem.value).to.equal('AX', 'Wrong item is selected');
    });
    it('Up key should highlight previous item', async function () {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await onFocusEl(el);
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp'
      });
      el.dispatchEvent(event);
      await nextFrame();
      const axItem = el.listEl.querySelector('ef-list-item[highlighted]'); // AL, Albania
      expect(axItem.value).to.equal('AL', 'Wrong item is selected');
    });
  });
});

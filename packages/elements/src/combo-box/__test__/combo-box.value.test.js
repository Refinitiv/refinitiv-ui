import { fixture, expect, elementUpdated, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';
import { getData, openedUpdated, snapshotIgnore, makeQueryRequest, dispatchCustomEvent } from './utils';

import '@refinitiv-ui/elements/combo-box';
import '@refinitiv-ui/elemental-theme/light/ef-combo-box';

describe('combo-box/Value', () => {
  describe('Selection by Value Attribute', () => {

    it('Data Selected: Afghanistan', async () => {
      const el = await fixture('<ef-combo-box opened lang="en"></ef-combo-box>');
      el.value = 'AF';
      el.data = getData();
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value getter does not get correct value');
      expect(el.inputElement.value).to.equal('Afghanistan', 'Input is not reflected for AF');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.value = 'AL';
      await elementUpdated(el);
      expect(el.value).to.equal('AL', 'Value is not reflected from selected attribute');
      expect(el.inputElement.value).to.equal('Albania', 'Input is not reflected for AL');
      await nextFrame(); // Safari required extra frame
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.value = '';
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Value is not reflected from selected attribute');
      expect(el.inputElement.value).to.equal('', 'Input is not reflected for ""');
      await nextFrame(); // Safari required extra frame
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Value attribute is selected', async () => {
      const el = await fixture('<ef-combo-box value="AF" opened lang="en"></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value attribute did not reflect to a selected value');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Multiple. Data Selected: Afghanistan, Albania', async () => {
      const el = await fixture('<ef-combo-box multiple opened lang="en"></ef-combo-box>');
      el.data = getData();
      el.values = ['AF', 'AL'];
      await openedUpdated(el);
      expect(String(el.values)).to.equal('AF,AL', 'Values getter does not get correct value');
      expect(el.inputElement.value).to.equal('Afghanistan;  Albania', 'Input is not reflected for AF, AL');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.values = ['AX'];
      await elementUpdated(el);
      await nextFrame(); // Safari required extra frame
      expect(String(el.values)).to.equal('AX', 'Values are not reflected from selected attribute');
      expect(el.inputElement.value).to.equal('Aland Islands', 'Input is not reflected for AX');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.values = [];
      await elementUpdated(el);
      await nextFrame(); // Safari required extra frame
      expect(String(el.values)).to.equal('', 'Values are not reflected from selected attribute');
      expect(el.inputElement.value).to.equal('', 'Input is not reflected for ""');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Free text: Set any value via API', async () => {
      const el = await fixture('<ef-combo-box free-text value="AF" opened lang="en"></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value attribute did not reflect to a selected value');
      el.value = '';
      expect(el.value).to.equal('', 'Value must be empty string');

      // Set free
      await makeQueryRequest(el, 'Free text');
      expect(el.value).to.equal('Free text', 'Value did not change for "Free text"');

      await elementUpdated(el);
      el.value = 'Any';
      expect(el.value).to.equal('Any', 'Value must be "Any" string');
    });

    it('Free text: Set any value via API then select value in the list', async () => {
      // set value via attribute
      const el = await fixture('<ef-combo-box free-text value="attribute" opened lang="en"></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);

      let afItem = el.listEl.querySelectorAll('ef-list-item')[1]; // AF, Afghanistan
      setTimeout(() => dispatchCustomEvent(afItem, 'tap'));

      const attributeEvent = await oneEvent(el, 'value-changed');
      expect(attributeEvent.detail.value).to.equal('AF', `value-changed event's value doesn't equal selected value`);

      // set value via input element
      await makeQueryRequest(el, 'A');

      const axItem = el.listEl.querySelectorAll('ef-list-item')[2]; // AX, AAland Islands
      setTimeout(() => dispatchCustomEvent(axItem, 'tap'));

      const inputEvent = await oneEvent(el, 'value-changed');
      expect(inputEvent.detail.value).to.equal('AX', `value-changed event's value doesn't equal selected value`);

      // set value via property
      // cleanup first
      el.value = '';
      await elementUpdated(el);

      el.value = 'property';

      const alItem = el.listEl.querySelectorAll('ef-list-item')[3]; // AL, Albania
      setTimeout(() => dispatchCustomEvent(alItem, 'tap'));

      const propertyEvent = await oneEvent(el, 'value-changed');
      expect(propertyEvent.detail.value).to.equal('AL', `value-changed event's value doesn't equal selected value`);
    });

    it('Free text: Reset value via API', async () => {
      const el = await fixture('<ef-combo-box free-text value="AF" opened lang="en"></ef-combo-box>');
      el.data = getData();
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value attribute did not reflect to a selected value');
      el.value = '';
      expect(el.value).to.equal('', 'Value must be empty string');

      // Set free
      await makeQueryRequest(el, 'Free text');
      expect(el.value).to.equal('Free text', 'Value did not change for "Free text"');

      await elementUpdated(el);
      el.value = '';
      expect(el.value).to.equal('', 'Value must be empty string when reset value on free text mode');

    });
  });
});

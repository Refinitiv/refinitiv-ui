import { fixture, expect, elementUpdated, oneEvent, nextFrame } from '@refinitiv-ui/test-helpers';
import { getData, openedUpdated, snapshotIgnore } from './utils';

import '@refinitiv-ui/elements/combo-box';
import '@refinitiv-ui/elemental-theme/light/ef-combo-box';

const setInputEl = async (el, textInput) => {
  setTimeout(() => {
    el.inputElement.value = textInput;
    el.inputElement.dispatchEvent(new Event('change', { detail: { value: textInput } }));
  });
  await oneEvent(el, 'query-changed');
  await elementUpdated(el);
};

describe('combo-box/Filter', () => {
  describe('Can Filter Data', () => {
    it('Default filter filters data', async () => {
      const el = await fixture('<ef-combo-box opened></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      const textInput = 'Al';
      await setInputEl(el, textInput);
      await openedUpdated(el);
      expect(el.query).to.equal(textInput, 'Query should be the same as input text: "Al"');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Default filter filters data: changed', async () => {
      const el = await fixture('<ef-combo-box opened></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await setInputEl(el, 'Al');
      expect(el.query).to.equal('Al', 'Query should be the same as input text: "Al"');

      const textInput = 'Aland Islands';
      await setInputEl(el, textInput);
      await openedUpdated(el);
      expect(el.query).to.equal(textInput, 'Query should be the same as input text: "Aland Islands"');
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });
});

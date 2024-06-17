import escapeStringRegexp from 'escape-string-regexp';

import '@refinitiv-ui/elements/combo-box';

import '@refinitiv-ui/elemental-theme/light/ef-combo-box';
import { elementUpdated, expect, fixture, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';

import { getData, snapshotIgnore } from './utils.js';

const setInputEl = async (el, textInput) => {
  setTimeout(() => {
    el.inputElement.value = textInput;
    el.inputElement.dispatchEvent(new Event('change', { detail: { value: textInput } }));
  });
  await oneEvent(el, 'query-changed');
  await elementUpdated(el);
};

describe('combo-box/Filter', function () {
  describe('Can Filter Data', function () {
    it('Default filter filters data', async function () {
      const el = await fixture('<ef-combo-box opened></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await nextFrame(); // needs for IE11
      let textInput = 'Al';
      await setInputEl(el, textInput);
      expect(el.query).to.equal(textInput, 'Query should be the same as input text: "Al"');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);

      textInput = 'Aland Islands';
      await setInputEl(el, textInput);
      expect(el.query).to.equal(textInput, 'Query should be the same as input text: "Aland Islands"');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Should be able to use custom filter function', async function () {
      const el = await fixture('<ef-combo-box opened></ef-combo-box>');
      el.data = getData();
      await elementUpdated(el);
      await nextFrame(); // needs for IE11

      const createCustomFilter = (comboBox) => {
        let query = '';
        let queryRegExp;
        // Items could be filtered with case-insensitive partial match of both labels & values.
        const getRegularExpressionOfQuery = () => {
          if (comboBox.query !== query || !queryRegExp) {
            query = comboBox.query || '';
            queryRegExp = new RegExp(escapeStringRegexp(query), 'i');
          }
          return queryRegExp;
        };
        return (item) => {
          const value = item.value;
          const label = item.label;
          const regex = getRegularExpressionOfQuery();
          const result = regex.test(value) || regex.test(label);
          return result;
        };
      };
      el.filter = createCustomFilter(el);
      const textInput = 'ax';
      await setInputEl(el, textInput);

      expect(el.query).to.equal(textInput, `Query should be the same as input text: "${textInput}"`);
      await expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });
});

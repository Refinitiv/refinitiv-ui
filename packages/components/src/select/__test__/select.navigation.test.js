import { fixture, expect, elementUpdated, aTimeout, nextFrame } from '@refinitiv-ui/test-helpers';
import { getOptions, openedUpdated, getData, getMenuEl } from './utils';

import '@refinitiv-ui/elements/select';
import '@refinitiv-ui/elemental-theme/light/ef-select';

const keyBoardEvent = async (el, key, options = {}) => {
  getMenuEl(el).dispatchEvent(new KeyboardEvent('keydown', Object.assign({ key }, options)));
  await elementUpdated(el);
  await nextFrame();
  await nextFrame();
};

const iterate = async (el, scope, keys = [], highlighted = [], options = {}) => {
  await openedUpdated(el);
  const children = scope.querySelectorAll('ef-item'); // 1, 2, 4 can be selected

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    await keyBoardEvent(el, key, options);
    expect(scope.querySelector('[highlighted]') === children[highlighted[i]]).to.equal(true, `Incorrect item highlighted for nr.${i} ${key}`);
    expect(scope.querySelector('[focused]') === children[highlighted[i]]).to.equal(true, `Incorrect item focused for nr.${i} ${key}`);
  }
};

const emulateMouseMove = async (el, scope) => {
  await openedUpdated(el);
  const children = scope.querySelectorAll('ef-item'); // 1, 2, 4 can be selected

  children[1].dispatchEvent(new MouseEvent('mousemove', {
    bubbles: true
  }));
  await elementUpdated(el);
  expect(scope.querySelector('[highlighted]') === children[1]).to.equal(true, 'First item is highlighted');

  children[2].dispatchEvent(new MouseEvent('mousemove', {
    bubbles: true
  }));
  await elementUpdated(el);
  expect(scope.querySelector('[highlighted]') === children[2]).to.equal(true, 'Second item is highlighted');

  children[0].dispatchEvent(new MouseEvent('mousemove', {
    bubbles: true
  })); // header
  await elementUpdated(el);
  expect(scope.querySelector('[highlighted]') === children[2]).to.equal(true, 'Header cannot be highlighted');
};

describe('select/Navigation', () => {
  describe('Navigation', () => {
    it('Default highlighted', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      await openedUpdated(el);
      expect(el.querySelector('[highlighted]')).to.equal(null, 'No items are highlighted by default');
    });
    it('Options: default highlighted', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      el.value = 'AL';
      await openedUpdated(el);
      expect(el.querySelector('[highlighted]').value).to.equal('AL', 'Selected value should be highlighted by default');
    });
    it('Data: default highlighted', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      el.value = 'AL';
      await openedUpdated(el);
      expect(getMenuEl(el).querySelector('[highlighted]').value).to.equal('AL', 'Selected value should be highlighted by default');
    });
    it('Options: Up key', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      await iterate(el, el, ['Up', 'Up', 'Up', 'Up', 'ArrowUp'], [4, 2, 1, 4, 2]);
    });
    it('Data: Up key', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await iterate(el, getMenuEl(el), ['Up', 'Up', 'Up', 'Up', 'ArrowUp'], [4, 2, 1, 4, 2]);
    });
    it('Options: Down key', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      await iterate(el, el, ['Down', 'Down', 'Down', 'Down', 'ArrowDown'], [1, 2, 4, 1, 2]);
    });
    it('Data: Down key', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await iterate(el, getMenuEl(el), ['Down', 'Down', 'Down', 'Down', 'ArrowDown'], [1, 2, 4, 1, 2]);
    });
    it('Options: Tab key', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      await iterate(el, el, ['Tab', 'Tab', 'Tab', 'Tab'], [1, 2, 4, 1]);
    });
    it('Data: Tab key', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await iterate(el, getMenuEl(el), ['Tab', 'Tab', 'Tab', 'Tab'], [1, 2, 4, 1]);
    });
    it('Options: Shift+Tab key', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      await iterate(el, el, ['Tab', 'Tab', 'Tab', 'Tab'], [4, 2, 1, 4], {
        shiftKey: true
      });
    });
    it('Data: Shift+Tab key', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await iterate(el, getMenuEl(el), ['Tab', 'Tab', 'Tab', 'Tab'], [4, 2, 1, 4], {
        shiftKey: true
      });
    });
    it('Options: Home key', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      await iterate(el, el, ['Tab', 'Tab', 'Home'], [1, 2, 1]);
    });
    it('Data: Home key', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await iterate(el, getMenuEl(el), ['Tab', 'Tab', 'Home'], [1, 2, 1]);
    });
    it('Options: End key', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      await iterate(el, el, ['End'], [4]);
    });
    it('Data: End key', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await iterate(el, getMenuEl(el), ['End'], [4]);
    });
  });

  describe('Mouse Interaction', () => {
    it('Options: Mouse move event highlights the item', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      await emulateMouseMove(el, el);
    });
    it('Date: Mouse move event highlights the item', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await emulateMouseMove(el, getMenuEl(el));
    });
  });

  describe('Quick Search', () => {
    const KEY_SEARCH_DEBOUNCER = 300;

    const emulateQuickSearch = async (el, scope) => {
      await openedUpdated(el);
      const children = scope.querySelectorAll('ef-item'); // 1, 2, 4 can be selected

      await keyBoardEvent(el, 'Shift');
      expect(scope.querySelector('[highlighted]') === null).to.equal(true, 'Quick search should not highlight on special keys');

      await keyBoardEvent(el, 'A');
      expect(scope.querySelector('[highlighted]') === children[1]).to.equal(true, 'Item starting with "A" should be highlighted');

      await keyBoardEvent(el, 'L'); // quick AL for Albania
      await keyBoardEvent(el, 'B'); // quick ALB for Albania
      expect(scope.querySelector('[highlighted]') === children[4]).to.equal(true, 'Item starting with "AL" should be highlighted');

      await aTimeout(KEY_SEARCH_DEBOUNCER);
      await keyBoardEvent(el, 'A'); // re-start search, jump back to first item
      expect(scope.querySelector('[highlighted]') === children[1]).to.equal(true, 'Highlight for quick search should go in rounds');

      await aTimeout(KEY_SEARCH_DEBOUNCER);
      await keyBoardEvent(el, 'A'); // Next A
      expect(scope.querySelector('[highlighted]') === children[2]).to.equal(true, 'Next item matching search criteria should be highlighted');

      await aTimeout(KEY_SEARCH_DEBOUNCER);
      await keyBoardEvent(el, 'B'); // No match
      expect(scope.querySelector('[highlighted]') === children[2]).to.equal(true, 'If there is no match, previous item should stay highlighted');
    };

    it('Options: quick search highlights the item', async () => {
      const el = await fixture(`<ef-select opened>${getOptions()}</ef-select>`);
      await emulateQuickSearch(el, el);
    });

    it('Date: quick search highlights the item', async () => {
      const el = await fixture('<ef-select opened></ef-select>');
      el.data = getData();
      await emulateQuickSearch(el, getMenuEl(el));
    });
  });
});

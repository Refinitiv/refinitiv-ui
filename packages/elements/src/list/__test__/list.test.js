// import element and theme
import '@refinitiv-ui/elements/list';

import '@refinitiv-ui/elemental-theme/light/ef-list';
import { elementUpdated, expect, fixture, nextFrame, triggerFocusFor } from '@refinitiv-ui/test-helpers';
import { CollectionComposer } from '@refinitiv-ui/utils';

import { getItemId } from '../../../lib/list/helpers/item-id.js';

const data = [
  {
    label: 'Hi',
    value: 'hi'
  },
  {
    label: 'Hide',
    value: 'hide',
    hidden: true
  },
  {
    label: 'Bye',
    value: 'bye'
  },
  {
    label: 'Sigh',
    value: 'sigh'
  },
  {
    label: 'Why',
    value: 'why',
    selected: true
  },
  {
    label: 'Lie',
    value: 'lie',
    tooltip: 'No lies please'
  },
  {
    label: 'Cry',
    value: 'cry',
    disabled: true
  }
];

const iterateKeyboardEvent = async (el, scope, keys = [], highlighted = []) => {
  const children = scope.querySelectorAll('ef-list-item'); // 0, 1, 2, 3, 4 can be selected
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    el.dispatchEvent(new KeyboardEvent('keydown', { key: key }));
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();

    expect(el.querySelector('[highlighted]') === children[highlighted[i]]).to.equal(
      true,
      'Incorrect item highlighted'
    );
  }
};

// TODO: Actually test results. These are just placeholders for coverage.

describe('list/List', function () {
  describe('Label and DOM structure is correct', function () {
    it('Light DOM', async function () {
      const el = await fixture('<ef-list></ef-list>');
      await expect(el).dom.to.equalSnapshot();
    });
    it('Shadow DOM', async function () {
      const el = await fixture('<ef-list></ef-list>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  it('Sets default value to be an empty string', async function () {
    const el = await fixture('<ef-list></ef-list>');
    expect(el.value).to.equal('');
  });

  describe('Supports setting a data array', function () {
    it('Light DOM', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await expect(el).dom.to.equalSnapshot();
    });
    it('Shadow DOM', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Supports setting a data composer', function () {
    it('Light DOM', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = new CollectionComposer(data);
      await expect(el).dom.to.equalSnapshot();
    });
    it('Shadow DOM', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = new CollectionComposer(data);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Supports setting null data', function () {
    it('Light DOM', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = null;
      await expect(el).dom.to.equalSnapshot();
    });
    it('Shadow DOM', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = null;
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  it('Supports switching data between different types', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    el.data = new CollectionComposer(data);
    el.data = null;
  });

  it('Supports toggling hidden items', async function () {
    const el = await fixture('<ef-list></ef-list>');
    const composer = new CollectionComposer(data);
    el.data = composer;
    await elementUpdated(el);
    composer.setItemPropertyValue(data[0], 'hidden', true);
    await elementUpdated(el);
    composer.setItemPropertyValue(data[0], 'hidden', false);
    await elementUpdated(el);
  });

  it('Supports custom renderers', async function () {
    const el = await fixture('<ef-list></ef-list>');
    const composer = new CollectionComposer(data);
    el.renderer = () => document.createElement('div');
    el.data = composer;
    await elementUpdated(el);
    composer.setItemPropertyValue(data[0], 'selected', true);
    await elementUpdated(el);
  });

  describe('Supports key control', function () {
    it('Keypress Up/ArrowUp event', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await elementUpdated(el);
      await iterateKeyboardEvent(el, el, ['ArrowUp', 'ArrowUp', 'ArrowUp'], [0, 4, 3]);
    });

    it('Keypress Down/ArrowDown event', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await elementUpdated(el);
      await iterateKeyboardEvent(el, el, ['ArrowDown', 'ArrowDown', 'ArrowDown'], [0, 1, 2]);
    });

    it('Keypress Down should loop back to the first item', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await elementUpdated(el);
      await iterateKeyboardEvent(
        el,
        el,
        ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown'],
        [0, 1, 2, 3, 4, 0]
      );
    });

    it('Keypress Home event', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await elementUpdated(el);
      await iterateKeyboardEvent(el, el, ['ArrowDown', 'ArrowDown', 'Home'], [0, 1, 0]);
    });

    it('Keypress End event', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await elementUpdated(el);

      await iterateKeyboardEvent(el, el, ['ArrowDown', 'End'], [0, 4]);
    });

    it('Keypress Enter event', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await elementUpdated(el);

      await iterateKeyboardEvent(el, el, ['ArrowDown', 'ArrowDown', 'Enter'], [0, 1, 1]);
      expect(el.value).to.equal('bye');
    });

    it('Keypress Spacebar event', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await elementUpdated(el);

      await iterateKeyboardEvent(el, el, ['ArrowDown', 'ArrowDown', ' '], [0, 1, 1]);
      expect(el.value).to.equal('bye');
    });

    it("Keypress ' ' event", async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await elementUpdated(el);

      await iterateKeyboardEvent(el, el, ['ArrowDown', 'ArrowDown', ' '], [0, 1, 1]);
      expect(el.value).to.equal('bye');
    });

    it('Keypress not match any event', async function () {
      const el = await fixture('<ef-list></ef-list>');
      el.data = data;
      await elementUpdated(el);

      await iterateKeyboardEvent(el, el, ['ArrowDown', 'ArrowDown', 'x'], [0, 1, 1]);
    });
  });

  describe('Item id', function () {
    it('Should combine prefix and value', function () {
      const prefix = 'prefix';
      const value = 'value';
      const id = getItemId(prefix, value);
      expect(id).to.equal(`${prefix}-${value}`);
    });
    it('Should return empty string when either parameter is invalid', function () {
      const prefix = 'prefix';
      const value = '';
      const id = getItemId(prefix, value);
      expect(id).to.equal('');
    });
  });

  it('Supports setting value via property', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    el.value = 'hi';
    await elementUpdated(el);
    expect(el.queryItemsByPropertyValue('selected', true)[0]).to.equal(data[0]);
  });

  it('Should always have first values array as value', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    el.values = ['hi', 'bye'];
    await elementUpdated(el);
    expect(el.value).to.equal(data[0].value);
  });

  it('Supports setting values via property', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    el.values = ['hi'];
    await elementUpdated(el);
    expect(el.queryItemsByPropertyValue('selected', true)[0]).to.equal(data[0]);
  });

  it('Should reset values to empty array when values set are not array', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    el.values = 'hi';
    await elementUpdated(el);
    expect(JSON.stringify(el.values)).to.equal(JSON.stringify([]));
  });

  it('Supports setting values via property (multiple)', async function () {
    const el = await fixture('<ef-list multiple></ef-list>');
    el.data = data;
    el.values = ['hi', 'bye'];
    await elementUpdated(el);
    expect(el.queryItemsByPropertyValue('selected', true)[0]).to.equal(data[0]);
  });

  it('Handles list being tapped (not list item)', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.click();
  });

  it('Sets value when item is tapped', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.querySelector('ef-list-item').click();
    await elementUpdated(el);
    el.querySelector('ef-list-item').appendChild(document.createElement('div')).click();
  });

  it('Should update the component when composer data changes', async function () {
    const el = await fixture('<ef-list></ef-list>');
    const composer = new CollectionComposer(data);
    el.data = composer;
    await elementUpdated(el);
    composer.setItemPropertyValue(data[0], 'selected', true);
    await elementUpdated(el);
  });

  it('Supports scrolling to unknown elements', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.scrollToItem(null);
  });

  it('Supports scrolling into view', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.style.height = '40px';
    el.data = data;
    await elementUpdated(el);
    el.scrollToItem(data[6]);
    el.scrollToItem(data[0]);
  });

  it('Supports selecting an item', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.selectItem(data[2]);
    expect(el.value).to.be.equal(data[2].value);
  });

  it('Supports selecting items in multiple mode', async function () {
    const el = await fixture('<ef-list multiple></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.selectItem(data[2]);
    el.selectItem(data[3]);
    expect(JSON.stringify(el.values)).to.be.equal(
      JSON.stringify([data[2].value, data[3].value, data[4].value])
    );
  });

  it('Highlights on mousemove', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.querySelector('ef-list-item').dispatchEvent(new Event('mousemove', { bubbles: true }));
  });

  it('Supports programmatic navigation', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.up();
    await elementUpdated(el);
    el.down();
    await elementUpdated(el);
  });

  it('Supports multiple selection mode', async function () {
    const el = await fixture('<ef-list multiple></ef-list>');
    el.data = data;
    expect(el.multiple).to.be.true;
  });

  it('Supports reusing dom elements', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = new CollectionComposer(data);
    await elementUpdated(el);
    el.data.setItemPropertyValue(data[2], 'hidden', true);
    el.data.setItemPropertyValue(data[1], 'hidden', false);
    await elementUpdated(el);
  });

  it('Should have focus state remain at host when tapping in an item', async function () {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);

    const firstElement = el.firstElementChild;
    await triggerFocusFor(el);

    firstElement.click();

    expect(document.activeElement).to.be.equal(el);
  });
});

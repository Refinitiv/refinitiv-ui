import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/list';
import '@refinitiv-ui/elemental-theme/light/ef-list';

import { CollectionComposer } from '@refinitiv-ui/utils';

const data = [{
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
}];

// TODO: Actually test results. These are just placeholders for coverage.

describe('list/List', () => {

  it('Label and DOM structure is correct', async () => {
    const el = await fixture('<ef-list></ef-list>');
    expect(el).to.equalSnapshot();
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Sets default value to be an empty string', async () => {
    const el = await fixture('<ef-list></ef-list>');
    expect(el.value).to.equal('');
  });

  it('Supports setting a data array', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    expect(el).to.equalSnapshot();
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Supports setting a data composer', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = new CollectionComposer(data);
    expect(el).to.equalSnapshot();
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Supports setting null data', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = null;
    expect(el).to.equalSnapshot();
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Supports switching data between different types', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    el.data = new CollectionComposer(data);
    el.data = null;
  });

  it('Supports toggling hidden items', async () => {
    const el = await fixture('<ef-list></ef-list>');
    const composer = new CollectionComposer(data);
    el.data = composer;
    await elementUpdated(el);
    composer.setItemPropertyValue(data[0], 'hidden', true);
    await elementUpdated(el);
    composer.setItemPropertyValue(data[0], 'hidden', false);
    await elementUpdated(el);
  });

  it('Supports custom renderers', async () => {
    const el = await fixture('<ef-list></ef-list>');
    const composer = new CollectionComposer(data);
    el.renderer = () => document.createElement('div');
    el.data = composer;
    await elementUpdated(el);
    composer.setItemPropertyValue(data[0], 'selected', true);
    await elementUpdated(el);
  });

  it('Supports key control', async () => {
    const el = await fixture('<ef-list></ef-list>');
    const KeyboardEvent = (/trident/i).test(navigator.userAgent) ? window.Event : window.KeyboardEvent;
    el.data = data;
    await elementUpdated(el);
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Up'
    }));
    await elementUpdated(el);
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'ArrowUp'
    }));
    await elementUpdated(el);
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Down'
    }));
    await elementUpdated(el);
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'ArrowDown'
    }));
    await elementUpdated(el);
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: ' '
    }));
    await elementUpdated(el);
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter'
    }));
    await elementUpdated(el);
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Spacebar'
    }));
    await elementUpdated(el);
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'x'
    }));
  });

  it('Supports setting value via property', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    el.value = 'hi';
    await elementUpdated(el);
    expect(el.queryItemsByPropertyValue('selected', true)[0]).to.equal(data[0]);
  });

  it('Supports setting values via property', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    el.values = ['hi'];
    await elementUpdated(el);
    expect(el.queryItemsByPropertyValue('selected', true)[0]).to.equal(data[0]);
  });

  it('Supports setting values via property (multiple)', async () => {
    const el = await fixture('<ef-list multiple></ef-list>');
    el.data = data;
    el.values = ['hi', 'bye'];
    await elementUpdated(el);
    expect(el.queryItemsByPropertyValue('selected', true)[0]).to.equal(data[0]);
  });

  it('Handles list being tapped (not list item)', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.click();
  });

  it('Sets value when item is tapped', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.querySelector('ef-item').click();
    await elementUpdated(el);
    el.querySelector('ef-item').appendChild(document.createElement('div')).click();
  });

  it('Should update the component when composer data changes', async () => {
    const el = await fixture('<ef-list></ef-list>');
    const composer = new CollectionComposer(data);
    el.data = composer;
    await elementUpdated(el);
    composer.setItemPropertyValue(data[0], 'selected', true);
    await elementUpdated(el);
  });

  it('Supports scrolling to unknown elements', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.scrollToItem(null);
  });

  it('Supports scrolling into view', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.style.height = '40px';
    el.data = data;
    await elementUpdated(el);
    el.scrollToItem(data[6]);
    el.scrollToItem(data[0]);
  });

  it('Highlights on mousemove', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.querySelector('ef-item').dispatchEvent(new Event('mousemove', { bubbles: true }));
  });

  it('Supports programmatic navigation', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = data;
    await elementUpdated(el);
    el.up();
    await elementUpdated(el);
    el.down();
    await elementUpdated(el);
  });

  it('Supports multiple selection mode', async () => {
    const el = await fixture('<ef-list multiple></ef-list>');
    el.data = data;
    expect(el.multiple).to.be.true;
  });

  it('Supports reusing dom elements', async () => {
    const el = await fixture('<ef-list></ef-list>');
    el.data = new CollectionComposer(data);
    await elementUpdated(el);
    el.data.setItemPropertyValue(data[1], 'hidden', false);
    await elementUpdated(el);
  });
});


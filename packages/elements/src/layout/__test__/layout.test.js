import {
  fixture,
  assert,
  expect,
  aTimeout,
  oneEvent,
  elementUpdated,
  waitUntil
} from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/layout';
import '@refinitiv-ui/elemental-theme/light/ef-layout.js';

describe('layout/Layout', function () {
  const defaultLayout = '<ef-layout></ef-layout>';
  const flexLayout = '<ef-layout flex></ef-layout>';
  const noflexLayout = '<ef-layout noflex></ef-layout>';
  const containerLayout = '<ef-layout container></ef-layout>';
  const flexContainerLayout = '<ef-layout flex container></ef-layout>';
  const flexNowrapLayout = '<ef-layout flex nowrap></ef-layout>';
  const scrollingLayout = '<ef-layout scrollable></ef-layout>';
  const minWidthLayout = '<ef-layout min-width="200px"></ef-layout>';
  const maxWidthLayout = '<ef-layout max-width="200px"></ef-layout>';
  const minHeightLayout = '<ef-layout min-height="200px"></ef-layout>';
  const maxHeightLayout = '<ef-layout max-height="200px"></ef-layout>';

  before(() => {
    document.body.style.padding = '0';
  });

  it('Should have correct Shadow DOM structure', async () => {
    const el = await fixture(defaultLayout);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('Should be at a default state', async () => {
    const el = await fixture(defaultLayout);
    const style = getComputedStyle(el);
    assert.equal(style.display, 'block', 'Display should be block');
    assert.equal(style.overflow, 'hidden', 'Overflow should be hidden');
    assert.equal(style.position, 'relative', 'Position should be relative');
    assert.equal(style.width, getComputedStyle(document.body).getPropertyValue('width'), 'Width should be 100%');
    assert.equal(style.height, '0px', 'Height should be 0');
    expect(el.attached, 'There should be no attached function as this get created dynamically').to.not.exist;
    expect(el.detached, 'There should be no detached function as this get created dynamically').to.not.exist;
  });

  it('Should fire resize events', async () => {
    const el = await fixture(defaultLayout);
    let eventCount = 0;

    setTimeout(() => {
      el.style.width = el.offsetWidth + 10 + 'px';
    });

    try {
      await waitUntil(async () => await oneEvent(el, 'resize'), 'Resize event does not fire');
      eventCount++;
    } catch (error) {
      eventCount = 0;
    }

    expect(eventCount).to.equal(1, 'Event should have been called once');
  });

  it('Should handle being attached/detached', async () => {
    const el = await fixture(defaultLayout);
    let eventCount = 0;

    el.addEventListener('resize', function () {
      eventCount++;
    });

    el.style.width = el.clientWidth + 10 + 'px';

    await aTimeout(100);

    assert.equal(eventCount, 1, 'Event should have been called once');

    let parentElement = el.parentElement;
    parentElement.removeChild(el);
    parentElement.appendChild(el);
    parentElement.removeChild(el);
    parentElement.appendChild(el);

    el.style.width = el.clientWidth + 10 + 'px';

    await aTimeout(100);

    assert.ok(eventCount === 2, 'Events should still fire');

    parentElement.removeChild(el);
    el.style.width = el.clientWidth + 10 + 'px';

    await aTimeout(100);

    assert.ok(eventCount === 2, 'Events should not fire when detached');
  });

  it('Should be in flex layout', async () => {
    const el = await fixture(flexLayout);
    const style = getComputedStyle(el);
    assert.equal(style.width, document.body.clientWidth + 'px', 'Width should be 100%');
    assert.equal(style.height, '0px', 'Height should be 0');
    assert.match(style.display, (/flex|flexbox|\-ms\-flexbox/), 'Display should be flex');
    expect(style['flex-direction']).to.equal('row', 'Flex direction should be row');
    expect(style['flex-wrap']).to.equal('wrap', 'Flex direction should be row');
  });

  it('Should NOT be in container layout', async () => {
    const el = await fixture(containerLayout);
    const style = getComputedStyle(el);
    assert.equal(style.display, 'block', 'Display should be block');
  });

  it('Should be in container layout', async () => {
    const el = await fixture(flexContainerLayout);
    const style = getComputedStyle(el);
    assert.equal(style.width, document.body.clientWidth + 'px', 'Width should be 100%');
    assert.equal(style.height, '0px', 'Height should be 0');
    assert.match(style.display, (/flex|flexbox|\-ms\-flexbox/), 'Display should be flex');
    expect(style['flex-direction']).to.equal('column', 'Flex direction should be column');
    expect(style['flex-wrap']).to.equal('nowrap', 'Flex direction should be nowrap');
  });

  it('Should support scrolling', async () => {
    const el = await fixture(scrollingLayout);
    const style = getComputedStyle(el);
    assert.equal(style.overflow, 'auto', 'Overflow should be set to auto');
  });

  it('Should remove flex', async () => {
    const el = await fixture(noflexLayout);
    const style = getComputedStyle(el);
    expect(style['flex-grow']).to.equal('0', 'Flex grow should be 0');
    expect(style['flex-shrink']).to.equal('0', 'Flex shrink should be 0');
    expect(style['flex-basis']).to.equal('auto', 'Flex basis should be auto');
  });

  it('Should apply min-width', async () => {
    const el = await fixture(minWidthLayout);
    el.style.width = '100px';
    const style = getComputedStyle(el);
    assert.equal(style['min-width'], '200px', 'Min width should be set to 200px');
    assert.equal(style.width, '200px', 'Width should still equal 200px');
  });

  it('Should apply max-width', async () => {
    const el = await fixture(maxWidthLayout);
    el.style.width = '500px';
    const style = getComputedStyle(el);
    assert.equal(style['max-width'], '200px', 'Max width should be set to 200px');
    assert.equal(style.width, '200px', 'Width should still equal 200px');
  });

  it('Should apply min-height', async () => {
    const el = await fixture(minHeightLayout);
    const style = getComputedStyle(el);
    el.style.height = '100px';
    assert.equal(style['min-height'], '200px', 'Min height should be set to 200px');
    assert.equal(el.clientHeight, 200, 'Height should still equal 200px');
  });

  it('Should apply max-height', async () => {
    const el = await fixture(maxHeightLayout);
    const style = getComputedStyle(el);
    el.style.height = '500px';
    assert.equal(style['max-height'], '200px', 'Max height should be set to 200px');
    assert.equal(el.clientHeight, 200, 'Height should still equal 200px');
  });

  it('Should apply nowrap rules', async () => {
    const el = await fixture(flexNowrapLayout);
    const style = getComputedStyle(el);
    assert.equal(style['flex-wrap'] || style['-ms-flex-wrap'], 'nowrap', 'flex-wrap should be set to nowrap');
  });

  it('Should have correct resize event structure', async () => {
    const el = await fixture(defaultLayout);
    setTimeout(() => {
      el.style.width = '100px';
    });
    const { detail: { width, height } } = await oneEvent(el, 'resize');
    const { offsetWidth, offsetHeight } = el;
    expect(width, 'Width should be equall to offsetWidth').to.equal(offsetWidth);
    expect(height, 'Height should be equall to offsetHeight').to.equal(offsetHeight);
  });

  it('debug property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.debug = true;
    await elementUpdated(el);
    expect(el.hasAttribute('debug'), 'debug property should be reflected to attribute').to.equal(true);
    el.removeAttribute('debug');
    expect(el.debug, 'debug attribute should be reflected to property').to.equal(false);
  });

  it('flex property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.flex = true;
    await elementUpdated(el);
    expect(el.hasAttribute('flex'), 'flex property should be reflected to attribute').to.equal(true);
    el.removeAttribute('flex');
    expect(el.flex, 'flex attribute should be reflected to property').to.equal(false);
  });

  it('container property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.container = true;
    await elementUpdated(el);
    expect(el.hasAttribute('container'), 'container property should be reflected to attribute').to.equal(true);
    el.removeAttribute('container');
    expect(el.container, 'container attribute should be reflected to property').to.equal(false);
  });

  it('noflex property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.noflex = true;
    await elementUpdated(el);
    expect(el.hasAttribute('noflex'), 'noflex property should be reflected to attribute').to.equal(true);
    el.removeAttribute('noflex');
    expect(el.noflex, 'noflex attribute should be reflected to property').to.equal(false);
  });

  it('nowrap property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.nowrap = true;
    await elementUpdated(el);
    expect(el.hasAttribute('nowrap'), 'nowrap property should be reflected to attribute').to.equal(true);
    el.removeAttribute('nowrap');
    expect(el.nowrap, 'nowrap attribute should be reflected to property').to.equal(false);
  });

  it('scrollable property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.scrollable = true;
    await elementUpdated(el);
    expect(el.hasAttribute('scrollable'), 'scrollable property should be reflected to attribute').to.equal(true);
    el.removeAttribute('scrollable');
    expect(el.scrollable, 'scrollable attribute should be reflected to property').to.equal(false);
  });

  it('size property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.size = '10px';
    await elementUpdated(el);
    expect(el.getAttribute('size'), 'size property should be reflected to attribute').to.equal('10px');
    el.setAttribute('size', '20px');
    expect(el.size, 'size attribute should be reflected to property').to.equal('20px');
  });

  it('basis property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.basis = '10px';
    await elementUpdated(el);
    expect(el.getAttribute('basis'), 'basis property should be reflected to attribute').to.equal('10px');
    el.setAttribute('basis', '20px');
    expect(el.basis, 'basis attribute should be reflected to property').to.equal('20px');
  });

  it('minWidth property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.minWidth = '10px';
    await elementUpdated(el);
    expect(el.getAttribute('min-width'), 'minWidth property should be reflected to attribute').to.equal('10px');
    el.setAttribute('min-width', '20px');
    expect(el.minWidth, 'minWidth attribute should be reflected to property').to.equal('20px');
  });

  it('minHeight property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.minHeight = '10px';
    await elementUpdated(el);
    expect(el.getAttribute('min-height'), 'minHeight property should be reflected to attribute').to.equal('10px');
    el.setAttribute('min-height', '20px');
    expect(el.minHeight, 'minHeight attribute should be reflected to property').to.equal('20px');
  });

  it('maxWidth property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.maxWidth = '10px';
    await elementUpdated(el);
    expect(el.getAttribute('max-width'), 'maxWidth property should be reflected to attribute').to.equal('10px');
    el.setAttribute('max-width', '20px');
    expect(el.maxWidth, 'maxWidth attribute should be reflected to property').to.equal('20px');
  });

  it('maxHeight property is reflected to attribute and vice versa', async () => {
    const el = await fixture(defaultLayout);
    el.maxHeight = '10px';
    await elementUpdated(el);
    expect(el.getAttribute('max-height'), 'minHeight property should be reflected to attribute').to.equal('10px');
    el.setAttribute('max-height', '20px');
    expect(el.maxHeight, 'maxHeight attribute should be reflected to property').to.equal('20px');
  });
});


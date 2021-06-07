import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/progress-bar';
import '@refinitiv-ui/elemental-theme/light/ef-progress-bar.js';

describe('ProgressBar', () => {

  it('DOM structure is correct', async () => {
    const el = await fixture('<ef-progress-bar></ef-progress-bar>');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Default value is correct', async () => {
    const el = await fixture('<ef-progress-bar></ef-progress-bar>');
    const bar = el.shadowRoot.querySelector('[part~=bar]');
    const elWidth = parseFloat(getComputedStyle(el).width);
    const barWidth = parseFloat(getComputedStyle(bar).width);
    expect(el.value).to.equal('100');
    expect(barWidth).to.equal(elWidth);
  });

  it('Bar should be the correct width', async () => {
    const el = await fixture('<ef-progress-bar value="50"></ef-progress-bar>');
    const bar = el.shadowRoot.querySelector('[part~=bar]');
    const elWidth = parseFloat(getComputedStyle(el).width);
    const barWidth = parseFloat(getComputedStyle(bar).width);
    expect(parseFloat(barWidth).toFixed()).to.equal(parseFloat(elWidth / 2).toFixed());
  });

  it('Bar should always show, even when the value is minimal', async () => {
    const el = await fixture('<ef-progress-bar value="0.000001"></ef-progress-bar>');
    const bar = el.shadowRoot.querySelector('[part~=bar]');
    const barWidth = parseFloat(getComputedStyle(bar).width);
    expect(el.value).to.equal('0.000001');
    expect(barWidth).to.equal(1);
  });

  it('Bar should not be visible when value is 0', async () => {
    const el = await fixture('<ef-progress-bar value="0"></ef-progress-bar>');
    const bar = el.shadowRoot.querySelector('[part~=bar]');
    const barWidth = parseFloat(getComputedStyle(bar).width);
    expect(el.value).to.equal('0');
    expect(barWidth).to.equal(0);
  });

  it('Bar should handle out of bounds values', async () => {
    const el = await fixture('<ef-progress-bar value="-50"></ef-progress-bar>');
    const bar = el.shadowRoot.querySelector('[part~=bar]');
    const elWidth = parseFloat(getComputedStyle(el).width);
    let barWidth = parseFloat(getComputedStyle(bar).width);
    expect(el.value).to.equal('-50');
    expect(barWidth).to.equal(0);
    el.value = 250;
    await elementUpdated(el);
    if (parseFloat(getComputedStyle(bar).transitionDuration)) {
      await oneEvent(bar, 'transitionend');
    }
    barWidth = parseFloat(getComputedStyle(bar).width);
    expect(el.value).to.equal('250');
    expect(barWidth).to.equal(elWidth);
  });

  it('Bar should support custom colours', async () => {
    const el = await fixture('<ef-progress-bar style="color:red"></ef-progress-bar>');
    const bar = el.shadowRoot.querySelector('[part~=bar]');
    const elColor = getComputedStyle(bar).color;
    const barColor = getComputedStyle(bar).backgroundColor;
    expect(barColor).to.equal(elColor);
  });

  it('Bar has backwards compatibility for custom colours', async () => {
    const el = await fixture('<ef-progress-bar></ef-progress-bar>');
    const bar = el.shadowRoot.querySelector('[part~=bar]');
    const dummy = await fixture('<span></span>');
    el.updateVariable('--bar-color', 'red');
    dummy.style.color = el.getComputedVariable('--bar-color');
    const dummyColor = getComputedStyle(dummy).color;
    const barColor = getComputedStyle(bar).backgroundColor;
    expect(barColor).to.equal(dummyColor);
  });

  it('Supports alignment property', async () => {
    const el = await fixture('<ef-progress-bar alignment="right"></ef-progress-bar>');
    const bar = el.shadowRoot.querySelector('[part~=bar]');
    const label = el.shadowRoot.querySelector('[part~=label]');
    const barRect = bar.getBoundingClientRect();
    const labelRect = label.getBoundingClientRect();
    expect(labelRect.left).to.be.lessThan(barRect.left);
  });

  it('When via value invalid type', async () => {
    const el = await fixture('<ef-progress-bar value="abcd"></ef-progress-bar>');
    const bar = el.shadowRoot.querySelector('[part~=bar]');
    const elWidth = parseFloat(getComputedStyle(el).width);
    const barWidth = parseFloat(getComputedStyle(bar).width);
    expect(el.value).to.equal('100');
    expect(barWidth).to.equal(elWidth);

    // after initial value case when via value invalid
    el.value = undefined;
    await elementUpdated(el);
    expect(el.value).to.equal('100');
    expect(barWidth).to.equal(elWidth);
  });

});


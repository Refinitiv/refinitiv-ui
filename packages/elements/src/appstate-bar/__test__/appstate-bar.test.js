import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/appstate-bar';
import '@refinitiv-ui/elemental-theme/light/ef-appstate-bar.js';

describe('appstate-bar/AppstateBar', () => {

  let el;
  let headingPart;
  let closePart;

  beforeEach(async () => {
    el = await fixture('<ef-appstate-bar></ef-appstate-bar>');
    headingPart = el.shadowRoot.querySelector('[part=heading]');
    closePart = el.shadowRoot.querySelector('[part=close]');
  });

  it('DOM structure is correct', async () => {
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Should change content in heading when heading attribute changed', async () => {
    el.setAttribute('heading', 'Test');
    await elementUpdated(el);
    expect(headingPart.textContent).to.equal('Test');
    el.setAttribute('heading', 'newHeading');
    await elementUpdated(el);
    expect(headingPart.textContent).to.equal('newHeading', 'Heading is not updated when heading attribute changed.');
  });

  it('Should change content in heading when heading property changed', async () => {
    el.setAttribute('heading', 'Test');
    await elementUpdated(el);
    expect(headingPart.textContent).to.equal('Test');
    el.heading = 'newHeading';
    await elementUpdated(el);
    expect(headingPart.textContent).to.equal('newHeading', 'Heading is not updated when heading attribute changed.');
  });

  it('Should change heading background color when state is changed via attribute', async () => {
    let beforeBackgroundColor;
    let newBackgroundColor;

    beforeBackgroundColor = el.getComputedVariable('--heading-background-color');
    expect(beforeBackgroundColor.length).to.be.greaterThan(0, 'Default heading background color is not set.');

    el.setAttribute('state', 'highlight');
    await elementUpdated(el);
    newBackgroundColor = el.getComputedVariable('--heading-background-color');
    expect(el.state).to.equal('highlight');
    expect(beforeBackgroundColor).to.not.equal(newBackgroundColor, 'Heading background color does not change when state changed');
  });

  it('Should changed heading background to default color when invalid state is set', () => {
    let beforeBackgroundColor;
    let newBackgroundColor;

    beforeBackgroundColor = el.getComputedVariable('--heading-background-color');
    expect(beforeBackgroundColor.length).to.be.greaterThan(0, 'Default heading background color is not set.');

    el.setAttribute('state', 'invalid');
    newBackgroundColor = el.getComputedVariable('--heading-background-color');
    expect(el.state).to.equal('invalid');
    expect(beforeBackgroundColor).to.equal(newBackgroundColor, 'Heading background color does not reset to default when state value is invalid');
  });

  it('Should hide itself when clear button is clicked', () => {
    let cssDisplay = window.getComputedStyle(el).getPropertyValue('display');
    expect(cssDisplay).to.not.equal('none');

    closePart.click();
    cssDisplay = window.getComputedStyle(el).getPropertyValue('display');
    expect(cssDisplay).to.equal('none');
  });

  it('Should fire clear event when clear button is tapped', async () => {
    setTimeout(() => closePart.dispatchEvent(new Event('tap')));
    const event = await oneEvent(el, 'clear');
    expect(event.type).to.equal('clear');
  });

});


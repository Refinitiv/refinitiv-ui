import { elementUpdated, expect, fixture, html } from '@refinitiv-ui/test-helpers';
import { BasicElement } from '../../lib/elements/BasicElement';
import { customElement } from '../../lib/decorators/custom-element';
import { templateMap } from '../../lib/directives/template-map';

class TemplateMapTest extends BasicElement {
  static properties = {
    attribute: {},
    property: {},
    listener: {},
    mode: {}
  };

  eventOneCounter = 0;
  eventTwoCounter = 0;

  constructor () {
    super();
    this.attribute = null;
    this.listener = undefined;
    this.mode = true;
  }

  onEventOne () {
    this.eventOneCounter += 1;
  }

  onEventTwo () {
    this.eventTwoCounter += 1;
  }

  runEvent () {
    const event = new CustomEvent('event');
    this.element.dispatchEvent(event);
  }

  get element () {
    return this.shadowRoot.querySelector('div');
  }

  get defaultTemplateMap () {
    return {
      '.mode': this.mode,
      'attribute': this.attribute,
      '.property': this.property,
      '@event': this.listener
    };
  }

  get customTemplateMap () {
    return {
      '.mode': this.mode,
      '.custom': true
    };
  }

  render () {
    return html`<div ${templateMap(this.mode ? this.defaultTemplateMap : this.customTemplateMap)}></div>`;
  }
}
customElement('template-map-test', {
  theme: false
})(TemplateMapTest);

describe('directives/TemplateMap',  () => {
  it('Can set and remove attributes', async () => {
    const mapTestEl = await fixture('<template-map-test></template-map-test>');
    const mappedEl = mapTestEl.element;
    expect(mappedEl.hasAttribute('attribute')).to.equal(false, 'attribute should not exist if null');
    mapTestEl.attribute = 'My attribute';
    await elementUpdated(mapTestEl);
    expect(mappedEl.getAttribute('attribute')).to.equal('My attribute', 'attribute is not reflected');
    mapTestEl.attribute = '';
    await elementUpdated(mapTestEl);
    expect(mappedEl.hasAttribute('attribute')).to.equal(true, 'empty attribute should reflect');
    expect(mappedEl.getAttribute('attribute')).to.equal('', 'empty attribute is not reflected');
    mapTestEl.attribute = null;
    await elementUpdated(mapTestEl);
    expect(mappedEl.hasAttribute('attribute')).to.equal(false, 'Should be possible to remove an attribute');
  });
  it('Can set and remove properties', async () => {
    const mapTestEl = await fixture('<template-map-test></template-map-test>');
    const mappedEl = mapTestEl.element;
    expect(mappedEl.property).not.to.exist;
    mapTestEl.property = 'My property';
    await elementUpdated(mapTestEl);
    expect(mappedEl.property).to.equal('My property', 'property is not reflected');
    mapTestEl.property = 0;
    await elementUpdated(mapTestEl);
    expect(mappedEl.property).to.equal(0, 'should be possible to change property value');
    mapTestEl.property = undefined;
    await elementUpdated(mapTestEl);
    expect(mappedEl.property).not.to.exist;
  });
  it('Can set and remove events', async () => {
    const mapTestEl = await fixture('<template-map-test></template-map-test>');
    mapTestEl.runEvent();
    expect(mapTestEl.eventOneCounter).to.equal(0, 'T0: no event listener nr.1');
    expect(mapTestEl.eventTwoCounter).to.equal(0, 'T0: no event listener nr.2');

    // Can set event listener
    mapTestEl.listener = mapTestEl.onEventOne;
    await elementUpdated(mapTestEl);
    mapTestEl.runEvent();
    expect(mapTestEl.eventOneCounter).to.equal(1, 'T1: event listener nr.1 should run once');
    expect(mapTestEl.eventTwoCounter).to.equal(0, 'T1: no event listener nr.2');

    // Can set event listener to the same value
    mapTestEl.requestUpdate();
    await elementUpdated(mapTestEl);
    mapTestEl.runEvent();
    expect(mapTestEl.eventOneCounter).to.equal(2, 'T2: event listener nr.1 should run twice');

    // Can change event listener
    mapTestEl.listener = mapTestEl.onEventTwo;
    await elementUpdated(mapTestEl);
    mapTestEl.runEvent();
    expect(mapTestEl.eventOneCounter).to.equal(2, 'T3: event listener nr.1 has been removed');
    expect(mapTestEl.eventTwoCounter).to.equal(1, 'T3: event listener nr.2 should run once');

    // Can remove event listener
    mapTestEl.listener = undefined;
    await elementUpdated(mapTestEl);
    mapTestEl.runEvent();
    expect(mapTestEl.eventOneCounter).to.equal(2, 'T4: event listener nr.1 has been removed');
    expect(mapTestEl.eventTwoCounter).to.equal(1, 'T4: event listener nr.2 has been removed');

    // Can set custom event listener
    let customEvent;
    mapTestEl.listener = (event) => {
      customEvent = event;
    };
    await elementUpdated(mapTestEl);
    mapTestEl.runEvent();

    expect(mapTestEl.eventOneCounter).to.equal(2, 'T5: event listener nr.1 has been removed');
    expect(mapTestEl.eventTwoCounter).to.equal(1, 'T5: event listener nr.2 has been removed');
    expect(customEvent).to.be.instanceof(Event);
  });
  it('Can change template map object', async () => {
    const mapTestEl = await fixture('<template-map-test></template-map-test>');
    const mappedEl = mapTestEl.element;
    mapTestEl.attribute = 'My attribute';
    mapTestEl.property = 'My property';
    mapTestEl.listener = mapTestEl.onEventOne;
    await elementUpdated(mapTestEl);
    mapTestEl.runEvent();

    expect(mappedEl.mode).to.equal(true, 'Default map mode');
    expect(mappedEl.getAttribute('attribute')).to.equal('My attribute', 'attribute is not reflected');
    expect(mappedEl.property).to.equal('My property', 'property is not reflected');
    expect(mapTestEl.eventOneCounter).to.equal(1, 'T0: event listener nr.1 should run once');

    mapTestEl.mode = false;
    await elementUpdated(mapTestEl);
    mapTestEl.runEvent();

    expect(mappedEl.mode).to.equal(false, 'Custom map mode');
    expect(mappedEl.custom).to.equal(true, 'New custom flag should be set');
    expect(mappedEl.hasAttribute('attribute')).to.equal(false, 'Should remove an attribute');
    expect(mappedEl.property).not.to.exist;
    expect(mapTestEl.eventOneCounter).to.equal(1, 'T1: event listener nr.1 should run once');
  });
});

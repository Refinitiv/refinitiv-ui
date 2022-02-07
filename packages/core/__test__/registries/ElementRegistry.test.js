import { expect, html } from '@refinitiv-ui/test-helpers';
import { ElementRegistry } from '../../lib/registries/ElementRegistry';
import { CustomStyleRegistry } from '../../lib/registries/CustomStyleRegistry';
import { BasicElement, css, unsafeCSS } from '../../lib/index.js';
import { asyncFrames, getErrors, mockCssString, setErrors } from '../helper';

const staticMockCssString = ':host { padding: 0; }';

const createMockClass = () => {
  return class MockBasicElement extends BasicElement {
    static get version () {
      return '1';
    }

    static get styles () {
      return css`${unsafeCSS(staticMockCssString)}`;
    }

    render () {
      return html`
      <p>A paragraph</p>
    `;
    }
  };
};

const createEmptyStyleMockClass = () => {
  return class MockBasicElement extends BasicElement {
    static get version () {
      return '1';
    }

    render () {
      return html`
      <p>A paragraph</p>
    `;
    }
  };
};


describe('TestElementRegistry', () => {
  let testNum = 0;
  const baseName = 'test-element-registry-';
  let testName;

  beforeEach(() => {
    testName = `${baseName}${testNum}-tag`;
    testNum += 1;
  });

  it('Test define and fetch with custom theme', () => {
    let MockBasicElement = createMockClass();

    CustomStyleRegistry.define(testName, mockCssString);
    ElementRegistry.define(testName, MockBasicElement);

    const fetchedItem = ElementRegistry.get(testName);

    // expect to both static styles and theme styles to be defined here
    expect(MockBasicElement.styles).instanceOf(Array);
    expect(MockBasicElement.styles).length(2);

    expect(MockBasicElement.styles[0].cssText).to.equal(staticMockCssString);
    expect(MockBasicElement.styles[1].cssText).to.equal(mockCssString);

    expect(fetchedItem).to.exist;
    expect(fetchedItem.version).to.equal(MockBasicElement.version);
  });

  it('Test define and fetch with empty custom theme', () => {
    let MockBasicElement = createEmptyStyleMockClass();

    CustomStyleRegistry.define(testName, mockCssString);
    ElementRegistry.define(testName, MockBasicElement);

    const fetchedItem = ElementRegistry.get(testName);

    expect(MockBasicElement.styles).instanceOf(Array);
    expect(MockBasicElement.styles).length(1);

    expect(MockBasicElement.styles[0].cssText).to.equal(mockCssString);

    expect(fetchedItem).to.exist;
    expect(fetchedItem.version).to.equal(MockBasicElement.version);
  });

  it('Test fetch not defined item', () => {
    const fetchedCssString = ElementRegistry.get(testName);

    expect(fetchedCssString).to.equal(undefined);
  });

  it('Test define twice same name', async () => {
    let MockBasicElement = createMockClass();

    ElementRegistry.define(testName, MockBasicElement);
    ElementRegistry.define(testName, MockBasicElement);

    await asyncFrames();

    const { errorCount, errorMessage } = getErrors();

    expect(errorMessage).to.equalSnapshot();
    expect(errorCount).to.equal(1);

    setErrors();
  });

  it('Test create', () => {
    let MockBasicElement = createEmptyStyleMockClass();

    CustomStyleRegistry.define(testName, mockCssString);
    ElementRegistry.define(testName, MockBasicElement);

    const fetchedItem = ElementRegistry.get(testName);

    const element = document.createElement(testName);
    expect(fetchedItem.creations).to.equal(1);

    ElementRegistry.create(element);
    expect(fetchedItem.creations).to.equal(2);

    ElementRegistry.create(element);
    expect(fetchedItem.creations).to.equal(3);
  });

  it('Test create fake', () => {
    const element = document.createElement('div');

    expect(() => ElementRegistry.create(element)).to.not.throw();
  });

  it('Test connect', () => {
    let MockBasicElement = createEmptyStyleMockClass();

    CustomStyleRegistry.define(testName, mockCssString);
    ElementRegistry.define(testName, MockBasicElement);

    const fetchedItem = ElementRegistry.get(testName);

    const element = document.createElement(testName);

    ElementRegistry.connect(element);
    expect(fetchedItem.connections).to.equal(1);
    ElementRegistry.connect(element);
    expect(fetchedItem.connections).to.equal(2);
  });

  it('Test connect fake', () => {
    const element = document.createElement('div');

    expect(() => ElementRegistry.connect(element)).to.not.throw();
  });

  it('Test disconnect', () => {
    let MockBasicElement = createEmptyStyleMockClass();

    CustomStyleRegistry.define(testName, mockCssString);
    ElementRegistry.define(testName, MockBasicElement);

    const fetchedItem = ElementRegistry.get(testName);

    const element = document.createElement(testName);

    ElementRegistry.disconnect(element);
    expect(fetchedItem.disconnections).to.equal(1);
    ElementRegistry.disconnect(element);
    expect(fetchedItem.disconnections).to.equal(2);
  });

  it('Test disconnect fake', () => {
    const element = document.createElement('div');

    expect(() => ElementRegistry.disconnect(element)).to.not.throw();
  });

});

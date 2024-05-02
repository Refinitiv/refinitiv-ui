import { expect, html, nextFrame } from '@refinitiv-ui/test-helpers';

import { BasicElement, css, unsafeCSS } from '../../lib/index.js';
import { CustomStyleRegistry } from '../../lib/registries/CustomStyleRegistry.js';
import { ElementRegistry } from '../../lib/registries/ElementRegistry.js';
import { getErrors, isLocalhost, mockCssString, setErrors } from '../helper.js';

const staticMockCssString = ':host { padding: 0; }';
const duplicationMessage = `Only one version of a Custom Element can be registered in the browser

[test-element-registry-3-tag] has already been defined.

Potential causes:
1. No deduplication task has been performed
2. The same element definition has been loaded in multiple bundles
3. A single package has been upgraded, without upgrading other EF dependencies

Recommended fix:
1. Run 'npm dedupe' in you project folder
2. Rebuild your project

https://ui.refinitiv.com/kb/duplicate-element
`;

const createMockClass = () => {
  return class MockBasicElement extends BasicElement {
    static get version() {
      return '1';
    }

    static get styles() {
      return css`
        ${unsafeCSS(staticMockCssString)}
      `;
    }

    render() {
      return html`<p>A paragraph</p>`;
    }
  };
};

const createEmptyStyleMockClass = () => {
  return class MockBasicElement extends BasicElement {
    static get version() {
      return '1';
    }

    render() {
      return html`<p>A paragraph</p>`;
    }
  };
};

describe('TestElementRegistry', function () {
  let testNum = 0;
  const baseName = 'test-element-registry-';
  let testName;

  beforeEach(function () {
    testName = `${baseName}${testNum}-tag`;
    testNum += 1;
  });

  it('Test define and fetch with custom theme', function () {
    let MockBasicElement = createMockClass();

    CustomStyleRegistry.define(testName, mockCssString);
    ElementRegistry.define(testName, MockBasicElement);

    const fetchedItem = ElementRegistry.get(testName);

    // expect to both static styles and theme styles to be defined here
    expect(MockBasicElement.styles).instanceOf(Array);
    expect(MockBasicElement.styles).length(2);

    expect(MockBasicElement.styles[0].cssText.trim()).to.equal(staticMockCssString);
    expect(MockBasicElement.styles[1].cssText.trim()).to.equal(mockCssString);

    expect(fetchedItem).to.exist;
    expect(fetchedItem.version).to.equal(MockBasicElement.version);
  });

  it('Test define and fetch with empty custom theme', function () {
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

  it('Test fetch not defined item', function () {
    const fetchedCssString = ElementRegistry.get(testName);

    expect(fetchedCssString).to.equal(undefined);
  });

  it('Test define twice same name', async function () {
    let MockBasicElement = createMockClass();

    ElementRegistry.define(testName, MockBasicElement);
    ElementRegistry.define(testName, MockBasicElement);

    await nextFrame(2);

    const { errorCount, errorMessage } = getErrors();

    expect(errorMessage).to.equal(duplicationMessage);
    expect(errorCount).to.equal(1);

    setErrors();
  });

  it('Test create', function () {
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

  it('Test create fake', function () {
    const element = document.createElement('div');

    expect(() => ElementRegistry.create(element)).to.not.throw();
  });

  it('Test connect', function () {
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

  it('Test connect fake', function () {
    const element = document.createElement('div');

    expect(() => ElementRegistry.connect(element)).to.not.throw();
  });

  it('Test disconnect', function () {
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

  it('Test disconnect fake', function () {
    const element = document.createElement('div');

    expect(() => ElementRegistry.disconnect(element)).to.not.throw();
  });

  it('Test duplication define element', async function () {
    let MockBasicElement = createMockClass();

    customElements.define(testName, MockBasicElement);

    ElementRegistry.define(testName, MockBasicElement);
    CustomStyleRegistry.define(testName, mockCssString);

    await nextFrame(2);

    const { errorObject } = getErrors();
    if (isLocalhost) {
      expect(errorObject).to.be.instanceOf(DOMException, 'Error not thrown in dev environment');
    } else {
      expect(errorObject).to.equal('undefined', 'Error thrown in other environment');
    }

    setErrors();
  });
});

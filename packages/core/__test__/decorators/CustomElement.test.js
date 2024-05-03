import { expect, html, nextFrame } from '@refinitiv-ui/test-helpers';

import { customElement } from '../../lib/decorators/custom-element.js';
import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError.js';
import { BasicElement } from '../../lib/index.js';
import { CustomStyleRegistry } from '../../lib/registries/CustomStyleRegistry.js';
import { getErrors, isLocalhost, mockCssString, setErrors } from '../helper.js';

const duplicationMessage = `Only one version of a Custom Element can be registered in the browser

[test-custom-element-2-tag] has already been defined.

Potential causes:
1. No deduplication task has been performed
2. The same element definition has been loaded in multiple bundles
3. A single package has been upgraded, without upgrading other EF dependencies

Recommended fix:
1. Run 'npm dedupe' in you project folder
2. Rebuild your project

https://ui.refinitiv.com/kb/duplicate-element
`;

const createEmptyStyleMockClass = () => {
  return class BasicElementTest extends BasicElement {
    static get version() {
      return '1';
    }

    render() {
      return html` <p>A paragraph</p> `;
    }
  };
};

describe('TestCustomElement', function () {
  it('Test create and exec decorator with theme', function () {
    let MockBasicElement = createEmptyStyleMockClass();

    let elementDefineFunction;

    expect(() => {
      elementDefineFunction = customElement('test-custom-element-0-tag');
    }).to.not.throw();

    expect(elementDefineFunction).to.exist;
    expect(elementDefineFunction).instanceOf(Function);

    expect(() => {
      CustomStyleRegistry.define('test-custom-element-0-tag', mockCssString);
      elementDefineFunction(MockBasicElement);
    }).to.not.throw();
  });

  it('Test create and exec decorator with no theme', function () {
    let MockBasicElement = createEmptyStyleMockClass();

    let elementDefineFunction;

    expect(() => {
      elementDefineFunction = customElement('test-custom-element-1-tag', { theme: false });
    }).to.not.throw();

    expect(elementDefineFunction).to.exist;
    expect(elementDefineFunction).instanceOf(Function);

    expect(() => {
      elementDefineFunction(MockBasicElement);
    }).to.not.throw();
  });

  it('Test create and exec decorator with no theme twice', async function () {
    let MockBasicElement = createEmptyStyleMockClass();

    const elementDefineFunction = customElement('test-custom-element-2-tag', { theme: false });

    elementDefineFunction(MockBasicElement);

    if (isLocalhost) {
      expect(() => {
        elementDefineFunction(MockBasicElement);
      }).to.throw(DuplicateStyleError);
    } else {
      expect(() => {
        elementDefineFunction(MockBasicElement);
      }).not.to.throw(DuplicateStyleError);
    }

    await nextFrame(2);

    const { errorMessage, errorCount } = getErrors();

    if (isLocalhost) {
      expect(errorCount).to.equal(1, 'Error not thrown');
      expect(errorMessage).to.equal(duplicationMessage, 'duplication error not thrown in dev environment');
    } else {
      expect(errorCount).to.equal(0, 'Error thrown');
      expect(errorMessage).to.equal('', 'duplication error thrown in other environment that was not dev');
    }

    setErrors();
  });
});

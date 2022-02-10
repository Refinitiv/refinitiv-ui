import { expect, html, nextFrame } from '@refinitiv-ui/test-helpers';
import { customElement } from '../../lib/decorators/custom-element.js';
import { CustomStyleRegistry } from '../../lib/registries/CustomStyleRegistry.js';
import { BasicElement } from '../../lib/index.js';
import { asyncFrames, getErrors, mockCssString, setErrors } from '../helper.js';
import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError';

const createEmptyStyleMockClass = () => {
  return class BasicElementTest extends BasicElement {
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

describe('TestCustomElement', () => {
  it('Test create and exec decorator with theme', () => {
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

  it('Test create and exec decorator with no theme', () => {
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

  it('Test create and exec decorator with no theme twice', async () => {
    let MockBasicElement = createEmptyStyleMockClass();

    const elementDefineFunction = customElement('test-custom-element-2-tag', { theme: false });

    elementDefineFunction(MockBasicElement);

    expect(() => {
      elementDefineFunction(MockBasicElement);
    }).to.throw(DuplicateStyleError);

    await asyncFrames();

    await nextFrame();
    await nextFrame();

    const { errorMessage, errorCount } = getErrors();

    expect(errorCount).to.equal(1, 'Error not thrown');
    expect(errorMessage).to.equalSnapshot();

    setErrors();
  });

});

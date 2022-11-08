import { expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';
import { customElement } from './../lib/decorators/custom-element';
import { LitElement } from '../lib/index.js';
import { CustomStyleRegistry } from '../lib/registries/CustomStyleRegistry.js';
class BasicElementTest extends LitElement {

}

customElement('lit-element-element-test', {
  theme: false
})(BasicElementTest);

describe('Test ELF', () => {
  let warnMessage = '';
  let originWarnFunction;
  const customWarnFunction = (message) => {
    warnMessage = message;
  };

  beforeEach(() => {
    // eslint-disable-next-line no-console
    originWarnFunction = console.warn;
    warnMessage = '';
    // eslint-disable-next-line no-console
    console.warn = customWarnFunction;
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.warn = originWarnFunction;
  });

  it('Test LitElement constructor', async () => {
    await fixture('<lit-element-element-test></lit-element-element-test>');

    expect(warnMessage).to.equal('Please use an ELF element type, instead of LitElement', 'Wrong warning message is used');
  });
});

describe('Test ELF', () => {
  it('Test registry event call: ef.customStyles.define', async () => {
    const mockElementName = 'test-element';
    const mockCssString = ':host{}';
    window.dispatchEvent(new CustomEvent('ef.customStyles.define', {
      detail: {
        name: mockElementName,
        styles: mockCssString
      }
    }));
    expect(CustomStyleRegistry.get(mockElementName)).to.equal(mockCssString);
  });
  it('Test registry event call: ef.nativeStyles.define', async () => {
    const mockElementName = 'test-element';
    const mockCssString = ':host{}';
    window.dispatchEvent(new CustomEvent('ef.nativeStyles.define', {
      detail: {
        name: mockElementName,
        styles: mockCssString
      }
    }));
    expect(CustomStyleRegistry.get(mockElementName)).to.equal(mockCssString);
  });
});
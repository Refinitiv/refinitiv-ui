import { expect, fixture } from '@refinitiv-ui/test-helpers';
import { customElement } from './../lib/decorators/custom-element';
import { LitElement } from '../lib/index.js';

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

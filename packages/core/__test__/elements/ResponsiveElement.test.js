import { expect, fixture, html, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';

import { customElement } from '../../lib/decorators/custom-element.js';
import { ResponsiveElement } from '../../lib/elements/ResponsiveElement.js';
import { css } from '../../lib/index.js';

class ResponsiveElementTest extends ResponsiveElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  checkGetComputedVariable(...props) {
    return this.getComputedVariable(...props);
  }

  checkUpdateVariable(key, value) {
    return this.updateVariable(key, value);
  }

  render() {
    return html``;
  }
}

customElement('responsive-element-test', {
  theme: false
})(ResponsiveElementTest);

describe('TestResponsiveElement', function () {
  it('Test creation', function () {
    expect(async () => {
      await fixture('<responsive-element-test></responsive-element-test>');
    }).to.not.throw();
  });

  it('Test resize event', async function () {
    const element = await fixture('<responsive-element-test></responsive-element-test>');
    await nextFrame(2);

    setTimeout(() => {
      element.style.width = '100px';
    });

    const {
      detail: { width, height }
    } = await oneEvent(element, 'resize');

    expect(width).to.equal(100, 'width was not set from event');
    expect(height).to.equal(0, 'height was not set from event');
  });

  it('Test resized callback', async function () {
    const element = await fixture('<responsive-element-test></responsive-element-test>');
    await nextFrame(2);

    let updatedSize = { width: null, height: null };

    element.resizedCallback = (size) => {
      updatedSize = size;
    };

    setTimeout(() => {
      element.style.width = '100px';
    });

    await nextFrame(2);

    expect(updatedSize.width).to.equal(100, 'width was not set from callback');
    expect(updatedSize.height).to.equal(0, 'height was not set from callback');
  });
});

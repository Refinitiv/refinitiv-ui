import { fixture, expect, elementUpdated, isIE, nextFrame } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/label';
import '@refinitiv-ui/elemental-theme/light/ef-label.js';

import { TextHelpers } from '../../../lib/label/helpers/text';

const getTooltipContent = (element) => {
  const textContainer = element.shadowRoot.querySelector('span');
  if(!textContainer) {
    return '';
  }
  return textContainer.getAttribute('tooltip') || textContainer.getAttribute('title');
};

const waitTooltipUpdated = async () => {
  await nextFrame();
  await nextFrame();
};

const SHORT_LABEL = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const LONG_LABEL = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.';

describe('label/Label', () => {
  let el;
  describe('DOM Structure is Correct', () => {
    it('Default', async () => {
      el = await fixture('<ef-label></ef-label>');
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Basic Features', () => {
    it('Should render only text', async () => {
      const content = 'button1inside text button2';
      el = await fixture(
        `<ef-label style="width: 50px;">
          <button>button1<span>inside</span></button> text <button>button2</button>
        </ef-label>`
      );
      await elementUpdated(el);
      expect(el.text).to.equal(content);
    });
  });
});

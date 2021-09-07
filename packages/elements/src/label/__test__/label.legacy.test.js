import { fixture, expect, isIE, nextFrame } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/label';
import '@refinitiv-ui/elemental-theme/light/ef-label.js';

const LONG_LABEL = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.';

// test for IE11 only
describe('label/Legacy', () => {
  describe('DOM structure is correct', () => {
    it('Should default to use the truncate template', async function () {
      if (!isIE()) {
        this.skip();
      }
      const el = await fixture(`<ef-label style="width: 50px">${LONG_LABEL}</ef-label>`);
      await nextFrame();
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('Should switch to line clamp template if line-clamp is set', async function () {
      if (!isIE()) {
        this.skip();
      }
      const el = await fixture(`<ef-label style="width: 50px" line-clamp="1">${LONG_LABEL}</ef-label>`);
      await nextFrame();
      expect(el).shadowDom.to.equalSnapshot();
    });
  });
});

import { fixture, expect, isIE, nextFrame } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/label';
import '@refinitiv-ui/elemental-theme/light/ef-label.js';

const LONG_LABEL = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.';

// test for IE11 only
describe('label/Legacy', () => {
  let left, right;
  describe('DOM structure is correct', () => {
    it('Should default to use the truncate template', async function () {
      if (!isIE()) {
        this.skip();
      }
      const el = await fixture(`<ef-label style="width: 50px">${LONG_LABEL}</ef-label>`);
      await nextFrame();
      left = el.renderRoot.querySelector('.split.left');
      right = el.renderRoot.querySelector('.split.right');
      expect(left).to.not.equal(null);
      expect(right).to.not.equal(null);
      expect(left.classList.contains('legacy')).to.equal(true);
    });
    it('Should switch to line clamp template if line-clamp is set', async function () {
      if (!isIE()) {
        this.skip();
      }
      const el = await fixture(`<ef-label style="width: 50px" line-clamp="1">${LONG_LABEL}</ef-label>`);
      await nextFrame();
      left = el.renderRoot.querySelector('.split.left');
      right = el.renderRoot.querySelector('.split.right');
      const clamp = el.renderRoot.querySelector('.clamp');
      expect(left).to.equal(null);
      expect(right).to.equal(null);
      expect(clamp).to.not.equal(null);
    });
  });
});

import { fixture, expect, elementUpdated, nextFrame, aTimeout, oneEvent } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/label';
import '@refinitiv-ui/elemental-theme/light/ef-label.js';

const hover = (el) => el.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));

const SINGLE_LETTER = 'L';
const SHORT_WORD = 'Lorem';
const SHORT_LABEL = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const LONG_LABEL = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.';

describe('label/Label', () => {
  let el, left, right;
  describe('DOM structure is correct', () => {
    it('Should default to use the truncate template', async function () {
      el = await fixture(`<ef-label style="width: 50px">${LONG_LABEL}</ef-label>`);
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('Should switch to line clamp template if line-clamp is set', async function () {
      el = await fixture(`<ef-label style="width: 50px" line-clamp="1">${LONG_LABEL}</ef-label>`);
      await nextFrame();
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Basic feature', () => {
    it('Should render the same text as the input', async () => {
      el = await fixture(
        `<ef-label>${LONG_LABEL}</ef-label>`
      );
      await elementUpdated(el);
      await nextFrame();
      left = el.renderRoot.querySelector('.split.left');
      right = el.renderRoot.querySelector('.split.right');
      expect(el.text).to.equal(LONG_LABEL, 'The label should be the same as the input');
      expect(`${left.textContent} ${right.textContent}`).to.equal(LONG_LABEL, 'The label should split across segments.');
      el = await fixture(
        `<ef-label style="width: 50px;">${LONG_LABEL}</ef-label>`
      );
      await elementUpdated(el);
      await nextFrame();
      expect(el.text).to.equal(LONG_LABEL, 'Truncation should not affect the output label');
    });
    it('Should only render the textual content of the light DOM', async () => {
      const content = 'button1inside text button2';
      el = await fixture(
        `<ef-label style="width: 50px;">
          <button>button1<span>inside</span></button> text <button>button2</button>
        </ef-label>`
      );
      await elementUpdated(el);
      await nextFrame();
      expect(el.text).to.be.equal(content);
    });
    it('Should show a single letter', async () => {
      el = await fixture(
        `<ef-label>${SINGLE_LETTER}</ef-label>`
      );
      await elementUpdated(el);
      await nextFrame();
      left = el.renderRoot.querySelector('.split.left');
      right = el.renderRoot.querySelector('.split.right');
      expect(el.text).to.equal(SINGLE_LETTER, 'Single letter should be parsed correctly.');
      expect(left.textContent).to.equal(SINGLE_LETTER, 'Single letter should be placed in the left segment.');
      expect(right.textContent).to.equal('', 'Nothing should be placed in the right segment.');
    });
    it('Should show a single word', async () => {
      el = await fixture(
        `<ef-label>${SHORT_WORD}</ef-label>`
      );
      await elementUpdated(el);
      await nextFrame();
      left = el.renderRoot.querySelector('.split.left');
      right = el.renderRoot.querySelector('.split.right');
      expect(el.text).to.equal(SHORT_WORD, 'Small word should be parsed correctly.');
      expect(`${left.textContent}${right.textContent}`).to.equal(SHORT_WORD, 'Small word should split across segments.');
    });
    it('Should update the label if its content changes', async () => {
      el = await fixture(
        `<ef-label>${LONG_LABEL}</ef-label>`
      );
      await elementUpdated(el);
      await nextFrame();
      expect(el.text).to.equal(LONG_LABEL, 'The label should initialise with LONG_LABEL');
      el.innerHTML = SHORT_LABEL;
      await elementUpdated(el);
      await nextFrame();
      expect(el.text).to.equal(SHORT_LABEL, 'The label should be updated to use SHORT_LABEL');
    });
    it('Should show a tooltip when truncated', async () => {
      el = await fixture(
        `<ef-label style="width:50px">${LONG_LABEL}</ef-label>`
      );
      await elementUpdated(el);
      const tooltip = el.ownerDocument.querySelector('ef-tooltip');
      const tooltipOverlay = tooltip.renderRoot.querySelector('[part=tooltip]');
      hover(el);
      await oneEvent(tooltipOverlay, 'opened');
      expect(tooltip.opened).to.be.true;
      expect(tooltip.textContent).to.equal(el.text);
    });
    it('Should not show a tooltip if all content is visible', async () => {
      el = await fixture(
        `<ef-label style="width:1000px">${SHORT_LABEL}</ef-label>`
      );
      await elementUpdated(el);
      const tooltip = el.ownerDocument.querySelector('ef-tooltip');
      hover(el);
      await aTimeout(1000); // Hard to test not opening tooltip so just wait a while
      expect(tooltip.opened).to.be.false;
    });
    it('Should break all words when line-clamp is equal to 1', async () => {
      el = await fixture(
        `<ef-label line-clamp="1" style="width:50px">${LONG_LABEL}</ef-label>`
      );
      await elementUpdated(el);
      const textContainer = el.shadowRoot.querySelector('span');
      expect(textContainer.style.wordBreak).equal('break-all');
    });
  });
});

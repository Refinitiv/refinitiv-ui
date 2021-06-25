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

describe('Label', () => {
  let el;
  describe('DOM Structure is Correct', () => {
    it('Default', async () => {
      el = await fixture('<ef-label></ef-label>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('With truncate', async () => {
      el = await fixture('<ef-label truncate></ef-label>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('With truncate center', async () => {
      el = await fixture('<ef-label truncate="center"></ef-label>');
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
      expect(el.shadowRoot.querySelector('span').innerHTML).to.be.equal(content);
    });
    it('Label should be update when text content has been changed', async () => {
      el = await fixture(`<ef-label>${SHORT_LABEL}</ef-label>`);
      el.textContent = LONG_LABEL;
      await elementUpdated(el);
      await nextFrame();
      expect(el.shadowRoot.querySelector('span').innerHTML).to.be.equal(LONG_LABEL);
    });
  });

  describe('Truncated Center', () => {
    it('Should add middle ellipsis correctly', async () => {
      el = await fixture(`<ef-label style="width: 100px;" truncate="center">${LONG_LABEL}</ef-label>`);
      const truncateStyles = 'width: 100px;display: inline-block;max-width: 100%;box-sizing: border-box;white-space: nowrap;text-overflow:clip;';
      const mockEl = await fixture(`<span style=${truncateStyles}>${LONG_LABEL}</span>`);
      TextHelpers.middleEllipsis(mockEl, 100, LONG_LABEL);
      await elementUpdated(mockEl);
      expect(el.shadowRoot.querySelector('span').innerHTML).to.be.equal(mockEl.innerHTML);
    });
    it('Should restore label to default when remove truncate center props', async () => {
      el = await fixture(`<ef-label style="width: 100px;" truncate="center">${LONG_LABEL}</ef-label>`);
      el.truncate = undefined;
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('span').innerHTML).to.be.equal(LONG_LABEL);
    });
    it('Should change to middle ellipsis correctly', async () => {
      el = await fixture(`<ef-label style="width: 100px;">${LONG_LABEL}</ef-label>`);
      el.truncate = 'center';
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('span').innerHTML).not.equal(LONG_LABEL);
    });
  });

  /* Max line is not support on IE */
  if (!isIE()) {
    describe('Max line', () => {
      it('Set lines = 2 via attribute', async () => {
        const maxLines = '2';
        el = await fixture(`<ef-label max-line="${maxLines}" style="width: 50px;">${LONG_LABEL}</ef-label>`);
        const mockEl = await fixture(`<span style="width: 50px;display: -webkit-inline-box;-webkit-line-clamp: ${maxLines};white-space: initial;-webkit-box-orient: vertical;text-overflow: ellipsis;overflow: hidden;">${LONG_LABEL}</span>`);
        await elementUpdated(el);
        await elementUpdated(mockEl);
        expect(el.offsetHeight).to.be.equal(mockEl.offsetHeight);
      });
      it('Increase max lines = 3', async () => {
        const maxLines = '3';
        el = await fixture(`<ef-label max-line="2" style="width: 50px;">${LONG_LABEL}</ef-label>`);
        el.maxLine = '3';
        const mockEl = await fixture(`<span style="width: 50px;display: -webkit-inline-box;-webkit-line-clamp: ${maxLines};white-space: initial;-webkit-box-orient: vertical;text-overflow: ellipsis;overflow: hidden;">${LONG_LABEL}</span>`);
        await elementUpdated(el);
        await elementUpdated(mockEl);
        expect(el.offsetHeight).to.be.equal(mockEl.offsetHeight);
      });
    });
  }

  describe('Tooltip', () => {
    describe('When size is not enough, Tooltip should be there', () => {
      it('When set truncate center', async () => {
        el = await fixture(`<ef-label truncate="center" style="width: 50px;">${LONG_LABEL}</ef-label>`);
        await elementUpdated(el);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(LONG_LABEL);
      });
      it('When set truncate', async () => {
        el = await fixture(`<ef-label truncate style="width: 50px;">${LONG_LABEL}</ef-label>`);
        await elementUpdated(el);
        expect(getTooltipContent(el)).to.be.equal(LONG_LABEL);
      });
      it('When max-line is less than content', async () => {
        if (!isIE()) {
          el = await fixture(`<ef-label max-line="2" style="width: 50px;">${LONG_LABEL}</ef-label>`);
          await elementUpdated(el);
          expect(getTooltipContent(el)).to.be.equal(LONG_LABEL);
        }
      });
      it('When text content has been changed', async () => {
        el = await fixture(`<ef-label truncate style="width: 500px;">${SHORT_LABEL}</ef-label>`);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(null);
        el.textContent = LONG_LABEL;
        await elementUpdated(el);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(LONG_LABEL);
      });
    });
    describe('When size is enough, Tooltip should not be there', () => {
      it('When set truncate center', async () => {
        el = await fixture(`<ef-label truncate="center" style="width: 500px;">${SHORT_LABEL}</ef-label>`);
        await elementUpdated(el);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(null);
      });
      it('When set truncate', async () => {
        el = await fixture(`<ef-label truncate style="width: 500px;">${SHORT_LABEL}</ef-label>`);
        await elementUpdated(el);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(null);
      });
      it('When max-line is less than content', async () => {
        if (!isIE()) {
          el = await fixture(`<ef-label max-line="2" style="width: 500px;">${SHORT_LABEL}</ef-label>`);
          await elementUpdated(el);
          expect(getTooltipContent(el)).to.be.equal(null);
        }
      });
      it('When text content has been changed', async () => {
        el = await fixture(`<ef-label truncate style="width: 400px;">${LONG_LABEL}</ef-label>`);
        expect(getTooltipContent(el)).to.be.equal(LONG_LABEL);
        el.textContent = SHORT_LABEL;
        await elementUpdated(el);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(null);
      });
    });
  });

  describe('Resize', () => {
    describe('When size is not enough, Tooltip should be there', () => {
      it('When set truncate center', async () => {
        el = await fixture(`<ef-label truncate="center">${LONG_LABEL}</ef-label>`);
        el.style.width = '50px';
        await elementUpdated(el);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(LONG_LABEL);
      });
      it('When set truncate', async () => {
        el = await fixture(`<ef-label truncate>${LONG_LABEL}</ef-label>`);
        el.style.width = '50px';
        await elementUpdated(el);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(LONG_LABEL);
      });
      it('When max-line is less than content', async () => {
        if (!isIE()) {
          el = await fixture(`<ef-label max-line="2">${LONG_LABEL}</ef-label>`);
          el.style.width = '50px';
          await elementUpdated(el);
          await waitTooltipUpdated();
          expect(getTooltipContent(el)).to.be.equal(LONG_LABEL);
        }
      });
    });
    describe('When size is enough, Tooltip should not be there', () => {
      it('When set truncate center', async () => {
        el = await fixture(`<ef-label truncate="center" style="width: 100px;">${SHORT_LABEL}</ef-label>`);
        el.style.width = '400px';
        await elementUpdated(el);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(null);
      });
      it('When set truncate', async () => {
        el = await fixture(`<ef-label truncate style="width: 50px;">${SHORT_LABEL}</ef-label>`);
        el.style.width = '500px';
        await elementUpdated(el);
        await waitTooltipUpdated();
        expect(getTooltipContent(el)).to.be.equal(null);
      });
      it('When max-line is less than content', async () => {
        if (!isIE()) {
          el = await fixture(`<ef-label max-line="2" style="width: 50px;">${SHORT_LABEL}</ef-label>`);
          el.style.width = '500px';
          await elementUpdated(el);
          await waitTooltipUpdated();
          expect(getTooltipContent(el)).to.be.equal(null);
        }
      });
    });
  });
  describe('Appearances', () => {
    let defaultElement;
    beforeEach(async () => {
      defaultElement = await fixture(
        `<ef-label>${SHORT_LABEL}</ef-label>`
      );
    });
    it('Should have error attribute', () => {
      defaultElement.setAttribute('error', true);

      expect(defaultElement.error).to.equal(true);
      expect(defaultElement.getAttribute('error')).to.equal('true');
    });
    it('Should have error attribute when it is set directly', async () => {
      defaultElement.error = true;

      await elementUpdated();

      expect(defaultElement.error).to.equal(true);
      expect(defaultElement.getAttribute('error')).to.not.null;
    });
    it('Should have warning attribute', () => {
      defaultElement.setAttribute('warning', true);

      expect(defaultElement.warning).to.equal(true);
      expect(defaultElement.getAttribute('warning')).to.equal('true');
    });
    it('Should have warning attribute when it is set directly', async () => {
      defaultElement.warning = true;

      await elementUpdated();

      expect(defaultElement.warning).to.equal(true);
      expect(defaultElement.getAttribute('warning')).to.not.null;
    });
  });
});

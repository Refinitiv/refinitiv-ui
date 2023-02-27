import { expect, fixture } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/loader';
import '@refinitiv-ui/elemental-theme/light/ef-loader.js';

const areDotsHaveEnoughSpaceInside = loader => {
  const getCompleteSizes = element => {
    const style = window.getComputedStyle(element);
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const horizontalMargin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const verticalMargin = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    return {
      completeWidth: width + horizontalMargin,
      completeHeight: height + verticalMargin
    };
  };

  const wrapper = loader.shadowRoot.querySelector('[part~=wrapper]');
  const dots = Array.from(loader.shadowRoot.querySelectorAll('[part~=wrapper] [part~=dot]'));

  const dotsSizes = dots.map(getCompleteSizes);
  const wrapperWidth = wrapper.clientWidth;
  const wrapperHeight = wrapper.clientHeight;
  const allDotsWidth = dotsSizes.reduce((acc, dot) => acc + dot.completeWidth, 0);
  const highestDot = Math.max(...dotsSizes.map(dot => dot.completeHeight));

  return allDotsWidth <= wrapperWidth && highestDot <= wrapperHeight;
};

describe('loader/Loader', () => {
  const defaultLoader = '<ef-loader></ef-loader>';

  it('Should have correct Shadow DOM structure', async () => {
    const el = await fixture(defaultLoader);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('All dots are visible in default loader', async () => {
    const el = await fixture(defaultLoader);
    expect(areDotsHaveEnoughSpaceInside(el)).to.equal(true);
  });

});


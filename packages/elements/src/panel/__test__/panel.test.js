// import element and theme
import '@refinitiv-ui/elements/panel';

import '@refinitiv-ui/elemental-theme/light/ef-panel';
import { expect, fixture } from '@refinitiv-ui/test-helpers';

/*
 * In FireFox and IE doesn't seem to support shorthand css e.g. 'padding'
 * Need this function to check all padding size
 * @returns {Boolean} hasPadding
 */
const hasPadding = (el) => {
  const top = parseInt(getComputedStyle(el).getPropertyValue('padding-top'), 10);
  const bottom = parseInt(getComputedStyle(el).getPropertyValue('padding-bottom'), 10);
  const left = parseInt(getComputedStyle(el).getPropertyValue('padding-left'), 10);
  const right = parseInt(getComputedStyle(el).getPropertyValue('padding-right'), 10);
  const check = top + bottom + left + right;
  return check !== 0;
};

describe('panel/Panel', function () {
  it('Should have correct Shadow DOM structure', async function () {
    const el = await fixture('<ef-panel></ef-panel>');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Should show content inside a slot', async function () {
    const el = await fixture('<ef-panel>Hello</ef-panel>');
    expect(el.textContent.trim()).to.equal('Hello');
  });

  it('Should not have padding if spacing is not presented', async function () {
    const el = await fixture('<ef-panel></ef-panel>');
    expect(hasPadding(el)).to.equal(false);
  });

  it('Should have padding > 0px when spacing attribute presents', async function () {
    const el = await fixture('<ef-panel spacing></ef-panel>');
    expect(hasPadding(el)).to.equal(true);
  });

  it('Should set background to transparent when transparent attribute presents', async function () {
    const el = await fixture('<ef-panel transparent></ef-panel>');
    const div = await fixture('<div style="background:transparent">Hello</div>');
    expect(getComputedStyle(el).getPropertyValue('background-color')).to.equal(
      getComputedStyle(div).getPropertyValue('background-color')
    );
  });
});

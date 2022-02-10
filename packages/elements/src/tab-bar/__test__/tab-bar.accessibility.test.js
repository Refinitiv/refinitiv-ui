import { fixture, expect, keyboardEvent, isIE, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/tab-bar';
import '@refinitiv-ui/elemental-theme/light/ef-tab-bar';

const keyArrowLeft = keyboardEvent('keydown', { key: isIE() ? 'Left' : 'ArrowLeft'});
const keyArrowRight = keyboardEvent('keydown', { key: isIE() ? 'Right' : 'ArrowRight' });
const keyArrowDown = keyboardEvent('keydown', { key: isIE() ? 'Down' : 'ArrowDown' });
const keyArrowUp = keyboardEvent('keydown', { key: isIE() ? 'Up' : 'ArrowUp'});
const keyHome = keyboardEvent('keydown', { key: 'Home'});
const keyEnd = keyboardEvent('keydown', { key: 'End'});

const isActiveAndFocusable = (element) => {
  return element.active && element.tabIndex === 0;
}

describe('tab-bar/accessibility', () => {
  let el;
  let tabList;
  let tab1;
  let tab2;
  let tab3;

  beforeEach(async () => {
    el = await fixture(`
      <ef-tab-bar>
        <ef-tab active value="1">1</ef-tab>
        <ef-tab value="2">2</ef-tab>
        <ef-tab value="3">3</ef-tab>
      </ef-tab-bar>
    `);
    tabList = el.querySelectorAll('ef-tab');
    tab1 = tabList[0];
    tab2 = tabList[1];
    tab3 = tabList[2];
  });
  it('Should set tabIndex=0 to active tab and -1 to others', async () => {
    tabList.forEach((tab) => {
      expect(tab.tabIndex).to.equal(tab.active ? 0 : -1);
    });
  });
  it('Should set tabIndex=0 to first tab in case no active tab', async () => {
    el = await fixture(`
      <ef-tab-bar>
        <ef-tab>1</ef-tab>
        <ef-tab>2</ef-tab>
      </ef-tab-bar>
    `);
    expect(el.querySelector('ef-tab').tabIndex).to.equal(0);
  });
  it('Should not be able to navigate through disabled tab', async () => {
    el = await fixture(`
      <ef-tab-bar>
        <ef-tab disabled>1</ef-tab>
        <ef-tab disabled>2</ef-tab>
      </ef-tab-bar>
    `);
    tabList = el.querySelectorAll('ef-tab');
    tabList[0].focus();
    el.dispatchEvent(keyArrowRight);
    expect(el.value).to.equal('');
    el.dispatchEvent(keyHome);
    expect(el.value).to.equal('');
    el.dispatchEvent(keyEnd);
    expect(el.value).to.equal('');
  });
  it('Navigation', async () => {
    expect(isActiveAndFocusable(tab1)).to.equal(true);
    tab1.focus();
    el.dispatchEvent(keyArrowRight);
    expect(isActiveAndFocusable(tab1)).to.equal(false);
    expect(isActiveAndFocusable(tab2)).to.equal(true);
    expect(el.value).to.equal(tab2.value);

    el.dispatchEvent(keyArrowLeft);
    expect(isActiveAndFocusable(tab1)).to.equal(true);
    expect(isActiveAndFocusable(tab2)).to.equal(false);
    expect(el.value).to.equal(tab1.value);

    el.dispatchEvent(keyArrowDown);
    expect(isActiveAndFocusable(tab1)).to.equal(false);
    expect(isActiveAndFocusable(tab2)).to.equal(true);
    expect(el.value).to.equal(tab2.value);

    el.dispatchEvent(keyArrowUp);
    expect(isActiveAndFocusable(tab1)).to.equal(true);
    expect(isActiveAndFocusable(tab2)).to.equal(false);
    expect(el.value).to.equal(tab1.value);

    el.dispatchEvent(keyEnd);
    expect(isActiveAndFocusable(tab3)).to.equal(true);
    expect(isActiveAndFocusable(tab1)).to.equal(false);
    expect(el.value).to.equal(tab3.value);

    el.dispatchEvent(keyArrowRight);
    expect(isActiveAndFocusable(tab1)).to.equal(true);
    expect(isActiveAndFocusable(tab3)).to.equal(false);
    expect(el.value).to.equal(tab1.value);

    el.dispatchEvent(keyArrowLeft);
    expect(isActiveAndFocusable(tab3)).to.equal(true);
    expect(isActiveAndFocusable(tab1)).to.equal(false);
    expect(el.value).to.equal(tab3.value);

    el.dispatchEvent(keyHome);
    expect(isActiveAndFocusable(tab1)).to.equal(true);
    expect(isActiveAndFocusable(tab3)).to.equal(false);
    expect(el.value).to.equal(tab1.value);
  });
});

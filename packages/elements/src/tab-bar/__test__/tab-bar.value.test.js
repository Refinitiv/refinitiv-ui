import { fixture, expect, elementUpdated, keyboardEvent, isIE, oneEvent } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/tab-bar';
import '@refinitiv-ui/elemental-theme/light/ef-tab-bar';

const keyArrowRight = keyboardEvent('keydown', { key: isIE() ? 'Right' : 'ArrowRight' });

describe('tab-bar/value', () => {
  let el;
  describe('default value/active tab', () => {
    it('Should ignore value attribute on tab bar and set first tab as default value', async () => {
      el = await fixture(`
        <ef-tab-bar value="2">
          <ef-tab value="1">1</ef-tab>
          <ef-tab value="2">2</ef-tab>
          <ef-tab value="3">3</ef-tab>
        </ef-tab-bar>
    `);
      const firstTab = el.querySelector('ef-tab');
      expect(firstTab.active).to.equal(true);
      expect(el.value).to.equal(firstTab.value);
    });
    it('Should not set disabled tab as default value', async () => {
      el = await fixture(`
        <ef-tab-bar value="2">
          <ef-tab value="1" disabled>1</ef-tab>
          <ef-tab value="2">2</ef-tab>
        </ef-tab-bar>
      `);
      const secondTab = el.querySelectorAll('ef-tab')[1];
      expect(secondTab.active).to.equal(true);
      expect(el.value).to.equal(secondTab.value);
    });
    it('Should has no default value if all tab is disabled', async () => {
      el = await fixture(`
        <ef-tab-bar value="2">
          <ef-tab value="1" disabled>1</ef-tab>
          <ef-tab value="2" disabled>2</ef-tab>
        </ef-tab-bar>
      `);
      expect(el.value).to.equal('');
    });
    it('Should take active tab as default value', async () => {
      el = await fixture(`
        <ef-tab-bar value="2">
          <ef-tab value="1">1</ef-tab>
          <ef-tab value="2" active>2</ef-tab>
        </ef-tab-bar>
      `);
      const tab2 = el.querySelectorAll('ef-tab')[1];
      expect(el.value).to.equal(tab2.value);
      expect(tab2.active).to.equal(true);
    });
    it('Should not take disabled active tab as default value', async () => {
      el = await fixture(`
        <ef-tab-bar value="2">
          <ef-tab value="1">1</ef-tab>
          <ef-tab value="2" active disabled>2</ef-tab>
        </ef-tab-bar>
      `);
      const tabList = el.querySelectorAll('ef-tab');
      expect(el.value).to.equal(tabList[0].value);
      expect(tabList[0].active).to.equal(true);
      expect(tabList[1].active).to.equal(false);
    });
  });
  describe('set active tab', () => {
    let tabList;
  
    beforeEach(async () => {
      el = await fixture(`
        <ef-tab-bar value="1">
          <ef-tab label="1"></ef-tab>
          <ef-tab>2</ef-tab>
          <ef-tab disabled>3</ef-tab>
          <ef-tab value="1">1</ef-tab>
        </ef-tab-bar>
      `);
      tabList = el.querySelectorAll('ef-tab');
    });
    it('Should set active to tab when value changed', async () => {
      el.value = '2';
      await elementUpdated();
      expect(tabList[1].active).to.equal(true);
    });
    it('Value of tab bar should not change when active value of tab changed', async () => {
      expect(el.value).to.equal(tabList[0].label);
      tabList[1].active = true;
      await elementUpdated();
      expect(el.value).to.equal(tabList[0].label);
    });
    it('Should set active tab correctly on tapping', async () => {
      tabList[1].click();
      expect(tabList[1].active).to.equal(true);
      expect(el.value).to.equal(tabList[1].textContent);
      tabList[0].click();
      expect(tabList[0].active).to.equal(true);
      expect(el.value).to.equal(tabList[0].label);
      tabList[3].click(); // tab 4 has same value as tab 1 so it should set active to tab 1 insteads
      expect(tabList[0].active).to.equal(true);
      expect(el.value).to.equal(tabList[0].label);
    });
    it('Should be able to prevent tap event', async () => {
      el.addEventListener('tap', (e) => {
        e.preventDefault();
      });
      await elementUpdated();
      tabList[1].dispatchEvent(new CustomEvent('tap'));
      expect(el.value).to.equal('1');
    });
    it('Should not allow invalid value', async () => {
      el.value = '';
      await elementUpdated();
      expect(el.value).to.equal('1');
    });
    it('Should parse value to string', async () => {
      el.value = 2;
      await elementUpdated();
      expect(tabList[1].active).to.equal(true);
      expect(el.value).to.equal('2');
    });
  });
  describe('Event', () => {
    let tabList;
  
    beforeEach(async () => {
      el = await fixture(`
        <ef-tab-bar value="1">
          <ef-tab label="1"></ef-tab>
          <ef-tab>2</ef-tab>
          <ef-tab disabled>3</ef-tab>
          <ef-tab value="1">1</ef-tab>
        </ef-tab-bar>
      `);
      tabList = el.querySelectorAll('ef-tab');
    });

    it('Should not fired value-changed event when value programmatically set', async () => {
      let isFired = false;
      el.addEventListener('value-changed', () => {
        isFired = true;
      });
      el.value = '2';
      expect(isFired).to.equal(false);
    });
    it('Should fired value-changed event on tapping', async () => {
      let isFired = false;
      el.addEventListener('value-changed', () => {
        isFired = true;
      });

      tabList[3].click();
      expect(isFired).to.equal(false);
      tabList[1].click();
      expect(isFired).to.equal(true);
    });
    it('Should fired value-changed event when pressing an arrow key', async () => {
      let event;
      tabList[0].focus();

      setTimeout(() => {
        el.dispatchEvent(keyArrowRight);
      });
      event = await oneEvent(el, 'value-changed');
      expect(event.detail.value).to.equal('2');
      setTimeout(() => {
        el.dispatchEvent(keyArrowRight);
      });
      event = await oneEvent(el, 'value-changed');
      expect(event.detail.value).to.equal('1');
    })
  });
});

import { fixture, expect, elementUpdated, aTimeout } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/tab-bar';
import '@refinitiv-ui/elemental-theme/light/ef-tab-bar';

const getElementStyle = (elem, prop) => {
  return window.getComputedStyle(elem).getPropertyValue(prop);
};

const scrollUpdated = async () => {
  await aTimeout(300);
};

describe('tab-bar/TabBar', () => {
  it('DOM structure is correct', async () => {
    const el = await fixture('<ef-tab-bar></ef-tab-bar>');
    expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['style'] });
  });

  describe('level', () => {
    let el;

    beforeEach(async () => {
      el = await fixture(`
        <ef-tab-bar level='2'>
          <ef-tab>1</ef-tab>
          <ef-tab>2</ef-tab>
          <ef-tab>3</ef-tab>
        </ef-tab-bar>
      `);
    });

    it('Should pass level down to <ef-tab/>', async () => {
      el.querySelectorAll('ef-tab').forEach((tab) => {
        expect(tab.level).to.equal('2');
      });
    });
    it('Should update level to newly added <ef-tab/>', async () => {
      const tabBar = document.querySelector('ef-tab-bar');
      const newTab = document.createElement('ef-tab');
      newTab.innerText = '4';

      tabBar.appendChild(newTab);

      await elementUpdated();

      expect(el.querySelectorAll('ef-tab').length).to.equal(4);

      el.querySelectorAll('ef-tab').forEach((tab) => {
        expect(tab.level).to.equal('2');
      });
    });
    it('Should update its own level and <ef-tab/>', async () => {
      expect(el.level).to.equal('2');
      el.querySelectorAll('ef-tab').forEach((tab) => {
        expect(tab.level).to.equal('2');
      });

      el.level = '3';

      await elementUpdated();

      expect(el.level).to.equal('3');
      el.querySelectorAll('ef-tab').forEach((tab) => {
        expect(tab.level).to.equal('3');
      });
    });
  });
  describe('overflow', () => {
    let el;
    let leftScrollBtn;
    let rightScrollBtn;
    let content;

    const OVERFLOW_DISTANCE = 200;
    const BAR_TRAVEL_DISTANCE = 150;

    beforeEach(async () => {
      el = await fixture(`
        <div style="width: 400px;">
          <ef-tab-bar level='2'>
            <ef-tab>Home</ef-tab>
            <ef-tab>About</ef-tab>
            <ef-tab>Contacts</ef-tab>
            <ef-tab>Form</ef-tab>
            <ef-tab>Console</ef-tab>
            <ef-tab>Network</ef-tab>
            <ef-tab>Memory</ef-tab>
            <ef-tab>Application</ef-tab>
            <ef-tab>Performance</ef-tab>
            <ef-tab>Framework</ef-tab>
            <ef-tab>Deprecation</ef-tab>
            <ef-tab>Experience</ef-tab>
          </ef-tab-bar>
        </div>
      `);
      leftScrollBtn = el.querySelector('ef-tab-bar').shadowRoot.querySelector('[part=left-btn]');
      rightScrollBtn = el.querySelector('ef-tab-bar').shadowRoot.querySelector('[part=right-btn]');
      content = el.querySelector('ef-tab-bar').shadowRoot.querySelector('[part=content]');
    });

    it('Should show only right scroll button', async () => {
      expect(getElementStyle(leftScrollBtn, 'display')).equal('none');
      expect(getElementStyle(rightScrollBtn, 'display')).equal('flex');
    });

    it('Should show all scroll button', async () => {
      content.scrollLeft = OVERFLOW_DISTANCE;
      await scrollUpdated(); // wait scroll end

      expect(getElementStyle(leftScrollBtn, 'display')).equal('flex');
      expect(getElementStyle(rightScrollBtn, 'display')).equal('flex');
    });

    it('Should show only left scroll button', async () => {
      content.scrollLeft = content.scrollWidth - content.clientWidth;
      await scrollUpdated(); // wait scroll end

      expect(getElementStyle(leftScrollBtn, 'display')).equal('flex');
      expect(getElementStyle(rightScrollBtn, 'display')).equal('none');
    });

    it('Should scroll correctly when clicked on right scroll button', async () => {
      rightScrollBtn.dispatchEvent(new CustomEvent('tap'));
      await scrollUpdated();

      expect(Math.round(content.scrollLeft)).equal(BAR_TRAVEL_DISTANCE);
      expect(getElementStyle(leftScrollBtn, 'display')).equal('flex');
    });

    it('Should scroll correctly when clicked on left scroll button', async () => {
      rightScrollBtn.dispatchEvent(new CustomEvent('tap'));
      await scrollUpdated();

      expect(getElementStyle(leftScrollBtn, 'display')).equal('flex');

      leftScrollBtn.dispatchEvent(new CustomEvent('tap'));
      await scrollUpdated();

      expect(content.scrollLeft).equal(0);
      expect(getElementStyle(leftScrollBtn, 'display')).equal('none');
    });

    it('Should scroll to the leftmost', async () => {
      content.scrollLeft = BAR_TRAVEL_DISTANCE * 1.25;
      await scrollUpdated(); // wait scroll end

      leftScrollBtn.dispatchEvent(new CustomEvent('tap'));
      await scrollUpdated();

      expect(content.scrollLeft).equal(0);
      expect(getElementStyle(leftScrollBtn, 'display')).equal('none');
      expect(getElementStyle(rightScrollBtn, 'display')).equal('flex');
    });

    it('Should not show scroll button in vertical tab bar', async () => {
      el.querySelector('ef-tab-bar').vertical = true;
      await elementUpdated();
      leftScrollBtn = el.querySelector('ef-tab-bar').shadowRoot.querySelector('[part=left-btn]');
      rightScrollBtn = el.querySelector('ef-tab-bar').shadowRoot.querySelector('[part=right-btn]');
      expect(leftScrollBtn).equal(null);
      expect(rightScrollBtn).equal(null);
    });

    it('Should show scroll button correctly when a new tab has been added', async () => {
      el = await fixture(`
        <ef-tab-bar style="width: 150px;">
          <ef-tab>Home</ef-tab>
          <ef-tab>About</ef-tab>
        </ef-tab-bar>
      `);
      rightScrollBtn = el.shadowRoot.querySelector('[part=right-btn]');
      expect(getElementStyle(rightScrollBtn, 'display')).equal('none');
      const newTab = document.createElement('ef-tab');
      newTab.label = "Application";
      el.appendChild(newTab);
      await elementUpdated();
      expect(getElementStyle(rightScrollBtn, 'display')).equal('flex');
    });
  });
});

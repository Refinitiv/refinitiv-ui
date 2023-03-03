import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elemental-theme/light/ef-overlay-menu';
import { nestedMarkup } from './markup';
import { getMenuTriggers, openedUpdated, triggerKeyEvent, triggerMouseMove } from './utils';
import { nestedData } from './data';

describe('overlay-menu/Interaction', () => {
  describe('Interaction Test', () => {
    it('Opens nested menu', async () => {
      const el = await fixture(nestedMarkup);
      const topMenu = el.querySelector('#top-menu');
      let trigger;
      // open the menus
      topMenu.opened = true;
      await openedUpdated(el);
      trigger = el.querySelector('ef-item[for=sub-one]');
      triggerMouseMove(trigger);
      await openedUpdated(el);
      trigger = el.querySelector('ef-item[for=sub-two]');
      triggerMouseMove(trigger);
      await openedUpdated(el);
      const menus = [...el.querySelectorAll('ef-overlay-menu')];
      menus.forEach((menu) => {
        expect(menu.opened).to.be.true;
      });
    });

    it('Opens nested menu - from data', async () => {
      const el = await fixture('<div><ef-overlay-menu></ef-overlay-menu></div>');
      let menus = el.querySelectorAll('ef-overlay-menu');
      menus[0].data = JSON.parse(JSON.stringify(nestedData));
      menus[0].opened = true;
      await openedUpdated(el);
      const triggers = getMenuTriggers([...menus[0].renderRoot.querySelectorAll('ef-item')]);
      triggerMouseMove(triggers[0]);
      await openedUpdated(el);
      menus = el.querySelectorAll('ef-overlay-menu');
      const secondTriggers = getMenuTriggers([...menus[1].renderRoot.querySelectorAll('ef-item')]);
      triggerMouseMove(secondTriggers[0]);
      await openedUpdated(el);
      menus = [...el.querySelectorAll('ef-overlay-menu')];
      menus.forEach((menu) => {
        expect(menu.opened).to.be.true;
      });
    });

    it('Opens nested menu and switches to that menu', async () => {
      const el = await fixture(nestedMarkup);
      const topMenu = el.querySelector('#top-menu');
      let trigger;
      // open the menus
      topMenu.opened = true;
      await openedUpdated(el);
      trigger = el.querySelector('ef-item[for=sub-one]');
      triggerMouseMove(trigger);
      await openedUpdated(el);
      trigger = el.querySelector('ef-item[for=sub-two]');
      triggerMouseMove(trigger);
      await openedUpdated(el);
      const menus = [...el.querySelectorAll('ef-overlay-menu')];
      menus.forEach((menu) => {
        expect(menu.opened).to.be.true;
      });
      trigger = el.querySelector('ef-item[value=ssm-one]');
      triggerMouseMove(trigger);
      await elementUpdated(el);
      expect(menus[1].isActive).to.be.false;
      trigger = el.querySelector('ef-item[for=sub-two]');
      triggerMouseMove(trigger);
      await elementUpdated(el);
      trigger = el.querySelector('ef-item[value=sm-one]');
      triggerMouseMove(trigger);
      await elementUpdated(el);
      expect(menus[1].isActive, 'Second menu should be active').to.be.true;

    });

    it('Closes menu on body click', async () => {
      const el = await fixture(nestedMarkup);
      const topMenu = el.querySelector('#top-menu');
      // open the menus
      topMenu.opened = true;
      await openedUpdated(el);
      expect(window.getComputedStyle(el).display !== 'none').to.be.true;
      document.body.dispatchEvent(new CustomEvent('tapstart', {}));
      await openedUpdated(el);
      expect(window.getComputedStyle(topMenu).display === 'none').to.be.true;
      expect(topMenu.opened).to.be.false;
    });

    it('Handles not fully opened mouse over', async () => {
      const el = await fixture(nestedMarkup);
      const topMenu = el.querySelector('#top-menu');
      let trigger = el.querySelector('ef-item[for=sub-one]');
      // open the menus
      topMenu.opened = true;
      triggerMouseMove(trigger);
      await openedUpdated(el);
      trigger = el.querySelector('ef-item[for=sub-two]');
      triggerMouseMove(trigger);
      await openedUpdated(el);
      const menus = [...el.querySelectorAll('ef-overlay-menu')];
      expect(menus[1].opened).to.be.false;
    });

    it('Handles random mouse over', async () => {
      const el = await fixture(nestedMarkup);
      const topMenu = el.querySelector('#top-menu');
      let trigger = el.querySelector('ef-item[for=sub-one]');
      // open the menus
      topMenu.opened = true;
      triggerMouseMove(trigger);
      await openedUpdated(el);
      trigger = el.querySelector('ef-item[for=sub-two]');
      triggerMouseMove(trigger);
      await openedUpdated(el);
      const menus = [...el.querySelectorAll('ef-overlay-menu')];
      expect(menus[1].opened).to.be.false;
    });

    it('Uses back item when compacted', async () => {
      const el = await fixture(nestedMarkup);
      const topMenu = el.querySelector('#top-menu');
      let menus = [...el.querySelectorAll('ef-overlay-menu')];
      let trigger;
      // open the menus
      menus.forEach((menu) => {
        menu.compact = true;
      });
      topMenu.opened = true;
      await openedUpdated(el);
      trigger = el.querySelector('ef-item[for=sub-one]');
      trigger.click();
      await openedUpdated(el);
      trigger = menus[1].shadowRoot.querySelector('ef-item');
      trigger.click();
      await openedUpdated(el);
      menus = [...el.querySelectorAll('ef-overlay-menu')];
      expect(menus[1].opened).to.be.false;
    });

    it('Accepts tap on icon when compact - data', async () => {
      const el = await fixture('<div><ef-overlay-menu compact></ef-overlay-menu></div>');
      let menus = el.querySelectorAll('ef-overlay-menu');
      menus[0].data = JSON.parse(JSON.stringify(nestedData));
      menus[0].opened = true;
      await openedUpdated(el);
      const triggers = getMenuTriggers([...menus[0].shadowRoot.querySelectorAll('ef-item')]);
      triggers[0].click();
      await openedUpdated(el);
      const secondTriggers = getMenuTriggers([...menus[0].shadowRoot.querySelectorAll('ef-item')]);
      secondTriggers[0].click();
      await openedUpdated(el);
      menus = el.querySelectorAll('ef-overlay-menu');
      expect(menus[1].opened).to.be.true;
    });

    describe('Key Navigation', async () => {
      it('Ignores input when closed', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        triggerKeyEvent(menus[0], 'ArrowDown');
        expect(menus[0].opened).to.be.false;
      });

      it('Ignores input when closed - keyup', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        triggerKeyEvent(menus[0], 'Enter', 'keyup');
        expect(menus[0].opened).to.be.false;
      });

      it('Ignores unknown input', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        menus[0].opened = true;
        await openedUpdated(el);
        triggerKeyEvent(menus[0], 'x');
      });
      it('Navigates up and down', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        menus[0].opened = true;
        await openedUpdated(el);
        triggerKeyEvent(menus[0], 'ArrowDown');
        await elementUpdated(el);
        const item = el.querySelector('ef-item[highlighted]');
        expect(item === null, 'Item is highlighted').to.be.false;
        triggerKeyEvent(menus[0], 'ArrowDown');
        await elementUpdated(el);
        const secondItem = el.querySelector('ef-item[highlighted]');
        expect(secondItem !== item).to.be.true;
        expect(secondItem === undefined).to.be.false;
        triggerKeyEvent(menus[0], 'ArrowUp');
        await elementUpdated(el);
        const thirdItem = el.querySelector('ef-item[highlighted]');
        expect(thirdItem === item, '3rd highlight is 1st').to.be.true;
        expect(secondItem === undefined, '2nd item is not highlighted').to.be.false;
      });

      it('Tabs', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        menus[0].opened = true;
        await openedUpdated(el);
        triggerKeyEvent(menus[0], 'Tab');
        await elementUpdated(el);
        const item = el.querySelector('ef-item[highlighted]');
        expect(item === null).to.be.false;
        triggerKeyEvent(menus[0], 'Tab');
        await elementUpdated(el);
        const secondItem = el.querySelector('ef-item[highlighted]');
        expect(secondItem !== item).to.be.true;
        expect(secondItem === undefined).to.be.false;
      });

      it('Navigates and uses " "', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        menus[0].opened = true;
        await openedUpdated(el);
        triggerKeyEvent(menus[0], 'Tab');
        await elementUpdated(el);
        const item = el.querySelector('ef-item[highlighted]');
        expect(item === null).to.be.false;
        triggerKeyEvent(menus[0], ' ', 'keyup');
        await elementUpdated(el);
        const secondItem = el.querySelector('ef-item[selected]');
        expect(secondItem !== item).to.be.true;
        expect(secondItem === undefined).to.be.false;
      });

      it('Navigates and uses Space', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        menus[0].opened = true;
        await openedUpdated(el);
        triggerKeyEvent(menus[0], 'Tab');
        await elementUpdated(el);
        const item = el.querySelector('ef-item[highlighted]');
        expect(item === null).to.be.false;
        triggerKeyEvent(menus[0], ' ', 'keyup');
        await elementUpdated(el);
        const secondItem = el.querySelector('ef-item[selected]');
        expect(secondItem !== item).to.be.true;
        expect(secondItem === undefined).to.be.false;
      });

      it('Navigates and uses enter', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        menus[0].opened = true;
        await openedUpdated(el);
        triggerKeyEvent(menus[0], 'Tab');
        await elementUpdated(el);
        const item = el.querySelector('ef-item[highlighted]');
        expect(item === null).to.be.false;
        triggerKeyEvent(menus[0], 'Enter', 'keyup');
        await elementUpdated(el);
        const secondItem = el.querySelector('ef-item[selected]');
        expect(secondItem !== item).to.be.true;
        expect(secondItem === undefined).to.be.false;
      });

      it('Navigates nested, opening as it goes', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        let items;
        menus[0].opened = true;
        await openedUpdated(el);
        triggerKeyEvent(menus[0], 'ArrowDown');
        triggerKeyEvent(menus[0], 'ArrowDown');
        triggerKeyEvent(menus[0], 'ArrowDown');
        await elementUpdated(el);
        items = [...el.querySelectorAll('ef-item[highlighted]')];
        expect(items.length).to.equal(1);
        // move to sub menu
        triggerKeyEvent(menus[0], 'ArrowDown');
        triggerKeyEvent(menus[0], 'ArrowRight');
        await elementUpdated(el);
        await openedUpdated(el);
        menus = el.querySelectorAll('ef-overlay-menu');
        expect(menus[1].opened).to.be.true;
        triggerKeyEvent(menus[1], 'ArrowDown');
        await elementUpdated(el);
        items = [...el.querySelectorAll('ef-item[highlighted]')];
        expect(items.length).to.equal(2);

        triggerKeyEvent(menus[1], 'ArrowUp');
        triggerKeyEvent(menus[1], 'ArrowLeft');
        await openedUpdated(el);
        expect(menus[1].opened).to.be.false;

        items = [...el.querySelectorAll('ef-item[highlighted]')];
        expect(items.length).to.equal(1);
      });

      it('Navigates nested, opening as it goes - compact', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        menus[0].compact = true;
        let items;
        menus[0].opened = true;
        await openedUpdated(el);
        triggerKeyEvent(menus[0], 'ArrowDown');
        triggerKeyEvent(menus[0], 'ArrowDown');
        triggerKeyEvent(menus[0], 'ArrowDown');
        await elementUpdated(el);
        items = [...el.querySelectorAll('ef-item[highlighted]')];
        expect(items.length).to.equal(1);

        triggerKeyEvent(menus[0], 'ArrowDown');
        triggerKeyEvent(menus[0], 'ArrowRight');
        await elementUpdated(el);
        await openedUpdated(el);
        menus = el.querySelectorAll('ef-overlay-menu');
        expect(menus[1].opened).to.be.true;
        triggerKeyEvent(menus[1], 'ArrowDown');
        await elementUpdated(el);
        items = [...el.querySelectorAll('ef-item[highlighted]')];
        expect(items.length).to.equal(2);

        triggerKeyEvent(menus[1], 'ArrowUp');
        triggerKeyEvent(menus[1], 'ArrowLeft');
        await openedUpdated(el);
        expect(menus[1].opened).to.be.false;

        items = [...el.querySelectorAll('ef-item[highlighted]')];
        expect(items.length).to.equal(1);
      });

      it('Navigates with Home and End', async () => {
        const el = await fixture(nestedMarkup);
        let menus = el.querySelectorAll('ef-overlay-menu');
        menus[0].opened = true;
        await openedUpdated(el);
        triggerKeyEvent(menus[0], 'End');
        await elementUpdated(el);
        const firstMenuItems = menus[0].items;
        expect(el.querySelector('ef-item[highlighted]').label).to.equal(firstMenuItems[firstMenuItems.length - 1].label);
        triggerKeyEvent(menus[0], 'Home');
        await elementUpdated(el);
        expect(el.querySelector('ef-item[highlighted]').label).to.equal(firstMenuItems[0].label);
      });
    });
  });
});

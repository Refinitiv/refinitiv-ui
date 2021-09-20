import { expect, fixture } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elemental-theme/light/ef-overlay-menu';
import { openedUpdated, triggerMouseMove } from './utils';
import { nestedMarkup } from './markup';

describe('overlay-menu/Positioning', () => {
  describe('Positioning Test', () => {
    const checkDefaultMenus = async (el) => {
      let menus = el.querySelectorAll('ef-overlay-menu');
      menus[0].opened = true;
      await openedUpdated(el);
      const trigger = el.querySelector('ef-item[for=sub-one]');
      triggerMouseMove(trigger);
      await openedUpdated(el);
      expect(window.getComputedStyle(menus[1]).display !== 'none').to.be.true;
      expect(menus[1].positionTarget).to.equal(trigger);
      expect(menus[1].position[0]).to.equal('right-start');
      expect(menus[1].position[1]).to.equal('left-start');
    };

    it('Correct child menu positioning', async () => {
      const el = await fixture(nestedMarkup);
      await checkDefaultMenus(el);
    });

    it('Correct compact child menu positioning', async () => {
      const el = await fixture(nestedMarkup);
      let menus = el.querySelectorAll('ef-overlay-menu');
      menus.forEach(menu => {
        menu.compact = true;
      });
      menus[0].opened = true;
      await openedUpdated(el);
      const trigger = el.querySelector('ef-item[for=sub-one]');
      trigger.click();
      await openedUpdated(el);
      expect(menus[1].opened).to.be.true;
      expect(window.getComputedStyle(menus[1]).display !== 'none').to.be.true;
      expect(menus[1].position[0]).to.equal(menus[0].position[0]);
      expect(menus[1].position[1]).to.equal(menus[0].position[1]);
    });

    it('Removes compact child menu positioning', async () => {
      const el = await fixture(nestedMarkup);
      let menus = el.querySelectorAll('ef-overlay-menu');
      menus.forEach(menu => {
        menu.compact = true;
      });
      menus[0].opened = true;
      await openedUpdated(el);
      const trigger = el.querySelector('ef-item[for=sub-one]');
      trigger.click();
      await openedUpdated(el);
      expect(menus[1].opened).to.be.true;
      expect(window.getComputedStyle(menus[1]).display !== 'none').to.be.true;
      expect(menus[1].position[0]).to.equal(menus[0].position[0]);
      expect(menus[1].position[1]).to.equal(menus[0].position[1]);

      // remove compact
      menus[0].opened = false;
      menus.forEach(menu => {
        menu.compact = false;
      });
      await openedUpdated(el);
      // check default
      await checkDefaultMenus(el);
    });
  });
});

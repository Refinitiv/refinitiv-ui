// import element and theme
import '@refinitiv-ui/elements/overlay-menu';

import '@refinitiv-ui/elemental-theme/light/ef-overlay-menu';
import { elementUpdated, expect, fixture, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';

import { flatData, nestedData } from './data';
import { triggerMouseMove } from './utils';

describe('overlay-menu/Events', function() {
  describe('Events Test', function() {
    it('Fires opened', async function() {
      const el = await fixture('<ef-overlay-menu></ef-overlay-menu>');
      el.data = flatData;
      await elementUpdated(el);
      setTimeout(() => {
        el.opened = true;
      });
      await oneEvent(el, 'opened');
    });

    it('Fires closed', async function() {
      const el = await fixture('<ef-overlay-menu></ef-overlay-menu>');
      el.data = flatData;
      await elementUpdated(el);
      setTimeout(() => {
        el.opened = true;
      });
      await oneEvent(el, 'opened');
      setTimeout(() => {
        el.opened = false;
      });
      await oneEvent(el, 'closed');
    });

    it('Fires item-trigger for data', async function() {
      const el = await fixture(`<div>
      <ef-overlay-menu opened></ef-overlay-menu>
    </div>`);
      const menu = el.querySelector('ef-overlay-menu');
      menu.data = nestedData;
      await elementUpdated(menu);
      await nextFrame();
      let item = menu.renderRoot.querySelectorAll('ef-item')[1]; // value one
      setTimeout(() => {
        item.click();
      });
      let event = await oneEvent(el, 'item-trigger');
      expect(event.detail.value).to.equal('one');
      triggerMouseMove(menu.renderRoot.querySelector('ef-item[for]'));
      await elementUpdated(menu);
      await nextFrame();

      const subMenu = document.querySelectorAll('ef-overlay-menu')[1];
      item = subMenu.renderRoot.querySelectorAll('ef-item')[0]; // value sm-one
      setTimeout(() => {
        item.click();
      });
      event = await oneEvent(el, 'item-trigger');
      expect(event.detail.value).to.equal('sm-one');
    });
  });
});

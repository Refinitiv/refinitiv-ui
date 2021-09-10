import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/card';
import '@refinitiv-ui/elemental-theme/light/ef-card';

const menuData = [{ label: 'Spain', value: 'Spain'  }, { label: 'France',value: 'France', disabled: true }, { label: 'Italy', value: 'Italy' }];

describe('card/Card', () => {
  describe('DOM structure', () => {
    it('Basic DOM structure', async () => {
      const el = await fixture('<ef-card>Card</ef-card>');
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure with header and footer', async () => {
      const el = await fixture('<ef-card header="Header" footer="Footer">Card</ef-card>');
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure with slotted content', async () => {
      const el = await fixture(`
        <ef-card>
          <div slot="header">Header</div>
          <div>Body</div>
          <div slot="footer">Footer</div>
        </ef-card>`);

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('DOM structure with menu', async () => {
      const el = await fixture('<ef-card>Card</ef-card>');
      el.config = {
        menu: {
          data: menuData
        }
      };
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot();

      el.config = {};
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Interaction Test', () => {
    it('Should open menu and fire item-trigger event', async () => {
      const el = await fixture('<ef-card>Card</ef-card>');
      el.config = {
        menu: {
          data: menuData
        }
      };
      await elementUpdated(el);

      const openMenu = el.openMenuElement;
      const menu = el.menuElement;

      expect(openMenu, 'Open menu button element does not exist').to.exist;
      expect(menu, 'Menu element does not exist').to.exist;

      openMenu.click();

      await elementUpdated(el);
      expect(menu.opened).to.equal(true, 'Menu should open on button click');

      const item = menu.shadowRoot.querySelector('ef-item');
      expect(item, 'Menu config is not passed correctly').to.exist;

      setTimeout(() => {
        item.click();
      });

      await oneEvent(el, 'item-trigger');
      expect(menu.opened).to.equal(false, 'Menu should close when item is selected');
    });
  });
});

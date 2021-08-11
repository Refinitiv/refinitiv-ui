import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/card';
import '@refinitiv-ui/elemental-theme/light/ef-card';

const menuData = [{ label: 'Spain', value: 'Spain'  }, { label: 'France',value: 'France', disabled: true }, { label: 'Italy', value: 'Italy' }];

describe('card/Card', () => {
  describe('DOM structure', () => {
    let el;
    beforeEach(async () => {
      el = await fixture('<ef-card></ef-card>');
    });
    it("DOM structure is correct", async () => {
      expect(el).shadowDom.to.equalSnapshot({
        ignoreAttributes: ['style']
      });
    });
    it("DOM structure with header and footer is correct", async () => {
      el.setAttribute('header', 'Sample Card');
      el.setAttribute('footer', 'Footer Info');
      el.config = menuData
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot({
        ignoreAttributes: ['style']
      });
    });
  });

  describe('Feature', () => {
    it('Should display correctly if no footer and no headers, only content', async () => {
      const slotContent = '<p>Slot Content</p>';
      const el = await fixture(`<ef-card>${slotContent}</ef-card>`);
      expect(el.header).to.null;
      expect(el.shadowRoot.querySelector('[part=header]')).to.null;
      expect(el.footer).to.null;
      expect(el.shadowRoot.querySelector('[part=footer]')).to.null;
      expect(el.innerHTML).to.equal(slotContent);
    });

    it('Should be able to set header and display correctly', async () => {
      const slotContent = '<p>Slot Content</p>';
      const headerText = 'Sample Card';
      const el = await fixture(`<ef-card header='${headerText}'>${slotContent}</ef-card>`);
      await elementUpdated(el);
      expect(el.header).to.equal(headerText);
      expect(el.shadowRoot.querySelector('[part=header-text]').textContent).to.equal(headerText);
      expect(el.footer).to.null;
      expect(el.shadowRoot.querySelector('[part=footer]')).to.null;
      expect(el.innerHTML).to.equal(slotContent);
    });

    it('Should be able to set footer and display correctly', async () => {
      const slotContent = '<p>Slot Content</p>';
      const footerText = 'Footer info';
      const el = await fixture(`<ef-card footer='${footerText}'>${slotContent}</ef-card>`);
      await elementUpdated(el);
      expect(el.header).to.null;
      expect(el.shadowRoot.querySelector('[part=header]')).to.null;
      expect(el.footer).to.equal(footerText);
      expect(el.shadowRoot.querySelector('[part=footer]').textContent).to.equal(footerText);
      expect(el.innerHTML).to.equal(slotContent);
    });

    it('Should display correctly when pass menu data but not set header', async () => {
      const slotContent = '<p>Slot Content</p>';
      const el = await fixture(`<ef-card>${slotContent}</ef-card>`);
      el.config = {
        menu: {
          data: menuData
        }
      };
      await elementUpdated(el);
      expect(el.header).to.null;
      expect(el.shadowRoot.querySelector('[part=header-text]')).to.null;
      expect(el.footer).to.null;
      expect(el.shadowRoot.querySelector('[part=footer]')).to.null;
      expect(el.innerHTML).to.equal(slotContent);
      expect(el.shadowRoot.querySelectorAll('[part=menu-button]').length).to.equal(1);
    });

    it('Should display correctly when has content, footer and header', async () => {
      const slotContent = "<p>display slot content</p>";
      const defaultElement = await fixture(`<ef-card header="Sample Card" footer="Footer Info">${slotContent}</ef-card>`);
      await elementUpdated(defaultElement);
      expect(defaultElement.innerHTML).to.equal(slotContent);
      expect(defaultElement.shadowRoot.querySelector('[part=header-text]').textContent).to.equal(defaultElement.header);
      expect(defaultElement.shadowRoot.querySelector('[part=footer]').textContent).to.equal(defaultElement.footer);
    });

    it('Should display correctly if set header and footer but no content', async () => {
      const headerText = 'Sample Card';
      const footerText = 'Footer info';
      const el = await fixture(`<ef-card header="${headerText}" footer="${footerText}"></ef-card>`);
      await elementUpdated(el);
      expect(el.innerHTML).to.empty;
      expect(el.shadowRoot.querySelector('[part=header-text]').textContent).to.equal(headerText);
      expect(el.shadowRoot.querySelector('[part=footer]').textContent).to.equal(footerText);
    });

    it('Should fire event item-trigger when tapping on menu-item by user\'s interactions', async () => {
      const el = await fixture('<ef-card header="Sample Card" footer="Footer Info"></ef-card>');
      el.config = {
        menu: {
          data: menuData
        }
      };

      el.addEventListener('item-trigger', (event) => {
        if(event.detail.value){
          el.menu.opened = false;
        }
      });

      await elementUpdated(el);

      expect(el.shadowRoot.querySelector('[part=header-text]').textContent).to.equal(el.header);
      expect(el.shadowRoot.querySelector('[part=footer]').textContent).to.equal(el.footer);
      expect(el.shadowRoot.querySelectorAll('[part=menu-button]').length).to.equal(1);
      expect(el.menu.opened).to.equal(false);

      // Tap on button to show menu
      setTimeout(() => el.buttonElement.dispatchEvent(new Event('tap')));
      await oneEvent(el.buttonElement, 'tap');
      await elementUpdated(el);
      expect(el.menu.opened).to.equal(true);

      // Click on menu items to selected value
      const menuItems = el.menuElement.shadowRoot.querySelectorAll('ef-item');
      setTimeout(()=>menuItems[0].click());
      let event = await oneEvent(el, 'item-trigger');
      await elementUpdated(el);
      expect(el.menu.opened).to.equal(false);
      expect(event.detail.value).to.equal(menuData[0].value);
    });

    it('Should create menu when set menu data programmatically after card created', async () => {
      const el = await fixture('<ef-card></ef-card>');
      el.config = {};
      await elementUpdated(el);
      expect(el.shadowRoot.querySelectorAll('[part=menu-button]').length).to.equal(0);
      el.config = {
        menu: {
          data: menuData
        }
      };
      await elementUpdated(el);
      expect(el.shadowRoot.querySelectorAll('[part=menu-button]').length).to.equal(1);
    });
  });
});


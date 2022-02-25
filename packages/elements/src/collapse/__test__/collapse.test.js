import { fixture, expect, oneEvent, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/collapse';
import '@refinitiv-ui/elemental-theme/light/ef-collapse';

describe('collapse/Collapse', () => {

  describe('Should Have Correct DOM', () => {
    it('Label and DOM structure is correct', async () => {
      const el = await fixture('<ef-collapse></ef-collapse>');
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Label and DOM structure is correct with spacing', async () => {
      const el = await fixture('<ef-collapse spasing></ef-collapse>');
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Label and DOM structure is correct with header', async () => {
      const el = await fixture('<ef-collapse header="Header"></ef-collapse>');
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Label and DOM structure is correct with level', async () => {
      const el = await fixture('<ef-collapse level="1"></ef-collapse>');
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Label and DOM structure is correct without level', async () => {
      const el = await fixture('<ef-collapse level></ef-collapse>');
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  it('Contains all slots', async () => {
    const el = await fixture('<ef-collapse></ef-collapse>');
    const headerLeftSlot = el.shadowRoot.querySelector('slot[name=header-left]');
    const headerRightSlot = el.shadowRoot.querySelector('slot[name=header-right]');

    expect(headerLeftSlot).to.not.be.null;
    expect(headerRightSlot).to.not.be.null;
  });

  describe('Should Have Correct Properties', () => {

    it('Should have default value of property', async () => {
      const el = await fixture('<ef-collapse></ef-collapse>');
      const header = el.shadowRoot.querySelector('[part=header]');

      expect(el.header).to.be.equal('');
      expect(el.hasAttribute('header')).to.equal(false, 'attribute "header" should not be exists');
      expect(el.getAttribute('header')).to.equal(null, 'attribute "header" should equal null');
      expect(el.level).to.equal('3');
      expect(header.hasAttribute('level')).to.equal(true, 'attribute "level" should be exists');
      expect(header.getAttribute('level')).to.equal('3', 'attribute "level" should equal "3"');
      expect(el.expanded).to.equal(false);
      expect(el.getAttribute('expanded')).to.equal(null, 'attribute "expanded" should equal null');
      expect(el.hasAttribute('expanded')).to.equal(false, 'attribute "expanded" should not be exists');
      expect(el.spacing).to.equal(false);
      expect(el.hasAttribute('spacing')).to.equal(false, 'attribute "spacing" should not be exists');
      expect(el.getAttribute('spacing')).to.equal(null, 'attribute "spacing" should equal null');
    });

    it('Spacing property', async () => {
      const el = await fixture('<ef-collapse></ef-collapse>');

      expect(el.spacing).to.equal(false);
      expect(el.hasAttribute('spacing')).to.equal(false, 'attribute "spacing" should not be exists');
      expect(el.getAttribute('spacing')).to.equal(null, 'attribute "spacing" should equal null');

      el.setAttribute('spacing', '');
      expect(el.spacing).to.equal(true);
      expect(el.hasAttribute('spacing')).to.equal(true, 'attribute "spacing" should be exists');
      expect(el.getAttribute('spacing')).to.equal('', 'attribute "spacing" should equal ""');

      el.spacing = false;
      await elementUpdated(el);
      expect(el.spacing).to.equal(false);
      expect(el.hasAttribute('spacing')).to.equal(true, 'property "spacing" should not reflected');
      expect(el.getAttribute('spacing')).to.equal('', 'property "spacing" should not reflected');

    });

    it('Header property', async () => {
      const el = await fixture('<ef-collapse></ef-collapse>');

      expect(el.header).to.be.equal('');
      expect(el.hasAttribute('header')).to.equal(false, 'attribute "header" should not be exists');
      expect(el.getAttribute('header')).to.equal(null, 'attribute "header" should equal null');

      el.setAttribute('header', 'Header');
      expect(el.header).to.equal('Header');
      expect(el.hasAttribute('header')).to.equal(true, 'attribute "header" should be exists');
      expect(el.getAttribute('header')).to.equal('Header', 'attribute "header" should equal "Header"');

      el.header = '';
      await elementUpdated(el);
      expect(el.header).to.be.equal('');
      expect(el.hasAttribute('header')).to.equal(true, 'property "header" should not reflected');
      expect(el.getAttribute('header')).to.equal('Header', 'property "header" should not reflected');
    });

    it('Level property', async () => {
      const el = await fixture('<ef-collapse></ef-collapse>');
      const header = el.shadowRoot.querySelector('[part=header]');

      expect(el.level).to.equal('3');
      expect(header.hasAttribute('level')).to.equal(true, 'attribute "level" should be exists');
      expect(header.getAttribute('level')).to.equal('3', 'attribute "level" should equal "3"');

      el.setAttribute('level', '2');
      await elementUpdated(el);
      expect(el.level).to.equal('2');
      expect(header.hasAttribute('level')).to.equal(true, 'attribute "level" should be exists');
      expect(header.getAttribute('level')).to.equal('2', 'attribute "level" should equal "2"');

      el.level = '1';
      expect(el.level).to.equal('1');
      expect(header.hasAttribute('level')).to.equal(true, 'property "level" should not reflected');
      expect(header.getAttribute('level')).to.equal('2', 'property "level" should not reflected');
    });

    it('Expanded property', async () => {
      const el = await fixture('<ef-collapse></ef-collapse>');

      expect(el.expanded).to.equal(false);
      expect(el.getAttribute('expanded')).to.equal(null, 'attribute "expanded" should equal null');
      expect(el.hasAttribute('expanded')).to.equal(false, 'attribute "expanded" should not be exists');

      el.setAttribute('expanded', '');
      expect(el.expanded).to.equal(true);
      expect(el.hasAttribute('expanded')).to.equal(true, 'attribute "expanded" should be exists');
      expect(el.getAttribute('expanded')).to.equal('', 'attribute "expanded" should equal ""');

      el.expanded = false;
      await elementUpdated(el);
      expect(el.expanded).to.equal(false);
      expect(el.getAttribute('expanded')).to.equal(null, 'property "expanded" should reflected');
      expect(el.hasAttribute('expanded')).to.equal(false, 'property "expanded" should reflected');
    });
  });

  it('aria-level is reflected', async () => {
    const el = await fixture('<ef-collapse aria-level="4"></ef-collapse>');
    const heading = el.shadowRoot.querySelector('[part=heading]');
    expect(heading.getAttribute('aria-level')).to.equal('4', 'aria-level should reflected');

    el.setAttribute('aria-level', '3');
    await elementUpdated(el);
    expect(heading.getAttribute('aria-level')).to.equal('3', 'aria-level should change with parent');

    el.removeAttribute('aria-level');
    await elementUpdated(el);
    expect(heading.getAttribute('aria-level')).to.equal(null, 'aria-level can be removed');
  });

  describe('Should Have Correct Content Height', () => {
    it('Should collapse by default', async () => {
      const el = await fixture('<ef-collapse></ef-collapse>');
      const content = el.shadowRoot.querySelector('[part=content]');

      expect(el.getAttribute('expanded')).to.equal(null, 'attribute "expanded" should equal null');
      expect(el.hasAttribute('expanded')).to.equal(false, 'attribute "expanded" should not be exists');
      expect(getComputedStyle(content).getPropertyValue('height')).to.equal('0px');
    });

    it('Should has correctly height when expanded is true', async () => {
      const el = await fixture('<ef-collapse expanded><div style="height: 100px"></div></ef-collapse>');

      expect(el.hasAttribute('expanded')).to.equal(true, 'attribute "expanded" should be exists');
      expect(el.getAttribute('expanded')).to.equal('', 'attribute "expanded" should equal ""');
      expect(el.getContentHeight()).to.equal(100, 'should have a 100px height');
    });
  });

  describe('Should Handle Click', () => {
    it('Should fire expanded-changed event when tap header to expand', async () => {
      const el = await fixture('<ef-collapse></ef-collapse>');
      const header = el.shadowRoot.querySelector('[part=header-toggle]');

      setTimeout(() => header.dispatchEvent(new Event('tap', { bubbles: true })));
      const { detail } = await oneEvent(el, 'expanded-changed');
      expect(detail.value).to.equal(true);
    });

    it('Should not fire expanded-changed event when tap other element', async () => {
      const el = await fixture(`
        <ef-collapse>
            <div slot="header-right" class="badge">8</div>
        </ef-collapse>`);
      const header = el.shadowRoot.querySelector('[part=header]');
      const slot = header.querySelector('slot[name=header-right]');

      setTimeout(() => slot.dispatchEvent(new Event('tap', { bubbles: true })));
      oneEvent(el, 'expanded-changed')
        .then(() => {
          assert.throws('the event doesn\'t have to be called');
        })
        .catch(error => {
          expect(error).to.be.exist;
        });
    });
  });

  describe('Should Toggle', () => {
    it('should changed expanded property', async () => {
      const el = await fixture('<ef-collapse></ef-collapse>');

      expect(el.getAttribute('expanded')).to.equal(null, 'attribute "expanded" should equal null');
      expect(el.hasAttribute('expanded')).to.equal(false, 'attribute "expanded" should not be exists');
      el.toggle();
      await elementUpdated(el);
      expect(el.hasAttribute('expanded')).to.equal(true, 'attribute "expanded" should be exists');
      expect(el.getAttribute('expanded')).to.equal('', 'attribute "expanded" should equal ""');
    });
  });

  describe('Cancel expanded-changed event', () => {
    it('Should not change expanded property', async () => {
      const el = await fixture('<ef-collapse expanded></ef-collapse>');
      const header = el.shadowRoot.querySelector('[part=header-toggle]');
      const expanded = el.expanded;

      const onExpandedEvent = (e) => e.preventDefault();
      el.addEventListener('expanded-changed', onExpandedEvent);

      setTimeout(() => header.dispatchEvent(new Event('tap')));
      await oneEvent(el, 'expanded-changed');
      await elementUpdated(el);
      expect(el.expanded).to.equal(expanded);
      expect(el.hasAttribute('expanded')).to.equal(expanded);
    });
  });
});

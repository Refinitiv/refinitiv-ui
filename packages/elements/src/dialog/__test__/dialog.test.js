import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/dialog';
import { MAIN_MOUSE_BUTTON } from '../../../lib/dialog/draggable-element.js';
import '@refinitiv-ui/elemental-theme/light/ef-dialog';
import '@refinitiv-ui/elements/overlay';

describe('dialog/Dialog', () => {

  it('Should renders DOM structure correctly', async () => {
    const el = await fixture('<ef-dialog></ef-dialog>');

    expect(el).shadowDom.to.equalSnapshot({
      ignoreAttributes: ['class', 'tabindex']
    });
  });

  it('Contains all slots', async () => {
    const el = await fixture('<ef-dialog></ef-dialog>');
    const footerSlot = el.shadowRoot.querySelector('slot[name=footer]');

    expect(footerSlot).to.not.be.null;
  });

  it('Should be able to set dialog header via header property, but attribute still the same', async () => {
    const el = await fixture('<ef-dialog></ef-dialog>');
    const headerPart = el.shadowRoot.querySelector('[part=header]');

    let newHeader = 'New Header';
    el.header = newHeader;
    await elementUpdated(el);
    expect(headerPart.textContent.trim()).to.not.equal(newHeader);
    expect(el.getAttribute('header')).to.not.equal(newHeader);

    el.opened = true;
    await elementUpdated(el);
    expect(headerPart.textContent.trim()).to.equal(newHeader);
    expect(el.getAttribute('header')).to.not.equal(newHeader);
  });

  describe('Resize Behavior', () => {
    it('Refit method should successfully invoked', async () => {
      const el = await fixture('<ef-dialog></ef-dialog>');
      el.refit();
      await elementUpdated(el);
    });
  });

  describe('Default Confirm and Cancel', () => {
    it('Should fire confirm event on confirm btn press', async () => {
      const el = await fixture('<ef-dialog></ef-dialog>');
      el.opened = true;
      await elementUpdated(el);
      const btn = el.shadowRoot.querySelector('[cta]');
      setTimeout(() => {
        btn.dispatchEvent(new CustomEvent('tap'));
      });
      await oneEvent(el, 'confirm');
      expect(el.opened).to.equal(false);
    });

    it('Should fire cancel event on close btn press', async () => {
      const el = await fixture('<ef-dialog></ef-dialog>');
      el.opened = true;
      await elementUpdated(el);
      const btn = el.shadowRoot.querySelector('[part="close"]');
      setTimeout(() => {
        btn.dispatchEvent(new CustomEvent('tap'));
      });
      await oneEvent(el, 'cancel');
      expect(el.opened).to.equal(false);
    });
  });

  describe('Draggable Element Behavior', () => {
    it('should be draggable', async () => {
      const el = await fixture('<ef-dialog></ef-dialog>');

      el.opened = true;
      await elementUpdated(el);
      el.draggable = true;
      await elementUpdated(el);
      expect(el.hasAttribute('draggable')).to.equal(true, 'attribute draggable need to be present');
      expect(el.draggable).to.equal(true, 'property draggable should be equal true');
    });

    describe('Should Catch Mouse Events', () => {
      it('should catch mouse down', async () => {
        const el = await fixture('<ef-dialog></ef-dialog>');

        el.opened = true;
        await elementUpdated(el);
        el.draggable = true;
        await elementUpdated(el);

        const eventMouseDown = new MouseEvent('mousedown');

        el.handle.dispatchEvent(eventMouseDown);
      });
      it('should not catch mouse down right button', async () => {
        const el = await fixture('<ef-dialog></ef-dialog>');

        el.opened = true;
        await elementUpdated(el);
        el.draggable = true;
        await elementUpdated(el);

        const eventMouseDown = new MouseEvent('mousedown', { button: MAIN_MOUSE_BUTTON + 1 });

        el.handle.dispatchEvent(eventMouseDown);
      });
      it('should catch mouse move', async () => {
        const el = await fixture('<ef-dialog></ef-dialog>');

        el.opened = true;
        await elementUpdated(el);
        el.draggable = true;
        await elementUpdated(el);

        const eventMouseDown = new MouseEvent('mousedown');
        const eventMouseMove = new MouseEvent('mousemove', { button: MAIN_MOUSE_BUTTON });

        el.handle.dispatchEvent(eventMouseDown);
        await elementUpdated(el);

        document.dispatchEvent(eventMouseMove);
        await elementUpdated(el);
      });
      it('should catch mouse move and release on right button', async () => {
        const el = await fixture('<ef-dialog></ef-dialog>');

        el.opened = true;
        await elementUpdated(el);
        el.draggable = true;
        await elementUpdated(el);

        const eventMouseDown = new MouseEvent('mousedown');
        const eventMouseMove = new MouseEvent('mousemove', { button: MAIN_MOUSE_BUTTON + 1 });

        el.handle.dispatchEvent(eventMouseDown);
        await elementUpdated(el);

        el.draggable = false;

        await elementUpdated(el);

        document.dispatchEvent(eventMouseMove);
        await elementUpdated(el);
      });
      it('should catch mouse up', async () => {
        const el = await fixture('<ef-dialog></ef-dialog>');

        el.opened = true;
        await elementUpdated(el);
        el.draggable = true;
        await elementUpdated(el);

        const eventMouseDown = new MouseEvent('mousedown');
        const eventMouseMove = new MouseEvent('mousemove', { button: MAIN_MOUSE_BUTTON });
        const eventMouseUp = new MouseEvent('mouseup', { button: MAIN_MOUSE_BUTTON });

        el.handle.dispatchEvent(eventMouseDown);
        await elementUpdated(el);

        document.dispatchEvent(eventMouseMove);
        await elementUpdated(el);

        document.dispatchEvent(eventMouseUp);
        await elementUpdated(el);
      });
    });
  });
  describe('Accessibility test', () => {
    it('aria-label should be displayed the default header', async () => {
      const el = await fixture('<ef-dialog></ef-dialog>');
      expect(el.ariaLabel).to.equal('Dialog');
    });
    it('aria-label should be displayed the header', async () => {
      const el = await fixture('<ef-dialog header="System Permission"></ef-dialog>');
      expect(el.ariaLabel).to.equal('System Permission');
    });
    it('aria-label should be displayed when user add text to aria-label', async () => {
      const el = await fixture('<ef-dialog aria-label="test dialog" header="System Permission"></ef-dialog>');
      expect(el.ariaLabel).to.equal('test dialog');
    });
    it('aria-label should not displayed if aria-labelledby is present', async () => {
      const el = await fixture('<ef-dialog aria-labelledby="testId" header="System Permission"></ef-dialog>');
      expect(el.ariaLabel).to.equal(null);
    });
  });
});


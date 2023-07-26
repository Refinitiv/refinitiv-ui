// import element and theme
import '@refinitiv-ui/elements/dialog';
import '@refinitiv-ui/elements/overlay';

import '@refinitiv-ui/elemental-theme/light/ef-dialog';
import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

import { MAIN_MOUSE_BUTTON } from '../../../lib/dialog/draggable-element.js';

describe('dialog/Dialog', function() {
  it('Should renders DOM structure correctly', async function() {
    const el = await fixture('<ef-dialog></ef-dialog>');

    await expect(el).shadowDom.to.equalSnapshot({
      ignoreAttributes: ['class', 'tabindex']
    });
  });

  it('Contains all slots', async function() {
    const el = await fixture('<ef-dialog></ef-dialog>');
    const footerSlot = el.shadowRoot.querySelector('slot[name=footer]');

    expect(footerSlot).to.not.be.null;
  });

  it('Should be able to set dialog header via header property, but attribute still the same', async function() {
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

  describe('Resize Behavior', function() {
    it('Refit method should successfully invoked', async function() {
      const el = await fixture('<ef-dialog></ef-dialog>');
      el.refit();
      await elementUpdated(el);
    });
  });

  describe('Default Confirm and Cancel', function() {
    it('Should fire confirm event on confirm btn press', async function() {
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

    it('Should fire cancel event on close btn press', async function() {
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

    it('Should fire cancel event on press Escape key', async function() {
      const el = await fixture('<ef-dialog></ef-dialog>');
      el.opened = true;
      await elementUpdated(el);
      const keyUpEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      setTimeout(() => el.dispatchEvent(keyUpEvent));
      await oneEvent(el, 'cancel');
      expect(el.opened).to.equal(false);
    });

    it('Should fire cancel event on tap the backdrop if enabled canceling on outside click', async function() {
      const el = await fixture('<ef-dialog></ef-dialog>');
      el.opened = true;
      el.noCancelOnOutsideClick = false;
      await elementUpdated(el);
      setTimeout(() => document.dispatchEvent(new CustomEvent('tapstart')));
      await oneEvent(el, 'cancel');
      expect(el.opened).to.equal(false);
    });

    it('Should not close the dialog if set prevent default to the cancel event', async function() {
      const el = await fixture('<ef-dialog></ef-dialog>');
      el.opened = true;
      el.noCancelOnOutsideClick = false;
      await elementUpdated(el);
      el.addEventListener('cancel', (event) => event.preventDefault());
      setTimeout(() => document.dispatchEvent(new CustomEvent('tapstart')));
      await oneEvent(el, 'cancel');
      expect(el.opened).to.equal(true);
    });
  });

  describe('Draggable Element Behavior', function() {
    it('should be draggable', async function() {
      const el = await fixture('<ef-dialog></ef-dialog>');

      el.opened = true;
      await elementUpdated(el);
      el.draggable = true;
      await elementUpdated(el);
      expect(el.hasAttribute('draggable')).to.equal(true, 'attribute draggable need to be present');
      expect(el.draggable).to.equal(true, 'property draggable should be equal true');
    });

    describe('Should Catch Mouse Events', function() {
      it('should catch mouse down', async function() {
        const el = await fixture('<ef-dialog></ef-dialog>');

        el.opened = true;
        await elementUpdated(el);
        el.draggable = true;
        await elementUpdated(el);

        const eventMouseDown = new MouseEvent('mousedown');

        el.handle.dispatchEvent(eventMouseDown);
      });
      it('should not catch mouse down right button', async function() {
        const el = await fixture('<ef-dialog></ef-dialog>');

        el.opened = true;
        await elementUpdated(el);
        el.draggable = true;
        await elementUpdated(el);

        const eventMouseDown = new MouseEvent('mousedown', { button: MAIN_MOUSE_BUTTON + 1 });

        el.handle.dispatchEvent(eventMouseDown);
      });
      it('should catch mouse move', async function() {
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
      it('should catch mouse move and release on right button', async function() {
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
      it('should catch mouse up', async function() {
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
});

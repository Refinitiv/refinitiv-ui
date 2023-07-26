// import element and theme
import '@refinitiv-ui/elements/notification';

import '@refinitiv-ui/elemental-theme/light/ef-notification';
import { elementUpdated, expect, fixture, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';

describe('notification/Notification', function() {
  describe('Default', function() {
    let el;

    beforeEach(async function() {
      el = await fixture('<ef-notification></ef-notification>');
    });

    it('DOM structure is correct', async function() {
      await expect(el).shadowDom.to.equalSnapshot();
    });

    describe('Attributes/Properties', function() {
      it('Should show message and message attribute is correct', async function() {
        const message = 'Hello';
        el.setAttribute('message', message);
        await elementUpdated(el);
        await nextFrame();
        await nextFrame(); // Safari needed double extra frames
        expect(el.message).to.equal(message);
        expect(el.shadowRoot.querySelector('[part=content]').innerText).to.equal(message);
      });

      it('Confirm attribute is correct', async function() {
        el.confirm = true;
        await elementUpdated(el);
        expect(el.hasAttribute('confirm')).to.be.true;
      });

      it('Warning attribute is correct', async function() {
        el.warning = true;
        await elementUpdated(el);
        expect(el.hasAttribute('warning')).to.be.true;
      });

      it('Error attribute is correct', async function() {
        el.error = true;
        await elementUpdated(el);
        expect(el.hasAttribute('error')).to.be.true;
      });

      it('Collapsed attribute is correct', async function() {
        el.collapsed = true;
        await elementUpdated(el);
        expect(el.hasAttribute('collapsed')).to.be.true;
      });
    });

    describe('Element interaction', function() {
      it('Collapse notification by change properties', async function() {
        expect(el.collapsed).to.be.false;
        el.collapsed = true;
        await oneEvent(el, 'collapsed');
        expect(el.collapsed).to.be.true;
      });

      it('Collapsed by click clear button', async function() {
        expect(el.collapsed).to.be.false;
        setTimeout(() => el.shadowRoot.querySelector('[part=clear]').click());
        await elementUpdated(el);
        await oneEvent(el, 'collapsed');
        expect(el.collapsed).to.be.true;
      });

      it('Toggle collapsed state', async function() {
        expect(el.collapsed).to.be.false;
        el.collapsed = true;

        await elementUpdated(el);
        await oneEvent(el, 'collapsed');
        expect(el.collapsed).to.be.true;

        el.collapsed = false;
        await elementUpdated(el);
        expect(el.collapsed).to.be.false;
      });
    });

    describe('API', function() {
      it('Dismiss element', async function() {
        setTimeout(() => el.dismiss());
        await oneEvent(el, 'dismiss');
        await oneEvent(el, 'collapsed');
        await elementUpdated(el);
        expect(el.collapsed).to.be.true;
      });
    });

    describe('Events', function() {
      it('Should dispatch dismiss event', async function() {
        setTimeout(() => el.dismiss());
        await oneEvent(el, 'dismiss');
      });

      it('Should dispatch collapsed event', async function() {
        setTimeout(() => el.shadowRoot.querySelector('[part=clear]').click());
        await oneEvent(el, 'collapsed');
        expect(el.collapsed).to.be.true;
      });
    });

    describe('Theme and CSS Variables', function() {
      it('Should have info color', function() {
        expect(el.getComputedVariable('--background-color')).to.not.equal(null);
      });

      it('Should have confirm color', async function() {
        el.confirm = true;
        expect(el.getComputedVariable('--background-color')).to.not.equal(null);
      });

      it('Should have warning color', async function() {
        el.warning = true;
        expect(el.getComputedVariable('--background-color')).to.not.equal(null);
      });

      it('Should have error color', async function() {
        el.error = true;
        expect(el.getComputedVariable('--background-color')).to.not.equal(null);
      });
    });
  });
});

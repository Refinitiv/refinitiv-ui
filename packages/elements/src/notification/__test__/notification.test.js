import { fixture, expect, elementUpdated, oneEvent, nextFrame } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/notification';
import '@refinitiv-ui/elemental-theme/light/ef-notification';

describe('notification/Notification', () => {
  describe('Default', () => {

    let el;

    beforeEach(async () => {
      el = await fixture('<ef-notification></ef-notification>');
    });

    it('DOM structure is correct', async () => {
      expect(el).shadowDom.to.equalSnapshot();
    });

    describe('Attributes/Properties', () => {

      it('Should show message and message attribute is correct', async () => {
        const message = 'Hello';
        el.setAttribute('message', message)
        await elementUpdated(el);
        await nextFrame();
        await nextFrame(); // Safari needed double extra frames
        expect(el.message).to.equal(message);
        expect(el.shadowRoot.querySelector('[part=content]').innerText).to.equal(message);
      });

      it('Confirm attribute is correct', async () => {
        el.confirm = true;
        await elementUpdated(el);
        expect(el.hasAttribute('confirm')).to.be.true;
      });

      it('Warning attribute is correct', async () => {
        el.warning = true;
        await elementUpdated(el);
        expect(el.hasAttribute('warning')).to.be.true;
      });

      it('Error attribute is correct', async () => {
        el.error = true;
        await elementUpdated(el);
        expect(el.hasAttribute('error')).to.be.true;
      });

      it('Collapsed attribute is correct', async () => {
        el.collapsed = true;
        await elementUpdated(el);
        expect(el.hasAttribute('collapsed')).to.be.true;
      });
    });

    describe('Element interaction', () => {
      it('Collapse notification by change properties', async () => {
        expect(el.collapsed).to.be.false;
        el.collapsed = true;
        await oneEvent(el, 'collapsed');
        expect(el.collapsed).to.be.true;
      });

      it('Collapsed by click clear button', async () => {
        expect(el.collapsed).to.be.false;
        setTimeout(() => el.shadowRoot.querySelector('[part=clear]').click());
        await elementUpdated(el);
        await oneEvent(el, 'collapsed');
        expect(el.collapsed).to.be.true;
      });

      it('Toggle collapsed state', async () => {
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

    describe('API', () => {
      it('Dismiss element', async () => {
        setTimeout(() => el.dismiss());
        await oneEvent(el, 'dismiss');
        await oneEvent(el, 'collapsed');
        await elementUpdated(el);
        expect(el.collapsed).to.be.true;
      });
    });

    describe('Events', () => {
      it('Should dispatch dismiss event', async () => {
        setTimeout(() => el.dismiss());
        await oneEvent(el, 'dismiss');
      });

      it('Should dispatch collapsed event', async () => {
        setTimeout(() => el.shadowRoot.querySelector('[part=clear]').click());
        await oneEvent(el, 'collapsed');
        expect(el.collapsed).to.be.true;
      });
    });

    describe('Theme and CSS Variables', () => {
      it('Should have info color', async () => {
        expect(el.getComputedVariable('--background-color')).to.not.equal(null);
      });

      it('Should have confirm color', async () => {
        el.confirm = true;
        expect(el.getComputedVariable('--background-color')).to.not.equal(null);
      });

      it('Should have warning color', async () => {
        el.warning = true;
        expect(el.getComputedVariable('--background-color')).to.not.equal(null);
      });

      it('Should have error color', async () => {
        el.error = true;
        expect(el.getComputedVariable('--background-color')).to.not.equal(null);
      });
    });
  });
});

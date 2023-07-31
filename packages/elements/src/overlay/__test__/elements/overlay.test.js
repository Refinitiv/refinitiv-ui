import '@refinitiv-ui/elements/overlay';

import { elementUpdated, expect, fixture, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';

import { openedUpdated } from '../mocks/helper';

describe('overlay/elements/Overlay', function() {
  describe('Methods', function() {
    let originWarn = null;
    const customWarn = () => {};

    beforeEach(function() {
      originWarn = console.warn;
      console.warn = customWarn;
    });

    afterEach(function() {
      console.warn = originWarn;
    });

    describe('Properties and Attributes', function() {
      it('Test fullyOpened property', async function() {
        const overlay = await fixture('<ef-overlay>test</ef-overlay>');

        overlay.opened = true;

        await elementUpdated(overlay);

        expect(overlay.fullyOpened).to.equal(false, 'Overlay should not be fully opened, just in process');

        await nextFrame();
        await nextFrame();

        expect(overlay.fullyOpened).to.equal(true, 'Overlay should be fully opened');
      });

      // TODO: add transitioning=true check
      it('Test transitioning property', async function() {
        const overlay = await fixture('<ef-overlay opened>test</ef-overlay>');

        await openedUpdated(overlay);

        expect(overlay.transitioning).to.equal(false, 'Overlay should be fully opened');
      });
    });

    describe('General Functionality', function() {
      it('Test animation style', async function() {
        const overlay = await fixture('<ef-overlay transition-style="fade">test</ef-overlay>');

        await openedUpdated(overlay);

        setTimeout(() => (overlay.opened = true));

        const openedEvent = await oneEvent(overlay, 'opened');

        expect(openedEvent).to.be.exist;

        setTimeout(() => (overlay.opened = false));

        const closedEvent = await oneEvent(overlay, 'closed');

        expect(closedEvent).to.be.exist;
      });

      it('Test fullscreen property', async function() {
        const overlay = await fixture('<ef-overlay full-screen>test</ef-overlay>');
        await openedUpdated(overlay);

        const config = overlay.positionTargetConfig;

        expect(config.position).to.eql([['center', 'middle']]);
        expect(config.rect.top).to.equal(0);
        expect(config.rect.bottom).to.equal(0);
        expect(config.rect.left).to.equal(0);
        expect(config.rect.right).to.equal(0);
      });

      it('Test fullscreen property with opened state', async function() {
        const overlay = await fixture('<ef-overlay opened>test</ef-overlay>');
        await openedUpdated(overlay);

        overlay.fullScreen = true;

        await openedUpdated(overlay);

        const rect = overlay.getBoundingClientRect();
        const screenWidth = document.documentElement.clientWidth;
        const screenHeight = document.documentElement.clientHeight;

        expect(rect.top).to.equal(0);
        expect(rect.right).to.equal(screenWidth);
        expect(rect.bottom).to.equal(screenHeight);
        expect(rect.left).to.equal(0);
      });

      it('Test refit method with closed window', async function() {
        const overlay = await fixture('<ef-overlay>test</ef-overlay>');
        await openedUpdated(overlay);

        let callCount = 0;
        overlay.addEventListener('refit', () => {
          callCount += 1;
        });

        overlay.refit();

        await openedUpdated(overlay);

        expect(callCount).to.equal(0, 'Event refit should not be fired');
      });

      it('Test fit method with closed window', async function() {
        const overlay = await fixture('<ef-overlay>test</ef-overlay>');
        await openedUpdated(overlay);

        let callCount = 0;
        overlay.addEventListener('refit', () => {
          callCount += 1;
        });

        overlay.fit();

        await openedUpdated(overlay);

        expect(callCount).to.equal(0, 'Event refit should not be fired');
      });

      it('Test prevent opened-changed event', async function() {
        const overlay = await fixture('<ef-overlay full-screen>test</ef-overlay>');
        await openedUpdated(overlay);

        overlay.addEventListener('opened-changed', (event) => {
          event.preventDefault();
        });

        overlay.setOpened(false);
        await openedUpdated(overlay);

        expect(overlay.opened).to.equal(false);
      });
    });
  });
});

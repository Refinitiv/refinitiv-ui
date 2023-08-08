// import element and theme
import '@refinitiv-ui/elements/notification';

import '@refinitiv-ui/elemental-theme/light/ef-notification';
import { elementUpdated, expect, fixture, oneEvent } from '@refinitiv-ui/test-helpers';

describe('notification/NotificationTray', function () {
  describe('Notification Tray', function () {
    let el;

    const NotificationType = {
      INFO: 'INFO',
      CONFIRM: 'CONFIRM',
      WARN: 'WARN',
      ERROR: 'ERROR'
    };

    beforeEach(async function () {
      el = await fixture('<ef-notification-tray></ef-notification-tray>');
    });

    it('DOM structure is correct', async function () {
      await expect(el).shadowDom.to.equalSnapshot();
    });

    describe('Attributes/Properties', function () {
      it('Max attribute is correct', async function () {
        let max = 5;
        expect(el.setAttribute('max', max));
        await elementUpdated(el);
        expect(el.max).to.equal(max);
      });

      it("Assign 'top' to 'attach' attribute", async function () {
        el = await fixture('<ef-notification-tray attach="top"></ef-notification-tray>');
        expect(el.attach).to.equal('top');
      });

      it("Assign 'bottom' to 'attach' attribute", async function () {
        el = await fixture('<ef-notification-tray attach="bottom"></ef-notification-tray>');
        expect(el.setAttribute('attach', 'bottom'));
      });
    });

    describe('Element Interaction', function () {
      it('Dissmiss notification items', async function () {
        const notification1 = document.createElement('ef-notification');
        const notification2 = document.createElement('ef-notification');

        el.push(notification1, {
          message: 'Hello',
          duration: 100,
          type: NotificationType.CONFIRM
        });

        el.push(notification2, {
          message: 'Hi',
          duration: 100,
          type: NotificationType.CONFIRM
        });

        setTimeout(() => notification1.shadowRoot.querySelector('[part=clear]').click());
        await oneEvent(notification1, 'collapsed');

        setTimeout(() => notification2.shadowRoot.querySelector('[part=clear]').click());
        await oneEvent(notification2, 'collapsed');
      });
    });

    describe('API', function () {
      it('Push notification items to queue', async function () {
        const notification1 = document.createElement('ef-notification');
        const notification2 = document.createElement('ef-notification');
        const notification3 = document.createElement('ef-notification');

        el.push(notification1, {
          message: 'Hello',
          duration: 100,
          type: NotificationType.CONFIRM
        });

        el.push(notification2, {
          message: 'Elf',
          duration: 100,
          type: NotificationType.WARN
        });

        el.push(notification3, {
          message: 'Element',
          duration: 100,
          type: NotificationType.WARN
        });

        await oneEvent(notification1, 'collapsed');
        await oneEvent(notification2, 'collapsed');
        await oneEvent(notification3, 'collapsed');
      });

      it('Attach point notification', async function () {
        const notification = document.createElement('ef-notification');
        el.attach = 'top';
        el.push(notification, {
          message: 'Top',
          duration: 100,
          type: NotificationType.CONFIRM
        });
        await elementUpdated(el);
        await oneEvent(notification, 'collapsed');
      });
    });
  });
});

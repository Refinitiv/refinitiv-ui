import { oneEvent, expect } from '@refinitiv-ui/test-helpers';
import { info, confirm, warn, error } from '@refinitiv-ui/elements/notification';

describe('notification/Helpers', () => {
  describe('Helpers', () => {
    it('info() should be show the correct notification', async () => {
      const message = 'Info';
      info(message, 300);
      const el = document.querySelector('ef-notification-tray');
      const notification = el.querySelector('ef-notification');
      await oneEvent(notification, 'collapsed');
      expect(notification.shadowRoot.querySelector('[part=content]').innerText).to.equal(message);
    });

    it('confirm() should be show the correct notification', async () => {
      const message = 'Confirm';
      confirm(message, 100);
      const el = document.querySelector('ef-notification-tray');
      const notification = el.querySelector('ef-notification');
      await oneEvent(notification, 'collapsed');
      expect(notification.shadowRoot.querySelector('[part=content]').innerText).to.equal(message);
      expect(notification.confirm).to.be.true;
      expect(notification.hasAttribute('confirm')).to.be.true;
    });

    it('warn() should be show the correct notification', async () => {
      const message = 'Warning';
      warn(message, 100);
      const el = document.querySelector('ef-notification-tray');
      const notification = el.querySelector('ef-notification');
      await oneEvent(notification, 'collapsed');
      expect(notification.shadowRoot.querySelector('[part=content]').innerText).to.equal(message);
      expect(notification.warning).to.be.true;
      expect(notification.hasAttribute('warning')).to.be.true;
    });

    it('error() should be show the correct notification', async () => {
      const message = 'Error';
      error(message, 100);
      const el = document.querySelector('ef-notification-tray');
      const notification = el.querySelector('ef-notification');
      await oneEvent(notification, 'collapsed');
      expect(notification.shadowRoot.querySelector('[part=content]').innerText).to.equal(message);
      expect(notification.error).to.be.true;
      expect(notification.hasAttribute('error')).to.be.true;
    });

    it('Multiple call notification should be show the correct notification', async () => {
      let notification;
      let message;

      message = 'Info';
      info(message, 100);
      const el = document.querySelector('ef-notification-tray');
      notification = el.querySelector('ef-notification');
      await oneEvent(notification, 'collapsed');
      expect(notification.shadowRoot.querySelector('[part=content]').innerText).to.equal(message);

      message = 'Confirm';
      confirm(message, 100);

      notification = el.querySelector('ef-notification');
      await oneEvent(notification, 'collapsed');
      expect(notification.shadowRoot.querySelector('[part=content]').innerText).to.equal(message);
    });
  });
});

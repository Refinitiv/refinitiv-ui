import { Notification } from '../elements/notification';
import { NotificationTray } from '../elements/notification-tray';
import { TaskOptions } from './types';

// TODO: Add to utils?
const DEV_ENV = (/^(localhost|127\.0\.0\.1)$/).test(location.hostname);

const NotificationType = {
  INFO: 'INFO',
  CONFIRM: 'CONFIRM',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

// Default notification tray to use
let tray: NotificationTray | null = null;

/**
 * Tries to reuse a tray, if one is already available.
 * Otherwise, it will create a new tray to use.
 *
 * @param name tag name of the tray
 * @param forName notification tag name
 * @returns {void} notification tray
 */
const getTray = (name: string, forName: string): void => {
  const existTray = document.querySelector(name + '[for="' + forName + '"]') as NotificationTray;
  if (existTray) {
    tray = existTray;
  }
  else {
    tray = new NotificationTray();
    tray.setAttribute('for', forName);
    tray.attach = 'top'; // attach to top
  }
};

/**
 * Connects the default tray to the document.
 * @returns {void}
 */
const connect = (): void => {
  if (document.body && tray) {
    document.body.appendChild(tray);
  }
  else {
    document.addEventListener('DOMContentLoaded', function () {
      connect();
    });
  }
};

/**
 * Prepares the default tray making sure it is available in the DOM.
 * @returns {void}
 */
const prepareTray = (): void => {

  getTray('ef-notification-tray', 'ef-notification');

  if (document.body && tray && tray.parentElement !== document.body) {
    connect();
  }
};

/**
 * Creates a notification and pushes it into the default tray.
 *
 * @param options notification task options
 * @returns instance of the `Notification`.
 */
const notify = (options: TaskOptions): Notification => {
  prepareTray();

  const el = document.createElement('ef-notification') as Notification;
  el.message = options.message;
  el.confirm = options.type === NotificationType.CONFIRM;
  el.warning = options.type === NotificationType.WARN;
  el.error = options.type === NotificationType.ERROR;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tray!.push(el, options);

  return el;
};


/**
 * Show an info notification (default)
 * @param message Message to show in the notification.
 * @param duration Duration the notification should be displayed for.
 * @returns instance of the `Notification`.
 */
const info = (message: string, duration: number): Notification => {
  return notify({
    message: message,
    duration: duration,
    type: NotificationType.INFO
  });
};

/**
 * Show a confirmation notification
 * @param message Message to show in the notification.
 * @param duration Duration the notification should be displayed for.
 * @returns instance of the `Notification`.
 */
const confirm = (message: string, duration: number): Notification => {
  return notify({
    message: message,
    duration: duration,
    type: NotificationType.CONFIRM
  });
};

/**
 * Show a warning notification
 * @param message Message to show in the notification.
 * @param duration Duration the notification should be displayed for.
 * @returns instance of the `Notification`.
 */
const warn = (message: string, duration: number): Notification => {
  return notify({
    message: message,
    duration: duration,
    type: NotificationType.WARN
  });
};

/**
 * Show an error notification
 * @param message Message to show in the notification.
 * @param duration Duration the notification should be displayed for.
 * @returns instance of the `Notification`.
 */
const error = (message: string, duration: number): Notification => {
  return notify({
    message: message,
    duration: duration,
    type: NotificationType.ERROR
  });
};

if (DEV_ENV) {
  // Show application errors, in development mode
  window.addEventListener('error', (e: ErrorEvent) => {
    error(e.message, 1000);
  });
}

export { info, confirm, warn, error };

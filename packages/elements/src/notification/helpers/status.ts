import { requireActiveElfScope } from '@refinitiv-ui/core';

import type { Notification } from '../elements/notification';
import { NotificationTray } from '../elements/notification-tray.js';
import type { TaskOptions } from './types';

const NotificationType = {
  INFO: 'INFO',
  CONFIRM: 'CONFIRM',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

// Default notification tray to use
const defaultTrays = new WeakMap<ShadowRoot, NotificationTray>();

/**
 * Remove only the default tray created by ELF for this root.
 * @param root App service boundary
 * @returns {void}
 */
export const disposeDefaultNotifications = (root: ShadowRoot): void => {
  defaultTrays.get(root)?.remove();
  defaultTrays.delete(root);
};

/**
 * Tries to reuse a tray, if one is already available.
 * Otherwise, it will create a new tray to use.
 *
 * @param name tag name of the tray
 * @param forName notification tag name
 * @returns App notification tray
 */
const getTray = (name: string, forName: string): NotificationTray => {
  const root = requireActiveElfScope().root;
  const existTray = root.querySelector<NotificationTray>(name + '[for="' + forName + '"]');
  if (existTray) {
    return existTray;
  }
  const tray = new NotificationTray();
  tray.setAttribute('for', forName);
  tray.attach = 'top';
  defaultTrays.set(root, tray);
  root.appendChild(tray);
  return tray;
};

/**
 * Creates a notification and pushes it into the default tray.
 *
 * @param options notification task options
 * @returns instance of the `Notification`.
 */
const notify = (options: TaskOptions): Notification => {
  const tray = getTray('ef-notification-tray', 'ef-notification');

  const el = document.createElement('ef-notification');
  el.message = options.message;
  el.confirm = options.type === NotificationType.CONFIRM;
  el.warning = options.type === NotificationType.WARN;
  el.error = options.type === NotificationType.ERROR;
  tray.push(el, options);

  return el;
};

/**
 * Show an info notification (default)
 * @param message Message to show in the notification.
 * @param duration Duration the notification should be displayed for.
 * @returns instance of the `Notification`.
 */
const info = (message: string, duration?: number): Notification => {
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
const confirm = (message: string, duration?: number): Notification => {
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
const warn = (message: string, duration?: number): Notification => {
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
const error = (message: string, duration?: number): Notification => {
  return notify({
    message: message,
    duration: duration,
    type: NotificationType.ERROR
  });
};

export { info, confirm, warn, error };

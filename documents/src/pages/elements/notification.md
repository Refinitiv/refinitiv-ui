<!--
type: page
title: Notification
location: ./elements/notification
layout: default
-->

# Notification
::
```javascript
::notification::

let el;
const createNotification = () => {
  el = document.createElement('ef-notification');
  el.innerText = 'Notification received at ' + new Date().toLocaleTimeString();
  el.addEventListener('dismiss', createNotification, { once: true });
  document.body.appendChild(el);
  el.style.setProperty('--background-color', 'hsl(' + Math.random() * 360 + ', 50%, 50%)');
};
createNotification();
```
::

The notification bar is used to show informative content when something happens in the application.

## Usage
`ef-notification` provides an out-of-the-box set of notification methods to use within an application.

These methods work in a similar way to those provided by `window.console`.

```javascript
import { info, confirm, warn, error } from '@refinitiv-ui/elements/notification';

// Show an info notification
info('Info Notification');

// Show a confirmation notification
confirm('Confirmation Notification', 3000/* Show for 3 seconds */);

// Show a warning notification
warn('Warning Notification', 5000/* Show for 5 seconds */);

// Show an error notification
error('Error Notification', Infinity/* Show until user dismisses */);
```

## Inserting HTML

When using the notification methods provided by the module, you can gain access to the created element using the returned result.

```javascript
import { info } from '@refinitiv-ui/elements/notification';

const notification = info('Info Notification');

notification.innerHTML = 'Hello <strong>World</strong>!';
```

## Using a custom background color

Custom background colors can be set using the `--background-color` variable.

::
```javascript
::notification::
```
```css
ef-notification {
  --background-color: #3344ff;
}
```
```html
<ef-notification>I'm a custom color!</ef-notification>
```
::

``` css
ef-notification {
  --background-color: #3344ff;
}
```

## Custom use of notifications

This element can be used natively, like any other element. Using notifications this way requires you to manage and position the element correctly within your application.

::
```javascript
::notification::
```
```html
<ef-notification>Hello Everyone! 👋</ef-notification>
<ef-notification confirm>Hello Everyone! 👋</ef-notification>
<ef-notification warning>Hello Everyone! 👋</ef-notification>
<ef-notification error>Hello Everyone! 👋</ef-notification>
```
::

``` html
<ef-notification>Hello Everyone! 👋</ef-notification>
<ef-notification confirm>Hello Everyone! 👋</ef-notification>
<ef-notification warning>Hello Everyone! 👋</ef-notification>
<ef-notification error>Hello Everyone! 👋</ef-notification>
```

## Application Error Notifications
During development, when the application is running on localhost or 127.0.0.1, application errors will be shown as a notification. This is to aid development and highlight any errors that may occur, so that they can be addressed before the application is deployed. These error messages will not be shown when your application is hosted in a non-dev environment.

## Accessibility
::a11y-intro::

`ef-notification` has a live region and is assigned `role="alert"` and uses `aria-live` to announce notification messages.

Screen reader technology will read notification messages only after the page is loaded. If you need the notification to be announced when your application starts, you have to set text content to the notification element after the page is loaded or use notification tray to popup the notification after the page is loaded.

Notifications should not disappear too quickly. The duration of the notification should be appropriate for the length of the message.

For any error or critical notifications, it shouldn't disappear automatically. The notification should stay on the page until the user dismisses it themselves.

::a11y-end::

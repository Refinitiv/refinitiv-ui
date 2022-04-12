<!--
title: Events
location: ./events
type: page
-->

::status-todo::

# Events

Events allow developers to know what has been changed, either by a user, or asynchronously.

## Inbuilt Events

There are two types of inbuilt events to use. These help with compatibility across multiple browsers and devices, and should be used instead of their native counterparts.

### Tap Event

The tap event enables consistent functionality across both touch and pointer devices. This event should be used instead of any equivalent pointer or touch events.

| Event | Replaces |
| ----- | -------- |
| tap | `click` and removes any delay on touch devices. |
| tapstart | `touchstart` and `mousedown`. |
| tapend | `touchend` and `mouseup`. |

### Focus Event

There are many inconsistencies with focusing across different browsers. Polyfilled browsers, in particular, struggle due to not being able to support the focusing requirements of Web Components.

This event is here to align all browsers, providing a reliable event to use for any focus/blur logic.

| Event | Replaces |
| ----- | -------- |
| focused-changed | `focus` and `blur`. |

## Custom Events

When building a new element it's important to expose events, so that applications can react to any changes. Events should only be triggered from user interaction, or asynchronous activity. Dispatching events during synchronous programmatic changes can lead to infinite loops and should be avoided.

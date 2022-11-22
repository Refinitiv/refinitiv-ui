<!--
title: Events
location: ./events
type: page
layout: default
-->



# Events

Events allow developers to know what has been changed on a component, either by a user, or asynchronously.

## Built-In Events

Built-In events are events that comes with EF base class. There are two types of the events to use. These help with compatibility across multiple browsers and devices, and should be used instead of their native counterparts.

### Tap Event

The tap event enables consistent functionality across both touch and pointer devices. This event should be used instead of any equivalent pointer or touch events.

| Event    | Native Counterparts                             |
| -------- | ----------------------------------------------- |
| tap      | `click` and removes any delay on touch devices. |
| tapstart | `touchstart` and `mousedown`.                   |
| tapend   | `touchend` and `mouseup`.                       |

### Focus Event

There are many inconsistencies with focusing across different browsers. Polyfilled browsers, in particular, struggle due to not being able to support the focusing requirements of Web Components.

This event is here to align all browsers, providing a reliable event to use for any focus/blur logic.

| Event           | Native Counterparts |
| --------------- | ------------------- |
| focused-changed | `focus` and `blur`. |

## Custom Events

When building a new element it's important to expose events, so that applications can react to any changes. Events should only be triggered from user interaction, or asynchronous activity. Dispatching events during synchronous programmatic changes can lead to infinite loops and should be avoided.

A good example is dispatching an event when a user taps and changes a state.

```ts
public constructor () {
  super();
  // Setup tap event listener on host
  this.addEventListener('tap', this.handleTap.bind(this));
}
/**
 * Handles tap event
 * @param event TapEvent object
 * @returns {void}
 */
protected handleTap (event: TapEvent): void {
  if (dispatchStateChangedEvent()) {
    this.toggleState();
  }
}
/**
 * Dispatches 'state-changed' event
 * @returns True if further execution can happen
 */
protected dispatchStateChangedEvent (): boolean {
  // Create the event object
  const event = new CustomEvent('state-changed', { bubbles: false });
  // Dispatch the event from the host
  this.dispatchEvent(event);
  // Return `true` if the default action hasn't been prevented
  return !event.defaultPrevented;
}
/**
 * Toggles the state of the element
 * @returns {void}
 */
protected toggleState (): void {
  this.state = !this.state;
}
```

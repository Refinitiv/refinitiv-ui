# Element Framework Test Helpers

A collection of test helper methods for Element Framework. It uses many features from [**@open-wc/testing**](https://www.npmjs.com/package/@open-wc/testing) and adding some more shared utility classes to make the testing in EF easier. For more details on the methods about `@open-wc/testing`, please check the [**documentation**](https://open-wc.org/docs/testing/helpers/).

## Mock Interactions

### keyboardEvent

Returns a keyboard event. This event bubbles and is cancellable.

- @param {string} type The type of keyboard event (such as 'keyup' or 'keydown').
- @param {CustomKeyboardEvent} The key and modifiers for the event. Accepted values are key, shiftKey, ctrlKey, altKey, metaKey

```javascript
const event = keyboardEvent('keydown', { key: 'C', ctrlKey: true });
```

Example when it's used in testing EF element.

```javascript
it('Pressing down key should open popup', async () => {
  const el = await fixture('<ef-combo-box lang="en"></ef-combo-box>');
  el.data = getData();
  await elementUpdated(el);
  const event = keyboardEvent('keydown', {
    key: 'ArrowDown'
  });
  el.dispatchEvent(event);
  await openedUpdated(el);
  expect(el.opened).to.equal(true, 'Arrow down should open popup');
});
```

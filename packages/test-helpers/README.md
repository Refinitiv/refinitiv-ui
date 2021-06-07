# ELF Test Helpers
A collection of help test methods for ELF framework.

## Default Packages
[**@open-wc/testing**](https://www.npmjs.com/package/@open-wc/testing)

A set of utility classes to make testing easier. For more details on the methods available, please check the [**documentation**](https://open-wc.org/docs/testing/helpers/).

### Mock Interactions Methods

**keyboardEvent**

Returns a keyboard event. This event bubbles and is cancellable.
* @param {string} type The type of keyboard event (such as 'keyup' or 'keydown').
* @param {CustomKeyboardEvent} The key and modifiers for the event. Accepted values are key, shiftKey, ctrlKey, altKey, metaKey

```javascript
const event = keyboardEvent('keydown', { key: 'C', ctrlKey: true  });
```


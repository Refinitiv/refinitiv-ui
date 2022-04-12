<!-- 
title: Element Types
location: ./element-types
type: page
layout: default
-->

::status-working::

# Element Types

When building your custom element, there are a couple things you need to consider. Firstly, you need to choose which base element class to extend, as this defines how the element should function in an application. Secondly, you need to choose how the element should be configured. Mostly this is done via attributes and slotted content, however, some elements will need data, or, complex configuration objects to be passed.

## Abstract Types

There are 4 base element types to choose from when building a custom element. Your choice of which type to extend depends on the element you are creating.

!> Think carefully about which base class to extend from. Changing this later could introduce breaking changes, unless handled correctly.

### Basic Element

The basic element is the simplest of all element types. It's useful for creating simplistic elements that don't require any user interaction. An example could be a logo.

```typescript
class MyLogo extends BasicElement {
  ...
}
```

### Control Element

The control element is used mainly for elements that require user interaction and need to be included in keyboard navigation sequences. A good example of a control element is a button.

- Makes the item reachable via key navigation
- Adds `value` property support

```typescript
class CameraButton extends ControlElement {
  ...
}
```

### Form Field Element

The form field element class is used for input fields. This abstract class contains additional logic for managing accessibility features and should be used when creating new form field elements.

- Adds support for aria tags to be used for accessibility
- Makes the item reachable via key navigation

```typescript
class TwoFactorField extends FormFieldElement {
  ...
}
```

### Responsive Element

The responsive element is designed to be used for more complex UI pieces, or, widgets, where the element must react to changes of its bounding dimensions - think data visualisations, charts and responsive widgets.

!> Due to the overheads of observing and reacting to dimensional changes, you should only use this element type for creating higher-level elements, where only a few would be rendered at a time.

- Adds resized callback for performing tasks when the element's size changes
- Fires resize event

```typescript
class AppBar extends ResponsiveElement {
  ...
  resizedCallback (size): void {
    console.log(size.width, size.height);
  }
}
```

## Configuration Types

There are three main configuration types to choose from. Standard, Data and Configured. Simplistic elements, like buttons, are considered standard and follow standard configuration principals.

Data driven elements like lists, trees and grids tend to follow data configuration, except for when detailed configuration is required.

### Standard Elements

These are configured by passing attributes to the element and are comparable to native HTML Elements in the browser.

```html
<efx-element disabled value="1">Hello world</efx-element>
```

If enabled, other elements can be slotted in as children to either be rendered, or, provide additional configuration.

```html
<efx-element>
  <efx-element-option value="1" selected>Option 1</efx-element-option>
  <efx-element-option value="2">Option 2</efx-element-option>
  <efx-element-option value="3">Option 3</efx-element-option>
</efx-element>
```

### Data Elements

These are configured by passing a list of flat, or, nested data to the element's `data` property. Items must implement the [DataItem](#) interface and state must be managed by a [CollectionComposer](#) internally.

```html
<efx-data-element></efx-data-element>
```

```typescript
const data: DataItem[] = [
  { value: '1' }
  { value: '2' }
  { value: '3' }
];
dataElement.data = data;
```

The `data` property must support being passed a data collection array, or, an instance of a [CollectionComposer](#). Passing an instance of a collection composer allows for the element state to be controlled externally by other elements. This is useful when the element is used inside of another component's shadow root.

### Config Elements

These are configured by passing a config object to the element's `config` property.

```html
<efx-config-element></efx-config-element>
```

```typescript
configElement.config = {
  columns: [
    {
      label: 'ID',
      key: true
    },
    {
      label: 'Name',
      sort: true
    }
  ],
  data: [...]
};
```

*> Do not use `data` property on the element and in the configuration object. This can lead to confusion and should be avoided.
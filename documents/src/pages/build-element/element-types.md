<!-- 
title: Element Types
location: ./element-types
type: page
layout: default
-->



# Element Types

When building your custom element, you need to choose which base element class to extend, as this defines how the element should function in an application.

There are 4 base element types to choose from when building a custom element. Your choice of which type to extend depends on the element you are creating.

!> Think carefully about which base class to extend from. Changing this later could introduce breaking changes, unless handled correctly.

## Basic Element

The basic element is the simplest of all element types. It's useful for creating simplistic elements that don't require any user interaction. An example could be a logo.

```typescript
class MyLogo extends BasicElement {
  ...
}
```

## Control Element

The control element is used mainly for elements that require user interaction and need to be included in keyboard navigation sequences. A good example of a control element is a button.

- Makes the item reachable via key navigation
- Support getter and setter `value` property 
- Support state `disabled` and `readonly` 

```typescript
class CameraButton extends ControlElement {
  ...
}
```

## Form Field Element

The form field element class is used for `input fields`. This abstract class extended from Control Element contains additional logic for managing accessibility features and should be used when creating new form field elements.

- Adds support for aria tags to be used for accessibility
- Makes the item reachable via key navigation
- Support state validation `error` and `warning`    

```typescript
class TwoFactorField extends FormFieldElement {
  ...
  protected onInputChange (event: InputEvent): void {
    console.log(event.target.value);
  }
}
```

## Responsive Element

The responsive element is designed to be used for more complex UI pieces, or widgets, where the element must react to changes to its bounding dimensions - think data visualisations, charts and responsive widgets.

!> Due to the overheads of observing and reacting to dimensional changes, you should only use this element type for creating higher-level elements, where only a few would be rendered at a time.

- Adds resized callback for performing tasks when the element's size changes
- Fires resize event

```typescript
class AppBar extends ResponsiveElement {
  ...
  public resizedCallback (size): void {
    console.log(size.width, size.height);
  }
}
```
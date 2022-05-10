<!--
title: Naming conventions
location: ./naming-conventions
type: page
-->

::status-complete::

# Naming Conventions

Naming conventions are important to keep consistency across components.

## Names

Element names should use the correct prefix and avoid clashing with other components.

| Prefix | Description                                        |
| ------ | -------------------------------------------------- |
| `ef-`  | Reserved for foundational components.                |
| `efx-` | Preferred prefix for all community-build components. |

!> Try to keep element names to a maximum of three parts e.g. `efx-my-element`. It's acceptable to increase to four parts for packaged child elements e.g. `efx-my-element-option`.

## Properties

| Property             | Attribute            |     Type     | Reflects | Description                                                                                                                                 | Default     |
| :------------------- | :------------------- | :----------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------ | :---------- |
| active               | active               |  `boolean`   |  `true`  | Used to show status of an element withing a collection. Commonly used for elements like tabs.                                               | `false`     |
| checked              | checked              |  `boolean`   |  `true`  | Used for checkable elements, like checkboxes, radio buttons and toggles                                                                     | `false`     |
| config               |                      |     `{}`     | `false`  | Configuration object used to configure high-level elements.                                                                                 | `undefined` |
| cta                  | cta                  |  `boolean`   |  `true`  | Call to action is used to highlight an important action, like a 'submit form' button.                                                       | `false`     |
| data                 |                      | `DataItem[]` | `false`  | Used for setting array-based element data. Data object must follow the standardised [data item interface](#).                               | `undefined` |
| disabled             | disabled             |  `boolean`   |  `true`  | Disables the element, making it unusable. Element should also be removed from key navigation sequences, by setting it's `tabIndex` to `-1`. | `false`     |
| draggable            | draggable            |  `boolean`   | `false`  | Allows the element to be repositioned, by dragging it across the screen.                                                                    | `false`     |
| error                | error                |  `boolean`   |  `true`  | Puts the element into error state. Usually used on form elements, when the input is incorrect.                                              | `false`     |
| focused _(readonly)_ | focused _(readonly)_ |  `boolean`   |  `true`  | Readonly property. Applied automatically when the element is part of the focus tree.                                                        | `false`     |
| header               | header               |   `string`   | `false`  | Commonly used on higher-level elements where a heading is used to show a topic for it's content.                                            | `""`        |
| icon                 | icon                 |   `string`   |  `true`  | Used to choose an icon to display in the element.                                                                                           | `""`        |
| indeterminate        | indeterminate        |  `boolean`   |  `true`  | Used to show that a checked state cannot be determined and is neither checked or unchecked.                                                 | `false`     |
| lang                 | lang                 |   `string`   |  `true`  | Sets the desired language for the element to use when localising content. Defaults to the document's current language.                      | `""`        |
| max                  | max                  |   `string`   | `false`  | Used to set the maximum value a user can select.                                                                                            | `""`        |
| min                  | min                  |   `string`   | `false`  | Used to set the minimum value a user can select.                                                                                            | `""`        |
| multiple             | multiple             |  `boolean`   | `false`  | Used to set the minimum value a user can select.                                                                                            | `false`     |
| opened               | opened               |  `boolean`   |  `true`  | Sets the opened state of an overlay. COmmonly used on dropdown lists and dialogs.                                                           | `false`     |
| pattern              | pattern              |   `string`   | `false`  | Specifies a regular expression the form control's value should match.                                                                       | `""`        |
| placeholder          | placeholder          |   `string`   | `false`  | Sets the placeholder text to be display when no value is set. Commonly used in form fields.                                                 | `""`        |
| readonly             | readonly             |  `boolean`   |  `true`  | Removes editing functionality, allowing for content to be read but not modified. Element should remain in key navigation sequences.         | `false`     |
| selected             | selected             |  `boolean`   |  `true`  | Used to select an element, adding its value to the selected collection. Commonly used in lists.                                             | `false`     |
| size                 | size                 |   `string`   |  `true`  | Sets the size/scale of the element/content. Options include `small`, `medium` and `large`.                                                  | `""`        |
| step                 | step                 |   `string`   | `false`  | Specifies the granularity that the value must adhere to.                                                                                    | `""`        |
| title/tooltip        | title/tooltip        |   `string`   |  `true`  | Used to show a tooltip.                                                                                                                     | `""`        |
| toggles              | toggles              |  `boolean`   |  `true`  | Used to switch to a toggle mode. Currently this is only used on buttons.                                                                    | `false`     |
| warning              | warning              |  `boolean`   |  `true`  | Puts the element into warning state. Usually used on form elements, when the input is missing.                                              | `false`     |
| value                | value                |   `string`   | `false`  | Defines the value of the element.                                                                                                           | `""`        |
| values               |                      |  `string[]`  | `false`  | Used alongside `multiple` for multi-value selections.                                                                                       | `[]`        |

!> Avoid using these property names for other duties. This can add confusion when using multiple elements.

## Events

| Event                             | Description                                                                                                              |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| tapstart                          | Fired when a user initiates a click or a touch. Comparable to mousedown and touchstart.                                  |
| tapend                            | Fired when a user releases their touch or pointer device. Comparable to mouseup and touchend.                            |
| tap                               | Provides a consistent way to detect clicks and touches across devices. Should be used instead of `click` event.          |
| focused-changed                   | Fired automatically when the element's `focused` state changes.                                                          |
| <nobr>\<property\>-changed</nobr> | Fired when a user performs an action which changes a property state. This could by changing a value, or, opening a list. |

o> **Good to know:** \
o> Most properties will not require events to be fired, as they are never modified by a user's interaction with the element.

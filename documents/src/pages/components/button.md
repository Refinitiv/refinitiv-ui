<!--
type: page
title: Button
location: ./components/button
layout: default
-->

# Button

```html
<ui-button>Label</ui-button>
<ui-button icon-end="arrow-right">Label</ui-button>
<ui-button icon-end="arrow-right" variant="primary">Label</ui-button>
```

Buttons allow the user to submit information or initiate actions. You can use <ui-button> for actions in forms or dialogs. 

This component comprises the following: 
* [Sub Icon](./components/sub-icon)

## Anatomy

The button text label is the most crucial part of the component, which indicates the button’s intent and the expected action. For all variants, end-icons are optional.

::button-anatomy-image::

## Design Usage Rules
### Content principles 
* Locate buttons where a user expects to find them 
* Label buttons so that it’s clear what they do 
* If using multiple buttons, take care to order them correctly 

### Formatting 
The button content wraps when it results in a larger button width than the parent container 

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<style>
  ui-button {
    width: 300px;
  }
</style>
<ui-button>DEMONSTRATE BEHAVIOUR WHEN THE LABEL GETS VERY LONG</ui-button>
<ui-button icon-end="right">DEMONSTRATE BEHAVIOUR WHEN THE LABEL GETS VERY LONG</ui-button>
```
```js
import "./resources/components.js"
```
::

### Placement 
* Use primary buttons only for critical pathways,  such as  form submission or sign in actions 
* bUse secondary buttons only for actions supporting critical pathways or standalone submissions, such as Download, Edit, Cancel. 

### Copy and UX Writing
See the [Content Design Style Guide](https://lsegroup.sharepoint.com/sites/ProductDesignTeam/SitePages/Content-Design.aspx) (internal only).

### Touch Devices and Virtual Keyboards

Default behaviour on mobile devices buttons are full-width and fill the available width of its parent container. This property can be optionally turned off on the mobile device 

For all breakpoints full-width buttons can be optionally used 

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<style>
  ui-button {
    width: 100%;
  }
</style>
<ui-button>DEMONSTRATE FULL-WIDTH BUTTON</ui-button>
```
```js
import "./resources/components.js"
```
::


### Validation and Errors 

Buttons do not have validation or error states, but when part of a form or pattern they may trigger validation and error messaging 

## Accessibility 

### Embedded behaviour 

#### Tags 
Buttons define what type of button they are to tell the browser and assistive tech what to do. You must select one of two types as you use the component: 

* `<button type="button">`
* `<button type="submit">`

#### Hidden from screen readers

Icon-end is always hidden from screen reader users. The button label must be written to clearly define the button’s purpose and interaction without relying on the icon to provide that information. The icon is a visual enhancement aide only.

### Keyboard operations
| Key             | Operation                                           |
| --------------- | --------------------------------------------------- |
| **Tab**         | Navigate forwards in the index order of the button  |
| **Shift + Tab** | Navigate backwards in the index order of the button |
| **Enter**       | Activates the button                                |
| **Space**       | Activates the button                                |

@>Reference: https://www.w3.org/WAI/ARIA/apg/patterns/button/

### Things to consider
N/A

## Implementation

* Primary Button 
* Secondary Button 
* End-Icon 
* Wrapping behaviour 

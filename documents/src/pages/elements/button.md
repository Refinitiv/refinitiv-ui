<!--
type: page
title: Button
location: ./elements/button
layout: default
-->

# Button

::
```javascript
::button::
```
```html
<ef-button>Button</ef-button>
<ef-button cta >Button</ef-button>
<ef-button disabled>Disabled</ef-button>
<ef-button toggles active>Toggle</ef-button>
<ef-button icon="tick">Button</ef-button>
<ef-button icon="tick" textpos="before">Button</ef-button>
<ef-button icon="tick"></ef-button>
<ef-button icon="tick" transparent></ef-button>
```
::

Use `ef-button` for actions in forms, dialogs, etc. with support for different states and styles.

## Usage
`ef-button` can be used similarly to `button`. Styling and sizing are managed by the theme but can be customized using CSS.

::
```javascript
::button::
```
```css
.large {
  height: 60px;
  min-width: 140px;
  font-size: 140%;
}
```
```html
<ef-button>Default</ef-button>
<ef-button class="large">Large</ef-button>
```
::

```css
.large {
  height: 33px;
  min-width: 100px;
  font-size: 140%;
}
```
```html
<ef-button>Default</ef-button>
<ef-button class="large">Large</ef-button>
```

## Change styles and types
 `ef-button` provides various styles to use for different scenarios, for example, call-to-action, disabled, toggles. To use a style, add its attribute to the `ef-button`.

::
```javascript
::button::
```
```html
<ef-button>Button</ef-button>
<ef-button disabled>Button</ef-button>
<ef-button cta>OK</ef-button>
<ef-button cta disabled>OK</ef-button>
<ef-button toggles>Toggle button</ef-button>
```
::

```html
<ef-button>Button</ef-button>
<ef-button disabled>Button</ef-button>
<ef-button cta>OK</ef-button>
<ef-button cta disabled>OK</ef-button>
<ef-button toggles>Toggle button</ef-button>
```

## Inline icon
To show an icon inside `ef-button`, use the `icon` attribute. Supported icons depend on the theme and can be seen on the icons page. Text can be configured to display before or after the icon using the `textpos` attribute.

::
```javascript
::button::
```
```html
<ef-button icon="tick"></ef-button>
<ef-button icon="tick">Button</ef-button>
<ef-button icon="tick" textpos="before">Button</ef-button>
```
::

```html
<ef-button icon="tick"></ef-button>
<ef-button icon="tick">Button</ef-button>
<ef-button icon="tick" textpos="before">Button</ef-button>
```

## More contents in button
If the button width needs to be fixed, and content requires more than one line, set `height: auto;` to ensure content displays correctly inside the button.
::
```javascript
::button::
```
```css
.lines {
  height: auto;
  width: 180px;
}
```
```html
<ef-button icon="tick" class="lines">Fixed width 180px and more contents in button</ef-button>
```
::

```css
.lines {
  height: auto;
  width: 180px;
}
```
```html
<ef-button icon="tick" class="lines">Fixed width 180px and more contents in button</ef-button>
```

## Switching icon on mouse over
`ef-button` can display an icon for mouse hover by using `hover-icon` attribute.

::
```javascript
::button::
```
```html
<ef-button icon="tick" hover-icon="cross"></ef-button>
<ef-button icon="cross" hover-icon="tick"></ef-button>
```
::

```html
<ef-button icon="tick" hover-icon="cross"></ef-button>
<ef-button icon="cross" hover-icon="tick"></ef-button>
```

## Handling click events on desktop and mobile

`ef-button` provides events that work on both desktop and mobile. Use `tap` to ensure that the event will work on different platforms.

::
```javascript
::button::
const btn = document.getElementById('button');
btn.addEventListener('tap', () => {
  document.getElementById('text').textContent = 'Got event tap!';
});
```
```css
.container {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}
#text {
  padding-left: 10px;
}
```
```html
<div class="container">
  <ef-button id="button">Tap / Click Me</ef-button>
  <span id="text"></span>
</div>
```
::

```html
<ef-button id="button">Click Me</ef-button>
```
```javascript
const btn = document.getElementById('button');
btn.addEventListener('tap', () => {
  document.getElementById('text').textContent = 'Clicked!';
});
```

## Accessibility
::a11y-intro::

`ef-button` has been assigned the role of `button` and can have a `pressed` state. Always try to include a text label for a button. Avoid relying solely upon an image or icon to convey the button’s purpose to users. Assistive technology users ascertain the purpose of a button via its accessible name which gets computed from either its visual label, alternative text, or aria-label attribute – so be sure to fill them in accurately. Whenever the button’s visual state changes, the button state programmatically updates to inform assistive technology users of the element’s changed state. 

`ef-button` handles role and aria value but when using button without any text label, assign `aria-label` as the accessible name.

```html
<ef-button icon="bookmark" aria-label="bookmark this item"></ef-button>
```

::a11y-end::

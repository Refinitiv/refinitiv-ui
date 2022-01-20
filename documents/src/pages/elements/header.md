<!--
type: page
title: Header
location: ./elements/header
layout: default
-->

# Header

::
```javascript
::header::
```
```html
<ef-header level="1">Header Level 1</ef-header>
<ef-header level="2">Header Level 2</ef-header>
<ef-header level="3">Header Level 3</ef-header>
```
::

Header is used to identify and separate different sections of a page. Headers help to organize the page content into a sensible hierarchy and improve the user experience.

### Usage

Content in `ef-header` will be displayed as a title.

```html
<ef-header>Header Title</ef-header>
```

### Levels

A level can be set in `ef-header` to improve data hierarchy. Styling of levels is managed by the theme.

::
```javascript
::header::
```
```html
<ef-header level="1">Header Level 1</ef-header>
<ef-header level="2">Header Level 2</ef-header>
<ef-header level="3">Header Level 3</ef-header>
```
::

```html
<ef-header level="1">Header Level 1</ef-header>
<ef-header level="2">Header Level 2</ef-header>
<ef-header level="3">Header Level 3</ef-header>
```

### Including links in headers
You can create a header with linking by using an HTML link tag inside the header content.

::
```javascript
::header::
```
```html
<ef-header level="1"><a href="#">Header Level Link 1</a></ef-header>
<ef-header level="2"><a href="#">Header Level Link 2</a></ef-header>
<ef-header level="3"><a href="#">Header Level Link 3</a></ef-header>
```
::

```html
<ef-header level="1"><a href="#">Header Level Link 1</a></ef-header>
<ef-header level="2"><a href="#">Header Level Link 2</a></ef-header>
<ef-header level="3"><a href="#">Header Level Link 3</a></ef-header>
```


### Slotting content
You can include a component in a header by assigning the component to a slot.

::
```javascript
::header::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/checkbox?min';
halo('button');
halo('checkbox');
```
```html
<ef-header level="1">Header Level 1
  <ef-button slot="left" icon="menu" transparent></ef-button>
  <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
  <ef-header level="2">Header Level 2
  <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
<ef-header level="3">Header Level 3
  <ef-button slot="right" icon="filter" transparent></ef-button>
  <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
```
::

```html
<ef-header level="1">Header Level 1
  <ef-button slot="left" icon="menu" transparent></ef-button>
  <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
<ef-header level="2">Header Level 2
  <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
<ef-header level="3">Header Level 3
  <ef-button slot="right" icon="filter" transparent></ef-button>
  <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
```


## Accessibility
::a11y-intro::

The Header component is assigned `role="heading"` and can include the property `aria-level`. As a best practice to accommodate accessible users, apply a logical nesting of Header levels.

x>TODO: THIS CONTENT NEED TO BE REVISED

*	The main heading should use Header level 1
*	Ideally, there should only be one Header level 1 on each page
*	Header level 2 to 6 can be used to structure the remaining content on the page

::a11y-end::

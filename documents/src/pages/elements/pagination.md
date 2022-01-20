<!--
type: page
title: Pagination
location: ./elements/pagination
layout: default
-->

# Pagination

::
```javascript
::pagination::
```
```css
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-right: 100px;
}
```
```html
<div id="wrapper">
  <ef-pagination></ef-pagination>
  <ef-pagination max="7"></ef-pagination>
</div>
```
::

`ef-pagination` is used when content is divided into separate pages to display the page numbers and enable navigation between them. The component should be positioned at the bottom right of the content.

### Usage
You can use pagination with or without knowing a total pages. Total pages can be set by using attribute/property `max`. However, if `max` is not set, users can navigate to until an infinity page.

```html
<ef-pagination></ef-pagination>
<ef-pagination max="7"></ef-pagination>
```

### Listen event when users changed page
The pagination component will fire `value-changed` with the value of the new page in `e.detail.value`.

::
```javascript
::pagination::
const pagination = document.getElementById('pagination');
pagination.addEventListener('value-changed', (e) => {
  const text = document.getElementById('text');
  text.textContent = e.detail.value;
});
```
```css
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-right: 100px;
}
#console {
  display: flex;
  align-items: center;
  justify-content: center;
}
```
```html
<div id="wrapper">
  <ef-pagination id="pagination" max="30"></ef-pagination>
</div>
<div id="console">
  Page =&nbsp;<span id="text"></span>
</div>
```
::

```html
<ef-pagination id="pagination" max="30"></ef-pagination>
```
```javascript
const pagination = document.getElementById('pagination');
pagination.addEventListener('value-changed', (e) => console.log(e.detail.value));
```

## Accessibility
::a11y-intro::

Pagination is comprised of a set of interrelated elements, including Text Field and Button. The component is built in such a way that screen readers will announce the current page whenever an update is made. Be sure to set the component to the “disabled” state at times that it cannot be interacted with. 

::a11y-end::

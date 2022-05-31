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

## Usage
You can use pagination with or without knowing a total pages. Total pages can be set by using attribute/property `max`. However, if `max` is not set, users can navigate to until an infinity page.

```html
<ef-pagination></ef-pagination>
<ef-pagination max="7"></ef-pagination>
```

## Listen event when users changed page
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

Pagination is comprised of a set of interrelated elements, including input field for page number and buttons. It is built in such a way that screen readers will announce the current page whenever an update is made.

`ef-pagination` doesn't have any assigned role. However, it's focusable by default and the focus will be delegated to the middle input. Users can use arrow up and down key to change value. Once users commit the new value by pressing the enter key or tabbing to new control, the screen reader should announce a full sentence e.g. `Page 3 of 4'.

You should assign `aria-label` or `aria-labelledby` attribute to `ef-pagination` with accessible name.

```html
<ef-pagination max="10" aria-label="Page Navigation"></ef-pagination>
```

```html
<div id="pagingLabel">Select Page</div>
<ef-pagination max="10" aria-labelledby="pagingLabel"></ef-pagination>
```

::a11y-end::

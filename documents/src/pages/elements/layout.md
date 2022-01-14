<!--
type: page
title: Layout
location: ./elements/layout
layout: default
-->

# Layout

::
```javascript
::layout::

const left = document.querySelector('#left');
const right = document.querySelector('#right');
left.addEventListener('resize', (event) => {
  left.textContent = event.detail.width.toFixed(2) + 'px';
});
right.addEventListener('resize', (event) => {
  right.textContent = event.detail.width.toFixed(2) + 'px';
});
```
```css
@keyframes resize {
  from {
    width: 10%;
  }
  to {
    width: 30%;
  }
}
#wrapper {
  height: 120px;
  color: #9ea8f4;
}
#header, #footer {
  padding: 3px 7px;
}
#header, #footer, #content {
  width: 100%;
}
#left, #right {
  width: 20%;
  text-align: center;
  font-size: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
}
#left {
  animation: resize ease-in-out 2s alternate infinite;
}
```
```html
<ef-layout id="wrapper" debug flex container>
  <ef-layout debug id="header" noflex>HEADER</ef-layout>
  <ef-layout id="content" flex nowrap>
    <ef-layout debug id="left"></ef-layout>
    <ef-layout debug id="right"></ef-layout>
  </ef-layout>
  <ef-layout debug id="footer" noflex>FOOTER</ef-layout>
</ef-layout>
```
::

`ef-layout` is a layout element designed to handle core layouts for Element Framework components and applications.

### Usage

By default, `ef-layout` is like any other block element, very much like a `div`. Therefore, additional attributes and child elements must be used in order to create layouts.

```html
<ef-layout>
  <ef-layout>TOP</ef-layout>
  <ef-layout>MIDDLE</ef-layout>
  <ef-layout>BOTTOM</ef-layout>
</ef-layout>
```

### Horizontal Alignment
Items can be arranged horizontally by specifying the `flex` attribute on a container.

::
```javascript
::layout::
```
```css
.outer {
  background-color: #d0d4db;
  padding: 10px;
  overflow: hidden;
}
.inner {
  background-color: #e4e8ed;
  margin: 10px;
  padding: 10px;
}
```
```html
<ef-layout flex class="outer">
  <ef-layout class="inner">LEFT</ef-layout>
  <ef-layout class="inner">RIGHT</ef-layout>
</ef-layout>
```
::

```html
<ef-layout flex>
  <ef-layout>LEFT</ef-layout>
  <ef-layout>RIGHT</ef-layout>
</ef-layout>
```

### Vertical Alignment
Items can be arranged vertically by specifying both the `flex` and `container` attributes on the container.

::
```javascript
::layout::
```
```css
.outer {
  background-color: #d0d4db;
  padding: 10px;
}
.inner {
  background-color: #e4e8ed;
  margin: 10px;
  padding: 10px;
}
```
```html
<ef-layout flex container class="outer">
  <ef-layout class="inner">TOP</ef-layout>
  <ef-layout class="inner">BOTTOM</ef-layout>
</ef-layout>
```
::

```html
<ef-layout flex container>
  <ef-layout>TOP</ef-layout>
  <ef-layout>BOTTOM</ef-layout>
</ef-layout>
```

### No Wrap

By default, items will be wrapped to a new row if there is not enough space to fit them. However, you can prevent items from wrapping by specifying the `nowrap` attribute on the container.

::
```javascript
::layout::
```
```css
.outer {
  background-color: #d0d4db;
  padding: 10px;
  height: 180px;
}
.inner {
  background-color: #e4e8ed;
  margin: 10px;
  padding: 10px;
}
```
```html
<ef-layout flex nowrap class="outer">
  <ef-layout size="150px" class="inner">LEFT</ef-layout>
  <ef-layout class="inner">CENTER</ef-layout>
  <ef-layout size="150px" class="inner">RIGHT</ef-layout>
</ef-layout>
```
::

```html
<ef-layout flex nowrap>
  <ef-layout size="150px">LEFT</ef-layout>
  <ef-layout>CENTER</ef-layout>
  <ef-layout size="150px">RIGHT</ef-layout>
</ef-layout>
```

### Item attributes
Defining the behavior of items is important for creating a responsive layout in an application.

### `basis` attribute
The `basis` attribute is used as a rough guide for the container to set the size of items. You can define a basis value in percentages (e.g. 50%) or pixels (e.g. 150px).

This property does not place an exact size on the element - instead it is more of a ratio among each of the children. For example, the sample layout below will try to keep each item size 1:2:1.

Whenever the size of the container cannot accommodate all items in the same row, the last item will be wrapped to a new row and the size of items in the same row will be recalculated. In the example, when the row is wrapped, the items in the first row should have a ratio of 1:2.

::
```javascript
::layout::
```
```css
@keyframes resize {
  from {
    width: 100%;
  }
  to {
    width: 300px;
  }
}
.outer {
  animation: resize 10s ease-in-out alternate infinite;
  background-color: #d0d4db;
  padding: 10px;
  overflow: hidden;
  height:200px;
  margin: 0 auto;
}

.inner {
  background-color: #e4e8ed;
  margin: 10px;
  padding: 10px;
}
```
```html
<ef-layout flex class="outer">
  <ef-layout basis="150px" class="inner">LEFT</ef-layout>
  <ef-layout basis="300px" class="inner">CENTER</ef-layout>
  <ef-layout basis="150px" class="inner">RIGHT</ef-layout>
</ef-layout>
```
::

```html
<ef-layout flex>
  <ef-layout basis="150px">LEFT</ef-layout>
  <ef-layout basis="300px">CENTER</ef-layout>
  <ef-layout basis="150px">RIGHT</ef-layout>
</ef-layout>
```

### Size
The `size` attribute is used when you want an item with a fixed size. This attribute is mostly used when applications need to fix the size of a layout. For example, the demo below shows two sidebars, each fixed at 150px. The middle item will then fill the rest of the available space.

::
```javascript
::layout::
```
```css
.outer {
  background-color: #d0d4db;
  padding: 10px;
  overflow: hidden;
  height:180px;
}
.inner {
  background-color: #e4e8ed;
  margin: 10px;
  padding: 10px;
  min-height: 30px;
}
```
```html
<ef-layout flex class="outer">
  <ef-layout size="150px" class="inner">LEFT</ef-layout>
  <ef-layout class="inner">CENTER</ef-layout>
  <ef-layout size="150px" class="inner">RIGHT</ef-layout>
</ef-layout>
```
::

```html
<ef-layout flex>
  <ef-layout size="150px">LEFT</ef-layout>
  <ef-layout>CENTER</ef-layout>
  <ef-layout size="150px">RIGHT</ef-layout>
</ef-layout>
```

### Break points
A break point is when the container has been resized to a certain width or height and the items in the application rearrange to accommodate the new size.

You could use `min-width` to control a break point when an application should wrap items to a new row. In a flexible layout, items will try to fill up all available space. If an item cannot shrink to be smaller than the `min-width` the container will try to wrap the item (unless the `nowrap` attribute is set).

The `min-height` could be used in a similar way for vertical layouts.

In this example, the LEFT and RIGHT items will be laid up 1:3. Watch as the RIGHT item wraps when there is not enough space left on the first row.

::
```javascript
::layout::
```
```css
@keyframes resize {
  from {
    width: 100%;
  }
  to {
    width: 300px;
  }
}
.outer {
  background-color: #d0d4db;
  padding: 10px;
  overflow: hidden;
  height: 140px;
  margin-bottom: 30px;
  animation: resize 10s ease-in-out alternate infinite;
  margin: 0 auto;
}

.inner {
  background-color: #e4e8ed;
  margin: 10px;
  padding: 10px;
}
```
```html
<ef-layout flex class="outer">
  <ef-layout basis="75px" class="inner">LEFT</ef-layout>
  <ef-layout basis="225px" min-width="250px" class="inner">RIGHT</ef-layout>
</ef-layout>
```
::

```html
<ef-layout flex>
  <ef-layout basis="75px">LEFT</ef-layout>
  <ef-layout basis="225px" min-width="250px">RIGHT</ef-layout>
</ef-layout>
```

### Debug

The `debug` attribute makes ef-layout display a thin border. This is useful to visualize the current structure of your layout on the screen.

::
```javascript
::layout::
```
```css
.outer {
  background-color: #d0d4db;
  padding: 10px;
  overflow: hidden;
}
.inner {
  background-color: #e4e8ed;
  margin: 10px;
  padding: 10px;
}
```
```html
<ef-layout debug container flex class="outer">
  <ef-layout class="inner">HEADER</ef-layout>
  <ef-layout flex class="inner">
    <ef-layout container class="inner">
    	<ef-layout class="inner">ITEM 1</ef-layout>
    	<ef-layout class="inner">ITEM 2</ef-layout>
      </ef-layout>
    <ef-layout class="inner">ITEM 3</ef-layout>
  </ef-layout>
</ef-layout>
```
::

```html
<ef-layout debug container flex>
  <ef-layout>HEADER</ef-layout>
  <ef-layout flex>
  	<ef-layout container>
    	<ef-layout>ITEM 1</ef-layout>
    	<ef-layout>ITEM 2</ef-layout>
    </ef-layout>
    <ef-layout>ITEM 3</ef-layout>
  </ef-layout>
</ef-layout>
```

### Scrollable
The `scrollable` attribute can be specified on the container. This makes the container show a scrollbar when there is not enough space to display all items.

::
```javascript
::layout::
```
```css
.outer {
  background-color: #d0d4db;
  padding: 10px;
}

.inner {
  background-color: #e4e8ed;
  margin: 10px;
  padding: 10px;
  min-height: 35px;
}
```
```html
<ef-layout flex>
  <ef-layout container flex class="outer" max-height="155px" scrollable>
    <ef-layout class="inner">ITEM 1</ef-layout>
    <ef-layout class="inner">ITEM 2</ef-layout>
    <ef-layout class="inner">ITEM 3</ef-layout>
    <ef-layout class="inner">ITEM 4</ef-layout>
    <ef-layout class="inner">ITEM 5</ef-layout>
    <ef-layout class="inner">ITEM 6</ef-layout>
    <ef-layout class="inner">ITEM 7</ef-layout>
  </ef-layout>
  <ef-layout flex class="outer">
    <ef-layout class="inner">ITEM 8</ef-layout>
  </ef-layout>
</ef-layout>
```
::

```html
<ef-layout flex>
  <ef-layout container flex max-height="155px" scrollable>
    <ef-layout>ITEM 1</ef-layout>
    <ef-layout>ITEM 2</ef-layout>
    <ef-layout>ITEM 3</ef-layout>
    <ef-layout>ITEM 4</ef-layout>
    <ef-layout>ITEM 5</ef-layout>
    <ef-layout>ITEM 6</ef-layout>
    <ef-layout>ITEM 7</ef-layout>
  </ef-layout>
  <ef-layout flex>
    <ef-layout>ITEM 8</ef-layout>
  </ef-layout>
</ef-layout>
```

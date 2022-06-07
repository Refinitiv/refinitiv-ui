
<!--
type: page
title: Appstate Bar
location: ./elements/appstate-bar
layout: default
-->

# Appstate Bar
::
```javascript
::appstate-bar::
```
```css
#wrapper {
  padding: 1px;
}
ef-appstate-bar {
  margin-bottom: 10px;
}
[slot="right"] {
  display: flex;
  align-items: center;
}
[slot="right"] ef-icon {
  padding-right: 3px;
}
```
```html
<div id="wrapper">
  <ef-appstate-bar heading="Preview">This is a preview version.
    <a alt href="#">What's changing?</a>
  </ef-appstate-bar>
  <ef-appstate-bar heading="IN DEVELOPMENT" state="info">Internal use only.
    <a alt href="#" slot="right">
      <ef-icon icon="present"></ef-icon>Send us feedback</a>
  </ef-appstate-bar>
  <ef-appstate-bar heading="New" state="highlight">Welcome to new version.
    <a alt href="#">What's new?</a>
    <a alt href="#" slot="right">
      <ef-icon icon="help"></ef-icon>Help</a>
  </ef-appstate-bar>
</div>
```
::

`ef-appstate-bar` is used to display status or other information at the top of an application. App State Bar comes with pre-defined colors in the theme.

## Usage
Styles for App State Bar content can be set using the `state` attribute/property. The App State Bar's heading can be set via the `heading` attribute/property.

```html
<ef-appstate-bar heading="Heading">
  Here is your content message.
</ef-appstate-bar>

<ef-appstate-bar heading="Info" state="info">
  Set attribute as state = "info".
</ef-appstate-bar>

<ef-appstate-bar heading="Highlight" state="highlight">
  Set attribute as state = "highlight".
</ef-appstate-bar>
```

## Right slot
The App State Bar provides a slot to display content at the right of bar. The slot can contain any kind of content e.g. normal text, links, or icons.

::
```javascript
::appstate-bar::
```
```css
#wrapper {
  padding: 1px;
}
[slot="right"] {
  display: flex;
  align-items: center;
}
[slot="right"] ef-icon {
  padding-right: 3px;
}
```
```html
<div id="wrapper">
  <ef-appstate-bar heading="Sample" state="highlight">
    see on the right of bar
    <a alt href="#" slot="right">
      <ef-icon icon="like-empty"></ef-icon>This is the Right slot</a>
  </ef-appstate-bar>
</div>
```
::

```css
#wrapper {
  padding: 1px;
}
[slot="right"] {
  display: flex;
  align-items: center;
}
[slot="right"] ef-icon {
  padding-right: 3px;
}
```
```html
<ef-appstate-bar heading="Sample" state="highlight">
  See on the right of bar.
  <a alt href="#" slot="right">
    <ef-icon icon="like-empty"></ef-icon>This is the Right slot</a>
</ef-appstate-bar>
```

## Accessibility
::a11y-intro::

`ef-appstate-bar` doesn't have any assigned role. It shouldn't be focusable as it is not a control element. Accessibility users can use arrow keys to walk through content on Appstate Bar if needed.

::a11y-end::

<!--
type: page
title: Tab
location: ./elements/tab
layout: default
-->

# Tab

::
```javascript
::tab::
```
```css
.tab-container {
  display:flex;
}
ef-tab {
  margin-right: 3px;
  min-width: 90px;
}
```
```html
<div class="tab-container">
  <ef-tab label="Tab"></ef-tab>
  <ef-tab label="Icon Tab" icon="chart-area" active></ef-tab>
  <ef-tab label="Icon Tab" icon="chart-area"></ef-tab>
  <ef-tab label="Active Tab" active></ef-tab>
  <ef-tab label="Disabled Tab" disabled></ef-tab>
  <ef-tab label="Icon Tab" icon="chart-area" disabled></ef-tab>
</div>
```
::

A basic building block of tab navigation controls.

### Usage

`ef-tab` is used for creating an individual tab item. It's purposely built as a building block, so you should consider using it with [Tab Bar](./elenments/tab-bar) to create standard tab navigation controls.

::
```javascript
::tab::
```
```html
<ef-tab label="Tab1"></ef-tab>
<ef-tab label="Tab2"></ef-tab>
<ef-tab label="Tab3"></ef-tab>
```
::

```html
<ef-tab label="Tab1"></ef-tab>
<ef-tab label="Tab2"></ef-tab>
<ef-tab label="Tab3"></ef-tab>
```

### Sub label

`ef-tab` provides `label` and `sub-label` attributes for displaying hierarchical text. If the width of `label` and `sub-label` is longer than the `ef-tab` width, both automatically truncate with ellipsis.

::
```javascript
::tab::
```
```html
<ef-tab label="Label" sub-label="Secondary info"></ef-tab>
<ef-tab label="Label Two" sub-label="A long secondary info"></ef-tab>
<ef-tab style="max-width: 100px;" label="A Very Long Label" sub-label="A long secondary info"></ef-tab>
```
::

```html
<ef-tab label="Label" sub-label="Secondary info"></ef-tab>
<ef-tab label="Label Two" sub-label="A long secondary info"></ef-tab>
<ef-tab style="max-width: 100px;" label="A Very Long Label" sub-label="A long secondary info"></ef-tab>
```

Both label and sub-label will not display if `ef-tab` has children.

::
```javascript
::tab::
```
```css
.suffix {
  color: #334BFF;
}
ef-tab:hover .suffix {
  color: #FFE999;
}
```
```html
<ef-tab label="Tab1" sub-label="Secondary long text">
  Custom Content
  <span class="suffix">EXCLUSIVE</span>
</ef-tab>
<ef-tab label="Tab2" sub-label="Secondary long text" clears>
  Custom Content With Clears
  <sup class="suffix">EXCLUSIVE</sup>
</ef-tab>
```
::

```html
<ef-tab label="Tab1" sub-label="Secondary long text">
 Custom Content
 <span class="suffix">EXCLUSIVE</span>
</ef-tab>
<ef-tab label="Tab2" sub-label="Secondary long text" clears>
 Custom Content With Clears
 <sup class="suffix">EXCLUSIVE</sup>
</ef-tab>
```

### Truncate label text

Uses `lineClamp = "0"` to change from ellipsis to middle truncation.

::
```javascript
::tab::
```
```html
<ef-tab style="max-width: 100px;" label="A Very Long Label" sub-label="Secondary info Beneath" line-clamp="0"></ef-tab>
<ef-tab style="max-width: 100px;" label="A Very Long Long Long Label" line-clamp="2"></ef-tab>
```
::

```html
<ef-tab style="max-width: 100px;" line-clamp="0" label="A Very Long Label" sub-label="Secondary info Beneath"></ef-tab>
<ef-tab style="max-width: 100px;" line-clamp="2" label="A Very Long Long Long Label"></ef-tab>
```

Also `line-clamp` can limit the maximum number of lines that the text can display. The text automatically truncates with ellipsis when its length is larger than the width provided.

This feature will be omitted if it's used with `line-clamp="0"` or `sub-label`

::
```javascript
::tab::
```
```html
<ef-tab style="max-width: 80px;" label="A Very Long Primary Label" line-clamp="2"></ef-tab>
```
::

```html
<ef-tab style="max-width: 80px;" label="A Very Long Primary Label" line-clamp="2"></ef-tab>
```

### Tab with icon

An inline icon can be set to display inside each tab using the `icon` attribute.

::
```javascript
::tab::
```
```html
<ef-tab icon="dividend" label="Dividend"></ef-tab>
```
::

```html
<ef-tab icon="dividend" label="Dividend"></ef-tab>
```

### Tab with clear button

Tab can display a clear button (a small cross icon) using the `clears` attribute. To show a clear button on hover only, use `clears-on-hover`, instead.

You can add a `clear` event listener to the tab to know when the clear button is clicked.

::
```javascript
::tab::
document.querySelectorAll('ef-tab').forEach((tab) => {
  tab.addEventListener('clear', (e) => {
    document.getElementById('clearsLog').textContent = `${e.detail.label} is on cleared`;
  });
});
```
```html
<ef-tab clears label="Clears tab"></ef-tab>
<ef-tab clears-on-hover label="Clears on hover tab"></ef-tab>
<pre id="clearsLog"></pre>
```
::

```html
<ef-tab clears label="Clears tab"></ef-tab>
<ef-tab clears-on-hover label="Clears on hover tab"></ef-tab>
<pre id="clearsLog"></pre>
```
```javascript
document.querySelectorAll('ef-tab').forEach((tab) => {
  tab.addEventListener('clear', (e) => {
    document.getElementById('clearsLog').textContent = `${e.detail.label} is on cleared`;
  });
});
```

### Active tab and events

`ef-tab` provides an `active` attribute/property to set the active state. You can add a `tap` event listener to each `ef-tab` and then define the actions you need to perform.
The `tap` event is similar to the `click` event, but will work for both desktop and touch devices.

::
```javascript
::tab::
const tabs = document.querySelectorAll('ef-tab');
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('tap', (e) => {
    for (let x = 0; x < tabs.length; x++) {
      tabs[x].active = false;
    }
    document.getElementById('event').textContent = `${e.target.label} + is clicked`;
    e.target.active = true;
  })
}
```
```html
<div style="display: flex;">
  <ef-tab id="tab1" active label="Tab 1"></ef-tab>
  <ef-tab id="tab2" label="Tab 2"></ef-tab>
  <ef-tab id="tab3" label="Tab 3"></ef-tab>
  <ef-tab id="tab3" label="Tab 4"></ef-tab>
</div>
<pre id="event"></pre>
```
::

```html
<div style="display: flex;">
  <ef-tab id="tab1" active label="Tab 1"></ef-tab>
  <ef-tab id="tab2" label="Tab 2"></ef-tab>
  <ef-tab id="tab3" label="Tab 3"></ef-tab>
  <ef-tab id="tab3" label="Tab 4"></ef-tab>
  <pre id="event"></pre>
</div>
```

```javascript
const tabs = document.querySelectorAll('ef-tab');

/* reset all tabs to inactive */
const resetActive = () => {
  tabs.forEach((tab) => tab.active = false);
}

tabs.forEach((tab) => {
  tab.addEventListener('tap', (e) => {
    resetActive();
    document.getElementById('event').textContent = `${e.target.label} + is clicked`;
    e.target.active = true;
  });
});
```

## Accessibility
::a11y-intro::

The Tab element is assigned the `role="tab"` and can include the `aria-selected` state. Tab can be associated with both the Tab Bar and Panel components. As a best practice to accommodate accessible users, try to minimize the number of tabs that they need to navigate within a Tab Bar. States such as `disabled`, `pressed` or `read-only` are programmatically updated to match the element’s visual state.

::a11y-end::

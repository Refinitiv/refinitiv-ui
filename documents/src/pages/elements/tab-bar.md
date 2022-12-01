<!--
type: page
title: Tab Bar
location: ./elements/tab-bar
layout: default
-->

# Tab Bar

::
```javascript
::tab-bar::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/panel?min';
halo('panel');
const tabs = document.getElementById('tabs');
const title = document.getElementById('title');
tabs.addEventListener('value-changed', (event) => {
  if (event.detail && event.detail.value) {
    title.textContent = tabs.querySelectorAll(`[value="${event.detail.value}"]`)[0].label;
  }
});
```
```html
<ef-tab-bar id="tabs">
  <ef-tab label="Market" value="market" active></ef-tab>
  <ef-tab label="Company" value="company"></ef-tab>
  <ef-tab label="News" value="news"></ef-tab>
  <ef-tab label="Charting" value="charting"></ef-tab>
  <ef-tab label="Monitors" value="monitor"></ef-tab>
  <ef-tab icon="settings" value="setting"></ef-tab>
</ef-tab-bar>
<ef-panel spacing>
  <h6 id="title">Market</h6>
  <div id="detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar euismod libero auctor facilisis. Praesent vestibulum feugiat augue a dapibus. Donec auctor malesuada pellentesque. Duis at massa quis mauris faucibus.</div>
</ef-panel>
```
::

<br>

A standard tab navigation control that can be used to navigate between views.

## Usage
You can create a navigation tab by wrapping `ef-tab` with `ef-tab-bar`.

@> Each `ef-tab` should be assigned with an unique `value`.

By default, the first `ef-tab` will be set to active automatically. You can assign `active` attribute to any other `ef-tab` to set the default active tab.

Tab bar will provide left and right navigation buttons if there is not enough space to display all tabs on the screen.

::
```javascript
::tab-bar::
```
```html
<ef-tab-bar>
  <ef-tab label="Tab 1" value="tab1"></ef-tab>
  <ef-tab label="Tab 2" value="tab2"></ef-tab>
  <ef-tab label="Tab 3" value="tab3"></ef-tab>
</ef-tab-bar><br>
<ef-tab-bar style="max-width:350px">
  <ef-tab label="Tab 1" value="tab1"></ef-tab>
  <ef-tab label="Tab 2" value="tab2"></ef-tab>
  <ef-tab label="Tab 3" value="tab3"></ef-tab>
  <ef-tab label="Tab 4" value="tab4"></ef-tab>
  <ef-tab label="Tab 5" value="tab5"></ef-tab>
  <ef-tab label="Tab 6" value="tab6"></ef-tab>
  <ef-tab label="Tab 7" value="tab7"></ef-tab>
  <ef-tab label="Tab 8" value="tab8"></ef-tab>
  <ef-tab label="Tab 9" value="tab9"></ef-tab>
  <ef-tab label="Tab 10" value="tab10"></ef-tab>
</ef-tab-bar>
```
::

```html
<ef-tab-bar>
  <ef-tab label="Tab 1" value="tab1"></ef-tab>
  <ef-tab label="Tab 2" value="tab2"></ef-tab>
  <ef-tab label="Tab 3" value="tab3"></ef-tab>
</ef-tab-bar>
```

## Tabs styles

### Level
A level can be set to `ef-tab-bar` to change the style of the tab bar. Level styling is managed by the theme.

::
```javascript
::tab-bar::
```
```html
<ef-tab-bar level="1">
  <ef-tab label="Tab1" value="tab1"></ef-tab>
  <ef-tab label="Tab2" active value="tab2"></ef-tab>
  <ef-tab label="Tab3" value="tab3"></ef-tab>
</ef-tab-bar>
<br>
<ef-tab-bar level="2">
  <ef-tab label="Tab1" value="tab1"></ef-tab>
  <ef-tab label="Tab2" active value="tab2"></ef-tab>
  <ef-tab label="Tab3" value="tab3"></ef-tab>
</ef-tab-bar>
<br>
<ef-tab-bar level="3">
  <ef-tab label="Tab1" value="tab1"></ef-tab>
  <ef-tab label="Tab2" active value="tab2"></ef-tab>
  <ef-tab label="Tab3" value="tab3"></ef-tab>
</ef-tab-bar>
```
::

```html
<ef-tab-bar level="1">
  <ef-tab label="Tab1" value="tab1"></ef-tab>
  <ef-tab label="Tab2" active value="tab2"></ef-tab>
  <ef-tab label="Tab3" value="tab3"></ef-tab>
</ef-tab-bar>
<br>
<ef-tab-bar level="2">
  <ef-tab label="Tab1" value="tab1"></ef-tab>
  <ef-tab label="Tab2" value="tab2" active></ef-tab>
  <ef-tab label="Tab3" value="tab3"></ef-tab>
</ef-tab-bar>
<br>
<ef-tab-bar level="3">
  <ef-tab label="Tab1" value="tab1"></ef-tab>
  <ef-tab label="Tab2" value="tab2" active></ef-tab>
  <ef-tab label="Tab3" value="tab3"></ef-tab>
</ef-tab-bar>
```

### Icons
Assign `icon` attribute to `ef-tab` with [supporting icon name](/elements/icon#icon-list) to create a tab with icon.

::
```javascript
::tab-bar::
```
```html
<ef-tab-bar>
  <ef-tab label="Tab" value="tab1"></ef-tab>
  <ef-tab label="Icon" value="tab2" icon="chart-area"></ef-tab>
  <ef-tab icon="settings" value="tab3"></ef-tab>
<ef-tab-bar>
```
::

```html
<ef-tab-bar>
  <ef-tab label="Tab" value="tab1"></ef-tab>
  <ef-tab label="Icon" value="tab2" icon="chart-area"></ef-tab>
  <ef-tab icon="settings" value="tab3"></ef-tab>
<ef-tab-bar>
```

### Disabled
Assign `disabled` to `ef-tab` to disable the tab and prevent users from clicking the tab.

::
```javascript
::tab-bar::
```
```html
<ef-tab-bar>
  <ef-tab label="Tab" value="tab1" disabled></ef-tab>
  <ef-tab label="Icon" value="tab2" icon="chart-area"></ef-tab>
  <ef-tab icon="settings" value="tab3"></ef-tab>
<ef-tab-bar>
```
::


## Sub label
`ef-tab` provides `label` and `sub-label` attributes for displaying hierarchical text. If the width of `label` and `sub-label` is longer than the `ef-tab` width, both automatically truncate with ellipsis.

::
```javascript
::tab-bar::
```
```html
<ef-tab-bar>
  <ef-tab label="Label" sub-label="Secondary info" value="tab1"></ef-tab>
  <ef-tab label="Label Two" sub-label="A long secondary info" value="tab2"></ef-tab>
  <ef-tab style="max-width: 100px;" label="A Very Long Label" sub-label="A long secondary info" value="tab3"></ef-tab>
</ef-tab-bar>
```
::

```html
<ef-tab-bar>
  <ef-tab label="Label" sub-label="Secondary info" value="tab1"></ef-tab>
  <ef-tab label="Label Two" sub-label="A long secondary info" value="tab2"></ef-tab>
  <ef-tab
    style="max-width: 100px;"
    label="A Very Long Label"
    sub-label="A long secondary info">
  </ef-tab>
</ef-tab-bar>
```

Note that if `ef-tab` has content, it will omit both `label` and `sub-label`, and display the content instead. This could be used to create tabs that required styled content.

```html
<ef-tab value="tab1">
 Custom Content
 <span class="suffix">EXCLUSIVE</span>
</ef-tab>
```

## Truncate label text

Assign `line-clamp` attribute to limit the maximum number of lines that the text can display. The text automatically truncates with ellipsis when its length is larger than the width provided.

Uses `lineClamp = "0"` to change from ellipsis to middle truncation.

::
```javascript
::tab-bar::
```
```html
<ef-tab-bar>
  <ef-tab style="max-width: 100px;" label="A Very Long Label" sub-label="Secondary info Beneath" line-clamp="0" value="tab1"></ef-tab>
  <ef-tab style="max-width: 100px;" label="A Very Long Long Long Label" line-clamp="2" value="tab2"></ef-tab>
</ef-tab-bar>
```
::

```html
<ef-tab-bar>
  <ef-tab
    style="max-width: 100px;"
    line-clamp="0"
    label="A Very Long Label"
    sub-label="Secondary info Beneath"
    value="tab1">
  </ef-tab>
  <ef-tab
    style="max-width: 100px;"
    line-clamp="2"
    label="A Very Long Long Long Label"
    value="tab2">
  </ef-tab>
</ef-tab-bar>
```

## Vertical tab
Setting the `vertical` attribute/property to true will change the layout of the Tab Bar from horizontal to vertical.

::
```javascript
::tab-bar::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/tab?min';
halo('tab');
const tabs = document.getElementById('tabs');

tabs.addEventListener('value-changed', (event) => {
  if (event.detail && event.detail.value) {
    document.getElementById('header').textContent = tabs.querySelectorAll(`[value="${event.detail.value}"]`)[0].label;
  }
});
```
```css
.container {
  display: flex;
  border: 1px solid #262626;
}
section {
  padding: 1em;
}
```
```html
<div class="container">
  <ef-tab-bar id="tabs" vertical>
    <ef-tab label="Home" value="home" sub-label="The family or social unit occupying a home" icon="home"></ef-tab>
    <ef-tab label="Calendar" value="calendar" sub-label="A chart or series of pages showing the days, weeks, and months of a particular year" icon="calendar" active></ef-tab>
    <ef-tab label="Settings" value="settings" sub-label="A factor at which a machine or device can be adjusted to operate." icon="settings"></ef-tab>
  </ef-tab-bar>
  <section>
    <h6 id="header">Calendar</h6>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste tempore doloribus error? Veniam reiciendis minus itaque eius temporibus quos totam nihil nisi, praesentium perspiciatis laudantium non quidem esse architecto et eos excepturi doloribus quas nulla impedit amet odio! Laborum fuga exercitationem quae autem provident, sint neque ex iure numquam tenetur.
  </section>
</div>
```
::

## Tab with clear button
Tab can display a clear button (a small cross icon) using the `clears` attribute. To show a clear button on hover only, use `clears-on-hover`, instead.

You can add a `clear` event listener to the tab to know when the clear button is clicked.

::
```javascript
::tab-bar::
document.querySelectorAll('ef-tab').forEach((tab) => {
  tab.addEventListener('clear', (e) => {
    document.getElementById('clearsLog').textContent = `${e.target.value} is cleared`;
  });
});
```
```html
<ef-tab-bar>
  <ef-tab clears label="Clears tab" value="tab1"></ef-tab>
  <ef-tab clears-on-hover label="Clears on hover tab" value="tab2"></ef-tab>
</ef-tab-bar>
<pre id="clearsLog"></pre>
```
::

```html
<ef-tab-bar>
  <ef-tab clears label="Clears tab" value="tab1"></ef-tab>
  <ef-tab clears-on-hover label="Clears on hover tab" value="tab2"></ef-tab>
</ef-tab-bar>
<pre id="clearsLog"></pre>
```
```javascript
document.querySelectorAll('ef-tab').forEach((tab) => {
  tab.addEventListener('clear', (e) => {
    document.getElementById('clearsLog').textContent = `${e.target.value} is cleared`;
  });
});
```

## Handling active tab changed
When users changed the active tab, Tab Bar will fire `value-changed` event with value of the new active tab in `detail.value`. If there is no assigned `value` to the tab, it will use `label` as a `value`.

## Accessibility
::a11y-intro::

`ef-tab-bar` is assigned the `role="tablist"`. Since the Tab Bar serves as a container for Tab elements, it does not itself receive keyboard focus. As a best practice to accommodate accessible users, try to minimize the number of tabs that they need to navigate within a Tab Bar. Note that the Tab Bar should not be used in place of the Button Bar, which is intended to group buttons that allow users to take actions – maintaining this distinction will help accessible users understand the purpose of the component.

`ef-tab-bar` provides role and keyboard navigation for users to navigate within the tab bar. You should provide `aria-label` on `ef-tab-bar` and `ef-tab` for users to understand the purpose of the tab via assistive technology.

In case you use `ef-tab-bar` with clears feature, you could assign more descriptive text in `aria-label` of `ef-tab-bar` or assign `aria-description` to each `ef-tab`, thus, users are aware that the tab is able to delete via Delete key.

```html
<ef-tab-bar aria-label="News categories. Use delete key to delete tab">
  <ef-tab label="Top News" aria-label="Top News" clears></ef-tab>
  <ef-tab label="Technology" aria-label="Technology" clears></ef-tab>
  <ef-tab label="World" aria-label="World" clears></ef-tab>
  <ef-tab label="Arts" aria-label="Arts" clears></ef-tab>
</ef-tab-bar>
```

::a11y-end::

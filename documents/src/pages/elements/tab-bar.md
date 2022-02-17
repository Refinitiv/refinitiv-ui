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
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/tab?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/panel?min';
halo('tab');
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

### Usage
You can create a navigation tab by wrapping `ef-tab` with `ef-tab-bar`. Each `ef-tab` should be assigned with unique `value`.

By default, the first `ef-tab` will be set to active automatically. You can assign `active` attribute to any other `ef-tab` to set the default active tab.

@> For full features of `ef-tab` such as `icon`, please see [Tab](./elements/tab).

::
```javascript
::tab-bar::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/tab?min';
halo('tab');
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

Tab bar will provide left and right navigation buttons if there is not enough space to display all tabs on the screen.

```html
<ef-tab-bar>
  <ef-tab label="Tab 1" value="tab1"></ef-tab>
  <ef-tab label="Tab 2" value="tab2"></ef-tab>
  <ef-tab label="Tab 3" value="tab3"></ef-tab>
</ef-tab-bar>

<ef-tab-bar>
  <ef-tab label="Tab 1" value="tab1"></ef-tab>
  <ef-tab label="Tab 2" value="tab2" active></ef-tab>
  <ef-tab label="Tab 3" value="tab3"></ef-tab>
</ef-tab-bar>
```

### Level styles
A level can be set to `ef-tab-bar` to change the style of the tab bar. Level styling is managed by the theme.

::
```javascript
::tab-bar::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/tab?min';
halo('tab');
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

### Vertical tab
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

### Handling active tab changed
When users changed the active tab, Tab Bar will fire `value-changed` event with value of the new active tab in `detail.value`. If there is no assigned `value` to the tab, it will use `label` as a `value`.
## Accessibility
::a11y-intro::

The Tab Bar is assigned the `role="tablist"`. Since the Tab Bar serves as a container for Tab elements, it does not itself receive keyboard focus. As a best practice to accommodate accessible users, try to minimize the number of tabs that they need to navigate within a Tab Bar. Note that the Tab Bar should not be used in place of the Button Bar, which is intended to group buttons that allow users to take actions – maintaining this distinction will help accessible users understand the purpose of the component.

!>Consider having Tab Bar receive keyboard focus and having Buttons receive focus using rowing index. 

::a11y-end::

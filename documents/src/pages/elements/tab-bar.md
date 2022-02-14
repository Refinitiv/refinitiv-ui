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
const tabs = document.querySelectorAll('ef-tab');
const title = document.getElementById('title');
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('tap', (e) => {
    if (e.target.label && e.target.label.length > 0) {
      title.textContent = e.target.label;
    }
    else {
      title.textContent = "Settings";
    }
  })
}
```
```html
<ef-tab-bar>
  <ef-tab label="Market" active></ef-tab>
  <ef-tab label="Company"></ef-tab>
  <ef-tab label="News"></ef-tab>
  <ef-tab label="Charting"></ef-tab>
  <ef-tab label="Monitors"></ef-tab>
  <ef-tab icon="settings"></ef-tab>
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

You can create a navigation tab by wrapping `ef-tab` with `ef-tab-bar`.
Tab bar will provide left and right navigation buttons if there is not enough space to display all tabs on the screen.

@> For full features of `ef-tab` such as `icon`, please see [Tab](./elements/tab).

::
```javascript
::tab-bar::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/tab?min';
halo('tab');
```
```html
<ef-tab-bar>
  <ef-tab label="Tab 1"></ef-tab>
  <ef-tab label="Tab 2"></ef-tab>
  <ef-tab label="Tab 3"></ef-tab>
</ef-tab-bar><br>
<ef-tab-bar style="max-width:350px">
  <ef-tab label="Tab 1"></ef-tab>
  <ef-tab label="Tab 2"></ef-tab>
  <ef-tab label="Tab 3"></ef-tab>
  <ef-tab label="Tab 4"></ef-tab>
  <ef-tab label="Tab 5"></ef-tab>
  <ef-tab label="Tab 6"></ef-tab>
  <ef-tab label="Tab 7"></ef-tab>
  <ef-tab label="Tab 8"></ef-tab>
  <ef-tab label="Tab 9"></ef-tab>
  <ef-tab label="Tab 10"></ef-tab>
</ef-tab-bar>
```
::

```html
<ef-tab-bar>
  <ef-tab label="Tab 1"></ef-tab>
  <ef-tab label="Tab 2"></ef-tab>
  <ef-tab label="Tab 3"></ef-tab>
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
  <ef-tab label="Tab1"></ef-tab>
  <ef-tab label="Tab2" active></ef-tab>
  <ef-tab label="Tab3"></ef-tab>
</ef-tab-bar>
<br>
<ef-tab-bar level="2">
  <ef-tab label="Tab1"></ef-tab>
  <ef-tab label="Tab2" active></ef-tab>
  <ef-tab label="Tab3"></ef-tab>
</ef-tab-bar>
<br>
<ef-tab-bar level="3">
  <ef-tab label="Tab1"></ef-tab>
  <ef-tab label="Tab2" active></ef-tab>
  <ef-tab label="Tab3"></ef-tab>
</ef-tab-bar>
```
::

```html
<ef-tab-bar level="1">
  <ef-tab label="Tab1"></ef-tab>
  <ef-tab label="Tab2" active></ef-tab>
  <ef-tab label="Tab3"></ef-tab>
</ef-tab-bar>
<ef-tab-bar level="2">
  <ef-tab label="Tab1"></ef-tab>
  <ef-tab label="Tab2" active></ef-tab>
  <ef-tab label="Tab3"></ef-tab>
</ef-tab-bar>
<ef-tab-bar level="3">
  <ef-tab label="Tab1"></ef-tab>
  <ef-tab label="Tab2" active></ef-tab>
  <ef-tab label="Tab3"></ef-tab>
</ef-tab-bar>
```

### Vertical tab

Setting the `vertical` attribute/property to true will change the layout of the Tab Bar from horizontal to vertical.

::
```javascript
::tab-bar::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/tab?min';
halo('tab');
const tabs = document.querySelectorAll('ef-tab');

tabs.forEach((tab) => {
  tab.addEventListener('tap', (e) => {
    document.getElementById('header').textContent = e.target.label;
  });
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
  <ef-tab-bar vertical>
    <ef-tab label="Home" sub-label="The family or social unit occupying a home" icon="home"></ef-tab>
    <ef-tab label="Calendar" sub-label="A chart or series of pages showing the days, weeks, and months of a particular year" icon="calendar" active></ef-tab>
    <ef-tab label="Setting" sub-label="A factor at which a machine or device can be adjusted to operate." icon="settings"></ef-tab>
  </ef-tab-bar>
  <section>
    <h6 id="header">Calendar</h6>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste tempore doloribus error? Veniam reiciendis minus itaque eius temporibus quos totam nihil nisi, praesentium perspiciatis laudantium non quidem esse architecto et eos excepturi doloribus quas nulla impedit amet odio! Laborum fuga exercitationem quae autem provident, sint neque ex iure numquam tenetur.
  </section>
</div>
```
::

```html
<div class="container">
  <ef-tab-bar vertical>
    <ef-tab label="Home" sub-label="The family or social unit occupying a home" icon="home"></ef-tab>
    <ef-tab label="Calendar" sub-label="A chart or series of pages showing the days, weeks, and months of a particular year" icon="calendar" active></ef-tab>
    <ef-tab label="Setting" sub-label="A factor at which a machine or device can be adjusted to operate." icon="settings"></ef-tab>
  </ef-tab-bar>
  <section>
    <h6>Calendar</h6>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste tempore doloribus error? Veniam reiciendis minus itaque eius temporibus quos totam nihil nisi, praesentium perspiciatis laudantium non quidem esse architecto et eos excepturi doloribus quas nulla impedit amet odio! Laborum fuga exercitationem quae autem provident, sint neque ex iure numquam tenetur.
  </section>
</div>
```

### Selecting a default tab

You may wish to set an initial active value. This can be achieved by adding a `active` attribute to the tab you would like to have selected by default.

Only one tab can be selected at a time.

::
```javascript
::select::
```
```css
section {
  height: 225px;
  padding: 0 3px;
}
```
```html
<ef-tab-bar>
  <ef-tab label="Market"></ef-tab>
  <ef-tab label="Company"></ef-tab>
  <ef-tab label="News"></ef-tab>
  <ef-tab label="Charting" active></ef-tab>
  <ef-tab label="Monitors"></ef-tab>
  <ef-tab icon="settings"></ef-tab>
</ef-tab-bar>
```
::

```html
...
<ef-tab-bar>
  <ef-tab label="Market"></ef-tab>
  <ef-tab label="Company"></ef-tab>
  <ef-tab label="News"></ef-tab>
  <ef-tab label="Charting" active></ef-tab>
  <ef-tab label="Monitors"></ef-tab>
  <ef-tab icon="settings"></ef-tab>
</ef-tab-bar>
...
```

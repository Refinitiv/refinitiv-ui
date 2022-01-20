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
    for (let x = 0; x < tabs.length; x++) {
      tabs[x].active = false;
    }
    if (e.target.label && e.target.label.length > 0) {
      title.textContent = e.target.label;
    }
    else {
      title.textContent = "Settings";
    }
    e.target.active = true;
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

/* reset all tabs to inactive */
const resetActive = () => {
  tabs.forEach((tab) => tab.active = false);
}

tabs.forEach((tab) => {
  tab.addEventListener('tap', (e) => {
    resetActive();
    document.getElementById('header').textContent = e.target.label;
    e.target.active = true;
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

### Switching tab

`ef-tab` provides an `active` attribute/property to set the active tab. You can add a `tap` event listener to each `ef-tab` and then add the actions you need to perform -- the `tap` event is similar to the `click` event, but will work for both desktop and touch devices.

::
```javascript
::tab-bar::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/tab?min';
halo('tab');
const tabs = document.querySelectorAll('ef-tab');
const event = document.getElementById('event');
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('tap', (e) => {
    for (let x = 0; x < tabs.length; x++) {
      tabs[x].active = false;
    }
    if (e.target.label && e.target.label.length > 0) {
      event.textContent = `${e.target.label} + is clicked`;
    }
    else {
      event.textContent = "Settings is clicked";
    }
    e.target.active = true;
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
<pre id="event"></pre>
```
::

```html
<ef-tab-bar>
  <ef-tab label="Market" active></ef-tab>
  <ef-tab label="Company"></ef-tab>
  <ef-tab label="News"></ef-tab>
  <ef-tab label="Charting"></ef-tab>
  <ef-tab label="Monitors"></ef-tab>
  <ef-tab icon="settings"></ef-tab>
</ef-tab-bar>
<pre id="event"></pre>
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

The Tab Bar is assigned the `role="tablist"`. Since the Tab Bar serves as a container for Tab elements, it does not itself receive keyboard focus. As a best practice to accommodate accessible users, try to minimize the number of tabs that they need to navigate within a Tab Bar. Note that the Tab Bar should not be used in place of the Button Bar, which is intended to group buttons that allow users to take actions – maintaining this distinction will help accessible users understand the purpose of the component.

!>Consider having Tab Bar receive keyboard focus and having Buttons receive focus using rowing index. 

::a11y-end::

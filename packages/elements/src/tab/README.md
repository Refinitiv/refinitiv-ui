# Tab

```live(preview)
<style>
  .tab-container {
    display:flex;
  }
  ef-tab {
    margin-right: 3px;
    min-width: 90px;
  }
</style>
<div class="tab-container">
  <ef-tab label="Tab"></ef-tab>
  <ef-tab label="Icon Tab" icon="chart-area" active></ef-tab>
  <ef-tab label="Icon Tab" icon="chart-area"></ef-tab>
  <ef-tab label="Active Tab" active></ef-tab>
  <ef-tab label="Disabled Tab" disabled></ef-tab>
  <ef-tab label="Icon Tab" icon="chart-area" disabled></ef-tab>
</div>
```

A basic building block that can be used to build tab navigation controls.

## Basic usage

`ef-tab` is used for creating an individual tab item. It's purposely built as a building block, so you should consider using [Tab Bar](./tab-bar.md) instead for a standard tab navigation control.

```live
<ef-tab label="Tab1"></ef-tab>
<ef-tab label="Tab2"></ef-tab>
<ef-tab label="Tab3"></ef-tab>
```

```html
<ef-tab label="Tab1"></ef-tab>
<ef-tab label="Tab2"></ef-tab>
<ef-tab label="Tab3"></ef-tab>
```

## Label

`ef-tab` provides `label` and `sub-label` attributes for displaying text with a hierarchy. If `label` and `sub-label` width is longer than `ef-tab` width, both of the texts will be automatically truncated with ellipsis.

```live
<ef-tab label="Label" sub-label="Secondary info"></ef-tab>
<ef-tab label="Label Two" sub-label="A long secondary info"></ef-tab>
<ef-tab style="max-width: 100px;" label="A Very Long Label" sub-label="A long secondary info"></ef-tab>
```

```html
<ef-tab label="Label" sub-label="Secondary info"></ef-tab>
<ef-tab label="Label Two" sub-label="A long secondary info"></ef-tab>
<ef-tab style="max-width: 100px;" label="A Very Long Label" sub-label="A long secondary info"></ef-tab>
```

Uses `truncate = "center"` to change from ellipsis to middle truncation.

```live
<ef-tab style="max-width: 100px;" label="A Very Long Label" sub-label="Secondary info Beneath" truncate="center"></ef-tab>
```

```html
<ef-tab style="max-width: 100px;" label="A Very Long Label" sub-label="Secondary info Beneath" truncate="center"></ef-tab>
```

Both label and sub-label are not displayed if ef-tab has children.

```live
 <style>
  .suffix {
    color: #334BFF;
  }
  ef-tab:hover .suffix {
    color: #FFE999;
  }
 </style>
<ef-tab label="Tab1" sub-label="Secondary long text">
 Custom Content
 <span class="suffix">EXCLUSIVE</span>
</ef-tab>
<ef-tab label="Tab2" sub-label="Secondary long text" clears>
 Custom Content With Clears
 <sup class="suffix">EXCLUSIVE</sup>
</ef-tab>
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

## Max line

`max-line` limits the maximum number of lines that the text can display. It automatically truncates with ellipsis when the text length is more than the width provided. 

This feature will be omitted if it's used with `truncate="center"` or `sub-label` 
**Note: this feature is not supported on IE.**

```live
<ef-tab style="max-width: 80px;" label="A Very Long Primary Label" max-line="2"></ef-tab>
```

```html
<ef-tab style="max-width: 80px;" label="A Very Long Primary Label" max-line="2"></ef-tab>
```

## Icon

Inline icon can be set to show inside each tab by using `icon`.

```live
<ef-tab icon="dividend" label="Dividend"></ef-tab>
```

```html
<ef-tab icon="dividend" label="Dividend"></ef-tab>
```

### Tab with clear button

Tab can show a clear button, a small cross icon, by adding `clears` attribute. To show a clear button on hover only use `clears-on-hover` instead.

You can add `clear` event listener to the tab when the clear button is clicked.

```live
<ef-tab clears label="Clears tab"></ef-tab>
<ef-tab clears-on-hover label="Clears on hover tab"></ef-tab>
<pre id="clearsLog"></pre>
<script>
  document.querySelectorAll('ef-tab').forEach((tab) => {
    tab.addEventListener('clear', (e) => {
      document.getElementById('clearsLog').textContent = `${e.detail.label} is on cleared`;
    });
  });
</script>
```

```html
<ef-tab clears label="Clears tab"></ef-tab>
<ef-tab clears-on-hover label="Clears on hover tab"></ef-tab>
<pre id="clearsLog"></pre>
<script>
  document.querySelectorAll('ef-tab').forEach((tab) => {
    tab.addEventListener('clear', (e) => {
      document.getElementById('clearsLog').textContent = `${e.detail.label} is on cleared`;
    });
  });
</script>
```

## Active tab and events

`ef-tab` provides `active` attribute/property to set active state. You can add `tap` event listener to each `ef-tab` and then add the actions you need to perform.
`tap` event is similar to `click` event but it will work in both desktop and touch devices.

```live
<div style="display: flex;">
  <ef-tab id="tab1" active label="Tab 1"></ef-tab>
  <ef-tab id="tab2" label="Tab 2"></ef-tab>
  <ef-tab id="tab3" label="Tab 3"></ef-tab>
  <ef-tab id="tab3" label="Tab 4"></ef-tab>
</div>
<pre id="event"></pre>

<script>
  var tabs = document.querySelectorAll('ef-tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('tap', function (e) {
      for (var x = 0; x < tabs.length; x++) {
        tabs[x].active = false;
      }
      document.getElementById('event').textContent = e.target.label + ' is clicked';
      e.target.active = true;
    })
  }
</script>
```


```html
<div style="display: flex;">
  <ef-tab id="tab1" active label="Tab 1"></ef-tab>
  <ef-tab id="tab2" label="Tab 2"></ef-tab>
  <ef-tab id="tab3" label="Tab 3"></ef-tab>
  <ef-tab id="tab3" label="Tab 4"></ef-tab>
  <pre id="event"></pre>
</div>
```

```js
const tabs = document.querySelectorAll('ef-tab');

/* reset all tabs to inactive */
const resetActive = () => {
  tabs.forEach((tab) => tab.active = false);
}

tabs.forEach((tab) => {
  tab.addEventListener('tap', (e) => {
    resetActive();
    document.getElementById('event').textContent = e.target.label + ' is clicked';
    e.target.active = true;
  });
});
```

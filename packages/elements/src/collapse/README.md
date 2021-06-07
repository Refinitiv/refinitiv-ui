# Collapse


```live(preview)
<ef-collapse header="Section 1">
  <div style="padding:10px">Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.</div>
</ef-collapse>
```

`ef-collapse` allows users to hide non-critical information or areas of the screen, maximizing the amount of real estate for their primary displays.

The component can use to wrap around any html content. The content could be either native html elements such as `div` or custom components.

### Set title
Title of each section can be set by using the `header` attribute.

```live
<ef-collapse header="Section 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```

```html
<ef-collapse header="Section 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```

### Set section level
You can set `level` attribute to visualize a hierarchical content. Styling each level is managed by each theme.

```live
<ef-collapse level="1" header="Level 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
<ef-collapse level="2" header="Level 2">
  <div>
  Foam, crema pumpkin spice siphon cup aromatic ut turkish plunger pot dark. That macchiato robusta sweet galao blue mountain to go trifecta fair trade.
</div>
</ef-collapse>
<ef-collapse level="3" header="Level 3">
  <div>
  Macchiato grounds cappuccino brewed cortado beans lungo bar mocha. Flavour, irish bar siphon foam siphon skinny est trifecta.
  </div>
</ef-collapse>
```

```html
<ef-collapse level="1" header="Level 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
<ef-collapse level="2" header="Level 2">
  <div>
  Foam, crema pumpkin spice siphon cup aromatic ut turkish plunger pot dark. That macchiato robusta sweet galao blue mountain to go trifecta fair trade.
</div>
</ef-collapse>
<ef-collapse level="3" header="Level 3">
  <div>
  Macchiato grounds cappuccino brewed cortado beans lungo bar mocha. Flavour, irish bar siphon foam siphon skinny est trifecta.
  </div>
</ef-collapse>
```

### Content spacing
Content can be set to use a default padding from theme by adding `spacing` attribute.

```live
<ef-collapse spacing header="Section 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```

```html
<ef-collapse spacing header="Section 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```

### Custom header
Header can contain simple text, but also components such as checkbox, button. These components can be added by using `slot`.

```live
<style>
ef-collapse {
  margin-top: 35px;
  margin-bottom: 35px;
}
ef-collapse > ef-checkbox {
  margin-right: 5px;
}
</style>
<ef-collapse header="Single Origin Beans">
  <ef-checkbox slot="header-left"></ef-checkbox>
  <div slot="header-right" class="badge">8</div>
  <ef-button slot="header-right" icon="menu" transparent></ef-button>

  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```

```html
<ef-collapse header="Single Origin Beans">
  <ef-checkbox slot="header-left"></ef-checkbox>
  <div slot="header-right" class="badge">8</div>
  <ef-button slot="header-right" icon="menu" transparent></ef-button>

  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```

### Events
`ef-collapse` acts when it is expanded or clicked.

```js
collapse.addEventListener('expanded-changed', function (e) {
  // e.detail.value will give the current expanded state
});
```

<!--
type: page
title: Collapse
location: ./elements/collapse
layout: default
-->

# Collapse
::
```javascript
::collapse::
```
```html
<ef-collapse header="Section 1">
  <div style="padding:10px">Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.</div>
</ef-collapse>
```
::

`ef-collapse` allows users to hide non-critical information or areas of the screen, maximizing the amount of real estate available to their primary content.

### Usage
The `ef-collapse` can wrap around any html content, be it native html elements such as `div` or custom components.

```html
<ef-collapse expanded>
  <div>
  Macchiato grounds cappuccino brewed cortado beans lungo bar mocha. Flavour, irish bar siphon foam siphon skinny est trifecta.
  </div>
</ef-collapse>
```

### Set title
The title of each section can be set using the `header` attribute.

::
```javascript
::collapse::
```
```html
<ef-collapse header="Section 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```
::

```html
<ef-collapse header="Section 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```

### Set section level
You can set the `level` attribute to visualize hierarchical content. Styling each level is managed by the theme.

::
```javascript
::collapse::
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
::

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
Content can be set to use default padding from the theme by adding the `spacing` attribute.

::
```javascript
::collapse::
```
```html
<ef-collapse spacing header="Section 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```
::

```html
<ef-collapse spacing header="Section 1">
  <div>
  Beans, breve galao froth arabica wings seasonal. Medium, galao redeye single origin brewed rich flavour as crema.
  </div>
</ef-collapse>
```

### Custom header
The header can contain simple text or components such as checkbox, button. These components can be added using `slot`.

::
```javascript
::collapse::
```
```css
ef-collapse {
  margin-top: 35px;
  margin-bottom: 35px;
}
ef-collapse > ef-checkbox {
  margin-right: 5px;
}
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
::

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

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

## Usage
The `ef-collapse` can wrap around any html content, be it native html elements such as `div` or custom components.

```html
<ef-collapse expanded>
  <div>
  Macchiato grounds cappuccino brewed cortado beans lungo bar mocha. Flavour, irish bar siphon foam siphon skinny est trifecta.
  </div>
</ef-collapse>
```

## Set title
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

## Set section level
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

## Content spacing
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

## Custom header
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

## Accessibility
::a11y-intro::

`ef-collapse` is assigned the `role="button"` and can include the property `aria-expanded`. It toggles between expanding and collapsing its content. `aria-level` attribute should be used to define the hierarchical level elements within their hierarchical structures. Levels increase with depth. The value for aria-level is an integer greater than or equal to 1.

The slots feature uses a combination of the Button and Checkbox components.  

`ef-collapse` has provided role and keyboard navigation. However, you need to set an appropriate `aria-level` attribute to the element, depending on your page structure. Typically, on the page, it should reserve `aria-level="1"` for main page's heading (h1) so you may want to set `aria-level` from `aria-level="2"` onwards.

```html
<ef-collapse header="SpaceX Dragon" aria=level="2">
  The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
</ef-collapse>
```

::a11y-end::

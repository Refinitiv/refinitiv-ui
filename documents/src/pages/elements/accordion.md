<!--
type: page
title: Accordion
location: ./elements/accordion
layout: default
-->

# Accordion


::
```javascript
::accordion::
```
```html
<ef-accordion>
  <ef-collapse spacing header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse expanded spacing header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
  <ef-collapse spacing header="Falcon Heavy">
    You know, being a test pilot isn't always the healthiest business in the world.
  </ef-collapse>
</ef-accordion>
```
::


`ef-accordion` is used to display a group of `ef-collapse` controls. By default, only one item at a time can be expanded, but this behavior can be customized to allow multiple expanded item.

### Usage

Accordions can be created by using `ef-collapse` inside `ef-accordion`.

```html
<ef-accordion>
  <ef-collapse spacing header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse spacing header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
  <ef-collapse spacing header="Falcon Heavy">
    You know, being a test pilot isn't always the healthiest business in the world.
  </ef-collapse>
</ef-accordion>
```

By default, only one item at a time can be expanded. Adding the `auto-collapse-disabled` attribute will allow each item to expand independently.

::
```javascript
::accordion::
```
```html
<ef-accordion auto-collapse-disabled>
  <ef-collapse header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
</ef-accordion>
```
::

```html
<ef-accordion auto-collapse-disabled>
  <ef-collapse header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
</ef-accordion>
```

### Initial expanding state and content spacing.

To set an item in the accordion to expand in its initial state, set the `expanded` attribute to `ef-collapse`. If you add the `spacing` attribute to `ef-accordion` then default padding will be applied to the content section of every collapse item.

::
```javascript
::accordion::
```
```html
<ef-accordion spacing>
  <ef-collapse header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse expanded header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
</ef-accordion>
```
::

```html
<ef-accordion spacing>
  <ef-collapse header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse expanded header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
</ef-accordion>
```

### Using slot

Other features of `ef-collapse` can still be used e.g. slots.

::
```javascript
::accordion::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/checkbox?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('checkbox');
halo('button');
```
```css
ef-accordion {
  margin-top: 35px;
  margin-bottom: 35px;
}
ef-collapse > ef-checkbox {
  margin-right: 5px;
}
```
```html
<ef-accordion>
  <ef-collapse header="SpaceX Dragon">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">8</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>

  <ef-collapse header="Falcon 9">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">10</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>

  <ef-collapse header="Falcon Heavy">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">7</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    Dinosaurs are extinct today because they lacked opposable thumbs and the brainpower to build a space program.
  </ef-collapse>
</ef-accordion>
```
::

```html
<ef-accordion>
  <ef-collapse header="SpaceX Dragon">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">8</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>

  <ef-collapse header="Falcon 9">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">10</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>

  <ef-collapse header="Falcon Heavy">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">7</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    Dinosaurs are extinct today because they lacked opposable thumbs and the brainpower to build a space program.
  </ef-collapse>
</ef-accordion>
```

## Accessibility
::a11y-intro::

The Accordion component is assigned heading level 3 and the `role="button"` and can include properties such `aria-controls`. States such as `disabled` or `expanded` are programmatically updated to match the element’s visual state. 

The slots feature uses a combination of the Button and Checkbox components.  

::a11y-end::

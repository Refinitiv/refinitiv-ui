<!--
type: page
title: Overlay Menu
location: ./elements/overlay-menu
layout: default
-->

# Overlay Menu

::
```javascript
::overlay-menu::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
const button = document.getElementById('button');
const menu = document.getElementById('menu');
menu.positionTarget = button;

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    menu.opened = true;
  }
});
```
```css
section {
  height: 235px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-button cta id="button" aria-haspopup="true">Choose Item</ef-button>
</section>
<ef-overlay-menu id="menu" opened>
  <ef-item type="header">Regions</ef-item>
  <ef-item for="emea">EMEA</ef-item>
  <ef-item for="n-america">N. America</ef-item>
  <ef-item for="apac">APAC</ef-item>
  <ef-item for="latin-america">Latin America</ef-item>
  <ef-item type="header">Favorites</ef-item>
  <ef-item icon="flame">Thailand</ef-item>
  <ef-item type="divider"></ef-item>
  <ef-item icon="dislike-empty" disabled>Unspecified</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="emea">
  <ef-item>Spain</ef-item>
  <ef-item>France</ef-item>
  <ef-item for="united-kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="united-kingdom">
  <ef-item>Cardiff</ef-item>
  <ef-item>Edinburgh</ef-item>
  <ef-item>London</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="n-america">
  <ef-item>Canada</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="apac">
  <ef-item>China</ef-item>
  <ef-item>Australia</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="latin-america">
  <ef-item>Mexico</ef-item>
  <ef-item>Brazil</ef-item>
</ef-overlay-menu>

```
::

`ef-overlay-menu` is an overlay window that supports single-level and multi-level menus. It can be positioned by attaching to other elements, or its vertical and horizontal offset can be adjusted, if needed.

## Usage
Create `ef-overlay-menu` with `ef-item` elements as menu items. Listen for the `item-trigger` event to identify a clicked item.

As the overlay menu is designed to support several use cases (multi-selection, toggle, etc.), the menu will not close when an item is clicked. To open or close the menu, simply set the `opened` property to true or false, respectively.

::
```javascript
::overlay-menu::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
const button = document.getElementById('button');
const menu = document.getElementById('menu');
const menuController = menu.parentElement;
menu.positionTarget = button;

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    menu.opened = true;
  }
});

menuController.addEventListener('item-trigger', (e) => {
  const value = e.detail.value;
  console.log('You have clicked on: ' + value);
  button.innerHTML = value;
  menu.opened = false;
});
```
```css
section {
  height: 135px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-button cta id="button" aria-haspopup="true">Choose Item</ef-button>
</section>
<ef-overlay-menu id="menu">
  <ef-item type="header">EMEA</ef-item>
  <ef-item value="Spain">Spain</ef-item>
  <ef-item value="France" disabled>France</ef-item>
  <ef-item value="United Kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
```
::

```html
<ef-button cta id="button" aria-haspopup="true">Choose Item</ef-button>
<ef-overlay-menu id="menu">
  <ef-item type="header">EMEA</ef-item>
  <ef-item value="Spain">Spain</ef-item>
  <ef-item value="France" disabled>France</ef-item>
  <ef-item value="United Kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
```

```javascript
const button = document.getElementById('button');
const menu = document.getElementById('menu');
const menuController = menu.parentElement;
menu.positionTarget = button;

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    menu.opened = true;
  }
});

menuController.addEventListener('item-trigger', (e) => {
  const value = e.detail.value;
  console.log('You have clicked on: ' + value);
  button.innerHTML = value;
  menu.opened = false;
});
```

@> See Item API document for more detail about `ef-item` properties


## Nested menus

Menu and sub-menus are bound together using the `for` and `id` attributes of `ef-item` and the sub-menu. The `for` attribute must be equal to the `id` attribute of the related sub-menu in order to bind the menu and submenu together.

::
```javascript
::overlay-menu::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
const button = document.getElementById('button');
const menu = document.getElementById('menu');
menu.positionTarget = button;

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    menu.opened = true;
  }
});
```
```css
section {
  height: 225px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-button cta id="button" aria-haspopup="true">Nested menus</ef-button>
</section>
<ef-overlay-menu id="menu">
  <ef-item type="header">Regions</ef-item>
  <ef-item for="emea">EMEA</ef-item>
  <ef-item for="apac">APAC</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="emea">
  <ef-item>Spain</ef-item>
  <ef-item disabled>France</ef-item>
  <ef-item for="united-kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="united-kingdom">
  <ef-item>Cardiff</ef-item>
  <ef-item>Edinburgh</ef-item>
  <ef-item for="london">London</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="london">
  <ef-item>London Bridge</ef-item>
  <ef-item>Westminster Bridge</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="apac">
  <ef-item>China</ef-item>
  <ef-item>Australia</ef-item>
</ef-overlay-menu>
```
::

```html
<ef-overlay-menu id="menu">
  <ef-item type="header">Regions</ef-item>
  <ef-item for="emea">EMEA</ef-item>
  <ef-item for="apac">APAC</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="emea">
  <ef-item>Spain</ef-item>
  <ef-item disabled>France</ef-item>
  <ef-item for="united-kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="united-kingdom">
  <ef-item>Cardiff</ef-item>
  <ef-item>Edinburgh</ef-item>
  <ef-item for="london">London</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="london">
  <ef-item>London Bridge</ef-item>
  <ef-item>Westminster Bridge</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="apac">
  <ef-item>China</ef-item>
  <ef-item>Australia</ef-item>
</ef-overlay-menu>
```

## Compact menu
If there is not enough space to fit sub-menus, add the `compact` attribute. In this mode, sub-menus will be opened on top of the parent menu.

::
```javascript
::overlay-menu::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
const button = document.getElementById('button');
const menu = document.getElementById('menu');
menu.positionTarget = button;

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    menu.opened = true;
  }
});
```
```css
section {
  height: 135px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-button cta id="button" aria-haspopup="true">Compact menu</ef-button>
</section>
<ef-overlay-menu id="menu" compact>
  <ef-item type="header">Regions</ef-item>
  <ef-item for="emea">EMEA</ef-item>
  <ef-item for="apac">APAC</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="emea" compact>
  <ef-item>Spain</ef-item>
  <ef-item disabled>France</ef-item>
  <ef-item for="united-kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="united-kingdom" compact>
  <ef-item>Cardiff</ef-item>
  <ef-item>Edinburgh</ef-item>
  <ef-item for="london">London</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="london" compact>
  <ef-item>London Bridge</ef-item>
  <ef-item>Westminster Bridge</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="apac" compact>
  <ef-item>China</ef-item>
  <ef-item>Australia</ef-item>
</ef-overlay-menu>
```
::

```html
<ef-overlay-menu compact>
  ...
</ef-overlay-menu>
```

## Managing position and user interaction

`ef-overlay-menu` inherits properties from `ef-overlay` and thus supports the same positioning strategies.

The developer may specify `with-backdrop` together with `no-cancel-on-outside-click` so users must interact with the menu before they can return to the application.

::
```javascript
::overlay-menu::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
const button = document.getElementById('button');
const menu = document.getElementById('menu');
const menuController = menu.parentElement;

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    // position at the top right corner of the button
    menu.positionTarget = button;
    menu.position = ['right-start'];
    menu.opened = true;
  }
});

menuController.addEventListener('item-trigger', (e) => {
  menu.opened = false;
});
```
```css
section {
  height: 115px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-button cta id="button" aria-haspopup="true">Choose Item</ef-button>
</section>
<ef-overlay-menu id="menu" with-backdrop no-cancel-on-outside-click>
  <ef-item type="header">EMEA</ef-item>
  <ef-item value="Spain">Spain</ef-item>
  <ef-item value="France" disabled>France</ef-item>
  <ef-item value="United Kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
```
::

```html
<ef-button cta id="button" aria-haspopup="true">Choose Item</ef-button>
<ef-overlay-menu id="menu" with-backdrop no-cancel-on-outside-click>...</ef-overlay-menu>
```

```javascript
const button = document.getElementById('button');
const menu = document.getElementById('menu');

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    // position at the top right corner of the button
    menu.positionTarget = button;
    menu.position = ['right-start'];
    menu.opened = true;
  }
});
```

## Loading from data

`ef-overlay-menu` can be populated using the `data` property. `data` fields have the same names as properties in `ef-item`. Use the `items` collection to create sub-menus.

Alternatively, you can set `data` using a [CollectionComposer](./resources/collection-composer), which is useful when you need a rich API to manage data externally.

::
```javascript
::overlay-menu::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
const button = document.getElementById('button');
const menu = document.getElementById('menu');

menu.data = [{
  type: 'header',
  label: 'Regions'
}, {
  icon: 'flame',
  label: 'EMEA',
  items: [{
      label: 'Spain'
  }, {
      label: 'France',
      disabled: true
  }, {
      label: 'Italy'
  }, {
      label: 'United Kingdom'
  }]
}, {
  type: 'divider'
}, {
  label: 'APAC'
}];

menu.positionTarget = button;

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    menu.opened = true;
  }
});
```
```css
section {
  height: 165px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-button cta id="button" aria-haspopup="true">Choose Item</ef-button>
</section>
<ef-overlay-menu id="menu"></ef-overlay-menu>
```
::

```html
<ef-overlay-menu id="menu"></ef-overlay-menu>
```

```javascript
const menu = document.getElementById('menu');

menu.data = [{
  type: 'header',
  label: 'Regions'
}, {
  icon: 'flame',
  label: 'EMEA',
  items: [{
    label: 'Spain'
  }, {
    label: 'France',
    disabled: true
  }, {
    label: 'Italy'
  }, {
    label: 'United Kingdom'
  }]
}, {
  type: 'divider'
}, {
  label: 'APAC'
}];
```

## Data property interface

The `data` property of the `ef-overlay-menu` use the [OverlayMenuData](https://github.com/Refinitiv/refinitiv-ui/blob/develop/packages/elements/src/overlay-menu/helpers/types.ts) interface for its data items.

## Managing selection

`ef-overlay-menu` does not manage the selected state. Instead, the developer decides the selection model by changing the `selected` attribute on menu items. Furthermore, the developer may use the `values` getter and setter to manipulate selected items across a menu and all of its sub-menus.

::
```javascript
::overlay-menu::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
const button = document.getElementById('button');
const menu = document.getElementById('menu');
const menuController = menu.parentElement;
menu.positionTarget = button;

const getItemDescendants = (item) => {
  let descendants = [];
  while (item) {
    descendants.unshift(item);
    item = item.parentElement && item.parentElement.id
      ? menuController.querySelector('ef-item[for=' + item.parentElement.id + ']')
      : null;
    }

  return descendants;
};

menuController.addEventListener('item-trigger', (e) => {
  const selectedPath = getItemDescendants(e.target);
  menu.values = selectedPath.map((item) => {
    return item.value;
  });
});

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    menu.opened = true;
  }
});
```
```css
section {
  height: 200px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-button cta id="button" aria-haspopup="true">Choose Item</ef-button>
</section>
<ef-overlay-menu id="menu">
  <ef-item type="header">Regions</ef-item>
  <ef-item value="emea" for="emea" selected>EMEA</ef-item>
  <ef-item value="apac" for="apac">APAC</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="emea">
  <ef-item value="spain">Spain</ef-item>
  <ef-item value="france" disabled>France</ef-item>
  <ef-item value="united-kingdom" for="united-kingdom" selected>United Kingdom</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="united-kingdom">
  <ef-item value="cardiff">Cardiff</ef-item>
  <ef-item value="edinburgh">Edinburgh</ef-item>
  <ef-item value="london" selected>London</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="apac">
  <ef-item value="china">China</ef-item>
  <ef-item value="australia">Australia</ef-item>
</ef-overlay-menu>

```
::

```javascript
const menuController = menu.parentElement;

const getItemDescendants = (item) => {
  let descendants = [];
  while (item) {
    descendants.unshift(item);
    item = item.parentElement && item.parentElement.id
      ? menuController.querySelector('ef-item[for=' + item.parentElement.id + ']')
      : null;
    }

  return descendants;
};

menuController.addEventListener('item-trigger', (e) => {
  const selectedPath = getItemDescendants(e.target);
  menu.values = selectedPath.map((item) => {
    return item.value;
  });
});
```

## Overlay transitions

`ef-overlay-menu` supports a number of built-in transitions. To set the transition, use the `transition-style` attribute.

::
```javascript
::overlay-menu::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
const button = document.getElementById('button');
const menu = document.getElementById('menu');
menu.positionTarget = button;

button.addEventListener('click', () => {
  if (!menu.fullyOpened && !menu.transitioning) {
    menu.opened = true;
  }
});
```
```css
section {
  height: 200px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-button cta id="button" aria-haspopup="true">With Transitions</ef-button>
</section>
<ef-overlay-menu id="menu" transition-style="slide">
  <ef-item type="header">Regions</ef-item>
  <ef-item for="emea">EMEA</ef-item>
  <ef-item for="apac">APAC</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="emea" transition-style="slide">
  <ef-item>Spain</ef-item>
  <ef-item disabled>France</ef-item>
  <ef-item for="united-kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="united-kingdom" transition-style="slide">
  <ef-item>Cardiff</ef-item>
  <ef-item>Edinburgh</ef-item>
  <ef-item>London</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="apac" transition-style="slide">
  <ef-item>China</ef-item>
  <ef-item>Australia</ef-item>
</ef-overlay-menu>
```
::

```html
<ef-overlay-menu id="menu" transition-style="slide">
  <ef-item type="header">Regions</ef-item>
  <ef-item for="emea">EMEA</ef-item>
  <ef-item for="apac">APAC</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="emea" transition-style="slide">
  <ef-item>Spain</ef-item>
  <ef-item disabled>France</ef-item>
  <ef-item for="united-kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="united-kingdom" transition-style="slide">
  <ef-item>Cardiff</ef-item>
  <ef-item>Edinburgh</ef-item>
  <ef-item>London</ef-item>
</ef-overlay-menu>
<ef-overlay-menu id="apac" transition-style="slide">
  <ef-item>China</ef-item>
  <ef-item>Australia</ef-item>
</ef-overlay-menu>
```

## Position against target
Position may contain a single word or a comma separated list to set the priority. Position is not applied if `attachTarget` is not HTML Element. For instance:

- `[bottom-middle, top-middle]`  default position is bottom-middle, if cannot fit position top-middle.
- `[left, right]` the align is not set, set best position on the left or right.

```javascript
menu.position = ['bottom-end', 'bottom-start', 'right-end', 'center-middle'];
```
The first part defines *position*. The optional second part defines *align*. For instance: `bottom`, `top-start`, `right-middle`.

| Position | Description                                       |
| ---------| ------------------------------------------------- |
| `top`    | Above target (same as `top-start`)                |
| `right`  | After target (same as `right-middle`)             |
| `bottom` | Below target (same as `bottom-start`)             |
| `left`   | Before target (same as `left-middle`)             |
| `center` | At the center of target (same as `center-middle`) |

<br>

| Align    | Description                              |
| -------- | ---------------------------------------- |
| `start`  | Target is aligned at the start of popup  |
| `middle` | Target is aligned at the middle of popup |
| `end`    | Target is aligned at the end of popup    |

## Accessibility
::a11y-intro::

The Overlay Menu’s trigger element is assigned `role="button"` and has properties such as `aria-haspopup` and `aria-expanded`. The expanded menu has the `role="menu"` and the selectable items have `role="menuitem"`. Sub-menus can have properties such as `aria-haspopup` and `aria-expanded` to indicate to accessible users the presence of next-level menus. 

`ef-overlay-menu` has assigned with role and implemented keyboard navigation. However, you will need to assign some attributes following [ARIA menu button practices](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html#rps_label).

* Button that triggers overlay menu should be assigned `aria-haspopup="true"`
* Button that triggers overlay menu should be assigned `aria-controls` with id of `ef-overlay-menu`
* Button that triggers overlay menu should be assigned `aria-expanded="true"` when `ef-overlay-menu` is opened and `aria-expanded="false"` when it's closed
* You can use `aria-labelledby` or `aria-label` to set accessible name for `ef-overlay-menu`

```html
<ef-button
  id="button1"
  aria-haspopup="true"
  aria-controls="menu1"
  aria-expanded="false">
  Menu Sample
</ef-button>

<ef-overlay-menu id="menu1" aria-labelledby="button1">
</ef-overlay-menu>
```

If you create `ef-overlay-menu` by using `data`, the menu and its items will be assigned with aria attributes correctly following ARIA guidelines. However, if you create `ef-overlay-menu` declaratively using light DOM, you will need to follow additional guidelines below.

```html
<ef-button
  id="button1"
  aria-haspopup="true"
  aria-controls="menu1"
  aria-expanded="false">
  Menu Sample
</ef-button>

<ef-overlay-menu id="menu1" aria-labelledby="button1">
  <ef-item type="header">Section Header</ef-item>
  <ef-item role="menuitem" icon="copy" value="copy">Copy</ef-item>
  <ef-item aria-hidden="true" type="divider"></ef-item>
  <ef-item role="menuitem" icon="directory" value="directory">Directory</ef-item>
</ef-overlay-menu>
```

If sub menu has nested options, you need to set `aria-haspopup="true"` to the menu and set value to `aria-expanded` when the sub menu is opened or closed. The nested menu should be assigned `aria-labelledby` with id of its parent menu so the screen reader can read accessible name correctly.

```html
<ef-button
  id="button1"
  aria-haspopup="true"
  aria-controls="menu1"
  aria-expanded="false">
  Menu Sample
</ef-button>

<ef-overlay-menu id="menu1" aria-labelledby="button1">
  <ef-item role="menuitem" value="cmd1">Command 1</ef-item>
  <ef-item
    id="cmd2"
    role="menuitem"
    aria-haspopup="true"
    aria-expanded="false"
    for="cmd2-sub-menu">
    Command 2
  </ef-item>
</ef-overlay-menu>

<ef-overlay-menu id="cmd2-sub-menu" aria-labelledby="cmd2">
  <ef-item role="menuitem" value="cmd2_1">Command 2.1</ef-item>
  <ef-item role="menuitem" value="cmd2_2">Command 2.2</ef-item>
</ef-overlay-menu>
```

::a11y-end::

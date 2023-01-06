<!--
type: page
title: Item
location: ./elements/item
layout: default
-->

# Item

::
```javascript
::item::
```
```css
ef-item {
  width: 300px;
}
```
```html
<ef-item type="header">Menu</ef-item>
<ef-item icon="home">Home</ef-item>
<ef-item icon="directory">Contacts</ef-item>
<ef-item icon="calendar">Calendar</ef-item>
<ef-item icon="briefcase" disabled>Briefcase</ef-item>
<ef-item type="header">Advanced</ef-item>
<ef-item type="divider"></ef-item>
<ef-item icon="compass">Sneak Peeks</ef-item>
<ef-item icon="dashboard">Dashboard</ef-item>
```
::

`ef-item` is generally used as a basic building block to compose complex custom elements. Additionally it can be used by applications to create simple menus or navigation panels.

## Usage

Use `ef-item` to create an individual list item. It provides features such as types and icons to simplify building menu controls.

::
```javascript
::item::
const menu = document.getElementById("menu");
let selectedElement;
menu.addEventListener("tap", (e) => {
  const target = e.target;
  if (!target.highlightable) {
    return;
  }
  if (selectedElement) {
    selectedElement.selected = false;
  }
  selectedElement = target;
  selectedElement.selected = true;
  document.getElementById("selected").label = selectedElement.value + " is clicked!";
});
menu.addEventListener('mouseover', (event) => {
  event.target.highlighted = true;
});
menu.addEventListener('mouseout', (event) => {
  event.target.highlighted = false;
});
```
```css
#menu {
  display: flex;
  flex-direction: column;
  width: 300px;
}
#selected {
  margin: 10px 0;
}
```
```html
<div id="menu">
  <ef-item type="header">Edit</ef-item>
  <ef-item icon="undo" value="undo">Undo</ef-item>
  <ef-item icon="redo" value="redo" disabled>Redo</ef-item>
  <ef-item type="divider"></ef-item>
  <ef-item icon="cut" value="cut">Cut</ef-item>
  <ef-item icon="copy" value="copy">Copy</ef-item>
  <ef-item icon="paste" value="paste">Paste</ef-item>
</div>

<ef-item id="selected" disabled label="Try to click menu above"></ef-item>
```
::

```html
<div id="menu">
  <ef-item type="header">Edit</ef-item>
  <ef-item icon="undo" value="undo">Undo</ef-item>
  <ef-item icon="redo" value="redo" disabled>Redo</ef-item>
  <ef-item type="divider"></ef-item>
  <ef-item icon="cut" value="cut">Cut</ef-item>
  <ef-item icon="copy" value="copy">Copy</ef-item>
  <ef-item icon="paste" value="paste">Paste</ef-item>
</div>
```

`ef-item` provides styles for the focus, highlighted and selected states. However, only the focus state is managed by `ef-item` itself. The highlight and selection models should be managed by the external component by setting the `highlighted` and `selected` states, respectively.

```javascript
menu.addEventListener("tap", (e) => {
  const target = e.target;
  // skip if users click on disabled or divider
  if (!target.highlightable) {
    return;
  }
  // deselected item that currently selected
  if (selectedElement) {
    selectedElement.selected = false;
  }
  // set selected flag to clicked item
  selectedElement = target;
  selectedElement.selected = true;
});

menu.addEventListener('mouseover', (event) => {
  event.target.highlighted = true;
});

menu.addEventListener('mouseout', (event) => {
  event.target.highlighted = false;
});
```

## Using labels

`ef-item` provides `label` and `sub-label` attributes to set the label property as a simplified instance of the content.

::
```javascript
::item::
const menu = document.getElementById("menu");
menu.addEventListener('mouseover', (event) => {
  event.target.highlighted = true;
});
menu.addEventListener('mouseout', (event) => {
  event.target.highlighted = false;
});
```
```css
#menu {
  display: flex;
  flex-direction: column;
  width: 300px;
}
```
```html
<div id="menu">
  <ef-item label="Team Members" icon="directory"></ef-item>
  <ef-item label="Cornelius Martin" sub-label="Position: Software Engineer" icon="individual"></ef-item>
  <ef-item label="Angela Lloyd" sub-label="Position: Development Manager" icon="individual" ></ef-item>
</div>
```
::

```html
<div id="menu">
  <ef-item label="Team Members" icon="directory"></ef-item>
  <ef-item label="Cornelius Martin" sub-label="Position: Software Engineer" icon="individual"></ef-item>
  <ef-item label="Angela Lloyd" sub-label="Position: Development Manager" icon="individual" ></ef-item>
</div>
```

Both `label` and `sub-label` are not displayed if there is content in `ef-item`.

```html
<ef-item label="This text will not be displayed" sub-label="This text will not be displayed">
  This text will be displayed
</ef-item>
```

## Using slots

Custom content can be added using slots. `ef-item` provides bopth `left` and `right` slots.

::
```javascript
::item::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/checkbox?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('checkbox');
halo('button');
```
```css
#todo {
  display: flex;
  flex-direction: column;
  width: 550px;
  margin: 10px 0;
}

ef-button {
  margin: 0;
}

.notes {
  color: #b7b7b7;
  margin-right: 10px;
}

ef-item[focused] ef-checkbox {
  color:white;
}

ef-item[focused] .notes {
  color: white;
}
```
```html
<div id="todo">
<ef-item>
  <ef-checkbox>Carrots</ef-checkbox>
  <div class="notes" slot="right">Small bag</div>
  <ef-button toggles icon="trash" slot="right"></ef-button>
</ef-item>
<ef-item>
  <ef-checkbox>Chocolates</ef-checkbox>
  <div class="notes" slot="right">For Otis</div>
  <ef-button toggles icon="trash" slot="right"></ef-button>
</ef-item>
<ef-item>
  <ef-checkbox>Pumpkins</ef-checkbox>
  <div class="notes" slot="right">Halloween!</div>
  <ef-button toggles icon="trash" slot="right"></ef-button>
</ef-item>
</div>
```
::

```html
<ef-item>
  <ef-checkbox>Carrots</ef-checkbox>
  <div class="notes" slot="right">Small bag</div>
  <ef-button toggles icon="trash" slot="right"></ef-button>
</ef-item>
```

## Advanced usage
`ef-item` can be used to create menu elements. You should implement your own highlight and selection models.

::
```javascript
::item::
const menu = document.getElementById('menu');
let selectedEl;

// Get highlighted item
const getHighlighted = () => { menu.querySelector('ef-item[highlighted]') };

// Get all items that can be highlighted
const getHighlightableEls = () => {
  return Array.prototype.slice.call(menu.querySelectorAll('ef-item'))
    .filter((item) => item.highlightable);
};

const highlight = (el) => {
  const highlightedEl = getHighlighted();
  if (highlightedEl === el) {
    return true;
  }
  if (!el.highlightable) {
    return false;
  }

  if (highlightedEl) {
    highlightedEl.highlighted = false;
  }

  el.highlighted = true;
};

// Highlight next or previous item
const highlightNextFocusableItem = (event, dir) => {
  event.stopPropagation();
  event.preventDefault();

  const highlightableEls = getHighlightableEls();
  const highlightedEl = getHighlighted();

  if (dir === 1) {
    newHighlighted = highlightableEls[highlightableEls.indexOf(highlightedEl) + 1] || highlightableEls[0];
  }
  else if (dir === -1) {
    newHighlighted = highlightableEls[highlightableEls.indexOf(highlightedEl) - 1] || highlightableEls[highlightableEls.length - 1];
  }

  if (newHighlighted) {
    highlight(newHighlighted);
    newHighlighted.focus();
  }
};

const select = (item) => {
  if (selectedEl) {
    selectedEl.selected = false;
  }
  selectedEl = item;
  item.selected = true;
  document.getElementById('selected').innerHTML = item.value + ' is selected!';
};

menu.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Down':
    case 'ArrowDown':
    case 'Tab':
      highlightNextFocusableItem(event, 1);
      break;
    case 'Up':
    case 'ArrowUp':
      highlightNextFocusableItem(event, -1);
      break;
    case 'Enter':
      getHighlighted().focus();
      getHighlighted() && getHighlighted().click();
      break;
    default:
    // no default
  }
});

menu.addEventListener('mouseover', (event) => {
  menu.focus();
  highlight(event.target);
});

menu.addEventListener('mouseout', (event) => {
  if (event.target.highlighted) {
    event.target.highlighted = false;
  }
});

menu.addEventListener('tap', (event) => {
  if (event.target.highlightable) {
    highlight(event.target);
    select(event.target);
  }
});
```
```css
#menu {
  display: flex;
  flex-direction: column;
  width: 300px;
  outline: none;
}
#selected {
  margin: 10px 0;
}
```
```html
<div id="menu" tabindex="0">
  <ef-item type="header">EMEA</ef-item>
  <ef-item value="Spain">Spain</ef-item>
  <ef-item value="France" disabled>France</ef-item>
  <ef-item value="Italy">Italy</ef-item>
  <ef-item type="header">ASIA</ef-item>
  <ef-item type="divider"></ef-item>
  <ef-item value="Japan">Japan</ef-item>
  <ef-item value="China">China</ef-item>
</div>
<div id="selected">Try to click and use keyboard to navigate the menu</div>
```
::

```javascript
const menu = document.getElementById('menu');

// Get highlighted item
const getHighlighted = () => {
  return menu.querySelector('ef-item[highlighted]');
};

// Get all items that can be highlighted
const getHighlightableEls = () => {
  return Array.prototype.slice.call(menu.querySelectorAll('ef-item'))
    .filter((item) => item.highlightable);
};

menu.addEventListener('keydown', (event) => {
  // Implement keyboard navigation model
});

menu.addEventListener('mouseover', (event) => {
  // Implement highlight model
});

menu.addEventListener('mouseout', (event) => {
  // Implement remove highlight model
});

menu.addEventListener('tap', (event) => {
  // Implement selection model
});
```

## Accessibility
::a11y-intro::

`ef-item` is a low-level element that's typically used to create other elements such as `ef-list`and `ef-tree`. Hence, `ef-item` will not be assigned any roles by default but only provide `aria-selected` and `aria-checked` attributes which will reflect its current selected state.

For example, if you don't want to use `ef-list` and want to create a list element, you can assign your parent element with `role="listbox"` and each `ef-item` with `role="option"`.

```html
<div role="listbox">
  <ef-item role="option">Item A</ef-item>
  <ef-item role="option">Item B</ef-item>
  <ef-item role="option">Item C</ef-item>
</div>
```



::a11y-end::

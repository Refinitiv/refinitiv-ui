<!--
type: page
title: Icon
location: ./elements/icon
layout: default
-->

# Icon

::
```javascript
::icon::
````
```css
ef-icon {
  font-size: 24px;
}
```
```html
<ef-icon icon="tick"></ef-icon>
<ef-icon icon="search"></ef-icon>
<ef-icon icon="word"></ef-icon>
<ef-icon icon="excel"></ef-icon>
<ef-icon icon="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/buzz.svg"></ef-icon>
<ef-icon icon="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/chart-area.svg"></ef-icon>
```
::

Icons are provided as part of a theme. Icons also support pointing to urls of svg files. The size and coloring of icons can be changed using standard CSS.

## Usage
You can set an icon's name using the `icon` attribute. See list of icons in [Icon List](./elements/icon#icon-list). Alternatively, you can set the url of an svg file or relative path to your svg file.

```html
<ef-icon icon="tick"></ef-icon>
<ef-icon icon="search"></ef-icon>
<ef-icon icon="save"></ef-icon>
<ef-icon icon="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/filter.svg"></ef-icon>
<ef-icon icon="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg"></ef-icon>
<ef-icon icon="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/help.svg"></ef-icon>
```


## Changing size and color
The size and color of an icon can be changed using standard CSS styling.

```css
[icon=flag-2].small {
  color: #309054;
  font-size: 12px;
}
[icon=flag-2].medium {
  color: #309054;
  font-size: 16px;
}
[icon=flag-2].large {
  color: #309054;
  font-size: 24px;
}
```
```html
<ef-icon class="small" icon="flag-2"></ef-icon>
<ef-icon class="medium" icon="flag-2"></ef-icon>
<ef-icon class="large" icon="flag-2"></ef-icon>
```

## Preloading
`ef-icon` has a helper function to preload a set of icons. Icons can be loaded faster if you have a known set of icons for use in the app.

Preloading icons will be deferred until the first `ef-icon` component is created.

```javascript
import { preload } from '@refinitiv-ui/elements/icon';

// preload function supports both icon name or svg location, either single icon or multiple.
preload('eye');
preload('https://cdn.io/eye.svg');
preload('eye', 'heart', 'like', 'arrow-up');
preload(
  'https://cdn.io/eye.svg',
  'https://cdn.io/heart.svg',
  'https://cdn.io/like.svg',
  'https://cdn.io/arrow-up.svg'
);
```

## Accessibility
::a11y-intro::

`ef-icon` delegates focus into its internal svg which has native `role="image"`. Assistive technology users ascertain the purpose of the icon via its accessible name.

Typically, icon may not be tabbable or focusable. However, if it's required, you can set `tabindex` and use `aria-label` or `title` to add its accessible name.

```html
<ef-icon icon="pdf" tabindex="0" aria-label="PDF Icon"></ef-icon>
<ef-icon icon="pdf" tabindex="0" title="PDF Icon"></ef-icon>
```

::a11y-end::

## Icon list

Below is a list of available icons in the Halo theme. You can use them with the `ef-icon` or with elements that provide the `icon` attribute/property e.g. `ef-button`.

::
```css
.item {
  width: 58px;
  text-align: center;
  padding: 7px;
}
.item:hover {
  outline: 1px solid #dddfe4;
}
.icon-name {
  padding-top: 5px;
  font-size: 14px;
  overflow-wrap: break-word;
}
#content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 2px;
}
.no-content {
  justify-content: center;
  align-items: center;
  color: #8a8a96;
  background-color: #fdfdfd;
}
ef-icon {
  font-size: 26px;
}
#loader-content {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
}
#loader-content .item {
  height: 73px;
  width: 73px;
  margin: 3px;
  background-color: #f3f3f3;
}
```
```html
<div id="loader-content"></div>
<div id="content"></div>
```
```javascript
::icon::

const ICON_URL = 'https://cdn.refinitiv.com/public/libs/elf/info.json';
const content = document.getElementById('content');
const theme = 'halo';

const displayIcons = data => {
  let iconList = [];

  if (data) {
    if (!data || !data[theme] || !data[theme].icon || !data[theme].icon.length) {
      content.classList.add('no-content');
      content.innerHTML = 'No icon to display';
    }
    else {
      iconList = data[theme].icon;
    }
  }

  for (let i = 0; i < iconList.length; i += 1) {
    const name = iconList[i].name;
    const item = document.createElement('div');
    item.classList.add('item');

    const icon = document.createElement('ef-icon');
    icon.setAttribute('icon', name);

    const iconName = document.createElement('div');
    iconName.classList.add('icon-name');
    iconName.textContent = name;

    item.appendChild(icon);
    item.appendChild(iconName);

    content.appendChild(item);
  }

  const loader = document.getElementById('loader-content');
  loader.parentNode.removeChild(loader);
}

const displayLoader = () => {
  const loader = document.getElementById('loader-content');
  for (let i = 0; i < 54; i += 1) {
    const item = document.createElement('div');
    item.classList.add('item');
    loader.appendChild(item);
  }
}

displayLoader();

await fetch(ICON_URL)
  .then(response => response.json())
  .then(data => displayIcons(data));
```
::

# Overlay Menu

```live(preview)
<style>
section {
  height: 235px;
  padding: 0 3px;
}
</style>
<section>
    <ef-button cta id="button">Choose Item</ef-button>
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
<script>
  var button = document.getElementById('button');
  var menu = document.getElementById('menu');
  menu.positionTarget = button;
  
  button.addEventListener('click', function() {
    if (!menu.fullyOpened && !menu.transitioning) {
      menu.opened = true;
    }
  });
</script>
```

`ef-overlay-menu` is an overlay window that supports single-level and multi-level menus. It can be positioned by attaching to other elements, or its vertical and horizontal offset can be adjusted if needed.

## Basic Menu
Create `ef-overlay-menu` with `ef-item` elements as menu items. Listen for `item-trigger` event to identify the clicked item.

As the overlay menu is designed to support several use cases, multi-selection, toggle, etc, the menu will not close when an item is clicked. To open or close the menu, simply set `opened` property to true or false respectively.

```live
<style>
section {
  height: 135px;
  padding: 0 3px;
}
</style>
<section>
    <ef-button cta id="button">Choose Item</ef-button>
</section>
<ef-overlay-menu id="menu">
  <ef-item type="header">EMEA</ef-item>
  <ef-item value="Spain">Spain</ef-item>
  <ef-item value="France" disabled>France</ef-item>
  <ef-item value="United Kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
<script>
  var button = document.getElementById('button');
  var menu = document.getElementById('menu');
  var menuController = menu.parentElement;
  menu.positionTarget = button;
    
  button.addEventListener('click', function() {
    if (!menu.fullyOpened && !menu.transitioning) {
      menu.opened = true;
    }
  });

  menuController.addEventListener('item-trigger', function(e) {
    var value = e.detail.value;
    console.log('You have clicked on: ' + value);
    button.innerHTML = value;
    menu.opened = false;
  });
</script>
```

```html
<ef-button cta id="button">Choose Item</ef-button>
<ef-overlay-menu id="menu">
  <ef-item type="header">EMEA</ef-item>
  <ef-item value="Spain">Spain</ef-item>
  <ef-item value="France" disabled>France</ef-item>
  <ef-item value="United Kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
```

```javascript
var button = document.getElementById('button');
var menu = document.getElementById('menu');
var menuController = menu.parentElement;
menu.positionTarget = button;
    
button.addEventListener('click', function() {
  if (!menu.fullyOpened && !menu.transitioning) {
    menu.opened = true;
  }
});
  
menuController.addEventListener('item-trigger', function(e) {
  var value = e.detail.value;
  console.log('You have clicked on: ' + value);
  button.innerHTML = value;
  menu.opened = false;
});
```

> See Item API document for more detail about `ef-item` properties


### Nested menus

Menu and sub-menus are bound together using `for` and `id` attributes of `ef-item` and sub-menu respectively. `for` must be equal to the `id` attribute of the related sub-menu to bind them together.

```live
<style>
section {
  height: 225px;
  padding: 0 3px;
}
</style>
<section>
    <ef-button cta id="button">Nested menus</ef-button>
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
<script>
  var button = document.getElementById('button');
  var menu = document.getElementById('menu');
  menu.positionTarget = button;
    
  button.addEventListener('click', function() {
    if (!menu.fullyOpened && !menu.transitioning) {
      menu.opened = true;
    }
  });
</script>
```

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

### Compact menu
If there is not enough space for sub-menus add `compact`. In this mode sub-menus will be opened on top of parent menu.

```live
<style>
section {
  height: 135px;
  padding: 0 3px;
}
</style>
<section>
    <ef-button cta id="button">Compact menu</ef-button>
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
<script>
  var button = document.getElementById('button');
  var menu = document.getElementById('menu');
  menu.positionTarget = button;
    
  button.addEventListener('click', function() {
    if (!menu.fullyOpened && !menu.transitioning) {
      menu.opened = true;
    }
  });
</script>
```

```html
<ef-overlay-menu compact>
  ...
</ef-overlay-menu>
```

## Managing position and user interaction

`ef-overlay-menu` inherits properties from `ef-overlay` and thus supports the same positioning strategies.

The developer may specify `with-backdrop` together with `no-cancel-on-outside-click` so users must interact with the menu before they can return to the application.

```live
<style>
section {
  height: 115px;
  padding: 0 3px;
}
</style>
<section>
    <ef-button cta id="button">Choose Item</ef-button>
</section>
<ef-overlay-menu id="menu" with-backdrop no-cancel-on-outside-click>
  <ef-item type="header">EMEA</ef-item>
  <ef-item value="Spain">Spain</ef-item>
  <ef-item value="France" disabled>France</ef-item>
  <ef-item value="United Kingdom">United Kingdom</ef-item>
</ef-overlay-menu>
<script>
  var button = document.getElementById('button');
  var menu = document.getElementById('menu');
  var menuController = menu.parentElement;
  
  button.addEventListener('click', function() {
    if (!menu.fullyOpened && !menu.transitioning) {
      // position at the top right corner of the button
      menu.positionTarget = button;
      menu.position = ['right-start'];
      menu.opened = true;
    }
  });
  
  menuController.addEventListener('item-trigger', function(e) {
    menu.opened = false;
  });
</script>
```

```html
<ef-button cta id="button">Choose Item</ef-button>
<ef-overlay-menu id="menu" with-backdrop no-cancel-on-outside-click>...</ef-overlay-menu>
```

```javascript
var button = document.getElementById('button');
var menu = document.getElementById('menu');
  
button.addEventListener('click', function() {
  if (!menu.fullyOpened && !menu.transitioning) {
    // position at the top right corner of the button
    menu.positionTarget = button;
    menu.position = ['right-start'];
    menu.opened = true;
  }
});
```

## Loading from data

`ef-overlay-menu` can be populated using `data` property. `data` fields have the same names as properties in `ef-item`. Use `items` collection to create sub-menus.

In addition, you can set `data` using a [CollectionComposer](https://elf.int.refinitiv.com/more-resources/collection-composer.html). It is useful when you need rich API to manage data externally.

```live
<style>
section {
  height: 165px;
  padding: 0 3px;
}
</style>
<section>
    <ef-button cta id="button">Choose Item</ef-button>
</section>
<ef-overlay-menu id="menu"></ef-overlay-menu>
<script>
  var button = document.getElementById('button');
  var menu = document.getElementById('menu');
  
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
  
  button.addEventListener('click', function() {
    if (!menu.fullyOpened && !menu.transitioning) {
      menu.opened = true;
    }
  });
</script>
```

```html
<ef-overlay-menu id="menu"></ef-overlay-menu>
```

```javascript
var menu = document.getElementById('menu');
  
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

## Managing selection

`ef-overlay-menu` does not manage selected state. Instead a developer decides the selection model by changing `selected` attribute on menu items. Furthermore the developer may use `values` getter and setter to manipulate selected items across menu and all its sub-menus.

```live
<style>
section {
  height: 200px;
  padding: 0 3px;
}
</style>
<section>
    <ef-button cta id="button">Choose Item</ef-button>
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

<script>
  var button = document.getElementById('button');
  var menu = document.getElementById('menu');
  var menuController = menu.parentElement;
  menu.positionTarget = button;
  
  var getItemDescendants = function (item) {
    var descendants = [];
    while (item) {
      descendants.unshift(item);
      item = item.parentElement && item.parentElement.id
        ? menuController.querySelector('ef-item[for=' + item.parentElement.id + ']')
        : null;
      }

    return descendants;
  };
  
  menuController.addEventListener('item-trigger', function (e) {
    var selectedPath = getItemDescendants(e.target);
    menu.values = selectedPath.map(function (item) {
      return item.value;
    });
  });
  
  button.addEventListener('click', function() {
    if (!menu.fullyOpened && !menu.transitioning) {
      menu.opened = true;
    }
  });
</script>
```

```javascript
var menuController = menu.parentElement;

var getItemDescendants = function (item) {
  var descendants = [];
  while (item) {
    descendants.unshift(item);
    item = item.parentElement && item.parentElement.id
      ? menuController.querySelector('ef-item[for=' + item.parentElement.id + ']')
      : null;
    }

  return descendants;
};
  
menuController.addEventListener('item-trigger', function(e) {
  var selectedPath = getItemDescendants(e.target);
  menu.values = selectedPath.map(function (item) {
    return item.value;
  });
});
```

## Overlay Transitions

`ef-overlay-menu` supports a number of built-in transitions. To set the transition, use `transition-style` attribute. 

```live
<style>
section {
  height: 200px;
  padding: 0 3px;
}
</style>
<section>
  <ef-button cta id="button">With Transitions</ef-button>
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
<script>
  var button = document.getElementById('button');
  var menu = document.getElementById('menu');
  menu.positionTarget = button;
    
  button.addEventListener('click', function() {
    if (!menu.fullyOpened && !menu.transitioning) {
      menu.opened = true;
    }
  });
</script>
```

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

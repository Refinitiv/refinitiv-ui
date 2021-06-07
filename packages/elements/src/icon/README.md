# Icon

```live(preview)
<ef-icon icon="tick"></ef-icon>
<ef-icon icon="search"></ef-icon>
<ef-icon icon="word"></ef-icon>
<ef-icon icon="excel"></ef-icon>
<ef-icon id="powerpoint" src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/buzz.svg"></ef-icon>
<ef-icon id="pdf" src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/chart-area.svg"></ef-icon>
```

Icons are provided as part of a theme. Icons also support urls of svg files. The size and coloring of icons can be changed by using standard CSS.

### Basic usage
You can set an icon's name using the `ef-icon` attribute. Alternatively, you can set the url of an svg icon file using the `src` attribute.

>The list of available icons can be accessed on the [Icon Page](../styles/icons.html).


```live
<ef-icon icon="tick"></ef-icon>
<ef-icon icon="search"></ef-icon>
<ef-icon icon="save"></ef-icon>

<ef-icon id="filter" src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/filter.svg"></ef-icon>
<ef-icon id="favorites" src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg"></ef-icon>
<ef-icon id="help" src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/help.svg"></ef-icon>
```


```html
<ef-icon icon="tick"></ef-icon>
<ef-icon icon="search"></ef-icon>
<ef-icon icon="save"></ef-icon>

<ef-icon id="filter" src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/filter.svg"></ef-icon>
<ef-icon id="favorites" src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/favorites.svg"></ef-icon>
<ef-icon id="help" src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/icons/help.svg"></ef-icon>
```


### Changing size and color
The size and color of an icon can be changed by using standard CSS style.

```live
<style>
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
</style>
<ef-icon class="small" icon="flag-2"></ef-icon>
<ef-icon class="medium" icon="flag-2"></ef-icon>
<ef-icon class="large" icon="flag-2"></ef-icon>
```

```css
<style>
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
</style>
```
```html
<ef-icon class="small" icon="flag-2"></ef-icon>
<ef-icon class="medium" icon="flag-2"></ef-icon>
<ef-icon class="large" icon="flag-2"></ef-icon>
```

### Icon preloading
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

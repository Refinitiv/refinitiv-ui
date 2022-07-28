<!--
type: page
title: Grid
location: ./elements/grid
layout: default
-->

@> Plugins are components that built with Element Framework by **Developer Community**. This component is built and maintained by dedicate team who is specialised on Grid.
@> Contact [Grid Support](mailto:grid-support@lseg.com) for helps and supports.

# Grid

EFX Grid provides simple ways to display and manipulate data in table layout. All HTML native properties and events are available in EFX Grid.

## Installation
EFX Grid element and extensions are published under single package.

```bash
npm install @refinitiv-ui/efx-grid
```

The element is required theme to instantiate itself in the app. Refinitiv's design system is called Halo theme and you can install it from npm command.

```bash
npm install @refinitiv-ui/halo-theme
```

## Documentation
See list of APIs, demo and more usage guide by visiting [EFX Grid document](https://refinitiv.github.io/efx-grid)

## Usage
Import EFX Grid and its themes into your application. To follow Refinitiv design system, it is required styles of some native elements e.g. typography.

```javascript
// import element and its Halo dark theme
import '@refinitiv-ui/efx-grid';
import '@refinitiv-ui/efx-grid/themes/halo/dark';

// import native styles for typography, css variables, etc.
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
```

Now the EFX Grid can be easily created by just writing the tag and setting the configuration as shown below:

```html
<body>
    <efx-grid></efx-grid>

    <script>
        var grid = document.getElementsByTagName("efx-grid")[0];
        grid.config = {
            /* See the document for all available options */
        };
    </script>
</body>
```

## License
You can check out the full license [here](https://refinitiv.github.io/efx-grid/book/en/license.html)



# Element Framework

Element Framework (EF) is a collection of elements that includes theming capability within the Refinitiv's design system. The elements are a set of web components which is a standard web technology and can be utilized across all browsers.

## Usage

EF elements are published under single package.

```sh
npm install @refinitiv-ui/elements
```

The elements are required theme to instantiate itself in the app. Refinitiv's design system is called Halo theme and you can install it from npm command.

```sh
npm install @refinitiv-ui/halo-theme
```

Finally, import both elements that you want to use and its themes into your application and it is ready to go. To follow Refinitiv design system, it is required styles of some native elements e.g. typography.

<br>

>The font "Proxima Nova Fin" shall only be used within Refinitiv products or services. The copyright owner must approve any use of such font outside of Refinitiv products or services, which may be subject to a fee. Please see https://www.fontspring.com/lic/fontspring/webfont#license_text

<br>

```javascript
// import native styles for typography, css variables, etc.
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';

// import element and its Halo dark theme
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
```

Now, you can use the elements in your app.

```css
.content {
    width:100%;
    height: 500px;
}
```

```html
<ef-panel class="content" spacing>
    <h2>Hello EF!</h2>
    <ef-button cta>OK</ef-button>
</ef-panel>
```

## Command Overview

| Command | Target | Description | Example |
| --- |:--- | --- | --- |
| npm start | `<element>` | Build and serve an element. | npm start button |
| npm run test  | `<element>` &#124; `all` | Run unit tests. | npm run test button |
| npm run test:watch  | `<element>` | Run test server. | npm run test:watch button |
| npm run test:snapshots  | `<element>` &#124; `all` | Update and prune snapshots.  | npm run test:watch button |
| npm run lint  | `<element>` &#124; `all` | Run linting tools.  | npm run lint button |
| npm run lint:fix  | `<element>` &#124; `all` | Fix linting errors. | npm run lint:fix button |

# Documentation

See list of elements, demo and more tutorial by visiting [EF Documentation](https://cdn.ppe.refinitiv.com/public/apps/elf-docs/book/en/index.html).

# License
Apache License 2.0. However, Halo theme shall only be used within Refinitiv products or services due to license of the font "Proxima Nova Fin".

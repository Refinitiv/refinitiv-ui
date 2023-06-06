<!--
type: page
title: Configuration
location: ./elements/configuration
layout: default
-->

# Configuration
`ef-configuration` is a provider container utility element that can be used to apply special contexts to any EF components in its scope.

## Usage

Install the configuration element in your project.

```bash
npm install @refinitiv-ui/configuration
```

Import it to your project.

```javascript
import '@refinitiv-ui/configuration';
```

Set context to `ef-configuration` via `config` property. Any EF components in its scope will receive the context and use it accordingly.

```html
<ef-configuration id="custom-config">
  <ef-button icon="tick"><ef-button>
</ef-configuration>

<!-- ef-button below will not receive the context -->
<ef-button icon="tick"></ef-button>
```

```javascript
const customConfig = document.getElementById('custom-config');
customConfig.config = {
  icon: {
    map: {
      "tick": 'data:image/svg+xml;base64,PHN2ZyB...'
    }
  }
}
```

@>Note that context is also cascaded to any EF components within shadow root. For instance, `config.icon.map` will be cascaded to `ef-icon` in shadow root of `ef-button`.

## Context List
List of context that can be set to `ef-configuration` via `config` property.

### Icon Mapping Context
`ef-icon` element supports the icon map from the configuration. You either define new icon or override data of the existing EF icons on CDN. Value of icon map should be base64 SVG format.

When `ef-icon` received SVG data of the icon, it will not request SVG icon file from the CDN.

::
```javascript
  import 'https://cdn.skypack.dev/@refinitiv-ui/elements/configuration?min';
::icon::
```
```html
<ef-configuration id="config">
  <ef-icon icon="tick"></ef-icon>
</ef-configuration>
```
```javascript
  const configEl = document.getElementById('config');
  configEl.config = {
    icon: {
      map: {
        "tick": 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik0xNCA0bC04LjI1IDguMjVMMiA4LjUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==',
      }
    }
  }
```
::

```html
<ef-configuration id="config">
  <ef-icon icon="tick"></ef-icon>
</ef-configuration>
```
```javascript
  const configEl = document.getElementById('config');
  configEl.config = {
    icon: {
      map: {
        "tick": 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik0xNCA0bC04LjI1IDguMjVMMiA4LjUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==',
      }
    }
  }
```

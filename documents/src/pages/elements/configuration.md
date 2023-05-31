<!--
type: page
title: Configuration
location: ./elements/configuration
layout: default
-->

# Configuration
`ef-configuration` is a provider container that can provide a default configuration that consumes by elements.

## Usage
You can wrap any elements with `ef-configuration`. Even though shadow dom or nested elements, it will definitely detect it.

### Icon
The icon element supports the icon map from the configuration. You either custom icon map for the new icon or even override the existing icon. Icon map now supports Base64 SVG format.

::
```javascript
  import 'https://cdn.skypack.dev/@refinitiv-ui/elements/configuration?min';
::icon::
```
```html
<ef-configuration id="config">
  <ef-icon icon="tick-base64"></ef-icon>
</ef-configuration>
```
```javascript
  const config = document.getElementById('config');
  config.icon = { map: { 
    "tick-base64": 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik0xNCA0bC04LjI1IDguMjVMMiA4LjUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==',
  }}
```
::

Using icon as a slotted

```html
<ef-configuration>
  <ef-icon icon="tick-base64"></ef-icon>
</ef-configuration>
```
```javascript
  const config = document.getElementById('config');
  config.icon = { map: { 
    "tick-base64": 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik0xNCA0bC04LjI1IDguMjVMMiA4LjUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==',
  }}
```

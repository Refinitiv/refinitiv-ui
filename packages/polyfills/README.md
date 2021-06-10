# Element Framework Polyfills

There are two ways to use polfyills :-

1. Import everything. This is ideal for an application that does not have babel-presets or other tools to take care of the polyfills or core-js manually installed.

```js
import '@refinitiv-ui/polyfills';
// Custom elements polyfills + JavaScript polyfills (core-js)
```

2. Import only minimal set. This is most suitable for the application with JavaScript frameworks such as Angular or Vue which can be configured to automatically polyfill only used syntax.

```js
import '@refinitiv-ui/polyfills/minimal';
// Only custom elements polyfills
```

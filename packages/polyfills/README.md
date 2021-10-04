# Element Framework Polyfills

A curated set of polyfills by Element Framework team. It allows web components support on legacy browsers such as IE11 or old version of other browsers, which do not support ES6 or Web Components.

## Usage

There are two ways to use polyfills:

1. (Recommended) Minimal set. This is most suitable for the application with JavaScript frameworks such as Angular or Vue, which can be configured to automatically polyfill using Babel.

```javascript
// import polyfills for web components
import '@refinitiv-ui/polyfills/minimal';
```

2. Extended set. This is ideal for an application that neither use Babel nor core-js polyfills. Any extra polyfills that are required for the application can be imported alongside with these polyfills.

```javascript
// import polyfills for web components and polyfills for es6 that required for EF elements (using core-js)
import '@refinitiv-ui/polyfills';
```

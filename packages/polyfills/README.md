# Element Framework Polyfills

A curated set of polyfills by Element Framework team. It allows web components support on legacy browsers such as IE11 or old version of other browsers which are not supporting ES6 and web components.

## Usage

There are two ways to use polyfills :-

1. (Recommended) Minimal set. This is most suitable for the application with JavaScript frameworks such as Angular or Vue which can be configured to automatically polyfill using Babel.

```js
// import polyfills for web components
import '@refinitiv-ui/polyfills/minimal';
```

2. Extended set. This is ideal for an application that neither use Babel or core-js polyfills. Any extra polyfills that requires for the application can be imported along side with this polyfills.

```js
// import polyfills for web components and polyfills for es6 that required for EF elements (using core-js)
import '@refinitiv-ui/polyfills';
```

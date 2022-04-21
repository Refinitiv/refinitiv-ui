<!--
type: page
title: Browser Support
location: ./start/browser-support
layout: default
-->

# Browser Support
EF elements are built as web components and are natively supported in Chrome, Firefox, Chromium Edge and Safari (including iOS). For browsers without native support, a small polyfill can be applied with little performance overhead.

CSS styles of elements are prefixed to work across browsers. The elements are published with ES2015 syntax which is already supported in all modern browsers. You will need to transpile to ES5, only if you need to support IE11.

<table>
<tbody><tr>
<td align="center"><img src="/resources/images/chrome.png"></img></td>
<td align="center"><img src="/resources/images/safari.png"></img></td>
<td align="center"><img src="/resources/images/firefox.png"></img></td>
<td align="center"><img src="/resources/images/edge.png"></img></td>
<td align="center"><img src="/resources/images/electron.png"></img></td>
<td align="center"><img src="/resources/images/ie.png"></img></td>
</tr>
<tr>
<td align="center">Chrome 61+</td>
<td align="center">Safari 11+</td>
<td align="center">Firefox 63+</td>
<td align="center">Edge 79+</td>
<td align="center">Electron</td>
<td align="center">IE11*</td>
</tr></tbody>
</table>
<small>* Requires polyfills</small>

## IE Support
In order for EF elements to work on Internet Explorer 11 or browsers that do not support web components natively, a few polyfills are required. EF provides a minimal set of polyfills.

Install polyfills that are curated by EF.

```bash
npm install @refinitiv-ui/polyfills
```

To use the minimal polyfills in your application, ensure that the polyfills are loaded before any EF elements.

```js
import '@refinitiv-ui/polyfills/minimal';
```

When using EF elements without modern Javascript frameworks, polyfills for ES2015 features may not be automatically added by the framework. In that case, you will need more polyfills.

A more comprehensive set of polyfills can be added.

```js
import '@refinitiv-ui/polyfills';
```

### Transpilation
EF elements use features of ES2015 which modern browsers support natively, without having to transpile down to ES5.

However, in order for EF elements to work on Internet Explorer 11, they have to be transpiled using [Babel](https://babeljs.io/). Modern frameworks commonly use Webpack, which provides a Babel loader for transpiling code.

::footer::

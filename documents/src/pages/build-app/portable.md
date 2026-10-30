<!--
type: page
title: Portable
location: ./guides/portable
layout: default
-->

# Portable Theme

Portable theme provides the same native element styles as plain CSS files, made for Shadow DOM. Importing them does nothing by itself, so you decide exactly which shadow root they apply to and the page outside your component is not affected.

---

## Files

Every theme variant contains a `portable` folder, for example `@refinitiv-ui/halo-theme/dark/portable`.

| File      | Description                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| host.css  | Theme variables, base font and text colour. Written for `:host`, so they apply to your component instead of `html` and `body`. |
| theme.css | Styles of all other native elements: `a`, `button`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `header`, `hr`, `input`, `kbd`, `mark`, `ol`, `p`, `select`, `table`, `textarea` and `ul`. |
| fonts.css | Theme fonts. Load once on the page, because browsers do not load fonts declared inside a shadow root.                         |

Always use `host.css` and `theme.css` together. `theme.css` relies on the theme variables defined in `host.css`.

## Usage

Load `host.css` and `theme.css` as text and add them to your component's shadow root. The example below uses Vite and Lit. Vite's `?inline` suffix imports a CSS file as a string, and Lit's `unsafeCSS` turns it into component styles. Other bundlers and frameworks need their own way to do the same.

```javascript
import { LitElement, html, unsafeCSS } from 'lit';
import host from '@refinitiv-ui/halo-theme/dark/portable/host.css?inline';
import theme from '@refinitiv-ui/halo-theme/dark/portable/theme.css?inline';

class MyWidget extends LitElement {
  static styles = [unsafeCSS(host), unsafeCSS(theme)];

  render() {
    return html`<h1>Title</h1><button>OK</button>`;
  }
}

customElements.define('my-widget', MyWidget);
```

Fonts do not load inside a shadow root, so add `fonts.css` to the document instead. It only declares fonts and does not style the page. Import it once, either in the module that defines your component or directly in the document:

```javascript
import '@refinitiv-ui/halo-theme/dark/portable/fonts.css';
```

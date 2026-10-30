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
| theme.css | Theme fonts and styles of all other native elements, such as `a`, `button`, `h1` - `h6`, `input`, `select` and `table`.        |

Always use both files together. `theme.css` relies on the theme variables defined in `host.css`.

## Usage

Import the files as text with Vite `?inline`, then add them to your Lit component styles.

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

!> Always import with `?inline`. A plain import, e.g. `import '.../portable/theme.css'`, injects the styles into the document and they will leak to the page.

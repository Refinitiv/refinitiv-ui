<!--
title: Tutorial - Creating an element
location: ./tutorial
type: page
layout: default
-->

::status-todo::

# Element Tutorial

This tutorial will help you get up to speed with the Element Framework and see just how easy it is to build your first element.

Each step of the tutorial will guide you on how to build up your new element into a fully usable web component. It will cover many of the different element types and show you how to correctly configure your element.

In this tutorial we'll look to build a todo list, called `efx-todo`.


## Creating a Basic Element

### Defining an element

To define an element, we first need to create a class which extends from one of the [base element classes](./element-types).

We use the `customElement` decorator to register the element in the document, setting theme to false for now.

Custom element names must contain at least one hyphen (`-`). This differentiates the element with any inbuilt elements in the browser.

Custom elements built using Element Framework should be prefixed with `efx-`, especially if available publicly.

```ts
import {
  BasicElement,
  customElement
} from '@refinitiv-ui/elements';

@customElement('efx-todo', { theme: false })
export class TodoElement extends BasicElement { ... }
```

Registering the name `efx-todo` now means that we can use this custom HTML Element in our application, although nothing will show just yet.

```html
<efx-todo></efx-todo>
```

For more information on defining, see [Lit](https://lit.dev/docs/components/defining/).

### Rendering

Add a template to your element to define how it should render. Templates are created using template literals and can include _expressions_, which are placeholders for dynamic content.

To add a template to your element, add a `render()` method.

```ts
import {
  html,
  BasicElement,
  customElement
} from '@refinitiv-ui/elements';

@customElement('efx-todo', { theme: false })
export class TodoElement extends BasicElement {
  protected render () {
    return html`<p>Hello!<p>`;
  }
}
```

For more information on rendering, see [Lit](https://lit.dev/docs/components/rendering/).

### Composing Templates

You can compose templates by splitting the template into sections and compose the final template in the render method.

```ts
export class TodoElement extends BasicElement {
  protected get headerTemplate () {
    return html`<header>Tutorial</header>`;
  }
  protected get contentTemplate () {
    return html`<main>Hello!</main>`;
  }
  protected get footerTemplate () {
    return html`<footer><a href="/help">Get help</a></footer>`;
  }
  protected render () {
    return html`
      ${this.headerTemplate}
      ${this.contentTemplate}
      ${this.footerTemplate}
    `;
  }
}
```

For more information on composing templates, see [Lit](https://lit.dev/docs/components/rendering/#composing-templates).

### Reactive Properties

### Styles & Theming

### Lifecycle

## Creating a Control Element

### Handling Focus

### Keyboard Navigation
<!--
title: Tutorial - Creating an element
location: ./custom-components/tutorial
type: page
layout: default
-->


# Element Tutorial

This tutorial will help you get up to speed with the Element Framework and see just how easy it is to build your first element.

Each step of the tutorial will guide you on how to build up your new element into a fully usable web component. It will cover many of the different element types and show you how to correctly configure your element.

In this tutorial we'll look to build a todo list, called `efx-todo`.


## Creating a Basic Element

### Defining an element

To define an element, we first need to create a class which extends from one of the [base element classes](./custom-components/element-types).

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
  customElement,
  TemplateResult
} from '@refinitiv-ui/elements';

@customElement('efx-todo', { theme: false })
export class TodoElement extends BasicElement {
  protected render (): TemplateResult {
    return html`<p>Hello!<p>`;
  }
}
```

For more information on rendering, see [Lit](https://lit.dev/docs/components/rendering/).

### Composing Templates

You can compose templates by splitting the template into sections and compose the final template in the render method.

```ts
export class TodoElement extends BasicElement {
  protected get headerTemplate (): TemplateResult {
    return html`<header>Tutorial</header>`;
  }
  protected get contentTemplate (): TemplateResult {
    return html`<main>Hello!</main>`;
  }
  protected get footerTemplate (): TemplateResult {
    return html`<footer><a href="/help">Get help</a></footer>`;
  }
  protected render (): TemplateResult {
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

Reactive properties can trigger an update cycle and re-render the component when it changes. Use `@property` decorator with type and options to define the property.

```ts
export class TodoElement extends BasicElement {
  @property({ type: String })
  name: String;
}
```

Usually, reactive property defines as public by default. In Typescript, these should assign `private` or `protected` to specify the type scoped in the component. To define an internal property that can trigger reactive update cycle use `@state` decorator.

```ts
export class TodoElement extends BasicElement {
  @state({ type: Array })
  protected data: String[] = [];
}
```

For more information on reactive properties, see [Lit](https://lit.dev/docs/components/properties/).

### Attributes

While properties usage works on Javascript, attributes configure the element in HTML. Whether the property or the attribute has changed, it will trigger update cycle. By default, the attribute observed to reactive property and labeled in lowercase.

```ts
export class TodoElement extends BasicElement {
  // Observed attribute will be called header-link 
  @property({ attribute: 'header-link' })
  headerLink = 'https://lit.dev/docs/components/properties/';

  // Set false to disable observed attribute 
  @property({ attribute: false })
  footerLink = 'https://lit.dev/docs/components/properties/#attributes';
}
```

### Styles

Defining styles are automatically scoped on Shadow root. All the styles can apply only in the element and use `:host` selector to style the element itself.

```ts
export class TodoElement extends BasicElement {
  static get styles (): CSSResult {
    return css`
      :host {
        display: inline-block;
      }
      header, footer {
        background-color: blue;
      }
    `;
  }
}
```

For more information on attributes, see [Lit](https://lit.dev/docs/components/styles/).

### Lifecycle

The reactive update cycle is triggered when the properties have changed. The life cycle provided many hooks that can categorize into Pre-Update, Update, and Post-Update. Example usage in update hook provides a map of changed properties named `changedProperties`. It can use to know which property has been changed.

```ts
export class TodoElement extends BasicElement {
  // willUpdate triggers during update
  protected willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    /* has method used to identify whether the property has changed or not.
     * this[property] is current value.
     */
    if (changedProperties.has('data') && this.data.length > 0) {
      // do something
    }
  }
}
```

For more information on life cycle, see [Lit](https://lit.dev/docs/components/lifecycle).

## Creating a Control Element

@> Coming soon!

### Handling Focus

@> Coming soon!

### Keyboard Navigation

@> Coming soon!

# Element Framework Translate

`@refinitiv-ui/translate` is a decorator to enable translations for Element Framework components.

It is used in conjunction with `@refinitiv-ui/phrasebook` and `@refinitiv-ui/i18n`.

## Usage

`@refinitiv-ui/translate` is designed for Element Framework v5 and Lit Element.

```cli
npm install @refinitiv-ui/translate
```

A typical element configuration may look as follows.

```ts
import {
  BasicElement,
  html,
  customElement,
  TemplateResult,
  property,
} from '@refinitiv-ui/core';

// translate decorator
import {
  translate,
  TranslateDirective,
  TranslatePromise,
} from '@refinitiv-ui/translate';

// import default English language
import '@refinitiv-ui/phrasebook/locale/en/my-translate-element';

@customElement('my-translate-element')
export class MyTranslateElement extends BasicElement {
  /**
   * Add translation listener to Element
   * By default the scope is `element.localName`
   * You can provide your own scope, e.g. `@translate('another-element')`
   * You can define many translate decorators, if the element needs to obtain
   * translations form multiple scopes
   */
  @translate()
  private t!: TranslateDirective;

  @property({ type: Number })
  public count = 0;

  /**
   * Use `t` method to obtain translated text.
   * You may need to pass arguments to fulfil translation
   * @return Render template
   */
  protected render(): TemplateResult {
    return html`<div part="label">
        ${this.t('TRANSLATE_COUNT', {
          count: this.count,
        })}
      </div>
      <slot></slot>`;
  }
}
```

## Translate

Translate decorator is used to bind an Element with translate functionality. By applying the decorator, the element subscribes to _Phrasebook_ updates in order to react on new translations; and to _lang_ attribute changes on document and element levels.

In order to limit the number of unnecessary updates, translations are scoped. Scope names are usually the element's local name by default. For example, `my-translate-element`.

Decorator can be applied in different contexts described below.

### Translate Directive

Directive is part of [LitHTML](https://lit-html.polymer-project.org/guide/creating-directives). Directives are used from within `render` function as part of `TemplateResult`.

```ts
// default scope is element.localName.
@translate()
private t!: TranslateDirective;

// define directive with a different scope
@translate('custom-scope')
private tCustom!: TranslateDirective;
```

Directive translations are applied in the `render` method.

```ts
protected render (): TemplateResult {
  return html`
    <div>${this.t('KEY')}</div>
    <div>${this.t('KEY', { state: 10 })}</div>
    <div>${this.tCustom('CUSTOM_KEY', {
      b: (chunks: string) => `<b>${chunks}</b>` /* add <b> tags */
    })}</div>
  `;
}
```

Translation _key_ and _options_ are defined by the translation itself. To get a better idea you may read [intl-messageformat](https://formatjs.io/docs/intl-messageformat).

### Translate Promise

Translations can be resolved outside `render` context by using `mode = promise` in the `translate` decorator.

```ts
// default scope is element.localName.
@translate({
  mode: 'promise'
})
private t!: TranslatePromise;

// define promise with a different scope
@translate({
  mode: 'promise',
  scope: 'custom-scope'
})
private tCustom!: TranslatePromise;
```

Promise translations can be resolved in any asynchronous function. `performUpdate` is a good place to obtain the value before first render.

```ts
protected async performUpdate (): Promise<void> {
  const key = await this.t('KEY');
  console.log(key);

  super.performUpdate();
}
```

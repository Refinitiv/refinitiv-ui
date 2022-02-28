import type { BasicElement } from '@refinitiv-ui/core';
import { PartInfo, PartType, DirectiveResult } from 'lit/directive.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AsyncDirective, directive } from 'lit/async-directive.js';
import { noChange } from 'lit';

import {
  LangAttributeObserver,
  TranslateOptions,
  TranslateParams,
  t
} from '@refinitiv-ui/i18n';

import {
  Phrasebook,
  ObserverKey
} from '@refinitiv-ui/phrasebook';

const TranslatePropertyKey = Symbol('ef-translate');

type DecoratorOptions = {
  /**
   * The scope translation should subscribe to.
   * If not defined, equal to element local name
   */
  scope?: string;
  /**
   * Decorator mode.
   * `directive` - used in render function as LitHTML directive
   * `promise` - can be used everywhere as a promise
   */
  mode?: 'directive' | 'promise';
};
type TranslateFunction = (prototype: BasicElement, name: PropertyKey) => void;
type TranslateDirective = (key: string, options?: TranslateOptions, translateParams?: TranslateParams) => DirectiveResult<typeof AsyncTranslateDirective>;
type TranslatePromise = (key: string, options?: TranslateOptions, translateParams?: TranslateParams) => Promise<string>;
type Translate = TranslateDirective | TranslatePromise;

class AsyncTranslateDirective extends AsyncDirective {
  private readonly partType: number;

  constructor (partInfo: PartInfo) {
    super(partInfo);
    this.partType = partInfo.type;

    if (!(this.partType === PartType.CHILD || this.partType === PartType.ATTRIBUTE || this.partType === PartType.PROPERTY)) {
      throw new Error('Element Framework Translate can only be used in content, attribute or property bindings');
    }
  }

  render (scope: string, locale: string, key: string, options?: TranslateOptions, translateParams?: TranslateParams) {
    Promise.resolve(t(scope, locale, key, options, translateParams))
      .then(message => {
        this.setValue(this.partType === PartType.CHILD ? unsafeHTML(message) : message);
      })
      .catch(error => {
        this.setValue(key);

        // the code may fail if polyfills are not available in IE11 or translate syntax is wrong
        /* istanbul ignore next */
        setTimeout(() => {
          throw error instanceof Error ? error : new Error(String(error));
        });
      });

    return noChange;
  }
}

const translateDirective = directive(AsyncTranslateDirective);

const translatePromise = (scope: string, locale: string, key: string, options?: TranslateOptions, translateParams?: TranslateParams): Promise<string> => {
  return Promise.resolve(t(scope, locale, key, options, translateParams))
  .then(message => {
    return message;
  })
  .catch(error => {
    // the code may fail if polyfills are not available in IE11 or translate syntax is wrong
    /* istanbul ignore next */
    setTimeout(() => {
      throw error instanceof Error ? error : new Error(String(error));
    });
    return key;
  });
};

/**
 * Get locale of the element.
 * Locale is resolved following the algorithm:
 * `element.lang` -> `document.lang` -> `navigator.language`
 * @param element HTML element
 * @return element locale
 */
const getLocale = (element: HTMLElement): string => element.lang || LangAttributeObserver.documentLang || navigator.language;

/**
 * Start observing translations.
 * This step is required when translations are loaded or the `lang` has been
 * after the element has been rendered
 * @param this Function scope. ELF Basic Element
 * @param scope Scope
 * @returns {void}
 */
const observeTranslations = function (this: BasicElement, scope = this.localName): ObserverKey {
  let locale = getLocale(this);

  // Observe `lang` attribute changes on
  // document.documentElement and element itself
  LangAttributeObserver.observe(this, () => {
    const newLocale = getLocale(this);

    if (locale !== newLocale) {
      locale = newLocale;
      // this ensures that requestUpdate always comes through
      // however, external applications still can detect that the change is coming for translations
      // this is better than empty requestUpdate() as in that case in is not possible to detect source of update
      this.requestUpdate(TranslatePropertyKey, {});
    }
  });

  // Observe new translations for the scope
  return Phrasebook.observe(scope, () => {
    this.requestUpdate(TranslatePropertyKey, {});
  });
};

/**
 * Disconnect translation listeners.
 * This step is required to remove all element references from LangAttributeObserver and Phrasebook
 * @param this Function scope. ELF Basic Element
 * @param key Observe key from the `observeTranslations` function
 * @returns {void}
 */
const disconnectTranslations = function (this: BasicElement, key: ObserverKey): void {
  LangAttributeObserver.disconnect(this);
  Phrasebook.disconnect(key);
};

/**
 * Binds an element to translation keys
 * @param [options] decorator `options` or `scope`.
 * If not provided provided, `scope = element.localName` and `mode = 'directive'`
 * @returns translate directive
 */
const translate = function (options?: string | DecoratorOptions): TranslateFunction {
  return (
    prototype: BasicElement,
    name: PropertyKey
  ): void => {
    const scope = options ? typeof options === 'string' ? options : options.scope : undefined;
    const mode = options && typeof options !== 'string' ? options.mode : 'directive';

    // Cannot use an element itself as a key.
    // Element may have multiple translate directives with different scope
    // Therefore we need a truly unique key
    let key: ObserverKey;
    const connectedCallback = prototype.connectedCallback;

    prototype.connectedCallback = function (): void {
      connectedCallback.call(this);
      key = observeTranslations.call(this, scope);
    };

    const disconnectedCallback = prototype.disconnectedCallback;
    prototype.disconnectedCallback = function (): void {
      disconnectedCallback.call(this);
      disconnectTranslations.call(this, key);
    };

    const descriptor = mode === 'promise'
      ? {
        get (this: BasicElement): TranslatePromise {
          return (key: string, options?: TranslateOptions, translateParams?: TranslateParams): Promise<string> => {
            return translatePromise(scope || this.localName, getLocale(this), key, options, translateParams);
          };
        }
      } : {
        get (this: BasicElement): TranslateDirective {
          return (key: string, options?: TranslateOptions, translateParams?: TranslateParams) => {
            return translateDirective(scope || this.localName, getLocale(this), key, options, translateParams);
          };
        }
      };

    Object.defineProperty(prototype, name, Object.assign({
      enumerable: false,
      configurable: false
    }, descriptor));
  };
};

export {
  translate,
  TranslatePropertyKey,
  getLocale,
  Translate,
  TranslatePromise,
  TranslateDirective
};

import {
  Translations
} from './index';

const SHARED_SCOPE = '__shared__'; /* unique scope identifier */

class ObserverKey {}

type ObserverCallback = (locale: string) => void;

type Observable = {
  callback: ObserverCallback;
  scope: string;
};

type TranslationsMap = {
  [key: string]: Translations;
};

type LocaleMap = {
  [key: string]: TranslationsMap;
};

abstract class Phrasebook {
  private static localeMap: LocaleMap = {};
  private static observables = new Map<ObserverKey, Observable>();

  private static publish (publishLocale: string, publishScope: string): void {
    const callbackFn = (observable: Observable): void => {
      const { callback, scope } = observable;
      // for shared scope all observed must be updated
      if (publishScope === SHARED_SCOPE || publishScope === scope) {
        callback(publishLocale);
      }
    };

    this.observables.forEach(callbackFn);
  }

  /**
   * Start observing changes to translations
   * @param scope The scope to observe
   * @param callback A callback run when the scope has changed
   * @returns An observe key used to disconnet
   */
  public static observe (scope: string, callback: ObserverCallback): ObserverKey {
    const key = new ObserverKey();
    this.observables.set(key, {
      scope,
      callback
    });

    return key;
  }

  /**
   * Stop observing and disconnect a callback
   * @param key A key to stop observing the scope
   * @returns {void}
   */
  public static disconnect (key: ObserverKey): void {
    this.observables.delete(key);
  }

  /**
   * Define shared scope translations.
   * Shared scope are available globally across all translation keys.
   * @param locale Locale
   * @param translations Translations
   * @returns {void}
   */
  public static define (locale: string, translations: Translations): void
  /**
   * Define scoped translations.
   * @param locale Locale
   * @param scope Scope
   * @param translations Translations
   * @returns {void}
   */
  public static define (locale: string, scope: string, translations: Translations): void
  public static define (locale: string, scope: string | Translations, translations = scope as Translations): void {
    if (scope === SHARED_SCOPE) {
      throw new Error(`${SHARED_SCOPE} scope name is reserved`);
    }

    if (!locale || !scope || !translations) {
      throw new Error('Translations must define locale, scope and translations collection');
    }

    scope = typeof scope !== 'string' ? SHARED_SCOPE : scope;

    const translationMap = this.localeMap[locale] || {};
    translationMap[scope] = translations;
    this.localeMap[locale] = translationMap;

    this.publish(locale, scope);
  }

  /**
   * Get translation for locale and scope.
   * @param locale Locale to get
   * @param scope Scope to get
   * @returns translation or null
   */
  public static get (locale: string, scope: string): null | Translations {
    const translationsMap = this.localeMap[locale];
    if (!translationsMap) {
      return null;
    }

    return Object.assign({}, translationsMap[SHARED_SCOPE] || {}, translationsMap[scope] || {});
  }

  /**
   * Get a list of supported locales per scope
   * @param [scope=SHARED_SCOPE] A scope to check. If none provided a shared scope is returned
   * @returns list of supported locales
   */
  public static supported (scope = SHARED_SCOPE): string[] {
    const locales: string[] = [];
    const localeMap = this.localeMap;
    let translation: TranslationsMap;
    let locale: string;

    for (locale in localeMap) {
      translation = localeMap[locale];
      if (translation[scope]) {
        locales.push(locale);
      }
    }
    return locales;
  }
}

export {
  ObserverKey,
  ObserverCallback,
  Phrasebook
};

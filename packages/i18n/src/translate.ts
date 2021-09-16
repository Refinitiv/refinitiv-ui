import {
  Phrasebook
} from '@refinitiv-ui/phrasebook';
import { supportedLocales } from '@formatjs/intl-utils';
import {
  DEFAULT_LOCALE
} from './constants';

import {
  TranslateOptions,
  TranslateParams,
  UnicodeExtensions
} from './types';

import {
  Memoiser
} from './memoiser';

/**
 * Resolve translation from provided locale. For instance:
 * if `supported=['en', 'zh-Hant', 'zh-Hans']`
 * - en -> en
 * - en-GB -> en
 * - en-US -> en
 * - ru -> ''
 * - zh -> ''
 * - zh-Hant -> zh-Hant
 * - zh-Hant-HK -> zh-Hant
 * @param scope Scope
 * @param locale Locale to resolve
 * @returns resolved locale
 */
const resolveLocale = (scope: string, locale: string): string => {
  if (!locale) {
    return '';
  }

  const supported = Phrasebook.supported(scope);

  // pick the first available locale in priority.
  return supportedLocales(supported, [locale])[0] || '';
};

/**
 * Clear all cached records
 * @returns {void}
 */
const clearCache = (): void => {
  Memoiser.clear();
};

/**
 * A helper method to clear cache for specific scope and locale
 * @param scope Scope
 * @param locale Locale
 * @returns {void}
 */
const clearCachedRecord = (scope: string, locale: string): void => {
  const resolvedLocale = resolveLocale(scope, locale);

  if (resolvedLocale) {
    Memoiser.delete(scope, locale);
  }
};

/**
 * Add unicode extensions to locale. E.g: 'en-u-hc-h24-ca-islamic'
 * Note: if unicode extensions are passed with the locale itself, override those.
 * @param locale Locale to add extension
 * @param unicodeExtensions A list of extension
 * @returns locale with unicode extensions
 */
const parseUnicodeExtensions = (locale: string, unicodeExtensions: UnicodeExtensions): string => {
  if (!unicodeExtensions) {
    return locale;
  }

  const extensions = [];
  const localeUSplit = locale.split('-u-');
  locale = localeUSplit[0];
  const localeExtensions: UnicodeExtensions = {};
  if (localeUSplit[1]) {
    const split = localeUSplit[1].split('-'); // name-value pairs
    while (split.length) {
      const name = String(split.shift());
      const value = split.shift() || '';
      localeExtensions[name] = value;
    }
  }
  unicodeExtensions = Object.assign(localeExtensions, unicodeExtensions);

  for (const name in unicodeExtensions) {
    extensions.push(name, unicodeExtensions[name]);
  }

  if (extensions.length) {
    locale += `-u-${extensions.join('-')}`;
  }

  return locale;
};

/**
 * Get translation message from Phrasebook
 * @param scope Scope
 * @param locale Locale
 * @param key Translation key
 * @param options Translate options as key value combination
 * @param translateParams Translate parameters
 * @returns Promise<message>
 */
const t = (scope: string, locale: string, key: string, options?: TranslateOptions, translateParams?: TranslateParams): Promise<string> => {
  try {
    let resolvedLocale = resolveLocale(scope, locale);

    if (!resolvedLocale && locale !== DEFAULT_LOCALE) {
      // requested locale is not found in scope. Fallback to default locale
      locale = DEFAULT_LOCALE;
      resolvedLocale = resolveLocale(scope, locale);
    }

    const translation = resolvedLocale ? Phrasebook.get(resolvedLocale, scope) : null;

    if (!translation || !translation[key]) {
      // eslint-disable-next-line no-console
      console.warn(`elf-i18n: "${key}" is not found in scope: "${scope}", locale: "${locale}" translations`);
      return Promise.resolve(key);
    }

    if (translateParams?.unicodeExtensions) {
      locale = parseUnicodeExtensions(locale, translateParams?.unicodeExtensions);
    }

    return Promise.resolve(Memoiser.format(scope, locale, key, translation[key], options, translateParams?.formats, translateParams?.options));
  }
  catch (error) {
    return Promise.reject(error);
  }
};

export {
  t,
  resolveLocale,
  clearCache,
  clearCachedRecord
};

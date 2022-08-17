import { Locale } from '@refinitiv-ui/utils/date.js';
import { getLocale as getLang } from '@refinitiv-ui/translate';

type LocaleMapOptions = {
  resolvedLocale: Locale,
  locale?: Locale,
  lang?: string;
  formatOptions?: Intl.DateTimeFormatOptions;
  amPm?: boolean;
  showSeconds?: boolean;
  timepicker?: boolean;
};

const LocaleMap = new WeakMap<LocaleDateElement, LocaleMapOptions>();

/**
 * Used for date elements to construct Locale object
 */
type LocaleDateElement = HTMLElement & {
  formatOptions?: Intl.DateTimeFormatOptions | null;
  amPm?: boolean;
  showSeconds?: boolean;
  timepicker?: boolean;
  locale?: Locale | null;
};

/**
 * Returns true if the datetime field has seconds
 * @param element Locale Date element
 * @returns hasSeconds
 */
const hasSeconds = (element: LocaleDateElement): boolean => {
  return element.showSeconds || element.hasAttribute('show-seconds');
};

/**
 * Returns true if the datetime field has am-pm
 * @param element Locale Date element
 * @returns hasAmPm
 */
const hasAmPm = (element: LocaleDateElement): boolean => {
  return element.amPm || element.hasAttribute('am-pm');
};

/**
 * Returns true if the datetime field has timepicker
 * @param element Locale Date element
 * @returns hasTimepicker
 */
const hasTimepicker = (element: LocaleDateElement): boolean => {
  // need to check for attribute to resolve the value correctly until the first lifecycle is run
  return element.timepicker || hasAmPm(element) || hasSeconds(element) || element.hasAttribute('timepicker');
};

/**
 * Resolve locale based on locale properties
 * @param lang Resolved language (locale)
 * @param timepicker Has time info
 * @param amPm Has amPm info
 * @param showSeconds Has seconds info
 * @param options Override options if resolved from element
 * @returns locale Resolved locale
 */
const localeFromProperties = (lang: string, timepicker: boolean, amPm: boolean, showSeconds: boolean, options: Intl.DateTimeFormatOptions): Locale => {
  // TODO: Do not use dateStyle and timeStyle as these are supported only in modern browsers
  return Locale.fromOptions({
    hour: timepicker ? 'numeric' : undefined,
    minute: timepicker ? 'numeric' : undefined,
    second: showSeconds ? 'numeric' : undefined,
    hour12: amPm ? true : undefined, // force am-pm if provided, otherwise rely on locale
    ...options
  }, lang);
};

/**
 * Resolve locale based on format options
 * @param lang Resolved language (locale)
 * @param formatOptions Format options
 * @returns locale Resolved locale
 */
const localeFromOptions = (lang: string, formatOptions: Intl.DateTimeFormatOptions): Locale => Locale.fromOptions(formatOptions, lang);

/**
 * Get Locale object from LocaleMap cache
 * @param element Locale Date element
 * @returns locale Resolved Locale object or null
 */
const getLocale = (element: LocaleDateElement): Locale | null => {
  const localeMap = LocaleMap.get(element);
  if (localeMap) {
    const { resolvedLocale, locale, formatOptions, amPm, showSeconds, timepicker, lang } = localeMap;
    // calculate Diff with cache to check if the object has changed
    // Locale includes all required information for localisation
    // and takes priority of other properties
    if (locale || element.locale) {
      return locale === element.locale ? resolvedLocale : null;
    }

    // Lang has changed
    if (lang !== getLang(element)) {
      return null;
    }

    if (formatOptions || element.formatOptions) {
      // formatOptions take priority over properties
      return formatOptions === element.formatOptions ? resolvedLocale : null;
    }

    return timepicker === hasTimepicker(element) && amPm === hasAmPm(element) && showSeconds === hasSeconds(element) ? resolvedLocale : null;
  }

  return null;
};

/**
 * Populate LocaleMap cache
 * @param element Locale Date element
 * @param options Locale Map options
 * @returns locale Locale object
 */
const setLocaleMap = (element: LocaleDateElement, options: LocaleMapOptions): Locale => {
  LocaleMap.set(element, options);
  return options.resolvedLocale;
};

/**
 * Set Locale object in LocaleMap cache
 * @param element Locale Date element
 * @param options Override options if resolved from element
 * @returns locale Resolved Locale object
 */
const setLocale = (element: LocaleDateElement, options: Intl.DateTimeFormatOptions): Locale => {
  if (element.locale) {
    const resolvedLocale = element.locale;
    return setLocaleMap(element, {
      resolvedLocale,
      locale: resolvedLocale
    });
  }

  const lang = getLang(element);
  const formatOptions = element.formatOptions;
  if (formatOptions) {
    return setLocaleMap(element, {
      resolvedLocale: localeFromOptions(lang, formatOptions),
      lang,
      formatOptions
    });
  }

  const timepicker = hasTimepicker(element);
  const showSeconds = hasSeconds(element);
  const amPm = hasAmPm(element);

  return setLocaleMap(element, {
    resolvedLocale: localeFromProperties(lang, timepicker, amPm, showSeconds, options),
    lang,
    amPm,
    timepicker,
    showSeconds
  });
};

/**
 * Resolve locale based on element parameters
 * @param element Locale Date element
 * @param [options] Override options if resolved from element
 * @returns locale Resolved Locale object
 */
const resolvedLocale = (element: LocaleDateElement, options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}): Locale => getLocale(element) || setLocale(element, options);

export {
  LocaleDateElement,
  resolvedLocale
};

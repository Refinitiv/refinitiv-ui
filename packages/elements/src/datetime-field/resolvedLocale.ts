import { Locale } from '@refinitiv-ui/utils/date.js';
import { getLocale } from '@refinitiv-ui/translate';

const LocaleMap = new WeakMap<LocaleDateElement, {
  resolvedLocale: Locale,
  lang: string;
  locale: Locale | null,
  formatOptions: Intl.DateTimeFormatOptions | null;
  amPm: boolean;
  showSeconds: boolean;
  timepicker: boolean;
}>();

/**
 * Used for date elements to construct Locale object
 */
type LocaleDateElement = HTMLElement & {
  formatOptions: Intl.DateTimeFormatOptions | null;
  amPm: boolean;
  showSeconds: boolean;
  timepicker: boolean;
  locale: Locale | null;
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
 * Resolve locale based on element parameters
 * @param lang Resolved language (locale)
 * @param formatOptions Format options
 * @param timepicker Has time info
 * @param amPm Has amPm info
 * @param showSeconds Has seconds info
 * @returns locale Resolved locale
 */
const resolveLocaleFromElement = (lang: string, formatOptions: Intl.DateTimeFormatOptions | null, timepicker: boolean, amPm: boolean, showSeconds: boolean): Locale => {
  // TODO: Do not use dateStyle and timeStyle as these are supported only in modern browsers
  return Locale.fromOptions(formatOptions || {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: timepicker ? 'numeric' : undefined,
    minute: timepicker ? 'numeric' : undefined,
    second: showSeconds ? 'numeric' : undefined,
    hour12: amPm ? true : undefined // force am-pm if provided, otherwise rely on locale
  }, lang);
};

/**
 * Resolve locale based on element parameters
 * @param element Locale Date element
 * @returns locale Resolved Locale object
 */
const resolvedLocale = (element: LocaleDateElement): Locale => {
  const localeMap = LocaleMap.get(element);
  if (localeMap) {

    const { resolvedLocale, locale, formatOptions, amPm, showSeconds, timepicker, lang } = localeMap;
    // calculate Diff with cache to check if the object has changed
    if ((locale && locale === element.locale) || (!locale && !element.locale && lang === getLocale(element) && (
      (formatOptions && formatOptions === element.formatOptions)
          || (!formatOptions && !element.formatOptions && timepicker === hasTimepicker(element) && amPm === hasAmPm(element) && showSeconds === hasSeconds(element))
    ))) {
      return resolvedLocale;
    }
  }

  const lang = getLocale(element);
  const formatOptions = element.formatOptions;
  const timepicker = hasTimepicker(element);
  const showSeconds = hasSeconds(element);
  const amPm = hasAmPm(element);
  const locale = element.locale;
  const resolvedLocale = locale || resolveLocaleFromElement(lang, formatOptions, timepicker, amPm, showSeconds);

  LocaleMap.set(element, {
    resolvedLocale,
    locale,
    formatOptions,
    amPm,
    timepicker,
    showSeconds,
    lang
  });

  return resolvedLocale;
};

export {
  LocaleDateElement,
  resolvedLocale
};

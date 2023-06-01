import { DEFAULT_LOCALE, MessageFormats, TranslateParams, resolveLocale } from '@refinitiv-ui/i18n';
import { getDaysInMonth, toDateSegment, utcParse } from '@refinitiv-ui/utils/date.js';

import { CalendarLocaleScope } from './constants.js';

export type MonthInfo = {
  days: number;
  month: number;
  year: number;
};

/**
 * Get information about number of days, month number and year from date object
 * @param value Date string
 * @returns Month information object
 */
const monthInfo = (value: string): MonthInfo => {
  const segment = toDateSegment(value);
  const year = segment.year;
  const month = segment.month;
  return {
    days: getDaysInMonth(year, month),
    month,
    year
  };
};

const calendar: Intl.DateTimeFormatOptions = {
  // calendar property is not part of TypeScript Intl.DateTimeFormatOptions,
  // but is supported by all modern browsers and is required by Intl.DateTimeFormat polyfill
  calendar: 'gregory',
  timeZone: 'UTC'
};

/**
 * Custom formats for date formatting
 */
const DateMessageFormats: MessageFormats = {
  date: {
    calendarMonthEra: { ...calendar, month: 'long', year: 'numeric', era: 'short' },
    calendarMonth: { ...calendar, month: 'long', year: 'numeric' },
    calendarYearEra: { ...calendar, year: 'numeric', era: 'short' },
    calendarYear: { ...calendar, year: 'numeric' }
  }
};

/**
 * Get locale based on provided locale and Phrasebook available locales
 * @param locale locale tag
 * @returns resolved locale
 */
const getLocale = (locale: string): string => {
  return resolveLocale(CalendarLocaleScope, locale) || DEFAULT_LOCALE;
};

/**
 * Get a list of weekday abbreviations based on locale
 * @param locale Locale
 * @param [width='short'] Day width
 * @returns The list of weekdays starting from Sunday
 */
const weekdaysNames = (locale: string, width: Intl.DateTimeFormatOptions['weekday'] = 'narrow'): string[] => {
  locale = getLocale(locale);

  // we know that Jan 04 1970 is Sunday
  let day = 4;
  const date = utcParse({
    year: 1970,
    month: 0,
    day: day
  });
  const weekdays = [];
  while (day < 11) {
    weekdays.push(date.toLocaleDateString(locale, { weekday: width, timeZone: 'UTC' }));
    day += 1;
    date.setUTCDate(day);
  }

  return weekdays;
};

/**
 * Get a list of months based on locale
 * @param locale Locale
 * @param [width='short'] Month width
 * @returns The list of months starting from January
 */
const monthsNames = (locale: string, width: Intl.DateTimeFormatOptions['month'] = 'short'): string[] => {
  locale = getLocale(locale);

  let month = 0;
  const date = utcParse({
    year: 1970,
    month,
    day: 1
  });
  const months = [];
  while (month < 12) {
    months.push(date.toLocaleDateString(locale, { month: width, timeZone: 'UTC' }));
    month += 1;
    date.setUTCMonth(month);
  }

  return months;
};

/**
 * Used to format views
 */
const ViewFormatTranslateParams: TranslateParams = {
  unicodeExtensions: {
    // while latest Chrome, FF and Intl.DateTimeFormat polyfill support
    // calendar option to format date,
    // older browsers as Safari version < 14.1 need this to be provided as
    // unicode extension, e.g. lang="th-u-ca-gregory"
    ca: 'gregory'
  },
  formats: DateMessageFormats
};

export { monthInfo, weekdaysNames, monthsNames, ViewFormatTranslateParams };

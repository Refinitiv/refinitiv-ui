import { Phrasebook } from '@refinitiv-ui/phrasebook';
import { DEFAULT_LOCALE, resolveLocale, MessageFormats, TranslateParams } from '@refinitiv-ui/i18n';
import { utcParse } from '@refinitiv-ui/utils';

// While Intl can support literally all world languages
// for safety still limit the number of locales, for the following reasons
// 1) different browsers and OS support different locales, and the result might be different.
// 2) first day of week is different. Currently it is not possible to get this info out of Intl object
const globals = {
  VIEW_FORMAT: '{includeMonth, select, true {{includeEra, select, true {{ date, date, calendarMonthEra }} false {{ date, date, calendarMonth }}}} false {{ includeEra, select, true {{ date, date, calendarYearEra }} false {{ date, date, calendarYear }}}}}',
  FIRST_DAY_OF_WEEK: '1'
};

const en = globals;
const enUS = { ...en, FIRST_DAY_OF_WEEK: '0' };
const enCA = enUS;
const de = globals;
const es = globals;
const fr = globals;
const frCA = { ...fr, FIRST_DAY_OF_WEEK: '0' };
const it = globals;
const ja = globals;
const ko = { ...globals, FIRST_DAY_OF_WEEK: '0' };
const pl = globals;
const ru = globals;
const th = { ...globals, FIRST_DAY_OF_WEEK: '0' };
const zh = globals;
const ar = { ...globals, FIRST_DAY_OF_WEEK: '6' };

const scope = 'ef-calendar';
Phrasebook.define('en', scope, en);
Phrasebook.define('en-CA', scope, enCA);
Phrasebook.define('en-US', scope, enUS);
Phrasebook.define('de', scope, de);
Phrasebook.define('es', scope, es);
Phrasebook.define('fr', scope, fr);
Phrasebook.define('fr-CA', scope, frCA);
Phrasebook.define('it', scope, it);
Phrasebook.define('ja', scope, ja);
Phrasebook.define('ko', scope, ko);
Phrasebook.define('pl', scope, pl);
Phrasebook.define('ru', scope, ru);
Phrasebook.define('th', scope, th);
Phrasebook.define('zh', scope, zh);
Phrasebook.define('ar', scope, ar);

type CalendarDateFormatOptions = Intl.DateTimeFormatOptions & { calendar?: string };
const calendar: CalendarDateFormatOptions = {
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
 * Used to format views
 */
const ViewFormatTranslateParams: TranslateParams = {
  unicodeExtensions: {
    // while latest Chrome, FF and Intl.DateTimeFormat polyfill support
    // calendar option to format date,
    // older browsers as Safari and IE11 need this to be provided as
    // unicode extension, e.g. lang="th-u-ca-gregory"
    ca: 'gregory'
  },
  formats: DateMessageFormats
};

/**
 * Get locale based on provided locale and Phrasebook available locales
 * @param locale locale tag
 * @returns resolved locale
 */
const getLocale = (locale: string): string => {
  return resolveLocale(scope, locale) || DEFAULT_LOCALE;
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
 * @deprecated
 * Some old browsers (as IE11) do not support formatting of old dates before BC
 * Instead simply convert the date manually to match Translate function
 * @param date Date
 * @param locale locale
 * @param [includeMonth=false] true to include month
 * @param [includeEra=false] tru to include era descriptor
 * @returns formatted dates
 */
const formatLocaleDate = (date: Date, locale: string, includeMonth = false, includeEra = false): string => {
  const monthNames = monthsNames(locale, 'long');
  locale = getLocale(locale);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();

  // BC flags are not supported. Always use English
  return `${
    includeMonth ? `${monthNames[month]} ` : ''
  } ${
    year > 0 ? year : year === 0 ? '1' : Math.abs(year - 1)
  }${includeEra ? year <= 0 ? ' BC' : ' AD' : ''}`;
};

export {
  weekdaysNames,
  monthsNames,
  formatLocaleDate,
  ViewFormatTranslateParams
};

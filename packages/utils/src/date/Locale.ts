import {
  Format as DateFormat
} from './date.js';
import {
  Format as TimeFormat
} from './time.js';
import {
  Format as DateTimeFormat
} from './datetime.js';
import {
  throwInvalidValue
} from './utils.js';
import {
  utcFormat,
  utcParse,
  getFormat,
  Format
} from './shared.js';
import {
  HOURS_IN_DAY,
  YEARS_IN_CENTURY,
  DAYS_IN_WEEK,
  MONTHS_IN_YEAR
} from './timestamps.js';

// Support weak formatting, when units may start from 0 or 0 can be skipped
// so both values are the same: 01/01/2022 and 1/1/2022
// These expressions are different to ones defined for date.js and time.js, which are always strict

// Years, covers full year YYYY
const YYYY = '(\\d{1,4})';
// Years, covers 2-digit year
const YY = '(\\d{2})';
// Numeric months: 1, 01, 12
const MM = '([1-9]{1}|0[1-9]|1[0-2])';
// Days: 1, 01, 19, 29 or 31. Extra validation added to check for number of days after parsing
const DD = '([1-9]{1}|0[1-9]|1\\d{1}|2\\d{1}|3[0-1])';
// Hour system using 0–23; corresponds to 'H' in patterns. The 24 hour clock, with midnight starting at 0:00.
// This is used in Europe and most of the world
const H23 = '(\\d{1}|[0-1]\\d{1}|2[0-3])';
// Hour system using 1–12; corresponds to 'h' in patterns. The 12 hour clock, with midnight starting at 12:00 am.
// This is used in the USA
const H12 = '([1-9]{1}|0[1-9]|1[0-2])';
// Hour system using 1–24; corresponds to 'k' in pattern.
// The 24 hour clock, with midnight starting at 24:00.
const H24 = '([1-9]{1}|0[1-9]|1\\d{1}|2[0-4])';
// Hour system using 0–11; corresponds to 'K' in patterns.
// The 12 hour clock, with midnight starting at 0:00 am.
const H11 = '(\\d{1}|0\\d{1}|1[0-1])';
// Minutes
const mm = '(\\d{1}|[0-5]\\d{1})';
// Seconds
const ss = '(\\d{1}|[0-5]\\d{1})';
// Milliseconds to match fractionalSecond
const S = '(\\d{1})';
const SS = '(\\d{2})';
const SSS = '(\\d{3})';

const TwoDigit = '2-digit';
const Numeric = 'numeric';

type FormattedNames = {
  value: number;
  name: string;
}

// Fractional seconds are not supported in TypeScript Intl as of 2021
type DateTimeFormatPartTypes = Intl.DateTimeFormatPartTypes | 'fractionalSecond';
interface DateTimeFormatPart {
  type: DateTimeFormatPartTypes;
  value: string;
}

/**
 * Escape special characters for RegExp
 * @param str String to process
 * @returns string
 */
const regExpEscape = (str: string) => str.replace(/([^\w\s])/g, '\\$1').replace(/\s/g, '\\s');

class Locale {
  /**
   * Construct Locale object from options
   * @param options Format options
   * @param [locales] Locale or the default locale
   * @returns Locale object
   */
  public static fromOptions (options: Intl.DateTimeFormatOptions, locales?: string | string[]): Locale {
    const format = new Intl.DateTimeFormat(locales, {
      ...options,
      calendar: 'gregory', // Force Gregorian calendar
      numberingSystem: 'latn', // Force Latin numbering system
      timeZoneName: undefined, // Timezones are not supported
      timeZone: 'UTC' // must be provided as all calculations are done in UTC
    });
    return new Locale(format);
  }

  public readonly formatter;
  public readonly options;

  private readonly hourCycle;
  private readonly fractionalSecondDigits;

  /**
   * Create the Locale object
   * @param formatter Date time format
   */
  constructor (formatter: Intl.DateTimeFormat) {
    this.formatter = formatter;
    this.options = formatter.resolvedOptions();

    const options = this.options;

    // Hour cycle is not supported in older browsers. Therefore keep the default
    this.hourCycle = options.hourCycle ? options.hourCycle : options.hour12 ? 'h12' : 'h23';

    // FractionalSecondDigits is not supported in older browsers. Therefore keep the default
    this.fractionalSecondDigits = options.fractionalSecondDigits ? options.fractionalSecondDigits : 0;

    // Do validations early
    if (options.calendar !== 'gregory') {
      throw new Error('Only Gregorian calendar is supported. Specify calendar option for locale, e.g. "th-u-ca-gregory"');
    }

    if (options.numberingSystem !== 'latn') {
      throw new Error('Only Latin symbols supported. Specify calendar option for numbering symbols, e.g. "ar-u-nu-latn"');
    }

    if (options.timeZone !== 'UTC') {
      throw new Error('Only UTC timezone supported. Specify `timeZone: \'UTC\'` in formatter options.');
    }
  }

  /**
   * Get months names for the specified formatter
   * @returns names Month names
   */
  private formatMonthNames (): FormattedNames[] {
    const monthsNames: FormattedNames[] = [];
    for (let value = 0; value < MONTHS_IN_YEAR; value += 1) {
      const date = Date.UTC(2018, value, 1); // January - February
      const monthPart = this.formatter.formatToParts(date).find(part => part.type === 'month');
      if (monthPart) {
        monthsNames.push({
          value,
          name: monthPart.value.toLowerCase()
        });
      }
    }
    return monthsNames;
  }

  /**
   * Get weekday names for the specified formatter
   * @returns names Weekday names
   */
  private formatWeekdayNames (): FormattedNames[] {
    const weekdayNames: FormattedNames[] = [];
    for (let value = 0; value < DAYS_IN_WEEK; value += 1) {
      const date = Date.UTC(2018, 0, value); // Sunday - Saturday
      const weekdayPart = this.formatter.formatToParts(date).find(part => part.type === 'weekday');
      if (weekdayPart) {
        weekdayNames.push({
          value,
          name: weekdayPart.value.toLowerCase()
        });
      }
    }
    return weekdayNames;
  }

  /**
   * Get period names for the specified formatter
   * @returns names Period names
   */
  private formatPeriodNames (): FormattedNames[] {
    const periodNames: FormattedNames[] = [];
    for (let i = 0; i < HOURS_IN_DAY; i += 1) {
      // The period is unknown as it can be different per locale, e.g. for en-GB:
      // AM, PM, 'at night', 'in the morning', 'noon', 'in the afternoon', 'in the evening'
      const date = Date.UTC(2018, 0, 1, i);
      const parts = this.formatter.formatToParts(date);
      const dayPeriodPart = parts.find(part => part.type === 'dayPeriod');
      const hourPart = parts.find(part => part.type === 'hour');
      if (hourPart && dayPeriodPart) {
        periodNames.push({
          value: Number(hourPart.value),
          name: dayPeriodPart.value.toLowerCase()
        });
      }
    }
    return periodNames;
  }

  /**
   * Get period names for the specified formatter
   * @returns names Period names
   */
  private formatEraNames (): FormattedNames[] {
    const eraNames: FormattedNames[] = [];
    const dates = [utcParse('-0001-01-01').getTime(), Date.UTC(2018, 0, 1)];
    for (let i = 0; i <= 1; i += 1) {
      const era = dates[i];
      const part = this.formatter.formatToParts(era).find(part => part.type === 'era');
      if (part) {
        eraNames.push({
          value: era,
          name: part.value.toLowerCase()
        });
      }
    }
    return eraNames;
  }

  /**
   * Escape list with literals to be used with RegExp
   * @param list A list with items
   * @returns escaped list
   */
  private escapeList (list: FormattedNames[]): string {
    // There might be duplicates, which are not required in RegExp
    return `(${[...new Set(list.map(item => item.name))].map(item => regExpEscape(item)).join('|')})`;
  }

  private _regExp: RegExp | null = null;
  /**
   * Get regular expression for the format
   */
  private get regExp (): RegExp {
    if (this._regExp) {
      return this._regExp;
    }
    const options = this.options;
    const parts = this.parts;

    let str = '';

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      switch (part.type) {
        case 'year':
          str += options.year === TwoDigit ? YY : YYYY;
          break;
        case 'month':
          str += options.month === TwoDigit || options.month === Numeric ? MM : this.escapeList(this.monthNames);
          break;
        case 'day':
          str += DD;
          break;
        case 'hour':
          const hourCycle = this.hourCycle;
          str += hourCycle === 'h23' ? H23 : hourCycle === 'h12' ? H12 : hourCycle === 'h11' ? H11 : H24;
          break;
        case 'minute':
          str += mm;
          break;
        case 'second':
          str += ss;
          break;
        case 'fractionalSecond':
          const ms = this.fractionalSecondDigits;
          str += ms === 1 ? S : ms === 2 ? SS : SSS;
          break;
        case 'weekday':
          str += this.escapeList(this.weekdayNames);
          break;
        case 'dayPeriod':
          str += this.escapeList(this.periodNames);
          break;
        case 'literal':
          str += `(${regExpEscape(part.value.toLowerCase())})`;
          break;
        case 'era':
          str += this.escapeList(this.eraNames);
          break;
        case 'timeZoneName':
          throw new Error('Parsing timezones is ambiguous. Make sure that `timeZoneName` option is not provided');
          break;
        // no default
      }
    }

    this._regExp = new RegExp(`^${str}$`, 'i');
    return this._regExp;
  }

  private _monthNames: FormattedNames[] | null = null;
  /**
   * Get month names
   */
  private get monthNames (): FormattedNames[] {
    if (this._monthNames) {
      return this._monthNames;
    }
    this._monthNames = this.formatMonthNames();
    return this._monthNames;
  }

  private _weekdayNames: FormattedNames[] | null = null;
  /**
   * Get weekday names
   */
  private get weekdayNames (): FormattedNames[] {
    if (this._weekdayNames) {
      return this._weekdayNames;
    }
    this._weekdayNames = this.formatWeekdayNames();
    return this._weekdayNames;
  }

  private _periodNames: FormattedNames[] | null = null;
  /**
   * Get period names
   */
  private get periodNames (): FormattedNames[] {
    if (this._periodNames) {
      return this._periodNames;
    }
    this._periodNames = this.formatPeriodNames();
    return this._periodNames;
  }

  private _eraNames: FormattedNames[] | null = null;
  /**
   * Get era names
   */
  private get eraNames (): FormattedNames[] {
    if (this._eraNames) {
      return this._eraNames;
    }
    this._eraNames = this.formatEraNames();
    return this._eraNames;
  }

  private _parts: DateTimeFormatPart[] | null = null;
  /**
   * Get parts for formatter
   */
  private get parts (): DateTimeFormatPart[] {
    if (this._parts) {
      return this._parts;
    }
    this._parts = this.formatter.formatToParts(Date.UTC(2018, 0, 1));
    return this._parts;
  }

  private _resolvedFormat: Format | null = null;
  /**
   * Get resolved ISO string format
   */
  public get isoFormat (): Format {
    if (this._resolvedFormat) {
      return this._resolvedFormat;
    }

    const options = this.options;

    const day = options.day !== undefined || options.dateStyle !== undefined;
    const month = day || options.month !== undefined;
    const year = day || month || options.year !== undefined;
    const millisecond = options.fractionalSecondDigits !== undefined;
    const second = millisecond || options.second !== undefined || options.timeStyle === 'full' || options.timeStyle === 'long' || options.timeStyle === 'medium';
    const minute = second || options.minute !== undefined || options.timeStyle === 'short';
    const hour = minute || options.hour !== undefined;

    if (hour && !year) {
      // time only formats
      this._resolvedFormat = millisecond ? TimeFormat.HHmmssSSS : second ? TimeFormat.HHmmss : TimeFormat.HHmm;
    }
    else if (year && !hour) {
      // date only
      this._resolvedFormat = day ? DateFormat.yyyyMMdd : month ? DateFormat.yyyyMM : DateFormat.yyyy;
    }
    else {
      // datetime or ambiguous
      this._resolvedFormat = millisecond ? DateTimeFormat.yyyMMddTHHmmssSSS : second ? DateTimeFormat.yyyMMddTHHmmss : DateTimeFormat.yyyMMddTHHmm;
    }

    return this._resolvedFormat;
  }

  /**
   * Try to parse localised date string into ISO date/time/datetime string
   * Throw an error if value is invalid
   * @param value Localised date
   * @param [referenceDate=0] Reference UTC date or time to resolve ambiguous strings.
   * @returns ISO date/time/datetime string
   */
  public parse (value: string, referenceDate: string | number | Date = 0): string {
    referenceDate = typeof referenceDate === 'string' ? utcParse(referenceDate) : new Date(referenceDate);

    value = value.trim(); // weak formatting
    const regExp = this.regExp;

    regExp.lastIndex = 0; // 0 index?
    const matches = regExp.exec(value);

    if (!value || matches === null) {
      throw throwInvalidValue(value);
    }

    const options = this.options;
    const parts = this.parts;
    let year = referenceDate.getUTCFullYear();
    let month = referenceDate.getUTCMonth();
    let day = referenceDate.getUTCDay();
    let hours = referenceDate.getUTCHours();
    let minutes = referenceDate.getUTCMinutes();
    let seconds = referenceDate.getUTCSeconds();
    let milliseconds = referenceDate.getUTCMilliseconds();

    let weekDay = '';
    let referenceDay = NaN;
    let dayPeriod = '';
    let era = -1;

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      const match = matches[i + 1].toLowerCase(); // regexp 0 is full string
      switch (part.type) {
        case 'year':
          year = Number(match);
          break;
        case 'month':
          if (options.month === Numeric || options.month === TwoDigit) {
            month = Number(match) - 1; // month is 0 based
          }
          else {
            const monthItem = this.monthNames.find(item => item.name === match);
            if (monthItem) {
              month = monthItem.value;
            }
          }
          break;
        case 'day':
          referenceDay = Number(match);
          break;
        case 'weekday':
          weekDay = match;
          break;
        case 'hour':
          hours = Number(match);
          break;
        case 'minute':
          minutes = Number(match);
          break;
        case 'second':
          seconds = Number(match);
          break;
        case 'fractionalSecond':
          milliseconds = Number(match);
          break;
        case 'dayPeriod':
          dayPeriod = match;
          break;
        case 'era':
          era = this.eraNames.findIndex(item => item.name === match);
          break;
        // no default
      }
    }

    // 2 digit year is ambiguous. Resolve from reference date
    if (options.year === TwoDigit) {
      const referenceYear = referenceDate.getUTCFullYear();
      year = referenceYear - referenceYear & YEARS_IN_CENTURY + year;
    }

    // Era, just flip to negative if BC
    if (era === 0) {
      year *= -1;
    }

    // Adjust hour cycles to h23 format
    if (options.hour12) {
      // Minutes needs to be taken into account, e.g.:
      // 12:00 - noon; 11:59 - in the morning; 12:01 - in the afternoon
      // const matchHours = this.periodNames.findIndex(period => period.name === dayPeriod && period.value === hours);
      // hours = matchHours > HOURS_OF_NOON ? hours += HOURS_OF_NOON : hours;
      hours = this.periodNames.findIndex(period => period.name === dayPeriod && period.value === hours);
      if (hours === -1) {
        throwInvalidValue(value);
      }
    }
    else if (this.hourCycle === 'h24') {
      // midnight at 24:00 (h24) = 00:00 (h23)
      hours = hours === HOURS_IN_DAY ? 0 : hours;
    }

    // Resolve false positives,
    if (!weekDay && !isNaN(referenceDay)) {
      // day provided, weekday is not
      day = referenceDay;
    }
    else if (weekDay && isNaN(referenceDay)) {
      // Ambiguous format, so pick the first available day
      // that match the weekday, year and month
      referenceDay = 1;
      let utcWeekDay = utcParse({ year, month, day: referenceDay }).getUTCDay();
      for (let i = 0; i < DAYS_IN_WEEK; i += 1) {
        if (this.weekdayNames.find(item => item.name === weekDay && item.value === utcWeekDay)) {
          break;
        }
        utcWeekDay += 1;
        referenceDay += 1;
      }
    }
    else if (weekDay && !isNaN(referenceDay)) {
      day = referenceDay;
      // both provided, make sure that these values match
      // there might be more than 1 match (e.g. T can mean Tuesday or Thursday)
      const utcWeekDay = utcParse({ year, month, day }).getUTCDay();
      if (!this.weekdayNames.some(item => item.name === weekDay && item.value === utcWeekDay)) {
        throwInvalidValue(value);
      }
    }

    const format = this.isoFormat;
    const date = utcFormat({
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    }, format);

    // Check for leap years and number of days per month
    if (!getFormat(date)) {
      throwInvalidValue(value);
    }

    return date;
  }
}

export {
  Locale
};

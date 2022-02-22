import {
  Format as DateFormat
} from './date.js';
import {
  Format as TimeFormat
} from './time.js';
import {
  Format as DateTimeFormat, isValid
} from './datetime.js';
import {
  throwInvalidValue
} from './utils.js';
import {
  utcFormat,
  utcParse,
  Format
} from './shared.js';
import {
  HOURS_OF_NOON,
  HOURS_IN_DAY,
  YEARS_IN_CENTURY
} from './timestamps.js';

// Support weak formatting, when units may start from 0 or 0 can be skipped
// so both values are the same: 01/01/2022 and 1/1/2022
// These expressions are different to one defined for date.js and time.js which are always strict
// Years, covers full year YYYY
const YYYY = '(-?\\d+)';
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
    const format = new Intl.DateTimeFormat(locales, options);
    return new Locale(format);
  }

  public readonly formatter;
  public readonly options;
  public readonly parts: DateTimeFormatPart[];

  private readonly hourCycle;
  private readonly fractionalSecondDigits;

  /**
   * Create the Locale object
   * @param formatter Date time format
   */
  constructor (formatter: Intl.DateTimeFormat) {
    this.formatter = formatter;
    this.options = formatter.resolvedOptions();
    this.parts = formatter.formatToParts(Date.UTC(2018, 0, 1));

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

    const timezone = this.parts.find(part => part.type === 'timeZoneName' && part.value);
    if (timezone) {
      throw new Error('Parsing timezones creates ambiguity. Make sure that `timeZoneName` option is not provided');
    }
  }

  /**
   * Get months names for the specified formatter
   * @returns names Month names
   */
  private formatMonthNames (): string[] {
    if (this.options.month === undefined) {
      throw new Error('Cannot get month names: format does not include month');
    }
    const monthsNames: string[] = [];
    for (let month = 0; month <= 11; month += 1) {
      const date = Date.UTC(2018, month, 1); // January - February
      const part = this.formatter.formatToParts(date).find(part => part.type === 'month');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      monthsNames.push(part!.value); // must be provided
    }
    return monthsNames;
  }

  /**
   * Get weekday names for the specified formatter
   * @returns names Weekday names
   */
  private formatWeekdayNames (): string[] {
    if (this.options.weekday === undefined) {
      throw new Error('Cannot get weekday names: format does not include weekday');
    }
    const weekdayNames: string[] = [];
    for (let day = 1; day <= 7; day += 1) {
      const date = Date.UTC(2018, 0, day); // Monday - Sunday
      const part = this.formatter.formatToParts(date).find(part => part.type === 'weekday');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      weekdayNames.push(part!.value); // must be provided
    }
    return weekdayNames;
  }

  /**
   * Get period names for the specified formatter
   * @returns names Period names
   */
  private formatPeriodNames (): string[] {
    if (!this.options.hour12) {
      throw new Error('Cannot get period names. The format is not 12 hour format');
    }
    const periodNames: string[] = [];
    for (let i = 0; i <= 1; i += 1) {
      const date = Date.UTC(2018, 0, 1, 5 + i * 12); // cover both, h11 & h12. So take the period 6AM - 6PM
      const part = this.formatter.formatToParts(date).find(part => part.type === 'dayPeriod');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      periodNames.push(part!.value); // must be provided
    }
    return periodNames;
  }

  /**
   * Get period names for the specified formatter
   * @returns names Period names
   */
  private formatEraNames (): string[] {
    const eraNames: string[] = [];
    const dates = [utcParse('-0001-01-01').getTime(), Date.UTC(2018, 0, 1)];
    for (let i = 0; i <= 1; i += 1) {
      const part = this.formatter.formatToParts(dates[i]).find(part => part.type === 'era');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      eraNames.push(part!.value); // must be provided
    }
    return eraNames;
  }

  /**
   * Escape list with literals to be used with RegExp
   * @param list A list with items
   * @returns escaped list
   */
  private escapeList (list: string[]): string {
    return `(${list.map(item => regExpEscape(item)).join('|')})`;
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
          str += this.escapeList([part.value]);
          break;
        case 'era':
          str += this.escapeList(this.eraNames);
          break;
        default:
          // Keep it in case the new format comes along
          throw new Error(`Unsupported format: ${part.type}`);
      }
    }

    this._regExp = new RegExp(`^${str}$`);
    return this._regExp;
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

  private _monthNames: string[] | null = null;
  /**
   * Get month names
   */
  public get monthNames (): string[] {
    if (this._monthNames) {
      return this._monthNames;
    }
    this._monthNames = this.formatMonthNames();
    return this._monthNames;
  }

  private _weekdayNames: string[] | null = null;
  /**
   * Get weekday names
   */
  public get weekdayNames (): string[] {
    if (this._weekdayNames) {
      return this._weekdayNames;
    }
    this._weekdayNames = this.formatWeekdayNames();
    return this._weekdayNames;
  }

  private _periodNames: string[] | null = null;
  /**
   * Get period names
   */
  public get periodNames (): string[] {
    if (this._periodNames) {
      return this._periodNames;
    }
    this._periodNames = this.formatPeriodNames();
    return this._periodNames;
  }

  private _eraNames: string[] | null = null;
  /**
   * Get era names
   */
  public get eraNames (): string[] {
    if (this._eraNames) {
      return this._eraNames;
    }
    this._eraNames = this.formatEraNames();
    return this._eraNames;
  }

  /**
   * Try to format localised date string into ISO date/time/datetime string
   * Throw an error is value is invalid
   * @param value Localised date
   * @param [referenceDate=0] Reference UTC date or time to resolve ambiguous strings.
   * @returns ISO date/time/datetime string
   */
  public format (value: string, referenceDate: number | Date = 0): string {
    referenceDate = new Date(referenceDate);

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

    let period = -1;
    let era = -1;

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      const match = matches[i + 1]; // regexp 0 is full string
      switch (part.type) {
        case 'year':
          year = Number(match);
          break;
        case 'month':
          if (options.month === Numeric || options.month === TwoDigit) {
            month = Number(match) - 1; // month is 0 based
          }
          else {
            month = this.monthNames.indexOf(match);
          }
          break;
        case 'day':
          day = Number(match);
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
          period = this.periodNames.indexOf(match);
          break;
        case 'era':
          era = this.eraNames.indexOf(match);
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
    switch (this.hourCycle) {
      case 'h24':
        // midnight at 24:00 (h24) = 00:00 (h23)
        hours = hours === HOURS_IN_DAY ? 0 : hours;
        break;
      case 'h12':
        // midnight starting at 12:00 am.
        // 12:00am (h12) = 00:00 (h23)
        // 11:00am (h12) = 11:00 (h23)
        // 12:00pm (h12) = 12:00 (h23)
        // 01:00pm (h12) = 13:00 (h23)
        // 11:00pm (h12) = 23:00 (h23)
        hours = period === 0 && hours === HOURS_OF_NOON ? 0
          : period === 1 && hours < HOURS_OF_NOON ? hours += HOURS_OF_NOON : hours;
        break;
      case 'h11':
        // midnight starting at 00:00 am.
        // 00:00am (h11) = 00:00 (h23)
        // 11:00am (h11) = 11:00 (h23)
        // 00:00pm (h11) = 12:00 (h23)
        // 01:00pm (h11) = 13:00 (h23)
        // 11:00pm (h11) = 23:00 (h23)
        hours = period === 1 ? hours += HOURS_OF_NOON : hours;
        break;
      // no default
    }

    // the result is always minimum required format to calculate the date
    return utcFormat({
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    }, this.isoFormat);
  }

  /**
   * Try to format ISO date/time/datetime string into localised string
   * Throw an error is value is invalid
   * @param value ISO string date/time/datetime
   * @returns localised string
   */
  public formatIso (value: string): string {
    const date = utcParse(value);
    return this.formatter.format(date);
  }

  /**
   * Try to format localised string into datetime format parts
   * Throw an error is value is invalid
   * @param value localised string
   * @returns parts
   */
  public formatToParts (value: string): Intl.DateTimeFormatPart[] {
    const isoDate = this.format(value);
    return this.formatToPartsIso(isoDate);
  }

  /**
   * Try to format ISO date/time/datetime string into datetime format parts
   * Throw an error is value is invalid
   * @param value ISO string date/time/datetime
   * @returns parts
   */
  public formatToPartsIso (value: string): Intl.DateTimeFormatPart[] {
    const date = utcParse(value);
    return this.formatter.formatToParts(date);
  }

  /**
   * Check if passed value is valid
   * @param value Value to check
   * @returns true if value is valid
   */
  public isValid (value: string): boolean {
    try {
      this.format(value);
    }
    catch (error) {
      return false;
    }

    return true;
  }
}

export {
  Locale
};

import {
  parse as parseDate,
  format as formatDate,
  isValidValue as isValidDate,
  isValidView,
  addMonths,
  subMonths
} from '../calendar';

import {
  isValidValue as isValidTime
} from '../time-picker';

/**
 * Check if passed value is valid datetime string, e.g.: 2020-06-30T23:59:59
 * @param value Value to check
 * @returns true if date is valid
 */
const isValidDateTime = (value: string): boolean => {
  const valueSplit = value.split('T');
  return isValidDate(valueSplit[0]) && isValidTime(valueSplit[1]);
};

/**
 * Pad a number with 0
 * @param number Number to pad
 * @param size Size of end string
 * @returns padded string
 */
const pad = (number: number, size: number): string => {
  let s = `${Math.abs(number)}`;
  while (s.length < size) {
    s = '0' + s;
  }
  return `${number < 0 ? '-' : ''}${s}`;
};

/**
 * A helper class to split date time string into date and time segments
 */
class DateTimeSegment {
  /**
   * Create DateTimeSegment from value string
   * @param value Date time value
   * @returns date time segment
   */
  static fromString = (value: string): DateTimeSegment => {
    const valueSplit = value.split('T');
    return new DateTimeSegment(valueSplit[0], valueSplit[1]);
  }

  /**
   * Create DateTimeSegment from another DateTimeSegment
   * @param segment DateTimeSegment
   * @returns cloned date time segment
   */
  static fromDateTimeSegment = (segment: DateTimeSegment): DateTimeSegment => {
    return new DateTimeSegment(segment.dateSegment, segment.timeSegment);
  }

  /**
   * Create new date time segment
   * @param dateSegment Date segment
   * @param timeSegment Time segment
   */
  constructor (dateSegment = '', timeSegment = '') {
    this.dateSegment = dateSegment;
    this.timeSegment = timeSegment;
  }

  /**
   * Date segment in a format '2020-12-31'
   */
  public dateSegment!: string;

  /**
   * Time segment in a format '14:59' or '14:59:59'
   */
  public timeSegment!: string;

  /**
   * Get string value
   */
  public get value (): string {
    const timeSegment = this.timeSegment;
    return `${this.dateSegment}${timeSegment ? `T${timeSegment}` : ''}`;
  }

  /**
   * Get time
   * @returns {number} time
   */
  public getTime (): number {
    const date = this.dateSegment ? parseDate(this.dateSegment) : new Date(0);
    const segments = this.timeSegment.split(':');
    date.setHours(Number(segments.shift()) || 0);
    date.setMinutes(Number(segments.shift()) || 0);
    date.setSeconds(Number(segments.shift()) || 0);
    return date.getTime();
  }

  public toString (): string {
    return this.value;
  }
}

/**
 * Parse date string to Date object
 * Value formats: "yyyy-DD", "yyyy-DD-mm", "yyyy-MM-dd'T'HH:mm", or "yyyy-MM-dd'T'HH:mm:ss"
 * @param value A value string
 * @returns Date object
 */
const parse = (value: string): Date => {
  const isValid = isValidDateTime(value) || isValidDate(value) || isValidView(value);
  if (isValid) {
    return new Date(DateTimeSegment.fromString(value).getTime());
  }

  return new Date(NaN);
};

/**
* Check if passed Date object is valid
* @param date Date to check
* @returns is valid
*/
const isValid = (date: Date): boolean => {
  return !isNaN(date.getTime());
};

/**
* Convert date to Date object
* @param date Date to convert
* @returns Date object
*/
const toDate = (date: string | Date | number): Date => {
  if (typeof date === 'string') {
    return parse(date);
  }
  return typeof date === 'number' ? new Date(date) : date;
};

/**
 * Format Date object to local date string.
 * Output format: "yyyy-MM".
 * @param date A Date object
 * @returns A formatted date or empty string if invalid
 */
const formatToView = (date: Date | number | string): string => {
  date = toDate(date);
  return isValid(date) ? formatDate(date, false) : '';
};

/**
 * Format Date object to local date string.
 * Output format: "yyyy-DD-mm".
 * @param date A Date object
 * @returns A formatted date or empty string if invalid
 */
const formatToDate = (date: Date | number | string): string => {
  date = toDate(date);
  return isValid(date) ? formatDate(date) : '';
};

/**
 * Format Date object to local time string.
 * Output format: "HH:mm" or "HH:mm:ss".
 * @param date Date object
 * @param [includeSeconds=false] true to include seconds
 * @returns A formatted date or empty string if invalid
 */
const formatToTime = (date: Date | number | string, includeSeconds = false): string => {
  date = toDate(date);
  if (!isValid(date)) {
    return '';
  }

  let time = `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}`;

  if (includeSeconds) {
    time += `:${pad(date.getSeconds(), 2)}`;
  }

  return time;
};

/**
 * Format Date object to local datetime string.
 * Output format: "yyyy-MM-dd'T'HH:mm", or "yyyy-MM-dd'T'HH:mm:ss".
 * @param date A Date object
 * @param [includeSeconds=false] true to include seconds
 * @returns A formatted date or empty string if invalid
 */
const formatToDateTime = (date: Date | number | string, includeSeconds = false): string => {
  date = toDate(date);
  return isValid(date) ? `${formatDate(date)}T${formatToTime(date, includeSeconds)}` : '';
};

/**
 * Is the first date after the second one?
 * @param value the date that should be after the other one to return true
 * @param compare the date to compare with
 * @returns the first date is after the second date
 */
const isAfter = (value: string, compare: string): boolean => {
  const date = parse(value);
  const compareDate = parse(compare);
  return date.getTime() > compareDate.getTime();
};

/**
 * Is the first date before the second one?
 * @param value the date that should be before the other one to return true
 * @param compare the date to compare with
 * @returns the first date is before the second date
 */
const isBefore = (value: string, compare: string): boolean => {
  const date = parse(value);
  const compareDate = parse(compare);
  return date.getTime() < compareDate.getTime();
};

/**
 * Get current time string, e.g. "15:36" or "15:36:04"
 * @param [includeSeconds=false] true to include seconds
 * @returns A formatted time string
 */
const getCurrentTime = (includeSeconds = false): string => {
  return formatToTime(new Date(), includeSeconds);
};

export {
  DateTimeSegment,
  isValidDate,
  isValidDateTime,
  getCurrentTime,
  formatToView,
  formatToDate,
  formatToDateTime,
  addMonths,
  subMonths,
  isAfter,
  isBefore,
  formatToTime,
  parse,
  isValidView
};

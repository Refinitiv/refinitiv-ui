import {
  format,
  DateFormat,
  parse,
  TimeFormat,
  toTimeSegment
} from '@refinitiv-ui/utils/date.js';

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
  };

  /**
   * Create DateTimeSegment from another DateTimeSegment
   * @param segment DateTimeSegment
   * @returns cloned date time segment
   */
  static fromDateTimeSegment = (segment: DateTimeSegment): DateTimeSegment => {
    return new DateTimeSegment(segment.dateSegment, segment.timeSegment);
  };

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
    const date = this.dateSegment ? parse(this.dateSegment) : new Date(0);
    const timeSegment = toTimeSegment(this.timeSegment);
    date.setHours(timeSegment.hours);
    date.setMinutes(timeSegment.minutes);
    date.setSeconds(timeSegment.seconds);
    return date.getTime();
  }

  public toString (): string {
    return this.value;
  }
}

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
  return isValid(date) ? format(date, DateFormat.yyyyMM) : '';
};

/**
 * Get current time string, e.g. "15:36" or "15:36:04"
 * @param [includeSeconds=false] true to include seconds
 * @returns A formatted time string
 */
const getCurrentTime = (includeSeconds = false): string => {
  return format(new Date(), includeSeconds ? TimeFormat.HHmmss : TimeFormat.HHmm);
};

export {
  DateTimeSegment,
  getCurrentTime,
  formatToView
};

import {
  format,
  DateFormat,
  TimeFormat,
  toSegment,
  toDateTimeSegment,
  DateTimeSegment
} from '@refinitiv-ui/utils/date.js';

/**
 * Get current datetime segment at midday Local time
 * @returns segment Date time segment
 */
const getCurrentSegment = (): DateTimeSegment => {
  const date = new Date();
  date.setHours(12);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return toDateTimeSegment(date);
};

/**
 * Get Date fraction from Date or DateTime string
 * Output format: "yyyy-MM-dd".
 * @param value Value string
 * @returns date Date string
 */
const formatToDate = (value?: string | null): string => value ? format(toSegment(value), DateFormat.yyyyMMdd) : '';

/**
 * Get Time fraction from DateTime string
 * Output format: "HH:mm" or "HH:mm:ss".
 * @param value Value string
 * @param [includeSeconds=false] true to include seconds
 * @returns time Time string
 */
const formatToTime = (value?: string | null, includeSeconds = false): string => value ? format(toSegment(value), includeSeconds ? TimeFormat.HHmmss : TimeFormat.HHmm) : '';

/**
 * Get Date View fraction from Date or DateTime string
 * Output format: "yyyy-MM".
 * @param value Value string
 * @returns date Date string
 */
const formatToView = (value?: string | null): string => value ? format(toSegment(value), DateFormat.yyyyMM) : '';

/**
 * Check if options have second information
 * @param options Intl DateTime format options
 * @returns hasSeconds true if options have second or millisecond
 */
const hasSeconds = (options: Intl.ResolvedDateTimeFormatOptions): boolean => !!options.second || !!options.fractionalSecondDigits;

/**
 * Check if options have timepicker information
 * @param options Intl DateTime format options
 * @returns hasTimePicker true if options have hour, minute, second or millisecond
 */
const hasTimePicker = (options: Intl.ResolvedDateTimeFormatOptions): boolean => !!options.hour || !!options.minute || hasSeconds(options);

/**
 * Check if options use 12h format
 * @param options Intl DateTime format options
 * @returns hasAmPm true if options use 12h format
 */
const hasAmPm = (options: Intl.ResolvedDateTimeFormatOptions): boolean => !!options.hour12;

/**
 * Check if options have date information
 * @param options Intl DateTime format options
 * @returns hasDatePicker true if options have year, month, day or weekday
 */
const hasDatePicker = (options: Intl.ResolvedDateTimeFormatOptions): boolean => !!options.year || !!options.month || !!options.day || !!options.weekday;

export {
  getCurrentSegment,
  formatToDate,
  formatToTime,
  formatToView,
  hasTimePicker,
  hasSeconds,
  hasDatePicker,
  hasAmPm
};

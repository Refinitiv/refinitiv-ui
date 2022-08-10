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

export {
  getCurrentSegment,
  formatToDate,
  formatToTime,
  formatToView
};

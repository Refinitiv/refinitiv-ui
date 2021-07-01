import {
  DateSegment,
  TimeSegment,
  DateFormat,
  TimeFormat,
  isValidDate,
  isValidTime,
  toTimeSegment,
  toDateSegment
} from './';

import {
  format as formatTime,
  utcFormat as utcFormatTime,
  getFormat as getTimeFormat
} from './time';

import {
  format as formatDate,
  utcFormat as utcFormatDate
} from './date';

import {
  throwInvalidFormat
} from './utils';

/*
* DateTime segment
*/
type Segment = DateSegment & TimeSegment;

/**
 * DateTime format:
 * - yyyy-MM-dd'T'HH:mm (e.g. 1988-04-21T00:00, 0030-04-30T23:59, -0002-12-31T13:32)
 * - yyyy-MM-dd'T'HH:mm:ss (e.g. 1988-04-21T00:00:00, 0030-04-30T23:59:59, -0002-12-31T13:32:30)
 * - yyyy-MM-dd'T'HH:mm:ss.SSS (e.g. 1988-04-21T00:00:00.000, 0030-04-30T23:59:59.999, -0002-12-31T13:32:30.378)
 */
enum Format {
  /**
   * yyyy-MM-dd'T'HH:mm (e.g. 1988-04-21T00:00, 0030-04-30T23:59, -0002-12-31T13:32)
   */
  yyyMMddTHHmm = 'yyyy-MM-dd\'T\'HH:mm',
  /**
   * yyyy-MM-dd'T'HH:mm:ss (e.g. 1988-04-21T00:00:00, 0030-04-30T23:59:59, -0002-12-31T13:32:30)
   */
  yyyMMddTHHmmss = 'yyyy-MM-dd\'T\'HH:mm:ss',
  /**
   * yyyy-MM-dd'T'HH:mm:ss.SSS (e.g. 1988-04-21T00:00:00.000, 0030-04-30T23:59:59.999, -0002-12-31T13:32:30.378)
   */
  yyyMMddTHHmmssSSS = 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'
}

type InputFormat = Format | keyof typeof Format;

/**
 * Split datetime into date and time segments
 * @param value Datetime string
 * @returns object containing date and time
 */
const split = (value: string): { date: string, time: string } => {
  const split = value.split('T');
  return {
    date: split[0],
    time: split[1]
  };
};

/**
 * Try to guess datetime format
 * @param value Value to test
 * @returns format DateTime format
 */
const getFormat = function (value: string): Format | null {
  const { date, time } = split(value);

  if (!date || !time || !isValidDate(date, DateFormat.yyyyMMdd) || !isValidTime(time)) {
    return null;
  }

  const timeFormat = getTimeFormat(time);

  switch (timeFormat) {
    case TimeFormat.HHmmssSSS:
      return Format.yyyMMddTHHmmssSSS;
    case TimeFormat.HHmmss:
      return Format.yyyMMddTHHmmss;
    case TimeFormat.HHmm:
    default:
      return Format.yyyMMddTHHmm;
  }
};

/**
 * Check if passed value is a valid date time string.
 * For instance: 1988-04-21T00:00, 0030-04-30T23:59.59, -0002-12-31T13:32:30.378
 * @param value Value to check
 * @param [format] The format to validate value against. If not defined, try to guess the format
 * @returns value is valid.
 */
const isValid = function (value: string, format?: InputFormat | null): boolean {
  const { date, time } = split(value);
  if (!date || !time || !isValidDate(date, DateFormat.yyyyMMdd) || !isValidTime(time)) {
    return false;
  }

  const timeFormat = getTimeFormat(time);
  format = format || getFormat(value);

  return (timeFormat === TimeFormat.HHmm && format === Format.yyyMMddTHHmm)
    || (timeFormat === TimeFormat.HHmmss && format === Format.yyyMMddTHHmmss)
    || (timeFormat === TimeFormat.HHmmssSSS && format === Format.yyyMMddTHHmmssSSS);
};

/**
 * Get Local/UTC values segments of DateTime object or value string
 * @param value Valid datetime or a string in a format 1988-04-21T00:00, 0030-04-30T23:59.59, -0002-12-31T13:32:30.378
 * @param [isUTC=false] True to get UTC values, false to get Local values
 * @returns Segment
 */
const toSegment = (value: string | Date, isUTC = false): Segment => {
  let date = value;
  let time = value;

  if (typeof value === 'string') {
    const valueSplit = split(value);
    date = valueSplit.date;
    time = valueSplit.time;
  }

  return {
    ...toDateSegment(date, isUTC),
    ...toTimeSegment(time, isUTC)
  };
};

/**
 * @private
 * @param value A valid Date or Segment
 * @param format DateTime format
 * @param isUTC Local or UTC
 * @returns A formatted date time
 */
const formatDateTime = (value: Segment | Date, format: InputFormat, isUTC: boolean): string => {
  const segment: Segment = value instanceof Date ? toSegment(value, isUTC) : value;
  const dateSegment: DateSegment = {
    year: segment.year,
    month: segment.month,
    day: segment.day
  };
  const timeSegment: TimeSegment = {
    hours: segment.hours,
    minutes: segment.minutes,
    seconds: segment.seconds,
    milliseconds: segment.milliseconds
  };

  const dateFormat = DateFormat.yyyyMMdd;
  const date = isUTC ? utcFormatDate(dateSegment, dateFormat) : formatDate(dateSegment, dateFormat);

  let timeFormat: TimeFormat;
  switch (format) {
    case Format.yyyMMddTHHmmssSSS:
      timeFormat = TimeFormat.HHmmssSSS;
      break;
    case Format.yyyMMddTHHmmss:
      timeFormat = TimeFormat.HHmmss;
      break;
    case Format.yyyMMddTHHmm:
      timeFormat = TimeFormat.HHmm;
      break;
    default:
      throw throwInvalidFormat(format);
  }
  const time = isUTC ? utcFormatTime(timeSegment, timeFormat) : formatTime(timeSegment, timeFormat);
  return `${date}T${time}`;
};

/**
 * Format Date or Segment to Local Date Time string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'T'HH:mm'] Date Time format
 * @returns A formatted time
 */
const format = (value: Segment | Date, format: InputFormat = Format.yyyMMddTHHmm): string => formatDateTime(value, format, false);

/**
 * Format Date or Segment to UTC Date Time string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'T'HH:mm'] Date Time format
 * @returns A formatted time
 */
const utcFormat = (value: Segment | Date, format: InputFormat = Format.yyyMMddTHHmm): string => formatDateTime(value, format, true);

/**
 * @private
 * @param value A Date string or Segment
 * @param isUTC Local or UTC
 * @returns A DateTime object
 */
const parseDateTime = (value: string | Segment, isUTC: boolean): Date => {
  if (typeof value === 'string') {
    const valid = isValid(value);
    if (!valid) {
      return new Date(NaN);
    }
    value = toSegment(value, isUTC);
  }

  let date: Date;
  if (isUTC) {
    date = new Date(0);
    date.setUTCFullYear(value.year, value.month, value.day);
    date.setUTCHours(value.hours, value.minutes, value.seconds, value.milliseconds);
  }
  else {
    // the code for Local Dates is inconsistent across different browsers
    date = new Date();
    date.setFullYear(value.year, value.month, value.day);
    date.setHours(value.hours, value.minutes, value.seconds, value.milliseconds);
  }
  return date;
};

/**
 * Get Local Date object from value string or Segment.
 * @param value Value to parse, Segment or 'yyyy-MM-dd\'T\'HH:mm' | 'yyyy-MM-dd\'T\'HH:mm:ss' | 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'
 * @returns parsed date or invalid date
 */
const parse = (value: string | Segment): Date => parseDateTime(value, false);

/**
 * Get UTC Date object from value string or Segment.
 * @param value Value to parse, Segment or 'yyyy-MM-dd\'T\'HH:mm' | 'yyyy-MM-dd\'T\'HH:mm:ss' | 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'
 * @returns parsed date or invalid date
 */
const utcParse = (value: string | Segment): Date => parseDateTime(value, true);

export {
  Segment,
  Format,
  InputFormat,
  getFormat,
  isValid,
  toSegment,
  format,
  utcFormat,
  parse,
  utcParse,
  split
};

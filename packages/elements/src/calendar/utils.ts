export type MonthInfo = {
  days: number;
  month: number;
  year: number;
}

export type DateSegment = {
  year: number;
  month: number;
  date: number;
}

const VIEW_REGEX = /^-?\d{1,}-(0[1-9]|1[0-2])$/;
const VALUE_REGEX = /^-?\d{1,}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/; // validate number of days separately via the table

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

const padYear = (year: number): string => pad(year, year >= 0 ? 4 : 6);
const padMonth = (month: number): string => pad(month + 1, 2);
const padDate = (date: number): string => pad(date, 2);

/**
 * Get values segments of value string
 * @param value Valid value, in a format 2019-12 or 2019-12-31
 * @returns Date segment
 */
const segmentFromString = (value: string): DateSegment => {
  const split = value.split('-');

  if (value.startsWith('-')) { /* must be negative */
    split.shift();
    split[0] = '-' + split[0];
  }

  return {
    year: parseInt(split[0], 10),
    month: parseInt(split[1], 10) - 1,
    date: parseInt(split[2], 10) || 1
  };
};

/**
 * Get Local/UTC values segments of Date object
 * @param value Valid date
 * @param [isUTC=false] True to get UTC values, false to get Local values
 * @returns Date segment
 */
const segmentFromDate = (value: Date, isUTC = false): DateSegment => {
  const year = isUTC ? value.getUTCFullYear() : value.getFullYear();
  const month = isUTC ? value.getUTCMonth() : value.getMonth();
  const date = isUTC ? value.getUTCDate() : value.getDate();
  return { year, month, date: date };
};

/**
 * Format Date or DateSegment object to Local/UTC date string: yyyy-MM-dd. E.g. 2020-06-30.
 * @param value A valid Date or DateSegment object
 * @param [isUTC=false] True to format Date value as UTC date string, false as Local date string
 * @returns A formatted date
 */
const formatToValue = (value: DateSegment | Date, isUTC = false): string => {
  const segment: DateSegment = value instanceof Date ? segmentFromDate(value, isUTC) : value;
  return `${padYear(segment.year)}-${padMonth(segment.month)}-${padDate(segment.date)}`;
};

/**
 * Format Date or DateSegment object to UTC date string: yyyy-MM-dd. E.g. 2020-06-30.
 * @param value A valid Date or DateSegment object
 * @returns A formatted date
 */
const utcFormatToValue = (value: DateSegment | Date): string => formatToValue(value, true);

/**
 * Format Date or DateSegment object to Local/UTC date string: yyyy-MM. E.g. 2020-06.
 * @param value A valid Date or DateSegment object
 * @param [isUTC=false] True to format Date value as UTC view string, false as Local view string
 * @returns A formatted date
 */
const formatToView = (value: DateSegment | Date, isUTC = false): string => {
  const segment: DateSegment = value instanceof Date ? segmentFromDate(value, isUTC) : value;
  return `${padYear(segment.year)}-${padMonth(segment.month)}`;
};

/**
 * Format Date or DateSegment object to UTC date string: yyyy-MM. E.g. 2020-06.
 * @param value A valid Date or DateSegment object
 * @returns A formatted date
 */
const utcFormatToView = (value: DateSegment | Date): string => formatToView(value, true);

/**
 * Get Local/UTC Date object from segment
 * @param segment Segment
 * @param [isUTC=false] True to format segment into UTC date, false into Local date
 * @returns parsed date
 */
const dateFromSegment = (segment: DateSegment, isUTC = false): Date => {
  let date;
  if (isUTC) {
    date = new Date(0);
    date.setUTCFullYear(segment.year, segment.month, segment.date);
    date.setUTCHours(0, 0, 0, 0);
  }
  else {
    // the code for Local Dates is inconsistent across different browsers
    date = new Date();
    date.setFullYear(segment.year, segment.month, segment.date);
    date.setHours(0, 0, 0, 0);
  }
  return date;
};

/**
 * Get UTC Date object from segment
 * @param segment Segment
 * @returns parsed date
 */
const utcDateFromSegment = (segment: DateSegment): Date => dateFromSegment(segment, true);

/**
 * Get number of day in a month
 * @param year A year to check
 * @param month A month to check
 * @returns the number of days in month
 */
const getDaysInMonth = (year: number, month: number): number => {
  const lastDayOfMonth = utcDateFromSegment({ year, month: month + 1, date: 0 });
  return lastDayOfMonth.getUTCDate();
};

/**
 * Get Local/UTC Date object from value string
 * @param value Valid value to parse
 * @param [isUTC=false] True to parse value as UTC, false as Local
 * @returns parsed date
 */
const dateFromString = (value: string, isUTC = false): Date => {
  const segment = segmentFromString(value);
  return dateFromSegment(segment, isUTC);
};

/**
 * Get UTC Date object from value string
 * @param value Valid value to parse
 * @returns parsed date
 */
const utcDateFromString = (value: string): Date => dateFromString(value, true);

/**
 * Return true if value confirms a format of 2019-12
 * @param value Value to check
 * @returns true if value format is correct
 */
const isValidView = (value: string): boolean => {
  return VIEW_REGEX.test(value);
};

/**
 * Return true if value confirms a format of 2019-12-31
 * @param value Value to check
 * @returns true if value format is correct
 */
const isValidValue = (value: string): boolean => {
  const res = VALUE_REGEX.test(value);
  if (res) { // number of days
    const segment = segmentFromString(value);
    return segment.date <= getDaysInMonth(segment.year, segment.month);
  }
  return res;
};

/**
 * Are the given dates in the same day?
 * @param value the first date to check
 * @param compare the second date to check
 * @returns the dates are in the same day
 */
const isSameDay = (value: string, compare: string): boolean => {
  const valueSegment = segmentFromString(value);
  const compareSegment = segmentFromString(compare);
  return valueSegment.year === compareSegment.year && valueSegment.month === compareSegment.month && valueSegment.date === compareSegment.date;
};

/**
 * Are the given dates in the same month?
 * @param value the first date to check
 * @param compare the second date to check
 * @returns the dates are in the same month
 */
const isSameMonth = (value: string, compare: string): boolean => {
  const valueSegment = segmentFromString(value);
  const compareSegment = segmentFromString(compare);
  return valueSegment.year === compareSegment.year && valueSegment.month === compareSegment.month;
};

/**
 * Are the given dates in the same year?
 * @param value the first date to check
 * @param compare the second date to check
 * @returns the dates are in the same year
 */
const isSameYear = (value: string, compare: string): boolean => {
  const valueSegment = segmentFromString(value);
  const compareSegment = segmentFromString(compare);
  return valueSegment.year === compareSegment.year;
};

/**
 * Is the given date today?
 * @param value the date to check
 * @returns the date is today
 */
const isToday = (value: string): boolean => {
  const today = formatToValue(new Date()); // must be local time
  return isSameDay(value, today);
};

/**
 * Is the given date this month?
 * @param value the date to check
 * @returns the date is this month
 */
const isThisMonth = (value: string): boolean => {
  const today = formatToValue(new Date()); // must be local time
  return isSameMonth(value, today);
};

/**
 * Is the given date this year?
 * @param value the date to check
 * @returns the date is this year
 */
const isThisYear = (value: string): boolean => {
  const today = formatToValue(new Date()); // must be local time
  return isSameYear(value, today);
};

/**
 * Add the specified number of months to the given date
 * @param value the date to be changed
 * @param amount the amount of months to be added
 * @returns the new date with the months added
 */
const addMonths = (value: string, amount: number): string => {
  if (!amount) {
    return value;
  }

  const date = utcDateFromString(value);
  const dayOfMonth = date.getUTCDate();
  const endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setUTCMonth(date.getUTCMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getUTCDate();

  if (dayOfMonth >= daysInMonth) {
    return utcFormatToValue(endOfDesiredMonth);
  }
  else {
    date.setUTCFullYear(endOfDesiredMonth.getUTCFullYear(), endOfDesiredMonth.getUTCMonth(), dayOfMonth);
    return utcFormatToValue(date);
  }
};

/**
 * Subtract the specified number of months to the given date
 * @param value the date to be changed
 * @param amount the amount of months to be subtracted
 * @returns the new date with the months subtracted
 */
const subMonths = (value: string, amount: number): string => {
  return addMonths(value, -amount);
};

/**
 * Does the given date fall on a weekend?
 * @param value the date to check
 * @returns the date falls on a weekend
 */
const isWeekend = (value: string): boolean => {
  const date = utcDateFromString(value);
  const day = date.getUTCDay();
  return day === 0 || day === 6;
};

/**
 * Is the first date after the second one?
 * @param value the date that should be after the other one to return true
 * @param compare the date to compare with
 * @returns the first date is after the second date
 */
const isAfter = (value: string, compare: string): boolean => {
  const date = utcDateFromString(value);
  const compareDate = utcDateFromString(compare);
  return date.getTime() > compareDate.getTime();
};

/**
 * Is the first date before the second one?
 * @param value the date that should be before the other one to return true
 * @param compare the date to compare with
 * @returns the first date is before the second date
 */
const isBefore = (value: string, compare: string): boolean => {
  const date = utcDateFromString(value);
  const compareDate = utcDateFromString(compare);
  return date.getTime() < compareDate.getTime();
};

/**
 * Get information about number of days, month number and year from date object
 * @param value Date string
 * @returns Month information object
 */
const monthInfo = (value: string): MonthInfo => {
  const segment = segmentFromString(value);
  const year = segment.year;
  const month = segment.month;
  return {
    days: getDaysInMonth(year, month),
    month,
    year
  };
};

/**
 * Format Local/UTC Date object to date string.
 * Supported formats: "yyyy-MM-dd" (e.g. 2020-06-30, 0030-04-30, -0002-12-31) or "yyyy-MM" (e.g. 2020-06, 0030-04, -0002-12).
 * @param date A valid date object
 * @param [includeDate=true] True if date should be included
 * @param [isUTC=false] True to format date as UTC, false as Local
 * @returns A formatted date
 */
const format = (date: Date, includeDate = true, isUTC = false): string => includeDate ? formatToValue(date, isUTC) : formatToView(date, isUTC);

/**
 * Format UTC Date object to date string.
 * Supported formats: "yyyy-MM-dd" (e.g. 2020-06-30, 0030-04-30, -0002-12-31) or "yyyy-MM" (e.g. 2020-06, 0030-04, -0002-12).
 * @param date A valid date object
 * @param [includeDate=true] True if date should be included
 * @returns A formatted date
 */
const utcFormat = (date: Date, includeDate = true): string => format(date, includeDate, true);

/**
 * Get Local/UTC Date object from value string.
 * Supported formats: "yyyy-MM-dd" or "yyyy-MM".
 * @param value Value to parse
 * @param [isUTC=false] True to parse string into UTC date, false into Local date
 * @returns parsed date or invalid date
 */
const parse = (value: string, isUTC = false): Date => {
  const isValid = isValidValue(value) || isValidView(value);
  if (!isValid) {
    return new Date(NaN);
  }

  return dateFromString(value, isUTC);
};

/**
 * Get UTC Date object from value string.
 * Supported formats: "yyyy-MM-dd" or "yyyy-MM".
 * @param value Value to parse
 * @returns parsed date or invalid date
 */
const utcParse = (value: string): Date => parse(value, true);

export {
  monthInfo,
  getDaysInMonth,
  isValidView,
  isValidValue,
  segmentFromString,
  format,
  parse,
  utcDateFromSegment,
  utcFormatToValue,
  utcFormatToView,
  utcFormat,
  utcParse,
  utcDateFromString,
  isWeekend,
  isAfter,
  isBefore,
  addMonths,
  subMonths,
  isToday,
  isThisMonth,
  isThisYear,
  isSameDay,
  isSameMonth,
  isSameYear
};

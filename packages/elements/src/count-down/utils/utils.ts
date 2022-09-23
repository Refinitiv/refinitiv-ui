const TIME_UNITS_IN_MS: Record<Intl.RelativeTimeFormatUnit, number> = {
  year: 31536000000,
  years: 31536000000,
  quarter: 7884000000,
  quarters: 7884000000,
  month: 2628000000,
  months: 2628000000,
  week: 604800000,
  weeks: 604800000,
  day: 86400000,
  days: 86400000,
  hour: 3600000,
  hours: 3600000,
  minute: 60000,
  minutes: 60000,
  second: 1000,
  seconds: 1000
};


// the probably needs a polyfill for IE11, not sure if we want to add more polyfills to the project 🤷‍♀️
// so I've added a fallback function. This does mean its always in english though
/**
 * Format display counter value
 *
 * *returns {Function} instance
 */
const rtf = (function () {
  try {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  }
  catch (e) {
    return {
      format: (value: number, unit: Intl.RelativeTimeFormatUnit) => {
        return `${value} ${unit}`;
      }
    };
  }
})();

/**
 * Returns the relative time unit for the given elapsed time in milliseconds
 * @param remainingMs Elapsed time in milliseconds
 * @returns {string} value unit
 */
const getRelativeTimeUnit = (remainingMs: number): Intl.RelativeTimeFormatUnit => {
  for (const unit in TIME_UNITS_IN_MS) {
    if (Math.abs(remainingMs) > TIME_UNITS_IN_MS[unit as Intl.RelativeTimeFormatUnit]) {
      return unit as Intl.RelativeTimeFormatUnit;
    }
  }
  return 'second';
};

/**
 * Format display count down value
 * @param elapsedMs value to format
 * @returns {string} formatted value
 */
const getFormattedElapsedTime = (elapsedMs: number): string => {
  const unit = getRelativeTimeUnit(elapsedMs);
  const value = Math.round(elapsedMs / TIME_UNITS_IN_MS[unit]);
  return rtf.format(value, unit);
};

/**
 * Check if passed value is a valid number
 * @param value Value to check
 * @returns {boolean} false if value is invalid
 */
const isValidNumber = (value: string): boolean => {
  const number = Number(value);
  return !isNaN(number) && isFinite(number) && number >= 0;
};

/**
 * Format display counter value
 * @param milliseconds value to format
 * @returns {string} formatted value
 */
const formatValue = (milliseconds: number): string => {
  if (milliseconds <= 0) {
    // we may get a minus number if the timer is not synchronised
    return getFormattedElapsedTime(0);
  }
  return getFormattedElapsedTime(milliseconds);
};


export {
  isValidNumber,
  formatValue,
  getFormattedElapsedTime
};

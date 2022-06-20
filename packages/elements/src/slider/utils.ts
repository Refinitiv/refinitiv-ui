/**
  * Set prevent default action and stop bubbles event
  * @param event event mouse or touch
  * @returns {void}
  */
const preventDefault = (event: Event): Event => {
  event.preventDefault();
  event.stopPropagation();
  return event;
};

/**
   * Return value that never exceed the maximum boundary
   * @param value value for check clamp
   * @param min max value
   * @param max min value
   * @returns number between two numbers
   */
const clamp = function (value: number, min: number, max: number): string {
  return Math.max(min, Math.min(value, max)).toString();
};

/**
 * Check if number is a decimal number
 * @param value value for checking
 * @returns true if value is decimal
 */
const isDecimalNumber = (value: number): boolean => {
  return value % 1 !== 0;
};

/**
 * Count decimal number
 * @param value value for checking
 * @returns number of decimal points
 */
const countDecimalPlace = (value: string | number): number => {
  return Number(value).toString().split('.')[1]?.length | 0;
};

export { clamp, preventDefault, isDecimalNumber, countDecimalPlace };

/**
   * Return value that never exceed the maximum boundary
   * @param value value for check clamp
   * @param min max value
   * @param max min value
   * @returns number between two numbers
   */
const clamp = function (value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
};

export { clamp };

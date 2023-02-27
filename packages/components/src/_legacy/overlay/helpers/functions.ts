/**
 * Return value if defined or 0 if not defined
 * @param v Value
 * @returns value
 */
const valueOrZero = (v: number | null | undefined): number => v || 0;

/**
 * Parse the string to number or return null if string cannot be parsed
 * @param v Value
 * @returns value
 */
const valueOrNull = (v: string): number | null => {
  const parsed = parseFloat(v);
  return isNaN(parsed) ? null : parsed;
};

export {
  valueOrZero,
  valueOrNull
};

const THOUSAND = { value: 1000, notation: 'K' };
const MILLION = { value: 1e6, notation: 'M' };
const BILLION = { value: 1e9, notation: 'B' };
const TRILLION = { value: 1e12, notation: 'T' };

/**
 * Truncate decimal value
 * @param value A decimal value, either string or number
 * @returns {number} Integer value as number
 */
const truncateDecimal = (value: string | number): number => {
  // stringify the number
  value = typeof value === 'number' ? value.toString() : value;

  // Truncate decimal e.g. '9.9' -> '9'
  return parseInt(value, 10);
};

/**
 * Compute a decimal place of number that will be prefix of the notation
 * @param value A decimal value as number
 * @returns {string} A computed string, either integer or decimal value
 */
const computeDecimalPlace = (value: number): string => {
  // If value is less than 10 and the number after decimal is not 0 e.g. 1.45, return 1 decimal place
  // Else, if the value is greater than 10 or value is less than 10 and the number after decimal is 0 e.g. 1.01, return integer
  if (value < 10 && value % 1 >= 0.1) {
    const splittedNumbers = value.toString().split('.');
    return `${splittedNumbers[0]}.${splittedNumbers[1].substring(0, 1)}`;
  }
  else {
    return truncateDecimal(value).toString();
  }
};

/**
 * Convert a large number to abbreviate numbers if value greater than 999
 * @param value An integer or decimal value as number
 * @returns {string} Formatted value if greater than 999, otherwise return string value
 */
const convertToCompactNotation = (value: number): string => {
  if (value >= TRILLION.value) {
    return `${computeDecimalPlace(value / TRILLION.value)}${TRILLION.notation}`;
  }
  if (value >= BILLION.value) {
    return `${computeDecimalPlace(value / BILLION.value)}${BILLION.notation}`;
  }
  if (value >= MILLION.value) {
    return `${computeDecimalPlace(value / MILLION.value)}${MILLION.notation}`;
  }
  if (value >= THOUSAND.value) {
    return `${computeDecimalPlace(value / THOUSAND.value)}${THOUSAND.notation}`;
  }

  return value.toString();
};

export {
  truncateDecimal,
  convertToCompactNotation
};

/**
 * Combines prefix and a string to give unique item key
 * @param prefix a unique randomly generated string
 * @param value a string of valid item value
 * @returns unique item key
 */
const getItemKey = (prefix: string, value: string): string => {
  const SEPARATOR = '-';

  if (!prefix || !value) {
    return '';
  }

  return `${prefix}${SEPARATOR}${value}`;
};

export { getItemKey };

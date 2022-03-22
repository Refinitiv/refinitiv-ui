/**
 * Combines prefix and a string to give unique item id used by aria-activedescendant
 * @param prefix a unique randomly generated string
 * @param value a string of valid item value
 * @returns a unique item id
 */
const getItemId = (prefix: string, value: string | undefined): string => {
  if (!prefix || !value) {
    return '';
  }

  return `${prefix}-${value}`;
};

export { getItemId };

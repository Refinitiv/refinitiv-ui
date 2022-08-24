/**
 * Returns a string used for the key
 * @param prefix prefix from default
 * @param cacheKey user input key
 * @returns string key for item
 */
const getItemKey = (prefix: string, cacheKey: string): string => `${prefix}[${cacheKey}]`;

export {
  getItemKey
};

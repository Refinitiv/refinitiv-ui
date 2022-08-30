const HEX_REGEXP = /^#([0-9A-F]{3}){1,2}$/i; // used to validate HEX
export const isHex = (value: string): boolean => HEX_REGEXP.test(value);

/**
 * Remove hash (#) sign from hex value
 * @param hex Hex to check
 * @returns hex value without # sign
 */
export const removeHashSign = (hex: string): string => {
  if (hex) {
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }
  }
  return hex;
};

import * as d3 from 'd3-color';

/**
 * Format color to hex format.
 *
 * @param color color string
 * @returns {string} color in hex format
 */
const colorToHex = (color: string): string => {
  const tmpColor = d3.color(color);
  return tmpColor ? tmpColor.formatHex() : color;
};

const helpers = {
  colorToHex
};

export {
  helpers
};

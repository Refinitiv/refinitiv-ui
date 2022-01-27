/* istanbul ignore file */

import { color, rgb, hsl, ColorCommonInstance } from '@refinitiv-ui/utils/color.js';
import { interpolate } from 'd3-interpolate';

/**
 * Check if the color is a light color
 * @param col color to check
 * @returns a boolean indicating whether the color's perceived brightness is light
 */
const isLight = (col: ColorCommonInstance): boolean => {
  const { r, g, b } = rgb(col);
  return ((r * 299 + g * 587 + b * 114) / 1000) > 128;
};

/**
 * Brightens a color
 * @param colorString color string
 * @return a color brighter than original color
 */
const brighten = (colorString: string): string => {
  return color(colorString)?.brighter(0.8).toString() || '';
};

/**
 * Darkens a color
 * @param colorString color string
 * @return a color darker than original color
 */
const darken = (colorString: string): string => {
  const color = hsl(colorString);
  color.s += 0.15; // increasing saturation not to make the color too blackish
  return color.darker(0.6).toString() || '';
};

/**
 * Blends two colors and its background together
 * @param color1 dominant color
 * @param color2 secondary color
 * @param backgroundColor background color
 * @param amount color blending amount
 * @returns a new blended color
 */
const blend = (
  color1: string,
  color2: string,
  backgroundColor: string,
  amount: number
): string => {
  let primaryColor;
  let secondaryColor;

  if (amount >= 0) {
    primaryColor = rgb(color2);
    secondaryColor = rgb(color1);
  }
  else {
    primaryColor = rgb(color1);
    secondaryColor = rgb(color2);
  }

  // when background color is dark -> mix if dominant color is brighter than secondary color
  let mixRedComponent = primaryColor.r > secondaryColor.r;
  let mixGreenComponent = primaryColor.g > secondaryColor.g;
  let mixBlueComponent = primaryColor.b > secondaryColor.b;

  // when background color is light -> mix if dominant color is darker than secondary color
  if (isLight(color(backgroundColor) as ColorCommonInstance)) {
    mixRedComponent = !mixRedComponent;
    mixGreenComponent = !mixGreenComponent;
    mixBlueComponent = !mixBlueComponent;
  }

  const factor = 1 - Math.abs(amount);

  const red = mixRedComponent ? Math.round(interpolate(primaryColor.r, secondaryColor.r)(factor)) : primaryColor.r;
  const green = mixGreenComponent ? Math.round(interpolate(primaryColor.g, secondaryColor.g)(factor)) : primaryColor.g;
  const blue = mixBlueComponent ? Math.round(interpolate(primaryColor.b, secondaryColor.b)(factor)) : primaryColor.b;

  return color(`rgb(${red}, ${green}, ${blue})`)?.toString() || '';
};

export { blend, brighten, darken, isLight, interpolate };

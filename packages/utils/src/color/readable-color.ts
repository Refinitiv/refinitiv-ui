import { colord, extend, Colord } from 'colord';
// eslint-disable-next-line
import hwbPlugin from 'colord/plugins/hwb';
// eslint-disable-next-line
import namesPlugin from 'colord/plugins/names';
extend([hwbPlugin, namesPlugin]);

type NColWB = {
  ncol: string;
  w: number;
  b: number;
}

type ReadableColorType = {
  name: string | undefined,
  tone: string,
  main: string,
  percent: number,
  mixed: string
}

/**
 * Returns key of color tone from color lightness
 * @param color colord object
 * @returns color tone
 */
const getColorTone = (color: Colord): string => {
  const lightness = color.toHsl().l;
  if (lightness >= 80) {
    return 'VERY_LIGHT';
  }
  else if (lightness >= 65) {
    return 'LIGHT';
  }
  else if (lightness <= 10) {
    return 'VERY_DARK';
  }
  else if (lightness <= 40) {
    return 'DARK';
  }
  return '';
};

/**
 * Returns color name and mix color name from ncol code
 * @param ncolCode natural color code
 * @returns color name and mix color name
 */
const getMixColorName = (ncolCode: string): [string, string] => {
  switch (ncolCode) {
    case 'Y':
      return ['YELLOW', 'GREEN'];
    case 'G':
      return ['GREEN', 'CYAN'];
    case 'C':
      return ['CYAN', 'BLUE'];
    case 'B':
      return ['BLUE', 'MAGENTA'];
    case 'M':
      return ['MAGENTA', 'RED'];
    case 'R':
    default:
      return ['RED', 'YELLOW'];
  }
};

/**
 * Convert hue number to ncol code
 * @param hue color hue
 * @returns ncol code
 */
const hueToNcol = (hue: number): string => {
  while (hue >= 360) {
    hue -= 360;
  }
  if (hue < 60) {
    return `R${hue / 0.6}`;
  }
  else if (hue < 120) {
    return `Y${(hue - 60) / 0.6}`;
  }
  else if (hue < 180) {
    return `G${(hue - 120) / 0.6}`;
  }
  else if (hue < 240) {
    return `C${(hue - 180) / 0.6}`;
  }
  else if (hue < 300) {
    return `B${(hue - 240) / 0.6}`;
  }
  else {
    return `M${(hue - 300) / 0.6}`;
  }
};

/**
 * Sort the main color and mix color of color1 and color2 from mixPercent
 * @param color1 string color
 * @param color2 string color
 * @param percent color1 and color2 mix percentage
 * @returns sort of main color and mix color and mixPercent
 */
const sortMixColor = (
  color1: string,
  color2: string,
  percent: number
): [string, string, number] => {
  if (percent > 50) {
    return [color2, color1, 100 - percent];
  }
  else {
    return [color1, color2, percent];
  }
};

/**
 * Returns `true` or `false` if sum of whiteness and blackness is equal 100
 * @param ncolwb natural color with whiteness and blackness
 * @returns Result
 */
const isGreyScale = (ncolwb: NColWB): boolean => {
  return ncolwb.w + ncolwb.b === 100;
};

/**
 * Returns color admixture
 * @param ncolwb natural color with whiteness and blackness
 * @returns main color and mix color and mixPercent
 */
const getColorAdmixture = (ncolwb: NColWB): [string, string, number] => {
  if (isGreyScale(ncolwb)) {
    return sortMixColor('BLACK', 'WHITE', ncolwb.w);
  }
  const ncolCode = ncolwb.ncol[0];
  const percent = parseInt(ncolwb.ncol.slice(1), 10);
  const [main, mixed] = getMixColorName(ncolCode);
  
  return sortMixColor(main, mixed, percent);
};

/**
 * Returns get ncol code with whiteness and blackness
 * @param color colord object
 * @returns ncol code whiteness and blackness
 */
const getNColWB = (color: Colord): NColWB => {
  const { h, w, b } = color.toHwb();
  let ncol = hueToNcol(h);
  ncol = `${ncol[0]}${Math.round(Number(ncol.slice(1)))}`;
  return { ncol, w, b };
};

/**
 * Convert color to readble object
 * @param rawColor raw string color
 * @returns color readable object
 */
const readableColor = (rawColor: string): ReadableColorType => {
  const color = colord(rawColor);
  const ncolwb = getNColWB(color);
  const name = color.toName();
  const [main, mixed, percent] = getColorAdmixture(ncolwb);

  return {
    name,
    tone: !isGreyScale(ncolwb) ? getColorTone(color) : '',
    main,
    mixed,
    percent
  };
};

export {
  readableColor
};

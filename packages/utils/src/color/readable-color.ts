import { colord, extend, Colord } from 'colord';
// eslint-disable-next-line
import hwbPlugin from 'colord/plugins/hwb';
// eslint-disable-next-line
import namesPlugin from 'colord/plugins/names';
extend([hwbPlugin, namesPlugin]);

interface NColWB {
  ncol: string;
  w: number;
  b: number;
}
interface ColorAdmixture {
  main: string;
  percent: number;
  mixed: string;
}

export interface ReadableColor extends ColorAdmixture {
  name: string | undefined;
  tone: string;
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
 * Returns main color name and mixed color name from ncol code
 * @param ncolCode natural color code
 * @returns main color name and mixed color name
 */
const getColorAdmixtureNames = (ncolCode: string): [string, string] => {
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
 * Define the main color and mixed color of color1 and color2 from mixed percent
 * @param color1 string color
 * @param color2 string color
 * @param percent color1 and color2 mixed percentage
 * @returns define of main color and mixed color and mixed percent
 */
const defineMainAndMixedColor = (color1: string, color2: string, percent: number): ColorAdmixture => {
  if (percent > 50) {
    return { main: color2, mixed: color1, percent: 100 - percent };
  }
  return { main: color1, mixed: color2, percent };
};

/**
 * Returns `true` if sum of whiteness and blackness is equal 100
 * @param ncolwb natural color with whiteness and blackness
 * @returns `true` if sum of whiteness and blackness is equal 100
 */
const isGreyScale = (ncolwb: NColWB): boolean => {
  return ncolwb.w + ncolwb.b === 100;
};

/**
 * Returns color admixture
 * @param ncolwb natural color with whiteness and blackness
 * @returns main color and mixed color and mixed percent
 */
const getColorAdmixture = (ncolwb: NColWB): ColorAdmixture => {
  if (isGreyScale(ncolwb)) {
    return defineMainAndMixedColor('BLACK', 'WHITE', ncolwb.w);
  }
  const ncolCode = ncolwb.ncol[0];
  const percent = parseInt(ncolwb.ncol.slice(1), 10);
  const [color1, color2] = getColorAdmixtureNames(ncolCode);
  
  return defineMainAndMixedColor(color1, color2, percent);
};

/**
 * Returns ncol code with whiteness and blackness
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
 * Convert color to ReadableColor object
 * @param rawColor raw string color
 * @returns ReadableColor object
 */
export const readableColor = (rawColor: string): ReadableColor => {
  const color = colord(rawColor);
  const ncolwb = getNColWB(color);
  const name = color.toName();
  const { main, mixed, percent } = getColorAdmixture(ncolwb);
  return {
    name,
    tone: !isGreyScale(ncolwb) ? getColorTone(color) : '',
    main,
    mixed,
    percent
  };
};

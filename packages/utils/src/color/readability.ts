import { colord, extend } from 'colord';
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

type NColLocalized = {
  name: string | undefined,
  tone: string,
  main: string,
  percent: number,
  mixed: string
}

class ReadabilityColor {
  private color;
  private ncolwb: NColWB;

  /**
   * constructor to set default object color
   * @param color string color
   */
  constructor (color: string) {
    this.color = colord(color);
    this.ncolwb = this.getNColWB();
  }

  /**
   * Returns `true` or `false` if sum of whiteness and blackness is equal 100
   * @returns Result
   */
  private get isGreyScale (): boolean {
    return this.ncolwb.w + this.ncolwb.b === 100;
  }

  /**
   * Returns color name and mix color name from ncol code
   * @param ncolCode natural color code
   * @returns color name and mix color name
   */
  private getMixColorName = (ncolCode: string): [string, string] => {
    switch (ncolCode) {
      case 'Y':
        return ['Yellow', 'Green'];
      case 'G':
        return ['Green', 'Cyan'];
      case 'C':
        return ['Cyan', 'Blue'];
      case 'B':
        return ['Blue', 'Magenta'];
      case 'M':
        return ['Magenta', 'Red'];
      case 'R':
      default:
        return ['Red', 'Yellow'];
    }
  };

  /**
   * Returns color tone from color lightness
   * @returns color tone
   */
  private get colorTone (): string {
    const lightness = this.color.toHsl().l;
    if (lightness >= 80) {
      return 'Very Light';
    }
    else if (lightness >= 65) {
      return 'Light';
    }
    else if (lightness <= 10) {
      return 'Very Dark';
    }
    else if (lightness <= 40) {
      return 'Dark';
    }
    return '';
  }

  /**
   * Returns key of color tone from color lightness
   * @returns color tone
   */
  private get colorToneLocalized (): string {
    const lightness = this.color.toHsl().l;
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
  }

  /**
   * Sort the main color and mix color of color1 and color2 from mixPercent
   * @param color1 input color
   * @param color2 input color
   * @param mixPercent color1 and color2 mix percentage
   * @returns sort of main color and mix color and mixPercent
   */
  private sortMixColor = (
    color1: string,
    color2: string,
    mixPercent: number
  ): [string, string, number] => {
    if (mixPercent > 50) {
      return [color2, color1, 100 - mixPercent];
    }
    else {
      return [color1, color2, mixPercent];
    }
  };

  /**
   * Returns color admixture
   * @returns main color and mix color and mixPercent
   */
  private getColorAdmixture = (): [string, string, number] => {
    if (this.isGreyScale) {
      return this.sortMixColor('Black', 'White', this.ncolwb.w);
    }
    const ncolCode = this.ncolwb.ncol[0];
    const ncolMixPercent = parseInt(this.ncolwb.ncol.slice(1), 10);
    const [colorName, colorMixName] = this.getMixColorName(ncolCode);
    
    return this.sortMixColor(colorName, colorMixName, ncolMixPercent);
  };

  /**
   * Convert hue number to ncol code
   * @param hue color hue
   * @returns ncol code
   */
  private hueToNcol = (hue: number): string => {
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
   * Returns get ncol code with whiteness and blackness
   * @returns ncol code whiteness and blackness
   */
  private getNColWB = (): NColWB => {
    const { h, w, b } = this.color.toHwb();
    let ncol = this.hueToNcol(h);
    ncol = `${ncol[0]}${Math.round(Number(ncol.slice(1)))}`;
    return { ncol, w, b };
  };

  /**
   * Convert color to color string description
   * @returns color description
   */
  public toString (): string {
    const name = this.color.toName();
    if (name) {
      return name[0].toUpperCase() + name.slice(1);
    }
    const [colorName, colorMixName, colorMixPercent] = this.getColorAdmixture();
    const colorTone = !this.isGreyScale && this.colorTone ? `[${this.colorTone}] ` : '';
    if (colorMixPercent > 0) {
      return `${colorTone}${colorName} with ${colorMixPercent}% ${colorMixName}`;
    }
    else {
      return `${colorTone}${colorName}`;
    }
  }

  /**
   * Convert color to localized value
   * @returns color localized value
   */
  public toLocalized (): NColLocalized {
    const name = this.color.toName();
    const [colorName, colorMixName, colorMixPercent] = this.getColorAdmixture();
    return {
      name,
      tone: !this.isGreyScale ? this.colorToneLocalized : '',
      main: colorName.toUpperCase(),
      mixed: colorMixName.toUpperCase(),
      percent: colorMixPercent
    };
  }
}

export {
  ReadabilityColor
};

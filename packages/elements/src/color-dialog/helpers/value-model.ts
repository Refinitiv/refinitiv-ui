import { rgb } from '@refinitiv-ui/utils/color.js';
import { isHex } from './color-helpers.js';

const rgbNumberToString = (value: number): string => isNaN(value) ? '' : `${value}`; // replace NaN with empty string

/**
 * A helper model in order to keep and update values between RGB and HEX
 */
class ValueModel {
  private initialValue: string; // kee initial value for comparison

  private _hex: string; // current hex value
  private _red: string; // current RGB red
  private _green: string; // current RGB green
  private _blue: string; // current RGB blue

  /**
   * Create the new value model
   * @param value A valid hex value (e.g. "#ffffff") or an empty string
   */
  constructor (value = '') {
    this.initialValue = value;
    const { r, g, b } = rgb(value);

    this._red = rgbNumberToString(r);
    this._green = rgbNumberToString(g);
    this._blue = rgbNumberToString(b);
    this._hex = value.slice(1);
  }

  private getHexValue (): string {
    if (this.red === '' && this.green === '' && this.blue === '') {
      return '';
    }
    else if (!this.isValidRGB()) {
      return '';
    }

    const hex = rgb(Number(this.red), Number(this.green), Number(this.blue)).formatHex();
    return hex ? hex.slice(1) : '';
  }

  private isValidRGBValue (value: string): boolean {
    return value === '' || Number(value) >= 0 && Number(value) <= 255;
  }

  private isValidHexValue (value: string): boolean {
    return value === '' || isHex(`#${value}`);
  }

  private isValidRGB (): boolean {
    return this.isValidRGBValue(this.red)
      && this.isValidRGBValue(this.green)
      && this.isValidRGBValue(this.blue);
  }

  private isValidHex (): boolean {
    return this.isValidHexValue(this.hex);
  }

  /**
   * Check if new value is different to initial
   * ignoring hex length
   * @returns true if different
   */
  public hasChanged (): boolean {
    return rgb(this.initialValue).formatHex() !== rgb(this.value).formatHex();
  }

  /**
   * Check if RGB and Hex values are valid
   * @returns true if both are valid
   */
  public isValid (): boolean {
    return this.isValidRGB() && this.isValidHex();
  }

  /**
   * Set red color from RGB pallette.
   * Setting this overrides hex
   * @param red Red color, the string number from 0 - 255
   */
  public set red (red: string) {
    this._red = red;
    this._green = this._green || '0';
    this._blue = this._blue || '0';
    this._hex = this.getHexValue();
  }

  /**
   * Get red color from RGB pallette
   */
  public get red (): string {
    return this._red;
  }

  /**
   * Set green color from RGB pallette.
   * Setting this overrides hex
   * @param green Green color, the string number from 0 - 255
   */
  public set green (green: string) {
    this._green = green;
    this._red = this._red || '0';
    this._blue = this._blue || '0';
    this._hex = this.getHexValue();
  }

  /**
   * Get green color from RGB pallette
   */
  public get green (): string {
    return this._green;
  }

  /**
   * Set blue color from RGB pallette.
   * Setting this overrides hex
   * @param blue Blue color, the string number from 0 - 255
   */
  public set blue (blue: string) {
    this._blue = blue;
    this._red = this._red || '0';
    this._green = this._green || '0';
    this._hex = this.getHexValue();
  }

  /**
   * Get blue color from RGB pallette
   */
  public get blue (): string {
    return this._blue;
  }

  /**
   * Set hex value. Setting hex overrides RGB
   * @param hex Hex value, e.g. "ffffff" or "#ffffff"
   */
  public set hex (hex: string) {
    if (!this.isValidHexValue(hex)) {
      this._red = '';
      this._green = '';
      this._blue = '';
    }
    else {
      const { r, g, b } = rgb(`#${hex}`);
      this._red = rgbNumberToString(r);
      this._green = rgbNumberToString(g);
      this._blue = rgbNumberToString(b);
    }

    this._hex = hex;
  }

  /**
   * Get the hex value (hex without #, e.g "ffffff").
   */
  public get hex (): string {
    return this._hex;
  }

  /**
   * Get the value. Value is Hex with #, e.g. "#ffffff"
   */
  public get value (): string {
    return this._hex ? `#${this._hex}` : '';
  }
}

export {
  ValueModel
};

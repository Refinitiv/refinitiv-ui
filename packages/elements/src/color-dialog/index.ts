import {
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  PropertyValues,
  WarningNotice,
  query
} from '@refinitiv-ui/core';
import { styleMap } from 'lit-html/directives/style-map';
import { translate, Translate } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/lib/locale/en/color-dialog';
import { Dialog } from '../dialog';
import { ColorHelpers } from './helpers/color-helpers';
import { ValueModel } from './helpers/value-model';

import type { NumberField } from '../number-field';
import type { TextField } from '../text-field';
import type { Palettes } from './elements/palettes';

import '../button';
import '../number-field';
import '../text-field';
import './elements/color-palettes';
import './elements/grayscale-palettes';

/**
 * Displays a colour picker dialog,
 * for selecting a predefined range of colours.
 * @fires value-changed - Fired when the `value` property changes.
 * @fires opened-changed - Fired when the `opened` property changes.
 *
 * @attr {string|null} header - Set Header/Title of the color dialog
 * @prop {string|null} header - Set Header/Title of the color dialog
 *
 * @attr {boolean} [opened=false] - Set dialog to open
 * @prop {boolean} [opened=false] - Set dialog to open
 *
 * @attr {boolean} [no-cancel-on-esc-key=false] - Prevents dialog to close when user presses ESC key
 * @prop {boolean} [noCancelOnEscKey=false] - Prevents dialog to close when user presses ESC key
 *
 * @attr {string} x - Set a specific x coordinate of dialog
 * @prop {string} x - Set a specific x coordinate of dialog
 *
 * @attr {string} y - Set a specific y coordinate of dialog
 * @prop {string} y - Set a specific y coordinate of dialog
 *
 * @attr {string} position-target - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 * @prop {string} positionTarget - Set position of dialog i.e. `top`, `right`, `left`, `bottom`, `center` or combination of theme e.g. `top right`.
 *
 * @prop {boolean} [noCancelOnOutsideClick=true] - Prevents dialog to close when user clicks outside the dialog.
 *
 * @prop {boolean} [withBackdrop=true] - False to hide backdrop.
 *
 * @prop {boolean} [draggable=true] - False to make the dialog not draggable.
 *
 * @prop {boolean} [withShadow=true] - False to remove shadow for dialog component.
 */
@customElement('ef-color-dialog', {
  alias: 'emerald-color-dialog'
})
export class ColorDialog extends Dialog {
  public static get styles (): CSSResult | CSSResult[] {
    return [...(Dialog.styles as CSSResult[]),
      css`
        :host {
          display: block;
        }
        [part=preview-color][no-color] {
          background: linear-gradient(to bottom right, transparent calc(50% - 2px),
          var(--no-color-line-color, #ff0000) calc(50% - 1px),
          var(--no-color-line-color, #ff0000) calc(50% + 1px),
          transparent calc(50% + 2px));
        }
    `];
  }

  /**
   * speed up rendering by not populating content on page load
   */
  private lazyRendered = false;

  /**
   * Color dialog has commit button to update actual values
   * Value model is used to support this functionality
   */
  private valueModel = new ValueModel();

  /**
  * @ignore
  */
  public draggable = true;

  /**
   * Set the palettes to activate no-color option
   */
  @property({ type: Boolean, attribute: 'allow-nocolor' })
  public allowNocolor = false;

  private _value = '';
  /**
   * Value of selected color from color dialog will be written here as hex value
   * e.g. "#00f" or "#0000ff"
   * @default -
   * @param value A value to set
   */
  @property({ type: String })
  public set value (value: string) {
    value = String(value);
    const oldValue = this._value;
    if (!this.isValidValue(value)) {
      value = '';
    }
    this._value = value;
    void this.requestUpdate('value', oldValue);
  }
  public get value (): string {
    return this._value;
  }

  /**
   * Value of hex without # sign, supports both 3-digits shorthand hex and regular 6-digits hex
   * @default -
   * @param hex A hex value to set
   */
  @property({ type: String })
  public set hex (hex: string) {
    hex = String(hex);
    if (!this.isValidHex(hex)) {
      hex = '';
    }
    this.value = hex ? `#${hex}` : '';
  }
  public get hex (): string {
    const value = this.value;
    return value ? ColorHelpers.removeHashSign(value) : '';
  }

  /**
   * Red value from 0 to 255
   * @default -
   * @param red Red value
   */
  @property({ type: String })
  public set red (red: string) {
    red = String(red);
    this.value = this.isValidRGB(red) ? ColorHelpers.rgbToHex(red, this.green, this.blue) : '';
  }
  public get red (): string {
    return this.hex ? ColorHelpers.hexToRGB(this.hex).red : '';
  }

  /**
   * Green value from 0 to 255
   * @default -
   * @param green Green value
   */
  @property({ type: String })
  public set green (green: string) {
    green = String(green);
    this.value = this.isValidRGB(green) ? ColorHelpers.rgbToHex(this.red, green, this.blue) : '';
  }
  public get green (): string {
    return this.hex ? ColorHelpers.hexToRGB(this.hex).green : '';
  }

  /**
   * Blue value from 0 to 255
   * @default -
   * @param blue Blue value
   */
  @property({ type: String })
  public set blue (blue: string) {
    blue = String(blue);
    this.value = this.isValidRGB(blue) ? ColorHelpers.rgbToHex(this.red, this.green, blue) : '';
  }
  public get blue (): string {
    return this.hex ? ColorHelpers.hexToRGB(this.hex).blue : '';
  }

  /**
   * Used for translations
   */
  @translate()
  protected t!: Translate;

  @query('#redInput') private redInputEl?: NumberField
  @query('#greenInput') private greenInputEl?: NumberField
  @query('#blueInput') private blueInputEl?: NumberField

  /**
   * check if component should be updated
   * @param changedProperties properties changed on shouldUpdate lifecycle callback
   * @returns boolean should component update
   */
  protected shouldUpdate (changedProperties: PropertyValues): boolean {
    const shouldUpdate = super.shouldUpdate(changedProperties);
    return shouldUpdate
      || changedProperties.has('allowNocolor')
      || changedProperties.has('red')
      || changedProperties.has('green')
      || changedProperties.has('blue')
      || changedProperties.has('value')
      || changedProperties.has('hex')
      || changedProperties.has('enableConfirm');
  }

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    if (changedProperties.has('value')) {
      // ensure that the internal values are always in sync when set externally
      this.resetValueModel();
    }

    if (this.opened && changedProperties.has('opened')) {
      this.lazyRendered = true;
    }

    super.update(changedProperties);
  }

  /**
   * @inheritdoc
   * Reset value model
   * @param opened True if opened
   * @returns {void}
   */
  protected setOpened (opened: boolean): void {
    // setOpened is run only from internal context. It is safe to reset it here
    this.resetValueModel();
    super.setOpened(opened);
  }

  /**
   * Reset value model always resets
   * when either red, green, blue, hex or value are changed externally
   * Value model is reset internally otherwise
   * @returns {void}
   */
  private resetValueModel (): void {
    this.valueModel = new ValueModel(this.value);
  }

  /**
   * Check if value is valid HEX value (including #)
   * @param value Value to check
   * @returns true if value is valid
   */
  private isValidValue (value: string): boolean {
    const isValid = value === '' || ColorHelpers.isHex(value);
    if (!isValid) {
      new WarningNotice(`The specified value "${value}" is not valid value. The correct value should look like "#fff" or "#ffffff".`).show();
    }
    return isValid;
  }

  /**
   * Check if value is valid HEX value (excluding #)
   * @param value Value to check
   * @returns true if value is valid
   */
  private isValidHex (value: string): boolean {
    const isValid = value === '' || (!value.includes('#') && ColorHelpers.isHex(`#${value}`));
    if (!isValid) {
      new WarningNotice(`The specified hex "${value}" is not valid color. The correct value should look like "fff" or "ffffff".`).show();
    }
    return isValid;
  }

  /**
   * Check if value is within 0 - 255, and warn of it is not
   * @param value Value to check
   * @returns true if value is within 0 - 255
   */
  private isValidRGB (value: string): boolean {
    const isValid = value === '' || ColorHelpers.isValidDecimalForRGB(value);
    if (!isValid) {
      new WarningNotice(`The specified RGB "${value}" is not valid color. The value should be 0 - 255.`).show();
    }
    return isValid;
  }

  /**
   * update color value when tapping or dragging on color palettes
   * @param event select color event
   * @return {void}
   */
  private onColorChanged (event: Event): void {
    this.valueModel.hex = ColorHelpers.removeHashSign((event.target as Palettes).value);
    void this.requestUpdate();
  }

  /**
   * update hex value when typing on hex input
   * @param event input event
   * @return {void}
   */
  private onHexChanged (event: InputEvent): void {
    this.valueModel.hex = (event.target as TextField).value;
    void this.requestUpdate();
  }

  /**
   * update r,g,b value when typing on RGB inputs
   * @param event input event
   * @return {void}
   */
  private onRGBChanged (event: InputEvent): void {
    const targetElem = event.target;

    if (targetElem === this.redInputEl) {
      this.valueModel.red = this.redInputEl.value;
    }
    else if (targetElem === this.greenInputEl) {
      this.valueModel.green = this.greenInputEl.value;
    }
    else if (targetElem === this.blueInputEl) {
      this.valueModel.blue = this.blueInputEl.value;
    }

    void this.requestUpdate();
  }

  /**
   * set opened state to false
   * @return {void}
   */
  private onCloseDialog (): void {
    this.setOpened(false);
  }

  /**
   * fired value-changed event and close dialog
   * @return {void}
   */
  private onConfirmValue (): void {
    // no need to check for anything, as the button is disabled if not dirty is invalid
    this.value = this.valueModel.value;
    this.notifyPropertyChange('value', this.value);
    this.setOpened(false);
  }

  /**
   * Check if apply button is disabled
   * The button is disabled if value is invalid
   * or value has not changed
   * @returns true if disabled
   */
  private isApplyDisabled (): boolean {
    return this.valueModel.hasChanged() && this.valueModel.isValid() ? this.allowNocolor ? false : this.valueModel.hex === '' : true;
  }

  /**
   * Override the content region
   */
  protected get contentRegion (): TemplateResult {
    if (!this.lazyRendered) {
      return html``;
    }

    return html`
      <div part="content-section">
        <div part="palettes-container">
          <ef-color-palettes
            .value=${this.valueModel.value}
            @value-changed=${this.onColorChanged}
            part="color-palettes">
          </ef-color-palettes>
          <ef-grayscale-palettes
            .value=${this.valueModel.value}
            @value-changed=${this.onColorChanged}
            ?allow-nocolor=${this.allowNocolor}
            part="grayscale-palettes"
            >
          </ef-grayscale-palettes>
        </div>
        <div part="inputs-container">
          <div
            part="preview-color"
            style=${styleMap({
              backgroundColor: this.valueModel.value
            })}
            ?no-color=${!this.valueModel.value}></div>
          <div>${this.t('RED')}&nbsp;:
            <ef-number-field
              .value=${this.valueModel.red}
              @value-changed=${this.onRGBChanged}
              part="color-input"
              min="0"
              max="255"
              no-spinner
              id="redInput"
            ></ef-number-field>
          </div>
          <div>${this.t('GREEN')}&nbsp;:
            <ef-number-field
              .value=${this.valueModel.green}
              @value-changed=${this.onRGBChanged}
              part="color-input"
              min="0"
              max="255"
              no-spinner
              id="greenInput"
            ></ef-number-field>
          </div>
          <div>${this.t('BLUE')}&nbsp;:
            <ef-number-field
              .value=${this.valueModel.blue}
              @value-changed=${this.onRGBChanged}
              part="color-input"
              min="0"
              max="255"
              no-spinner
              id="blueInput"
            ></ef-number-field>
          </div>
          <div>#&nbsp;:
            <ef-text-field
              .value=${this.valueModel.hex}
              @value-changed=${this.onHexChanged}
              pattern="^([0-9a-fA-F]{3}){1,2}$"
              part="color-input"
              id="hexInput"
              maxlength="6">
            </ef-text-field>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Override the footer region
   */
  protected get footerRegion (): TemplateResult {
    if (!this.lazyRendered) {
      return html``;
    }

    return html`
      <ef-button
        id="confirmButton"
        part="button"
        cta
        @tap=${this.onConfirmValue}
        ?disabled=${this.isApplyDisabled()}>${this.t('APPLY')}</ef-button>
      <ef-button
        id="closeButton"
        @tap=${this.onCloseDialog}
        part="button">${this.t('CLOSE')}</ef-button>
    `;
  }
}

import {
  ControlElement,
  html,
  css,
  PropertyValues,
  TemplateResult,
  TapEvent,
  CSSResult,
  WarningNotice
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import type { OpenedChangedEvent, ValueChangedEvent } from '../events';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { styleMap } from '@refinitiv-ui/core/directives/style-map.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { VERSION } from '../version.js';
import '../color-dialog/index.js';
import { isHex } from '@refinitiv-ui/utils/color.js';
import { ColorDialog } from '../color-dialog/index.js';
import '@refinitiv-ui/phrasebook/locale/en/color-picker.js';

const DIALOG_POSITION = ['right-start', 'right-end', 'right-middle', 'left-start', 'left-end', 'left-middle'];

/**
 *
 * Color picker control
 * @fires value-changed - Dispatched when value changes
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
@customElement('ef-color-picker', {
  alias: 'emerald-color-picker'
})
export class ColorPicker extends ControlElement {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Set the color dialog to activate no-color option
   */
  @property({ type: Boolean, attribute: 'allow-nocolor' })
  public allowNocolor = false;

  /**
   * Set lang to color dialog
   * @ignore
   */
  @property({ type: String })
  public lang = '';

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: inline-block;
      }
      [part=color-item][no-color] {
        background: linear-gradient(to bottom right, transparent calc(50% - 1px),
        var(--no-color-line-color, #ff0000) calc(50% - 1px),
        var(--no-color-line-color, #ff0000) calc(50% + 1px),
        transparent calc(50% + 1px));
      }
    `;
  }

  private lazyRendered = false; /* speed up rendering by not populating color dialog on first load */

  /**
   * Toggles the opened state of the dialog
   */
  @property({ type: Boolean, reflect: true })
  public opened = false;

  @query('[part=dialog]') private dialogEl?: ColorDialog | null;

  /**
   * Check if value is valid HEX value (including #)
   * @param value Value to check
   * @returns true if value is valid
   */
  protected isValidValue (value: string): boolean {
    return value === '' || isHex(value);
  }

  /**
   * Used to show a warning when the value does not pass the validation
   * @param value that is invalid
   * @returns {void}
   */
  protected warnInvalidValue (value: string): void {
    new WarningNotice(`The specified value "${value}" is not valid value. The correct value should look like "#fff" or "#ffffff".`).show();
  }

  /**
   * Return true if popup can be opened
   */
  private get canOpenPopup (): boolean {
    return !(this.disabled || this.readonly);
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('tap', this.onTap);
    this.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    if (changedProperties.has('opened') && this.opened) {
      this.lazyRendered = true;
    }
    // make sure to close dialog for disabled
    if (this.opened && !this.canOpenPopup) {
      this.opened = false; /* this cannot be nor stopped nor listened */
    }

    super.update(changedProperties);
  }

  /**
   * Run on tap event
   * @param event Tap event
   * @returns {void}
   */
  private onTap (event: TapEvent): void {
    const path = event.composedPath();
    if ((this.dialogEl && path.includes(this.dialogEl)) || event.defaultPrevented) {
      return; /* dialog is managed separately */
    }
    this.setOpened(!this.opened);
  }

  /**
   * Handles key input on color picker
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar':
        this.setOpened(true);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  /**
   * Set opened state with event
   * @param opened True if opened
   * @returns {void}
   */
  private setOpened (opened: boolean): void {
    if (opened && !this.canOpenPopup) { /* never allow to open popup if cannot do so */
      return;
    }
    if (this.opened !== opened) {
      this.opened = opened;
    }
  }

  /**
   * Run on color dialog value-changed event
   * @param event value-changed event
   * @returns {void}
   */
  private onColorDialogValueChanged (event: ValueChangedEvent): void {
    const value = event.detail.value;
    this.value = value;
    this.setAttribute('value', this.value);
    this.notifyPropertyChange('value', this.value);
    this.setOpened(false);
  }

  /**
   * Run on color dialog opened-changed event
   * @param event opened-changed event
   * @returns {void}
   */
  private onColorDialogOpenedChanged (event: OpenedChangedEvent): void {
    this.setOpened(event.detail.value);
  }

  /**
   * Color dialog template
   */
  private get dialogTemplate (): TemplateResult | undefined {
    if (this.lazyRendered) {
      return html`<ef-color-dialog
      offset="4"
      part="dialog"
      .lang=${ifDefined(this.lang || undefined)}
      .value=${this.value}
      .focusBoundary=${this}
      .positionTarget=${this}
      .position=${DIALOG_POSITION}
      ?opened=${this.opened}
      ?allow-nocolor=${this.allowNocolor}
      @opened-changed=${this.onColorDialogOpenedChanged}
      @value-changed=${this.onColorDialogValueChanged}></-color-dialog>`;
    }
  }

  /**
   * Color item template
   */
  private get colorItemTemplate (): TemplateResult | undefined {
    return html`<div part="color-item" ?no-color=${!this.value} style=${styleMap({ backgroundColor: this.value })}></div>`;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.colorItemTemplate}
      ${this.dialogTemplate}
      `;
  }
}

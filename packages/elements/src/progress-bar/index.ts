import {
  css,
  html,
  property,
  customElement,
  styleMap,
  CSSResult,
  TemplateResult,
  BasicElement,
  DeprecationNotice,
  PropertyValues
} from '@refinitiv-ui/core';

/**
 * Data visualisation component,
 * showing a simple percentage bar.
 * @slot label - Overrides the label property and places custom content. Useful for modifying the color, or, adding icons.
 */
@customElement('ef-progress-bar')
export class ProgressBar extends BasicElement {

  private valuePrevious = '';

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult {
    return css`
    :host {
      height: 10px;
      display: flex;
      position: relative;
    }
    [part~=bar] {
      height: 100%;
      position: relative;
    }
    [part=label] {
      position: absolute;
      top: 50%;
      left: 100%;
      height: 0;
      line-height: 0;
      white-space: nowrap;
      margin-left: 10px;
    }
    :host([alignment=right]) {
      justify-content: flex-end;
    }
    :host([alignment=right]) [part=label] {
      left: auto;
      right: 100%;
      margin-left: 0;
      margin-right: 10px;
    }
    :host [part~=bar-zero] [part=label] {
      margin: 0;
    }
    `;
  }

  /**
   * The current value of the bar.
   * This can range from `0-100` and
   * will be represented as a percentage bar
   */
  @property({ type: String })
  public value = '100';

  /**
   * The alignment of the bar.
   * The bar can either start from the `left` or `right`.
   */
  @property({ type: String, reflect: true })
  public alignment = 'left';

  /**
   * The current label to be displayed next to the bar.
   * This is affixed to the end of the bar, so make sure to cater for this.
   */
  @property({ type: String })
  public label = '';

  /**
   * Deprecation noticed, used to display a warning message
   * when deprecated features are used.
   */
  private deprecationNotice = new DeprecationNotice(
    '--bar-color variable has been deprecated in favour of using the standard color property.'
  );

  /**
   * Converts value from string to number for calculations
   * @returns value of bar as a number
   */
  private get valueNumber (): number {
    const value = parseFloat(this.value);
    if (!this.value || isNaN(value)) { // check value is invalid
      const valuePrevious = parseFloat(this.valuePrevious);
      // if valuePrevious is invalid return default value 100
      return !valuePrevious || isNaN(valuePrevious) ? 100 : valuePrevious;
    }

    return value;
  }

  /**
   * Checks to see if any deprecated features are being used
   * and warns against them, providing an updated approach.
   * @returns {void}
   */
  private checkAndWarnAboutDeprecations (): void {
    if (!this.deprecationNotice.shown && this.getComputedVariable('--bar-color')) {
      this.deprecationNotice.show();
    }
  }

  /**
   * Gets the current part names for the internal bar
   */
  private get barParts (): string {
    return this.barFill ? 'bar' : 'bar bar-zero';
  }

  /**
   * Calculates the bar's percentage width
   */
  private get barFill (): number {
    return Math.min(100, Math.max(0, this.valueNumber));
  }

  /**
   * Returns CSS styles for showing
   * the bar's fill percentage.
   */
  private get barStyle (): { width: string, minWidth: string} {
    return {
      width: `${this.barFill}%`,
      minWidth: `${this.barFill ? 1 : 0}px`
    };
  }

  /**
   * Called after an update has occurred
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    this.checkAndWarnAboutDeprecations();
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'value') {
        this.valuePrevious = oldValue as string;
        this.value = this.valueNumber.toString();
      }
    });
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
    <div part="${this.barParts}" style="${styleMap(this.barStyle)}">
      <span part="label">
        <slot name="label">${this.label}</slot>
      </span>
    </div>
    `;
  }
}

import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { VERSION } from '../../version.js';
import '../../progress-bar/index.js';
import '../../layout/index.js';

/**
 * A part of <ef-tornado-chart />,
 * consists mainly of primary, secondary ef-progress-bar and labels.
 */
@customElement('ef-tornado-item')
export class TornadoItem extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Internal vertical flag value, used only by its getter and setter
   */
  private _vertical = false;

  /**
   * Getter for toggling bar chart alignment
   * @returns {boolean} true if component is in vertical mode
   */
  @property({ type: Boolean, reflect: true })
  public get vertical (): boolean {
    return this._vertical;
  }

  /**
   * Setter for toggling bar chart alignment
   * @param {boolean} value vertical
   */
  public set vertical (value: boolean) {
    const previousValue = this._vertical;

    if (value === previousValue) {
      return;
    }

    this._vertical = value;

    /**
     * Observe when vertical property changes,
     * then toggle between alignments
     */
    if (value) {
      this.showVerticalMode();
    }
    else {
      this.showHorizontalMode();
    }

    this.requestUpdate('vertical', previousValue);
  }

  /**
   * Display highlight styles onto the item
   */
  @property({ type: Boolean, reflect: true })
  public highlighted = false;

  /**
   * Primary bar chart's value
   */
  @property({ type: String, attribute: 'primary-value' })
  public primaryValue: string | null = null;

  /**
   * Primary bar chart's label
   */
  @property({ type: String, attribute: 'primary-label' })
  public primaryLabel: string | null = null;

  /**
   * Secondary bar chart's value
   */
  @property({ type: String, attribute: 'secondary-value' })
  public secondaryValue: string | null = null;

  /**
   * Secondary bar chart's label
   */
  @property({ type: String, attribute: 'secondary-label' })
  public secondaryLabel: string | null = null;

  /**
   * A flag to determine container layout state
   */
  private isContainer = false;

  /**
   * Primary bar chart alignment
   */
  private primaryBarAlignment: 'left' | 'right' = 'right';

  /**
   * Secondary bar chart alignment
   */
  private secondaryBarAlignment: 'left' | 'right' = 'left';

  /**
   * Label container's size
   */
  private labelLayoutSize: string | undefined = '25%';

  /**
   * Primary layout flex basis size
   */
  private primaryLayoutFlexBasis: string | undefined = '40%';

  /**
   * Secondary layout flex basis size
   */
  private secondaryLayoutFlexBasis: string | undefined = '40%';

  /**
   * Triggers vertical layout mode
   * @returns {void}
   */
  private showVerticalMode (): void {
    this.isContainer = true;
    this.labelLayoutSize = undefined;
    this.primaryLayoutFlexBasis = undefined;
    this.secondaryLayoutFlexBasis = undefined;

    this.primaryBarAlignment = 'left';
    this.secondaryBarAlignment = 'left';
  }

  /**
   * Triggers horizontal layout mode
   * @returns {void}
   */
  private showHorizontalMode (): void {
    this.isContainer = false;
    this.labelLayoutSize = '25%';
    this.primaryLayoutFlexBasis = '40%';
    this.secondaryLayoutFlexBasis = '40%';

    this.primaryBarAlignment = 'right';
    this.secondaryBarAlignment = 'left';
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      :host([vertical]) [part=seperator] {
        display: none;
      }
      :host([vertical]) [part=container] {
        align-items: inherit;
      }
      [part=container] {
        padding: 0;
        align-items: center;
      }
      [part=primary-bar],
      [part=secondary-bar] {
        width: 100%;
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <ef-layout part="container" flex nowrap ?container="${this.isContainer}">
        <ef-layout flex size="${ifDefined(this.labelLayoutSize)}">
          <div part="label">
            <slot></slot>
          </div>
        </ef-layout>
        <ef-layout flex basis="${ifDefined(this.primaryLayoutFlexBasis)}">
          <ef-progress-bar
            part="primary-bar"
            alignment=${this.primaryBarAlignment}
            label="${ifDefined(this.primaryLabel || undefined)}"
            value="${ifDefined(this.primaryValue || undefined)}">
          </ef-progress-bar>
        </ef-layout>
        <div part="seperator"></div>
        <ef-layout flex basis="${ifDefined(this.secondaryLayoutFlexBasis)}">
          <ef-progress-bar
            part="secondary-bar"
            alignment="${this.secondaryBarAlignment}"
            label="${ifDefined(this.secondaryLabel || undefined)}"
            value="${ifDefined(this.secondaryValue || undefined)}">
          </ef-progress-bar>
        </ef-layout>
      </ef-layout>
    `;
  }
}

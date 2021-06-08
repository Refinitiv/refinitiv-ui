import {
  html,
  css,
  customElement,
  property,
  CSSResult,
  ControlElement,
  TemplateResult,
  PropertyValues,
  query,
  TapEvent
} from '@refinitiv-ui/core';
import {
  registerOverflowTooltip
} from '../tooltip';
import {
  applyRegistry,
  removeFromRegistry,
  getRadioGroup
} from './radio-button-registry';

/**
 * Basic radio button
 *
 * @fires checked-changed - Fired when the `checked` property changes.
 *
 * @attr {string} [value=] - Value of the radio button
 * @prop {string} [value=] - Value of the radio button
*
 * @attr {string} [name=] - Group multiple radio buttons by assigning the same name
 * @prop {string} [name=] - Group multiple radio buttons by assigning the same name
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
@customElement('ef-radio-button', {
  alias: 'coral-radio-button'
})
export class RadioButton extends ControlElement {

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: inline-block;
      }
      [part=check] {
        visibility: hidden;
      }
      :host([checked]) [part=check] {
        visibility: inherit;
      }
      [part=label],
      [part=container] {
        display: inline-block;
        white-space: nowrap;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :host(:empty) [part=label], [part=label]:empty {
        display: none;
      }
    `;
  }

  /**
   * Radio button checked state
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Getter for label
   */
  @query('[part=label]', true)
  private labelEl!: HTMLElement;

  /**
   * Called when connected to DOM
   * @returns {void}
   */
  public connectedCallback (): void {
    super.connectedCallback();
    applyRegistry(this);
    this.manageGroupState();
  }

  /**
   * Called when disconnected from DOM
   * @returns {void}
   */
  public disconnectedCallback (): void {
    removeFromRegistry(this);
    super.disconnectedCallback();
  }

  /**
   * Invoked whenever the element is update
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    if (this.isConnected && this.hasUpdated && changedProperties.has('name')) {
      applyRegistry(this);
    }

    // Ensure only one radio button is checked
    if (this.isConnected && this.hasUpdated && (changedProperties.has('checked') || (changedProperties.has('name')))) {
      this.manageGroupState();
    }

    super.update(changedProperties);
  }

  /**
   * Invoked when the element is first updated
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('tap', event => this.onTap(event as TapEvent));
    this.addEventListener('keydown', event => this.onKeyDown(event));

    registerOverflowTooltip(this.labelEl, () => this.textContent);
  }

  /**
   * Manage group members state, when either one is being checked
   * @returns {void}
   */
  private manageGroupState (): void {
    if (this.checked && this.name) {
      getRadioGroup(this).filter(radio => radio !== this).forEach(radio => {
        radio.checked = false; // unchecking the rest of the group members
      });
    }
  }

  /**
   * Run when radio button is tapped
   * @param event Tap event
   * @returns {void}
   */
  private onTap (event: TapEvent): void {
    if (this.disabled || this.readonly || event.defaultPrevented) {
      return;
    }

    this.handleChangeChecked();
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (this.disabled || this.readonly || event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar':
        this.handleChangeChecked();
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Change checked state and fire
   * checked-changed event
   * @return {void}
   */
  private handleChangeChecked (): void {
    // Once checked, radio button cannot be unchecked
    if (!this.checked) {
      this.checked = true;
      this.notifyPropertyChange('checked', this.checked);
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div part="container">
        <div part="check"></div>
      </div>
      <div part="label"><slot></slot></div>
    `;
  }
}

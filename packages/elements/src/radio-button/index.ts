import {
  html,
  css,
  CSSResultGroup,
  ControlElement,
  TemplateResult,
  PropertyValues,
  TapEvent
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { query } from '@refinitiv-ui/core/lib/decorators/query.js';
import { VERSION } from '../version.js';
import {
  registerOverflowTooltip
} from '../tooltip/index.js';
import {
  applyRegistry,
  removeFromRegistry,
  getRadioGroup
} from './radio-button-registry.js';

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
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }
  
  /**
  * Element's role attribute for accessibility
  */
  protected readonly defaultRole = 'radio';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
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
   * @param value checked state
   * @returns {void}
   */
  @property({ type: Boolean, reflect: true })
  public set checked (value: boolean) {
    const oldValue = this._checked;
    if (oldValue !== value) {
      this._checked = value;

      this.ariaChecked = String(value);
      void this.requestUpdate('checked', oldValue);
    }
  }

  public get checked (): boolean {
    return this._checked;
  }

  private _checked = false;

  /**
   * Getter for label
   */
  @query('[part=label]', true)
  private labelEl!: HTMLElement;

  /**
   * Current state of radio for accessibility
   * @ignore
  */
  @property({ type: String, reflect: true, attribute: 'aria-checked' })
  public ariaChecked = String(this.checked);


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
      applyRegistry(this, changedProperties.get('name'));
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
    this.addEventListener('tap', this.onTap);
    this.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('focus', this.onFocus);

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
        if (!radio.checked && radio.tabIndex === 0) {
          radio.tabIndex = -1;
        }
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
    if (this.disabled || event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar':
        if (this.readonly) {
          return;
        }
        this.handleChangeChecked();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        this.navigateToElement(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.navigateToElement(-1);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Handles focus event
   * @returns {void}
   */
  private onFocus (): void {
    if (!this.name) {
      return;
    }
    
    getRadioGroup(this).forEach(radio => {
      // Set tabIndex = -1 for all radio button in group except the one that being focused.
      radio.tabIndex = radio !== this ? -1 : 0;
    });
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
   * Navigate to next or previous checkable element if present
   * @param direction -1 - up/next; 1 - down/previous
   * @returns {void}
   */
  private navigateToElement (direction: number): void {
    if (!this.name) {
      return;
    }

    const radioGroup = getRadioGroup(this).filter(radio => !radio.disabled);
    const idx = radioGroup.indexOf(this);
    let navigateToElement;
    if (direction === 1) {
      navigateToElement = idx === -1 ? radioGroup[0] : radioGroup[idx + 1];
    }
    else {
      navigateToElement = idx === -1 ? radioGroup[radioGroup.length - 1] : radioGroup[idx - 1];
    }

    if (!navigateToElement) {
      navigateToElement = direction === 1 ? radioGroup[0] : radioGroup[radioGroup.length - 1];
    }

    if (navigateToElement) {
      if (!navigateToElement.readonly) {
        this.checked = false;
        navigateToElement.checked = true;
      }
      navigateToElement.focus();
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

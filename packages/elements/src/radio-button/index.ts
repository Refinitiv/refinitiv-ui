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

    if (this.name) {
      this.tabIndex = value ? 0 : -1;
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
    this.addEventListener('tap', this.onTap);
    this.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('focus', this.onFocus);
    this.addEventListener('blur', this.onBlur);

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
      case 'ArrowRight':
      case 'ArrowDown':
        this.navigateToNext();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.navigateToPrevious();
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
    if (!this.name || this.checked) {
      return;
    }
    getRadioGroup(this).filter(radio => radio !== this).forEach(radio => {
      radio.tabIndex = -1; // Set tabIndex = -1 for all radio button in group except the one that being focused.
    });
  }

  /**
   * Handles blur event
   * @returns {void}
   */
  private onBlur (): void {
    if (!this.name || this.checked) {
      return;
    }
    getRadioGroup(this).filter(radio => radio !== this).forEach(radio => {
      radio.tabIndex = 0; // Set tabIndex = 0 for all radio button in group when blur.
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
   * Handle when press arrow left/up.
   * To move focus and check the previous radio button in the group.
   * Unchecked the previous radio button
   * @returns {void}
   */
  private navigateToPrevious (): void {
    if (!this.name) {
      return;
    }

    const radioGroup = getRadioGroup(this);
    if (radioGroup.length < 2) {
      return;
    }

    const currectItemIndex = radioGroup.indexOf(this);
    const lastIndex = radioGroup.length - 1;
    radioGroup[currectItemIndex].checked = false;
    radioGroup[currectItemIndex].blur();
    
    if (currectItemIndex > 0) {
      radioGroup[currectItemIndex - 1].checked = true;
      radioGroup[currectItemIndex - 1].focus();
    }
    else {
      radioGroup[lastIndex].checked = true;
      radioGroup[lastIndex].focus();
    }
  }

  /**
   * Handle when press arrow right/down.
   * To move focus and check the next radio button in the group.
   * Unchecked the previous radio button
   * @returns {void}
   */
  private navigateToNext (): void {
    if (!this.name) {
      return;
    }

    const radioGroup = getRadioGroup(this);
    if (radioGroup.length < 2) {
      return;
    }

    const currectState = radioGroup.indexOf(this);
    radioGroup[currectState].checked = false;
    radioGroup[currectState].blur();
    if (currectState < radioGroup.length - 1) {
      radioGroup[currectState + 1].checked = true;
      radioGroup[currectState + 1].focus();
    }
    else {
      radioGroup[0].checked = true;
      radioGroup[0].focus();
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

import {
  html,
  css,
  CSSResultGroup,
  ControlElement,
  TemplateResult,
  PropertyValues,
  TapEvent
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
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
 * @attr {string} value - Value of the radio button
 * @prop {string} [value=""] - Value of the radio button
*
 * @attr {string} name - Group multiple radio buttons by assigning the same name
 * @prop {string} [name=""] - Group multiple radio buttons by assigning the same name
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

  protected readonly defaultRole: string | null = 'radio';

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

  private _checked = false;

  /**
   * Radio button checked state
   * @param value checked state
   * @default false
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

  /**
   * Aria indicating checked state
   * @ignore
   */
  @property({ type: String, reflect: true, attribute: 'aria-checked' })
  public ariaChecked = String(this.checked);

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
   * Invoked whenever the element is updated
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    if (this.isConnected && this.hasUpdated && changedProperties.has('name')) {
      applyRegistry(this, changedProperties.get('name') as string);
    }

    // Ensure only one radio button is checked
    if (this.isConnected && this.hasUpdated && (changedProperties.has('checked') || (changedProperties.has('name')))) {
      this.manageGroupState();
    }

    super.updated(changedProperties);
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

    registerOverflowTooltip(this.labelEl, () => this.textContent);
  }

  /**
   * Manage group members state, when either one is being checked
   * @returns {void}
   */
  private manageGroupState (): void {
    if (this.checked && this.name) {
      // restore tab index when checked
      this.tabIndex = 0;

      getRadioGroup(this).filter(radio => radio !== this).forEach(radio => {
        // uncheck and hide the rest of the group members from focusability
        radio.checked = false;
        radio.tabIndex = -1;
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
      case ' ':
      case 'Spacebar':
        if (this.readonly) {
          return;
        }
        this.handleChangeChecked();
        break;
      case 'Right':
      case 'Down':
      case 'ArrowRight':
      case 'ArrowDown':
        this.navigateToSibling('next');
        break;
      case 'Left':
      case 'Up':
      case 'ArrowLeft':
      case 'ArrowUp':
        this.navigateToSibling('previous');
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
   * Navigate to next or previous checkable sibling in the same group if present
   * @param direction up/next; down/previous
   * @returns {void}
   */
  private navigateToSibling (direction: 'next' | 'previous'): void {
    if (!this.name) {
      return;
    }

    const group = getRadioGroup(this).filter(radio => !radio.disabled);
    const index = group.indexOf(this);

    let element;

    if (direction === 'next') {
      element = index === -1 ? group[0] : group[index + 1];
    }
    else {
      element = index === -1 ? group[group.length - 1] : group[index - 1];
    }

    if (!element) {
      element = direction === 'next' ? group[0] : group[group.length - 1];
    }

    if (!element.readonly) {
      this.checked = false;
      element.checked = true;
    }

    element.focus();
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

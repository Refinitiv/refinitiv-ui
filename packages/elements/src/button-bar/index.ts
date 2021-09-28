import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResult,
  PropertyValues,
  TapEvent
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { query } from '@refinitiv-ui/core/lib/decorators/query.js';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { VERSION } from '../version.js';
import { Button } from '../button/index.js';

/**
 * Used to display multiple buttons to create a list of commands bar.
 */
@customElement('ef-button-bar', {
  alias: 'coral-split-button'
})
export class ButtonBar extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: inline-flex;
        z-index: 0;
      }
      :host ::slotted(ef-button) {
        margin: 0;
      }
      :host ::slotted(ef-button-bar) {
        border-radius: 0;
        margin: 0;
        box-shadow: none;
        overflow: visible;
        background: none;
        z-index: auto;
      }
      :host ::slotted(ef-button:hover) {
        z-index: 1;
      }
      :host ::slotted(ef-button:focus) {
        z-index: 2;
      }
      :host ::slotted(ef-button:not(:hover):not(:focus)) {
        box-shadow: none;
      }
      @media (pointer: coarse){
        :host ::slotted(ef-button) {
          box-shadow: none;
        }
      }
      :host ::slotted(ef-button:first-of-type) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      :host ::slotted(ef-button:last-of-type) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      :host ::slotted(ef-button:not(:first-of-type):not(:last-of-type)) {
        border-radius: 0;
      }
      :host ::slotted(:not(ef-button):not(ef-button-bar)) {
        display: none;
      }
    `;
  }

  /**
   * Manages user interaction, only allowing one toggle button to be active at any one time.
   */
  @property({ type: Boolean, reflect: true })
  public managed = false;

  /**
   * Default slot
   */
  @query('slot:not([name])')
  private defaultSlot!: HTMLSlotElement;

  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('tap', this.onTapHandler);
  }

  /**
   * Handles tap event
   * @param event the param is the event of click and tap handlers
   * @returns {void}
   */
  private onTapHandler (event: TapEvent): void {
    if (!this.managed) {
      return;
    }

    const target = event.target;
    if (target instanceof Button && target.toggles) {
      event.stopPropagation();
      this.manageButtons(target);
    }
  }

  /**
   * Get the target Button item and handle it with other managed Button items
   * @param targetButton an Button item is the target of the event
   * @returns {void}
   */
  private manageButtons (targetButton: Button): void {
    const managedButtons = this.getManagedButtons();
    const isTargetOfManaged = managedButtons.some(managedButton => managedButton === targetButton);

    if (!isTargetOfManaged) {
      return;
    }

    managedButtons.forEach(managedButton => {
      managedButton.active = managedButton === targetButton;
    });
  }

  /**
   * Return the array of Element items which is changed in the default slot
   * @returns the array of Element of the default slot
   */
  private getElementsOfSlot (): Element[] {
    return this.defaultSlot.assignedNodes()
      .filter(node => node instanceof Element) as Element[];
  }

  /**
   * Filter Button classes by the toggles property
   * @param buttons the array of Button items is the converted nodes of the default slot
   * @returns filtered Button items by the toggles property
   */
  private getManagedButtons (): Button[] {
    const elements = this.getElementsOfSlot();
    return elements.filter(element => element instanceof Button && element.toggles) as Button[];
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    return html`<slot></slot>`;
  }
}

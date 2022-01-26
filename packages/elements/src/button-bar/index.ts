import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
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
   * Element's role attribute for accessibility
   */
  protected defaultRole: 'toolbar' | 'radiogroup' = 'toolbar';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
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
    this.addEventListener('keydown', this.onKeyDown);
    this.initialTabIndex();
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
      case 'Spacebar':
        this.onTapHandler(event as unknown as TapEvent);
        break;
      case 'Right':
      case 'ArrowRight':
        !this.isParentButtonBarExist() && this.navigateToSibling('next');
        break;
      case 'Down':
      case 'ArrowDown':
        this.managed && this.navigateToSibling('next');
        break;
      case 'Left':
      case 'ArrowLeft':
        !this.isParentButtonBarExist() && this.navigateToSibling('previous');
        break;
      case 'Up':
      case 'ArrowUp':
        this.managed && this.navigateToSibling('previous');
        break;
      case 'Home':
        !this.isParentButtonBarExist() && this.navigateToSibling('first');
        break;
      case 'End':
        !this.isParentButtonBarExist() && this.navigateToSibling('last');
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Navigate to next or previous checkable sibling in the same group if present
   * @param direction up/next; down/previous
   * @returns {void}
   */
  private navigateToSibling (direction: 'next' | 'previous' | 'first' | 'last'): void {
    const group = this.getFocusableButtons();
    const index = group.findIndex((button) => button.focused === true);

    let element;

    if (direction === 'next') {
      element = index === -1 ? group[0] : group[index + 1];
    }
    else if (direction === 'first') {
      element = group[0];
    }
    else if (direction === 'last') {
      element = group[group.length - 1];
    }
    else {
      element = index === -1 ? group[group.length - 1] : group[index - 1];
    }

    if (!element) {
      element = direction === 'next' ? group[0] : group[group.length - 1];
    }

    group.forEach((button) => {
      button.tabIndex = -1;
    });
    element.focus();
    if (element.nodeName === 'EF-BUTTON') {
      element.tabIndex = 0;
    }
  }

  /**
   * Set tabIndex to all buttons
   * @returns {void}
   */
  private initialTabIndex ():void {
    if (this.isParentButtonBarExist()) {
      return;
    }
    const group = this.getFocusableButtons();
    let isSet = false;
    group.map((button) => {
      if (!isSet) {
        button.tabIndex = 0;
        isSet = true;
      }
      else {
        button.tabIndex = -1;
      }
    });
  }

  /**
   * Return parent node is button-bar
   * @returns `True` if this contain under button-bar
   */
  private isParentButtonBarExist (): boolean {
    return this.parentElement?.nodeName === 'EF-BUTTON-BAR';
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
   * Return the array of Buttons which can be focusable
   * @returns the array of focusable Buttons
   */
  private getFocusableButtons (): Button[] {
    return [...this.querySelectorAll<Button>('ef-button')].filter(button => !button.disabled);
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

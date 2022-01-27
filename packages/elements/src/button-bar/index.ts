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
import { isIE } from '@refinitiv-ui/utils/lib/browser.js';

/**
 * Configuration object
 * for mutations observers
 */
const observerOptions = {
  subtree: true,
  childList: true,
  characterData: true
};

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
   * Mutation Observer used to detect changes in the Light DOM
   */
  private mutationObserver = new MutationObserver(() => this.manageTabIndex());

  /**
   * Called when connected to DOM
   * @returns {void}
   */
  public connectedCallback (): void {
    super.connectedCallback();
    this.mutationObserver.observe(this, observerOptions);
    !isIE && this.manageTabIndex(); // In IE the mutation will trigger
  }

  /**
   * Invoked when a component is removed from the document’s DOM.
   * @return {void}
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();
    this.mutationObserver.disconnect();
  }
  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('tap', this.onTapHandler);
    this.addEventListener('keydown', this.onKeyDown);
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
      case 'Enter':
        this.onTapHandler(event as unknown as TapEvent);
        break;
      case 'Right':
      case 'ArrowRight':
        // Prevent call twice if this component is nested
        !this.isNested() && this.navigateToSibling('next');
        break;
      case 'Down':
      case 'ArrowDown':
        // UP/DOWN will navigate within the group by design pattern of radio role
        this.managed && this.navigateToSibling('next');
        break;
      case 'Left':
      case 'ArrowLeft':
        !this.isNested() && this.navigateToSibling('previous');
        break;
      case 'Up':
      case 'ArrowUp':
        this.managed && this.navigateToSibling('previous');
        break;
      case 'Home':
        !this.isNested() && this.first();
        break;
      case 'End':
        !this.isNested() && this.last();
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Navigate to next or previous focusable button
   * @param direction up/next; down/previous
   * @returns {void}
   */
  private navigateToSibling (direction: 'next' | 'previous'): void {
    const buttons = this.getFocusableButtons();
    if(buttons.length <= 0) {
      return;
    }

    const focusedButtonIndex = buttons.findIndex(button => button === document.activeElement);

    const nextButton = direction === 'next'
      ? buttons[focusedButtonIndex + 1] || buttons[0]
      : buttons[focusedButtonIndex - 1] || buttons[buttons.length - 1];

    nextButton.focus();
    this.rovingTabIndex(nextButton, buttons);
  }

  /**
   * Navigate to the first focusable button
   * @returns {void}
   */
  private first (): void {
    const buttons = this.getFocusableButtons();
    buttons[0].focus();
    this.rovingTabIndex(buttons[0], buttons);
  }

  /**
   * Navigate to the last focusable button
   * @returns {void}
   */
  private last (): void {
    const buttons = this.getFocusableButtons();
    buttons[buttons.length - 1].focus();
    this.rovingTabIndex(buttons[buttons.length - 1], buttons);
  }

  /**
   * Set tabIndex="0" to target will be focused and others items are tabIndex="-1"
   * Manage tabIndex within the element by following Roving tabIndex
   * @param target the button will be focused
   * @param buttons Array of Button that contains target
   * @returns {void}
   */
  private rovingTabIndex (target: Button, buttons: Button[]):void {
    buttons.map((button) => {
      button.tabIndex = -1;
    });
    target.tabIndex = 0;
  }

  /**
   * Set tabIndex to all buttons
   * @returns {void}
   */
  private manageTabIndex ():void {
    if (this.isNested()) {
      return;
    }
    const buttons = this.getFocusableButtons();
    if (buttons && buttons.length > 0) {
      // Find previous focused button. If not found, use first Button
      let focusedButtonIndex = buttons.findIndex(button => document.activeElement === button);
      if (focusedButtonIndex === -1) {
        focusedButtonIndex = 0;
      }
      this.rovingTabIndex(buttons[focusedButtonIndex], buttons);
    }
  }

  /**
   * Check if button bar is nested, a.k.a. has parent button bar
   * @returns `True` if button bar is nested
   */
  private isNested (): boolean {
    return this.parentElement instanceof ButtonBar;
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

    const target = event.target as Button;
    if (target instanceof Button && target.toggles) {
      event.stopPropagation();
      this.manageButtons(target);
    }

    target.focus();
    this.rovingTabIndex(target, this.getFocusableButtons());
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
   * Return the array of Buttons which focusable
   * @returns the array of focusable Buttons
   */
  private getFocusableButtons (): Button[] {
    return [...this.querySelectorAll<Button>('ef-button,coral-button')].filter(button => !button.disabled);
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

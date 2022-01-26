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
        this.onTapHandler(event as unknown as TapEvent);
        break;
      case 'Right':
      case 'ArrowRight':
        !this.isNested() && this.next();
        break;
      case 'Down':
      case 'ArrowDown':
        this.managed && this.next();
        break;
      case 'Left':
      case 'ArrowLeft':
        !this.isNested() && this.previous();
        break;
      case 'Up':
      case 'ArrowUp':
        this.managed && this.previous();
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
   * Navigate to next focusable item of the focusable buttons
   * @returns {void}
   */
  private next (): void {
    const group = this.getFocusableButtons();
    const index = group.findIndex((button) => button.focused === true);
    const isOutofRange = ((index + 1) >= group.length);
    const targetIndex = ((index === -1) || isOutofRange) ? 0 : (index + 1);
    this.focusTarget(group[targetIndex], group);
  }

  /**
   * Navigate to previous focusable item of the focusable buttons
   * @returns {void}
   */
  private previous (): void {
    const group = this.getFocusableButtons();
    const index = group.findIndex((button) => button.focused === true);
    const isOutofRange = ((index - 1) < 0);
    const targetIndex = ((index === -1) || isOutofRange) ? (group.length - 1) : (index - 1);
    this.focusTarget(group[targetIndex], group);
  }

  /**
   * Navigate to the first focusable item of the focusable buttons
   * @returns {void}
   */
  private first (): void {
    const group = this.getFocusableButtons();
    this.focusTarget(group[0], group);
  }

  /**
   * Navigate to the last focusable item of the focusable buttons
   * @returns {void}
   */
  private last (): void {
    const group = this.getFocusableButtons();
    this.focusTarget(group[group.length - 1], group);
  }

  /**
   * Focusing target and set tabIndex=0 to target and tabIndex=-1 to other in group
   * @param target the button will be focused
   * @param group Array of Button that contains target
   * @returns {void}
   */
  private focusTarget (target: Button, group: Button[]):void {
    group.forEach((button) => {
      button.tabIndex = -1;
    });
    target.focus();
    if (target instanceof Button) {
      target.tabIndex = 0;
    }
  }

  /**
   * Set tabIndex to all buttons
   * @returns {void}
   */
  private manageTabIndex ():void {
    if (this.isNested()) {
      return;
    }
    const group = this.getFocusableButtons();
    let lastFocusItem = group.findIndex(button => button.tabIndex === 0);
    lastFocusItem === -1 ? lastFocusItem = 0 : lastFocusItem;
    group.map((button, index) => {
      if (lastFocusItem === index) {
        button.tabIndex = 0;
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

    const target = event.target;
    if (target instanceof Button && target.toggles) {
      event.stopPropagation();
      this.manageButtons(target);
    }

    this.focusTarget(target as Button, this.getFocusableButtons());
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

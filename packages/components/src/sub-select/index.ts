import {
  ControlElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  StyleMap
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { styleMap } from '@refinitiv-ui/core/directives/style-map.js';
import { createRef, ref, Ref } from '@refinitiv-ui/core/directives/ref.js';
import { VERSION } from '../version.js';
import '../sub-icon/index.js';
import '../sub-overlay/index.js';
import '../option/index.js';

import { Option } from '../option/index.js';
import { AnimationTaskRunner } from '@refinitiv-ui/utils/async.js';

import type { Overlay } from '../sub-overlay';
import type { OpenedChangedEvent } from '../events.js';

// Observer config for items
const observerOptions = {
  subtree: true,
  childList: true,
  attributes: true,
  characterData: true,
  attributeFilter: [
    'label',
    'value',
    'selected',
    'disabled',
    'readonly'
  ]
};

const POPUP_POSITION = ['bottom-start', 'top-start'];
enum Navigation {
  FIRST = 'First',
  LAST = 'Last',
  NEXT = 'Next',
  PREVIOUS = 'Previous',
}

/**
 * Expands upon the native select element,
 * providing a fully themeable dropdown element.
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires value-changed - Fired when the user commits a value change. The event is not triggered if `value` property is changed programmatically.
 * @fires opened-changed - Fired when the user opens or closes control's popup. The event is not triggered if `opened` property is changed programmatically.
 */
@customElement('ui-sub-select', { theme: false })
export class SubSelect extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole: string | null = 'button';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        outline: none;
        position: relative;
        user-select: none;
        display: inline-flex;
        box-sizing: border-box;
        vertical-align: middle;
        height: var(--ds-control-height);
        width: var(--ds-control-width);
        color: var(--ds-control-color);
        border: var(--ds-control-border);
        border-radius: var(--ds-control-border-radius);
        background-color: var(--ds-control-background-color);
        padding: 0px var(--ds-space-x-small);
      }
      :host(:focus) {
        border-color: var(--ds-control-focus-border-color);
      }
      :host(:not([readonly]):not([error]):not(:focus):hover) {
        color: var(--ds-control-hover-color);
        border-color: var(--ds-control-hover-border-color);
      }
      :host([disabled]) {
        color: var(--ds-control-disabled-color);
        border-color: var(--ds-control-disabled-border-color);
        background-color: var(--ds-control-disabled-background-color);
      }
      :host([readonly]:not(:focus)) {
        color: var(--ds-control-readonly-color);
        border-color: var(--ds-control-readonly-border-color);
        background-color: var(--ds-control-readonly-background-color);
      }
      [part=label],
      [part=placeholder] {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      [part=icon] {
        flex: none;
      }
      :host [part=list] {
        overflow-y: auto;
        max-width: var(--ui-select-list-max-width);
        max-height: var(--ui-select-list-max-height, 200px);
      }
      :host [part=list] ::slotted(:not(ui-option)) {
        display: none;
      }
      :host [part=sub-item] {
        padding: var(--ds-space-xxx-small) var(--ds-space-x-small);
      }
      #box {
        align-items: center;
        display: inline-flex;
        flex-flow: row nowrap;
        overflow: hidden;
        flex: 1 1 100%;
      }
      #text {
        position: relative;
        flex: 1 1 auto;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 0;
      }
      #trigger {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;
      }
    `;
  }

  private mutationObserver?: MutationObserver;
  private popupDynamicStyles: StyleMap = {}; /* set popup min-width based on select width or CSS vars */
  private lazyRendered = false; /* speed up rendering by not populating popup window on first load */
  private popupScrollTop = 0; /* remember scroll position on popup refit actions */
  private observingMutations = false;
  private resizeThrottler = new AnimationTaskRunner();

  /**
   * Toggles the opened state of the list
   */
  @property({ type: Boolean, reflect: true })
  public opened = false;

  /**
   * Value of the element
   * @param value Element value
   * @default -
   */
  @property({ type: String, attribute: false })
  public set value (value: string) {
    value = this.castValue(value);
    const oldValue = this.value;
    if (value !== oldValue) {
      this.stopObserveMutations();
      // setting the value always overrides the selected attribute
      // either defined in data or by having selected as an attribute
      this.clearSelection();
      this.selectValue(value);
      this.requestUpdate('value', oldValue);
    }
  }
  public get value (): string {
    return this.selectedSlotItems.map(item => this.getItemValue(item))[0] || '';
  }

  /**
   * Reference to the menu element
   */
  private menuRef: Ref<Overlay> = createRef();

  /**
   * Called when connected to DOM
   * @returns {void}
   */
  public connectedCallback (): void {
    super.connectedCallback();

    // Indicating that this select has a popup of type listbox
    this.setAttribute('aria-haspopup', 'listbox');
  }

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    if (changedProperties.has('opened')) {
      if (this.opened) {
        this.opening();
      }
      this.setAttribute('aria-expanded', this.opened ? 'true' : 'false');
    }

    super.update(changedProperties);
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('keydown', this.onKeyDown); /* keydown when select is closed */
  }

  /**
   * Called when element finished updating
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // we must wait while all elements in the tree are updated before starting the mutation observer
    void this.updateComplete.then(() => {
      // Start watching for any child mutations
      this.observeMutations();
    });
  }

  private get label (): string {
    return this.selectedSlotItems.map(item => this.getItemLabel(item))[0];
  }

  /**
   * Run when popup is opening
   * Calculate CSS variables an computed width
   * @returns {void}
   */
  private opening (): void {
    this.lazyRendered = true;
    this.restrictPopupWidth(); /* styles ary dynamically applied in rendering */
  }

  /**
   * Observe any changes to Light DOM
   * This observer is self contained and should
   * be garbage collected when there are no element references.
   * @returns {void}
   */
  private observeMutations (): void {
    // Start watching for any new mutations if slotted content is used
    if (!this.observingMutations) {
      if (!this.mutationObserver) {
        this.mutationObserver = new MutationObserver(this.handleMutations);
      }
      this.mutationObserver.observe(this, observerOptions);
      this.observingMutations = true;
    }
  }

  /**
   * Stop observe any changes to Light DOM
   * There must not be any observation on any internal changes
   * as it may cause excessive re-rendering
   * @returns {void}
   */
  private stopObserveMutations (): void {
    if (this.observingMutations && this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.observingMutations = false;
    }
  }

  /**
   * Handles all mutations and filters out
   * any Shadow DOM changes in polyfilled browsers
   * mutations collection of mutation records
   * @param mutations Observer mutations
   * @returns {void}
   */
  private handleMutations = (mutations: MutationRecord[]): void => {
    const hasLightDomMutations = mutations
      .some(m => m.target.getRootNode() !== this.shadowRoot);
    if (hasLightDomMutations) {
      this.requestUpdate();
    }
  };

  /**
   * Popup has to use max width if --ui-select-list-max-width specified
   * otherwise, popup should have same width as control or wider
   * @returns {void}
   */
  private restrictPopupWidth (): void {
    /* c8 ignore start */
    if (this.offsetWidth === 0) {
      // this code might happen only when opened has been set during initialisation
      // or when display is set to none
      this.resizeThrottler.schedule(() => {
        if (this.offsetWidth) { /* must be here to avoid infinitive loop */
          this.restrictPopupWidth();
          this.requestUpdate();
        }
      });

      return;
    }
    /* c8 ignore stop */

    const maxWidth = this.getComputedVariable('--ui-select-list-max-width', 'none');
    let minWidth = this.offsetWidth;

    if (maxWidth !== 'none') {
      // reset min-width if max-width less than min-width, otherwise browser won't apply max-width
      if (parseInt(maxWidth, 10) < minWidth) {
        minWidth = 0;
      }
    }

    this.popupDynamicStyles.minWidth = `${minWidth}px`;
  }

  /**
   * Set opened state with event
   * @param opened True if opened
   * @returns {void}
   */
  private setOpened (opened: boolean): void {
    if (this.opened !== opened) {
      this.notifyPropertyChange('opened', opened);
      this.opened = opened;
    }
  }

  /**
   * Toggles the opened state of the list
   * @returns {void}
   */
  private toggleOpened (): void {
    if (this.opened) {
      this.setOpened(false);
    }
    else {
      this.setOpened(true);
    }
  }

  /**
   * Scroll to first selected item
   * @returns {void}
   */
  private scrollToSelected (): void {
    const selected = this.getSelectedElements()[0];

    if (selected) {
      selected.scrollIntoView({
        block: 'nearest'
      });
    }
  }

  /**
   * Used to restore scroll position on each refit event
   * @returns {void}
   */
  private onPopupRefit ({ target }: Event): void {
    (target as Overlay).scrollTop = this.popupScrollTop;
  }

  /**
   * Run when popup closes externally via opened-changed event
   * Required to propagate the event
   * @param event opened-changed event
   * @returns {void}
   */
  private onPopupOpenedChanged (event: OpenedChangedEvent): void {
    event.preventDefault();
    this.setOpened(event.detail.value);
  }

  /**
   * Run when popup gets opened
   * @returns {void}
   */
  private onPopupOpened ({ target }: CustomEvent): void {
    this.scrollToSelected();
    const selectedItem = this.getSelectedElements()[0];
    if (selectedItem) {
      selectedItem.selected = true;
      selectedItem.focus();
    }
    const eventOptions = {
      capture: true,
      passive: true
    };

    target?.addEventListener('scroll', this.onPopupScroll, eventOptions);
  }

  /**
   * Run when popup gets closed
   * @returns {void}
   */
  private onPopupClosed ({ target }: CustomEvent): void {
    target?.removeEventListener('scroll', this.onPopupScroll);
    this.popupScrollTop = 0;
  }

  /**
   * Used to store scroll position
   * @returns {void}
   */
  private onPopupScroll = ({ target }: Event): void => {
    this.popupScrollTop = (target as Overlay).scrollTop;
  };

  /**
   * Run when tap event happens on render root
   * @param event tap event
   * @returns {void}
   */
  private onPopupTap (event: Event): void {
    const item = this.findSelectableElement(event);
    if (item) {
      this.setValueAndNotify(this.getItemValue(item));
      this.setOpened(false);
    }
  }

  /**
   * Run mouse move event over the popup
   * @param event mouse move event
   * @returns {void}
   */
  private onPopupMouseMove (): void {
    if (this.menuRef.value) {
      this.menuRef.value.focus();
    }
  }

  /**
   * Handles key input when popup is closed
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    switch (event.key) {
      case 'Up':
      case 'ArrowUp':
      case 'Down':
      case 'ArrowDown':
      case 'Enter':
      case 'Spacebar':
        this.setOpened(true);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Handles popup key input when popup is opened
   * @param event Key down event object
   * @returns {void}
   */
  private onPopupKeyDown (event: KeyboardEvent): void {
    switch (event.key) {
      case 'Spacebar':
      case 'Enter':
        if (event.target instanceof Option) {
          event.target.click();
        }
        break;
      case 'Up':
      case 'ArrowUp':
        this.focusElement(Navigation.PREVIOUS);
        break;
      case 'Down':
      case 'ArrowDown':
        this.focusElement(Navigation.NEXT);
        break;
      case 'Tab':
        this.focusElement(event.shiftKey ? Navigation.PREVIOUS : Navigation.NEXT);
        break;
      case 'Home':
        this.focusElement(Navigation.FIRST);
        break;
      case 'End':
        this.focusElement(Navigation.LAST);
        break;
      // no default
    }

    event.preventDefault();
    event.stopPropagation(); /* must be her to not reach self key listener */
  }

  /**
   * Focus and highlight element according to specified direction
   * @param direction previous, next, first or last focusable element
   * @returns {void}
   */
  private focusElement (direction: Navigation): void {
    const selectableElements = this.getSelectableElements();

    if (selectableElements.length === 0) {
      return;
    }

    const index = selectableElements.findIndex(item => item === document.activeElement);
    const firstElement = selectableElements[0];
    const lastElement = selectableElements[selectableElements.length - 1];

    let element;
    switch (direction) {
      case Navigation.PREVIOUS:
        element = index === -1 ? lastElement : selectableElements[index - 1];
        break;
      case Navigation.NEXT:
        element = index === -1 ? firstElement : selectableElements[index + 1];
        break;
      case Navigation.FIRST:
        element = firstElement;
        break;
      case Navigation.LAST:
        element = lastElement;
        break;
      default:
        break;
    }

    if (!element) {
      element = direction === Navigation.NEXT ? firstElement : lastElement;
    }

    if (element) {
      element.focus();
    }
  }

  /**
   * Check if element can be selected
   * @param element Element to check
   * @returns true if element can be selected
   */
  private isSelectableElement (element: Element): boolean {
    return element instanceof Option && element.tabIndex >= 0 && !element.disabled && !element.readonly;
  }

  /**
   * Get a list of selectable HTML Elements
   * queryAssignedNodes decorator not work with lazy-rendered slots
   * @returns A list of selectable HTML elements
   */
  private getSelectableElements (): Option[] {
    const selectableElements: Option[] = [];

    const addSelectableElements = (element: HTMLElement | Text): void => {
      if (element instanceof HTMLElement && this.isSelectableElement(element)) {
        selectableElements.push(element as Option);
      }
      else if (element instanceof HTMLSlotElement) {
        const assignedNodes = element.assignedNodes({ flatten: true });
        assignedNodes.forEach((node) => addSelectableElements(node as HTMLElement | Text));
      }
      else if (element.childNodes.length > 0) {
        element.childNodes.forEach((childNode) => addSelectableElements(childNode as HTMLElement | Text));
      }
    };
  
    this.childNodes.forEach((childNode) => addSelectableElements(childNode as HTMLElement | Text));
  
    return selectableElements;
  }

  /**
   * Find selectable element is the event composed path
   * @param event Event to check
   * @returns The first selectable element or undefined
   */
  private findSelectableElement (event: Event): Option | undefined {
    const path = event.composedPath();
    for (let i = 0; i < path.length; i += 1) {
      const element = path[i] as Element;
      if (element === this) {
        return;
      }
      if (this.isSelectableElement(element)) {
        return element as Option;
      }
    }
  }

  /**
   * Get a list of selected HTML elements
   * *Can be used only when select is opened*
   * @returns A list of selected elements
   */
  private getSelectedElements (): Option[] {
    return this.getSelectableElements().filter(item => item.selected);
  }

  /**
   * Clears the current selected items
   * @returns {void}
   */
  private clearSelection (): void {
    this.selectedSlotItems.forEach(item => {
      item.selected = false;
    });
    this.requestUpdate();
  }

  /**
   * Mark item as selected
   * @param value Value to select
   * @returns true if corresponding item is found and item selected
   */
  protected selectValue (value: string): boolean {
    return this.selectSlotItem(value);
  }

  /**
   * Mark slotted item as selected
   * @param value Option value, item label or item text content
   * @returns true if corresponding item is found and item selected
   */
  private selectSlotItem (value: string): boolean {
    const items = this.getSelectableElements();
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (this.getItemValue(item) === value) {
        item.selected = true;
        return true;
      }
    }
    return false;
  }

  /**
   * Helper to return a value from an item
   * @param item select item
   * @returns value
   */
  private getItemValue (item: Option): string {
    return item.value || (item.hasAttribute('value') ? '' : this.getItemLabel(item));
  }

  /**
   * Helper to return a label from an item
   * @param item select item
   * @returns value
   */
  private getItemLabel (item: Option): string {
    return item.textContent || '';
  }

  /**
   * Retrieve the selected items
   * @returns Selected data item
   */
  private get selectedSlotItems (): Option[] {
    return this.getSelectedElements();
  }

  /**
   * Template for label
   */
  private get labelTemplate (): TemplateResult {
    return html`<div part="label">${this.label}</div>`;
  }

  /**
   * Edit template when select is not readonly or disabled
   */
  private get editTemplate (): TemplateResult | undefined {
    if (!this.readonly && !this.disabled) {
      return html`
        <div id="trigger" @tapstart="${this.toggleOpened}"></div>
        ${this.popupTemplate}
      `;
    }
  }

  /**
   * Get default slot template
   */
  private get slottedContent (): TemplateResult {
    return html`<slot></slot>`;
  }

  /**
  * Edit template when select is not readonly or disabled
  */
  private get popupTemplate (): TemplateResult | undefined {
    if (this.lazyRendered) {
      return html`<ui-sub-overlay
        ${ref(this.menuRef)}
        tabindex="-1"
        id="menu"
        part="list"
        role="listbox"
        style=${styleMap(this.popupDynamicStyles)}
        with-shadow
        lock-position-target
        .positionTarget=${this}
        .position=${POPUP_POSITION}
        ?opened=${this.opened}
        @tap=${this.onPopupTap}
        @mousemove=${this.onPopupMouseMove}
        @keydown=${this.onPopupKeyDown}
        @opened-changed="${this.onPopupOpenedChanged}"
        @opened="${this.onPopupOpened}"
        @refit=${this.onPopupRefit}
        @closed="${this.onPopupClosed}">${this.slottedContent}</ui-sub-overlay>`;
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
    <div id="box" aria-hidden="true">
      <div id="text">
        ${this.labelTemplate}
      </div>
      <ui-sub-icon icon="down" part="icon"></ui-sub-icon>
    </div>
    ${this.editTemplate}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-sub-select': SubSelect;
  }
}

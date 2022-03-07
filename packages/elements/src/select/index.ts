import {
  ControlElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  MultiValue,
  FocusedPropertyKey,
  StyleMap
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { styleMap } from '@refinitiv-ui/core/directives/style-map.js';
import { VERSION } from '../version.js';
import '../overlay/index.js';
import '../item/index.js';
import '../icon/index.js';
import { Item } from '../item/index.js';
import { CollectionComposer } from '@refinitiv-ui/utils/collection.js';
import { TimeoutTaskRunner, AnimationTaskRunner } from '@refinitiv-ui/utils/async.js';
import type { Overlay } from '../overlay';
import type { SelectData, SelectDataItem } from './helpers/types';
import type { OpenedChangedEvent } from '../events';

export type { SelectData, SelectDataItem };

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

const LABEL_SEPARATOR = ', '; // TODO: for multiselect
const POPUP_POSITION = ['bottom-start', 'top-start'];
const KEY_SEARCH_DEBOUNCER = 300;

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
 * @fires value-changed - Fired when the value property changes.
 * @fires opened-changed - Fired when the opened property changes.
 */
@customElement('ef-select', {
  alias: 'coral-select'
})
export class Select extends ControlElement implements MultiValue {

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
        -webkit-user-select: none;
        display: inline-block;
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
      }
      :host [part="list"] ::slotted(:not(ef-item)) {
        display: none;
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
      }
      #select {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        border: none;
        padding: 0;
        margin: 0;
      }
    `;
  }

  private composer: CollectionComposer<SelectDataItem> = new CollectionComposer([]);
  private _data: SelectData | null = null;
  private mutationObserver?: MutationObserver;
  private popupDynamicStyles: StyleMap = {}; /* set popup min-width based on select width or CSS vars */
  private lazyRendered = false; /* speed up rendering by not populating popup window on first load */
  private popupScrollTop = 0; /* remember scroll position on popup refit actions */
  private observingMutations = false;
  private highlightedItem?: Item;
  private keySearchTerm = ''; /* used for quick search */
  private keySearchThrottler = new TimeoutTaskRunner(KEY_SEARCH_DEBOUNCER);
  private resizeThrottler = new AnimationTaskRunner();

  /**
  * Current text content of the selected value
  * @readonly
  */
  @property({ type: String, attribute: false })
  public get label (): string {
    return this.labels[0];
  }
  /**
  * Current text content of the selected values
  * @ignore
  * @readonly
  */
  @property({ type: Array, attribute: false })
  public get labels (): string[] {
    if (this.hasDataItems()) {
      return this.selectedDataItems.map(item => this.composer.getItemPropertyValue(item, 'label') as string);
    }

    return this.selectedSlotItems.map(item => this.getItemLabel(item));
  }

  /**
  * Placeholder to display when no value is set
  */
  @property({ type: String })
  public placeholder = '';

  /**
  * Toggles the opened state of the list
  */
  @property({ type: Boolean, reflect: true })
  public opened = false;

  /**
  * Set state to error
  */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
  * Set state to warning
  */
  @property({ type: Boolean, reflect: true })
  public warning = false;

  /**
  * Switch to multiple select input
  * @ignore
  * @param multiple True if element needs to support multi selection
  */
  @property({ type: Boolean })
  public set multiple (multiple: boolean) {
    // TODO: not implemented
  }
  /**
  * @ignore
  */
  public get multiple (): boolean {
    return false;
  }

  /**
  * Construct the menu from data object. Cannot be used with slotted content
  * @type {SelectData | null}
  * @default null
  */
  @property({ attribute: false })
  public get data (): SelectData | null {
    return this._data;
  }
  public set data (value: SelectData | null) {
    const oldValue = this._data;
    if (oldValue === value) {
      return;
    }
    else if (Array.isArray(value)) {
      this.composer = new CollectionComposer<SelectDataItem>(value);
    }
    else {
      this.composer = new CollectionComposer<SelectDataItem>([]);
    }
    this._data = value;

    // check if new set of data contains selected, which becomes the new value
    // otherwise try to set current value
    if (!this.selectedDataItems.length) {
      this.value = this.cachedValue;
    }

    this.requestUpdate('data', oldValue);
  }

  /**
   * This variable is here to ensure that the value and data are in sync when data is set after the value.
   * This is developer error to use both, selected and value to control the selections.
   * Therefore as soon as value has been set externally, selected state in data setter is ignored
   */
  private cachedValue = '';

  /**
  * Value of the element
  * @param value Element value
  * @default -
  */
  @property({ type: String, attribute: false })
  public set value (value: string) {
    value = this.castValue(value);

    this.cachedValue = value;

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
    return this.values[0] || '';
  }

  /**
   * Array of selected items` values
   * @ignore
   * @readonly
   */
  @property({ attribute: false })
  public get values (): string[] {
    if (this.hasDataItems()) {
      return this.selectedDataItems.map(item => this.composer.getItemPropertyValue(item, 'value') as string);
    }

    return this.selectedSlotItems.map(item => this.getItemValue(item));
  }

  @query('#menu')
  private menuEl?: Overlay;

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
    this.cachedValue = ''; /* reset cached value as it is only valid when value and data are set the same time */

    const focusedChanged = changedProperties.has(FocusedPropertyKey);

    // the opened logic is bound to focus state
    if (focusedChanged) {
      // When focus changes the popup can open only on tapstart
      if (this.focused && this.shouldOpenOnFocus) {
        this.setOpened(true);
      }
      this.shouldOpenOnFocus = false;
    }

    if (changedProperties.has('opened')) {

      if (this.opened) {
        this.opening();
      }
      else {
        this.closing();
      }

      this.setAttribute('aria-expanded', this.opened ? 'true' : 'false');
    }

    if (changedProperties.has('error')) {
      this.setAttribute('aria-invalid', this.error ? 'true' : 'false');
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
   * Run when popup is closing
   * @returns {void}
   */
  private closing (): void {
    // no content
  }

  /**
   * Observe any changes to Light DOM
   * This observer is self contained and should
   * be garbage collected when there are no element references.
   * @returns {void}
   */
  private observeMutations (): void {
    // Start watching for any new mutations if slotted content is used
    if (!this.observingMutations && !this.hasDataItems()) {
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
   * Popup has to use max width if --list-max-width specified
   * otherwise, popup should have same width as control or wider
   * @returns {void}
   */
  private restrictPopupWidth (): void {
    /* istanbul ignore next */
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

    const maxWidth = this.getComputedVariable('--list-max-width', 'none');
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

  private shouldOpenOnFocus = false;
  /**
   * This flag is required to remove the frame gap
   * between tap start and opening the popup
   * @returns {void}
   */
  protected openOnFocus (): void {
    if (this.opened) {
      return;
    }

    if (this.focused) {
      this.setOpened(true);
      return;
    }

    this.shouldOpenOnFocus = true;
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
      this.openOnFocus();
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
    this.setItemHighlight(this.getSelectedElements()[0]);

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
    const eventOptions = { /* need this for IE11, otherwise the event is not removed */
      capture: true,
      passive: true
    };

    target?.removeEventListener('scroll', this.onPopupScroll, eventOptions);
    this.setItemHighlight();
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
  private onPopupMouseMove (event: MouseEvent): void {
    this.menuEl?.focus();
    const item = this.findSelectableElement(event);
    if (item) {
      this.setItemHighlight(item);
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
      case ' ':
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
      case ' ':
      case 'Spacebar':
      case 'Enter':
        this.highlightedItem?.click();
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
      default:
        if (this.isValidFilterKey(event)) {
          this.onKeySearch(event.key);
          break;
        }
        return;
      // no default
    }

    event.preventDefault();
    event.stopPropagation(); /* must be her to not reach self key listener */
  }

  /**
   * Check if keyboard keydown can be used for data searching
   * @param event Keyboard event
   * @returns true if a valid key
   */
  private isValidFilterKey (event: KeyboardEvent): boolean {
    // all printable keys have length of 1. This is better than regexp as we cover all non latin characters
    return event.key.length === 1
      && !event.ctrlKey
      && !event.altKey
      && !event.metaKey;
  }

  /**
   * Focus and highlight element according to specified direction
   * @param direction previous, next, first or last focusable element
   * @returns {void}
   */
  private focusElement (direction: Navigation): void {
    const highlightedItem = this.highlightedItem || this.getSelectedElements()[0];
    const selectableElements = this.getSelectableElements();

    if (selectableElements.length === 0) {
      return;
    }

    const index = highlightedItem ? selectableElements.indexOf(highlightedItem) : -1;

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
      this.setItemHighlight(element);
    }
  }

  /**
   * Highlight or remove highlight from an item
   * @param [item] An item to highlight
   * @returns {void}
   */
  private setItemHighlight (item?: Item): void {
    if (this.highlightedItem === item) {
      return;
    }

    if (this.highlightedItem) {
      this.highlightedItem.highlighted = false;
    }

    this.highlightedItem = item;

    if (item) {
      item.highlighted = true;
    }
  }

  /**
   * A simple search that highlight elements on key press
   * @param key A key pressed
   * @returns {void}
   */
  private onKeySearch (key: string): void {
    this.keySearchTerm += key.toLowerCase();
    this.keySearchThrottler.schedule(() => {
      this.keySearchTerm = '';
    });

    // start from highlighted and continue in circles
    let selectableElements = this.getSelectableElements();
    const highlightedIdx = this.highlightedItem ? selectableElements.indexOf(this.highlightedItem) : -1;
    selectableElements = selectableElements.concat(selectableElements.splice(0, highlightedIdx));

    const focusElement = selectableElements.find(item => {
      const label = this.getItemLabel(item).toLowerCase();
      return label.startsWith(this.keySearchTerm) && item !== this.highlightedItem;
    });

    if (focusElement) {
      focusElement.focus();
      this.setItemHighlight(focusElement);
    }
  }

  /**
   * Check if element can be selected
   * @param element Element to check
   * @returns true if element can be selected
   */
  private isSelectableElement (element: Element): boolean {
    // TODO: remove disabled && readonly check once ControlElement tabIndex issue is fixed
    return element instanceof Item && element.tabIndex >= 0 && !element.disabled && !element.readonly;
  }

  /**
   * Get a list of selectable HTML Elements
   * *Can be used only when select is opened*
   * @returns A list of selectable HTML elements
   */
  private getSelectableElements (): Item[] {
    const root = this.hasDataItems() ? this.menuEl : this;

    /* istanbul ignore next */
    if (!root) {
      return [];
    }

    const items: Item[] = [];
    const rootChildren = root.children;

    for (let i = 0; i < rootChildren.length; i += 1) {
      const item = rootChildren[i];
      if (this.isSelectableElement(item)) {
        items.push(item as Item);
      }
    }

    return items;
  }

  /**
   * Find selectable element is the event composed path
   * @param event Event to check
   * @returns The first selectable element or undefined
   */
  private findSelectableElement (event: Event): Item | undefined {
    const path = event.composedPath();
    for (let i = 0; i < path.length; i += 1) {
      const element = path[i] as Element;
      if (element === this) {
        return;
      }
      if (this.isSelectableElement(element)) {
        return element as Item;
      }
    }
  }

  /**
   * Get a list of selected HTML elements
   * *Can be used only when select is opened*
   * @returns A list of selected elements
   */
  private getSelectedElements (): Item[] {
    return this.getSelectableElements().filter(item => item.selected);
  }

  /**
   * Clears the current selected items
   * @returns {void}
   */
  private clearSelection (): void {
    if (this.hasDataItems()) {
      this.selectedDataItems.forEach((item: SelectDataItem) => this.composer.setItemPropertyValue(item, 'selected', false));
    }
    else {
      this.selectedSlotItems.forEach(item => {
        item.selected = false;
      });
    }
    this.requestUpdate();
  }

  /**
   * Mark item as selected
   * @param value Value to select
   * @returns true if corresponding item is found and item selected
   */
  protected selectValue (value: string): boolean {
    if (!this.values.includes(value)) {
      if (this.hasDataItems()) {
        return this.selectDataItem(value);
      }
      else {
        return this.selectSlotItem(value);
      }
    }

    return false;
  }

  /**
   * Mark data item as selected
   * @param value Item value
   * @returns true if corresponding item is found and item selected
   */
  private selectDataItem (value: string): boolean {
    const item = this.composer.queryItemsByPropertyValue('value', value)[0];
    if (item) {
      this.composer.setItemPropertyValue(item, 'selected', true);
      return true;
    }

    return false;
  }

  /**
   * Mark slotted item as selected
   * @param value Item value, item label or item text content
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
  private getItemValue (item: Item): string {
    return item.value || (item.hasAttribute('value') ? '' : this.getItemLabel(item));
  }

  /**
   * Helper to return a label from an item
   * @param item select item
   * @returns value
   */
  private getItemLabel (item: Item): string {
    return item.label || item.textContent || '';
  }

  /**
   * Check whether select is working with data or slotted content
   * @returns True if working with data
   */
  private hasDataItems (): boolean {
    return !!this.data?.length;
  }

  /**
   * Retrieve the selected data items
   * @returns Selected data item
   */
  private get selectedDataItems (): SelectData {
    return this.composer.queryItemsByPropertyValue('selected', true) as SelectData;
  }

  /**
   * Retrieve the selected items
   * @returns Selected data item
   */
  private get selectedSlotItems (): Item[] {
    return this.getSelectedElements();
  }

  /**
   * Calculating whether the placeholder should be hidden
   * @returns result
   */
  private placeholderHidden (): boolean {
    return !!(this.labels.length > 0 || this.value);
  }

  /**
   * Create template for menu item
   * @param item JSON object to parse
   * @returns template result
   */
  private toItem (item: SelectDataItem): TemplateResult {
    switch (item.type) {
      case 'divider':
        return html`<ef-item role="presentation" part="item" type="divider"></ef-item>`;
      case 'header':
        return html`<ef-item
          role="presentation"
          part="item"
          type="header"
          .label=${item.label}></ef-item>`;
      // no default
    }
    return html`<ef-item
      role="option"
      part="item"
      .value=${item.value}
      .label=${item.label}
      ?selected=${this.composer.getItemPropertyValue(item, 'selected') as boolean}
      ?disabled=${item.disabled}
    ></ef-item>`;
  }

  /**
   * Template for placeholder
   */
  private get placeholderTemplate (): TemplateResult {
    return html`<div part="placeholder">${this.placeholder}</div>`;
  }

  /**
   * Template for label
   */
  private get labelTemplate (): TemplateResult {
    return html`<div part="label">${this.multiple ? this.labels.join(LABEL_SEPARATOR) : this.label}</div>`;
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
   * Get data iterator template
   */
  private get dataContent (): TemplateResult {
    return html`${(this.composer.queryItems(() => true) as SelectData).map(item => this.toItem(item))}`;
  }

  /**
  * Edit template when select is not readonly or disabled
  */
  private get popupTemplate (): TemplateResult | undefined {
    if (this.lazyRendered) {
      return html`<ef-overlay
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
        @closed="${this.onPopupClosed}">${this.hasDataItems() ? this.dataContent : this.slottedContent}</ef-overlay>`;
    }
    else {
      // This code is required because IE11 polyfill need items to be within a slot
      // to make MutationObserver to observe items correctly
      return html`<div style="display: none !important;"><slot></slot></div>`;
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
    <div id="box">
      <div id="text">
        ${this.placeholderHidden() ? this.labelTemplate : this.placeholderTemplate}
      </div>
      <ef-icon icon="down" part="icon"></ef-icon>
    </div>
    ${this.editTemplate}`;
  }
}

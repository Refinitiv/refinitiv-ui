import {
  ControlElement,
  css,
  CSSResultGroup,
  html,
  PropertyValues,
  TapEvent,
  TemplateResult,
  WarningNotice
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';
import { CollectionComposer, DataItem } from '@refinitiv-ui/utils/collection.js';
import type { ItemData } from '../item';
import type { ListData } from './helpers/types';
import { getItemId } from './helpers/item-id.js';
import { ListRenderer } from './helpers/renderer.js';
import '../item/index.js';

export type { ListData };
export { ListRenderer };

/**
 * Key direction
 */
enum Direction {
  UP = -1,
  DOWN = 1
}

const valueFormatWarning = new WarningNotice('The specified \'values\' format does not conform to the required format.');

/**
 * Provides listing and immutable selection
 * @fires value-changed - Dispatched when value changes
 */
@customElement('ef-list', {
  alias: 'coral-list'
})
export class List<T extends DataItem = ItemData> extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole: string | null = 'listbox';

  /**
   * Used to timestamp renders.
   * This enables diff checking against item updates,
   * rendering only items which have updated since the last render cycle.
   */
  private renderTimestamp = new Map<T, number>();

  /**
   * Requests an update after a composer modification.
   * @returns Update promise.
   */
  private modificationUpdate = (): void => {
    this.requestUpdate();
  };

  /**
   * Item map; used to link element nodes to data items.
   */
  private itemMap = new Map<HTMLElement, T>();

  /**
   * Element map; used to link data items to element nodes.
   */
  private elementMap = new Map<T, HTMLElement>();

  /**
   * Composer used to query and modify item state.
   */
  protected composer = new CollectionComposer<T>([]);

  /**
   * Element focus delegation.
   * Set to `false` and relies on native focusing.
   */
  public readonly delegatesFocus = false;

  /**
   * Renderer used to render list item elements
   * @type {ListRenderer}
   */
  @property({ type: Function, attribute: false })
  public renderer = new ListRenderer(this);

  /**
   * Disable selections
   */
  @property({ type: Boolean })
  public stateless = false;

  /**
   * Allow multiple selections
   */
  @property({ type: Boolean })
  public multiple = false;

  /**
   * The data object, used to render the list.
   * @type {ListData}
   * @default null
   */
  @property({ attribute: false })
  public get data (): ListData<T> {
    return this._data;
  }
  public set data (value: ListData<T>) {
    const oldValue = this._data;
    if (oldValue === value) {
      return;
    }
    if (value instanceof CollectionComposer) {
      this.composer = value;
    }
    else if (Array.isArray(value)) {
      this.composer = new CollectionComposer<T>(value);
    }
    else {
      this.composer = new CollectionComposer<T>([]);
    }
    this.composer.on(
      'modification', // Listen for modifications
      this.modificationUpdate // Update the template
    );
    this.clearMaps();
    this._data = value;
    this.requestUpdate('data', oldValue);
  }

  private _data: ListData<T> = null;

  /**
   * Returns the first selected item value.
   * Use `values` when multiple selection mode is enabled.
   * @default -
   */
  @property({ type: String })
  public get value (): string {
    return this.values[0] || '';
  }

  public set value (value: string) {
    const oldValue = this.value;
    if (value !== oldValue || this.values.length > 1) {
      this.clearSelection();
      const item = this.queryItemsByPropertyValue('value', value)[0];
      if (item) {
        this.composer.setItemPropertyValue(item, 'selected', true);
      }
      this.requestUpdate('value', oldValue);
    }
  }

  /**
   * Returns a values collection of the currently
   * selected item values
   * @type {string[]}
   * @default []
   * @readonly
   */
  @property({ type: Array, attribute: false })
  public get values (): string[] {
    return this.queryItemsByPropertyValue('selected', true)
      .map((item: T) => this.composer.getItemPropertyValue(item, 'value') as string);
  }
  public set values (values: string[]) {
    if (!Array.isArray(values)) {
      valueFormatWarning.show();
      this.values = [];
    }
    else {
      // Clone value arrays
      const newValue = values.slice();
      const oldValue = this.values.slice();
      // Create comparison strings to check for differences
      const newComparison = newValue.sort().toString();
      const oldComparison = oldValue.sort().toString();
      // Should we update the selection state?
      if (newComparison !== oldComparison) {
        this.clearSelection();
        values.some((value) => {
          const matches = this.queryItemsByPropertyValue('value', value);
          matches.forEach((match) => this.composer.setItemPropertyValue(match, 'selected', true));
          return !this.multiple; // Only set the fist value if multiple is not enabled
        });
        this.requestUpdate('values', oldValue);
      }
    }
  }

  /**
   * Selects an item in the list
   * @param item Data Item or Item Element
   * @returns If a selection has been made or not
   */
  public selectItem (item?: T | HTMLElement): boolean {
    if (!this.stateless) {
      if (item instanceof HTMLElement) {
        item = this.itemFromElement(item);
      }
      if (item && this.multiple) {
        const value = this.composer.getItemPropertyValue(item, 'selected');
        this.composer.setItemPropertyValue(item, 'selected', !value);
        return true;
      }
      if (item && this.composer.getItemPropertyValue(item, 'selected') !== true) {
        this.clearSelection();
        this.composer.setItemPropertyValue(item, 'selected', true);
        return true;
      }
    }
    return false;
  }

  /**
   * Navigate up through the list items
   * @returns {void}
   */
  public up (): void {
    this.highlightItem(this.getNextHighlightItem(Direction.UP), true);
  }

  /**
   * Navigate down through the list items
   * @returns {void}
   */
  public down (): void {
    this.highlightItem(this.getNextHighlightItem(Direction.DOWN), true);
  }

  /**
   * Navigate to first focusable item of the list
   * @returns {void}
   */
  public first (): void {
    const firstItem = this.itemMap.get(this.tabbableItems[0]);
    this.highlightItem(firstItem, true);
  }

  /**
   * Navigate to first focusable item of the list
   * @returns {void}
   */
  public last (): void {
    const lastItem = this.itemMap.get(this.tabbableItems[this.tabbableItems.length - 1]);
    this.highlightItem(lastItem, true);
  }

  /**
   * Proxy for querying the composer
   * @param engine composer querying engine
   * @returns Collection of queried items
   */
  protected queryItems (engine: (item: T, composer: CollectionComposer<T>) => boolean): readonly T[] {
    return this.composer.queryItems(engine);
  }

  /**
   * Proxy for querying the composer by property and value
   * @param property Property name
   * @param value Property value
   * @returns Collection of queried items
   */
  protected queryItemsByPropertyValue<K extends keyof T> (property: K, value: T[K]): readonly T[] {
    return this.composer.queryItemsByPropertyValue(property, value);
  }

  /**
   * Gets the associated element for the data item provided,
   * if there is one available.
   * @param item Item to map element to
   * @returns Associated element
   */
  protected elementFromItem (item: T): HTMLElement | undefined {
    return this.elementMap.get(item);
  }

  /**
   * Gets the associated data item for the provided element,
   * if there is one available.
   * @param element Element to map item to
   * @returns Associated date item
   */
  protected itemFromElement (element: HTMLElement): T | undefined {
    return this.itemMap.get(element);
  }

  /**
   * Tries to find the next focusable element.
   * @param direction Direction to search
   * @param element Starting element
   * @returns Next logical element to focus
   */
  protected getNextFocusableItem (direction: Direction, element = this.activeElement): HTMLElement | undefined {
    if (!element) {
      return;
    }
    const children = this.tabbableItems;
    if (children.length > 1) {
      let index = children.indexOf(element) + direction;
      index = index < 0 ? children.length - 1 : index === children.length ? 0 : index;
      return children[index];
    }
  }

  /**
   * Tries to find the next highlight item
   * @param direction Direction to search
   * @returns A data item, if found.
   */
  protected getNextHighlightItem (direction: Direction): T | undefined {
    const highlightItem = this.queryItemsByPropertyValue('highlighted', true)[0];
    const nextElement = this.getNextFocusableItem(direction) || this.getNextFocusableItem(direction, this.elementFromItem(highlightItem));
    const backupElement = this.tabbableItems[0];
    return nextElement ? this.itemFromElement(nextElement) : backupElement ? this.itemFromElement(backupElement) : undefined;
  }

  /**
   * Clears any highlighted item
   * @returns {void}
   */
  protected clearHighlighted (): void {
    this.queryItemsByPropertyValue('highlighted', true)
      .forEach(item => this.composer.setItemPropertyValue(item, 'highlighted', false));
  }

  /**
   * Highlights a single item.
   * Used for navigation.
   * @param item Item to highlight
   * @param scrollToItem Scroll the item into view?
   * @returns {void}
   */
  protected highlightItem (item?: T, scrollToItem = false): void {
    if (item) {
      this.clearHighlighted();
      this.composer.setItemPropertyValue(item, 'highlighted', true);
      const id = getItemId(this.renderer.key, item.value);
      this.tabIndex >= 0 && id && this.setAttribute('aria-activedescendant', id);
      scrollToItem && this.scrollToItem(item);
    }
  }

  /**
   * Gets the available tabbable elements
   */
  protected get tabbableItems (): HTMLElement[] {
    return Array.from(this.children).filter((el): el is HTMLElement => {
      if (el instanceof HTMLElement) {
        const role = el.getAttribute('role');
        const isEnabled = !el.hasAttribute('disabled');
        const isOption = role ? ['option', 'treeitem'].includes(role) : false;

        return isOption && isEnabled;
      }
      return false;
    });
  }

  /**
   * Returns the current focused element
   */
  protected get activeElement (): HTMLElement | null {
    const el = (this.getRootNode() as ShadowRoot | HTMLDocument).activeElement as HTMLElement | null;
    const itemEl = this.findItemElementFromTarget(el);
    if (itemEl && this.tabbableItems.includes(itemEl)) {
      return itemEl;
    }
    return null;
  }

  /**
   * Returns the current focused element
   */
  protected get highlightElement (): HTMLElement | null {
    const item = this.queryItemsByPropertyValue('highlighted', true)[0];
    return item ? this.elementFromItem(item) || null : null;
  }

  /**
   * Tries to select the current highlighted element
   * @returns {void}
   */
  protected triggerActiveItem (): void {
    const el = this.activeElement || this.highlightElement;
    const item = el && this.itemFromElement(el);
    item && this.selectItem(item) && this.fireSelectionUpdate();
  }

  /**
   * Scroll to list item element
   * @param item Data item to scroll to
   * @returns {void}
   */
  public scrollToItem (item: T): void {
    const element = this.elementFromItem(item);
    if (element) {
      const min = this.scrollTop;
      const max = this.scrollTop + this.clientHeight - element.offsetHeight;
      const pos = element.offsetTop;
      pos > max ? this.scrollTop = element.offsetTop - this.clientHeight + element.offsetHeight
        : pos < min ? this.scrollTop = element.offsetTop : 0;
    }
  }

  /**
   * Handles key input
   * @param event Key down event object
   * @returns {void}
   */
  protected onKeyDown (event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
      case 'Spacebar':
      case 'Enter':
        this.triggerActiveItem();
        break;
      case 'Up':
      case 'ArrowUp':
        this.up();
        break;
      case 'Down':
      case 'ArrowDown':
        this.down();
        break;
      case 'Home':
        this.first();
        break;
      case 'End':
        this.last();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  /**
   * Handle list on tap
   * Typically it will select an item
   * @param event Event to handle
   * @returns {void}
   */
  protected onTap (event: TapEvent): void {
    const el = this.findItemElementFromTarget(event.target);
    const item = el && this.itemFromElement(el);
    if (item) {
      this.clearHighlighted();
      if (this.selectItem(item)) {
        this.highlightItem(item);
        this.fireSelectionUpdate();
      }
    }
  }

  /**
   * Handles mouse move
   * Typically it will highlight an item
   * @param event Event to handle
   * @returns {void}
   */
  protected onMouse (event: Event): void {
    const el = this.findItemElementFromTarget(event.target);
    const item = el ? this.itemFromElement(el) : null;
    if (item && el !== this.highlightElement) {
      if (this.activeElement) {
        // prevent shifting focus to other items
        // on mouse move and just fallback to host
        this.activeElement.focus({ preventScroll: true });
      }
      this.highlightItem(item);
    }
  }

  /**
   * Handles item focus in
   * Typically it will highlight the item
   * @param event Event to handle
   * @returns {void}
   */
  protected onFocus (event: FocusEvent): void {
    const el = this.findItemElementFromTarget(event.target);
    const item = el && this.itemFromElement(el);
    if (item) {
      this.highlightItem(item);
    }
  }

  /**
   * Handles item focus out
   * Typically it will remove highlighting
   * @returns {void}
   */
  protected onBlur (): void {
    this.clearHighlighted();
    this.removeAttribute('aria-activedescendant');
  }

  /**
   * Tries to find a known item element,
   * from an event target
   * @param target Event target
   * @returns Found element, if available
   */
  protected findItemElementFromTarget (target: EventTarget | HTMLElement | null): HTMLElement | null {
    let el = target as HTMLElement | null;
    while (el) {
      if (this.itemMap.has(el)) {
        break; // known rendered item
      }
      el = el.parentElement;
    }
    return el;
  }

  /**
   * Clears the current selected items
   * @returns {void}
   */
  protected clearSelection (): void {
    this.queryItemsByPropertyValue('selected', true)
      .forEach((item: T) => this.composer.setItemPropertyValue(item, 'selected', false));
    this.requestUpdate();
  }

  /**
   * Queries and returns all renderable items.
   * @returns Collection of renderable items
   */
  protected get renderItems (): readonly T[] {
    return this.queryItems((item, composer): boolean => {
      return composer.getItemPropertyValue(item, 'hidden') !== true;
    });
  }

  /**
   * Proxy for creating list item elements.
   * Allows for a mapping to be created between
   * Data Item and Item Element.
   * @param item Data item context
   * @param recyclableElements Child elements available for reuse
   * @returns List item element
   */
  private createListItem (item: T, recyclableElements: HTMLElement[]): Element {
    const cachedElement = this.elementFromItem(item);
    const previousTimestamp = this.renderTimestamp.get(item) || NaN;
    if (cachedElement && previousTimestamp > this.composer.getItemTimestamp(item)) {
      return cachedElement; // don't re-render if the item hasn't changed
    }
    if (!cachedElement && recyclableElements.length) {
      // Remove any old ties with the reusable element.
      const recycledElement = recyclableElements.pop() as HTMLElement;
      const previousItem = this.itemFromElement(recycledElement);
      this.itemMap.delete(recycledElement);
      previousItem && this.elementMap.delete(previousItem);
      this.elementMap.set(item, recycledElement);
    }
    const freshElement = this.renderer(item, this.composer, this.elementFromItem(item)) as HTMLElement;
    if (cachedElement && cachedElement !== freshElement) {
      // Renderer returned a new element, so remove the old link.
      this.itemMap.delete(cachedElement);
    }

    this.itemMap.set(freshElement, item); // Link element to item
    this.elementMap.set(item, freshElement); // Link item to element
    this.renderTimestamp.set(item, performance.now());

    return freshElement;
  }

  /**
   * Clears all item-element and timestamp maps
   * @returns {void}
   */
  private clearMaps (): void {
    this.itemMap.clear();
    this.elementMap.clear();
    this.renderTimestamp.clear();
  }

  /**
   * Fire value changed event
   * @returns {void}
   */
  private fireSelectionUpdate (): void {
    /**
     * @event List#value-changed
     */
    this.notifyPropertyChange('value', this.value);
  }

  /**
   * Calculates what elements can be recycled safely
   * @param renderItems Current items to render
   * @returns Collection of elements to be recycled
   */
  private calculateRecyclableElements (renderItems: T[] | readonly T[]): HTMLElement[] {
    const result: HTMLElement[] = [];
    for (const element of this.children) {
      const item = this.itemFromElement(element as HTMLElement);
      if (item && !renderItems.includes(item)) {
        result.push(element as HTMLElement);
      }
    }
    return result;
  }

  /**
   * Renders updates to light DOM
   * @returns {void}
   */
  protected renderLightDOM (): void {
    const renderItems = this.renderItems;
    const currentChildren = Array.from(this.children);
    const recyclableElements = this.calculateRecyclableElements(renderItems);
    const renderChildren = renderItems.map((item) => this.createListItem(item, recyclableElements));
    const deletions = currentChildren.filter(element => !renderChildren.includes(element));
    deletions.forEach(element => this.removeChild(element));
    renderChildren.forEach((element, index) => {
      if (this.children.length === index) {
        this.appendChild(element);
      }
      else if (element !== this.children[index]) {
        this.insertBefore(element, this.children[index]);
      }
    });
  }

  /**
   * Invoked when the element is first updated. Implement to perform one time work on the element after update.
   * @param changeProperties changed properties
   * @returns {void}
   */
  protected firstUpdated (changeProperties: PropertyValues): void {
    super.firstUpdated(changeProperties);

    this.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('tap', this.onTap);
    this.addEventListener('mousemove', this.onMouse);
    this.addEventListener('mouseleave', this.clearHighlighted);
    this.addEventListener('focusin', this.onFocus);
    this.addEventListener('focusout', this.onBlur);
  }

  /**
   * Invoked before update() to compute values needed during the update.
   * @param changeProperties changed properties
   * @returns {void}
   */
  protected willUpdate (changeProperties: PropertyValues): void {
    if (changeProperties.has('multiple')) {
      this.renderTimestamp.clear(); // force render of all items
      this.setAttribute('aria-multiselectable', this.multiple ? 'true' : 'false');
    }
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: block;
        max-height: 600px;
        overflow-y: auto;
        position: relative; /* required for scrollToItem */
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    this.renderLightDOM();
    return html`<slot></slot>`;
  }
}

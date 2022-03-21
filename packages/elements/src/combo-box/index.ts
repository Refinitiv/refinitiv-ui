import {
  FormFieldElement,
  css,
  CSSResultGroup,
  html,
  PropertyValues,
  TapEvent,
  TemplateResult,
  WarningNotice,
  FocusedPropertyKey,
  StyleMap
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { eventOptions } from '@refinitiv-ui/core/decorators/event-options.js';
import { styleMap } from '@refinitiv-ui/core/directives/style-map.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';
import { VERSION } from '../version.js';
import { CollectionComposer, DataItem } from '@refinitiv-ui/utils/collection.js';
import { AnimationTaskRunner, TimeoutTaskRunner } from '@refinitiv-ui/utils/async.js';
import { ItemData } from '../item';
import { ComboBoxData, ComboBoxFilter } from './helpers/types';
import type { List } from '../list/index.js';
import { ComboBoxRenderer } from './helpers/renderer.js';
import { defaultFilter } from './helpers/filter.js';
import { CustomKeyboardEvent } from './helpers/keyboard-event.js';
import '../icon/index.js';
import '../overlay/index.js';
import '../list/index.js';
import '../counter/index.js';
import { translate, TranslateDirective } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/locale/en/combo-box.js';

export type { ComboBoxFilter, ComboBoxData };
export { ComboBoxRenderer };

const QUERY_DEBOUNCE_RATE = 0;

// Maximum number of characters to display in multiple mode
const MULTIPLE_LABEL_MAX_SIZE = 250;

// Separator for labels in multiple mode
// Double space is expected
const MULTIPLE_LABEL_SEPARATOR = ';  ';

const POPUP_POSITION = ['bottom-start', 'top-start'];

const valueFormatWarning = new WarningNotice('The specified \'values\' format does not conform to the required format.');
const freeTextMultipleWarning = new WarningNotice('"free-text" mode is not compatible with "multiple" mode');

/**
 * Combines a popup with a filterable selection list
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {string} name - Set name of the element
 * @prop {string} [name=''] - Set name of the element
 *
 * @fires value-changed - Dispatched when value changes
 * @fires query-changed - Dispatched when query changes
 * @fires opened-changed - Dispatched when opened state changes
 */
@customElement('ef-combo-box', {
  alias: 'coral-combo-box'
})
export class ComboBox<T extends DataItem = ItemData> extends FormFieldElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
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
        display: inline-flex;
        flex-flow: row nowrap;
        user-select: none;
        outline: none;
      }
      [part~=input-wrapper] {
        cursor: pointer;
      }
      [part~=input] {
        cursor: text;
      }
      [part~=input]::-ms-clear {
        display: none;
      }
      [hidden] {
        display: none !important;
      }
    `;
  }

  /**
   * Custom filter for static data
   * Set this to null when data is filtered externally, eg XHR
   * @type {ComboBoxFilter<T> | null}
   */
  @property({ type: Function, attribute: false })
  public filter: ComboBoxFilter<T> | null = defaultFilter<T>(this);

  /**
   * Renderer used to render list item elements
   * @type {ComboBoxRenderer}
   */
  @property({ type: Function, attribute: false })
  public renderer = new ComboBoxRenderer(this);

  private _multiple = false;
  /**
   * Multiple selection mode
   * @param multiple true to set multiple mode
   * @default false
   */
  @property({ type: Boolean })
  public set multiple (multiple: boolean) {
    if (multiple && this.freeText) {
      freeTextMultipleWarning.show();
      multiple = false;
    }
    const oldMultiple = this._multiple;
    this._multiple = multiple;
    this.requestUpdate('multiple', oldMultiple);
  }
  public get multiple (): boolean {
    return this._multiple;
  }

  /**
   * Track opened state of popup
   */
  @property({ type: Boolean, reflect: true })
  public opened = false;

  /**
   * Placeholder for input field
   */
  @property({ type: String })
  public placeholder = '';

  /**
   * Show clears button
   */
  @property({ type: Boolean })
  public clears = false;

  private _freeText = false;
  /**
   * Allow to enter any value
   * @param freeText true to set freeText mode
   * @default false
   */
  @property({ type: Boolean, attribute: 'free-text' })
  public set freeText (freeText: boolean) {
    if (this.multiple && freeText) {
      freeTextMultipleWarning.show();
      freeText = false;
    }
    if (!freeText) {
      this.freeTextValue = '';
    }
    const oldFreeText = this._freeText;
    this._freeText = freeText;
    this.requestUpdate('freeText', oldFreeText);
  }
  public get freeText (): boolean {
    return this._freeText;
  }

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

  // Internal reference to debounce rate
  private _queryDebounceRate = QUERY_DEBOUNCE_RATE;

  // Debounces the query using queryDebounceRate
  private queryDebouncer = new TimeoutTaskRunner(this._queryDebounceRate);

  /**
   * Control query rate, defaults to 0
   */
  @property({ type: Number, attribute: 'query-debounce-rate' })
  public get queryDebounceRate (): number {
    return this._queryDebounceRate;
  }
  public set queryDebounceRate (value: number) {
    const oldValue = this._queryDebounceRate;
    if (value !== oldValue) {
      this._queryDebounceRate = value;
      this.queryDebouncer = new TimeoutTaskRunner(this._queryDebounceRate);
      // no need to update as this is called for input changes
    }
  }

  private _data: ComboBoxData<T> = []; // Local data object set through data setter
  /**
   * Data array to be displayed
   * @type {ComboBoxData<T>}
   * @default []
   */
  @property({ attribute: false })
  public get data (): ComboBoxData<T> {
    return this._data;
  }
  public set data (value: ComboBoxData<T>) {
    this._data = value;
    void this.resolveDataPromise(value);
  }

  /**
   * `value` always initialised before `data`, so it cannot query and select items when using attribute.
   * This variable is to store value for selecting a data item after data has been initialised.
   */
  private cachedValue = '';
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
    /**
     * Set the value if the data is ready,
     * otherwise cache it for later.
     */
    if (this.composer.size) {
      this.values = [value];
    }
    else {
      this.cachedValue = value;
    }
  }

  /**
   * Returns a values collection of the currently
   * selected item values
   * @type {string[]}
   * @default []
   */
  @property({ type: Array, attribute: false })
  public get values (): string[] {
    // In free text mode, compare selected to values
    return this.freeTextValue ? [this.freeTextValue] : this.composerValues;
  }
  public set values (values: string[]) {
    if (!Array.isArray(values)) {
      valueFormatWarning.show();
      this.values = [];
    }
    else {
      // Clone value arrays
      const newValues = values.slice(0, this.multiple ? values.length : 1);
      const oldValues = this.values.slice();
      // Create comparison strings to check for differences
      const newComparison = newValues.sort().toString();
      const oldComparison = oldValues.sort().toString();

      // Update the selection state when found new value
      if (newComparison !== oldComparison) {
        this.updateComposerValues(newValues);

        if (this.freeText) {
          // free text mode is only supported in single selection mode
          // so if there is no valid selection in the composer, we can assume
          // the first item can be used as the free text item.
          this.freeTextValue = !this.composerValues.length ? newValues[0] : '';
        }

        this.requestUpdate('values', oldValues);
      }
    }
  }

  /**
   * Update composer values.
   * @param newValues new values
   * @returns {void}
   */
  protected updateComposerValues (newValues: string[]): void {
    this.queryItems((item, composer): boolean => {
      if (newValues.includes(composer.getItemPropertyValue(item, 'value') as string)) {
        composer.setItemPropertyValue(item, 'selected', true);
        return true;
      }
      composer.setItemPropertyValue(item, 'selected', false);
      return false;
    });
  }

  private _query: string | null = null; // Internally set and store query value
  /**
   * Query string applied to combo-box
   * Set via internal input
   * @readonly
   * @default null
   */
  @property({ type: String, attribute: false })
  public get query (): string | null {
    return this._query;
  }
  public set query (query: string | null) {
    const oldVal = this._query;
    this._query = query;
    this.queryDebouncer.cancel();
    if (oldVal !== this._query) {
      this.clearHighlighted();
      this.filterItems();
      this.requestUpdate('query', oldVal);
    }
  }

  /**
   * Label of selected value
   * @returns Label to use, defaults to empty string
   * @default -
   * @readonly
   */
  public get label (): string {
    const labels = this.selectedLabels;

    if (labels.length <= 1) {
      return labels[0] || '';
    }

    // multiple mode, do according to UX specs
    const output = labels.join(MULTIPLE_LABEL_SEPARATOR);
    return output.length > MULTIPLE_LABEL_MAX_SIZE ? `${output.slice(0, MULTIPLE_LABEL_MAX_SIZE - 3)}...` : output;
  }

  /**
   * Composer used to query and modify item state.
   */
  protected composer: CollectionComposer<T> = new CollectionComposer<T>([]);

  /**
   * Initiate one time popup rendering
   */
  protected lazyRendered = false;

  /**
   * Throttle popup resizing
   */
  protected resizeThrottler = new AnimationTaskRunner();

  /**
   * Input text to display in text field while typing
   * Use because of query debouncer to avoid input to be not in sync with query
   */
  protected inputText = '';

  /**
   * Used to store free text value
   * If freeText mode is defined
   */
  protected freeTextValue = '';

  /**
   * Hold popup styling applied on open
   */
  protected popupDynamicStyles: StyleMap = {};

  /**
   * Internal reference to list element
   */
  @query('#internal-list')
  protected listEl?: List<T>;

  /**
   * Internal reference to toggle button
   */
  @query('#toggle-button')
  protected toggleButtonEl!: HTMLElement;

  /**
   * Internal reference to clears button
   */
  @query('#clears-button')
  protected clearsButtonEl?: HTMLElement;

  /**
   * Use to call request update when CC changes its value
   * @returns {void}
   */
  protected modificationHandler = (): void => this.modificationUpdate();

  private _resolvedData: T[] = [];
  /**
   * Get resolved data (if possible)
   */
  protected get resolvedData (): T[] {
    return this._resolvedData;
  }

  /**
   * Set resolved data
   * @param value resolved data
   */
  protected set resolvedData (value: T[]) {
    const oldValue = this._resolvedData;
    if (value !== oldValue) {
      if (Array.isArray(value)) {
        this.composer = new CollectionComposer<T>(value);
      }
      else {
        this.composer = new CollectionComposer<T>([]);
      }

      this.listenToComposer();
      this._resolvedData = value;

      /**
       * Select using initialised the value once from attribute/property,
       * only when there is no existing selections.
       */
      if (this.cachedValue && this.selection.length === 0) {
        this.value = this.cachedValue;
        this.cachedValue = ''; // Reset as it's only needed for initialisation
      }
      this.requestUpdate('data', oldValue);
    }
  }

  private dataPromiseCounter = 0; // A counter to detect that the promise resolved is the last promise set
  /**
   * Used to resolve data when set as a promise
   * @param data Data promise
   * @returns Promise<void>
   */
  protected async resolveDataPromise (data: ComboBoxData<T>): Promise<void> {
    const dataPromiseCounter = this.dataPromiseCounter += 1;
    let resolvedData: T[];

    if (data instanceof Promise) {
      this.loading = true;
      try {
        resolvedData = await data;
      }
      catch (error) {
        resolvedData = [];
      }
    }
    else {
      resolvedData = data;
    }

    if (dataPromiseCounter === this.dataPromiseCounter) {
      this.resolvedData = resolvedData;
      this.loading = false;
    }
  }

  /**
   * The the values from composer ignoring freeTextValue
   */
  protected get composerValues (): string[] {
    return this.queryItemsByPropertyValue('selected', true)
      .map(item => this.getItemPropertyValue(item, 'value') as string);
  }

  /**
   * Get the first value of highlighted item
   */
  protected get highlightedItemValue (): string | null {
    if (!this.opened) {
      return null;
    }
    return this.highlightedItems.map(item => this.getItemPropertyValue(item, 'value') as string)[0] || '';
  }

  /**
   * Mark combobox with loading flag
   * Used in conjunction with data promise
   */
  @property({ type: String, reflect: true })
  protected loading = false;

  /**
   * Used for translations
   */
  @translate({ scope: 'ef-combo-box' })
  protected t!: TranslateDirective;

  /**
   * Return currently selected items
   * This is distinct from values as for controls with persistence features
   * it can be used to show current selection count and get the selection labels
   * @returns List of selected items
   */
  protected get selection (): T[] {
    return this.queryItemsByPropertyValue('selected', true).slice();
  }

  /**
   * Count of selected items
   * @returns Has selection
   */
  protected get selectionCount (): number {
    return this.selection.length;
  }

  /**
   * Determine if list has visible items
   * @returns List has visible items or not
   */
  protected get listHasVisibleItems (): boolean {
    return this.resolvedData.some(item => !this.getItemPropertyValue(item, 'hidden'));
  }

  /**
   * Selected item
   * @returns Has selection
   */
  protected get selectedItem (): T | undefined {
    return this.queryItemsByPropertyValue('selected', true)[0];
  }

  /**
   * Get a list of selected item labels
   * @returns Has selection
   */
  protected get selectedLabels (): string[] {
    return this.selection.map(selected => (this.getItemPropertyValue(selected, 'label') as string) || '');
  }

  /**
   * Utility method  - ensures correct composer is being listened to
   * @returns {void}
   */
  protected listenToComposer (): void {
    this.composer.on(
      'modification', // Listen for modifications
      this.modificationHandler // Update the template
    );
  }

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    const focusedChanged = changedProperties.has(FocusedPropertyKey);

    // the opened logic is bound to focus state
    if (focusedChanged) {
      // When focus changes the popup can open only on tapstart
      if (this.focused && this.shouldOpenOnFocus) {
        this.setOpened(true);
      }
      else if (!this.focused) {
        this.setOpened(false);
      }

      this.shouldOpenOnFocus = false;
    }

    /*
    * data can be visible and opened changed = open
    * or, opened is true and data; and contains visible data = open
    * queries local properties first to short circuit querying map iteration
    */
    if (changedProperties.has('opened')) {
      if (this.opened) {
        // fulfil any queries if opened is changed
        // this is the case if keyboard navigation is used
        this.queryDebouncer.fulfil();
        this.opening();
      }
      else {
        this.clearHighlighted();
      }
    }

    // combo-box may be opened programmatically (via opened attribute)
    // make sure that the element correctly reacts on this change
    if ((changedProperties.has('data') && this.opened && !this.focused) || focusedChanged) {
      this.resetInput();
    }

    // If label is defined it means that there is an actual value
    // Select input text to simplify clearing the value
    if (focusedChanged && this.focused && this.label && this.inputElement) {
      this.inputElement.focus();
      this.inputElement.select();
    }

    // Make sure that the first item is always highlighted
    if (this.opened && (changedProperties.has('opened') || changedProperties.has('data') || changedProperties.has('query'))) {
      this.highlightFirstItem();
    }

    // If data is set asynchronously while popup is opened
    // list might not trigger popup update
    if (changedProperties.has('data') && this.opened) {
      this.forcePopupLayout();
    }

    super.update(changedProperties);
  }

  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('tapstart', this.onTapStart);
  }

  /**
   * Sets opened state and fires event
   * Use this to set opened state when user interacts to the component
   * @param opened True if opened
   * @returns {void}
   */
  protected setOpened (opened: boolean): void {
    if (this.opened !== opened && this.notifyPropertyChange('opened', opened, true)) {
      this.opened = opened;
    }
  }

  /**
   * Requests an update after a composer modification.
   * @returns {void}
   */
  protected modificationUpdate (): void {
    this.requestUpdate();
  }

  /**
   * Queries the composer for data items
   * @param engine Composer query engine
   * @returns Collection of matched items
   */
  protected queryItems (engine: (item: T, composer: CollectionComposer<T>) => boolean): readonly T[] {
    return this.composer.queryItems(engine);
  }

  /**
   * Queries the composer for data items,
   * matching by property value.
   * @param property Property name to query
   * @param value Property value to match against
   * @returns Collection of matched items
   */
  protected queryItemsByPropertyValue<K extends keyof T> (property: K, value: T[K]): readonly T[] {
    return this.composer.queryItemsByPropertyValue(property, value, 0);
  }

  /**
   * Gets the property value of an item
   * @param item Original data item
   * @param property Property name to get the value of
   * @returns Value of the property
   */
  protected getItemPropertyValue<K extends keyof T> (item: T, property: K): T[K] {
    return this.composer.getItemPropertyValue(item, property);
  }

  /**
   * Sets the property value of an item
   * @param item Original data item
   * @param property Property name to set the value of
   * @param value New value of the property
   * @returns {void}
   */
  protected setItemPropertyValue<K extends keyof T> (item: T, property: K, value: T[K]): void {
    this.composer.setItemPropertyValue(item, property, value);
  }

  /**
   * Set width on popup using parent and --list-max-width if set
   * @returns {void}
   */
  protected opening (): void {
    this.lazyRendered = true;
    this.restrictPopupWidth();
  }

  /**
   * Scrolls to the currently selected item
   * @returns {void}
   */
  protected scrollToSelected (): void {
    const item = this.selectedItem;
    if (item) {
      this.listEl?.scrollToItem(item);
    }
  }

  /**
   * Get a list of highlighted items
   */
  protected get highlightedItems (): readonly T[] {
    return this.queryItemsByPropertyValue('highlighted', true);
  }

  /**
   * Highlights the item
   * @param item data item to highlight
   * @returns {void}
   */
  protected highlightItem (item: T): void {
    this.clearHighlighted();
    this.setItemPropertyValue(item, 'highlighted', true);
  }

  /**
   * Clears any highlighted items
   * @returns {void}
   */
  protected clearHighlighted (): void {
    this.highlightedItems.forEach(item => this.setItemPropertyValue(item, 'highlighted', false));
  }

  /**
   * Popup has to use max width if --list-max-width specified
   * otherwise, popup should have same width as control or wider
   * @returns {void}
   */
  protected restrictPopupWidth (): void {
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

    const maxWidth = parseFloat(this.getComputedVariable('--list-max-width', 'none'));
    let minWidth = this.offsetWidth;

    // reset min-width if max-width less than min-width, otherwise browser won't apply max-width
    if (maxWidth < minWidth) {
      minWidth = 0;
    }

    this.popupDynamicStyles.minWidth = `${minWidth}px`;
  }

  /**
   * Set the query string and run `query-change` event
   * @param query query
   * @returns void
   */
  protected setQuery (query: string): void {
    const oldQuery = this.query;
    this.query = query; // reset debouncer here

    if (oldQuery !== query) {
      this.notifyPropertyChange('query', this.query);
    }
  }

  /**
   * Reset the input text to match label
   * @returns {void}
   */
  protected resetInput (): void {
    this.setQuery('');
    this.inputText = this.multiple ? '' : (this.freeTextValue || this.label);
  }

  /**
   * Filter the internal items by query
   * Changes items' hidden state
   * @returns {void}
   */
  protected filterItems (): void {
    // if filter is null, it is off and external app is responsible
    if (this.filter) {
      // we do not produce a new list as it will loose all association with this composer
      // unless we spent time re-applying this composer to a new list/composer
      // instead we change the hidden state
      // by list applying a queryItems itself and does not render hidden items
      // filter declared here to avoid the possibility of being null if used directly in the callback
      const filter = this.filter;
      let groupHeaderItem: T | null = null;
      this.queryItems((item, composer): boolean => {
        // do not filter hidden items
        if (item.hidden) {
          return false;
        }

        let result = false;

        // support groups
        if (composer.getItemPropertyValue(item, 'type') === 'header') {
          groupHeaderItem = item;
        }
        else {
          result = filter(item);
        }

        composer.setItemPropertyValue(item, 'hidden', !result);
        composer.updateItemTimestamp(item);

        if (result && groupHeaderItem && composer.getItemParent(groupHeaderItem) === composer.getItemParent(item)) {
          composer.setItemPropertyValue(groupHeaderItem, 'hidden', false);
          composer.updateItemTimestamp(groupHeaderItem);
          groupHeaderItem = null;
        }

        return result;
      });
    }

    this.forcePopupLayout();
  }

  /**
   * Highlight the selected item or the first available item
   * @returns {void}
   */
  protected highlightFirstItem (): void {
    let selectedItem: T | null = null;

    const highlightItem = this.queryItems((item, composer): boolean => {
      if (selectedItem || !this.canHighlightItem(item, composer)) {
        return false;
      }

      if (composer.getItemPropertyValue(item, 'selected') === true) {
        selectedItem = item;
      }

      return true;
    })[0];

    (selectedItem || highlightItem) && this.highlightItem(selectedItem || highlightItem);
  }

  /**
   * Check if an item can be highlighted
   * @param item Collection composer item
   * @param composer Collection composer
   * @returns can highlight
   */
  protected canHighlightItem (item: T, composer: CollectionComposer<T>): boolean {
    let canHighlight = !(composer.getItemPropertyValue(item, 'hidden') === true
        || (composer.getItemPropertyValue(item, 'type') || 'text') !== 'text'
        || composer.getItemPropertyValue(item, 'disabled') === true
        || composer.isItemLocked(item) === true);

    // check ancestors
    if (canHighlight) {
      const parent = composer.getItemParent(item);
      canHighlight = !parent || this.canHighlightItem(parent, composer);
    }

    return canHighlight;
  }

  /**
   * https://github.com/juggle/resize-observer/issues/42
   *
   * This event ensures that ResizeObserver picks up resize events
   * when popup is deeply nested inside shadow root.
   * TODO: remove this workaround once ResizeObserver handles shadow root scenario
   * @returns {void}
  */
  protected forcePopupLayout (): void {
    window.dispatchEvent(new Event('animationiteration'));
  }

  /**
   * Shift focus back to input.
   * This method is required to prevent popup from focusing
   * @returns {void}
   */
  @eventOptions({ capture: true })
  protected shiftFocus (): void {
    this.focus({
      preventScroll: true
    });
  }

  /**
   * Runs on input element `input` event
   * @param event `input` event
   * @returns {void}
   */
  protected override onInputInput (event: InputEvent): void {
    this.onInputValueChanged(event);
  }

  /**
   * Runs on input element `change` event
   * @param event `change` event
   * @returns {void}
   */
  protected override onInputChange (event: InputEvent): void {
    this.onInputValueChanged(event);
  }

  /**
   * Handle text value change from input field
   * @param event Custom Event fired from input field
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onInputValueChanged (event: InputEvent): void {
    const inputText = this.inputValue;
    /**
     * Query is used to track if there is a query
     * We always use it so the absence of it can be used to reapply the
     * selected item's label, if applicable
     */
    this.queryDebouncer.schedule(() => {
      this.setQuery(inputText);
    });

    // Reset text when clearing the value
    if (!this.multiple && !inputText) {
      this.setValueAndNotify('');
    }

    // always ensure that internal val matches input val
    this.inputText = inputText;

    // Used for free input. Never set it unless in free text mode
    if (this.freeText) {
      this.value = ''; // make sure that composer does not have selected
      this.freeTextValue = inputText;
      this.notifyPropertyChange('value', inputText);
    }

    this.setOpened(true);
  }

  /**
   * Handle list value changed
   * @returns {void}
   */
  protected onListValueChanged (): void {
    // cascade value changed event
    this.notifyPropertyChange('value', this.value);
    this.onListInteraction();
  }

  /**
   * Handle popup opened event
   *
   * Scrolls the current selection into view
   * @returns {void}
   */
  protected onPopupOpened (): void {
    this.scrollToSelected();
  }

  /**
   * Handle popup closed event
   *
   * Ensures that popup state equals combo box opened prop
   * @returns {void}
   */
  protected onPopupClosed (): void {
    this.setOpened(false);
  }

  /**
   * Run when input-wrapper is tapped
   * @param event Tap event
   * @returns {void}
   */
  protected onTapStart (event: TapEvent): void {
    // do nothing if disabled or readonly
    if (this.readonly || this.disabled) {
      return;
    }

    const path = event.composedPath();

    if (this.clearsButtonEl && path.includes(this.clearsButtonEl)) {
      this.onClearsButtonTap();
      return;
    }

    if (path.includes(this.toggleButtonEl)) {
      this.onToggleButtonTap();
      return;
    }

    this.onInputWrapperTap();
  }

  /**
   * Run when tap event happens on toggle button
   * @returns {void}
   */
  protected onToggleButtonTap (): void {
    if (this.opened) {
      this.setOpened(false);
    }
    else {
      this.openOnFocus();
    }
  }

  /**
   * Run when tap event happens on clears button
   * @returns {void}
   */
  protected onClearsButtonTap (): void {
    this.freeTextValue = '';
    this.inputText = '';
    this.setQuery('');
    this.setValueAndNotify('');
    this.openOnFocus();
  }

  /**
   * Run when tap event happens on input wrapper
   * excluding clears and toggles buttons
   * @returns {void}
   */
  protected onInputWrapperTap (): void {
    this.openOnFocus();
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
   * Handles key input
   * @param event Key down event object
   * @returns {void}
   */
  protected onKeyDown (event: KeyboardEvent): void {
    // Check if the event is already handle by list or it set to 'readonly'
    if (event.defaultPrevented || this.readonly) {
      return;
    }

    switch (event.key) {
      case 'Enter':
        this.enter(event);
        break;
      case 'Up':
      case 'ArrowUp':
        this.up(event);
        break;
      case 'Down':
      case 'ArrowDown':
        this.down(event);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  /**
   * Run when tap event or enter
   * happened on the list
   * @returns {void}
   */
  protected onListInteraction (): void {
    this.freeTextValue = ''; // when the item has been selected, reset the freeText

    if (!this.multiple) {
      this.resetInput();
      const label = this.label;
      this.setOpened(false);

      // make sure that focus is kept withing an element
      // and the cursor is positioned at the end of input
      // Wait before the update cycle completes
      void this.updateComplete.then(() => {
        if (this.inputElement) {
          this.inputElement.focus();
          this.inputElement.setSelectionRange(label.length, label.length);
        }
      });
    }
  }

  /**
   * Handles action keys, either opening the list,
   * or, selecting a highlighted item.
   * @param event keyboard event
   * @returns {void}
   */
  protected enter (event: KeyboardEvent): void {
    if (this.opened && this.listEl) {
      this.reTargetEvent(event, this.listEl);
      this.onListInteraction();
    }
    else {
      this.setOpened(true);
    }
  }

  /**
   * Navigates up the list.
   * Opens the list if closed.
   * @param event keyboard event
   * @returns {void}
   */
  protected up (event: KeyboardEvent): void {
    if (this.opened && this.listEl) {
      this.reTargetEvent(event, this.listEl);
    }
    else {
      this.setOpened(true);
    }
  }

  /**
   * Navigates down the list.
   * Opens the list if closed.
   * @param event keyboard event
   * @returns {void}
   */
  protected down (event: KeyboardEvent): void {
    if (this.opened && this.listEl) {
      this.reTargetEvent(event, this.listEl);
    }
    else {
      this.setOpened(true);
    }
  }

  /**
   * Retarget event to target element
   * @param event keyboard event
   * @param target new target element
   * @returns re-targeted event or the passed event if target is invalid
   */
  protected reTargetEvent (event: KeyboardEvent, target: HTMLElement): CustomKeyboardEvent {
    const path = event.composedPath();

    /* istanbul ignore next */
    if (path[0] === target) {
      // this must not happen, but keep it here to avoid infinitive loop
      return event;
    }

    const keyboardEvent = new CustomKeyboardEvent(event.type, event);
    target.dispatchEvent(keyboardEvent);

    if (keyboardEvent.defaultPrevented) {
      event.preventDefault();
    }

    return keyboardEvent;
  }

  /**
   * Template for clear button
   * Rendered when `clears` attribute is set
   * @returns Popup template or undefined
   */
  protected get clearButtonTemplate (): TemplateResult | undefined {
    if (this.clears) {
      return html`
        <div
          id="clears-button"
          part="button button-clear"
          ?hidden=${!this.label && !this.query && !this.freeTextValue && !this.inputText}><ef-icon part="icon icon-clear" icon="cross"></ef-icon>
        </div>
      `;
    }
  }

  /**
   * Template for selection badge in multiple mode
   * @returns Selection badge template or undefined
   */
  protected get selectionBadgeTemplate (): TemplateResult | undefined {
    if (this.multiple) {
      const selectionLength = this.selectionCount;
      // TODO Make this a short format number using i18n which has specific support for this +
      // benefit of being localised too
      if (this.focused || selectionLength > 1) {
        return html`
        <ef-counter part="selection-badge" tabindex="-1" .value=${selectionLength} title=${ifDefined(selectionLength > 999 ? selectionLength.toLocaleString() : undefined)} max="999"></ef-counter>
      `;
      }
    }
  }

  /**
   * Returns a list template
   */
  protected get listTemplate (): TemplateResult {
    return html`
      <ef-list
        id="internal-list"
        tabindex="-1"
        @value-changed="${this.onListValueChanged}"
        .data="${this.composer}"
        .multiple="${this.multiple}"
        .renderer="${this.renderer}"
        ></ef-list>
    `;
  }

  /**
   * Returns a template showing no options text
   * Called when freeText mode is off and all items are filtered out
   */
  protected get noItemsTemplate (): TemplateResult | undefined {
    if (!this.freeText) {
      return html`<ef-item disabled>${this.t('NO_OPTIONS')}</ef-item>`;
    }
  }

  /**
   * Returns template for popup
   * Lazy loads the popup
   * @returns Popup template or undefined
   */
  protected get popupTemplate (): TemplateResult | undefined {
    if (this.lazyRendered) {
      const hasVisibleItems = this.listHasVisibleItems;
      return html`<ef-overlay
        part="list"
        style="${styleMap(this.popupDynamicStyles)}"
        @opened="${this.onPopupOpened}"
        @closed="${this.onPopupClosed}"
        .focusBoundary="${this}"
        .opened="${this.opened && (hasVisibleItems || !this.freeText)}"
        .positionTarget="${this}"
        .position="${POPUP_POSITION}"
        with-shadow
        no-overlap
        no-focus-management
        no-autofocus
        @focusin="${this.shiftFocus}"
      >${hasVisibleItems ? this.listTemplate : this.noItemsTemplate}</ef-overlay>`;
    }
  }

  /**
   * Decorate `<input>` element with common properties extended from combobox input
   * @returns template map
   */
  protected get decorateInputMap (): TemplateMap {
    return {
      ...super.decorateInputMap,
      'part': 'input',
      'type': 'text',
      'role': 'combobox',
      '.value': this.focused ? this.inputText : this.freeTextValue || this.label,
      'aria-expanded': this.opened ? 'true' : 'false',
      'aria-haspopup': 'listbox',
      'aria-autocomplete': 'list',
      'aria-owns': 'internal-list',
      'aria-activedescendant': this.highlightedItemValue
    };
  }

  /**
   * Returns a template for input field
   * @returns Input template
   */
  protected get inputTemplate (): TemplateResult {
    return html`<div part="input-wrapper">
      ${this.renderInput()}
      ${this.selectionBadgeTemplate}
      ${this.clearButtonTemplate}
      <div id="toggle-button" part="button button-toggle">
        <ef-icon part="icon icon-toggle" icon="down"></ef-icon>
      </div>
    </div>`;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.inputTemplate}
      ${this.popupTemplate}
    `;
  }
}

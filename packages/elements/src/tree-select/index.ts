import {
  html,
  TemplateResult,
  CSSResultGroup,
  css
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { styleMap } from '@refinitiv-ui/core/directives/style-map.js';
import { repeat } from '@refinitiv-ui/core/directives/repeat.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { VERSION } from '../version.js';
import { CollectionComposer } from '@refinitiv-ui/utils/collection.js';
import { TimeoutTaskRunner } from '@refinitiv-ui/utils/async.js';

import '../icon/index.js';
import '../text-field/index.js';
import '../pill/index.js';
import '../button/index.js';
import '../checkbox/index.js';
import '../tree/index.js';
import type { Overlay } from '../overlay';
import { ComboBox, ComboBoxFilter as TreeSelectFilter } from '../combo-box/index.js';
import type { CheckChangedEvent } from '../events';
import { TreeRenderer as TreeSelectRenderer } from '../tree/index.js';
import { CheckedState, TreeManager, TreeManagerMode } from '../tree/managers/tree-manager.js';

import type { TreeSelectData, TreeSelectDataItem } from './helpers/types';
import type { Pill } from '../pill';
import { translate, TranslateDirective } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/locale/en/tree-select.js';

export { TreeSelectRenderer };
export type { TreeSelectFilter, TreeSelectDataItem, TreeSelectData };

const MEMO_THROTTLE = 16;
const POPUP_POSITION = ['bottom-start', 'top-start'];

/**
 * Dropdown control that allows selection from the tree list
 *
 * @attr {boolean} [opened=false] - Set dropdown to open
 * @prop {boolean} [opened=false] - Set dropdown to open
 * @attr {string} placeholder - Set placeholder text
 * @prop {string} [placeholder=""] - Set placeholder text
 * @prop {TreeSelectData[]} [data=[]] - Data object to be used for creating tree
 * @fires confirm - Fired when selection is confirmed
 * @fires cancel - Fired when selection is cancelled
 * @fires query-changed - Fired when query in input box changed
 * @fires value-changed - Fired when value of control changed
 * @fires opened-changed - Fires when opened state changes
 */
@customElement('ef-tree-select', {
  alias: 'emerald-multi-select'
})
export class TreeSelect extends ComboBox<TreeSelectDataItem> {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  constructor () {
    super();
    /**
     * TODO:
     * @ignore
     */
    this.multiple = true;
  }

  public static get styles (): CSSResultGroup {
    return css`
      [part=list] {
        display: flex;
        flex-direction: row;
        box-sizing: content-box;
        cursor: default;
      }

      [part=section] {
        display: flex;
        flex-direction: column;
        width: inherit;
        height: inherit;
        max-height: inherit;
        min-height: inherit;
        max-width: inherit;
        min-width: inherit;
        overflow: hidden;
      }

      [part=selection-area] {
        min-height: 0;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: auto;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        outline: none;
      }

      [part~=control-container] {
        box-sizing: border-box;
        display: flex;
        flex-shrink: 0;
        flex-basis: auto;
        flex-grow: 0;
        align-items: center;
      }

      [part=pills] {
        flex: none;
      }
    `;
  }

  /**
   * Tracks the number of filter matches
   *
   * Only needed if internal filtering is unused
   */
  public filterCount = 0;
  /**
   * Memoized selection and expansion stats
   * Used for displaying counts and calculating control visibility/content
   */
  protected memo = {
    selected: 0,
    selectable: 0,
    expanded: 0,
    expandable: 0
  };

  /**
   * Extracted values from {@link this.checkedGroupedItems}
   */
  protected pillsData: TreeSelectDataItem[] = [];

  /**
   * Are there pills visible
   */
  protected hasPills = false;

  /**
   * Store references to items selected and visible at point of selection filter being applied
   * Allow for items to be removed from the selection, but still be visible
   */
  protected editSelectionItems: Set<TreeSelectDataItem> = new Set();

  /**
   * Composer used for live changes
   */
  protected composer: CollectionComposer<TreeSelectDataItem> = new CollectionComposer([]);

  /**
   * Provide access to tree interface
   */
  protected treeManager: TreeManager<TreeSelectDataItem> = new TreeManager(this.composer);

  /**
   * Modification updates are called a lot
   *
   * This throttles the memo updates to reduce lookups
   */
  protected memoUpdateThrottle = new TimeoutTaskRunner(MEMO_THROTTLE);

  /**
   * Used for translations
   * Beware tPromise!: TranslatePromise from Combo-box. It's different type from this translation.
   */
  @translate()
  protected t!: TranslateDirective;

  /**
   * Breaks the relationship when multiple
   * selection mode is enabled
   */
  @property({ attribute: 'no-relation', type: Boolean })
  public noRelation = false;

  /**
   * Should the control show pills
   */
  @property({ type: Boolean, attribute: 'show-pills' }) showPills = false;

  private _values: string[] = [];
  /**
   * Returns a values collection of the currently
   * selected item values
   * @type {string[]}
   * @default []
   */
  @property({ type: Array, attribute: false })
  public get values (): string[] {
    return this._values;
  }
  public set values (values: string[]) {
    super.values = values;
    this._values = values;
  }

  /**
   * Renderer used to render tree item elements
   * @type {TreeSelectRenderer}
   */
  @property({ type: Function, attribute: false })
  public renderer = new TreeSelectRenderer(this);

  /**
   * Internal reference to selection area element
   */
  @query('[part=selection-area]')
  protected selectionAreaEl?: Overlay;

  /**
   * Internal reference to popup element
   */
  @query('[part=list]')
  protected popupEl?: Overlay;

  /**
   * Set resolved data
   * @param value resolved data
   */
  protected set resolvedData (value: TreeSelectDataItem[]) {
    const oldValue = this.resolvedData;
    if (value !== oldValue) {
      super.resolvedData = value;
      this.treeManager = new TreeManager(this.composer, this.mode);

      // keep the original values
      // do not use values setter to avoid unnecessary calls
      this._values = this.composerValues;

      this.listenToComposer();

      this.updateMemo();
      this.updatePills();
      this.requestUpdate('data', oldValue);
    }
  }
  protected get resolvedData (): TreeSelectDataItem[] {
    return super.resolvedData;
  }

  /**
   * The the values from composer ignoring freeTextValue
   * @override
   */
  protected get composerValues (): string[] {
    return this.treeManager.checkedItems.map(item => item.value || '').slice();
  }

  /**
   * Provide list of currently selected items
   */
  protected get selection (): TreeSelectDataItem[] {
    return this.treeManager.checkedItems.slice();
  }

  /**
   * Get a list of selected item labels
   * @returns Has selection
   * @override
   */
  protected get selectedLabels (): string[] {
    return this.checkedGroupedItems.map(selected => (this.getItemPropertyValue(selected, 'label') as string) || '');
  }

  /**
   * Returns memoized selected state
   * @returns Has selection
   */
  protected get hasActiveSelection (): boolean {
    return this.memo.selected > 0;
  }

  /**
   * Returns memoized selectable state
   * @returns Has selectable
   */
  protected get hasSelectable (): boolean {
    return this.memo.selectable > 0;
  }

  /**
   * Returns memoized all selected count
   * @returns Is all selected
   */
  protected get isAllSelected (): boolean {
    return this.hasSelectable && this.memo.selected === this.memo.selectable;
  }

  /**
   * Returns memoized expansion state
   * @returns Are all expanded
   */
  protected get hasExpansion (): boolean {
    return this.memo.expanded > 0;
  }

  /**
   * Determines if the expansion controls should be displayed
   *
   * @returns Control visible state
   */
  protected get expansionControlVisible (): boolean {
    // could be a static prop and updated via CC
    return this.memo.expandable > 0;
  }

  /**
   * Determine if the selection filter is active
   * @returns Selection filter on/off
   */
  protected get selectionFilterState (): boolean {
    return this.editSelectionItems.size > 0;
  }

  /**
   * Mode to use in the tree manager
   */
  protected get mode (): TreeManagerMode {
    return !this.noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
  }

  /**
   * Get a list of selected items.
   * If all leaves are selected, a parent becomes selected
   * If mode is INDEPENDENT, grouping is not applied
   */
  protected get checkedGroupedItems (): readonly TreeSelectDataItem[] {
    const treeManager = this.treeManager;
    const checkedItems = treeManager.checkedItems;

    if (this.mode === TreeManagerMode.INDEPENDENT) {
      return checkedItems;
    }

    const checkedGroupItems: TreeSelectDataItem[] = [];
    const unchecked: TreeSelectDataItem[] = []; // need for performance to not double check same ancestors

    checkedItems.forEach(item => {
      const ancestors = treeManager.getItemAncestors(item);

      for (let i = 0; i < ancestors.length; i += 1) {
        const ancestor = ancestors[i];

        // An ancestor is already included. No need to continue
        if (checkedGroupItems.includes(ancestor)) {
          return;
        }

        // An ancestor has been already checked. Do not check again
        if (unchecked.includes(ancestor)) {
          continue;
        }

        // Ancestor is checked. No need to check any other ancestors
        if (treeManager.getItemCheckedState(ancestor) === CheckedState.CHECKED) {
          checkedGroupItems.push(ancestor);
          return;
        }

        // Do not check again this ancestor for performance
        unchecked.push(ancestor);
      }

      checkedGroupItems.push(item);
    });

    return checkedGroupItems;
  }

  /**
   * Persist the current selection
   * Takes the current selection and uses it for {@link TreeSelect.values}
   * Also uses current selection as a revert position for future changes
   * @returns {void}
   */
  protected persistSelection (): void {
    const oldValues = this.values.slice();
    const newValues = this.composerValues;

    const oldComparison = oldValues.sort().toString();
    const newComparison = newValues.sort().toString();

    if (oldComparison !== newComparison) {
      this.values = newValues;
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * Reverse selection. Run on Esc or Cancel
   * @returns {void}
   */
  protected cancelSelection (): void {
    const oldValues = this.values.slice();
    const newValues = this.composerValues;

    const oldComparison = oldValues.sort().toString();
    const newComparison = newValues.sort().toString();

    if (oldComparison !== newComparison) {
      // revert selected item by updating the collection composer
      this.updateComposerValues(this._values);
    }
  }

  /**
   * Update memoized track
   *
   * Update states for expansion and selection
   *
   * @returns {void}
   */
  protected updateMemo (): void {
    this.memo = {
      expanded: 0,
      expandable: 0,
      selected: 0,
      selectable: 0
    };
    this.queryItems((item, composer): boolean => {
      const hasChildren = composer.getItemChildren(item);
      if (hasChildren.length) {
        this.memo.expandable += 1;
        if (this.treeManager.isItemExpanded(item) && this.treeManager.isItemCheckable(item)) {
          this.memo.expanded += 1;
        }
      }
      else if (!this.composer.isItemLocked(item)) {
        this.memo.selectable += 1;
        if (this.getItemPropertyValue(item, 'selected') === true) {
          this.memo.selected += 1;
        }
      }
      return false;
    });
    this.requestUpdate();
  }

  /**
   * Utility method - closes and resets changes such as query
   * @returns {void}
   */
  protected closeAndReset (): void {
    this.resetInput();
    this.setOpened(false);
  }

  /**
   * Save the current selection
   * @returns {void}
   */
  protected save (): void {
    const event = new CustomEvent('confirm');
    this.dispatchEvent(event);
    if (!event.defaultPrevented) {
      this.persistSelection();
      this.closeAndReset();
    }
  }

  /**
   * Discard the current selection
   * @returns {void}
   */
  protected cancel (): void {
    const event = new CustomEvent('cancel');
    this.dispatchEvent(event);
    if (!event.defaultPrevented) {
      this.closeAndReset();
      // reset always happens on popup close action
    }
  }

  /**
   * Toggle tree level expansion action
   * @returns {void}
   */
  protected expansionToggleClickHandler (): void {
    if (this.hasExpansion) {
      this.treeManager.collapseAllItems();
    }
    else {
      this.treeManager.expandAllItems();
    }
  }

  /**
   * Toggle Selection of all tree items
   * @param event checked-change event
   * @returns {void}
   */
  protected selectionToggleHandler (event: CheckChangedEvent): void {
    if (event.detail.value) {
      this.treeManager.checkAllItems();
    }
    else {
      this.treeManager.uncheckAllItems();
    }
  }

  /**
   * Remove selection filter
   * @returns {void}
   */
  protected fullClickHandler (): void {
    this.exitEditSelection();

  }

  /**
   * Apply selection filter
   * @returns {void}
   */
  protected selectedClickHandler (): void {
    if (this.hasActiveSelection) {
      this.enterEditSelection();
    }
  }

  /**
   * Apply the selection filter by entering edit selection mode
   * @returns {void}
   */
  protected enterEditSelection (): void {
    this.editSelectionItems = new Set(this.treeManager.checkedItems);
    this.filterItems();
  }

  /**
   * Remove selection filtering by exiting edit selection mode
   * @returns {void}
   */
  protected exitEditSelection (): void {
    this.clearSelectionFilter();
    this.filterItems();
  }

  /**
   * Executed when the popup is fully opened
   * @returns {void}
   */
  protected onPopupOpened (): void {
    super.onPopupOpened();
    this.clearSelectionFilter();
    this.updatePills();
    this.updateMemo();
  }

  /**
   * Clear selection filter
   * @returns {void}
   */
  protected clearSelectionFilter (): void {
    this.editSelectionItems.clear();
  }

  /**
   * Executed when the popup is fully closed
   * @returns {void}
   */
  protected onPopupClosed (): void {
    super.onPopupClosed();
    this.updateMemo();
    this.cancelSelection();
    this.exitEditSelection();
  }

  /**
   * Filter the internal items by query. Changes items' hidden state.
   * @returns {void}
   */
  protected filterItems (): void {
    // if filter is null, it is off and external app is responsible
    if (this.filter) {
      const filter = this.filter;
      const items = this.queryItems((item): boolean => {
        // do not filter hidden items
        if (item.hidden) {
          return false;
        }

        // does item match the selection filter
        let result = true;
        if (this.editSelectionItems.size && !this.editSelectionItems.has(item)) {
          result = false;
        }

        // item matches selection, can have conventional filter applied
        if (result) {
          result = filter(item);
        }

        if (result) {
          this.treeManager.includeItem(item);
        }
        else {
          this.treeManager.excludeItem(item);
        }

        return result;
      }).slice();

      // do not expand EMS if there is no filter applied
      if (this.query || this.editSelectionItems.size) {
        this.addItemDescendantsToRender(items);
        this.addExpandedAncestorsToRender(items);
      }

      this.filterCount = items.length;
      // unlike CCB, we do not close EMS when there is no matches for filter
    }

    this.forcePopupLayout();
  }

  /**
   * Utility method
   * Adds descendants for each item passed
   * @param items List of child items
   * @returns {void}
   */
  protected addItemDescendantsToRender (items: TreeSelectDataItem[]): void {
    items.forEach((item) => {
      /**
       * Collapse an item to prevent tree show too many nested expanded
       */
      if (this.treeManager.isItemExpanded(item)) {
        this.treeManager.collapseItem(item);
      }

      /**
       * show all descendants of items to make them all are selectable
       * and user can navigate into nested data
       */
      const children = this.treeManager.getItemChildren(item);
      if (children.length) {
        this.addNestedItemsToRender(children, items);
      }
    });
  }

  /**
   * Utility method
   * Add nested children of item list
   * @param items List of items
   * @param excludeItems List of exclude items
   * @returns {void}
   */
  protected addNestedItemsToRender (items: readonly TreeSelectDataItem[], excludeItems: readonly TreeSelectDataItem[]): void {
    items.forEach(item => {
      // Skip hidden and exclude item
      if (!item.hidden && !excludeItems.includes(item)) {
        // Add item and nested children
        this.treeManager.includeItem(item);
        const children = this.treeManager.getItemChildren(item);
        if (children.length) {
          this.addNestedItemsToRender(children, excludeItems);
        }
      }
    });
  }

  /**
   * Utility method
   * Adds ancestors for each item passed and expand
   * @param items List of child items
   * @returns {void}
   */
  protected addExpandedAncestorsToRender (items: TreeSelectDataItem[]): void {
    // establish unique ancestors set
    const ancestors = new Set<TreeSelectDataItem>();
    // we iterate each item match so as to find ancestors
    items.forEach((item) => {
      // get the ancestors
      const parent = this.treeManager.getItemParent(item);
      if (parent && !ancestors.has(parent)) {
        this.treeManager.getItemAncestors(item).forEach((ancestor) => {
          ancestors.add(ancestor); // track ancestors
          this.addExpandedAncestorToRender(ancestor);
        });
      }
    });
  }

  /**
   * Utility method
   * Adds parent and expands
   * @param ancestor parent item
   * @returns {void}
   */
  protected addExpandedAncestorToRender (ancestor: TreeSelectDataItem): void {
    this.treeManager.includeItem(ancestor);
    this.treeManager.expandItem(ancestor);
  }

  /**
   * Reacts to pill removal by de-selecting the related item
   * @param event Event containing the pill item
   *
   * @returns {void}
   */
  protected onPillRemoved (event: CustomEvent): void {
    const pill = event.target as Pill;
    const item = this.queryItemsByPropertyValue('value', pill.value)[0];
    if (item) {
      this.treeManager.uncheckItem(item);
      // Focus must be shifted as otherwise focus is shifted to body once the item is removed and popup gets closed
      this.shiftFocus();
    }
  }

  /**
   * Handles key input
   * @param event Key down event object
   * @returns {void}
   */
  /* istanbul ignore next */
  protected onKeyDown (event: KeyboardEvent): void {
    // There are three areas, which have different reaction on key press:
    // 1) search field
    // 2) tree selection
    // 3) popup panel
    if (this.shadowRoot?.activeElement === this.selectionAreaEl && this.listEl) {
      // Focus within selection area. Propagate all events
      this.reTargetEvent(event, this.listEl);
    }
    else if (!this.popupEl?.focused) {
      // search field is in focus
      // combo box logic should take care
      super.onKeyDown(event);
    }
    else {
      // up/down to selection area
      switch (event.key) {
        case 'Up':
        case 'ArrowUp':
        case 'Down':
        case 'ArrowDown':
          super.onKeyDown(event);
          break;
        // no default
      }
    }
  }

  /**
   * Navigates up the list.
   * Opens the list if closed.
   * @param event keyboard event
   * @returns {void}
   */
  /* istanbul ignore next */
  protected up (event: KeyboardEvent): void {
    super.up(event);
    this.focusOnSelectionArea();
  }

  /**
   * Navigates down the list.
   * Opens the list if closed.
   * @param event keyboard event
   * @returns {void}
   */
  /* istanbul ignore next */
  protected down (event: KeyboardEvent): void {
    super.down(event);
    this.focusOnSelectionArea();
  }

  /**
   * Make sure that after up/down keys the focus gracefully moves to selection area
   * so the user can then use left/right/Enter keys for keyboard navigation
   * @returns {void}
   */
  /* istanbul ignore next */
  private focusOnSelectionArea (): void {
    // The logic needs to happen after the update cycle
    // as otherwise focus logic may contradict with other components
    // and the focus is not moved
    void this.updateComplete.then(() => {
      this.selectionAreaEl?.focus();
    });
  }

  /**
   * Adds a throttled update for pills and memo
   * @returns {void}
   */
  protected modificationUpdate (): void {
    super.modificationUpdate();
    this.memoUpdateThrottle.schedule(() => {
      this.updatePills();
      this.updateMemo();
    });
  }

  /**
   * Update pills if {@link TreeSelect.showPills} showPills is applied
   *
   * @returns {void}
   */
  protected updatePills (): void {
    if (this.showPills) {
      this.pillsData = this.checkedGroupedItems.slice();
      this.hasPills = !!this.pillsData.length;
    }
  }

  /**
   * Queries the composer for data items. Uses Infinity depth
   * @param engine Composer query engine
   * @returns Collection of matched items
   * @override
   */
  protected queryItems (engine: (item: TreeSelectDataItem, composer: CollectionComposer<TreeSelectDataItem>) => boolean): readonly TreeSelectDataItem[] {
    return this.composer.queryItems(engine, Infinity);
  }

  /**
   * Queries the composer for data items,
   * matching by property value. Uses Infinity depth
   * @param property Property name to query
   * @param value Property value to match against
   * @returns Collection of matched items
   * @override
   */
  protected queryItemsByPropertyValue<K extends keyof TreeSelectDataItem> (property: K, value: TreeSelectDataItem[K]): readonly TreeSelectDataItem[] {
    return this.composer.queryItemsByPropertyValue(property, value, Infinity);
  }

  /**
   * Filter template
   * @returns Render template
   */
  protected get filtersTemplate (): TemplateResult {
    return html`
        <div part="control-container filter-control">
          <div part="match-count-wrapper">
            ${this.matchCountTemplate}
          </div>
          ${this.hasSelectable ? html`<div part="filter-wrapper">
            <div
              role="button"
              tabindex="0"
              active
              part="control full-filter${!this.selectionFilterState ? ' active' : ''}"
              @tap="${this.fullClickHandler}">${this.t('FULL_LIST')}</div>
            <div
              role="button"
              tabindex="${ifDefined(this.hasActiveSelection ? 0 : undefined)}"
              part="control selected-filter${this.selectionFilterState ? ' active' : ''}${!this.hasActiveSelection ? ' disabled' : ''}"
              @tap="${this.selectedClickHandler}">${this.t('SELECTED')}</div>
          </div>` : html``}
        </div>
    `;
  }

  /**
   * Tree control template
   * @returns Render template
   */
  protected get treeControlsTemplate (): TemplateResult {
    if (!this.hasSelectable) {
      return html``;
    }
    let expansionControl = html``;
    if (this.expansionControlVisible) {
      expansionControl = html`
        <div part="filter-wrapper">
          <div
            role="button"
            tabindex="0"
            part="control expand-toggle"
            @tap="${this.expansionToggleClickHandler}">${this.t('EXPAND_COLLAPSE', { expansion: this.hasExpansion })}</div>
          </div>
      `;
    }
    return html`
        <div part="control-container tree-control">
            <ef-checkbox
              part="selection-toggle"
              .checked="${this.isAllSelected}"
              .indeterminate="${this.hasActiveSelection && !this.isAllSelected}"
              @checked-changed="${this.selectionToggleHandler}">${this.t('SELECT_CONTROL', { selected: this.isAllSelected })}</ef-checkbox>
          ${expansionControl}
        </div>
    `;
  }

  /**
   * Conditional filter matches template
   * @returns Render template
   */
  protected get matchCountTemplate (): TemplateResult {
    return this.query ? html`
            <span part="match-count">${this.t('MATCHES_NUM', { numMatched: this.filterCount })}</span>
    ` : html``;
  }

  /**
   * Commit controls template
   * @returns Render template
   */
  protected get commitControlsTemplate (): TemplateResult {
    return html`
      <ef-button
        id="done"
        part="done-button"
        cta
        @tap="${this.save}">${this.t('DONE')}</ef-button>
      <ef-button
        id="cancel"
        part="cancel-button"
        @tap="${this.cancel}">${this.t('CANCEL')}</ef-button>
    `;
  }

  /**
   * Pills template
   * @returns Render template
   */
  protected get pillsTemplate (): TemplateResult | undefined {
    // always injected when we have show pills vs injecting and re-injecting partial
    // visibility will typically be controlled by styling: display: none / block or similar
    if (this.showPills && this.hasPills && this.hasSelectable) {
      return html`<div part="pills">
        ${repeat(this.pillsData, pill => pill.value, pill => html`
        <ef-pill
          tabindex="-1"
          clears
          .readonly="${pill.readonly || this.readonly}"
          .disabled="${pill.disabled || this.disabled}"
          .value="${pill.value}"
          @clear="${this.onPillRemoved}">${pill.label}</ef-pill>`
        )}
      </div>`;
    }
  }

  /**
   * Returns template for popup
   * Lazy loads the popup
   * @returns Popup template or undefined
   */
  protected get popupTemplate (): TemplateResult | undefined {
    if (this.lazyRendered) {
      return html`
      <ef-overlay
        part="list"
        style=${styleMap(this.popupDynamicStyles)}
        @opened="${this.onPopupOpened}"
        @closed="${this.onPopupClosed}"
        .focusBoundary="${this}"
        .opened="${this.opened}"
        .positionTarget="${this}"
        .position="${POPUP_POSITION}"
        .delegatesFocus=${true}
        no-cancel-on-outside-click
        tabindex="0"
        with-shadow
        no-overlap
        no-autofocus>
        <div part="section">
          ${this.filtersTemplate}
          ${this.treeControlsTemplate}
          <div part="selection-area" tabindex="-1">
            <ef-tree
              id="internal-list"
              @focusin="${this.shiftFocus}"
              tabindex="-1"
              part="tree"
              .noRelation=${this.noRelation}
              .renderer=${this.renderer}
              .data="${this.composer}"
              .multiple="${this.multiple}"></ef-tree>
            ${this.pillsTemplate}
          </div>
          <div part="control-container footer" id="footer">${this.commitControlsTemplate}</div>
        </div>
      </ef-overlay>
      `;
    }
  }
}

import {
  css,
  CSSResultGroup,
  ElementSize,
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { ref, createRef, Ref } from '@refinitiv-ui/core/directives/ref.js';
import { unsafeHTML } from '@refinitiv-ui/core/directives/unsafe-html.js';
import { VERSION } from '../version.js';
import { AnimationTaskRunner, TimeoutTaskRunner } from '@refinitiv-ui/utils/async.js';
import { isIE, isMobile } from '@refinitiv-ui/utils/browser.js';
import {
  translate,
  TranslateDirective,
  TranslatePropertyKey
} from '@refinitiv-ui/translate';
import type { TapEvent } from '../events';
import type {
  AutosuggestTargetElement,
  AutosuggestHighlightable,
  AutosuggestMethodType,
  AutosuggestQuery,
  AutosuggestRenderer,
  AutosuggestReason,
  AutosuggestItem,
  AutosuggestSelectItemEvent,
  AutosuggestHighlightItemEvent,
  AutosuggestQueryAction
} from './helpers/types';
import { escapeRegExp, itemHighlightable, queryWordSelect } from './helpers/utils.js';
import { renderer } from './helpers/renderer.js';
import { Overlay } from '../overlay/index.js';
import '../loader/index.js';
import '../item/index.js';
import '@refinitiv-ui/phrasebook/locale/en/autosuggest.js';

import type {
  ItemHighlightEvent,
  AddAttachTargetEventsEvent,
  RemoveAttachTargetEventsEvent,
  ItemSelectEvent,
  SuggestionsFetchRequestedEvent,
  SuggestionsClearRequestedEvent,
  SuggestionsQueryEvent,
  SuggestionsChangedEvent
} from './helpers/types';

export type {
  AutosuggestTargetElement,
  AutosuggestHighlightable,
  AutosuggestMethodType,
  AutosuggestQuery,
  AutosuggestRenderer,
  AutosuggestReason,
  AutosuggestItem,
  ItemHighlightEvent,
  AddAttachTargetEventsEvent,
  RemoveAttachTargetEventsEvent,
  ItemSelectEvent,
  SuggestionsFetchRequestedEvent,
  SuggestionsClearRequestedEvent,
  SuggestionsQueryEvent,
  SuggestionsChangedEvent
};

export { updateElementContent } from './helpers/utils.js';
export {
  itemHighlightable,
  escapeRegExp,
  queryWordSelect,
  renderer,
  renderer as itemRenderer // compatibility
};

/**
 * Shows suggestions based on users' query.
 * It can be used by attaching to text form control
 * such as TextField, Multi Input, etc.
 * Autosuggest supports various use cases such as
 * custom rendering, pagination, asynchronous data request, etc.
 *
 * @fires item-highlight - Fired when the user highlights an item or removes highlight from the item.
 * @fires add-attach-target-events - Fired when `attach` has been set to bind the control with any custom inputs.
 * @fires remove-attach-target-events - Fired when `attach` has been removed to unbind the control with the inputs.
 * @fires item-select - Fired when the user selects an item on autosuggest.
 * @fires suggestions-fetch-requested - Fired when autosuggest requests the data. The event will be triggered when the value of the attached control has changed or when keyboard navigation is performed.
 * @fires suggestions-clear-requested - Fired when autosuggest requests to clear the data. If used in reactive application, prevent default and set suggestions to [].
 * @fires suggestions-query - Fired when the user changes value in input control and you might need to update suggestion items accordingly.
 * @fires suggestions-changed - Fired when suggestion items changed.
 *
 * @attr {boolean} opened - Set to open auto suggest popup
 * @prop {boolean} [opened=false] -  Auto suggest popup's open state
 *
 * @slot header - Slot to add custom contents at the top of autosuggest popup
 * @slot footer - Slot to add custom contents at the bottom of autosuggest popup
 */
@customElement('ef-autosuggest')
export class Autosuggest extends Overlay {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole: string | null = 'listbox';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        [part=content] {
          flex: 1 1 auto;
          overflow-x: hidden;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        [part=header], [part=footer] {
          flex: none;
        }
      `
    ];
  }

  /**
   * A basic regexp matching pattern to replace text based on string input.
   * @param text Value to test against
   * @param query The query
   * @param [pattern=<mark>$1</mark>] Provide a pattern to replace string
   * @returns innerHTML The text that can be used as innerHTML
   */
  public static QueryWordSelect (text: string, query = '', pattern = '<mark>$1</mark>'): string {
    return queryWordSelect(text, query, pattern);
  }

  /**
   * Build item element from data object
   * @param suggestion Suggestion data
   * @param query A query data (usually string, but could be any entity )
   * @returns item
   */
  public static ItemRenderer (suggestion: AutosuggestItem, query: AutosuggestQuery | null): HTMLElement {
    return renderer(suggestion, query);
  }

  /**
   * Replace forbidden characters in regular expressions
   * @param string A string to process
   * @returns clean string
   */
  public static EscapeRegExp (string = ''): string {
    return escapeRegExp(string);
  }

  /**
   * Check whether item can be highlighted
   * @param suggestion Suggestion object
   * @param target item element
   * @returns highlightable
   */
  public static ItemHighlightable (suggestion: AutosuggestItem, target: HTMLElement): boolean {
    return itemHighlightable(suggestion, target);
  }

  public static readonly defaultDebounceRate = 100;

  /**
   * An HTML Element or CSS selector
   */
  @property({ type: String })
  public attach: AutosuggestTargetElement | string | null = null;

  /**
   * Request suggestions when attach target is focused
   */
  @property({ type: Boolean, attribute: 'request-on-focus' })
  public requestOnFocus = false;

  /**
   * If set to true display 'Has more results' item
   */
  @property({ type: Boolean, reflect: true, attribute: 'more-results' })
  public moreResults = false;

  /**
   * Custom text for More Search
   * @default More results for {0}
   */
  @property({ type: String, attribute: 'more-search-text' })
  public moreSearchText = '';

  /**
   * If set to true show loading mask
   */
  @property({ type: Boolean, reflect: true })
  public loading = false;

  /**
   * An object that represents a query from attach target
   */
  @property({ type: Object, attribute: false })
  public query: AutosuggestQuery | null = null;

  /**
   * Debounce rate in ms of the filter as a number.
   * Used to throttle the filter rate so as not to trigger unneeded filtering
   * @default 100
   */
  @property({ type: Number, attribute: 'debounce-rate' })
  public debounceRate = Autosuggest.defaultDebounceRate;

  /**
   * A renderer applied to suggestion.
   * By default a render maps data to item attributes
   */
  @property({ attribute: false })
  public renderer: AutosuggestRenderer = renderer;

  /**
   * A function that is applied to every suggestion during the render process
   * to say whether the item can be highlighted and selected. Only items that return true are considered.
   * By default the function checks for `item` `highlightable` property.
   */
  @property({ attribute: false })
  public highlightable: AutosuggestHighlightable = itemHighlightable;

  /**
   * A list of suggestion items
   */
  @property({ type: Array, attribute: false })
  public suggestions: AutosuggestItem[] = [];

  /**
   * If set to true, the render function is not called. Instead the wrapper element
   * should populate and destroy suggestion elements. Rendering items manually
   * may have performance benefits in frameworks that use virtual DOM (such as `Vue`, `React`, `hyperHTML` and others)
   */
  @property({ type: Boolean, attribute: 'html-renderer' })
  public htmlRenderer = false;

  /**
   * Autosuggest internal translation strings
   */
  @translate({ scope: 'ef-autosuggest' })
  protected t!: TranslateDirective;

  @query('#moreResults')
  protected moreResultsItem?: HTMLElement | null;

  private contentSlotRef: Ref<HTMLSlotElement> = createRef();
  private contentElementRef: Ref<HTMLElement> = createRef();
  private headerElementRef: Ref<HTMLElement> = createRef();
  private footerElementRef: Ref<HTMLElement> = createRef();

  // used to map render elements with data
  private suggestionMap = new Map<HTMLElement, AutosuggestItem>();

  protected highlightedItem: HTMLElement | null = null;

  protected attachTarget: AutosuggestTargetElement | null = null;

  private lastActiveElement: HTMLElement | null = null;

  private suspendedKey = false;

  private preservedQueryValue: AutosuggestQuery | null = null;

  private focusSuspended = false;

  private jobRunner = new TimeoutTaskRunner(this.debounceRate);

  private attachChangeRunner = new AnimationTaskRunner();

  private moreResultsRunner = new AnimationTaskRunner();

  private loadingRunner = new AnimationTaskRunner();

  /**
   * creates auto-suggest
   */
  constructor () {
    super();

    /**
    * @ignore
    */
    this.position = ['bottom-start', 'top-start', 'right-middle'];
    /**
    * @ignore
    */
    this.noCancelOnEscKey = true;
    /**
    * @ignore
    */
    this.noCancelOnOutsideClick = true;
    /**
    * @ignore
    */
    this.noAutofocus = true;
    /**
    * @ignore
    */
    this.noOverlap = true;
    /**
    * @ignore
    */
    this.withShadow = false;
    /**
     * @ignore
     */
    this.noFocusManagement = true;
    /**
    * @ignore
    */
    this.onInputValueChange = this.onInputValueChange.bind(this);
    /**
    * @ignore
    */
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    /**
    * @ignore
    */
    this.onInputBlur = this.onInputBlur.bind(this);
    /**
    * @ignore
    */
    this.onInputFocus = this.onInputFocus.bind(this);
    /**
    * @ignore
    */
    this.suggestionsQueryAction = this.suggestionsQueryAction.bind(this);
    /**
    * @ignore
    */
    this.itemSelectAction = this.itemSelectAction.bind(this);
    /**
    * @ignore
    */
    this.itemHighlightAction = this.itemHighlightAction.bind(this);
    /**
    * @ignore
    */
    this.suggestionsFetchRequestedAction = this.suggestionsFetchRequestedAction.bind(this);
    /**
    * @ignore
    */
    this.suggestionsClearRequestedAction = this.suggestionsClearRequestedAction.bind(this);
    /**
    * @ignore
    */
    this.attachEventsAddAction = this.attachEventsAddAction.bind(this);
    /**
    * @ignore
    */
    this.attachEventsRemoveAction = this.attachEventsRemoveAction.bind(this);
    /**
     * @ignore
     */
    this.onItemMousedown = this.onItemMousedown.bind(this);
    /**
     * @ignore
     */
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  public disconnectedCallback (): void {
    this.dispatchAttachEventsRemoveAction();
    super.disconnectedCallback();
  }

  /**
   * Run when attach target value changes.
   * @param event by default `value-changed` event is listened
   * @returns {void}
   */
  public onInputValueChange (event: Event): void {
    if (!this.suspended) { // avoid circular
      /* c8 ignore next */
      if (isMobile) {
        this.lastActiveElement = event.target as HTMLElement;
      }
      this.requestSuggestions('value-changed', true);
    }
  }

  /**
   * Run when input has lost focus
   * @param event by default `blur` event is listened
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onInputBlur (event: FocusEvent): void {
    requestAnimationFrame(() => {
      if (!this.attachTargetFocused) {
        this.setOpened(false);
      }
    });
  }

  /**
   * Run when input received focus
   * @param event by default `focus` event is listened
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onInputFocus (event: FocusEvent): void {
    /* c8 ignore next */
    if (this.focusSuspended) {
      // see _onItemMousedown, it is an IE fix for scrollbar
      return;
    }

    this.requestOnFocus && this.requestSuggestions('input-focus');
  }

  /**
   * Run when input key down event has happened
   * @param event by default `keydown` event is listened
   * @returns {void}
   */
  public onInputKeyDown (event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        this.onUpKey();
        break;
      case 'ArrowDown':
        this.onDownKey();
        break;
      case 'Escape':
        this.onEscKey();
        break;
      case 'Return':
      case 'Enter':
        this.onEnterKey(event);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * @ignore
   * Called when the element's dimensions have changed
   * @param size dimension details
   * @returns {void}
   */
  public resizedCallback (size: ElementSize): void {
    super.resizedCallback(size);
    this.calculateContentMaxHeight(size);
  }

  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('tapstart', this.onItemMousedown);
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns shouldUpdate
   */
  protected shouldUpdate (changedProperties: PropertyValues): boolean {
    let result = super.shouldUpdate(changedProperties);

    result = result || this.shouldAutosuggestUpdate(changedProperties);

    return result;
  }

  /**
   * Called after the element’s DOM has been updated
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('suggestions')) {
      this.notifySuggestions();
    }

    this.changedCallbacks(changedProperties);
  }

  /**
   * inheritance callbacks
   */

  /**
   * Run when the slot has changed.
   * @param event Slot change query
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onSlotChange (event: Event): void {
    const contentSlot = this.contentSlotRef.value;
    const nodes = (contentSlot && contentSlot.assignedNodes()) || [];
    this.setOpened(this.attachTargetFocused && this.hasContent);

    // make a brave assumption that suggestions are populated as well
    const suggestions = this.suggestions;

    this.highlightItem(); // hide highlight
    this.suggestionMap.clear();

    nodes.forEach((node, idx) => {
      /* c8 ignore next */
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      const suggestion = suggestions[idx];

      if (this.highlightable(suggestion, node as HTMLElement)) {
        this.suggestionMap.set(node as HTMLElement, suggestion);
      }
    });
  }

  /**
   * 'suggestions-query' default action
   * @param event Suggestion query
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected suggestionsQueryAction (event: CustomEvent): void {
    this.query = this.attachTarget && this.attachTarget.value;
  }

  /**
   * 'item-select' default action
   * @param event Select action
   * @returns {void}
   */
  protected itemSelectAction (event: AutosuggestSelectItemEvent): void {
    const { detail: { query, suggestion } } = event;

    /* c8 ignore next */
    if (this.attachTarget) {
      this.attachTarget.value = suggestion && suggestion?.label || query;
    }
  }

  /**
   * 'item-highlight' default action
   * @param event Highlight action
   * @returns {void}
   */
  protected itemHighlightAction (event: AutosuggestHighlightItemEvent): void {
    const target = event.detail.target;
    const oldTarget = event.detail.oldTarget;

    if (target) {
      target.highlighted = true;
      // Required for aria-activedescendant to work correctly
      target.setAttribute('aria-selected', 'true');
    }

    if (oldTarget) {
      oldTarget.highlighted = false;
      oldTarget.setAttribute('aria-selected', 'false');
    }
  }

  /**
   * 'suggestions-fetch-requested' default action
   * @param event Fetch request
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected suggestionsFetchRequestedAction (event: CustomEvent): void {
    // do nothing
  }

  /**
   * 'suggestions-clear-requested' default action
   * @param event Clear request
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected suggestionsClearRequestedAction (event: CustomEvent): void {
    this.suggestions = [];
  }

  /**
   * Add listeners to the attached target
   * By default `input`, 'keydown', 'focus' and 'blur' events are listened
   * @param event Attach add action
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected attachEventsAddAction (event: CustomEvent): void {
    const attachTarget = this.attachTarget;

    /* c8 ignore next */
    if (!attachTarget) {
      return;
    }

    attachTarget.addEventListener('input', this.onInputValueChange);
    attachTarget.addEventListener('keydown', this.onInputKeyDown);
    attachTarget.addEventListener('blur', this.onInputBlur);
    attachTarget.addEventListener('focus', this.onInputFocus);
  }

  /**
   * Remove event listeners from the attached target
   * By default `input`, 'keydown', 'focus' and 'blur' events are listened
   * @param event Attach remove action
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected attachEventsRemoveAction (event: CustomEvent): void {
    const attachTarget = this.attachTarget;

    if (!attachTarget) {
      return;
    }

    attachTarget.removeEventListener('input', this.onInputValueChange);
    attachTarget.removeEventListener('keydown', this.onInputKeyDown);
    attachTarget.removeEventListener('blur', this.onInputBlur);
    attachTarget.removeEventListener('focus', this.onInputFocus);
  }

  /**
   * Call this method to fetch more results
   * @returns {void}
   */
  protected fetchMoreSuggestions (): void {
    this.dispatchSuggestionsFetchRequested('more-results');
  }

  /**
   * Highlight the item and remove old highlighted item
   * @param target Element to highlight. Pass null to just remove previous highlight
   * @param silent Do not fire a select event on highlight. Select should be fired on keyboard navigation
   * @returns {void}
   */
  protected highlightItem (target: HTMLElement | null = null, silent = true): void {
    if (this.highlightedItem !== target) {
      const oldTarget = this.highlightedItem;
      this.highlightedItem = target && this.canSelect(target) ? target : null;

      /**
       * @event item-highlight
       * Fired when an item gets highlighted or highlight is removed
       * @param {HTMLElement} [target] New highlight target or null
       * @param {*} [suggestion] New suggestion or null
       * @param {HTMLElement} [oldTarget] Old highlight target or null
       * @param {*} [oldSuggestion] Old suggestion or null
       */
      this.dispatchEventDefault(new CustomEvent('item-highlight', {
        cancelable: true,
        detail: {
          target: this.highlightedItem,
          suggestion: this.getSuggestionFor(this.highlightedItem),
          oldTarget,
          oldSuggestion: this.getSuggestionFor(oldTarget)
        }
      }), this.itemHighlightAction);

      if (!silent && target) {
        this.selectItem(target, 'navigation');
      }
    }
  }

  // Used to escape unsafe string character
  // TODO: think of a nicer way to do this
  private xmlSerializer: XMLSerializer | null = null;
  /**
   * Calculate more search text inner html
   * @returns innerHTML
   */
  protected get moreResultsTextTemplate (): TemplateResult | null {
    if (!this.moreResults) {
      return null;
    }

    if (!this.xmlSerializer) {
      this.xmlSerializer = new XMLSerializer();
    }

    const query = this.xmlSerializer.serializeToString(document.createTextNode(this.query ? this.query.toString() : ''));

    return html`
      <span part="more-results-text">${this.moreSearchText
      ? unsafeHTML(this.moreSearchText.replace(/{0\}/g, `<mark>${query}</mark>`))
      : this.t('MORE_RESULTS', {
        query,
        mark: (chunks: string) => `<mark>${chunks}</mark>`
      })
    }</span>
      <span part="more-results-keys" slot="right"><kbd>SHIFT</kbd> + <kbd>ENTER</kbd></span>
    `;
  }

  /**
   * Call this method to request suggestions
   * @private
   * @param reason The reason to request query
   * @param debounce True to debounce
   * @returns {void}
   */
  protected requestSuggestions (reason: AutosuggestReason, debounce = false): void {
    this.dispatchSuggestionsQuery(reason);

    if (this.preservedQueryValue === this.query) { // if the query is the same do not re-issue the request, instead try to open auto suggest
      if (!this.opened && ((this.suggestions && this.suggestions.length) || this.moreResults)) {
        this.setOpened(true);
      }
      return;
    }

    this.preservedQueryValue = this.query;

    const dispatch = (): void => {
      if (this.attachTargetFocused) {
        this.dispatchSuggestionsFetchRequested(reason);
      }
    };

    if (debounce) {
      // debounce
      this.jobRunner.schedule(dispatch);
      return;
    }

    this.jobRunner.cancel();
    dispatch();
  }

  /**
   * All internal opened set events can be stoppable externally
   * Use this instead of setting opened directly
   * Protected method that can be used by managers or subclasses
   * @returns {void}
   */
  protected onOpened (): void {
    super.onOpened();

    document.addEventListener('tapstart', this.onOutsideClick);
  }

  /**
   * Run when the popup has closed, managers are de-registered
   * and closing transition has finished
   * @returns {void}
   */
  protected onClosed (): void {
    super.onClosed();
    this.restrictContentMaxHeight();

    document.removeEventListener('tapstart', this.onOutsideClick);
  }

  /**
   * enter key processing
   * @param event Enter
   * @returns {void}
   */
  protected onEnterKey (event: KeyboardEvent): void {
    if (!this.opened) {
      this.requestSuggestions('enter-pressed');
      return;
    }

    /* c8 ignore next */
    if (this.loading) {
      return;
    }

    // more results
    if (this.moreResults && event.shiftKey) {
      this.fetchMoreSuggestions();
      return;
    }

    if (!this.highlightedItem) {
      this.setOpened(false);
      return;
    }

    this.highlightedItem && this.selectItem(this.highlightedItem, 'enter');
  }

  /**
   * Up key processing
   * @returns {void}
   */
  protected onUpKey (): void {
    if (!this.opened) {
      this.requestSuggestions('suggestions-revealed');
      return;
    }

    /* c8 ignore next */
    if (this.loading) {
      return;
    }

    this.focusElement(-1);
  }

  /**
   * Down key processing
   * @returns {void}
   */
  protected onDownKey (): void {
    if (!this.opened) {
      this.requestSuggestions('suggestions-revealed');
      return;
    }

    /* c8 ignore next */
    if (this.loading) {
      return;
    }

    this.focusElement(1);
  }

  /**
   * Esc key processing
   * @returns {void}
   */
  protected onEscKey (): void {
    if (this.opened) {
      // if preserved value exists, set it back
      this.dispatchItemSelect('reset');
      this.setOpened(false);

      return;
    }

    if (this.query) {
      this.suspend();
      this.dispatchItemSelect('clear');
      this.resume();

      this.requestSuggestions('escape-pressed');
    }
  }

  /**
   * Highlight it on mouse move
   * @param event for item
   * @returns {void}
   */
  protected onItemMouseMove (event: MouseEvent): void {
    this.highlightItem(this.getTarget(event));
  }

  /**
   * @param target Item to check
   * @returns true if an item can be highlighted and selectable
   */
  protected canSelect (target: HTMLElement): boolean {
    return this.suggestionMap.has(target) || (this.moreResults && target === this.moreResultsItem);
  }

  /**
   * Get suggestion for target
   * @param target Target to check
   * @returns suggestion
   */
  protected getSuggestionFor (target: HTMLElement | null): AutosuggestItem {
    return target && this.suggestionMap.get(target);
  }

  /**
   * Select the item from the list
   * @param target Element to select
   * @param method 'click', 'enter' or 'navigation'
   * @returns {void}
   */
  protected selectItem (target: HTMLElement, method: AutosuggestMethodType): void {
    if (this.canSelect(target)) {
      // more results
      if (target === this.moreResultsItem) {
        this.dispatchItemSelect('reset');

        switch (method) {
          case 'click':
          case 'enter':
            this.fetchMoreSuggestions();
            break;
          default:
          // node default
        }

        return;
      }

      this.dispatchItemSelect(method, target);

      switch (method) {
        case 'click':
        case 'enter':
          this.dispatchSuggestionsClearRequested();
          break;
        default:
        // node default
      }
    }
  }

  /**
   * Get the list of rendered suggestions
   * @returns renderedSuggestions
   */
  protected get renderedSuggestions (): Array<HTMLElement> {
    const keys = [];

    this.suggestionMap.forEach((value, key) => { // support IE11
      keys.push(key);
    });

    if (this.moreResults && this.moreResultsItem) {
      keys.push(this.moreResultsItem);
    }

    return keys;
  }

  /**
   * Fired when mouse leave event happens. Remove highlight from the item
   * @returns {void}
   */
  /* c8 ignore next */
  protected onItemMouseLeave (): void {
    this.highlightItem(); // remove highlight
  }

  /**
   * Fired when mouse click event happens. Select an item
   * @param event Mouse click event
   * @returns {void}
   */
  protected onItemMouseClick (event: MouseEvent): void {
    const target = this.getTarget(event);
    if (target) {
      this.selectItem(target, 'click');
    }
  }

  /**
   * check some of native properties was modified
   * @param changedProperties properties that was changed
   * @returns true if some of changedProperties modified
   */
  private shouldAutosuggestUpdate (changedProperties: PropertyValues): boolean {
    return changedProperties.has('attach')
      || changedProperties.has('suggestions')
      || changedProperties.has('moreResults')
      || changedProperties.has('moreSearchText')
      || changedProperties.has('loading')
      || changedProperties.has('debounceRate')
      || changedProperties.has(TranslatePropertyKey);
  }

  /**
   * Run when document click event happens.
   * @param  event object
   * @returns {void}
   */
  private onOutsideClick (event: TapEvent): void {
    const path = event.composedPath();

    // outside click
    if (!path.includes(this) && this.attachTarget && !path.includes(this.attachTarget)) {
      this.setOpened(false);
    }
  }

  private changedCallbacks (changedProperties: PropertyValues): void {
    if (changedProperties.has('attach')) {
      this.attachChangeRunner.schedule(() => {
        this.attachChangeFrameCallback();
      });
    }

    if (changedProperties.has('moreResults')) {
      this.moreResultsRunner.schedule(() => {
        this.moreResultsFrameCallback();
      });
    }

    if (changedProperties.has('loading')) {
      this.loadingRunner.schedule(() => {
        this.loadingFrameCallback();
      });
    }

    if (changedProperties.has('opened')) {
      this.handleAfterOpened();
    }

    if (changedProperties.has('debounceRate')) {
      this.debounceRateChange();
    }
  }

  /**
   * handle highlight after open
   * @returns {void}
   */
  protected handleAfterOpened (): void {
    this.highlightItem(); // hide highlight for case more-result
  }

  /**
   * recreate debouncer if dobounceRate was changed
   * @returns {void}
   */
  private debounceRateChange (): void {
    this.jobRunner.fulfil();

    this.jobRunner = new TimeoutTaskRunner(this.debounceRate);
  }

  /**
   * fire event and re-init listeners if attach was changed
   * @returns {void}
   */
  private attachChangeFrameCallback (): void {
    this.dispatchAttachEventsRemoveAction();

    const attachTarget = (typeof this.attach === 'string' ? document.querySelector(this.attach) : this.attach) as AutosuggestTargetElement;

    if (attachTarget && attachTarget.nodeType === document.ELEMENT_NODE) {
      this.attachTarget = attachTarget;
      this.focusBoundary = attachTarget;
      if (!this.positionTarget) {
        this.positionTarget = attachTarget; // in most cases attachTarget and positionTarget must be the same
      }

      /**
       * @event add-attach-target-events
       * Fired when attach has been set.
       * Add attach target listeners.
       */
      this.dispatchEventDefault(new CustomEvent('add-attach-target-events', {
        cancelable: true
      }), this.attachEventsAddAction);
    }
  }

  /**
   * Dispatch attach events remove action event
   * @returns {void}
   */
  private dispatchAttachEventsRemoveAction (): void {
    if (this.attachTarget) {
      /**
       * @event remove-attach-target-events
       * Fired when attach has been removed.
       * Remove attach target listeners.
       */
      this.dispatchEventDefault(new CustomEvent('remove-attach-target-events', {
        cancelable: true
      }), this.attachEventsRemoveAction);

      this.attachTarget = null;
      this.focusBoundary = null;
    }
  }

  /**
   * set opened state due to status of focus and content
   * @returns {void}
   */
  private moreResultsFrameCallback (): void {
    this.setOpened(this.attachTargetFocused && this.hasContent);
  }

  /**
   * Run when suggestions get changed
   * NB: this function is only run when htmlRenderer is set to false
   * @returns {void}
   */
  private suggestionsChange (): void {
    const contentSlot = this.contentSlotRef.value;
    contentSlot && contentSlot.assignedNodes().forEach((node) => {
      node.parentNode && node.parentNode.removeChild(node);
    });

    this.appendChild(this.suggestions.reduce((fragment: DocumentFragment, suggestion) => this.generateSuggestionsFragment(fragment, suggestion), document.createDocumentFragment()));
  }

  /**
   * Dispatch item select event
   * The event may change input, therefore suspend listening
   * @param method Select method
   * @param target Target for suggestion
   * @returns {void}
   */
  private dispatchItemSelect (method: AutosuggestMethodType, target: HTMLElement | null = null): void {
    this.suspend();

    /**
     * @event item-select
     * Fired when an item gets selected
     * @param method Select method
     * @param {HTMLElement} target Selection target
     * @param {*} [suggestion] Selected suggestion or null
     * @param {*} [query] Saved query object or null
     */
    this.dispatchEventDefault(new CustomEvent('item-select', {
      cancelable: true,
      detail: {
        method,
        target,
        suggestion: this.getSuggestionFor(target),
        query: method === 'clear' ? null : this.preservedQueryValue
      }
    }), this.itemSelectAction);

    this.resume();
  }

  /**
   * fire 'suggestions-fetch-requested' event
   * @param reason Dispatch reason
   * @returns {void}
   */
  private dispatchSuggestionsFetchRequested (reason: AutosuggestReason): void {
    /**
     * @event suggestions-fetch-requested
     * Fired when auto suggest requests the data.
     * @param {String} query Input query
     * @param {} reason The reason to fetch data
     */
    this.dispatchEventDefault(new CustomEvent('suggestions-fetch-requested', {
      cancelable: true,
      detail: {
        query: this.query,
        reason
      }
    }), this.suggestionsFetchRequestedAction);
  }

  /**
   * fire 'suggestions-clear-requested' event
   * @returns {void}
   */
  private dispatchSuggestionsClearRequested (): void {
    this.preservedQueryValue = null;

    /**
     * @event suggestions-clear-requested
     * Fired when auto suggest requests to clear the data.
     * If used in reactive application, prevent default and set suggestions to []
     */
    this.dispatchEventDefault(new CustomEvent('suggestions-clear-requested', {
      cancelable: true
    }), this.suggestionsClearRequestedAction);
  }

  /**
   * fire 'suggestions-query' event
   * @param reason Dispatch reason
   * @returns {void}
   */
  private dispatchSuggestionsQuery (reason: AutosuggestReason): void {
    /**
     * @event suggestions-query
     * Fired when input value has changed and the query must be set.
     * @param reason The reason to request query
     */
    this.dispatchEventDefault(new CustomEvent('suggestions-query', {
      cancelable: true,
      detail: {
        reason
      }
    }), this.suggestionsQueryAction);
  }

  /**
   * Dispatch event and run default action if preventDefault is not run
   * @param event Custom event to dispatch
   * @param defaultAction Default action to run
   * @returns {void}
   */
  private dispatchEventDefault (event: CustomEvent, defaultAction: AutosuggestQueryAction): void {
    this.dispatchEvent(event);

    if (!event.defaultPrevented) {
      defaultAction.call(this, event);
    }
  }

  /**
   * Check if the attach target is in focus
   * @returns focused true if attach target is focused
   */
  private get attachTargetFocused (): boolean {
    return this.isFocused(document.activeElement as HTMLElement) || this.attachTarget === this.lastActiveElement;
  }

  /**
   * Walk through shadowDOM to find activeElement
   * @param activeElement currently active document element
   * @returns true if activeElement is attached target
   */
  private isFocused (activeElement: HTMLElement | null): boolean {
    if (this.attachTarget === activeElement) {
      return true;
    }

    if (activeElement && activeElement.shadowRoot) {
      return this.isFocused(activeElement.shadowRoot.activeElement as HTMLElement);
    }

    return false;
  }

  /**
   * Check if the autosuggest has content
   * @returns content exists
   */
  private get hasContent (): boolean {
    if (this.moreResults) {
      return true;
    }

    // Space characters (e.g. space, tab, EOL) don't count as having content
    const contentSlot = this.contentSlotRef.value;
    const nodes = contentSlot && contentSlot.assignedNodes() || [];
    return nodes.some(({ nodeType, textContent }) => nodeType === Node.ELEMENT_NODE || (textContent && textContent.search(/\S/) >= 0)); // If node is element always return true
  }

  /**
   * Suspend updating suggestions on value-changed
   * Autosuggest is suspended on select
   * @returns {void}
   */
  private suspend (): void {
    this.suspendedKey = true;
  }

  /**
   * Resume suspended autosuggest
   * @returns {void}
   */
  private resume (): void {
    this.suspendedKey = false;
  }

  /**
   * Check if the autosuggest is suspended
   * @returns {Boolean} suspended
   */
  private get suspended (): boolean {
    return this.suspendedKey;
  }

  /**
   * Event target is not always what we want. Try to find the best target to process further
   * @param event Mouse click hover event
   * @returns target
   */
  private getTarget (event: Event): HTMLElement | null {
    const path = event.composedPath();

    for (let i = 0; i <= path.length; i += 1) {
      const node = path[i] as HTMLElement;

      /* c8 ignore next */
      if (node.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      if (this.canSelect(node)) {
        return node;
      }

      /* c8 ignore next */
      if (node === this) {
        return event.target as HTMLElement;
      }
    }

    return event.target as HTMLElement;
  }

  /**
   * Highlight next or previous highlightable element if present
   * @param {Number} direction -1 - up/next; 1 - down/previous
   * @returns {void}
   */
  private focusElement (direction: number): void {
    // focus is spread across
    const highlightedItem = this.highlightedItem;
    const children = this.renderedSuggestions;
    const idx = highlightedItem ? children.indexOf(highlightedItem) : -1;

    let focusElement;
    if (direction === 1) {
      focusElement = idx === -1 ? children[0] : children[idx + 1];
    }
    else {
      focusElement = idx === -1 ? children[children.length - 1] : children[idx - 1];
    }

    if (!focusElement) {
      focusElement = direction === 1 ? children[0] : children[children.length - 1];
    }

    if (focusElement) {
      this.highlightItem(focusElement, false);
      focusElement.scrollIntoView({ // TODO: this has different behaviour in IE11
        behavior: 'auto',
        block: 'nearest'
      });
    }
  }

  /**
   * initialize opened state depends on focus and content
   * @returns {void}
   */
  private loadingFrameCallback (): void {
    if (this.loading && !this.opened && this.attachTargetFocused) {
      this.setOpened(true);
    }
    else if (!this.loading && this.opened && !this.hasContent) {
      this.setOpened(false);
    }
  }

  /**
   * @returns {void}
   */
  private notifySuggestions (): void {
    this.dispatchEvent(new CustomEvent('suggestions-changed', {
      detail: {
        value: this.suggestions
      }
    }));

    if (!this.htmlRenderer) {
      this.suggestionsChange();
    }
  }

  private generateSuggestionsFragment (fragment: DocumentFragment, suggestion: AutosuggestItem): DocumentFragment {
    const el = this.renderer(suggestion, this.preservedQueryValue);
    fragment.appendChild(el);

    return fragment;
  }

  /**
   * Set the width
   * @returns {void}
   */
  public refit (): void {
    super.refit();

    if (this.positionTarget && this.positionTarget instanceof HTMLElement) {
      const rect = this.positionTarget.getBoundingClientRect();
      this.style.minWidth = `${rect.width}px`;
    }

    this.restrictContentMaxHeight();
  }

  /**
   * Fired when mouse down event happens. Select the item
   * @param event Mouse down event
   * @returns {void}
   */
  private onItemMousedown (event: Event): void {
    // do not loose focus from input when click happens on the popup
    // note, in IE when scrolling the focus is lost regardless, so
    // do hacking here and with on blur
    /* c8 ignore next */
    requestAnimationFrame(() => {
      // Ignore any focus query events!
      this.focusSuspended = true;
      this.attachTarget && this.attachTarget.focus();
      this.focusSuspended = false;
    });

    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * @returns template of loader if currently query loading
   */
  protected get loaderTemplate (): TemplateResult | null {
    if (!this.loading) {
      return null;
    }
    return html`
      <div part="loader">
        <div part="backdrop"></div>
        <ef-loader aria-label="${this.t('LOADING')}" aria-live="assertive"></ef-loader>
      </div>
    `;
  }

  /**
   * @returns template of moreResults
   */
  protected get moreResultsTemplate (): TemplateResult | null {
    if (!this.moreResults) {
      return null;
    }

    return html`
      <ef-item tabIndex="-1"
               role="option"
               id="moreResults"
               part="more-results">${this.moreResultsTextTemplate}</ef-item>
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
        <div ${ref(this.headerElementRef)}
             part="header">
          <slot id="headerSlot" name="header"></slot>
        </div>
        <div ${ref(this.contentElementRef)}
             part="content"
             @mousemove="${this.onItemMouseMove}"
             @mouseleave="${this.onItemMouseLeave}"
             @tap="${this.onItemMouseClick}">
          <slot ${ref(this.contentSlotRef)}
                @slotchange="${this.onSlotChange}"></slot>
          ${this.moreResultsTemplate}
        </div>
        <div ${ref(this.footerElementRef)}
             part="footer">
          <slot id="footerSlot" name="footer"></slot>
        </div>
        ${this.loaderTemplate}
    `;
  }

  /**
   * IE11 only: Restrict maximum height of content element
   * @param [maxHeight] Maximum height of content element
   * @returns {void}
   */

  /* c8 ignore next */
  private restrictContentMaxHeight (maxHeight?: number): void {
    const contentElement = this.contentElementRef.value;

    if (!isIE || !contentElement) {
      return;
    }

    if (maxHeight) {
      contentElement.style.setProperty('max-height', `${maxHeight}px`);
    }
    else {
      contentElement.style.removeProperty('max-height');
    }
  }

  /**
   * IE11 only: Calculate the maxHeight of content element
   * @param size Size of the dialog
   * @returns {void}
   */
  /* c8 ignore next */
  private calculateContentMaxHeight (size: ElementSize): void {
    if (!isIE) {
      return;
    }

    const headerElement = this.headerElementRef.value;
    const footerElement = this.footerElementRef.value;
    const contentElement = this.contentElementRef.value;

    const headerRect = headerElement?.getBoundingClientRect();
    const footerRect = footerElement?.getBoundingClientRect();
    const contentRect = contentElement?.getBoundingClientRect();

    const dialogHeight = size.height;
    const headerHeight = headerRect ? headerRect.height : 0;
    const footerHeight = footerRect ? footerRect.height : 0;
    const contentHeight = contentRect ? contentRect.height : 0;

    if (headerHeight + footerHeight + contentHeight > dialogHeight) {
      this.restrictContentMaxHeight(dialogHeight - footerHeight - headerHeight);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-autosuggest': Autosuggest;
  }
}

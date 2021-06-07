import {
  css,
  CSSResult,
  customElement,
  ElementSize,
  html,
  property,
  PropertyValues,
  query,
  TemplateResult,
  unsafeHTML
} from '@refinitiv-ui/core';
import { escapeRegExp, itemHighlightable, itemRenderer, queryWordSelect } from './helpers/utils';
import { AnimationTaskRunner, TimeoutTaskRunner } from '@refinitiv-ui/utils';
import { Overlay } from '../overlay';
import '../loader';
import {
  AttachTargetElement,
  HighlightableFunction,
  MethodType,
  Query,
  ReasonType,
  RendererFunction,
  SuggestionType
} from './types';
import { isIE, isMobile } from './const';

export { queryWordSelect, itemRenderer, escapeRegExp, itemHighlightable, updateElementContent } from './helpers/utils';

/**
 * Shows suggestions based on users' query.
 * It can be used by attaching to text form control
 * such as TextField, Multi Input, etc.
 * Autosuggest supports various use cases such as
 * custom rendering, pagination, asynchronous data request, etc.
 *
 * @fires item-highlight Fired when an item gets highlighted or highlight is removed
 * @fires add-attach-target-events Fired when attach has been set
 * @fires remove-attach-target-events Fired when attach has been removed
 * @fires item-select Fired when an item gets selected
 * @fires suggestions-fetch-requested Fired when auto suggest requests the data
 * @fires suggestions-clear-requested Fired when auto suggest requests to clear the data. If used in reactive application, prevent default and set suggestions to []
 * @fires suggestions-query Fired when input value has changed and the query must be set
 * @fires suggestions-changed Fired when suggestions changed
 *
 * @attr {boolean} opened - Set to open auto suggest popup
 * @prop {boolean} [opened=false] -  Auto suggest popup's open state
 */
@customElement('ef-autosuggest')
export class Autosuggest extends Overlay {


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
  public static ItemRenderer (suggestion: SuggestionType, query: Query | null): HTMLElement {
    return itemRenderer(suggestion, query);
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
  public static ItemHighlightable (suggestion: SuggestionType, target: HTMLElement): boolean {
    return itemHighlightable(suggestion, target);
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return [Overlay.styles as CSSResult, css`
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
    `];
  }

  public static readonly defaultDebounceRate = 100;

  public static readonly defaultMoreSearchText = 'More results for {0}';

  /**
   * An HTML Element or CSS selector
   * @type {HTMLElement | string | null}
   */
  @property({ type: String })
  public attach: AttachTargetElement | string | null = null;

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
   */
  @property({ type: String, attribute: 'more-search-text' })
  public moreSearchText = Autosuggest.defaultMoreSearchText;

  /**
   * If set to true show loading mask
   */
  @property({ type: Boolean, reflect: true })
  public loading = false;

  /**
   * An object that represents a query from attach target
   * @type {Query | null}
   */
  @property({ type: Object, attribute: false })
  public query: Query | null = null;

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
   * @type {Renderer}
   */
  @property({ type: Function, attribute: false })
  public renderer: RendererFunction = itemRenderer;

  /**
   * A function that is applied to every suggestion during the render process
   * to say whether the item can be highlighted and selected. Only items that return true are considered.
   * By default the function checks for `item` `highlightable` property.
   * @type {Function}
   */
  @property({ type: Function, attribute: false })
  public highlightable: HighlightableFunction = itemHighlightable;

  /**
   * A list of suggestion items
   * @type {Suggestion[]}
   */
  @property({ attribute: false })
  public suggestions: SuggestionType[] = [];

  /**
   * If set to true, the render function is not called. Instead the wrapper element
   * should populate and destroy suggestion elements. Rendering items manually
   * may have performance benefits in frameworks that use virtual DOM (such as `Vue`, `React`, `hyperHTML` and others)
   */
  @property({ type: Boolean, attribute: 'html-renderer' })
  public htmlRenderer = false;

  // used to map render elements with data
  private suggestionMap = new Map<HTMLElement, SuggestionType>();

  protected highlightedItem: HTMLElement | null = null;

  @query('#moreResults') protected moreResultsItem?: HTMLElement | null;

  protected attachTarget: AttachTargetElement | null = null;

  private lastActiveElement: HTMLElement | null = null;

  @query('#contentSlot') private contentSlot?: HTMLSlotElement | null;

  private suspendedKey = false;

  private preservedQueryValue: Query | null = null;

  private focusSuspended = false;

  private jobRunner = new TimeoutTaskRunner(this.debounceRate);

  @query('[part="content"]') private contentElement?: HTMLElement | null;
  @query('[part="header"]') private headerElement?: HTMLElement | null;
  @query('[part="footer"]') private footerElement?: HTMLElement | null;

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
    this.highlightText = this.highlightText.bind(this);
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
      /* istanbul ignore next */
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
    /* istanbul ignore next */
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
    if (event.key === 'Up' || event.key === 'ArrowUp') {
      this.onUpKey();
    }
    else if (event.key === 'Down' || event.key === 'ArrowDown') {
      this.onDownKey();
    }
    else if (event.key === 'Esc' || event.key === 'Escape') {
      this.onEscKey();
    }
    else if (event.key === 'Enter' || event.key === 'Return') {
      this.onEnterKey(event);
    }
    else {
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
   * @returns template of loader if currently query loading
   */
  protected get loaderTemplate (): TemplateResult | null {
    if (!this.loading) {
      return null;
    }
    return html`
      <div part="loader">
        <div part="backdrop"></div>
        <ef-loader size="medium"></ef-loader>
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
      <ef-item id="moreResults" part="more-results">${this.highlightText(this.moreResults, this.moreSearchText, this.query)}</ef-item>
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
        <div part="header">
          <slot id="headerSlot" name="header"></slot>
        </div>
        <div id="content" part="content" @mousemove="${this.onItemMouseMove}" @mouseleave="${this.onItemMouseLeave}" @tap="${this.onItemMouseClick}">
          <slot id="contentSlot" @slotchange="${this.onSlotChange}"></slot>
          ${this.moreResultsTemplate}
        </div>
        <div part="footer">
          <slot id="footerSlot" name="footer"></slot>
        </div>
        ${this.loaderTemplate}
    `;
  }

  /**
   * add listener to listen when on suggestion tap
   * @param changedProperties properties that was changed on first update
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
    const nodes = (this.contentSlot && this.contentSlot.assignedNodes()) || [];
    this.setOpened(this.attachTargetFocused && this.hasContent);

    // make a brave assumption that suggestions are populated as well
    const suggestions = this.suggestions;

    this.highlightItem(); // hide highlight
    this.suggestionMap.clear();

    nodes.forEach((node, idx) => {
      /* istanbul ignore next */
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
  protected itemSelectAction (event: CustomEvent): void {
    const { detail: { query, suggestion } } = event;

    /* istanbul ignore next */
    if (this.attachTarget) {
      this.attachTarget.value = suggestion ? suggestion.label : query;
    }
  }

  /**
   * 'item-highlight' default action
   * @param event Highlight action
   * @returns {void}
   */
  protected itemHighlightAction (event: CustomEvent): void {
    const { detail: { target, oldTarget } } = event;

    if (target) {
      target.highlighted = true;
    }

    if (oldTarget) {
      oldTarget.highlighted = false;
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

    /* istanbul ignore next */
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

  /**
   * Calculate more search text inner html
   * @param moreResults True if has more results
   * @param moreSearchText More search text template
   * @param query A query
   * @returns innerHTML
   */
  protected highlightText (moreResults: boolean, moreSearchText: string, query: Query | null): TemplateResult | null {
    if (!moreResults) {
      return null;
    }

    return html`
      <span part="more-results-text">
        ${unsafeHTML(moreSearchText.replace(/{0\}/g, `<mark>${query ? query.toString() : ''}</mark>`))}
      </span>
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
  protected requestSuggestions (reason: ReasonType, debounce = false): void {
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

    /* istanbul ignore next */
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

    /* istanbul ignore next */
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

    /* istanbul ignore next */
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
   * highlight it on mouse move
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
  protected getSuggestionFor (target: HTMLElement | null): SuggestionType {
    return target && this.suggestionMap.get(target);
  }

  /**
   * Select the item from the list
   * @param target Element to select
   * @param method 'click', 'enter' or 'navigation'
   * @returns {void}
   */
  protected selectItem (target: HTMLElement, method: MethodType): void {
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
  /* istanbul ignore next */
  protected onItemMouseLeave (): void {
    this.highlightItem(); // remove highlight
  }

  /**
   * Fired when mouse click event happens. Select an item
   * @param event Mouse click event
   * @returns {void}
   */
  protected onItemMouseClick (event: MouseEvent): void {
    this.selectItem(this.getTarget(event) as HTMLElement, 'click');
  }

  /**
   * check some of native properties was modified
   * @param changedProperties properties that was changed
   * @returns true if some of changedProperties modified
   */
  private shouldAutosuggestUpdate (changedProperties: PropertyValues): boolean {
    return changedProperties.has('attach') || changedProperties.has('suggestions') || changedProperties.has('moreResults') || changedProperties.has('loading') || changedProperties.has('debounceRate');
  }

  /**
   * Run when document click event happens.
   * @param  event object
   * @returns {void}
   */
  private onOutsideClick = (event: Event): void => {
    const path = event.composedPath();

    // outside click
    if (!path.includes(this) && this.attachTarget && !path.includes(this.attachTarget)) {
      this.setOpened(false);
    }
  };

  private changedCallbacks (changedProperties: PropertyValues): void {
    if (changedProperties.has('attach')) {
      this.attachChangeRunner.schedule(this.attachChangeFrameCallback);
    }

    if (changedProperties.has('moreResults')) {
      this.moreResultsRunner.schedule(this.moreResultsFrameCallback);
    }

    if (changedProperties.has('loading')) {
      this.loadingRunner.schedule(this.loadingFrameCallback);
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
   * fire event and reinit listeners if attach was changed
   * @returns {void}
   */
  private attachChangeFrameCallback = (): void => {
    this.dispatchAttachEventsRemoveAction();

    const attachTarget = (typeof this.attach === 'string' ? document.querySelector(this.attach) : this.attach) as AttachTargetElement;

    if (attachTarget && attachTarget.nodeType === document.ELEMENT_NODE) {
      this.attachTarget = attachTarget;
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
  };

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
    }
  }

  /**
   * set opened state due to status of focus and content
   * @returns {void}
   */
  private moreResultsFrameCallback = (): void => {
    this.setOpened(this.attachTargetFocused && this.hasContent);
  };

  /**
   * Run when suggestions get changed
   * NB: this function is only run when htmlRenderer is set to false
   * @returns {void}
   */
  private suggestionsChange (): void {
    this.contentSlot && this.contentSlot.assignedNodes().forEach(this.removeChildNode);

    this.appendChild(this.suggestions.reduce(this.generateSuggestionsFragment, document.createDocumentFragment()));
  }

  /**
   * Dispatch item select event
   * The event may change input, therefore suspend listening
   * @param method Select method
   * @param target Target for suggestion
   * @returns {void}
   */
  private dispatchItemSelect (method: MethodType, target: HTMLElement | null = null): void {
    this.suspend();

    /**
     * @event item-select
     * Fired when an item gets selected
     * @param {MethodType} method Select method
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
  private dispatchSuggestionsFetchRequested (reason: ReasonType): void {
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
  private dispatchSuggestionsQuery (reason: ReasonType): void {
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
  private dispatchEventDefault (event: CustomEvent, defaultAction: Function): void {
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
    const nodes = this.contentSlot && this.contentSlot.assignedNodes() || [];
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

      /* istanbul ignore next */
      if (node.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      if (this.canSelect(node)) {
        return node;
      }

      /* istanbul ignore next */
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
  private loadingFrameCallback = (): void => {
    if (this.loading && !this.opened && this.attachTargetFocused) {
      this.setOpened(true);
    }
    else if (!this.loading && this.opened && !this.hasContent) {
      this.setOpened(false);
    }
  };

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

  private removeChildNode = (el: Node): void => {
    el.parentNode && el.parentNode.removeChild(el);
  };

  private generateSuggestionsFragment = (fragment: DocumentFragment, suggestion: SuggestionType): DocumentFragment => {
    const el = this.renderer(suggestion, this.preservedQueryValue);
    fragment.appendChild(el);

    return fragment;
  };

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
  private onItemMousedown = (event: Event): void => {
    // do not loose focus from input when click happens on the popup
    // note, in IE when scrolling the focus is lost regardless, so
    // do hacking here and with on blur
    /* istanbul ignore next */
    requestAnimationFrame(() => {
      // Ignore any focus query events!
      this.focusSuspended = true;
      this.attachTarget && this.attachTarget.focus();
      this.focusSuspended = false;
    });

    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * IE11 only: Restrict maximum height of content element
   * @param [maxHeight] Maximum height of content element
   * @returns {void}
   */

  /* istanbul ignore next */
  private restrictContentMaxHeight (maxHeight?: number): void {
    if (!isIE) {
      return;
    }

    if (maxHeight) {
      this.contentElement && this.contentElement.style.setProperty('max-height', `${maxHeight}px`);
    }
    else {
      this.contentElement && this.contentElement.style.removeProperty('max-height');
    }
  }

  /**
   * IE11 only: Calculate the maxHeight of content element
   * @param size Size of the dialog
   * @returns {void}
   */
  /* istanbul ignore next */
  private calculateContentMaxHeight (size: ElementSize): void {
    if (!isIE) {
      return;
    }

    const headerRect = this.headerElement?.getBoundingClientRect();
    const footerRect = this.footerElement?.getBoundingClientRect();
    const contentRect = this.contentElement?.getBoundingClientRect();

    const dialogHeight = size.height;
    const headerHeight = headerRect ? headerRect.height : 0;
    const footerHeight = footerRect ? footerRect.height : 0;
    const contentHeight = contentRect ? contentRect.height : 0;

    if (headerHeight + footerHeight + contentHeight > dialogHeight) {
      this.restrictContentMaxHeight(dialogHeight - footerHeight - headerHeight);
    }
  }
}

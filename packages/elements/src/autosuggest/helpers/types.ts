import type { ItemType } from '../../item';

export type AutosuggestSelectItemEvent = CustomEvent<{ query: string, suggestion: Suggestion }>;

export type AutosuggestHighlightItem = HTMLElement & { highlighted: boolean };

export type AutosuggestHighlightItemEvent = CustomEvent<{ target: AutosuggestHighlightItem, oldTarget: AutosuggestHighlightItem }>;

export type AutosuggestQueryAction = (event: CustomEvent) => void;

export type AutosuggestReason =
  'value-changed'
  | 'input-focus'
  | 'suggestions-revealed'
  | 'escape-pressed'
  | 'enter-pressed'
  | 'more-results';

export interface Suggestion {
  /**
   * Type of item. Value can be `text`, `header`, `divider`
   */
  type?: ItemType;
  /**
   * The text for the label indicating the meaning of the item.
   */
  label?: string;
  /**
   * The text for the pop-up of item when it's hover.
   */
  title?: string;
  /**
   * Set the icon name from the coral-icon list
   */
  icon?: string;
  /**
   * Sets the item to be disabled.
   */
  disabled?: boolean;
  /**
   * Value of the data item.
   */
  value?: string;
  /**
   * Sort data item into the group.
   */
  group?: string;
  /**
   * Suggestion unique id.
   */
  id?: string;
}

export type AutosuggestItem = Suggestion | string | unknown;

export interface AutosuggestQuery {
  toString (): string;
}

export type AutosuggestTargetElement = HTMLElement & { value: string };

export type AutosuggestMethodType = 'click' | 'enter' | 'clear' | 'reset' | 'navigation';

export type AutosuggestRenderer = (suggestion: AutosuggestItem, query: AutosuggestQuery | null) => HTMLElement;

export type AutosuggestHighlightable = (suggestion: AutosuggestItem, target: HTMLElement) => boolean;

// EVENTS
/**
 * @event item-highlight
 * Fired when an item gets highlighted or highlight is removed
 */
export type ItemHighlightEvent = CustomEvent<{
  /**
   * New highlight target
   */
  target: AutosuggestTargetElement | null;
  /**
   * New suggestion
   */
  suggestion: AutosuggestItem | null;
  /**
   * Old highlight target
   */
  oldTarget: AutosuggestTargetElement | null;
  /**
   * Old suggestion
   */
  oldSuggestion: AutosuggestItem | null;
}>;

/**
 * @event add-attach-target-events
 * Fired when attach has been set.
 * Add attach target listeners
 */
export type AddAttachTargetEventsEvent = CustomEvent;

/**
 * @event remove-attach-target-events
 * Fired when attach has been removed.
 * Remove attach target listeners
 */
export type RemoveAttachTargetEventsEvent = CustomEvent;

/**
 * @event item-select
 * Fired when an item gets selected
 */
export type ItemSelectEvent = CustomEvent<{
  /**
   * Select method
   */
  method: AutosuggestMethodType;
  /**
   * Selection target
   */
  target: AutosuggestTargetElement;
  /**
   * Selected suggestion
   */
  suggestion: AutosuggestItem | null;
  /**
   * Saved query object
   */
  query: AutosuggestQuery | null
}>;

/**
 * @event suggestions-fetch-requested
 * Fired when auto suggest requests the data
 */
export type SuggestionsFetchRequestedEvent = CustomEvent<{
  /**
   * Input query
   */
  query: AutosuggestQuery | null;
  /**
   * The reason to fetch data
   */
  reason: AutosuggestReason;
}>;

/**
 * @event suggestions-clear-requested
 * Fired when auto suggest requests to clear the data.
 * If used in reactive application, prevent default and set suggestions to []
 */
export type SuggestionsClearRequestedEvent = CustomEvent;

/**
 * @event suggestions-query
 * Fired when input value has changed and the query must be set.
 */
export type SuggestionsQueryEvent = CustomEvent<{
  /**
   * The reason to request query
   */
  reason: AutosuggestReason;
}>;

/**
 * @event suggestions-changed
 * Fired when suggestions changed
 */
export type SuggestionsChangedEvent = CustomEvent<{
  /**
   * Suggestion Items
   */
  value: AutosuggestItem[];
}>;

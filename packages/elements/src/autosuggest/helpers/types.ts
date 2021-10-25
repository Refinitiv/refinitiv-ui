import type { ItemType } from '../../item';

export type AutosuggestSelectItemEvent = CustomEvent<{ query: string, suggestion: Suggestion }>;

export type AutosuggestHighlightItem = { highlighted: boolean };

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
}

export type AutosuggestItem = Suggestion | string | unknown;

export interface AutosuggestQuery {
  toString (): string;
}

export type AutosuggestTargetElement = HTMLElement & { value: string };

export type AutosuggestMethodType = 'click' | 'enter' | 'clear' | 'reset' | 'navigation';

export type AutosuggestRenderer = (suggestion: AutosuggestItem, query: AutosuggestQuery | null) => HTMLElement;

export type AutosuggestHighlightable = (suggestion: AutosuggestItem, target: HTMLElement) => boolean;

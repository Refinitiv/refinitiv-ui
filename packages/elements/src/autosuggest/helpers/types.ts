import { ItemType } from '../../item';

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
  type?: ItemType;
  label?: string;
  title?: string;
  icon?: string;
  disabled?: boolean;
  value?: string;
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

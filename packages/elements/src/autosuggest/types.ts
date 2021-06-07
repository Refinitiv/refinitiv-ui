import { ItemType } from '../item';

export interface Suggestion {
  type?: ItemType;
  label?: string;
  title?: string;
  icon?: string;
  disabled?: boolean;
  value?: string;
  group?: string;
}

export type SuggestionType = Suggestion | string | unknown;

export interface Query {
  toString (): string;
}

export type AttachTargetElement = HTMLElement & { value: Query };

export type ReasonType =
  'value-changed'
  | 'input-focus'
  | 'suggestions-revealed'
  | 'escape-pressed'
  | 'enter-pressed'
  | 'more-results';

export type MethodType = 'click' | 'enter' | 'clear' | 'reset' | 'navigation';

export type RendererFunction = (suggestion: SuggestionType, query: Query | null) => HTMLElement;

export type HighlightableFunction = (suggestion: SuggestionType, target: HTMLElement) => boolean;

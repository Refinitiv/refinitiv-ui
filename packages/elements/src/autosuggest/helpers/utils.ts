import { Item } from '../../item';
import { HighlightableFunction, Query, RendererFunction, Suggestion, SuggestionType } from '../types';

/**
 * Check whether item can be highlighted
 * @param suggestion Suggestion object
 * @param target item element
 * @returns highlightable
 */
export const itemHighlightable: HighlightableFunction = (suggestion: SuggestionType, target: HTMLElement): boolean => {
  return (target as Item).highlightable;
};

/**
 * Replace forbidden characters in regular expressions
 * @param string A string to process
 * @returns clean string
 */
export const escapeRegExp = (string = ''): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * A basic regexp matching pattern to replace text based on string input.
 * @param text Value to test against
 * @param query The query
 * @param [pattern=<mark>$1</mark>] Provide a pattern to replace string
 * @returns innerHTML The text that can be used as innerHTML
 */
export const queryWordSelect = (text: string, query = '', pattern = '<mark>$1</mark>'): string => {
  query = query && query.trim();

  if (!query) {
    return text;
  }

  const regExReplace = new RegExp(`(${escapeRegExp(query)})`, 'ig');

  return text.replace(regExReplace, pattern);
};

/**
 * Update element content
 * @param el to update content
 * @param query to search
 * @param label text to test against
 * @param value text to use as fallback
 * @return {void}
 */
export const updateElementContent = (el: Item, query: string, label: string, value: string | number): void => {
  if (itemHighlightable(value as SuggestionType, el)) {
    el.innerHTML = queryWordSelect(label, query);
  }
  else {
    el.label = `${value}`;
  }
};

/**
 * Build item element from data object
 * @param suggestion Suggestion data
 * @param query A query data (usually string, but could be any entity )
 * @returns item
 */
export const itemRenderer: RendererFunction = (suggestion: SuggestionType, query: Query | null): HTMLElement => {
  const el = new Item();

  if (typeof suggestion === 'object') {
    const {
      type,
      label,
      title,
      icon,
      disabled,
      value
    } = (suggestion as Suggestion);

    el.type = type || null;
    el.disabled = !!disabled;
    el.icon = icon || null;
    el.value = value || label || '';

    if (title) {
      el.title = title;
    }

    updateElementContent(el, query as string || '', label || '', el.value);
  }
  else {
    const value = `${suggestion || ''}`;

    el.label = value;
    el.value = value;

    updateElementContent(el, query as string || '', value, value);
  }

  return el;
};

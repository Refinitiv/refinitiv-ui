import { uuid } from '@refinitiv-ui/utils/uuid.js';
import { updateElementContent } from './utils.js';
import { AutosuggestQuery, AutosuggestRenderer, Suggestion, AutosuggestItem } from './types';

/**
 * Build item element from data object
 * @param suggestion Suggestion data
 * @param query A query data (usually string, but could be any entity )
 * @returns item
 */
export const renderer: AutosuggestRenderer = (suggestion: AutosuggestItem, query: AutosuggestQuery | null): HTMLElement => {
  if (typeof suggestion !== 'object') {
    const value = suggestion as string || '';

    suggestion = {
      label: value,
      value
    };
  }

  const {
    type,
    label,
    title,
    icon,
    disabled,
    value,
    id
  } = (suggestion as Suggestion);

  const el = document.createElement('ef-item');
  const isTextType = !type || type === 'text';
  const elId = id || (isTextType ? uuid() : '');

  if (elId) {
    el.id = elId;
  }

  el.tabIndex = -1;
  el.setAttribute('role', isTextType ? 'option' : 'presentation');
  el.type = type || null;
  el.disabled = !!disabled;
  el.icon = icon || null;
  el.value = value || label || '';

  if (title) {
    el.title = title;
  }

  updateElementContent(el, query as string || '', label || '', el.value);

  return el;
};
